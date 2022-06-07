window.getIntegrityInfo = function (integrity) {
	if (integrity >= 900)
		return [7, "green"];
	if (integrity >= 500)
		return [6, "teal"];
	if (integrity >= 200)
		return [5, "lblue"];
	if (integrity >= 100)
		return [4, "blue"];
	if (integrity >= 50)
		return [3, "purple"];
	if (integrity >= 20)
		return [2, "pink"];
	return [1, "red"];
}

window.getRevealInfo = function (reveal) {
	if (reveal >= 900)
		return [7, "red"];
	if (reveal >= 700)
		return [6, "pink"];
	if (reveal >= 500)
		return [5, "purple"];
	if (reveal >= 300)
		return [4, "blue"];
	if (reveal >= 200)
		return [3, "lblue"];
	if (reveal >= 100)
		return [2, "teal"];
	return [1, "green"];
}

window.getWarmthInfo = function (warmth) {
	if (warmth >= 75)
		return [5, "warm-4"];
	if (warmth >= 50)
		return [4, "warm-3"];
	if (warmth >= 25)
		return [3, "warm-2"];
	if (warmth >= 10)
		return [2, "warm-1"];
	return [1, "warm-0"];
}

// for outfits it adds the lower piece's warmth too
window.getTrueWarmth = function (item) {
	let warmth = item.warmth || 0;

	if (item.outfitPrimary) {
		// sum of warmth of every secondary piece
		// outfitPrimary looks like this {'lower': 'item_name', 'head': 'item_name'}
		warmth += Object.keys(item.outfitPrimary) // loop through secondary items list
		.filter(x => item.outfitPrimary[x] != "broken") // filter out broken pieces
		.map(x => setup.clothes[x].find(z => z.name == item.outfitPrimary[x] && z.modder === item.modder)) // find items in setup.clothes
		.reduce((sum, x) => sum + (x.warmth || 0), 0); // calculate sum of their warmth field
	}

	if (item.outfitSecondary) {
		if (item.outfitSecondary.length % 2 != 0)
			console.log("WARNING: " + item.name + " has bad .outfitSecondary data!");

		// outfitSecondary looks like this ['upper', 'item_name', 'head', 'item_name']
		item.outfitSecondary.forEach((x, i) => {
			if (i % 2 == 0 && item.outfitSecondary[i + 1] != "broken") {
				warmth += setup.clothes[x].find(z => z.name == item.outfitSecondary[i + 1] && z.modder === item.modder).warmth || 0;
			}
		});
	}

	return warmth;
}

