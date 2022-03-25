const IronMan = (() => {
	/**
	 * Set to true to allow debug mode changes during gameplay.
	 * By default this should always be false, if it is not false, please change it.
	 */
	const IRONMAN_DEBUG = false;

	let varsFrozen = false;

	/*  --------------------------------------
		Event code to set protected variables.
		-------------------------------------- */

	const _setterHandlers = new Set();

	function addSetter(handler) {
		if (typeof handler === 'function') {
			_setterHandlers.add(handler);
		} else {
			Errors.report('The IronMan setter function requires a function to be passed as the parameter.');
		}
	}

	function clearSetters() {
		_setterHandlers.clear();
	}

	function handleSetters() {
		let workDone = false;
		const stateObj = session.get('state');
		_setterHandlers.forEach(handler => {
			/* We could delete entries as we call them, but clearing the entire structure at the end works too. */
			if (typeof handler === 'function') {
				/* Pass the stateobj variables object as args, manipulate story vars there. */
				handler.apply(this, [ stateObj.delta[0].variables ]);
				workDone = true;
			}
		});
		_setterHandlers.clear();
		if (workDone) {
			session.set('state', stateObj);
			State.restore();
		}
	}

	/*  -------------------------------------
		Integral IronMan mode core functions.
		------------------------------------- */
	
	function freezeImportantVars() {
		/* Immediately exit if on the starting passage. */
		if (['Start', 'Clothes Testing', 'Renderer Test Page', 'Tips'].includes(V.passage)) return;
		/* Immediately exit if the game is in debug mode or test mode. */
		if (Config.debug) return;
		const readonly = { writable: false, configurable: false };
		Object.defineProperty(V, "ironmanmode", { ...readonly, value: V.ironmanmode });
		if (V.ironmanmode) {
			Object.defineProperties(V, {
				"cheatdisable": { ...readonly, value: 't' },
				"ironmanautosaveschedule": { ...readonly, value: V.ironmanautosaveschedule },
				"autosavedisabled": { ...readonly, value: true },
				"virginity": { ...readonly, value: V.player.virginity }
			});
			if (!IRONMAN_DEBUG) {
				Object.defineProperty(V, "debug", { ...readonly, value: 0 });
			}
			if (V.combat == 1) {
				for (const item of ["enemyhealth", "enemyarousal", "enemytrust", "enemystrength"])
					Object.defineProperty(V, item, { ...readonly, value: V[item] });
			}
			for (const type in V.player.virginity) {
				if (V.player.virginity[type] != true && type != "temple") {
					try {
						Object.defineProperty(V.player.virginity, type, { ...readonly, value: V.player.virginity[type] });
					} catch (e) { /* Not sure why lifeanime put this catch here, isn't it better to check the values properly? */
						console.debug(e);
					}
				}
			}
		}
	}

	function getSaveSignature() {
		let res;
		for (const va of [V.debug, V.autosavedisabled, V.virginity, V.player, V.enemyhealth, V.enemyarousal, V.enemytrust, V.enemystrength, V.passage, V.money]) {
			res += JSON.stringify(va);
		}
		return md5(res);
	}

	/*  --------------------------------------
		   Update code for the $ironman obj.
		-------------------------------------- */

	function update() {
		const versions = V.objectVersion;
		if (versions.ironMan == undefined) {
			versions.ironMan = 0;
		}
		switch (versions.ironMan) {
			case 0:
				/* Do nothing until the first implementation. */
				break;
		}
	}

	/*  --------------------------------------
		UI Functions relating to IronMan mode.
		-------------------------------------- */

	function uiCheckBox(mode = "normal") {
		$(function () {
			const checkbox = document.getElementById("checkbox-ironmanmode");
			if (mode == "normal") {
				V.ironmanmode = checkbox.checked;
				if (checkbox.checked == true) {
					if (V.alluremod < 1)
						V.alluremod = 1;
					if (V.rentmod < 1)
						V.rentmod = 1;
					if (V.tending_yield_factor > 5)
						V.tending_yield_factor = 5;
					if (document.getElementById("sliderTendingYieldFactor"))
						new Wikifier(null, '<<replace #sliderTendingYieldFactor>><<numberslider "$tending_yield_factor" $tending_yield_factor 1 10 1 $ironmanmode>><</replace>>')
					if (document.getElementById("sliderRentMode"))
						new Wikifier(null, '<<replace #sliderRentMode>><<numberslider "$rentmod" $rentmod 0.1 3 0.1 $ironmanmode>><</replace>>')
					if (document.getElementById("sliderAllureMode"))
						new Wikifier(null, '<<replace #sliderAllureMode>><<numberslider "$alluremod" $alluremod 0.2 2 0.1 $ironmanmode>><</replace>>')
					V.maxStates = 1;
					V.cheatdisabletoggle = "t";
					V.autosavedisabled = true;
					$('.ironman-slider input').on('input change', e => sliderPerc(e)).trigger('change');
				} else {
					if (document.getElementById("numberslider-input-alluremod"))
						document.getElementById("numberslider-input-alluremod").disabled = false;
					if (document.getElementById("numberslider-input-rentmod"))
						document.getElementById("numberslider-input-rentmod").disabled = false;
					if (document.getElementById("numberslider-input-tending-yield-factor"))
						document.getElementById("numberslider-input-tending-yield-factor").disabled = false;
				}
			} else {
				checkbox.checked = V.ironmanmode == true;
				if (V.passage != "Start")
					checkbox.disabled = true;
			}
		});
	}

	function uiExportButton() {
		let export_name = "degrees-of-lewdity" + (V.saveName != '' ? '-' + V.saveName : '');
		updateExportDay();
		Save.export(export_name);
	}

	function uiDebugExport(slot) {
		const save = Save.slots.get(slot);
		if (!save)
			return;
		let compress = LZString.compressToBase64(JSON.stringify({ "id": save.id, "state": save.state }));
		compress = window.btoa(compress)
		new Wikifier(null, `<<overlayReplace "optionsExportImport">><<set $currentOverlay to null>>`)
		$(function () {
			var input = document.getElementById("saveDataInput");
			updateExportDay();
			input.value = compress;
		})
	}

	function uiDebugExportButton(slot) {
		const div = document.getElementById("saveSlot" + slot);
		if (div) {
			let click_value = parseInt(div.getAttribute("click-count"))
			if (click_value && click_value % 3 == 0) {
				let tmp = div.parentElement.parentElement.parentElement.getElementsByClassName("deleteButton")[0]
				if (click_value % 6 == 0)
					document.getElementById("exportDebugButton" + slot).remove()
				else if (click_value % 6 == 3)
					tmp.outerHTML = `<div id="exportDebugButton` + slot + `" class="exportDebugButton"><input type="button" class="saveMenuButton right" value="Debug" onclick="ironManDebugExport(` + slot + `)"/></div>`
						+ tmp.outerHTML
			}
			div.setAttribute("click-count", click_value + 1)
		}
	}

	/* If the game is in ironman mode, generate the objects necessary. Can use the updater code for it without issues. */
	/* $(document).on(':start2', function() {
		if (V.ironmanmode) {
			update();
		}
	}); */

	$(document).on(':passagestart', function() {
		varsFrozen = false;
		handleSetters();
	});

	/*  IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE
		IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE IRONMAN PREVENTION CODE
		
		This runs at the end of the passage processing pipeline. Check docs for SugarCube.md for more information about the pipeline. */
	$(document).on(':passageend', function() {
		freezeImportantVars();
		varsFrozen = true;
	});

	/* DEPRECATED - Macro definition */
	Macro.add('ironmandefer', {
		tags: null,
		handler() {
			/* TODO: Provide a mechanism for TwineScript users to do this. */
		}
	});

	/* Export the module object containing functions. */
	return Object.seal({
		freezeImportantVars: freezeImportantVars,
		getSaveSignature: getSaveSignature,
		/* Setter helpers that control the setter object, to defer variable assignments at the very beginning of the next passage. */
		addSetter: addSetter,
		clearSetters: clearSetters,
		UI: {
			checkBox: uiCheckBox,
			exportButton: uiExportButton,
			debugExport: uiDebugExport,
			debugExportButton: uiDebugExportButton,
		},
		update: update
	});
})();
window.IronMan = IronMan;
