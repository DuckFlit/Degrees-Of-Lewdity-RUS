/* Read this if you plan on modifying setup.sextoys
 * wearable should be set to 1 if item can be worn. Otherwise, set it to 1 (You can't wear a dildo, but you can wear a strapon.)
 * category is used to know which item cannot be worn together. If two items have same category, wearing one will unwear the other.
 * **Do not** change the indexes, and do not move any objects in setup.sextoys array
 * If you need to add new items, add them at the end of the list, and set their index equal to their place in the array. First item has index 0, second item index 1 etc.
 * to be completed.
*/

setup.sextoys = [
    {
        index:0,
        name:"dildo",
        namecap:"Dildo",
		name_underscore:"dildo",
		description:"A six inch dildo.",
        cost:5000,
		category:"dildo",
		wearable:0,
        size:2,
        type:["dildo"],
        icon:"img/misc/icon/sex toys/dildo.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.worn==!0) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}},
		colour_options: ["black","blue","teal","lime-green","light-pink","purple","tan","brown","red"],
		display_condition: function(){return 1}
    },
    {
        index:1,
        name:"small dildo",
        namecap:"Small dildo",
		name_underscore:"small_dildo",
		description:"A good starter toy.",
        cost:4000,
		category:"dildo",
		wearable:0,
        size:1,
        type:["dildo"],
        icon:"img/misc/icon/sex toys/dildo_small.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.worn==!0) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
        colour_options: ["black","blue","teal","lime-green","light-pink","purple","tan","brown","red"],
		display_condition: function(){return 1}
    },
    {
        index:2,
        name:"anal beads",
        namecap:"Anal beads",
		name_underscore:"anal_beads",
		description:"For anal play. This item can be worn in your bottom or played with.",
        cost:8000,
        type:["dildo","anal"],
		category:"butt_plug",
		wearable:1,
        size:2,
        icon:"img/misc/icon/sex toys/analbeads.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.worn==!0) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: ["black","blue","teal","lime-green","light-pink","purple","tan","brown","red"],
		display_condition: function(){return 1}
    },
    {
        index:3,
        name:"bullet vibe",
        namecap:"Bullet vibe",
		name_underscore:"bullet_vibe",
		description:"The vibrations produced from this item give powerful orgasms. Good for people new to sex toys.",
        cost:12000,
		wearable:0,
		size:0,
		category:"vibrator",
        type:["dildo","vibrator"],
        icon:"img/misc/icon/sex toys/bulletvibe.png",
        colour: 0,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.worn==!0) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: [],
		default_colour: "pink",
		display_condition: function(){return 1}
    },
    {
        index:4,
        name:"butt plug",
        namecap:"Butt plug",
		name_underscore:"butt_plug",
		description:"For anal play. This item can be worn in your bottom or played with.",
        cost:8000,
		wearable:1,
		size:2,
		category: "butt_plug",
        type:["dildo","anal"],
        icon:"img/misc/icon/sex toys/buttplug.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.worn==!0) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: ["black","blue","teal","lime-green","light-pink","purple","tan","brown","red"],
		display_condition: function(){return 1}
    },
    {
        index:5,
        name:"strap-on",
        namecap:"Strap-on",
		name_underscore:"strap-on",
		clothes_index:33,
		description:"Worn on your hips. Used for penetrative sex.",
        cost:8000,
		wearable:1,
		size:2,
		category:"strap-on",
        type:["strap-on","fetish"],
        icon:"img/misc/icon/clothes/strap-on.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(V.worn.under_lower.type.includes("strap-on")) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: ["black", "blue", "green", "pink", "purple", "red", "white", "yellow", "tan", "brown"],
		display_condition: function(){return 1}
    },
    {
        index:6,
        name:"strap-on horse cock",
        namecap:"Strap-on horse cock",
		name_underscore:"strap-on_horse_cock",
		clothes_index:34,
		description:"Novelty equine phallus. Worn on your hips. Used for penetrative sex.",
        cost:8000,
		wearable:1,
		size:4,
		category:"strap-on",
        type:["strap-on","fetish"],
        icon:"img/misc/icon/clothes/horsestraponicon.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(V.worn.under_lower.type.includes("strap-on")) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: ["black", "blue", "green", "pink", "purple", "red", "white", "yellow", "tan", "brown"],
		display_condition: function(){return 1}
    },
    {
        index:7,
        name:"strap-on knotted cock",
        namecap:"Strap-on knotted cock",
		name_underscore:"strap-on_knotted_cock",
		clothes_index:35,
		description:"Novelty canine phallus. Worn on your hips. Used for penetrative sex.",
        cost:8000,
		wearable:1,
		size:3,
		category:"strap-on",
        type:["strap-on","fetish"],
        icon:"img/misc/icon/clothes/knottedstrapon.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(V.worn.under_lower.type.includes("strap-on")) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: ["black", "blue", "green", "pink", "purple", "red", "white", "yellow", "tan", "brown"],
		display_condition: function(){return 1}
    }/*,
    {
        index:8,
        name:"onahole",
        namecap:"Onahole",
		name_underscore:"onahole",
		description:"This is an item description. Try to keep it short, about two or three lines is fine. This is more text to fill the space.",
        cost:8000,
		wearable:0,
		size:0,
		category:"onahole",
        type:["onahole"],
        icon:"img/misc/icon/sex toys/dildo.png",
        colour: 1,
		owned: function(){if (V.inventory.sextoys[this.name] != undefined){return V.inventory.sextoys[this.name].length}else return 0},
		isCarried: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.carried==!0) return item} return 0}},
		isWorn: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item of V.inventory.sextoys[this.name]){if(item.worn==!0) return item} return 0}},
		unWear: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].worn==!0) V.inventory.sextoys[this.name][item].worn = 0}}},
		unCarry: function(){if(V.inventory.sextoys[this.name] != undefined){for(let item in V.inventory.sextoys[this.name]){if(V.inventory.sextoys[this.name][item].carry==!0){ V.inventory.sextoys[this.name][item].worn = 0; V.inventory.sextoys[this.name][item].carried = 0}}}},
		colour_options: ["black","blue","teal","lime-green","light-pink","purple","tan","brown","red"],
		display_condition: function(){return 1}
    }*/
];

