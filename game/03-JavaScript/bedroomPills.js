/*
 * if display_condition is 1, item is displayed, else it's not
 * current max doses for Harper/Asylum pills is 1; 2 for every other pills
 * place the widgets that need to be run inside effects array
 * if you feel lost just ask away :)
 * take_condition == 1 means the "Take Pill" button is not greyed out and is clickable
 * display_condition controls wether or not pill should be displayed in the pill menu
*/

/*
--- Please change this comment as needed when the format of setup.pills changes ---
This is the setup.pills array.
It contains a list of all the possible pills.
A single pill object contains multiple 'properties' which define the pill.

 * name:'example pill' - The name displayed in the medicine drawer screen. Auto-capitalizes first word. Capitalize other words if desired.
 * description: 'this pill is green.' - The description displayed when the pill is selected.
 * onTakeMessage: 'You swallow the green pill.' - Text displayed when a pill is taken.
 * warning_label: 'Warning: example pill may cause explosive decompression.' - Warning label displayed in text box. <span class="hpi_notice_label"> is used in several of these.
 * indicators: - Array of indicators.  Example: `<span class="hpi_indic_green">+ Control</span>`
 * icon: 'img/misc...blahblah' - file path of the png icon for this pill.
 *
 * autoTake: - Code or statement that determines if this pill is set to auto-take ??? **
 * doseTaken: - Code or statement showing how many doses were taken already. **
 * owned: - Code or statement to determined the number owned. **
 * overdose: - Code or statement to determine overdose. **
 * display_condition: - Code or statement to determine if the pill displays in list. **
 * take_condition: - Code or statement to determine if the take button displays for this pill - can a dose currently be taken. **
 *
 * type: "various" - Type of pill. Pill code uses this to determine what the effects are and where they apply.  Example: "bottom" or "breast"
 * subtype: "various" - Action the pill has on bodypart 'type'. Optional for the asylum & harper meds apparently. Example: "reduction" or "growth"
 * shape: "pill" or "galenic" - Helps to properly space the icon.
 * effects: - Array of effects - can be used to issue quick macros for setting results.  Example: `<<control 25>>`
*/
setup.pills = [
	{
		name:'bottom reduction',
		description: 'Each pill contains 500mg of Praberrhol, a derived molecule crafted specifically to attach to the triglyceride present in your buttocks and dissolve them over time.',
		onTakeMessage: 'You take the pills intended to reduce your butt\'s size. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe side effects upon exceeding the maximum dose prescribed per day. Not to be associated with any other hormonal treatment.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "bottom",
		subtype: "reduction",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/bottomReduction.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'bottom growth',
		description: 'This pill contains a molecule, the Nynthroptechloxin, a technological prowess made possible by our most eminent pharmaceutical scientist, Dr Bancel. It increases the body production of a very particular hormone responsible for hips and buttocks\' weight gains. 190mg of this molecule is present per pill. ',
		onTakeMessage: 'You take the pills intended to boost your butt\'s growth. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe side effects upon exceeding the maximum doses per day. Refer to your doctor if in doubts. Not to be associated with any other hormonal treatment.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "bottom",
		subtype: "growth",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/bottomGrowth.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'bottom blocker',
		description: 'Each pill contains 200mg of Praberrhol-NG2, a derived molecule crafted specifically to attach to the triglyceride present in your buttocks and dissolve them over time. The right dosage allowing to keep a balance between gained fat and dissolved fat.',
		onTakeMessage: 'You take the pills intended to block your butt\'s growth. You hope it will be as effective as advertised.',
		warning_label: '<span class="hpi_notice_label">Notice: No side effects were determined during the trials for this drug. Taking more than 1 pill per 24 hours is ineffective</span>',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "bottom",
		subtype: "blocker",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/bottomBlocker.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return 1},
		effects:[]
	},
	{
		name:'breast reduction',
		description: 'Each pill contains 500mg of Praberrhol (NG2), a derived molecule crafted specifically to attach to the triglyceride present in your breast and dissolve them over time.',
		onTakeMessage: 'You take the pills intended to reduce your breasts\' size. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe side effects upon exceeding the maximum doses per day. Refer to your doctor if in doubts. Not to be associated with any other hormonal treatment.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "breast",
		subtype: "reduction",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/breastReduction.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'breast growth',
		description: 'An hormonal mRNA therapy-pill. The 5mg of Dipardyn present aim at triggering natural secretion of the specific hormones in cause in breasts growth. While the mRNA will help have your cells produce a new kind of hormone increasing the tissue production in your breasts, and their capabilities to store fat, effectively making your breasts grow faster.',
		onTakeMessage: 'You take the pills intended to boost your breasts\' growth. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe side effects upon exceeding the maximum doses per day. Refer to your doctor if in doubts. Not to be associated with any other hormonal treatment.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "breast",
		subtype: "growth",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/breastGrowth.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'breast blocker',
		description: 'A selective estrogen receptor modulator (SERM), blocking the protein receptors in cause in breast growth; Supplemented by 269mg of Tetraozealpostigyl.',
		onTakeMessage: 'You take the pills intended to block your breasts\' growth. You hope it will be as effective as advertised.',
		warning_label: '<span class="hpi_notice_label">Notice: No side effects were determined during the trials for this drug. Taking more than 1 pill per 24 hours is ineffective</span>',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "breast",
		subtype: "blocker",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/breastBlocker.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return 1},
		effects:[]
	},
	{
		name:'penis reduction',
		description: 'Each pill contains 50mg of Chliustose which has limited anti-androgen effects. In addition of 450mg of Phirhyn that will reduce the amount and thickness of the erectile tissue.',
		onTakeMessage: 'You take the pills intended to reduce your penis\' size. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe side effects upon exceeding the maximum doses per day. Refer to your doctor if in doubts. Not to be associated with any other hormonal treatment.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "penis",
		subtype: "reduction",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/penisReduction.png',
		display_condition: function(){return (V.player.penisExist && this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'penis growth',
		description: 'Each pill contains 780mg of Cumnictondyl, 240mg of Iphopol and 149mg of testosterone undecanoate. The two molecules enable and facilitate the action of the androgen, which has for effect to resume the natural growth of your penis.',
		onTakeMessage: 'You take the pills intended to boost your penis\' growth. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe side effects upon exceeding the maximum doses per day. Refer to your doctor if in doubts. Not to be associated with any other hormonal treatment.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "penis",
		subtype: "growth",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/penisGrowth.png',
		display_condition: function(){return (V.player.penisExist && this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'penis blocker',
		description: 'An anti-androgen hormonal treatment containing 370mg of Dynthryme aiming at blocking the production of androsterone and testosterone in your body, effectively blocking penile growth.',
		onTakeMessage: 'You take the pills intended to block your penis\' growth. You hope it will be as effective as advertised.',
		warning_label: '<span class="hpi_notice_label">Notice: No side effects were determined during the trials for this drug. Taking more than 1 pill per 24 hours is ineffective</span>',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "penis",
		subtype: "blocker",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/penisBlocker.png',
		display_condition: function(){return (V.player.penisExist && this.owned() > 0) ? 1 : 0},
		take_condition: function(){return 1},
		effects:[]
	},
	{
		name:'fertility booster',
		description: 'Each pill contains 50mg of clomiphene citrate, a structural analogue of estrogens. It also acts on your hypothalamus which secretes the hormones necessary to trigger ovulation. In most cases effectively inducing your ovary to release eggs.',
		onTakeMessage: 'You take the pills intended to increase your fertility. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Severe complications if exceeding the maximum doses per day.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "pregnancy",
		subtype: "fertility",
		shape: "pill",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/pregnancyFertility.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'contraceptive',
		description: 'Estroprogestatifs associating 24mg of ethinylestradiol(synthetic estrogen) and 31mg of a synthetic progestin for a near-perfect contraceptive effect.',
		onTakeMessage: 'You take the contraceptive pill. You hope it will be as effective as advertised.',
		warning_label: 'Warning: Serious side effects upon exceeding the maximum doses per day. If in doubt, please consult your doctor.',
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "pregnancy",
		subtype: "contraceptive",
		shape: "galenic",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/pregnancyContraceptive.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 2) ? 1 : 0},
		effects:[]
	},
	{
		name:'asylum\'s prescription',
		description: 'A powerful antipsychotic.',
		onTakeMessage: 'You take the pills prescribed in the asylum. You feel hazy.',
		warning_label: '<span class="hpi_notice_label">Notice: No side effects could be determined during the experimental stage of this drug, and it passed all safety regulations. \
						<span class="hpi_blur unselectable">I think this drug company is about to be the end of me. No side effects ? Who do they think they\'re kidding ?!</span></span>',
		autoTake: false,
		indicators: [
			`<span class="hpi_indic_green">++ Control</span>`,
			`<span class="hpi_indic_blue">- Awareness</span>`
		],
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "asylum",
		shape: "galenic",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/strong pills.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 1 && V.asylummedicated == 0) ? 1 : 0},
		effects: [
			`<<awareness -5>>`,
			`<<control 25>>`,
			`<<set $asylummedicated += 1>>`
		]
	},
	{
		name:'Dr Harper\'s prescription',
		description: 'Antipsychotic medication.',
		onTakeMessage: 'You take the pills Doctor Harper prescribed. You feel dizzy.',
		warning_label: 'Warning: The side effects upon reaching maximum dosage have not been studied enough. Proceed with caution. \
		<span class="hpi_blur"></span>',
		indicators: [
			`<span class="hpi_indic_green">+ Control</span>`,
			`<span class="hpi_indic_blue">- Awareness</span>`
		],
		autoTake: function(){return V.sexStats.pills["pills"][this.name].autoTake},
		doseTaken: function(){return V.sexStats.pills["pills"][this.name].doseTaken},
		owned: function(){return V.sexStats.pills["pills"][this.name].owned},
		type: "harper",
		shape: "galenic",
		overdose: function(){return V.sexStats.pills["pills"][this.name].overdose},
		icon: 'img/misc/icon/pills.png',
		display_condition: function(){return (this.owned() > 0) ? 1 : 0},
		take_condition: function(){return (this.doseTaken() < 1 && V.medicated == 0) ? 1 : 0},
		effects: [
			`<<awareness -1>>`,
			`<<control 10>>`,
			`<<set $medicated += 1>>`
		]
	}
]

