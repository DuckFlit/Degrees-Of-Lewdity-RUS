/* eslint-disable eqeqeq */
/* eslint-disable jsdoc/require-description-complete-sentence */
/* globals hasSexStat, sexStatNameMapper, heatRutSexStatModifier, drunkSexStatModifier */

function overlayShowHide(elementId) {
	const div = document.getElementById(elementId);
	if (div != null) {
		div.classList.toggle("hidden");
		if (elementId === "debugOverlay") {
			V.debugMenu[0] = !V.debugMenu[0];
		}
	}
	window.cacheDebugDiv();
}
window.overlayShowHide = overlayShowHide;

function overlayMenu(elementId, type) {
	if (type === "debug") {
		window.toggleClassDebug(elementId + "Button", "bg-color");
		V.debugMenu[1] = elementId;
		if (document.getElementById(elementId) != null) {
			if (V.debugMenu[2].length > 0) window.toggleClassDebug(elementId, "hideWhileSearching");
			else window.toggleClassDebug(elementId, "classicHide");
		}
		if ((elementId === "debugFavourites" || elementId === "debugAdd") && V.debugMenu[2] != null && V.debugMenu[2].length > 0) {
			V.debugMenu[2] = "";
			document.getElementById("searchEvents").value = "";
			window.researchEvents("");
		}
		if (elementId === "debugFavourites") {
			window.patchDebugMenu();
		}
	}
	window.cacheDebugDiv();
}
window.overlayMenu = overlayMenu;

// Links.disableNumberifyInVisibleElements.push("#passage-testing-room");

$(document).on(":passagerender", function (ev) {
	if (passage() === "GiveBirth") {
		$(ev.content)
			.find("[type=checkbox]")
			.on("propertychange change", function () {
				Wikifier.wikifyEval("<<resetPregButtons>>");
				Links.generateLinkNumbers(ev.content);
			});
	}
});

function ensureIsArray(x, check = false) {
	if (check) x = x != null ? x : [];
	if (Array.isArray(x)) return x;
	return [x];
}
window.ensureIsArray = ensureIsArray;

// feats related widgets
// This needs updating, it's poorly designed.
function closeFeats(id) {
	const div1 = document.getElementById("feat-" + id);
	const div2 = document.getElementById("closeFeat-" + id);
	div1.style.display = "none";
	div2.style.display = "none";
	let otherFeatDisplay;
	let elementId = id + 1;
	let newId = parseInt(div1.classList.value.replace("feat feat", ""));
	do {
		otherFeatDisplay = document.getElementById("feat-" + elementId);
		if (otherFeatDisplay) {
			if (otherFeatDisplay.style.display !== "none" && !isNaN(newId)) {
				otherFeatDisplay.removeAttribute("class");
				otherFeatDisplay.classList.add("feat");
				otherFeatDisplay.classList.add("feat" + newId);
				otherFeatDisplay.classList.add("feat-overlay");
				if (newId >= 3) {
					otherFeatDisplay.classList.add("hiddenFeat");
				}
				newId++;
			}
			elementId++;
		}
	} while (otherFeatDisplay);
}
window.closeFeats = closeFeats;

function getTimeNumber(t) {
	const time = new Date(t);
	const result = time.getTime();
	if (isNaN(result)) {
		return 999999999999999;
	}
	return result;
}
window.getTimeNumber = getTimeNumber;

function extendStats() {
	V.extendedStats = !V.extendedStats;
	const $captionDiv = $("#storyCaptionDiv");
	if ($captionDiv.length === 0) return;

	$captionDiv.toggleClass("statsExtended", V.extendedStats);
	Wikifier.wikifyEval("<<replace #stats>><<statsCaption>><</replace>>");
	initializeTooltips();
}
window.extendStats = extendStats;

function customColour(color, saturation, brightness, contrast, sepia) {
	return (
		// eslint-disable-next-line prettier/prettier
		"filter: hue-rotate(" + color + "deg) saturate(" + saturation + ") brightness(" + brightness + ") contrast(" + contrast + ") sepia(" + sepia + ")"
	);
}
window.customColour = customColour;

