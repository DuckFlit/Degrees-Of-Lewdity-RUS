const max_carried = 5; // maximum player can carry

function sexToysInventoryInit() {
	$(function() {
		const min_cells = 12;
		const main_grid = document.getElementById("sti_grid");
		Object.keys(V.player.inventory.sextoys).forEach(category => {
			const setupItem = setup.sextoys.find(toy => toy.name === category);
			V.player.inventory.sextoys[category].forEach((item, index) => { // look for each items owned of a particular type
				if (setupItem) {
					const item_class_name = category.replace(/\s/g, '_') + "_" + index;
					const itemStatus = (item.worn ? "worn" : item.carried ? "carried" : "");
					const itemColour = (setupItem.colour === 1 ? "clothes-" + item.colour : "");
					main_grid.innerHTML +=
						`<div id="sti_item_${item_class_name}" class="sti_cell sti_full" onclick="window.sexToysInventoryOnItemClick(${index},\`${category}\`)" class="">
							<div style="position:relative;z-index: 1;">
								<div class="sti_already_owned">
								<span data-category="${category}" data-index="${index}" id="sti_already_owned_${item_class_name}" class="sti_owned_text">${itemStatus}</span>
								</div>
							</div>
							<img id="sti_item_icon_${item_class_name}" src="${setupItem.icon}" class="${itemColour}"></img>
							</div>
						</div>`;
				}
			});
		});
		while ((main_grid.childElementCount - 1) < min_cells || (main_grid.childElementCount - 1) % 4 != 0) { // minimum of 12 cells. minimum 4 cells per row
			main_grid.innerHTML += '<div class="sti_cell sti_empty"></div>';
		}
		main_grid.innerHTML +=
			`<div style="position: relative;">
				<div id="carryCount" class="sti_grid_carried_count"></div>
			</div>`;
		updateCarryCountUI();
	});
}
window.sexToysInventoryInit = sexToysInventoryInit;

function sexToysInventoryOnItemClick(index, category) {
	const item = setup.sextoys.find(obj => obj.name === category);
	if (item === undefined) {
		throw new Error(`Sex toy could not be found! index: [${index}]; category: [${category}]`);
	}
	/* grid item box class changes */
	const selectedBox = document.getElementsByClassName("sti_selected")[0];
	if (selectedBox) selectedBox.classList.remove("sti_selected");

	const invItem = V.player.inventory.sextoys[category][index];
	const invItemClassName = document.getElementById(`sti_item_icon_${item.name_underscore}_${index}`).className;

	$(`#sti_item_${item.name_underscore}_${index}`)[0].classList.add("sti_selected");
	/* description box */
	document.getElementById("sti_descContainer").innerHTML = `
	<div id="sti_desc_img" class="${invItemClassName}">
		<img style="" src="${item.icon}">
	</div>
	<div class="sti_desc_border">
		<div id="sti_desc">
			<div class="sti_closeContainer">
				<div class="sti_close" id="sti_close1" title="close" onclick="window.sextoysOnCloseDesc(\`stiDescPillContainer\`)">x</div>
			</div>
			<span style="color:#bcbcbc">${item.description}</span>
			<div id="sti_desc_action">
				<br><a id="stiCarryButton" onclick="window.sexToysInventoryOnCarryClick(${index},'${category}')" class="sti_carry_button">
					${(invItem.carried ? "Put it back" : "Carry it")}
				</a>
				${(setup.sextoys[invItem.index].wearable == 1 ? "<br>" : "")}
				<a style="${(setup.sextoys[invItem.index].wearable == 1 ? "" : "display: none;")}" id="stiWearButton"
					onclick="window.sexToysInventoryOnWearClick(${index},'${category}')" class="sti_wear_button">
						${(invItem.worn ? "Take it off" : "Wear it")}
				</a>
				<br><a id="stiThrowButton" onclick="window.sexToysInventoryOnThrowClick(${index},'${category}')" class="sti_throw_button">
					Throw it away
				</a>
			</div>
		</div>
	</div>`;
	document.getElementById("stiDescPillContainer").style.display = "";
	greyButtonsIfCarryLimitReached(index, category);
}
window.sexToysInventoryOnItemClick = sexToysInventoryOnItemClick;

