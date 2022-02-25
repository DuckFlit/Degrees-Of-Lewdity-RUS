var max_carried = 5; // maximum player can carry

window.sexToysInventoryInit = function() {
	$(function(){
		var min_cells = 12; // we generate a minimum of 12 cells to display.
		var main_grid = document.getElementById("sti_grid")
		for (var item_category of Object.keys(V.player.inventory.sextoys)){ // for each type of sextoys
			for (var item in V.player.inventory.sextoys[item_category]){ 	 // look for each items owned of a particular type
				for (let i in setup.sextoys){						 // then browse setup.sextoys to find the icon path of that item
					if (setup.sextoys[i].name == item_category){
						main_grid.innerHTML += `<div id="sti_item_` + item_category.replace(/\s/g, '_') + "_" + item + `" class="sti_cell sti_full" onclick="window.sexToysInventoryOnItemClick(` + item + `,` + "`" + item_category + "`" + `)" class="` + `">
													<div style="position:relative;z-index: 1;">
														<div class="sti_already_owned">` +
														`<span data-category="` + item_category + `" data-index="` + item + `" id= "sti_already_owned_` + item_category.replace(/\s/g, '_') + "_" + item + `" class="sti_owned_text">` + (V.player.inventory.sextoys[item_category][item].worn != false ? "worn" : V.player.inventory.sextoys[item_category][item].carried != false ? "carried" : "" ) + `</span>
														</div>
													</div>
													<img id="sti_item_icon_` + item_category.replace(/\s/g, '_') + "_" + item +`" src="` + setup.sextoys[i].icon  + `" class="` + ((setup.sextoys[i].colour == 1) ? "clothes-" + V.player.inventory.sextoys[item_category][item].colour : "") + `"></img>
													</div>
												</div>`
					}
				}
			}
		}
		while ((main_grid.childElementCount - 1) < min_cells || (main_grid.childElementCount - 1) % 4 != 0) // minimum of 12 cells. minimum 4 cells per row
			main_grid.innerHTML += `<div class="sti_cell sti_empty"></div>`
		main_grid.innerHTML += `<div style="position: relative;">
									<div id="carryCount" class="sti_grid_carried_count"></div>
								</div>`
		window.updateCarryCountUI()
	});
}

window.sexToysInventoryOnItemClick = function (index, category) {
	for (var obj of setup.sextoys){
		if (obj.name == category)
			var item = obj
	}
	/* grid item box class changes */
	try{
		document.getElementsByClassName("sti_selected")[0].classList.remove("sti_selected")
	}catch{;}
	$("#sti_item_"+item.name_underscore+"_"+index)[0].classList.add("sti_selected")
	/* description box */
	document.getElementById("sti_descContainer").innerHTML = `
	<div id="sti_desc_img" class="` + document.getElementById("sti_item_icon_" + item.name_underscore + "_" + index).className + `">
		<img style="" src="` + item.icon + `">
	</div>
	<div class="sti_desc_border">
		<div id="sti_desc">
			<div class="sti_closeContainer">
				<div class="sti_close" id="sti_close1" title="close" onclick="window.sextoysOnCloseDesc(` + "`stiDescPillContainer`" + `)">x
				</div>
			</div>
			<span style="color:#bcbcbc">` + item.description + `</span>
			<div id="sti_desc_action">` + `
				<br>	
				` + 
				`<a id="stiCarryButton" onclick="window.sexToysInventoryOnCarryClick(` +  index + `,` + "`" + category + "`" + `)" class="sti_carry_button">
					` + (V.player.inventory.sextoys[category][index].carried == false ? "Carry it" : "Put back in the cupboard") + `
				</a>` +
				(setup.sextoys[V.player.inventory.sextoys[category][index].index].wearable == 1 ? "<br>" : "") + `<a style="` + (setup.sextoys[V.player.inventory.sextoys[category][index].index].wearable == 1 ? "" : "display: none;") + `" id="stiWearButton" onclick="window.sexToysInventoryOnWearClick(` +  index + `,` + "`" + category + "`" + `)" class="sti_wear_button">
					` + (V.player.inventory.sextoys[category][index].worn == false ? "Wear it" : "Take off") + `
				</a>` +
				`<br><a id="stiThrowButton" onclick="window.sexToysInventoryOnThrowClick(` +  index + `,` + "`" + category + "`" + `)" class="sti_throw_button">
					` + "Throw away" +
					
					`
				</a>
			</div>
		</div>
	</div>
	`
	document.getElementById("stiDescPillContainer").style.display = ""
	window.greyButtonsIfCarryLimitReached(index, category)
}

