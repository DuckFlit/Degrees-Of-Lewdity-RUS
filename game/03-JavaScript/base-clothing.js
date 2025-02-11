function getClothingCost(item, slot) {
	let cost = setup.clothes[slot][clothesIndex(slot, item)].cost * V.clothesPrice;

	if (
		setup.clothes.under_lower.findIndex(x => x.name === item.name && x.modder === item.modder) >= 0 ||
		setup.clothes.under_upper.findIndex(x => x.name === item.name && x.modder === item.modder) >= 0
	)
		cost *= V.clothesPriceUnderwear;
	else if (item.type.includes("school")) cost *= V.clothesPriceSchool;

	// the lewder item is, the more affected by the multiplier it is
	const lewdness = Math.clamp((item.reveal - 400) / 500, 0, 1);
	const lewdCoef = 1 + (V.clothesPriceLewd - 1) * lewdness;
	cost *= lewdCoef;

	if (V.passage === "School Library Shop") {
		cost *= 1.4 + ((V.delinquency - 500) / 5000 + (C.npc.Sydney.love - 50) / -500);
	}

	return Math.round(cost);
}
window.getClothingCost = getClothingCost;

// Returns the price of the clothing item passed.
// If it's part of an outfit the price is 80% of the full outfit for the primary half
// and 80% for the other halves.
function tailorClothingCost(item, slot) {
	let cost = 0;
	if (setup.clothes[slot][clothesIndex(slot, item)].outfitSecondary) {
		const upperSlot = setup.clothes[slot][clothesIndex(slot, item)].outfitSecondary[0];
		const upperItem = setup.clothes[upperSlot].findIndex(x => x.name === setup.clothes[slot][clothesIndex(slot, item)].outfitSecondary[1]);
		if (upperItem >= 0) cost = setup.clothes[upperSlot][upperItem].cost * V.clothesPrice * 0.2;
	} else if (setup.clothes[slot][clothesIndex(slot, item)].outfitPrimary) {
		cost = setup.clothes[slot][clothesIndex(slot, item)].cost * V.clothesPrice * 0.8;
	} else {
		cost = setup.clothes[slot][clothesIndex(slot, item)].cost * V.clothesPrice;
	}

	if (
		setup.clothes.under_lower.findIndex(x => x.name === item.name && x.modder === item.modder) >= 0 ||
		setup.clothes.under_upper.findIndex(x => x.name === item.name && x.modder === item.modder) >= 0
	)
		cost *= V.clothesPriceUnderwear;
	else if (item.type.includes("school")) cost *= V.clothesPriceSchool;

	// the lewder item is, the more affected by the multiplier it is
	const lewdness = Math.clamp((item.reveal - 400) / 500, 0, 1);
	const lewdCoef = 1 + (V.clothesPriceLewd - 1) * lewdness;
	cost *= lewdCoef;

	return Math.round(cost);
}
window.tailorClothingCost = tailorClothingCost;