function sexToysInventoryOnCarryClick(index, category) {
	let shortcut_category = setup.sextoys[V.player.inventory.sextoys[category][index].index].category;

	if (V.player.inventory.sextoys[category][index].carried == false && countCarriedSextoys() >= max_carried) // if player has reached maximum item carried, stop the function
		return;
	V.player.inventory.sextoys[category][index].carried = !V.player.inventory.sextoys[category][index].carried;
	if (V.player.inventory.sextoys[category][index].worn == true && shortcut_category != "strap-on")
		V.worn[shortcut_category] = undefined;
	if (V.player.inventory.sextoys[category][index].carried == false) // if player chose "Put back in the cupboard"
		V.player.inventory.sextoys[category][index].worn = false; // also unwear the item
	document.getElementById("stiWearButton").textContent = (V.player.inventory.sextoys[category][index].worn) ? "Take off" : "Wear it"; // update button text value
	document.getElementById("stiCarryButton").textContent = (V.player.inventory.sextoys[category][index].carried != true ? "Carry it" : "Put back in the cupboard"); // update button text value
	// update worn/carried tag on cell
	document.getElementById("sti_already_owned_" + category.replace(/\s/g, '_') + "_" + index).textContent = (V.player.inventory.sextoys[category][index].worn == true ? "worn" : V.player.inventory.sextoys[category][index].carried == true ? "carried" : "");
	if (shortcut_category == "strap-on" && V.player.inventory.sextoys[category][index].worn == false) { // this is an exception for strap-ons. Upon "wearing", also set them in under_lower as they don't have their own category yet.
		V.worn.under_lower = setup.clothes.under_lower[0];
		Wikifier.wikifyEval(' <<updatesidebarimg>>');
	}
	updateCarryCountUI();
	greyButtonsIfCarryLimitReached(index, category);
}
window.sexToysInventoryOnCarryClick = sexToysInventoryOnCarryClick;

function sexToysInventoryOnWearClick(index, category) { // "Wear it" / "Take off"
	let shortcut_category = setup.sextoys[V.player.inventory.sextoys[category][index].index].category;

	if (shortcut_category == "strap-on" && V.worn.under_lower.cursed == 1) { // if player tries to wear a strapon but that under_lower is cursed
		document.getElementById("stiCursedText").outerHTML = `<div id="stiCursedText" class="ssm_fade_in">You try to remove the ` + V.worn.under_lower.name + ` but fail</div>`;
		return;
	}
	if (shortcut_category == "butt_plug" && V.worn.genitals.cursed == 1 && V.worn.genitals.anal_shield == 1) { // if player tries to wear a butt plug but there is a cursed chastity belt fitted with an anal shield
		document.getElementById("stiCursedText").outerHTML = `<div id="stiCursedText" class="ssm_fade_in">You can't push the ` + V.player.inventory.sextoys[category][index].name + ` past the ` + V.worn.genitals.name + `'s anal shield</div>`;
		return;
	}
	if (V.player.inventory.sextoys[category][index].carried == false && countCarriedSextoys() >= max_carried) // if player has reached maximum item carried, stop the function
		return;
	if (V.player.inventory.sextoys[category][index].worn == true && shortcut_category != "strap-on")
		V.worn[shortcut_category] = undefined;
	if (V.player.inventory.sextoys[category][index].worn == false) { // If player chose "Wear it"
		for (let s_item of setup.sextoys) { // retrieve main category of our item in setup.sextoys
			if (s_item.name == category)
				var cat = s_item.category;
		}
		for (let s_item of setup.sextoys) {// search for items with same main category
			if (s_item.category == cat) { // we find item with same main category than the item we try to wear
				for (let i_item in V.player.inventory.sextoys[s_item.name]) // we go through each of this item owned in player inventory
					V.player.inventory.sextoys[s_item.name][i_item].worn = false; // we unwear each of them.
			}
		}
	}
	V.player.inventory.sextoys[category][index].worn = !V.player.inventory.sextoys[category][index].worn; // then wear chose item.
	if (shortcut_category != "strap-on") {
		V.worn[shortcut_category] = V.player.inventory.sextoys[category][index];
		V.worn[shortcut_category].state = "worn";
	}
	V.player.inventory.sextoys[category][index].carried = true; // also carry the item if not done alreadys
	document.getElementById("stiWearButton").textContent = (V.player.inventory.sextoys[category][index].worn) ? "Take off" : "Wear it"; // update button text value
	document.getElementById("stiCarryButton").textContent = (V.player.inventory.sextoys[category][index].carried != true ? "Carry it" : "Put back in the cupboard"); // update button text value
	document.getElementById("sti_already_owned_" + category.replace(/\s/g, '_') + "_" + index).textContent = (V.player.inventory.sextoys[category][index].worn ? "worn" : V.player.inventory.sextoys[category][index].carried ? "carried" : "");
	$("[id*='sti_already_owned_']").each(function (i, element) {
		let c = element.getAttribute("data-category");
		let ind = element.getAttribute("data-index");
		element.textContent = (V.player.inventory.sextoys[c][ind].worn ? "worn" : V.player.inventory.sextoys[c][ind].carried ? "carried" : "");
	});
	if (shortcut_category == "strap-on") { // this is an exception for strap-ons. Upon "wearing", also set them in under_lower as they don't have their own category yet.
		if (V.player.inventory.sextoys[category][index].worn == true) {
			Wikifier.wikifyEval(' <<underlowerundress "wardrobe">>');
			V.worn.under_lower = {
				...setup.clothes.under_lower[V.player.inventory.sextoys[category][index].clothes_index],
				...{ colour: V.player.inventory.sextoys[category][index].colour }
			};
		}
		else
			V.worn.under_lower = setup.clothes.under_lower[0]
		Wikifier.wikifyEval(' <<updatesidebarimg>>');
	}
	updateCarryCountUI();
	greyButtonsIfCarryLimitReached(index, category);
}
window.sexToysInventoryOnWearClick = sexToysInventoryOnWearClick;