function zoom(value) {
	const slider = $("[name$='" + Util.slugify("options.zoom") + "']");
	value = Math.clamp(value || slider[0].value || 0, 50, 200);
	$("body")
		.css("zoom", value + "%")
		.css("-ms-zoom", value + "%");
	if (slider[0] !== undefined && slider[0].value != value) {
		slider[0].value = value;
		slider.trigger("change");
	}
}
window.zoom = zoom;

function beastTogglesCheck() {
	T.beastVars = [
		"bestialitydisable",
		"swarmdisable",
		"parasitedisable",
		"parasitepregdisable",
		"tentacledisable",
		"slimedisable",
		"voredisable",
		"spiderdisable",
		"slugdisable",
		"waspdisable",
		"beedisable",
		"lurkerdisable",
		"horsedisable",
		"plantdisable",
	];
	T.anyBeastOn = T.beastVars.some(x => V[x] === "f");
}
window.beastTogglesCheck = beastTogglesCheck;

function settingsAsphyxiation() {
	const updateText = () => {
		let val = V.asphyxiaLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "Don't touch my neck!";
				break;
			case 1:
				text = "NPCs may <span class='blue inline-colour'>grab</span> you by the neck. Doesn't impede breathing.";
				break;
			case 2:
				text = "NPCs may try to <span class='purple inline-colour'>choke</span> you during consensual intercourse.";
				break;
			case 3:
				text = "NPCs may try to <span class='red inline-colour'>strangle</span> you during non-consensual intercourse.";
				break;
			case 4:
				text =
					"NPCs will <span class='red inline-colour'>often</span> try to <span class='red inline-colour'>strangle</span> you during non-consensual intercourse.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		jQuery("#numberslider-value-asphyxialvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-asphyxialvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsAsphyxiation = settingsAsphyxiation;

function settingsCondoms() {
	const updateText = () => {
		let val = V.condomLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "<span class='red inline-colour'>Everyone is allergic to latex and safe sex.</span>";
				break;
			case 1:
				text = "Only <span class='green inline-colour'>you</span> may use condoms. You may still give condoms to NPCs.";
				break;
			case 2:
				text = "NPCs will only have condoms if <span class='blue inline-colour'>pregnancy</span> between them and the player is possible.";
				break;
			case 3:
				text = "NPCs may have and use condoms <span class='pink inline-colour'>whenever they please</span>.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		jQuery("#numberslider-value-condomlvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-condomlvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsCondoms = settingsCondoms;

function settingsNudeGenderAppearance() {
	const updateText = () => {
		let val = V.NudeGenderDC;
		let text = null;
		switch (val) {
			case -1:
				text =
					"NPCs <span class='blue inline-colour'>ignore</span> genitals when perceiving gender. <span class='purple inline-colour'>Overrides some gender appearance modifiers, including the femininity factor of pregnant bellies. Player descriptions will match the behaviour chosen in the bedroom mirror.</span> <span class='red inline-colour'>Disables crossdressing warnings. NPCs will still judge gender based on your manner of dress.</span>";
				break;
			case 0:
				text = "NPCs will <span class='blue inline-colour'>ignore</span> your genitals when perceiving your gender.";
				break;
			case 1:
				text = "NPCs will <span class='purple inline-colour'>consider</span> your genitals when perceiving your gender.";
				break;
			case 2:
				text = "NPCs will <span class='red inline-colour'>judge</span> your gender based on your genitals.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		$("#numberslider-value-nudegenderdc").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		jQuery("#numberslider-input-nudegenderdc")
			.on("input change", function (e) {
				updateText();
			})
			.css("width", "100%");
	});
}
window.settingsNudeGenderAppearance = settingsNudeGenderAppearance;

function settingsBodywriting() {
	const updateText = () => {
		let val = V.bodywritingLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "NPCs may <span class='green inline-colour'>not</span> write on you.";
				break;
			case 1:
				text = "NPCs may <span class='blue inline-colour'>ask</span> to write on you.";
				break;
			case 2:
				text = "NPCs may <span class='purple inline-colour'>forcibly</span> write on you.";
				break;
			case 3:
				text = "NPCs may <span class='red inline-colour'>forcibly</span> write on and <span class='red inline-colour'>tattoo</span> you.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		// delete the below code when $bodywritingdisable is fully replaced by $bodywritingLvl
		V.bodywritingdisable = "f";
		if (val === 0) V.bodywritingdisable = "t";

		$("#numberslider-value-bodywritinglvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-bodywritinglvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsBodywriting = settingsBodywriting;

function settingsNamedNpcBreastSize(id, persist) {
	const breastSizes = ["nipple", "budding", "tiny", "small", "pert", "modest", "full", "large", "ample", "massive", "huge", "gigantic", "enormous"];

	const updateText = () => {
		const npc = persist ? V.per_npc[T.pNPCId] : V.NPCName[T.npcId];
		const val = npc.breastsize;

		const text = breastSizes[val];

		if (val > 0) {
			npc.breastdesc = text + " breast";
			npc.breastsdesc = text + " breasts";
		} else {
			npc.breastdesc = text;
			npc.breastsdesc = text + "s";
		}

		$("#numberslider-value-" + id).text(npc.breastsdesc);
	};

	$(() => {
		updateText();
		$("#numberslider-input-" + id).on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsNamedNpcBreastSize = settingsNamedNpcBreastSize;

function settingsGenericGenders(id) {
	let slider = null;
	const updateText = () => {
		let val = null;
		let attraction = null;
		let men = null;
		let women = null;

		if (id === "beasts") {
			val = V.beastmalechance;
			slider = "beastmalechance";
		} else if (id === "NPCs") {
			val = V.malechance;
			slider = "malechance";
		} else if (id === "mlm") {
			val = V.maleChanceMale;
			slider = "malechancemale";
			attraction = "<span class='blue inline-colour'>attracted to men</span>";
			men = "men";
			women = "women";
		} else if (id === "wlw") {
			val = V.maleChanceFemale;
			slider = "malechancefemale";
			attraction = "<span class='pink inline-colour'>attracted to women</span>";
			men = "men";
			women = "women";
		} else if (id === "blm") {
			val = V.beastMaleChanceMale;
			slider = "beastmalechancemale";
			attraction = "<span class='blue inline-colour'>attracted to men</span>";
			men = "male beasts";
			women = "female beasts";
		} else if (id === "blw") {
			val = V.beastMaleChanceFemale;
			slider = "beastmalechancefemale";
			attraction = "<span class='pink inline-colour'>attracted to women</span>";
			men = "male beasts";
			women = "female beasts";
		} else {
			val = V.malevictimchance;
			slider = "malevictimchance";
		}

		let text = null;

		if (id === "mlm" || id === "wlw" || id === "blw" || id === "blm") {
			switch (val) {
				case 100:
					text = `<span class='gold inline-colour'>No</span> <span class='pink inline-colour'>${women}</span> and <span class='gold inline-colour'>all</span> <span class='blue inline-colour'>${men}</span> will be ${attraction}.`;
					break;
				case 0:
					text = `<span class='gold inline-colour'>All</span> <span class='pink inline-colour'>${women}</span> and <span class='gold inline-colour'>no</span> <span class='blue inline-colour'>${men}</span> will be  ${attraction}.`;
					break;
				default:
					text = `<span class='gold inline-colour'>${
						100 - val
					}%</span> of <span class='pink inline-colour'>${women}</span> and <span class='gold inline-colour'>${val}%</span> of <span class='blue inline-colour'>${men}</span> will be ${attraction}.`;
					break;
			}
		} else {
			if (val === 100) {
				text = `<span class='gold inline-colour'>All</span> ${id} will be <span class='blue inline-colour'>male</span>.`;
			} else if (val === 0) {
				text = `<span class='gold inline-colour'>All</span> ${id} will be <span class='pink inline-colour'>female</span>.`;
			} else if (val === 50) {
				text =
					id.charAt(0).toUpperCase() +
					id.slice(1) +
					" will be <span class='gold inline-colour'>evenly</span> split between <span class='blue inline-colour'>male</span> and <span class='pink inline-colour'>female</span> genders.";
			} else if (val > 50) {
				text = `<span class='gold inline-colour'>${val}%</span> of ${id} will be <span class='blue inline-colour'>male</span>.`;
			} else {
				text = `<span class='gold inline-colour'>${100 - val}%</span> of ${id} will be <span class='pink inline-colour'>female</span>.`;
			}
		}

		jQuery("#numberslider-value-" + slider)
			.text("")
			.append(text)
			.addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-" + slider).on("input change", function (e) {
			updateText();
		});
	});
}

window.settingsGenericGenders = settingsGenericGenders;

function settingsMonsterChance() {
	const updateText = () => {
		const val = V.monsterchance;
		let text = null;

		switch (val) {
			case 100:
				text = "Beasts will <span class='gold inline-colour'>always</span> be monster girls and boys.";
				break;
			case 0:
				text = "Beasts will <span class='gold inline-colour'>never</span> appear as monster girls and boys, unless allowed while hallucinating.";
				break;
			case 50:
				text = "<span class='gold inline-colour'>Half</span> of all beasts will be replaced by monster girls and boys.";
				break;
			default:
				text = `<span class='gold inline-colour'>${val}%</span> of beasts will be replaced by monster girls and boys.`;
				break;
		}

		jQuery("#numberslider-value-monsterchance").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-monsterchance").on("input change", function (e) {
			updateText();
		});
	});
}

window.settingsMonsterChance = settingsMonsterChance;

function settingsBeastGenders(singleUpdate) {
	const updateText = () => {
		const val = T.beastmalechance;
		let text = null;
		switch (val) {
			case 100:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>All</span> beasts will prefer the <span class='gold inline-colour'>opposite sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>All</span> beasts will be <span class='blue inline-colour'>male</span>.";
				}
				break;
			case 75:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span> of beasts will prefer the <span class='gold inline-colour'>opposite sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>75%</span> of beasts will be <span class='blue inline-colour'>male.</span>";
				}
				break;
			case 50:
				if (T.beastMaleChanceSplit === "t") {
					text = "Beast sexual preferences will be <span class='gold inline-colour'>randomly</span> split.";
				} else {
					text =
						"Beasts will be <span class='gold inline-colour'>evenly</span> split between <span class='blue inline-colour'>male</span> and <span class='pink inline-colour'>female</span> genders.";
				}
				break;
			case 25:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span> of beasts will prefer the <span class='gold inline-colour'>same sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>75%</span> of beasts will be <span class='pink inline-colour'>female.</span>";
				}
				break;
			case 0:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>All</span> beasts will prefer the <span class='gold inline-colour'>same sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>All</span> beasts will be <span class='pink inline-colour'>female.</span>";
				}
				break;
			default:
				if (T.beastMaleChanceSplit === "t") {
					text = "Beast sexual preferences will be <span class='gold inline-colour'>randomly</span> split.";
				} else {
					text = "<span class='gold inline-colour'>" + V.beastmalechance + "%</span> of beasts will be <span class='blue inline-colour'>male.</span>";
				}
				break;
		}
		jQuery("#numberslider-value--beastmalechance").text("").append(text).addClass("small-description");
	};

	if (!singleUpdate) {
		$(() => {
			updateText();
			$("#numberslider-input--beastmalechance").on("input change", function (e) {
				updateText();
			});
		});
	} else {
		updateText();
	}
}
window.settingsBeastGenders = settingsBeastGenders;