window.sexShopGridInit = function(){
	$(function(){
		for (let item of setup.sextoys){
			if (item.display_condition()) // This check if an item meets the required conditions to be shown in the shop.
				window.sexShopGridAddItemBox(item)
		}
	})
}

window.sexShopGridAddItemBox = function(item) {
	document.getElementById("sexShopMenuContainer").innerHTML += `
	<div class="ssm_item" id="` + "ssm_item_" + item.name_underscore + `" onclick="window.sexShopOnItemClick(`+ item.index +`)">
		<div class="ssm_icon">
			<img id="` + "ssm_item_icon_" + item.name_underscore + `" src="`+ item.icon + `" class="` + ((item.colour == 1) ? "clothes-" + item.colour_options.random() : "") + `">
		</div>
		<div class="ssm_details">
			<div class="ssm_item_name">
				` + item.namecap + `
			</div>
			<div class="ssm_already_owned">
				` + ((item.owned() > 0) ? `<span class="ssm_owned_text">owned</span>` : "") + `
			</div>
		</div>
	</div>
	`;
}

window.sexShopOnColourClick = function(colour){
	for (let elem of document.getElementsByClassName("colour-button div-link "))
		elem.classList.remove("active");
	document.querySelectorAll('[colour-name="' + colour + '"]')[0].classList.add("active");
	document.getElementById("ssm_desc_img").className = "clothes-"+colour
}

