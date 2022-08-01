/* eslint-disable no-var */
var IronMan = (Save => {
	"use strict";

	/**
	 * Set to true to allow debug mode changes during gameplay.
	 * By default this should always be false, if it is not false, please change it.
	 */
	const IRONMAN_DEBUG = false;

	// eslint-disable-next-line no-unused-vars
	let varsFrozen = false;

	/*  --------------------------------------
		Event code to set protected variables.
		-------------------------------------- */

	const _setterHandlers = new Set();

	function addSetter(handler) {
		if (typeof handler === "function") {
			_setterHandlers.add(handler);
		} else {
			Errors.report(
				"The IronMan setter function requires a function to be passed as the parameter."
			);
		}
	}

	function clearSetters() {
		_setterHandlers.clear();
	}

	function handleSetters() {
		let workDone = false;
		const stateObj = session.get("state");
		_setterHandlers.forEach(handler => {
			/* We could delete entries as we call them, but clearing the entire structure at the end works too. */
			if (typeof handler === "function") {
				/* Pass the stateobj variables object as args, manipulate story vars there. */
				handler.apply(this, [stateObj.delta[0].variables]);
				workDone = true;
			}
		});
		_setterHandlers.clear();
		if (workDone) {
			session.set("state", stateObj);
			State.restore();
		}
	}

	/*  -------------------------------------
		Integral IronMan mode core functions.
		------------------------------------- */

	function ironmanLock() {
		/* Immediately exit if on the starting passage. */
		if (["Start", "Clothes Testing", "Renderer Test Page", "Tips"].includes(V.passage)) return;
		/* Immediately exit if the game is in debug mode or test mode. */
		if (Config.debug) return;
		const readonly = { writable: false, configurable: false };
		Object.defineProperty(
			V,
			"ironmanmode",
			Object.assign({}, readonly, { value: V.ironmanmode })
		);
		if (V.ironmanmode) {
			Object.defineProperties(V, {
				cheatdisable: Object.assign({}, readonly, { value: "t" }),
				ironmanautosaveschedule: Object.assign({}, readonly, {
					value: V.ironmanautosaveschedule,
				}),
				autosavedisabled: Object.assign({}, readonly, { value: true }),
				virginity: Object.assign({}, readonly, { value: V.player.virginity }),
			});
			if (!IRONMAN_DEBUG) {
				Object.defineProperty(V, "debug", Object.assign({}, readonly, { value: 0 }));
			}
			if (V.combat === 1) {
				for (const item of ["enemyhealth", "enemyarousal", "enemytrust", "enemystrength"])
					Object.defineProperty(V, item, Object.assign({}, readonly, { value: V[item] }));
			}
			for (const type in V.player.virginity) {
				if (!V.player.virginity[type] && type !== "temple") {
					/* Should be removed in a later revision, completely unnecessary. */
					try {
						Object.defineProperty(
							V.player.virginity,
							type,
							Object.assign({}, readonly, { value: V.player.virginity[type] })
						);
					} catch (e) {
						console.debug(e);
					}
				}
			}
		}
	}

	function getSignature(save = null) {
		const keys = [
			"debug",
			"autosavedisabled",
			"virginity",
			"player",
			"enemyhealth",
			"enemyarousal",
			"enemytrust",
			"enemystrength",
			"passage",
			"money",
		];
		const target = save == null ? V : save.state.delta[0].variables;
		const subset = keys.map(key => target[key]);
		const encodedSubset = JSON.stringify(subset);
		const signature = md5(encodedSubset);
		return signature;
	}

	/*  --------------------------------------
		   Update code for the $ironman obj.
		-------------------------------------- */

	function update(save, metadata) {
		delete metadata.ironman_signature;
		if (typeof metadata.signature !== "string") {
			metadata.signature = getSignature(save);
		}
	}

	/*  --------------------------------------
		UI Functions relating to IronMan mode.
		-------------------------------------- */

	function uiCheckBox(mode = "normal") {
		$(function () {
			const checkbox = document.getElementById("checkbox-ironmanmode");
			if (mode === "normal") {
				V.ironmanmode = checkbox.checked;
				if (checkbox.checked) {
					if (V.alluremod < 1) V.alluremod = 1;
					if (V.rentmod < 1) V.rentmod = 1;
					if (V.tending_yield_factor > 5) V.tending_yield_factor = 5;
					if (document.getElementById("sliderTendingYieldFactor")) {
						Wikifier.wikifyEval(
							'<<replace #sliderTendingYieldFactor>><<numberslider "$tending_yield_factor" $tending_yield_factor 1 10 1 $ironmanmode>><</replace>>'
						);
					}
					if (document.getElementById("sliderRentMode")) {
						Wikifier.wikifyEval(
							'<<replace #sliderRentMode>><<numberslider "$rentmod" $rentmod 0.1 3 0.1 $ironmanmode>><</replace>>'
						);
					}
					if (document.getElementById("sliderAllureMode")) {
						Wikifier.wikifyEval(
							'<<replace #sliderAllureMode>><<numberslider "$alluremod" $alluremod 0.2 2 0.1 $ironmanmode>><</replace>>'
						);
					}
					V.maxStates = 1;
					V.cheatdisabletoggle = "t";
					V.autosavedisabled = true;
					$(".ironman-slider input")
						.on("input change", e => sliderPerc(e))
						.trigger("change");
				} else {
					if (document.getElementById("numberslider-input-alluremod"))
						document.getElementById("numberslider-input-alluremod").disabled = false;
					if (document.getElementById("numberslider-input-rentmod"))
						document.getElementById("numberslider-input-rentmod").disabled = false;
					if (document.getElementById("numberslider-input-tending-yield-factor"))
						document.getElementById(
							"numberslider-input-tending-yield-factor"
						).disabled = false;
				}
			} else {
				checkbox.checked = V.ironmanmode === true;
				if (V.passage !== "Start") checkbox.disabled = true;
			}
		});
	}

	function getDatestamp() {
		const now = new Date();
		let MM = now.getMonth() + 1;
		let DD = now.getDate();
		let hh = now.getHours();
		let mm = now.getMinutes();
		let ss = now.getSeconds();

		if (MM < 10) {
			MM = `0${MM}`;
		}
		if (DD < 10) {
			DD = `0${DD}`;
		}
		if (hh < 10) {
			hh = `0${hh}`;
		}
		if (mm < 10) {
			mm = `0${mm}`;
		}
		if (ss < 10) {
			ss = `0${ss}`;
		}

		return `${now.getFullYear()}${MM}${DD}-${hh}${mm}${ss}`;
	}

	function exportSlot(slot = 8) {
		updateExportDay();
		const data = Save.slots.get(slot);
		const saveId = data.metadata.saveId;
		const saveName = data.metadata.saveName;
		const exportName = `${data.id}-${
			saveName === "" ? saveId : saveName
		}-${getDatestamp()}.save`;
		const saveObj = LZString.compressToBase64(JSON.stringify(data));
		saveAs(new Blob([saveObj], { type: "text/plain;charset=UTF-8" }), exportName);
	}

	/**
	 * @deprecated
	 */
	// eslint-disable-next-line no-unused-vars
	function exportCurrent() {
		updateExportDay();
		Save.export();
	}

	/**
	 * Export the slot's data and encode it into data which is difficult to decode without prior knowledge.
	 *
	 * @param {number} slot The index of the save to export for debugging.
	 * @returns {string} Containing the encoded data.
	 */
	function exportDebug(slot) {
		updateExportDay();
		const data = Save.slots.get(slot);
		const details = DoLSave.SaveDetails.get(slot);
		if (data == null) {
			/* Output error response, stating the save slot is invalid. */
			const msg = `IronMan::exportDebug(slot: ${slot}): save file is empty.`;
			console.debug(msg);
			Errors.report(msg);
			return undefined;
		}
		const datatoEncode = { data, details };
		const encodedData = LZString.compressToBase64(JSON.stringify(datatoEncode));
		const finalData = btoa(encodedData);
		/* Navigate to the export-import page. */
		T.presetData = finalData;
		Wikifier.wikifyEval(
			'<<overlayReplace "optionsExportImport">><<set $currentOverlay to null>>'
		);
		return finalData;
	}

	function importDebug(data) {
		const decodedData = LZString.decompressFromBase64(atob(data));
		const saveObj = JSON.parse(decodedData);
		return saveObj;
	}

	function importAndLoadDebug(data) {
		const saveObj = importDebug(data);
		if (typeof saveObj !== "object") {
			/* Output error response, stating the save slot is invalid. */
			const msg = "importAndLoadDebug failed.";
			console.debug(msg, data);
			Errors.report(msg);
			return false;
		}
		const save = saveObj.data;
		/* TODO: Change it around so we don't have to stringify and recompress. */
		const encodedSave = LZString.compressToBase64(JSON.stringify(save));
		const result = Save.deserialize(encodedSave);
		return Object.assign({}, result, saveObj);
	}

	function exportFile(saveData) {
		const saveId = saveData.metadata.saveId;
		const saveName = saveData.metadata.saveName;
		const exportName = `${saveData.id}-${
			saveName === "" ? saveId : saveName
		}-${getDatestamp()}.save`;
		const saveObj = LZString.compressToBase64(JSON.stringify(saveData));
		saveAs(new Blob([saveObj], { type: "text/plain;charset=UTF-8" }), exportName);
	}

	const clickCount = {
		slot: -1,
		count: 0,
	};

	function uiExportIconHandler(slot) {
		/* If the slot is different, reset the object. */
		if (slot !== clickCount.slot) {
			clickCount.slot = slot;
			clickCount.count = 0;
		}
		/* Begin increment or activator. */
		/* Takes 3 clicks to activate the exporter. */
		if (clickCount.count >= 2) {
			exportDebug(slot);
			clickCount.slot = -1;
			clickCount.count = 0;
		} else {
			/* Increment and return, as to not reset the counter. */
			clickCount.count++;
		}
	}

	/**
	 * @deprecated
	 */
	function uiExportButton() {
		const exportName = "degrees-of-lewdity" + (V.saveName !== "" ? "-" + V.saveName : "");
		updateExportDay();
		Save.export(exportName);
	}

	function scheduledSaves() {
		const date = new Date(V.month + " " + V.monthday + ", " + V.year);

		if (!V.ironmanautosaveschedule) V.ironmanautosaveschedule = date.getTime().toString(8);
		if (parseInt(V.ironmanautosaveschedule, 8) < date.getTime()) {
			// autosave
			ironmanAutoSave();
			//
			V.ironmanautosaveschedule = (
				date.getTime() +
				getRandomIntInclusive(432000, 777600) * 1000
			).toString(8);
		}
	}

	/* If the game is in ironman mode, generate the objects necessary. Can use the updater code for it without issues. */
	/* $(document).on(':start2', function() {
		if (V.ironmanmode) {
			update();
		}
	}); */

	$(document).on(":passagestart", function () {
		varsFrozen = false;
		handleSetters();
	});

	/*  IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE
		IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE

		This runs at the end of the passage processing pipeline. Check docs for SugarCube.md for more information about the pipeline. */
	$(document).on(":passageend", function () {
		ironmanLock();
		varsFrozen = true;
	});

	/* DEPRECATED - Macro definition */
	Macro.add("ironmandefer", {
		tags: null,
		handler() {
			/* TODO: Provide a mechanism for TwineScript users to do this. */
		},
	});

	/* Export the module object containing functions. */
	return Object.seal({
		lock: ironmanLock,
		getSignature,
		/* Setter helpers that control the setter object, to defer variable assignments at the very beginning of the next passage. */
		addSetter,
		clearSetters,
		export: exportSlot,
		exportDebug,
		importDebug,
		importAndLoadDebug,
		exportFile,
		/* exportDebug: exportCurrent, */
		UI: {
			checkBox: uiCheckBox,
			exportButton: uiExportButton,
			exportHandler: uiExportIconHandler,
		},
		update,
		scheduledSaves,
	});
})(Save);
window.IronMan = IronMan;