function settingsNpcGenders(singleUpdate) {
	const updateText = () => {
		const val = T.malechance;
		let text = null;
		switch (val) {
			case 100:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>All</span> NPCs will prefer the <span class='gold inline-colour'>opposite sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>All</span> NPCs will be <span class='blue inline-colour'>male</span>.";
				}
				break;
			case 75:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span> of NPCs will prefer the <span class='gold inline-colour'>opposite sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>75%</span> of NPCs will be <span class='blue inline-colour'>male.</span>";
				}
				break;
			case 50:
				if (T.maleChanceSplit === "t") {
					text = "NPC sexual preferences will be <span class='gold inline-colour'>randomly</span> split.";
				} else {
					text =
						"NPCs will be <span class='gold inline-colour'>evenly</span> split between <span class='blue inline-colour'>male</span> and <span class='pink inline-colour'>female</span> genders.";
				}
				break;
			case 25:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span> of NPCs will prefer the <span class='gold inline-colour'>same sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>75%</span> of NPCs will be <span class='pink inline-colour'>female.</span>";
				}
				break;
			case 0:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>All</span> NPCs will prefer the <span class='gold inline-colour'>same sex</span>.";
				} else {
					text = "<span class='gold inline-colour'>All</span> NPCs will be <span class='pink inline-colour'>female.</span>";
				}
				break;
			default:
				if (T.maleChanceSplit === "t") {
					text = "NPC sexual preferences will be <span class='gold inline-colour'>randomly</span> split.";
				} else {
					text = "<span class='gold inline-colour'>" + V.malechance + "%</span> of NPCs will be <span class='blue inline-colour'>male.</span>";
				}
				break;
		}
		jQuery("#numberslider-value--malechance").text("").append(text).addClass("small-description");
	};

	if (!singleUpdate) {
		$(() => {
			updateText();
			$("#numberslider-input--malechance").on("input change", function (e) {
				updateText();
			});
		});
	} else {
		updateText();
	}
}
window.settingsNpcGenders = settingsNpcGenders;