window.sexToysInventoryOnCarryClick = function (index, category) {
	let shortcut_category = setup.sextoys[V.player.inventory.sextoys[category][index].index].category

	if (V.player.inventory.sextoys[category][index].carried == false && window.countCarriedSextoys() >= max_carried) // if player has reached maximum item carried, stop the function
		return
	V.player.inventory.sextoys[category][index].carried = !V.player.inventory.sextoys[category][index].carried
	if (V.player.inventory.sextoys[category][index].worn == true && shortcut_category != "strap-on")
		V.worn[shortcut_category] = undefined
	if (V.player.inventory.sextoys[category][index].carried == false) // if player chose "Put back in the cupboard"
		V.player.inventory.sextoys[category][index].worn = false // also unwear the item
	document.getElementById("stiWearButton").textContent = (V.player.inventory.sextoys[category][index].worn) ? "Take off" : "Wear it" // update button text value
	document.getElementById("stiCarryButton").textContent = (V.player.inventory.sextoys[category][index].carried != true ? "Carry it" : "Put back in the cupboard") // update button text value
	// update worn/carried tag on cell
	document.getElementById("sti_already_owned_" + category.replace(/\s/g, '_') + "_" + index).textContent = (V.player.inventory.sextoys[category][index].worn == true ? "worn" : V.player.inventory.sextoys[category][index].carried == true ? "carried" : "")
	if (shortcut_category == "strap-on" && V.player.inventory.sextoys[category][index].worn == false){ // this is an exception for strap-ons. Upon "wearing", also set them in under_lower as they don't have their own category yet.
		V.worn.under_lower = setup.clothes.under_lower[0]
		Wikifier.wikifyEval(' <<updatesidebarimg>>');
	}
	window.updateCarryCountUI()
	window.greyButtonsIfCarryLimitReached(index, category)
}

window.sexToysInventoryOnWearClick = function (index, category) { // "Wear it" / "Take off"
	let shortcut_category = setup.sextoys[V.player.inventory.sextoys[category][index].index].category

	if (shortcut_category == "strap-on" && V.worn.under_lower.cursed == 1){ // if player tries to wear a strapon but that under_lower is cursed
		document.getElementById("stiCursedText").outerHTML = `<div id="stiCursedText" class="ssm_fade_in">You try to remove the ` + V.worn.under_lower.name + ` but fail</div>`
		return
	}
	if (shortcut_category == "butt_plug" && V.worn.genitals.cursed ==1 && V.worn.genitals.anal_shield ==1){ // if player tries to wear a butt plug but there is a cursed chastity belt fitted with an anal shield
		document.getElementById("stiCursedText").outerHTML = `<div id="stiCursedText" class="ssm_fade_in">You can't push the `+V.player.inventory.sextoys[category][index].name + ` past the ` + V.worn.genitals.name + `'s anal shield</div>`
		return
	}
	if (V.player.inventory.sextoys[category][index].carried == false && window.countCarriedSextoys() >= max_carried) // if player has reached maximum item carried, stop the function
		return
	if (V.player.inventory.sextoys[category][index].worn == true && shortcut_category != "strap-on")
		V.worn[shortcut_category] = undefined
	if (V.player.inventory.sextoys[category][index].worn == false){ // If player chose "Wear it"
		for (let s_item of setup.sextoys){ // retrieve main category of our item in setup.sextoys
			if (s_item.name == category)
				var cat = s_item.category
		}
		for (let s_item of setup.sextoys){// search for items with same main category
			if (s_item.category == cat) { // we find item with same main category than the item we try to wear
				for (let i_item in V.player.inventory.sextoys[s_item.name]) // we go through each of this item owned in player inventory
					V.player.inventory.sextoys[s_item.name][i_item].worn = false // we unwear each of them.
			}
		}
	}
	V.player.inventory.sextoys[category][index].worn = !V.player.inventory.sextoys[category][index].worn // then wear chose item.
	if (shortcut_category != "strap-on"){
		V.worn[shortcut_category] = V.player.inventory.sextoys[category][index]
		V.worn[shortcut_category].state = "worn"
	}
	V.player.inventory.sextoys[category][index].carried = true // also carry the item if not done alreadys
	document.getElementById("stiWearButton").textContent = (V.player.inventory.sextoys[category][index].worn) ? "Take off" : "Wear it" // update button text value
	document.getElementById("stiCarryButton").textContent = (V.player.inventory.sextoys[category][index].carried != true ? "Carry it" : "Put back in the cupboard") // update button text value
	document.getElementById("sti_already_owned_" + category.replace(/\s/g, '_') + "_" + index).textContent = (V.player.inventory.sextoys[category][index].worn ? "worn" : V.player.inventory.sextoys[category][index].carried ? "carried" : "" )
	$("[id*='sti_already_owned_']").each(function(i, element){
		let c = element.getAttribute("data-category")
		let ind = element.getAttribute("data-index")
		element.textContent = (V.player.inventory.sextoys[c][ind].worn ? "worn" : V.player.inventory.sextoys[c][ind].carried ? "carried" : "" )
	})
	if (shortcut_category == "strap-on"){ // this is an exception for strap-ons. Upon "wearing", also set them in under_lower as they don't have their own category yet.
		if (V.player.inventory.sextoys[category][index].worn == true){
			Wikifier.wikifyEval(' <<underlowerundress "wardrobe">>');
			V.worn.under_lower = {...setup.clothes.under_lower[V.player.inventory.sextoys[category][index].clothes_index],
								  ...{colour:V.player.inventory.sextoys[category][index].colour}}
		}
		else
			V.worn.under_lower = setup.clothes.under_lower[0]
		Wikifier.wikifyEval(' <<updatesidebarimg>>');
	}
	window.updateCarryCountUI()
	window.greyButtonsIfCarryLimitReached(index, category)
}