// makes all existing specified upper/lower clothes to be over_upper/over_lower
// it assumes that over_xxx equipment slots are empty, otherwise it will overwrite anything in those slots
// use this function in version update widget when over clothes will be ready
function convertNormalToOver() {
	const clothesToConvert = [
		"bathrobe",
		"bathrobe bottom",
		"peacoat",
		"shadbelly coat",
		"puffer jacket",
		"leather jacket",
		"punk leather jacket",
		"vampire jacket",
	];

	// function that converts a clothing item
	const convertItem = item => {
		console.log("converting " + item.name);

		if (item.outfitPrimary) {
			Object.keys(item.outfitPrimary).forEach(slot => {
				if (slot === "upper" || slot === "lower") {
					item.outfitPrimary["over_" + slot] = item.outfitPrimary[slot];
					delete item.outfitPrimary[slot];
				}
			});
		} else if (item.outfitSecondary) {
			for (let i = 0; i < item.outfitSecondary.length; i += 2) {
				if (item.outfitSecondary[i] === "upper" || item.outfitSecondary[i] === "lower") {
					item.outfitSecondary[i] = "over_" + item.outfitSecondary[i];
				}
			}
		}
		if (item.set === "upper" || item.set === "lower") item.set = "over_" + item.set;

		return item;
	};

	for (const index in clothesToConvert) {
		const itemName = clothesToConvert[index];

		// convert clothing sets
		V.outfit.forEach(outf => {
			if (outf.upper === itemName) {
				outf.upper = "naked";
				outf.over_upper = itemName;
				if (outf.colors) {
					outf.colors.over_upper = outf.colors.upper;
					outf.colors.upper = [0, 0];
				}
			}
			if (outf.lower === itemName) {
				outf.lower = "naked";
				outf.over_lower = itemName;
				if (outf.colors) {
					outf.colors.over_lower = outf.colors.lower;
					outf.colors.lower = [0, 0];
				}
			}
		});

		// convert clothes in wardrobe
		for (let i = V.wardrobe.upper.length - 1; i >= 0; i--) {
			if (V.wardrobe.upper[i].name === itemName) {
				V.wardrobe.over_upper.push(convertItem(V.wardrobe.upper[i]));
				V.wardrobe.upper.splice(i, 1);
			}
		}
		for (let i = V.wardrobe.lower.length - 1; i >= 0; i--) {
			if (V.wardrobe.lower[i].name === itemName) {
				V.wardrobe.over_lower.push(convertItem(V.wardrobe.lower[i]));
				V.wardrobe.lower.splice(i, 1);
			}
		}

		// convert worn clothes
		if (V.worn.upper.name === itemName) {
			V.worn.over_upper = convertItem(V.worn.upper);
			V.worn.upper = clone(setup.clothes.upper[0]);
		}
		if (V.worn.lower.name === itemName) {
			V.worn.over_lower = convertItem(V.worn.lower);
			V.worn.lower = clone(setup.clothes.lower[0]);
		}

		// convert carried clothes
		if (V.carried.upper.name === itemName) {
			V.carried.over_upper = convertItem(V.carried.upper);
			V.carried.upper = clone(setup.clothes.upper[0]);
		}
		if (V.carried.lower.name === itemName) {
			V.carried.over_lower = convertItem(V.carried.lower);
			V.carried.lower = clone(setup.clothes.lower[0]);
		}

		// convert stripped stored clothes
		for (let i = V.store.upper.length - 1; i >= 0; i--) {
			if (V.store.upper[i].name === itemName) {
				V.store.over_upper.push(convertItem(V.store.upper[i]));
				V.store.upper.splice(i, 1);
			}
		}
		for (let i = V.store.lower.length - 1; i >= 0; i--) {
			if (V.store.lower[i].name === itemName) {
				V.store.over_lower.push(convertItem(V.store.lower[i]));
				V.store.lower.splice(i, 1);
			}
		}

		// convert try on stored
		if (V.tryOn.ownedStored.upper.name === itemName) {
			V.tryOn.ownedStored.over_upper = convertItem(V.tryOn.ownedStored.upper);
			V.tryOn.ownedStored.upper = clone(setup.clothes.upper[0]);
		}
		if (V.tryOn.ownedStored.lower.name === itemName) {
			V.tryOn.ownedStored.over_lower = convertItem(V.tryOn.ownedStored.lower);
			V.tryOn.ownedStored.lower = clone(setup.clothes.lower[0]);
		}

		// convert try on equipped
		if (V.tryOn.tryingOn.upper && V.tryOn.tryingOn.upper.name === itemName) {
			V.tryOn.tryingOn.over_upper = convertItem(V.tryOn.tryingOn.upper);
			V.tryOn.tryingOn.upper = null;
		}
		if (V.tryOn.tryingOn.lower && V.tryOn.tryingOn.lower.name === itemName) {
			V.tryOn.tryingOn.over_lower = convertItem(V.tryOn.tryingOn.lower);
			V.tryOn.tryingOn.lower = null;
		}
	}
}
window.convertNormalToOver = convertNormalToOver;