window.clothingSlotToIconName = function (slotName, outfits) {
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

// Make .divs-links clickable as if they're anchors
window.linkifyDivs = function (parentSelector = "") {
	$(document).ready(() => { $(parentSelector + " .div-link").click(function (e) { $(this).find('a').first().click(); }) });
	$(document).ready(() => { $(parentSelector + " .div-link a").click(function (e) { e.stopPropagation(); }) });
}

// Hook custom colour sliders and preset dropdowns
window.attachCustomColourHooks = function (slot = "") {
	$(() => {
		// throttling for smoother experience
		let updating = false;
		$('.custom-colour-sliders.primary input[type=range]').on('input change', ()=>{
			if (updating) return;
			updating = true;
			requestAnimationFrame(()=>{
				updating = false;
				updateCustomColour('primary', slot); updateMannequin(slot);
			})
		});
		$('.custom-colour-sliders.secondary input[type=range]').on('input change', ()=>{
			if (updating) return;
			updating = true;
			requestAnimationFrame(()=>{
				updating = false;
				updateCustomColour('secondary', slot); updateMannequin(slot);
			})
		});
		$('.custom-colour.primary > .custom-colour-presets > .presets-dropdown > select').on('change', () => { loadCustomColourPreset('primary'); new Wikifier(null, '<<updateclotheslist>>'); });
		$('.custom-colour.secondary > .custom-colour-presets > .presets-dropdown > select').on('change', () => { loadCustomColourPreset('secondary'); new Wikifier(null, '<<updateclotheslist>>'); });

		$('.custom-colour-sliders.primary > .colour-slider > div > input').on('input', (e) => { V.customColors.sepia.primary = 0; });
		$('.custom-colour-sliders.secondary > .colour-slider > div > input').on('input', (e) => { V.customColors.sepia.secondary = 0; });
	});
}

window.updateCustomColour = function(type, slot) {
	$('.colour-options-div.' + type + ' > .colour-button > .bg-custom').css('filter', getCustomColourStyle(type, true));
	let model = Renderer.locateModel("main", "shop");
	if (model) {
		let customColors = V.customColors;
		model.options.filters["worn_" + slot + (type === "primary" ? "_custom" : "_acc_custom")] =
			getCustomClothesColourCanvasFilter(customColors.color[type],
				customColors.saturation[type],
				customColors.brightness[type],
				customColors.contrast[type]);
	}
}

window.updateMannequin = function(slot = "") {
	new Wikifier(null, '<<updatemannequin "' + slot + '">>');
}

window.getCustomColourStyle = function (type, valueOnly = false) {
	if (type != 'primary' && type != 'secondary')
		return;
	return (valueOnly ? '' : 'filter: ') + 'hue-rotate(' + V.customColors.color[type] + 'deg) saturate(' + V.customColors.saturation[type] + ') brightness(' + V.customColors.brightness[type] + ') contrast(' + V.customColors.contrast[type] + ')' + (valueOnly ? '' : ';');
}

window.saveCustomColourPreset = function (slot = "primary") {
	let setName = prompt("Enter new colour preset name", "New preset");
	if (setName != null) {
		if (Object.keys(V.customColors.presets).includes(setName)) {
			alert('Preset "' + setName + '" already exists!');
			return;
		}

		V.customColors.presets[setName] = {
			ver: 3,
			color: V.customColors.color[slot],
			value: V.customColors.value[slot],
			brightness: V.customColors.brightness[slot],
			saturation: V.customColors.saturation[slot],
			contrast: V.customColors.contrast[slot]
		};
	}
}

window.loadCustomColourPreset = function (slot = "primary") {
	let setName = T.preset_choice[slot];
	let preset = V.customColors.presets[setName];
	if (preset) {
		// ver 3 includes property "value" which is used to set the position of the "value"(aka brightness) custom slider at shop, see here : https://i.imgur.com/hmbFT4U.png
		if (preset.ver >= 3){
			V.customColors.value[slot] = preset.value;
			// this effectively set the different sliders values
			colorPickerShopCustom[slot].color.hue = preset.color;
			colorPickerShopCustom[slot].color.saturation = (((preset.saturation / 32) * 100) / 4) * 100;
			colorPickerShopCustom[slot].color.value = preset.value;
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

// adjusts available options for reveal dropdowns (makes sure upper bound is not below lower bound and vice versa)
window.getFilterRevealOptions = function (type) {
	let optionsFrom = { unassuming: 0, smart: 100, tasteful: 200, comfy: 300, seductive: 500, risqué: 700, lewd: 900 };
	let optionsTo = { unassuming: 100, smart: 200, tasteful: 300, comfy: 500, seductive: 700, risqué: 900, lewd: 9999 };

	if (type == 'from') {
		// this line removes values that are larger than reveal.to
		return Object.keys(optionsFrom).filter(x => optionsFrom[x] < V.shopClothingFilter.reveal.to).reduce((res, key) => (res[key] = optionsFrom[key], res), {})
	}
	else {
		// this line removes values that are smaller than reveal.from
		return Object.keys(optionsTo).filter(x => optionsTo[x] > V.shopClothingFilter.reveal.from).reduce((res, key) => (res[key] = optionsTo[key], res), {})
	}
}

// toggles checkboxes in filters menu
window.toggleAllTraitsFilter = function () {
	let chboxes = $('#filter-traits input:not(:checked)');
	if (chboxes.length > 0)
		chboxes.click();
	else
		$('#filter-traits input:checked').click();
}

// accepts a list of clothes, returns a filtered list of clothes
window.applyClothingShopFilters = function (items) {
	let f = V.shopClothingFilter;
	if (!f.active)
		return items;

	// (example) turns f.gender object {female: true, neutral: true, male: false} into ["f", "n"], ready to compare with gender in items
	let allowedGenders = Object.keys(f.gender).filter(x => f.gender[x]).map(x => x.first());

	return items.filter(x => allowedGenders.includes(x.gender)
		&& x.reveal >= f.reveal.from && x.reveal < f.reveal.to
		&& x.warmth >= f.warmth.from && x.warmth < f.warmth.to
		&& (f.traits.length == 0 || f.traits.includesAny(x.type))
	);
}

window.getWarmthScaleData = function(newWarmth) {
	let maxWarmth = Math.max(260, V.warmth * 1.04);
	if (newWarmth)
		maxWarmth = Math.max(maxWarmth, newWarmth * 1.04);
	let chill = V.chill;
	let cold = chill - 90;
	let warm = chill * 1.3 + 70;
	let hot = chill * 1.3 + 150;
	let minW = Math.min(V.warmth, newWarmth);
	let maxW = Math.max(V.warmth, newWarmth);

	return {
		cold: cold / maxWarmth * 100 + '%',
		chill: (chill - Math.max(cold, 0)) / maxWarmth * 100 + '%',
		ok: (Math.min(warm, maxWarmth) - chill) / maxWarmth * 100 + '%',
		warm: (Math.min(hot, maxWarmth) - Math.min(warm, maxWarmth)) / maxWarmth * 100 + '%',
		hot: (maxWarmth - hot) / maxWarmth * 100 + '%',
		nowarm: warm > maxWarmth ? 'nowarm' : '',
		nohot: hot > maxWarmth ? 'nohot' : '',
		nocold: cold < 0 ? 'nocold' : '',
		player: V.warmth / maxWarmth * 100 + '%',
		playerNew: (V.warmth > newWarmth ? minW : maxW) / maxWarmth * 100 + '%',
		diffUpDown: (V.warmth > newWarmth ? 'down' : 'up'),
		diffStart: minW / maxWarmth * 100 + '%',
		diffWidth: (maxW - minW) / maxWarmth * 100 + '%'
	};
}

window.getWarmthWithOtherClothing = function(slot, clothingId) {
	let newClothing = setup.clothes[slot][clothingId];
	let worn = V.worn;

	let newWarmth = V.warmth + getTrueWarmth(newClothing);

	// subtract warmth of all clothes that would be taken off
	if (newClothing.outfitPrimary) {
		//newWarmth -= Object.keys(newClothing.outfitPrimary).reduce((sum, x) => sum + (worn[x].warmth || 0), 0);

		// compile a list of all primary clothes to be removed. It implies that item may have only one primary piece
		let clothesToRemove = [slot, ...Object.keys(newClothing.outfitPrimary)].map(x => (worn[x].outfitSecondary && worn[x].outfitSecondary[1] != "broken") ? setup.clothes[worn[x].outfitSecondary[0]].find(z => z.name == worn[x].outfitSecondary[1]) : worn[x])
		let removedClothes = new Set();

		clothesToRemove.forEach(x => {
			if (!removedClothes.has(x.name)) {
				newWarmth -= getTrueWarmth(x);
				removedClothes.add(x.name);
			}
		});
	}
	else
		newWarmth -= worn[slot].warmth;

	return newWarmth;
}

window.allClothesSetup = function(){
	let clothes = []
	Object.keys(setup.clothes).forEach(slot => {
		if(['all','over_head','over_upper','over_lower'].includes(slot)) return;
		let items = clone(setup.clothes[slot]);
		items.forEach(item => item.realSlot = slot);
		clothes = clothes.concat(items);
	})
	setup.clothes.all = clothes;
}

window.shopSearchReplacer = function(name){
	return name.replace(/[^a-zA-Z0-9' -]+/g,"");
}

function getOwnedClothingCount(index, type) {
	const wardrobe = V.wardrobes.shopReturn === "wardrobe" ? V.wardrobe : V.wardrobes[V.wardrobes.shopReturn] || V.wardrobe;
	return wardrobe[type].reduce((p, c) => p + Number(c.index === index), 0);
}
window.getOwnedClothingCount = getOwnedClothingCount;

var colorPickerShopCustom = {};

window.importCustomColour = function (acc) {
	const setName = prompt("Enter custom code", "");
	if (setName != null) {
		const color = JSON.parse(window.atob(setName));
		const colour_properties = Object.getOwnPropertyNames(color);

		if (colour_properties.sort().join(',')=== ["color", "saturation", "value", "brightness", "contrast"].sort().join(',')){
			V.customColors.color[acc] = color.color;
			V.customColors.saturation[acc] = color.saturation;
			V.customColors.value[acc] = color.value;
			V.customColors.contrast[acc] = color.contrast;
			V.customColors.brightness[acc] = color.brightness;
			colorPickerShopCustom[acc].color.hue = color.color;
			colorPickerShopCustom[acc].color.saturation = (((color.saturation / 32) * 100) / 4) * 100;
			colorPickerShopCustom[acc].color.value = color.value;
			document.getElementById("numberslider-input-customcolorscontrastprimary").value = color.contrast.toString();
			document.getElementById("numberslider-value-customcolorscontrastprimary").innerText = color.contrast.toString();
			updateMannequin();
		}
		else
			throw "Invalid code. Make sure you copied it properly, without any white spaces around it.";
	}
}

window.exportCustomColour = function (acc) {
	const obj = {color:V.customColors.color[acc], saturation:V.customColors.saturation[acc], value:V.customColors.value[acc], brightness: V.customColors.brightness[acc], contrast:V.customColors.contrast[acc]}

	navigator.clipboard.writeText(window.btoa(JSON.stringify(obj)));
	document.getElementById("export-custom-colour-box").outerHTML =`
	<div id="export-custom-colour-box">
		<span class="export-custom-colour-alert">Copied to clipboard!</span>
	</div>`;
	window.setTimeout(function() {
		if (document.getElementById("export-custom-colour-box"))
			document.getElementById("export-custom-colour-box").classList.add("successfully-exported");
	},100)
}


function adaptSliderWidth(){
	if (window.innerWidth > 787)
		return 400;
	else if (window.innerWidth > 710)
		return 350;	
	else if (window.innerWidth > 667)
		return 300;
	else if (window.innerWidth > 600)
		return 230;
	else if (window.innerWidth > 519)
		return 350;
	else if (window.innerWidth > 463)
		return 300;
	else
		return 250;
}

window.shopClothCustomColorWheel = function(acc){
		const container = document.createElement('label');
		colorPickerShopCustom[acc] = new iro.ColorPicker(container, {
			color: {h:61, s:47, v:100},
			width: adaptSliderWidth(),
			layout: [
				  {
					component: iro.ui.Slider,
					options: {
					  sliderType: 'hue'
					}
				  },
				  {
					component: iro.ui.Slider,
					options: {
					  sliderType: 'saturation'
					}
				  },
				  {
					component: iro.ui.Slider,
					options: {
					  sliderType: 'value'
					}
				  }
			]
		});
		colorPickerShopCustom[acc].color.hue = V.customColors.color[acc];
		colorPickerShopCustom[acc].color.saturation = (((V.customColors.saturation[acc] / 32) * 100) / 4) * 100;
		colorPickerShopCustom[acc].color.value = V.customColors.value[acc];
		//
		colorPickerShopCustom[acc].on(['color:init', 'color:change'], function(color) {
			V.customColors.color[acc] = Math.round(color.hue);
			V.customColors.saturation[acc] = (((color.saturation * 32) / 100) * 4) / 100;
			V.customColors.brightness[acc] = (color.hsl.l * 4) / 100;
			V.customColors.value[acc] = color.value;
			if (document.getElementById("mannequin"))
				updateMannequin();
		});
		return container;
}

function updateHueSlider(new_value, acc){
	colorPickerShopCustom[acc].color.hue = new_value;
}

window.updateHueSlider = updateHueSlider;

window.addEventListener('resize', function(event) {
	for (let cat in colorPickerShopCustom){
		colorPickerShopCustom[cat].resize(adaptSliderWidth());
	}
}, true);

Macro.add('shopclothingcustomcolourwheel', {
	handler() {
		if (this.args[0]){
			const resp = shopClothCustomColorWheel(this.args[0], this.args[1]);
			this.output.append(resp.children[0]);
		}
	}
});