// Checks current settings page for data attributes
// Run only when settings tab is changed (probably in "displaySettings" widget)
// data-target is the target element that needs to be clicked for the value to be updated
// data-disabledif is the conditional statement (e.g. data-disabledif="V.per_npc[T.pNPCId].gender==='f'")

function settingsDisableElement() {
	$(() => {
		$("[data-disabledif]").each(function () {
			const updateButtonsActive = () => {
				$(() => {
					try {
						const evalStr = "'use strict'; return " + disabledif;
						// eslint-disable-next-line no-new-func
						const cond = Function(evalStr)();
						const style = cond ? "var(--500)" : "";
						orig.css("color", style).children().css("color", style);
						orig.find("input").prop("disabled", cond);
					} catch (e) {
						console.log(e);
					}
				});
			};
			const orig = $(this);
			const disabledif = orig.data("disabledif");
			[orig.data("target")].flat().forEach(e => $("[name$='" + Util.slugify(e) + "']").on("click", updateButtonsActive));
			if (disabledif) {
				updateButtonsActive();
			}
		});
	});
}
window.settingsDisableElement = settingsDisableElement;

// Adds event listeners to input on current page
// mainly used for options overlay
function onInputChanged(func) {
	if (!func || typeof func !== "function") return;
	$(() => {
		$("input, select").on("change", function () {
			func();
		});
	});
}
window.onInputChanged = onInputChanged;