window.generateHomePillsInventory = function() {
	$(function(){
		T.disableGridClick = false
		for (let item of setup.pills){
			if (item.display_condition() == 1)
				window.addElementToGrid(item)
		}
	});
}

window.onMouseEventDisableGridClick = function(code) {
	T.disableGridClick = code
}

window.addElementToGrid = function(item) {
	$(function(){
		let hpi_gridContainer = document.getElementById("homeMainPillContainer");

		let item_name = item.name[0].toUpperCase() + item.name.slice(1)
		hpi_gridContainer.innerHTML = hpi_gridContainer.innerHTML +
		`
		<div class="hpi_item">
		<div class="hpi_icon"><img id="icon" src="` + item.icon + `"</img></div>
		<div class="hpi_name" id="hpi_name_` + item_name + `" >` + item_name + ((item.autoTake() == true) ? `<span class="hpi_auto_label"> [Auto]</span>` : "") + `</div>
		<div class="hpi_count" onmouseenter="window.onMouseEventDisableGridClick(true)" onmouseleave="window.onMouseEventDisableGridClick(false)">` + item.owned() + `</div>
		</div>
		`
		hpi_gridContainer.lastElementChild.setAttribute('onclick', "window.onHomePillItemClick(" + "`" + item.name + "`" + ")")
	});
}