window.sexShopOnItemClick = function (index) {
	let item = setup.sextoys[index]
	let coloring_div = "";

	/* clear "Bought!/Buy it" fade in setTimeout from window.sexShopOnBuyClick  */
	if (window.sexShopOnBuyClick.counter != undefined && window.sexShopOnBuyClick.counter != "off"){
		clearTimeout(window.sexShopOnBuyClick.counter)
		window.sexShopOnBuyClick.counter = "off"
	}
	/* grid item box class changes */
	try{
		document.getElementsByClassName("ssm_selected_a")[0].classList.remove("ssm_selected_a")
		document.getElementsByClassName("ssm_selected_b")[0].classList.remove("ssm_selected_b")
		document.getElementsByClassName("ssm_selected_c")[0].classList.remove("ssm_selected_c")
	}catch{;}
	$("#ssm_item_"+item.name_underscore)[0].classList.add("ssm_selected_a")
	$("#ssm_item_"+item.name_underscore+" > .ssm_details > .ssm_item_name")[0].classList.add("ssm_selected_b")
	$("#ssm_item_"+item.name_underscore+" > .ssm_details > .ssm_already_owned")[0].classList.add("ssm_selected_c")
	/* description/buying box */
	for (let index in item.colour_options) {
		coloring_div += (index == 0 ? `<br><span style="color:#e0e0e0">Colours to choose from :</span><div id="ssm_colour_panel" class="colour-options-div"><br> ` : "") + `
			<div colour-name="` + item.colour_options[index] + `" onclick="window.sexShopOnColourClick(` + "`" +  item.colour_options[index] + "`" + `)" class="colour-button div-link">
				<div class="bg-` + item.colour_options[index] + `">
					<span class="capitalize colour-name-span">` + item.colour_options[index] + `</span>
					<a tabindex="0"></a>
				</div>
			</div>
		`
	}
	coloring_div += "</div>";
	document.getElementById("ssm_descContainer").innerHTML = `
	<div id="ssm_desc_img" class="` + document.getElementById("ssm_item_icon_" + item.name_underscore).className + `">
		<img style="" src="` + item.icon + `">
	</div>
	<div class="ssm_desc_border">
		<div id="ssm_desc">
			<div class="ssm_closeContainer">
				<div class="ssm_close" id="ssm_close1" title="close" onclick="window.sexShopOnCloseDesc(` + "`ssmDescPillContainer`" + `)">x
				</div>
			</div>
			<span style="color:#bcbcbc">` + item.description + `</span>
			<div id="ssm_desc_action">` + coloring_div + `<div style="text-align: center;">
				<br>	
				` + (V.money >= item.cost ? `<a id="ssmBuyButton" onclick="window.sexShopOnBuyClick(` +  item.index + `)" class="ssm_buy_button">
					Buy it
				</a> (<span class="gold">£` + item.cost / 100 + `</span>)` : `<span class="ssm_not_enough_money">Not enough money</span>` ) +
				(V.dev == 1 ? window.determineRecipient(item.index) : "")
				+
				`
				</div>
			</div>
		</div>
	</div>
	`
	document.getElementById("ssmDescPillContainer").style.display = ""
}

window.determineRecipient = function(index) { // conditions for gifting items to people
	let item = setup.sextoys[index];
	let builder;
	let option_builder = '';

	if (document.getElementById("giftBr"))
		document.getElementById("giftBr").remove()
	if (V.money < (item.cost + (15 * 100))) // Add 15$ for gifting paperwrap
		return ""
	
	for (let li of ["Alex", "Eden", "Kylar", "Robin", "Sydney"]){
		if (V.loveInterest.primary == li || V.loveInterest.secondary == li){
			if (li == "Eden" && V.syndromeeden != 1)
				continue
			if (li == "Sydney" && sydneyromance != 1)
				continue
			option_builder += (`<option value="` + li + `">` + li + `</option>`)
		}
	}
	if (option_builder == "") // if no possible recipient, return.
		return ""
	builder = `<br id="giftBr"><a id="ssmGiftButton" onclick="window.sexShopOnGiftClick(` +  item.index + `)" class="ssm_gift_button">
	Make a gift for :  </a>` + `<select name="recipient" id="recipientList">` + option_builder + `</select> <div id="spanGift">(<span class="gold">£` + ((item.cost / 100) + 15)+ `</span>)</div>`
	return builder
}

window.sexShopOnCloseDesc = function (elem_id) {
	document.getElementById(elem_id).style.display = 'none'
	/* grid item box class changes */
	try{
		document.getElementsByClassName("ssm_selected_a")[0].classList.remove("ssm_selected_a")
		document.getElementsByClassName("ssm_selected_b")[0].classList.remove("ssm_selected_b")
		document.getElementsByClassName("ssm_selected_c")[0].classList.remove("ssm_selected_c")
	}catch{;}
}

