function colourContainerClasses() {
	return (
		"hair-" +
		(V.haircolour || "").replace(/ /g, "-") +
		" " +
		"upper-" +
		(V.upperwet > 100 ? "wet" : "") +
		(V.worn.upper.colour_combat || V.worn.upper.colour || "").replace(/ /g, "-") +
		" " +
		"lower-" +
		(V.lowerwet > 100 ? "wet" : "") +
		(V.worn.lower.colour_combat || V.worn.lower.colour || "").replace(/ /g, "-") +
		" " +
		"under_lower-" +
		(V.underlowerwet > 100 ? "wet" : "") +
		(V.worn.under_lower.colour || "").replace(/ /g, "-") +
		" " +
		"under_upper-" +
		(V.underupperwet > 100 ? "wet" : "") +
		(V.worn.under_upper.colour || "").replace(/ /g, "-") +
		" " +
		"head-" +
		(V.worn.head.colour_combat || V.worn.head.colour || "").replace(/ /g, "-") +
		" " +
		"face-" +
		(V.worn.face.colour_combat || V.worn.face.colour || "").replace(/ /g, "-") +
		" " +
		"neck-" +
		(V.worn.neck.colour_combat || V.worn.neck.colour || "").replace(/ /g, "-") +
		" " +
		"hands-" +
		(V.worn.hands.colour_combat || V.worn.hands.colour || "").replace(/ /g, "-") +
		" " +
		"legs-" +
		(V.worn.legs.colour_combat || V.worn.legs.colour || "").replace(/ /g, "-") +
		" " +
		"feet-" +
		(V.worn.feet.colour_combat || V.worn.feet.colour || "").replace(/ /g, "-") +
		" " +
		"upper_acc-" +
		(V.worn.upper.accessory_colour_combat || V.worn.upper.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"lower_acc-" +
		(V.worn.lower.accessory_colour_combat || V.worn.lower.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"under_lower_acc-" +
		(V.worn.under_lower.accessory_colour_combat || V.worn.under_lower.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"under_upper_acc-" +
		(V.worn.under_upper.accessory_colour_combat || V.worn.under_upper.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"head_acc-" +
		(V.worn.head.accessory_colour_combat || V.worn.head.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"face_acc-" +
		(V.worn.face.accessory_colour_combat || V.worn.face.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"neck_acc-" +
		(V.worn.neck.accessory_colour_combat || V.worn.neck.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"hands_acc-" +
		(V.worn.hands.accessory_colour_combat || V.worn.hands.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"legs_acc-" +
		(V.worn.legs.accessory_colour_combat || V.worn.legs.accessory_colour || "").replace(/ /g, "-") +
		" " +
		"feet_acc-" +
		(V.worn.feet.accessory_colour_combat || V.worn.feet.accessory_colour || "").replace(/ /g, "-")
	);
}
window.colourContainerClasses = colourContainerClasses; // export function

function limitedColourContainerClasses() {
	return "hair-" + (V.haircolour || "").replace(/ /g, "-");
}
window.limitedColourContainerClasses = limitedColourContainerClasses; // export function

function debugColourContainerClasses(color) {
	return (
		"hair-" +
		(color.hair || "").replace(/ /g, "-") +
		" " +
		"upper-" +
		(color.upper[0] || "").replace(/ /g, "-") +
		" " +
		"lower-" +
		(color.lower[0] || "").replace(/ /g, "-") +
		" " +
		"under_lower-" +
		(color.under_lower[0] || "").replace(/ /g, "-") +
		" " +
		"under_upper-" +
		(color.under_upper[0] || "").replace(/ /g, "-") +
		" " +
		"head-" +
		(color.head[0] || "").replace(/ /g, "-") +
		" " +
		"face-" +
		(color.face[0] || "").replace(/ /g, "-") +
		" " +
		"neck-" +
		(color.neck[0] || "").replace(/ /g, "-") +
		" " +
		"hands-" +
		(color.hands[0] || "").replace(/ /g, "-") +
		" " +
		"legs-" +
		(color.legs[0] || "").replace(/ /g, "-") +
		" " +
		"feet-" +
		(color.feet[0] || "").replace(/ /g, "-") +
		" " +
		"upper_acc-" +
		(color.upper[1] || "").replace(/ /g, "-") +
		" " +
		"lower_acc-" +
		(color.lower[1] || "").replace(/ /g, "-") +
		" " +
		"under_lower_acc-" +
		(color.under_lower[1] || "").replace(/ /g, "-") +
		" " +
		"under_upper_acc-" +
		(color.under_upper[1] || "").replace(/ /g, "-") +
		" " +
		"head_acc-" +
		(color.head[1] || "").replace(/ /g, "-") +
		" " +
		"face_acc-" +
		(color.face[1] || "").replace(/ /g, "-") +
		" " +
		"neck_acc-" +
		(color.neck[1] || "").replace(/ /g, "-") +
		" " +
		"hands_acc-" +
		(color.hands[1] || "").replace(/ /g, "-") +
		" " +
		"legs_acc-" +
		(color.legs[1] || "").replace(/ /g, "-") +
		" " +
		"feet_acc-" +
		(color.feet[1] || "").replace(/ /g, "-")
	);
}
window.debugColourContainerClasses = debugColourContainerClasses; // export function

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
		cost *= 1.4 + ((V.delinquency - 500) / 5000 + (V.NPCName[V.NPCNameList.indexOf("Sydney")].love - 50) / -500);
	}

	return Math.round(cost);
}
window.getClothingCost = getClothingCost;

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
		"brown leather jacket",
		"black leather jacket",
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

function getVisibleClothesList() {
	const visibleClothes = [V.worn.over_upper, V.worn.over_lower, V.worn.over_head, V.worn.face, V.worn.neck, V.worn.hands, V.worn.legs, V.worn.feet];
	// over_head doesn't have 'exposed' parameter, but maybe it will some day (in which case remove check for 'naked')
	if (V.worn.over_head.name === "naked" || V.worn.over_head.exposed >= 2) visibleClothes.push(V.worn.head);
	if (V.worn.over_upper.exposed >= 2 || V.overupperwetstage >= 3) visibleClothes.push(V.worn.upper);
	if (V.worn.over_lower.exposed >= 2 || V.overlowerwetstage >= 3) visibleClothes.push(V.worn.lower);
	if (V.worn.upper.exposed >= 2 || V.upperwetstage >= 3) visibleClothes.push(V.worn.under_upper);
	if (V.worn.lower.exposed >= 2 || V.lowerwetstage >= 3) visibleClothes.push(V.worn.under_lower);
	if (V.worn.under_lower.exposed >= 2 || V.underlowerwetstage >= 3) visibleClothes.push(V.worn.genitals);
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
 * @desc Looks over the clothing the player is wearing and returns any outfits halves that are missing. If no halves are missing, it returns 0.
 * @returns {Object} An object that contains any missing halves of an outfit the player is wearing. Each outfit will have the values: wornHalf, brokenHalf, outfitSet, outfitName, outfitCost, and the index of the broken item
 */
function getOutfitPair() {
	let upperGarment = ["upper", "under_upper", "over_upper"];
	let lowerGarment = ["lower", "under_lower", "over_lower"];
	let layerList = ["covering","under","over"];
	let broken = {
		under: {},
		covering: {},
		over: {}
	};
	let hasReturn = 0;

	for (let i = 0; i <= 2; i++) {
		//check if an item is being worn in these places
		if( (V.worn[upperGarment[i]] && V.worn[upperGarment[i]].name !== "naked") || (V.worn[lowerGarment[i]] && V.worn[lowerGarment[i]].name !== "naked") ) {
			//check if the upper or lower is a set
			if (V.worn[upperGarment[i]].set !== upperGarment[i] || V.worn[lowerGarment[i]].set !== lowerGarment[i] || ( V.worn[lowerGarment[i]].outfitSecondary && V.worn[lowerGarment[i]].outfitSecondary[1] === "broken")) {
				//if they are then make sure both pieces are there
				if (V.worn[upperGarment[i]].set !== V.worn[lowerGarment[i]].set) {
					hasReturn = true;
					//find the one that is missing. The if statement here looks to see if the top is the missing part. If it's not, then the lower part must be the missing one.
					if (V.worn[upperGarment[i]].outfitPrimary) {
						//The bottom is the missing piece
						broken[layerList[i]].wornHalf = upperGarment[i];
						broken[layerList[i]].brokenHalf = lowerGarment[i];
						broken[layerList[i]].outfitSet = V.worn[upperGarment[i]].set;
						broken[layerList[i]].wornIndex = V.worn[upperGarment[i]].index;

						let indexFound = 0;
						let loopList = setup.clothes[upperGarment[i]].length;

						for (let j = 0; j < loopList; j++) {
							if (setup.clothes[lowerGarment[i]][j].set === V.worn[upperGarment[i]].name) {indexFound = j; break;}
						};

						broken[layerList[i]].index = indexFound;
						broken[layerList[i]].outfitName = setup.clothes[lowerGarment[i]][indexFound].name;
						broken[layerList[i]].outfitCost = setup.clothes[upperGarment[i]][V.worn[upperGarment[i]].index].cost;

						broken[layerList[i]].colour = V.worn[upperGarment[i]].colour;
						broken[layerList[i]].colour_options = V.worn[upperGarment[i]].colour_options;
						broken[layerList[i]].colour_sidebar = V.worn[upperGarment[i]].colour_sidebar;
						broken[layerList[i]].colour_combat = V.worn[upperGarment[i]].colour_combat;
						broken[layerList[i]].accessory = V.worn[upperGarment[i]].accessory;
						broken[layerList[i]].accessory_colour = V.worn[upperGarment[i]].accessory_colour;
						broken[layerList[i]].accessory_colour_options = V.worn[upperGarment[i]].accessory_colour_options;
						broken[layerList[i]].location = V.worn[upperGarment[i]].location;
					}
					else {
						//the top is the missing piece
						broken[layerList[i]].wornHalf = lowerGarment[i];
						broken[layerList[i]].brokenHalf = upperGarment[i];

						let garmentName = V.worn[lowerGarment[i]].name.replace(/ skirt| bottoms?| trousers| pants/, "")

						broken[layerList[i]].outfitSet = garmentName;
						broken[layerList[i]].outfitName = garmentName;
						broken[layerList[i]].wornIndex = V.worn[lowerGarment[i]].index;

						let indexFound = 0;
						let loopList = setup.clothes[upperGarment[i]].length;

						for (let j = 0; j < loopList; j++) {
							if (setup.clothes[upperGarment[i]][j].set === garmentName) {indexFound = j; break;}
						};

						broken[layerList[i]].index = indexFound;
						broken[layerList[i]].outfitCost = setup.clothes[upperGarment[i]][indexFound].cost;

						broken[layerList[i]].colour = V.worn[lowerGarment[i]].colour;
						broken[layerList[i]].colour_options = V.worn[lowerGarment[i]].colour_options;
						broken[layerList[i]].colour_sidebar = V.worn[lowerGarment[i]].colour_sidebar;
						broken[layerList[i]].colour_combat = V.worn[lowerGarment[i]].colour_combat;
						broken[layerList[i]].accessory = V.worn[lowerGarment[i]].accessory;
						broken[layerList[i]].accessory_colour = V.worn[lowerGarment[i]].accessory_colour;
						broken[layerList[i]].accessory_colour_options = V.worn[lowerGarment[i]].accessory_colour_options;
						broken[layerList[i]].location = V.worn[lowerGarment[i]].location;
					}
				}
			}
		}
		if (Object.keys(broken[layerList[i]]).length === 0) delete broken[layerList[i]];
	}

	Object.keys(broken).forEach(key => {
		Object.keys(broken[key]).forEach(item => {
			if(broken[key][item] == undefined) { delete broken[key][item]}
		})
	});


	if (hasReturn) return broken
	else return hasReturn
}
window.getOutfitPair = getOutfitPair;


//is passed an object
function makeMissingOutfit(brokenOutfit) {
	//copies the missing item
	let tempOutfit = clone(setup.clothes[brokenOutfit.brokenHalf][brokenOutfit.index]);

	//this correctly resets the remaining part. For lower items, make sure to change the set
	if (brokenOutfit.wornHalf.includes("upper")) V.worn[brokenOutfit.wornHalf].outfitPrimary = setup.clothes[brokenOutfit.wornHalf][brokenOutfit.wornIndex].outfitPrimary;
	else {
		V.worn[brokenOutfit.wornHalf].outfitSecondary = setup.clothes[brokenOutfit.wornHalf][brokenOutfit.wornIndex].outfitSecondary;
		V.worn[brokenOutfit.wornHalf].set = brokenOutfit.outfitSet;
	}

	//sets the one_piece value to 1
	V.worn[brokenOutfit.wornHalf].one_piece = 1;

	//checks for any item worn in that place then puts it in the wardrobe
	if ( V.worn[brokenOutfit.brokenHalf].name !== "naked") {
		$.wiki('<<generalUndress "wardrobe" ' + brokenOutfit.brokenHalf + '>>')
	}

	//set known colour values to be the same
	let removalList = ["wornHalf","brokenHalf","outfitSet","outfitName","index","wornIndex","outfitCost"]
	let copiedValues = {...brokenOutfit};
	for (let i = removalList.length - 1; i >= 0; i--) {
		delete copiedValues[removalList[i]];
	}

	tempOutfit = {...tempOutfit, ...copiedValues};
	
	//equips the new piece into the now empty slot
	V.worn[brokenOutfit.brokenHalf] = tempOutfit;
}
window.makeMissingOutfit = makeMissingOutfit;
