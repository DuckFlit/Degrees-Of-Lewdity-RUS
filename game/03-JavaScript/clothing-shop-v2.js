function getIntegrityInfo(integrity) {
	if (integrity >= 900) return [7, "green"];
	if (integrity >= 500) return [6, "teal"];
	if (integrity >= 200) return [5, "lblue"];
	if (integrity >= 100) return [4, "blue"];
	if (integrity >= 50) return [3, "purple"];
	if (integrity >= 20) return [2, "pink"];
	return [1, "red"];
}
window.getIntegrityInfo = getIntegrityInfo;

function getRevealInfo(reveal) {
	if (reveal >= 900) return [7, "red"];
	if (reveal >= 700) return [6, "pink"];
	if (reveal >= 500) return [5, "purple"];
	if (reveal >= 300) return [4, "blue"];
	if (reveal >= 200) return [3, "lblue"];
	if (reveal >= 100) return [2, "teal"];
	return [1, "green"];
}
window.getRevealInfo = getRevealInfo;

function getWarmthInfo(warmth) {
	if (warmth >= 75) return [5, "warm-4"];
	if (warmth >= 50) return [4, "warm-3"];
	if (warmth >= 25) return [3, "warm-2"];
	if (warmth >= 10) return [2, "warm-1"];
	return [1, "warm-0"];
}
window.getWarmthInfo = getWarmthInfo;

// for outfits it adds the lower piece's warmth too
function getTrueWarmth(item) {
	let warmth = item.warmth || 0;

	if (item.outfitPrimary) {
		// sum of warmth of every secondary piece
		// outfitPrimary looks like this {'lower': 'item_name', 'head': 'item_name'}
		warmth += Object.keys(item.outfitPrimary) // loop through secondary items list
			.filter(x => item.outfitPrimary[x] !== "broken") // filter out broken pieces
			.map(x => setup.clothes[x].find(z => z.name === item.outfitPrimary[x] && z.modder === item.modder)) // find items in setup.clothes
			.reduce((sum, x) => sum + (x.warmth || 0), 0); // calculate sum of their warmth field
	}

	if (item.outfitSecondary) {
		if (item.outfitSecondary.length % 2 !== 0) console.log("WARNING: " + item.name + " has bad .outfitSecondary data!");

		// outfitSecondary looks like this ['upper', 'item_name', 'head', 'item_name']
		item.outfitSecondary.forEach((x, i) => {
			if (i % 2 === 0 && item.outfitSecondary[i + 1] !== "broken") {
				warmth += setup.clothes[x].find(z => z.name === item.outfitSecondary[i + 1] && z.modder === item.modder).warmth || 0;
			}
		});
	}

	return warmth;
}
window.getTrueWarmth = getTrueWarmth;

function clothingSlotToIconName(slotName, outfits) {
	switch (slotName) {
		case "over_upper":
			return "overoutfit";
		case "upper":
			return outfits ? "outfit" : "upper";
		case "under_upper":
			return outfits ? "underoutfit" : "underupper";
		case "under_lower":
			return "underlower";
		default:
			return slotName;
	}
}
window.clothingSlotToIconName = clothingSlotToIconName;

// Make .divs-links clickable as if they're anchors
function linkifyDivs(parentSelector = "") {
	$(() => {
		$(parentSelector + " .div-link").click(function (e) {
			$(this).find("a").first().click();
		});
	});
	$(() => {
		$(parentSelector + " .div-link a").click(function (e) {
			e.stopPropagation();
		});
	});
}
window.linkifyDivs = linkifyDivs;

// Hook custom colour sliders and preset dropdowns
function attachCustomColourHooks(slot = "") {
	$(() => {
		// throttling for smoother experience
		let updating = false;
		$(".custom-colour-sliders.primary input[type=range]").on("input change", () => {
			if (updating) return;
			updating = true;
			requestAnimationFrame(() => {
				updating = false;
				updateCustomColour("primary", slot);
				updateMannequin(slot);
			});
		});
		$(".custom-colour-sliders.secondary input[type=range]").on("input change", () => {
			if (updating) return;
			updating = true;
			requestAnimationFrame(() => {
				updating = false;
				updateCustomColour("secondary", slot);
				updateMannequin(slot);
			});
		});
		$(".custom-colour.primary > .custom-colour-presets > .presets-dropdown > select").on("change", () => {
			loadCustomColourPreset("primary");
			Wikifier.wikifyEval("<<updateclotheslist>>");
		});
		$(".custom-colour.secondary > .custom-colour-presets > .presets-dropdown > select").on("change", () => {
			loadCustomColourPreset("secondary");
			Wikifier.wikifyEval("<<updateclotheslist>>");
		});

		$(".custom-colour-sliders.primary > .colour-slider > div > input").on("input", e => {
			V.customColors.sepia.primary = 0;
		});
		$(".custom-colour-sliders.secondary > .colour-slider > div > input").on("input", e => {
			V.customColors.sepia.secondary = 0;
		});
	});
}
window.attachCustomColourHooks = attachCustomColourHooks;