/* Quick and dirty fix. Yes this code is stupid. It's being replaced soon anyway. */
function convertLegstoUnder() {
	const clothesToConvert = ["leather leggings"];

	// function that converts a clothing item
	const convertItem = item => {
		console.log("converting " + item.name);
		item.set = "under_lower";

		return item;
	};

	for (const index in clothesToConvert) {
		const itemName = clothesToConvert[index];

		// convert clothing sets
		V.outfit.forEach(outf => {
			if (outf.legs === itemName) {
				outf.legs = "naked";
				outf.under_lower = itemName;
				if (outf.colors) {
					outf.colors.under_lower = outf.colors.legs;
					outf.colors.legs = [0, 0];
				}
			}
		});

		// convert clothes in wardrobe
		for (let i = V.wardrobe.legs.length - 1; i >= 0; i--) {
			if (V.wardrobe.legs[i].name === itemName) {
				V.wardrobe.under_lower.push(convertItem(V.wardrobe.legs[i]));
				V.wardrobe.legs.splice(i, 1);
			}
		}

		// convert worn clothes
		if (V.worn.legs.name === itemName) {
			V.worn.under_lower = convertItem(V.worn.legs);
			V.worn.legs = clone(setup.clothes.legs[0]);
		}

		// convert carried clothes
		if (V.carried.legs.name === itemName) {
			V.carried.under_lower = convertItem(V.carried.legs);
			V.carried.legs = clone(setup.clothes.legs[0]);
		}

		// convert stripped stored clothes
		for (let i = V.store.legs.length - 1; i >= 0; i--) {
			if (V.store.legs[i].name === itemName) {
				V.store.under_lower.push(convertItem(V.store.legs[i]));
				V.store.legs.splice(i, 1);
			}
		}

		// convert try on stored
		if (V.tryOn.ownedStored.legs.name === itemName) {
			V.tryOn.ownedStored.under_lower = convertItem(V.tryOn.ownedStored.legs);
			V.tryOn.ownedStored.legs = clone(setup.clothes.legs[0]);
		}

		// convert try on equipped
		if (V.tryOn.tryingOn.legs && V.tryOn.tryingOn.legs.name === itemName) {
			V.tryOn.tryingOn.under_lower = convertItem(V.tryOn.tryingOn.legs);
			V.tryOn.tryingOn.legs = null;
		}
	}
}
window.convertLegstoUnder = convertLegstoUnder;

function getVisibleClothesList() {
	const visibleClothes = [
		V.worn.over_upper,
		V.worn.over_lower,
		V.worn.over_head,
		V.worn.face,
		V.worn.neck,
		V.worn.hands,
		V.worn.handheld,
		V.worn.legs,
		V.worn.feet,
	];
	// over_head doesn't have 'exposed' parameter, but maybe it will some day (in which case remove check for 'naked')
	if (V.worn.over_head.name === "naked" || V.worn.over_head.exposed >= 2) visibleClothes.push(V.worn.head);
	if (V.worn.over_upper.exposed >= 2 || V.overupperwetstage >= 3) visibleClothes.push(V.worn.upper);
	if (V.worn.over_lower.exposed >= 2 || V.overlowerwetstage >= 3) visibleClothes.push(V.worn.lower);
	if (V.worn.upper.exposed >= 2 || V.upperwetstage >= 3) visibleClothes.push(V.worn.under_upper);
	if (V.worn.lower.exposed >= 2 || V.lowerwetstage >= 3) visibleClothes.push(V.worn.under_lower);
	if (V.worn.under_lower.exposed >= 1 || V.underlowerwetstage >= 3) visibleClothes.push(V.worn.genitals);
	return visibleClothes;
}
window.getVisibleClothesList = getVisibleClothesList;

function playerChastity(slots, inAllSlots = false) {
	let chastity = false;
	const chastityCovered = [];
	if (!slots && V.worn.genitals.type.includes("chastity")) {
		// Used for general cases of chastity
		chastity = true;
	}
	if (typeof slots === "string" || slots instanceof String || Array.isArray(slots)) {
		// Genital Strings
		if (slots.includes("penis") && V.player.penisExist && V.worn.genitals.type.includesAny("cage", "hidden")) {
			chastity = true;
			if (!chastityCovered.includes("penis")) chastityCovered.push("penis");
		}
		if (slots.includes("vagina") && V.player.vaginaExist && V.worn.genitals.type.includes("hidden")) {
			chastity = true;
			if (!chastityCovered.includes("vagina")) chastityCovered.push("vagina");
		}
		if (slots.includes("anus") && V.worn.genitals.type.includes("chastity") && V.worn.genitals.anal_shield === 1) {
			chastity = true;
			if (!chastityCovered.includes("anus")) chastityCovered.push("anus");
		}

		// Type Strings
		if (slots.includes("hidden") && V.worn.genitals.type.includes("hidden")) {
			chastity = true;
			if (!chastityCovered.includes("penis")) chastityCovered.push("penis");
			if (!chastityCovered.includes("vagina")) chastityCovered.push("vagina");
		}
		if (slots.includes("cage") && V.worn.genitals.type.includes("cage")) {
			chastity = true;
			if (!chastityCovered.includes("penis")) chastityCovered.push("penis");
		}
	}
	if (inAllSlots && Array.isArray(slots) && ["penis", "vagina", "anus"].includes(slots)) {
		const slotsToInclude = slots.filter(e => ["penis", "vagina", "anus"].includes(e));
		if (slotsToInclude.count < chastityCovered.length) {
			return false;
		}
	}
	return chastity;
}
window.playerChastity = playerChastity;