function closeOverlay() {
	wikifier("journalNotesTextareaSave");
	updateOptions();
	T.buttons.reset();
	$("#customOverlay").addClass("hidden").parent().addClass("hidden");
	$.event.trigger(":oncloseoverlay", [T.currentOverlay]);
	delete T.currentOverlay;
	delete V.tempDisable;
}
window.closeOverlay = closeOverlay;

function journalNotesReplacer(name) {
	return name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5' _-]+/g, "");
}
window.journalNotesReplacer = journalNotesReplacer;

function updatehistorycontrols() {
	// if undefined, initiate new variable based on engine config
	if (V.options.maxStates === undefined) V.options.maxStates = Config.history.maxStates;
	else Config.history.maxStates = V.options.maxStates; // update engine config

	// enable fast rng re-roll on "keypad *" for debug and testing
	if (V.debug || V.cheatdisable === "f" || V.testing) Links.disableRNGReload = false;
	else Links.disableRNGReload = true;

	// option to still record history without showing the controls, for better debugging
	if (V.options.maxStates === 1 || !V.options.historyControls || V.ironmanmode) {
		// hide nav panel when it's useless or set to not be displayed
		Config.history.controls = false;
		jQuery("#ui-bar-history").hide();
	} else if (Config.history.maxStates > 1) {
		// or unhide it otherwise, if config allows
		Config.history.controls = true;
		jQuery("#ui-bar-history").show();
	}
}
window.updatehistorycontrols = updatehistorycontrols;
DefineMacro("updatehistorycontrols", updatehistorycontrols);