window.onHomePillItemClick = function(item_name) {
	if (!T.disableGridClick){
		document.getElementById("homeDescPillContainer").style.display = 'grid'
		for (let item of setup.pills){
			if (item.name == item_name){
				document.getElementById("hpi_desc").outerHTML =
				`<div id="hpi_desc">`+ item.description +
				`
					<div class="hpi_warning_label">` + item.warning_label + `</div>
					<div id="hpi_desc_action">
						<a id="hpi_take_pills" onclick="window.onTakeClick(` + "`" + item.name + "`," + "`" + item.type + "`" + `)" class="hpi_take_pills">Take pill</a>
						<a id="hpi_take_every_morning" onclick="window.onAutoTakeClick(` + "`" + item.name + "`," + "`" + item.type + "`" + `)">Take every morning</a>
					</div>
				</div>
				`
				window.toggleWhatNeedsToBeToggled(item)
				document.getElementById("hpi_desc_img").innerHTML = `<img` + ((item.shape == "galenic") ? ` style="margin-left: 17%;"` : "") + ` src="` + item.icon + `"></img>` +
				`<div id="hpi_indicator" class="hpi_indicator"></div>`
				window.addIndicators(item);
			}
		}
	}
}

window.addIndicators = function(item){ // Indicators are the "++Control" and "+Awareness" etc. We add them under the pill icon.
	if (item.indicators != undefined && item.indicators.length > 0){
		for (let indicator of item.indicators)
			document.getElementById("hpi_indicator").innerHTML += indicator
	}
}