function updateCustomColour(type, slot) {
	$(".colour-options-div." + type + " > .colour-button > .bg-custom").css("filter", getCustomColourStyle(type, true));
	const model = Renderer.locateModel("main", "shop");
	if (model) {
		const customColors = V.customColors;
		model.options.filters["worn_" + slot + (type === "primary" ? "_custom" : "_acc_custom")] = getCustomClothesColourCanvasFilter(
			customColors.color[type],
			customColors.saturation[type],
			customColors.brightness[type],
			customColors.contrast[type]
		);
	}
}
window.updateCustomColour = updateCustomColour;

function updateMannequin(slot = "") {
	Wikifier.wikifyEval("<<updatemannequin '" + slot + "'>>");
}
window.updateMannequin = updateMannequin;

function getCustomColourStyle(type, valueOnly = false) {
	if (type !== "primary" && type !== "secondary") return;
	return (
		(valueOnly ? "" : "filter: ") +
		"hue-rotate(" +
		V.customColors.color[type] +
		"deg) saturate(" +
		V.customColors.saturation[type] +
		") brightness(" +
		V.customColors.brightness[type] +
		") contrast(" +
		V.customColors.contrast[type] +
		")" +
		(valueOnly ? "" : ";")
	);
}
window.getCustomColourStyle = getCustomColourStyle;

function saveCustomColourPreset(slot = "primary") {
	const setName = prompt("Enter new colour preset name", "New preset");
	if (setName != null) {
		if (Object.keys(V.customColors.presets).includes(setName)) {
			alert("Preset '" + setName + "' already exists!");
			return;
		}

		V.customColors.presets[setName] = {
			ver: 3,
			color: V.customColors.color[slot],
			value: V.customColors.value[slot],
			brightness: V.customColors.brightness[slot],
			saturation: V.customColors.saturation[slot],
			contrast: V.customColors.contrast[slot],
		};
	}
}
window.saveCustomColourPreset = saveCustomColourPreset;

const colourPickerShopCustom = {};

function loadCustomColourPreset(slot = "primary") {
	const setName = T.preset_choice[slot];
	const preset = V.customColors.presets[setName];
	if (preset) {
		// ver 3 includes property "value" which is used to set the position of the "value"(aka brightness) custom slider at shop, see here : https://i.imgur.com/hmbFT4U.png
		if (preset.ver >= 3) {
			V.customColors.value[slot] = preset.value;
			// this effectively set the different sliders values
			colourPickerShopCustom[slot].color.hue = preset.color;
			colourPickerShopCustom[slot].color.saturation = (((preset.saturation / 32) * 100) / 4) * 100;
			colourPickerShopCustom[slot].color.value = preset.value;
		}
		// new version of preset (has only one set of colour parameters and doesn't have sepia)
		if (preset.ver >= 2) {
			V.customColors.color[slot] = preset.color;
			V.customColors.brightness[slot] = preset.brightness;
			V.customColors.saturation[slot] = preset.saturation;
			V.customColors.contrast[slot] = preset.contrast;
			V.customColors.sepia[slot] = 0;
		}
		// legacy preset (has both primary and secondary colours information)
		else {
			V.customColors.color.primary = preset.color.primary;
			V.customColors.brightness.primary = preset.brightness.primary;
			V.customColors.saturation.primary = preset.saturation.primary;
			V.customColors.contrast.primary = preset.contrast.primary;
			V.customColors.sepia.primary = preset.sepia.primary;

			V.customColors.color.secondary = preset.color.secondary;
			V.customColors.brightness.secondary = preset.brightness.secondary;
			V.customColors.saturation.secondary = preset.saturation.secondary;
			V.customColors.contrast.secondary = preset.contrast.secondary;
			V.customColors.sepia.secondary = preset.sepia.secondary;
		}
	}
}
window.loadCustomColourPreset = loadCustomColourPreset;

// adjusts available options for reveal dropdowns (makes sure upper bound is not below lower bound and vice versa)
function getFilterRevealOptions(type) {
	const optionsFrom = { unassuming: 0, smart: 100, tasteful: 200, comfy: 300, seductive: 500, risqué: 700, lewd: 900 };
	const optionsTo = { unassuming: 100, smart: 200, tasteful: 300, comfy: 500, seductive: 700, risqué: 900, lewd: 9999 };

	if (type === "from") {
		// this line removes values that are larger than reveal.to
		return Object.keys(optionsFrom)
			.filter(x => optionsFrom[x] < V.shopClothingFilter.reveal.to)
			.reduce((res, key) => ((res[key] = optionsFrom[key]), res), {});
	} else {
		// this line removes values that are smaller than reveal.from
		return Object.keys(optionsTo)
			.filter(x => optionsTo[x] > V.shopClothingFilter.reveal.from)
			.reduce((res, key) => ((res[key] = optionsTo[key]), res), {});
	}
}
window.getFilterRevealOptions = getFilterRevealOptions;