/*
	Refreshes the game when exiting options menu - applying the options object after State has been restored.
	It is done this way to prevent exploits by re-rendering the same passage
*/
function updateOptions() {
	if (T.currentOverlay === "options" && T.optionsRefresh && V.passage !== "Start") {
		updatehistorycontrols();
		const optionsData = clone(V.options);
		const tmpButtons = T.buttons;
		const tmpKey = T.key;

		if (!State.restore(true)) return; // don't do anything if state couldn't be restored
		V.options = optionsData;
		State.show();

		T.key = tmpKey;
		T.buttons = tmpButtons;
		T.buttons.setupTabs();
		if (T.key !== "options") {
			T.buttons.setActive(T.buttons.activeTab);
		}
		Weather.Observables.checkForUpdate();
	}
}
window.updateOptions = updateOptions;

$(document).on("click", "#cbtToggleMenu .cbtToggle", function (e) {
	$("#cbtToggleMenu").toggleClass("visible");
});

function elementExists(selector) {
	return document.querySelector(selector) !== null;
}
window.elementExists = elementExists;

window.getCharacterViewerDate = () => {
	const textArea = document.getElementById("characterViewerDataInput");
	textArea.value = JSON.stringify(V.characterViewer);
};

window.loadCharacterViewerDate = () => {
	const textArea = document.getElementById("characterViewerDataInput");
	let data;
	try {
		data = JSON.parse(textArea.value);
	} catch (e) {
		textArea.value = "Invalid JSON";
	}
	const original = clone(V.characterViewer);

	if (typeof data === "object" && !Array.isArray(data) && data !== null) {
		V.characterViewer = {
			...original,
			...data.clothesEquipped,
			...data.clothesIntegrity,
			...data.bodyState,
			...data.colours,
			...data.skinColour,
			...data.controls,
		};
		State.display(V.passage);
	} else {
		textArea.value = "Invalid Import";
	}
};

function updateCaptionTooltip() {
	const elementId = "#characterTooltip";
	const element = $(elementId);
	const content = $("<div>");
	const canvas = $("#img canvas");
	const fragment = document.createDocumentFragment();
	const updateTooltip = () => {
		if (V.intro) return;
		fragment.append(wikifier("clothingCaptionText"));
		content.append(fragment);
		element.tooltip({
			message: content,
			delay: 200,
			position: "cursor",
		});
	};

	let isMouseOverElement = false;

	// Workaround for trickle-through on the canvas
	// So that the contextmenu works while having tooltips in an element below it (to define the area where tooltip shows up)
	const checkMousePosition = e => {
		if (!e || typeof e.clientX !== "number" || typeof e.clientY !== "number") {
			return;
		}
		const isCurrentlyOverElement = $(document.elementsFromPoint(e.clientX, e.clientY)).is("#characterTooltip");

		// Only trigger events if the status has changed
		if (isCurrentlyOverElement && !isMouseOverElement) {
			element.trigger("mouseenter");
			canvas.css("cursor", "help");
			isMouseOverElement = true;
		} else if (!isCurrentlyOverElement && isMouseOverElement) {
			element.trigger("mouseleave");
			$(".tooltip-popup").remove();
			canvas.css("cursor", "");
			isMouseOverElement = false;
		}

		// If the mouse is currently over the element, trigger mousemove as well
		if (isCurrentlyOverElement) {
			element.trigger({
				type: "mousemove",
				pageX: e.pageX,
				pageY: e.pageY,
			});
		}
	};

	updateTooltip();
	$(document).off(":passageend", updateCaptionTooltip);
	$(document).on(":passageend", updateCaptionTooltip);
	// Add event listeners only when the mouse is over the canvas
	canvas.on("mouseenter", () => {
		$(document).on("mousemove", checkMousePosition);
	});

	canvas.on("mouseleave", () => {
		$(document).off("mousemove", checkMousePosition);
		if (isMouseOverElement) {
			// Cleanup if mouse leaves the canvas while over the tooltip element
			element.trigger("mouseleave");
			$(".tooltip-popup").remove();
			canvas.css("cursor", "");
			isMouseOverElement = false;
		}
	});
}
$(() => updateCaptionTooltip());
window.updateCaptionTooltip = updateCaptionTooltip;