function sexToysInventoryOnThrowClick(index, category) {
	const playerItem = V.player.inventory.sextoys[category][index];
	const setupCategory = setup.sextoys[playerItem.index].category;
	const last_index = document.getElementById("sti_grid").childElementCount - 1;
	const category_name = category.replace(/\s/g, '_');
	/* remove div */
	document.getElementById(`sti_item_${category_name}_${index}`).remove();
	/* add new empty div */
	document.getElementById("sti_grid").children[last_index - 2].outerHTML += `<div class="sti_cell sti_empty"></div>`;
	/* close description */
	sextoysOnCloseDesc("stiDescPillContainer");
	if (playerItem.worn && setupCategory != "strap-on") {
		delete V.worn[setupCategory];
	}
	/* handle strapons */
	if (setupCategory === "strap-on") {
		V.worn.under_lower = setup.clothes.under_lower[0];
		setLowerVisibility(true);
	}
	/* remove item from inventory object */
	V.player.inventory.sextoys[category].splice(index, 1);
	$("[id*='sti_item']").each(function (i, element) { updateNumberInString(element, index, category) });
	$("[id*='sti_already_owned']").each(function (i, element) { updateNumberInString(element, index, category) });
	updateCarryCountUI();
}
window.sexToysInventoryOnThrowClick = sexToysInventoryOnThrowClick;

function sextoysOnCloseDesc(elem_id) {
	document.getElementById(elem_id).style.display = 'none';
	/* grid item box class changes */
	const selectedBox = document.getElementsByClassName("sti_selected")[0];
	if (selectedBox) selectedBox.classList.remove("sti_selected");
}
window.sextoysOnCloseDesc = sextoysOnCloseDesc;

function updateNumberInString(element, index_min, category) {
	if (!element.id.contains(category.replace(/\s/g, '_'))) return; //No need to update, this element is unrelated.

	const index = parseInt(element.id.match(/\d+$/)[0]); //extract the index from the element's ID and force it into a number.

	if (index === NaN) throw new Error(`Misconfigured sex toy ID: ${element.id}`);
	if (index < index_min || index <= 0) return; //No need to update, this element comes BEFORE the removed item, so its index is unaffected.

	element.id = element.id.replace(/\d+/, index - 1);
	if (element.getAttribute("onclick"))
		element.setAttribute("onclick", `window.sexToysInventoryOnItemClick(${index - 1},\`${category}\`)`);
}

function checkSextoysGift(npc_name) {
	const npc = V.NPCName.find(n => n.nam === npc_name);
	if (!npc) {
		throw new Error("Invalid NPC name given!");
	} else {
		return Object.values(npc.sextoys).some(category => category.some(item => item.gift_state === "held"));
	}
}
window.checkSextoysGift = checkSextoysGift;

function listUniqueCarriedSextoys() {
	const list = []
	Object.values(V.player.inventory.sextoys).forEach(category =>
		category.filter(item => item.carried).forEach(item => list.push(item)));
	return list;
}
window.listUniqueCarriedSextoys = listUniqueCarriedSextoys;

function playerHasSexToys() {
	return Object.values(V.player.inventory.sextoys).some(category => category.length > 0);
}
window.playerHasSexToys = playerHasSexToys;