window.toggleWhatNeedsToBeToggled = function(item){
	document.getElementById("hpi_take_every_morning").innerHTML = (item.autoTake()) ? "Stop taking them" : "Take every morning"
	if (item.type == "asylum" || item.type == "harper"){
		document.getElementById("hpi_take_every_morning").className = "hidden" // prevent from Take every Morning option to show for those type of pills
		document.getElementById("hpi_take_pills").classList.add("hpi_take_me_single")
	}
	document.getElementById("hpi_take_pills").innerHTML = "Take pill"
	if (document.getElementById("hpi_doseTaken") != undefined)
		document.getElementById("hpi_doseTaken").outerHTML = `<span id="hpi_doseTaken" style="font-size: 0.88em;color: #979797;"> [` + item.doseTaken() + ` Taken]</span>` // Display today taken doses for specific pill
	else
		document.getElementById("hpi_take_pills").outerHTML += `<span id="hpi_doseTaken" style="font-size: 0.88em;color: #979797;"> [` + item.doseTaken() + ` Taken]</span>` // Display today taken doses for specific pill
	if (item.take_condition() == 0){
		document.getElementById("hpi_take_pills").classList.add("hpi_greyed_out")
		document.getElementById("hpi_take_pills").onclick = "" // disable "Take Pill" button
	}
}

window.setLastTaken = function(type, subtype, fullname=null) {
	if (fullname != null){
		for (let p of setup.pills){
			if (p.name == fullname){
				type = p.type;
				subtype = p.subtype
			}
		}
	}
	V.sexStats.pills.lastTaken[type] = subtype
}

window.pickRandomItemInArray = function(array) {
	if (array != null && array.length > 0 && typeof array == 'object')
		return(array[window.getRandomIntInclusive(0, array.length-1)]);
	console.log(array)
	throw 'Error in bedroomPills.js line 243 : parameter is either empty/null or not an object'; //intentional, so the person using that function knows his stuff is not valid
}

window.redetermineMostTaken = function(type, subtype, fullname=null) {
	let result = {"blocker":0,"growth":0,"reduction":0};
	let ret;

	if (fullname != null){
		for (let p of setup.pills){
			if (p.name == fullname){
				type = p.type;
				subtype = p.subtype
			}
		}
	}
	if (["breast", "bottom", "penis"].includes(type) == false)
		return
	for (let pill of setup.pills){
		if (pill.type == type && ["blocker", "growth", "reduction"].includes(pill.subtype))
			result[pill.subtype] = pill.doseTaken()
	}
	ret = result.growth - result.reduction;
	if (ret == 0 && (result.growth > 0 || result.reduction > 0)){ // We enter here when growth and reduction pills neutralized each others
		if (result.blocker > 0)
			return (V.sexStats.pills.mostTaken[type] = "blocker")
		else
			return (pickRandomItemInArray(V.sexStats.pills.mostTaken[type] = ["growth", "reduction"]))
	}
	else if (ret == 0 && result.blocker > 0) // we enter here when player didn't take any growth/blocker but took blockers
		return (V.sexStats.pills.mostTaken[type] = "blocker")
	else if (ret != 0){ // we enter here when there's unbalance between growth/reduction
		if (ret < 0) // if reduction won
			return (ret + result.blocker >= 0) ? (V.sexStats.pills.mostTaken[type] = "blocker") : (V.sexStats.pills.mostTaken[type] = "reduction") // determine if blocker win
		else if (ret > 0) // if growth won
			return (ret - result.blocker <= 0) ? (V.sexStats.pills.mostTaken[type] = "blocker") : (V.sexStats.pills.mostTaken[type] = "growth") // determine if blocker win
	}
}