function returnTimeFormat() {
	if (!V || !V.options) return "en-GB";
	return V.options.dateFormat;
}
window.returnTimeFormat = returnTimeFormat;

/* Temporary until npc rework */
function sensitivityString(value) {
	if (value >= 3.5) return "sensitive";
	if (value >= 2.5) return "tender";
	if (value >= 1.5) return "receptive";
	return "normal";
}

window.sensitivityString = sensitivityString;

function moneyStatsProcess(stats) {
	const keys = [];
	Object.entries(stats).forEach(([type, value]) => {
		if (!T.moneyStatsDetailed) {
			let compressTo;
			if (type.includes("DanceTip")) {
				compressTo = "danceTips";
			} else if (type.includes("DanceJob")) {
				compressTo = "danceJobs";
			} else if (type.includes("Prostitution")) {
				compressTo = "prostitution";
			} else {
				switch (type) {
					case "libraryBooks":
					case "schoolProject":
					case "schoolCondoms":
					case "schoolStimulant":
					case "schoolPoolParty":
						compressTo = "school";
						break;
					case "bus":
						compressTo = "town";
						break;
					case "avery":
					case "bailey":
					case "baileyRent":
					case "robin":
					case "sydney":
					case "whitney":
						compressTo = "peopleOfInterest";
						break;
					case "hairdressers":
					case "tailor":
					case "clothes":
					case "sexToys":
					case "tattoo":
					case "furniture":
					case "cosmetics":
					case "supermarket":
						compressTo = "shopping";
						break;
					case "flatsCanal":
					case "flatsCleaning":
					case "flatsHookah":
						compressTo = "flats";
						break;
					case "cafeWaiter":
					case "cafeChef":
					case "cafeBuns":
						compressTo = "cafe";
						break;
					case "brothelShow":
					case "brothelVendingMachine":
					case "brothelCondoms":
						compressTo = "brothel";
						break;
					case "hospitalPaternityTest":
					case "hospitalPenisReduction":
					case "hospitalPenisEnlargement":
					case "hospitalBreastReduction":
					case "hospitalBreastEnlargement":
					case "hospitalParasiteRemoval":
					case "hospitalParasitesSold":
						compressTo = "hospital";
						break;
					case "pharmacyCondoms":
					case "pharmacyCream":
					case "pharmacyPills":
					case "pharmacyPregnancyTest":
					case "pharmacyBreastPump":
					case "pharmacyAfterPill":
						compressTo = "pharmacy";
						break;
					case "museumAntique":
						compressTo = "museum";
						break;
					case "pubAlcohol":
						compressTo = "pub";
						break;
					case "dockWage":
						compressTo = "docks";
						break;
					case "stripClubBartender":
					case "stripClubDancer":
						compressTo = "stripClub";
						break;
				}
			}

			if (compressTo) {
				if (!stats[compressTo]) {
					stats[compressTo] = { earned: 0, earnedCount: 0, spent: 0, spentCount: 0 };
				}
				if (value.earned) {
					stats[compressTo].earned = (stats[compressTo].earned || 0) + value.earned;
					stats[compressTo].earnedCount = (stats[compressTo].earnedCount || 0) + value.earnedCount;
					stats[compressTo].earnedTimeStamp = Math.max(0, stats[compressTo].earnedTimeStamp || 0, value.earnedTimeStamp || 0);
				}
				if (value.spent) {
					stats[compressTo].spent = (stats[compressTo].spent || 0) + value.spent;
					stats[compressTo].spentCount = (stats[compressTo].spentCount || 0) + value.spentCount;
					stats[compressTo].spentTimeStamp = Math.max(0, stats[compressTo].spentTimeStamp || 0, value.spentTimeStamp || 0);
				}
				delete stats[type];
				keys.pushUnique(compressTo);
				return;
			}
		}
		keys.pushUnique(type);
	});
	const total = { earned: 0, earnedCount: 0, spent: 0, spentCount: 0 };
	Object.values(stats).forEach(stat => {
		if (stat.earned) total.earned += stat.earned;
		if (stat.earnedCount) total.earnedCount += stat.earnedCount;
		if (stat.spent) total.spent += stat.spent;
		if (stat.spentCount) total.spentCount += stat.spentCount;

		if (stat.earnedTimeStamp) total.earnedTimeStamp = Math.max(stat.earnedTimeStamp, total.earnedTimeStamp || 0);
		if (stat.spentTimeStamp) total.spentTimeStamp = Math.max(stat.spentTimeStamp, total.spentTimeStamp || 0);
	});

	return [keys, stats, total];
}
window.moneyStatsProcess = moneyStatsProcess;