window.sexToysInventoryOnThrowClick = function(index, category){
	let shortcut_category = setup.sextoys[V.player.inventory.sextoys[category][index].index].category
	let last_index = document.getElementById("sti_grid").childElementCount - 1
	/* remove div */
	document.getElementById("sti_item_" + category.replace(/\s/g, '_') + "_" + index).remove()
	/* add new empty div */
	document.getElementById("sti_grid").children[last_index - 2].outerHTML += `<div class="sti_cell sti_empty"></div>`
	/* close description */
	window.sextoysOnCloseDesc("stiDescPillContainer")
	if (V.player.inventory.sextoys[category][index].worn == true && shortcut_category != "strap-on")
		V.worn[shortcut_category] = undefined
	/* handle strapons */
	if (shortcut_category == "strap-on") {
		V.worn.under_lower = setup.clothes.under_lower[0]
		Wikifier.wikifyEval(' <<updatesidebarimg>>');
	}
	/* remove item from inventory object */
	V.player.inventory.sextoys[category].splice(index, 1)
	$("[id*='sti_item']").each(function(i, element){updateNumberInString(element, element.id, index, category.replace(/\s/g, '_'))})
	$("[id*='sti_already_owned']").each(function(i, element){updateNumberInString(element, element.id, index, category.replace(/\s/g, '_'))})
	window.updateCarryCountUI()
}

window.sextoysOnCloseDesc = function (elem_id) {
	document.getElementById(elem_id).style.display = 'none'
	/* grid item box class changes */
	try{
		document.getElementsByClassName("sti_selected")[0].classList.remove("sti_selected")
	}catch{;}
}

function updateNumberInString(element, string, index_min, category){
	let r = /\d+/;
	let match = string.match(r)
	let update_number;

	if (!match || !string.contains(category))
		return
	update_number = parseInt(match[0]);
	if (update_number < index_min)
		return
	update_number--;
	let words = string.split("_");
	string = ""
	for (let word in words){
		if (word < words.length - 1)
			string += (words[word] + "_");
	}
	element.id = (string + update_number)
	if (element.getAttribute("onclick"))
		element.setAttribute("onclick", ("window.sexToysInventoryOnItemClick(" + update_number + "," + "`" + category.replace(/_/g, ' ') + "`" + ")"))
}

window.checkSextoysGift = function (npc_name) {
	npc_name = npc_name.toLowerCase()
	for (let inv in V.NPCName){
		if (V.NPCName[inv].nam.toLowerCase() == npc_name){
			for (let cat in V.NPCName[inv].sextoys){
				for (let item in V.NPCName[inv].sextoys[cat]){
					if (V.NPCName[inv].sextoys[cat][item].gift_state == "held")
						return 1
				}
			}
		}
	}
	return 0
}