// toggles checkboxes in filters menu
function toggleAllTraitsFilter() {
	const chboxes = $("#filter-traits input:not(:checked)");
	if (chboxes.length > 0) chboxes.click();
	else $("#filter-traits input:checked").click();
}
window.toggleAllTraitsFilter = toggleAllTraitsFilter;

// accepts a list of clothes, returns a filtered list of clothes
function applyClothingShopFilters(items) {
	const f = V.shopClothingFilter;
	if (!f.active) return items;

	// (example) turns f.gender object {female: true, neutral: true, male: false} into ["f", "n"], ready to compare with gender in items
	const allowedGenders = Object.keys(f.gender)
		.filter(x => f.gender[x])
		.map(x => x.first());

	return items.filter(
		x =>
			allowedGenders.includes(x.gender) &&
			x.reveal >= f.reveal.from &&
			x.reveal < f.reveal.to &&
			x.warmth >= f.warmth.from &&
			x.warmth < f.warmth.to &&
			(f.traits.length === 0 || f.traits.includesAny(x.type))
	);
}
window.applyClothingShopFilters = applyClothingShopFilters;

function getWarmthScaleData(newWarmth) {
	let maxWarmth = Math.max(260, V.warmth * 1.04);
	if (newWarmth) maxWarmth = Math.max(maxWarmth, newWarmth * 1.04);
	const chill = V.chill;
	const cold = chill - 90;
	const warm = chill * 1.3 + 70;
	const hot = chill * 1.3 + 150;
	const minW = Math.min(V.warmth, newWarmth);
	const maxW = Math.max(V.warmth, newWarmth);

	return {
		cold: (cold / maxWarmth) * 100 + "%",
		chill: ((chill - Math.max(cold, 0)) / maxWarmth) * 100 + "%",
		ok: ((Math.min(warm, maxWarmth) - chill) / maxWarmth) * 100 + "%",
		warm: ((Math.min(hot, maxWarmth) - Math.min(warm, maxWarmth)) / maxWarmth) * 100 + "%",
		hot: ((maxWarmth - hot) / maxWarmth) * 100 + "%",
		nowarm: warm > maxWarmth ? "nowarm" : "",
		nohot: hot > maxWarmth ? "nohot" : "",
		nocold: cold < 0 ? "nocold" : "",
		player: (V.warmth / maxWarmth) * 100 + "%",
		playerNew: ((V.warmth > newWarmth ? minW : maxW) / maxWarmth) * 100 + "%",
		diffUpDown: V.warmth > newWarmth ? "down" : "up",
		diffStart: (minW / maxWarmth) * 100 + "%",
		diffWidth: ((maxW - minW) / maxWarmth) * 100 + "%",
	};
}
window.getWarmthScaleData = getWarmthScaleData;

function getWarmthWithOtherClothing(slot, clothingId) {
	const newClothing = setup.clothes[slot][clothingId];
	const worn = V.worn;

	let newWarmth = V.warmth + getTrueWarmth(newClothing);

	// subtract warmth of all clothes that would be taken off
	if (newClothing.outfitPrimary) {
		// newWarmth -= Object.keys(newClothing.outfitPrimary).reduce((sum, x) => sum + (worn[x].warmth || 0), 0);

		// compile a list of all primary clothes to be removed. It implies that item may have only one primary piece
		const clothesToRemove = [slot, ...Object.keys(newClothing.outfitPrimary)].map(x =>
			worn[x].outfitSecondary && worn[x].outfitSecondary[1] !== "broken"
				? setup.clothes[worn[x].outfitSecondary[0]].find(z => z.name === worn[x].outfitSecondary[1])
				: worn[x]
		);
		const removedClothes = new Set();

		clothesToRemove.forEach(x => {
			if (!removedClothes.has(x.name)) {
				newWarmth -= getTrueWarmth(x);
				removedClothes.add(x.name);
			}
		});
	} else newWarmth -= worn[slot].warmth;

	return newWarmth;
}
window.getWarmthWithOtherClothing = getWarmthWithOtherClothing;

function allClothesSetup() {
	let clothes = [];
	Object.keys(setup.clothes).forEach(slot => {
		if (["all", "over_head", "over_upper", "over_lower"].includes(slot)) return;
		const items = clone(setup.clothes[slot]);
		items.forEach(item => (item.realSlot = slot));
		clothes = clothes.concat(items);
	});
	setup.clothes.all = clothes;
}
window.allClothesSetup = allClothesSetup;