/**
 * If hasSexStat() modifiers are allowing the player to see an aditional option, return the css class for the largest individual modifier.
 * If the modifiers are not high enough to show a new option, don't return a class.
 * Passing in 0 or nothing for requiredLevel returns the classes for the largest modifier regardless of if the player is being shown an aditional option.
 *
 * Returns the sexStat Modifer CSS classes drunk-text / jitter-text and the level of the effect (drunk-1, jitter-2...)
 *
 * When text animations are turned off, this will only return drunk-text or jitter-text without the animation level.
 *
 * @param {string} input
 * @param {number} requiredLevel
 */
function getLargestSexStatModifierCssClasses(input, requiredLevel = 0) {
	const statName = sexStatNameMapper(input);
	// check if stat name is valid.
	if (statName == null) {
		Errors.report(`[getLargestSexStatModifierCssClasses]: input '${statName}' null.`, {
			Stacktrace: Utils.GetStack(),
			statName,
		});
		return "";
	}

	const drunkSexStatModifierValue = drunkSexStatModifier(V[statName]);
	const heatRutSexStatModifierValue = heatRutSexStatModifier(statName);

	// If there is a modifier, and either requiredLevel is 0 or the modifiers put the player up a level of the sexStat.
	if (
		drunkSexStatModifierValue + heatRutSexStatModifierValue > 0 &&
		(requiredLevel === 0 || (!hasSexStat(statName, requiredLevel, false) && hasSexStat(statName, requiredLevel, true)))
	) {
		const modifiers = [
			{ value: drunkSexStatModifierValue, class: "drunk" },
			{ value: heatRutSexStatModifierValue, class: "jitter" },
		];

		// Gets the largest modifier.
		const largestModifier = modifiers.reduce((max, current) => (current.value > max.value ? current : max), modifiers[0]);

		// Gets the base class for effect.
		let modifierClasses = `${largestModifier.class}-text`;

		if (V.options.textAnimations) {
			// Sets the animation based on how large the modifier is.
			if (largestModifier.value > 20) {
				modifierClasses += ` ${largestModifier.class}-3`;
			} else if (largestModifier.value > 10) {
				modifierClasses += ` ${largestModifier.class}-2`;
			} else {
				modifierClasses += ` ${largestModifier.class}-1`;
			}

			modifierClasses += ` animation-offset-${Math.floor(Math.random() * 10)}`;
		}

		return modifierClasses;
	} else {
		return "";
	}
}
window.getLargestSexStatModifierCssClasses = getLargestSexStatModifierCssClasses;

/**
 * Used to display the drunk text, with with animations if enabled, otherwise just the glow effect.
 *
 * @returns {string}
 */
function basicDrunkCss() {
	return V.options.textAnimations ? "drunk-text drunk-1" : "drunk-text";
}
window.basicDrunkCss = basicDrunkCss;

/**
 * Used to display the jitter text, with with animations if enabled, otherwise just the glow effect.
 *
 * @returns {string}
 */
function basicJitterCss() {
	return V.options.textAnimations ? "jitter-text drunk-1" : "jitter-text";
}
window.basicJitterCss = basicJitterCss;