window.sexShopOnGiftClick = function (index) {
	let item = setup.sextoys[index];
	let icon_class_name = document.getElementById("ssm_desc_img").className
	let recipient = document.getElementById("recipientList").value.toLowerCase();

	recipient = window.findIndexInNPCNameVar(recipient)
	window.sexShopOnGiftClick.counter = window.sexShopOnGiftClick.counter || "off"
	/* add item to NPC's inventory */
	if (V.NPCName[recipient].sextoys == undefined)
		V.NPCName[recipient].sextoys = {}
	if (V.NPCName[recipient].sextoys[item.name] == undefined)
		V.NPCName[recipient].sextoys[item.name] = []
	let obj = {
		"index":item.index,
		"name":item.name,
		"namecap":item.namecap,
		"colour":(icon_class_name == '' ? item.default_colour : icon_class_name.substring(icon_class_name.indexOf("-") + 1)),
		"worn": false,
		"size": item.size,
	//	"sizeDesc": {0:"", 1:"", 2: "", 3: "large", 4: "massive"}[item.size],
	//	"desc":(this.sizeDesc + " " + this.colour + " " + this.name),
		"carried": false,
		"combat_state":"worn",
		"gift_state": "held"
	}
	if (item.category == "strap-on")
		obj.clothes_index = item.clothes_index
	V.NPCName[recipient].sextoys[item.name].push(obj);
	/* withdraw money from player */
	V.money -= (item.cost + (15 * 100))
	/* update sidebar money */
	window.updateSideBarMoney()
	/* fade in/out bought green text indicator */
	document.getElementById("ssmGiftButton").outerHTML = `<span class="ssm_gift_button ssm_fade_in" id="ssmGiftButton" style="color:#97de97">Bought!</span>`
	document.getElementById("recipientList").remove()
	document.getElementById("spanGift").remove()
	if (window.sexShopOnGiftClick.counter == "off"){
		window.sexShopOnGiftClick.counter = window.setTimeout(function(){
			document.getElementById("ssmGiftButton").outerHTML = window.determineRecipient(index);
		window.sexShopOnGiftClick.counter = "off"
		}, 1400)
	}
}

window.sexShopOnBuyClick = function (index) {
	let item = setup.sextoys[index]
	let icon_class_name = document.getElementById("ssm_desc_img").className
	window.sexShopOnBuyClick.counter = window.sexShopOnBuyClick.counter || "off"
	/* add item to player inventory */
	if (V.inventory.sextoys[item.name] == undefined)
		V.inventory.sextoys[item.name] = []
	let obj = {
		"index":item.index,
		"colour":(icon_class_name == '' ? item.default_colour : icon_class_name.substring(icon_class_name.indexOf("-") + 1)),
		"name":item.name,
		"namecap":item.namecap,
		"worn": false,
		"type": item.type,
		"size": item.size,
	//	"sizeDesc": {0:"", 1:"", 2: "", 3: "large", 4: "massive"}[item.size],
	//	"desc":(this.sizeDesc + " " + this.colour + " " + this.name),
		"carried": false,
		"combat_state":"removed"
	}
	if (item.category == "strap-on"){
		let obj2 = setup.clothes.under_lower[item.clothes_index]
		
		obj.clothes_index = item.clothes_index
		obj2.colour = obj.colour
		V.wardrobe["under_lower"].push(obj2)
	}
	V.inventory.sextoys[item.name].push(obj)
	/* withdraw money from player */
	V.money -= item.cost
	/* update sidebar money */
	window.updateSideBarMoney()
	/* fade in "owned" icon */
	document.getElementById("ssm_item_" + item.name_underscore).getElementsByClassName("ssm_already_owned")[0].innerHTML = `<span class="ssm_owned_text ssm_fade_in">owned</span>`
	/* fade in/out bought green text indicator */
	document.getElementById("ssmBuyButton").outerHTML = `<span class="ssm_buy_button ssm_fade_in" id="ssmBuyButton" style="color:#97de97">Bought!</span>`
	if (window.sexShopOnBuyClick.counter == "off"){
		window.sexShopOnBuyClick.counter = window.setTimeout(function(){
			if (document.getElementById("ssmBuyButton"))
			document.getElementById("ssmBuyButton").outerHTML = `<a id="ssmBuyButton" onclick="window.sexShopOnBuyClick(` + index + `)" class="ssm_buy_button ssm_fade_in_fast">
			Buy it
		</a>`;
		window.sexShopOnBuyClick.counter = "off"
		}, 1400)
	}
}

window.createInventoryObject = function(){ // create Inventory object if it doesn't exist
	var recipient;

	if (V.inventory == undefined)
		V.inventory = {}
	if (V.inventory.sextoys == undefined)
		V.inventory.sextoys = {}
	for (let li of ["alex", "eden", "kylar", "robin", "sydney"]){
		recipient = window.findIndexInNPCNameVar(li)
		if (V.NPCName[recipient].sextoys == undefined)
			V.NPCName[recipient].sextoys = {}
	}
}

window.updateSideBarMoney = function(){
	new Wikifier(null, '<<updatesidebarmoney>>');
}