/**
 * @description Takes in a passed item of clothing and returns its corresponding pair if it's an outfit part.
 * @param {object} garment The item of clothing that we want the second half of.
 * @param {string} layer  The layer the garment in being worn on.
 * @returns {object} If found, it will return the item of clothing that is the other half. If not, it returns null.
 */
function findOutfitPair(garment, layer) {
	const findLayer = layer.includes("upper") ? layer.replace("upper", "lower") : layer.replace("lower", "upper");
	let pair = null;

	// Makes sure that the clothing slot is not naked and contains the outfitPrimary or outfitSecondary value.
	if (garment.name !== "naked" && (garment.outfitPrimary || garment.outfitSecondary)) {
		const tempSet = setup.clothes[layer][garment.index].set;
		let costMod;
		if (layer.includes("under")) costMod = V.clothesPriceUnderwear;
		else costMod = V.clothesPrice;

		if (layer.includes("upper")) {
			// We are looking for lower items in this section
			// Does a quick check of the closest match indexes
			if (garment.index + 7 < setup.clothes[findLayer].length) {
				for (let i = 0; i <= 7; i++) {
					if (tempSet === setup.clothes[findLayer][garment.index + i].set) {
						pair = { ...setup.clothes[findLayer][garment.index + i] };
						break;
					}
					if (i >= 3) i++;
				}
			}
			// Searches the entire setup.clothing list for corresponding pair in ascending order as upper items are typically lower indexed than their lower counterpart.
			if (!pair) {
				for (let i = 1; i < setup.clothes[findLayer].length; i++) {
					if (tempSet === setup.clothes[findLayer][i].set) {
						pair = { ...setup.clothes[findLayer][i] };
						break;
					}
				}
			}

			if (pair) pair.cost = setup.clothes[layer][garment.index].cost * costMod;
		} else if (layer.includes("lower")) {
			// We are looking for upper items in this section
			// Does a quick check of the closest match indexes
			if (garment.index - 7 < setup.clothes[findLayer].length) {
				for (let i = 0; i <= 7; i++) {
					if (garment.index - i < 0) break;
					if (tempSet === setup.clothes[findLayer][garment.index - i].set) {
						pair = { ...setup.clothes[findLayer][garment.index - i] };
						break;
					}
					if (i >= 3) i++;
				}
			}
			// Searches the entire setup.clothing list for corresponding pair in descending order as upper items are typically lower indexed than their lower counterpart.
			if (!pair) {
				for (let i = setup.clothes[findLayer].length - 1; i >= 0; i--) {
					if (tempSet === setup.clothes[findLayer][i].set) {
						pair = { ...setup.clothes[findLayer][i] };
						break;
					}
				}
			}

			pair.cost *= costMod;
		}

		if (!pair)
			console.log(
				`No pair was found for ${garment.name} using the set name of ${tempSet} from the setup.clothes value. The passed item has set name ${garment.set}`
			);
	}

	return pair;
}
window.findOutfitPair = findOutfitPair;

/**
 * @description Looks over the clothing the player is wearing and returns any outfits halves that are missing. If no halves are missing, it returns an empty array.
 * @returns {object} An object that contains any missing halves of an outfit the player is wearing. Each outfit will have the values: wornHalf, brokenHalf, outfitSet, outfitName, outfitCost, and the index of the broken item
 */
function getOutfitPair() {
	const garmentLayers = ["upper", "under_upper", "over_upper", "lower", "under_lower", "over_lower"];
	const foundPairs = [];

	for (let i = 0; i < 6; i++) {
		if (V.worn[garmentLayers[i]].name === "naked") continue;
		const brokenHalf = i < 3 ? garmentLayers[i].replace("upper", "lower") : garmentLayers[i].replace("lower", "upper");
		if (V.worn[garmentLayers[i]].set === V.worn[brokenHalf].set) continue;
		const check = findOutfitPair(V.worn[garmentLayers[i]], garmentLayers[i]);
		if (check) {
			check.wornHalf = garmentLayers[i];
			check.brokenHalf = brokenHalf;
			check.colour = V.worn[garmentLayers[i]].colour;
			check.colour_sidebar = V.worn[garmentLayers[i]].colour_sidebar;
			check.colour_combat = V.worn[garmentLayers[i]].colour_combat;
			check.accessory = V.worn[garmentLayers[i]].accessory;
			check.accessory_colour = V.worn[garmentLayers[i]].accessory_colour;
			check.location = V.worn[garmentLayers[i]].location;
			foundPairs.push(check);
		}
	}

	return foundPairs;
}
window.getOutfitPair = getOutfitPair;