function shopSearchReplacer(name) {
	return name.replace(/[^a-zA-Z0-9' -]+/g, "");
}
window.shopSearchReplacer = shopSearchReplacer;

function getOwnedClothingCount(index, type) {
	const wardrobe = V.wardrobes.shopReturn === "wardrobe" ? V.wardrobe : V.wardrobes[V.wardrobes.shopReturn] || V.wardrobe;
	return wardrobe[type].reduce((p, c) => p + Number(c.index === index), 0);
}
window.getOwnedClothingCount = getOwnedClothingCount;

function importCustomColour(acc) {
	const setName = prompt("Enter custom code", "");
	if (setName != null) {
		const color = JSON.parse(window.atob(setName));
		const colourProperties = Object.getOwnPropertyNames(color);

		if (colourProperties.sort().join(",") === ["color", "saturation", "value", "brightness", "contrast"].sort().join(",")) {
			V.customColors.color[acc] = color.color;
			V.customColors.saturation[acc] = color.saturation;
			V.customColors.value[acc] = color.value;
			V.customColors.contrast[acc] = color.contrast;
			V.customColors.brightness[acc] = color.brightness;
			colourPickerShopCustom[acc].color.hue = color.color;
			colourPickerShopCustom[acc].color.saturation = (((color.saturation / 32) * 100) / 4) * 100;
			colourPickerShopCustom[acc].color.value = color.value;
			document.getElementById("numberslider-input-customcolorscontrastprimary").value = color.contrast.toString();
			document.getElementById("numberslider-value-customcolorscontrastprimary").innerText = color.contrast.toString();
			updateMannequin();
		} else throw "Invalid code. Make sure you copied it properly, without any white spaces around it.";
	}
}
window.importCustomColour = importCustomColour;

function exportCustomColour(acc) {
	const obj = {
		color: V.customColors.color[acc],
		saturation: V.customColors.saturation[acc],
		value: V.customColors.value[acc],
		brightness: V.customColors.brightness[acc],
		contrast: V.customColors.contrast[acc],
	};

	navigator.clipboard.writeText(window.btoa(JSON.stringify(obj)));
	document.getElementById("export-custom-colour-box").outerHTML = `
	<div id="export-custom-colour-box">
		<span class="export-custom-colour-alert">Copied to clipboard!</span>
	</div>`;
	window.setTimeout(() => {
		if (document.getElementById("export-custom-colour-box"))
			document.getElementById("export-custom-colour-box").classList.add("successfully-exported");
	}, 100);
}
window.exportCustomColour = exportCustomColour;

function adaptSliderWidth() {
	if (window.innerWidth > 787) return 400;
	else if (window.innerWidth > 710) return 350;
	else if (window.innerWidth > 667) return 300;
	else if (window.innerWidth > 600) return 230;
	else if (window.innerWidth > 519) return 350;
	else if (window.innerWidth > 463) return 300;
	else return 250;
}

function shopClothCustomColorWheel(acc) {
	const container = document.createElement("label");
	colourPickerShopCustom[acc] = new iro.ColorPicker(container, {
		color: { h: 61, s: 47, v: 100 },
		width: adaptSliderWidth(),
		layout: [
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "hue",
				},
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "saturation",
				},
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "value",
				},
			},
		],
	});
	colourPickerShopCustom[acc].color.hue = V.customColors.color[acc];
	colourPickerShopCustom[acc].color.saturation = (((V.customColors.saturation[acc] / 32) * 100) / 4) * 100;
	colourPickerShopCustom[acc].color.value = V.customColors.value[acc];
	//
	colourPickerShopCustom[acc].on(["color:init", "color:change"], function (color) {
		V.customColors.color[acc] = Math.round(color.hue);
		V.customColors.saturation[acc] = (((color.saturation * 32) / 100) * 4) / 100;
		V.customColors.brightness[acc] = (color.hsl.l * 4) / 100;
		V.customColors.value[acc] = color.value;
		if (document.getElementById("mannequin")) updateMannequin();
	});
	return container;
}
window.shopClothCustomColorWheel = shopClothCustomColorWheel;

function updateHueSlider(newValue, acc) {
	colourPickerShopCustom[acc].color.hue = newValue;
}
window.updateHueSlider = updateHueSlider;

window.addEventListener(
	"resize",
	function (event) {
		for (const cat in colourPickerShopCustom) {
			colourPickerShopCustom[cat].resize(adaptSliderWidth());
		}
	},
	true
);

Macro.add("shopclothingcustomcolourwheel", {
	handler() {
		if (this.args[0]){
			const resp = shopClothCustomColorWheel(this.args[0], this.args[1]);
			this.output.append(resp.children[0]);
		}
	}
});

window.colourPickerShopCustom = colourPickerShopCustom;