function straponExceptionWearOff() {
	V.player.inventory.sextoys.forEach(category => {
		category.forEach(item => {
			if (item.name === V.worn.under_lower.name) item.worn = false;
		});
	});
}
window.straponExceptionWearOff = straponExceptionWearOff;

function patchStraponsWearStatus() {
	Object.values(V.player.inventory.sextoys).forEach(category => category.filter(strapon => strapon.type.includes("strap-on")).forEach(strapon => {
		if (strapon.name !== V.worn.under_lower.name) strapon.worn = false;
		else if (strapon.colour == V.worn.under_lower.colour) strapon.worn = true;
	}));
}
window.patchStraponsWearStatus = patchStraponsWearStatus;

function checkIfNPCHasCategorySextoy(npc_name, category) {
	const npc = V.NPCName.find(n => n.nam === npc_name);
	if (!npc) {
		throw new Error("Invalid NPC name given!");
	}

	const categoryToyNames = Object.values(setup.sextoys).filter(n => n.category === category).map(n => n.name);
	if (categoryToyNames.length === 0) {
		throw new Error("Invalid sex toy category given!");
	}

	const npcSexToys = [];
	Object.values(npc.sextoys).forEach(category => {
		category.forEach(item => {
			if (categoryToyNames.includes(item.name) && item.gift_state != "held")
				npcSexToys.push(item);
		});
	});
	return npcSexToys;
}
window.checkIfNPCHasCategorySextoy = checkIfNPCHasCategorySextoy;

function handSextoysGiftToNPC(npc_name) {
	const npc = V.NPCName.find(n => n.nam === npc_name);
	if (!npc) {
		throw new Error("Invalid NPC name given!");
	}
	Object.values(npc.sextoys).forEach(category => {
		category.forEach(item => {
			if (item.gift_state === "held") item.gift_state = "received";
		});
	});
}
window.handSextoysGiftToNPC = handSextoysGiftToNPC;

function findIndexInNPCNameVar(npc_name) {
	for (let npc in V.NPCName) {
		if (V.NPCName[npc].nam.toLowerCase() == npc_name.toLowerCase())
			return npc;
	}
}
window.findIndexInNPCNameVar = findIndexInNPCNameVar;

function countCarriedSextoys() {
	let count = 0;

	Object.values(V.player.inventory.sextoys).forEach(category => {
		count += category.filter(item => item.carried).length;
	});
	return count;
}
window.countCarriedSextoys = countCarriedSextoys;

function updateCarryCountUI() {
	const colour = (countCarriedSextoys() >= max_carried ? "red" : "");
	document.getElementById("carryCount").outerHTML =
		`<div id="carryCount" class="sti_grid_carried_count">
		Items carried: <span class="${colour}">${countCarriedSextoys()}/${max_carried}</span>
	</div>`;
}
window.updateCarryCountUI = updateCarryCountUI;

function greyButtonsIfCarryLimitReached(index, category) {
	if (countCarriedSextoys() >= max_carried) {
		const item = V.player.inventory.sextoys[category][index];
		if (!item.carried) {
			document.getElementById("stiCarryButton").classList.add("sti_carry_limit_reached");
			if (!item.worn) document.getElementById("stiWearButton").classList.add("sti_carry_limit_reached");
		}
	}
}
window.greyButtonsIfCarryLimitReached = greyButtonsIfCarryLimitReached;

function wardrobeStripStraponException(item_name) {
	V.player.inventory.sextoys[item_name].forEach(item => item.worn = false);
	V.worn.under_lower = setup.clothes.under_lower[0];
}
window.wardrobeStripStraponException = wardrobeStripStraponException;

function tempHideLower() {
	if (T.lowerVisible === undefined) T.lowerVisible = true;
	setLowerVisibility(!T.lowerVisible);
}
window.tempHideLower = tempHideLower;

function setLowerVisibility(desiredVisibility) {
	T.lowerVisible = desiredVisibility;
	if (!T.lowerVisible) {
		const tmp = V.worn.lower;
		V.worn.lower = setup.clothes.lower[0];
		Wikifier.wikifyEval('<<updatesidebarimg>>');
		V.worn.lower = tmp;
	} else {
		Wikifier.wikifyEval('<<updatesidebarimg>>');
	}

	const elem = document.querySelector("#stiShowUnderwear > .link-internal");
	if (elem !== null)
		elem.text = (!T.lowerVisible ? "Show lower clothing" : "Hide lower clothing");

	Links.generateLinkNumbers($(".passage"));
}
window.setLowerVisibility = setLowerVisibility;