window.onTakeClick = function (item_name){
	V.sexStats.pills["pills"][item_name].owned -= 1;
	V.sexStats.pills["pills"][item_name].doseTaken += 1 // Stat for specific pill consumption
	V.pillsConsumed = (typeof V.pillsConsumed == undefined || V.pillsConsumed == null) ? 1 : V.pillsConsumed + 1 // Stat for total pills consumption
	for (let item of setup.pills){
		if (item.name == item_name){
			for (let widget of item.effects) // run the widgets associated with a pill
				new Wikifier(null, (typeof widget == "function") ? widget() : widget);
			V.sexStats.pills.lastTaken[item.type] = item.subtype // keep track of the category of pill we last took
			V.sexStats.pills.mostTaken[item.type] = window.redetermineMostTaken(item.type, item.subtype)
			if (item.doseTaken() > 1 && item.name.contains("blocker") == false){
				if (item.type == "pregnancy"){
					Engine.play("PillCollectionSecondDosePregnancy")
					return
				}
				else{
					Engine.play("PillCollectionSecondDose")
					return
				}
			}
			V.lastPillTakenDescription = item.onTakeMessage
		}
	}
	Engine.play("Take Pill From Medicine Drawer")
}

window.onAutoTakeClick = function(item_name, item_type){
	for (let item in setup.pills){
		if (setup.pills[item].name == item_name){
			V.sexStats.pills["pills"][item_name].autoTake = !V.sexStats.pills["pills"][item_name].autoTake // toggle auto take
			window.toggleWhatNeedsToBeToggled(setup.pills[item]) // change "Take every morning" button to "Stop taking them"
		}
		else if (["breast", "penis", "bottom", "pregnancy"].includes(item_type) && setup.pills[item].type == item_type)
			V.sexStats.pills["pills"][setup.pills[item].name].autoTake = false // disable auto takes for other similar pills(bottom/penis/breast etc)
	}
	window.syncAutoTakeDisplayedState()
}

window.syncAutoTakeDisplayedState = function() { // Add or remove [Auto] tag from pill names in the pills menu
	for (let item of setup.pills){
		let capitalized_name = item.name[0].toUpperCase() + item.name.slice(1)
		if (document.getElementById("hpi_name_" + capitalized_name) != null){
			document.getElementById("hpi_name_" + capitalized_name).innerHTML = capitalized_name
			document.getElementById("hpi_name_" + capitalized_name).innerHTML += (item.autoTake() == true) ? `<span class="hpi_auto_label"> [Auto]</span>` : ""
		}
	}
}

window.onSecondDoseTakenSetVars = function() { // If player take two doses of anything but blocker/pregnancy/harper/asylum pills, determine the risk stat and
	let doseTaken = {"bottom":0, "penis":0, "breast":0}
	let chosen;
	let doseTaken_sum;

	T.risk = 0;
	T.pillAmountOfCategoriesUsed = 0;
	for (let item of setup.pills){ // determine how many pills of each have been taken.
		if (["bottom", "penis", "breast"].contains(item.type))
			doseTaken[item.type] += item.doseTaken()
	}
	const sumValues = obj => Object.values(obj).reduce((a, b) => a + b); // count every doses
	let i = -1
	doseTaken_sum = sumValues(doseTaken) // store the count in this variable
	while (++i < doseTaken_sum) // for each dose count, increase the overall risk.
		T.risk += window.getRandomIntInclusive(3,10) // For each dose found, add 3-10 risk points.
	doseTaken = [["bottom", doseTaken["bottom"]], ["penis", doseTaken["penis"]], ["breast", doseTaken["breast"]]] // Changed object to array as it's easier to sort.
	for (let array of doseTaken){
		if (array[1] > 0)
			T.pillAmountOfCategoriesUsed += 1 // How many different categories of pills we took ?
	}
	i = -1;
	while (++i < doseTaken.length - 1){ // sort categories that got the most doses
		if (doseTaken[i][1] < doseTaken[i + 1][1]){
			let tmp = doseTaken[i];

			doseTaken[i] = doseTaken[i + 1]
			doseTaken[i + 1] = tmp;
			i = -1
		}
	}
	i = (doseTaken[0][1] > doseTaken[1][1]) ? 1 : (doseTaken[0][1] == doseTaken[1][1]) ? 2 : (doseTaken[0][1] == doseTaken[2][1]) ? 3 : 1 // determine how many have same value
	chosen = window.getRandomIntInclusive(0, i-1);
	V.pillCat = doseTaken[chosen][0] // select random category among the 1st ones
	T.secondaryPill = (chosen > 0) ? doseTaken[chosen-1][0] : doseTaken[chosen+1][0] // select second category
}

window.getRandomIntInclusive = function(min, max) { // return a random number between min max, both included.
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min;
}