/**
 * @description Takes in an article of clothing that has been modified to contain the values brokenHalf and wornHalf that have the V.worn location of the outfit part that is broken or worn.
 * @param {object} brokenOutfit The clothing object. Currently it takes in a slightly modified setup.clothes values.
 */
function makeMissingOutfit(brokenOutfit) {
	const brokenHalf = brokenOutfit.brokenHalf;

	// Resets the remaining part. For lower items, make sure to change the set
	if (brokenOutfit.wornHalf.includes("upper")) {
		V.worn[brokenOutfit.wornHalf].outfitPrimary[brokenHalf] = brokenOutfit.name;
		brokenOutfit.cost = 0;
	} else {
		V.worn[brokenOutfit.wornHalf].outfitSecondary[1] = brokenOutfit.name;
	}

	// Resets the one_piece value and set values
	V.worn[brokenOutfit.wornHalf].one_piece = 1;
	V.worn[brokenOutfit.wornHalf].set = brokenOutfit.set;

	// Checks for any item worn in that place then puts it in the wardrobe
	if (V.worn[brokenHalf].name !== "naked") {
		$.wiki('<<generalUndress "wardrobe" ' + brokenHalf + ">>");
	}

	// Remove temporary values
	delete brokenOutfit.brokenHalf;
	delete brokenOutfit.wornHalf;

	// Equips the new piece into the now empty slot
	V.worn[brokenHalf] = brokenOutfit;
}
window.makeMissingOutfit = makeMissingOutfit;

/* Moved out of canvasmodel-img.twee */
function getClothingOptionsItem(slot, item, stage) {
	const itemOptions = {};

	const index = clothesIndex(slot, item);
	itemOptions[slot] = {
		index,
		setup: setup.clothes[slot][index],
		integrity: integrityKeyword(item, slot),
		colour: item.colour,
		alt: item.altposition,
		pattern: item.pattern,
		pattern_layer: item.pattern_layer,
	};
	itemOptions[slot].alpha = { 1: 0.9, 2: 0.7, 3: 0.5 }[stage] ?? 1.0;
	itemOptions[slot].accColour = item.accessory_colour;
	return itemOptions;
}
window.getClothingOptionsItem = getClothingOptionsItem;

/* Moved out of canvasmodel-img.twee */
function getClothingOptions() {
	const modelOptions = { worn: {}, filters: {} };
	const slots = [
		["upper", V.upperwetstage],
		["over_upper"],
		["genitals"],
		["lower", V.lowerwetstage],
		["over_lower"],
		["under_lower", V.underlowerwetstage],
		["under_upper", V.underupperwetstage],
		["hands"],
		["handheld"],
		["head"],
		["over_head"],
		["face"],
		["neck"],
		["legs"],
		["feet"],
	];

	for (const slotobj of slots) {
		const item = V.worn[slotobj[0]];
		modelOptions.worn = { ...modelOptions.worn, ...getClothingOptionsItem(slotobj[0], item, slotobj[1]) };

		if (item.accessory_layer_under) {
			modelOptions.acc_layer_under = item.accessory_layer_under;
		}
		if (item.colour === "custom") {
			/* TODO @aimozg We recalculate custom colour RGB here; in future versions, we should store custom colours in canvasfilter-friendly way */
			modelOptions.filters["worn_" + slotobj[0] + "_custom"] = item.colourCanvasFilter || getCustomClothesColourCanvasFilter(item.colourCustom);
		}
		if (item.accessory_colour === "custom") {
			modelOptions.filters["worn_" + slotobj[0] + "_acc_custom"] =
				item.accessory_colourCanvasFilter || getCustomClothesColourCanvasFilter(item.accessory_colourCustom);
		}
	}
	return modelOptions;
}
window.getClothingOptions = getClothingOptions;