window.listUniqueCarriedSextoys = function () {
	var list = []
	for (let cat in V.player.inventory.sextoys){
		for (let item of V.player.inventory.sextoys[cat]){
			if (item.carried == true)
				list.push(item)
		}
	}
	return (list.length > 0 ? list : 0)
}

window.playerHasSexToys = function () {
	var list = []
	for (let cat in V.player.inventory.sextoys){
		for (let item of V.player.inventory.sextoys[cat]){
			list.push(item)
		}
	}
	return (list.length > 0 ? 1 : 0)
}

window.straponExceptionWearOff = function(){
	for (let s_list in V.player.inventory.sextoys){
		for (let strapon in V.player.inventory.sextoys[s_list]){
			if (V.player.inventory.sextoys[s_list][strapon].name == V.worn.under_lower.name)
				V.player.inventory.sextoys[s_list][strapon].worn = false
		}
	}
}

window.patchStraponsWearStatus = function () {
	for (let s_list in V.player.inventory.sextoys){
		for (let strapon in V.player.inventory.sextoys[s_list]){
			if (V.player.inventory.sextoys[s_list][strapon].name != V.worn.under_lower.name && V.player.inventory.sextoys[s_list][strapon].type.includes("strap-on"))
				V.player.inventory.sextoys[s_list][strapon].worn = false
		}
	}
}

window.checkIfNPCHasCategorySextoy = function (npc_name, category){
	let found_list = []
	let item_list = []
	let recipient;

	npc_name = npc_name.toLowerCase()
	for (let s_item of setup.sextoys){
		if (s_item.category == category)
			item_list.push(s_item.name)
	}
	recipient = window.findIndexInNPCNameVar(npc_name);
	for (let i_list in V.NPCName[recipient].sextoys){
		if (item_list.includes(i_list)){
			for (let item of V.NPCName[recipient].sextoys[i_list]){
				if (item.gift_state != "held")
				found_list.push(item)
			}
		}
	}
	return (found_list.length > 0 ? found_list : 0)
}

window.handSextoysGiftToNPC = function (npc_name){
	let recipient = window.findIndexInNPCNameVar(npc_name);

	npc_name = npc_name.toLowerCase()
	for (let cat in V.NPCName[recipient].sextoys){
		for (let item in V.NPCName[recipient].sextoys[cat]){
			if (V.NPCName[recipient].sextoys[cat][item].gift_state == "held")
			V.NPCName[recipient].sextoys[cat][item].gift_state = "received"
		}
	}
}

window.findIndexInNPCNameVar = function(npc_name) {
	for (let npc in V.NPCName){
		if (V.NPCName[npc].nam.toLowerCase() == npc_name.toLowerCase())
			return npc
	}
}

window.countCarriedSextoys = function() {
	let count = 0;

	for (let cat in V.player.inventory.sextoys){
		for (let item of V.player.inventory.sextoys[cat]){
			if (item.carried)
				count++
		}
	}
	return count;
}

window.updateCarryCountUI = function() {
	document.getElementById("carryCount").outerHTML = `<div id="carryCount" class="sti_grid_carried_count">Items carried: <span class="`+ (window.countCarriedSextoys() >= max_carried ? "red" : "") + ` "> ` + window.countCarriedSextoys() + `/` + max_carried + `</span></div>`
}

window.greyButtonsIfCarryLimitReached = function(index, category) {
	if (window.countCarriedSextoys() >= max_carried){
		if (V.player.inventory.sextoys[category][index].worn == false && V.player.inventory.sextoys[category][index].carried == false)
			document.getElementById("stiWearButton").classList.add("sti_carry_limit_reached")
		if (V.player.inventory.sextoys[category][index].carried == false)
			document.getElementById("stiCarryButton").classList.add("sti_carry_limit_reached")
	}
}

window.wardrobeStripStraponException = function (item_name) {
	for (let x in V.player.inventory.sextoys[item_name]){
		if (V.player.inventory.sextoys[item_name][x].worn == true)
			V.player.inventory.sextoys[item_name][x].worn = false
	}
	V.worn.under_lower = setup.clothes.under_lower[0]
}

window.tempShowUnderwears = function() {
	let tmp = V.worn.lower 

	V.worn.lower = setup.clothes.lower[0]
	Wikifier.wikifyEval(' <<updatesidebarimg>>');
	V.worn.lower = tmp
}