window.backCompPillsInventory = function() {
	/* Return immediately if $sexStats doesn't exist. */
	if (typeof V.sexStats == 'undefined') return;
	const oPills = V.sexStats.pills;
	const pills = {};
	if (typeof oPills === 'object') {
		/* If our $sexStats.pills is an object and has this property, it is ready for production. */
		if (oPills.hasOwnProperty('mostTaken')) return;
		try {
			pillsObjectRepair(oPills, pills);
		} catch (error) {
			Errors.report('Compatibility patch for pills object failed: ' + error, { oPills, pills });
		}
	}
	Object.assign(pills, {
		'bottom reduction' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'bottom growth' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'bottom blocker' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'breast reduction' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'breast growth' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'breast blocker' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'penis reduction' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'penis growth' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'penis blocker' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'fertility booster' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		'contraceptive' : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"asylum's prescription" : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"Dr Harper's prescription" : { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 }
	});
	if (typeof oPills === 'undefined') {
		/* If our $sexStats.pills was empty, simply set the object in preparation to assign. */
		V.sexStats.pills = {};
	}
	Object.assign(V.sexStats.pills, {
		"boughtOnce": pills.boughtOnce == true,
		"lastTaken" : { "bottom":'', "breast":'', "penis":'', "pregnancy":'' },
		"mostTaken" : { "bottom":'', "breast":'', "penis":'', "pregnancy":''},
		"pills" : pills,
	});
}

function pillsObjectRepair(oPills, pills) {
	/* if the variable already exist, and is not of the new version(new version has "mostTaken" property that's why we check it),
	then we try to  port the old one to the new one */
	if (typeof oPills.bottom === 'object') {
		Object.assign(pills, {
			'bottom reduction' : { autoTake: oPills.bottom.autoTake === "reduction", owned: oPills.bottom.owned.reduction },
			'bottom growth' : { autoTake: oPills.bottom.autoTake === "growth", owned: oPills.bottom.owned.growth },
			'bottom blocker' : { autoTake: oPills.bottom.autoTake === "blocker", owned: oPills.bottom.owned.blocker }
		});
		delete oPills.bottom;
	}
	if (typeof oPills.breast === 'object') {
		Object.assign(pills, {
			'breast reduction' : { autoTake: oPills.breast.autoTake === "reduction", owned: oPills.breast.owned.reduction },
			'breast growth' : { autoTake: oPills.breast.autoTake === "growth", owned: oPills.breast.owned.growth },
			'breast blocker' : { autoTake: oPills.breast.autoTake === "blocker", owned: oPills.breast.owned.blocker }
		});
		delete oPills.breast;
	}
	if (typeof oPills.penis === 'object') {
		Object.assign(pills, {
			'penis reduction' : { autoTake: oPills.penis.autoTake === "reduction", owned: oPills.penis.owned.reduction },
			'penis growth' : { autoTake: oPills.penis.autoTake === "growth", owned: oPills.penis.owned.growth },
			'penis blocker' : { autoTake: oPills.penis.autoTake === "blocker", owned: oPills.penis.owned.blocker }
		});
		delete oPills.penis;
	}
	if (typeof V.asylumpills === 'number') {
		Object.assign(pills, {
			"asylum's prescription" : { owned: Number.isInteger(V.asylumpills) ? V.asylumpills : 0 }
		});
		delete V.asylumpills;
	}
	if (typeof V.pills === 'number') {
		Object.assign(pills, {
			"Dr Harper's prescription" : { owned: Number.isInteger(V.pills) ? V.pills : 0 }
		});
		delete V.pills;
	}
}

window.determineAutoTakePill = function(category){
	T.autoTakeDetermined = null
	for (let pill of setup.pills){
		if (pill.type == category && pill.autoTake() == true){
			T.autoTakeDetermined = pill.name
			return
		}
	}
}

window.resetAllDoseTaken = function() {
		for (let pill in V.sexStats.pills["pills"])
			V.sexStats.pills["pills"][pill].doseTaken = 0
}

window.resetLastTaken = function () {
	V.sexStats.pills.lastTaken = {"bottom":'', "breast":'', "penis":'', "pregnancy":''}
}

window.resetMostTaken = function() {
	V.sexStats.pills.mostTaken = {"bottom":'', "breast":'', "penis":'', "pregnancy":''}
}

window.getAllPills = function () {
	for (let item of Object.keys(V.sexStats.pills.pills))
		V.sexStats.pills.pills[item].owned = 14
}