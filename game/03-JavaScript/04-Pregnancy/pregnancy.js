//Should a name type for species be setup, say, human/wolf specific names
function generateBabyName(name, gender, childId) {
	let result = "";
	let usedNames = [];
	if(usedNames.length === 0){
		Object.values(V.children).forEach(child => {
			if(!usedNames.includes(child.name) && child.childId !== childId && child.name !== "Unnamed"){
				usedNames.push(child.name);
			}
		})
	}
	if (!!name && name !== "" && name !== "Unnamed") {
		result = name.replace(/[^a-zA-ZÀ-ÿ ]+/g, "").substring(0, 30);
		if(usedNames.includes(result)){
			result += ' - ' + childId;
		}
		return result;
	}
	let names = [];
	switch (gender) {
		case "m":
			// eslint-disable-next-line prettier/prettier
			names = ['Addison','Algernon','Allan','Alpha','Anton','Axel','Bazza','Benton','Bernard','Brand','Brett','Cale','Calvin','Carol','Chuck','Chucky','Clay','Cornelius','Crofton','Darden','Dax','Den','Deven','Digby','Don','Douglas','Driscoll','Duane','Duke','Edmund','Elsdon','Freeman','Gabby','Garland','George','Godfrey','Graeme','Grier','Hammond','Harlan','Hendrix','Herman','Hewie','Hugh','Indiana','Ingram','Jackie','Jasper','Jaxon','Jaycob','Jere','Kamden','Kelcey','Kendall','Kevin','Kian','Kieran','Kirby','Lanny','Lawson','Laz','Leland','Levi','Lindon','Linton','Lionel','Lonny','Lucas','Manley','Maverick','Merlyn','Michael','Monty','Murphy','Nate','Ned','Nowell','Odell','Ollie','Osbert','Otto','Paget','Pip','Quintin','Raymund','Ricky','Robert','Ross','Rudolph','Sammy','Scotty','Stacey','Thad','Theodore','Tommy','Trey','Tyson','Val','Vernon','Willis','Wilmer','Winton','Wisdom'];
			break;
		case "f":
			// eslint-disable-next-line prettier/prettier
			names = ['Adelyn','Alene','Alexa','Aliah','Alyson','Angelica','Annalise','Annora','Azaria','Bessie','Betsy','Bettie','Biddy','Brianne','Camellia','Camille','Camryn','Caroline','Chastity','Chelsea','Chelsey','Cindy','Clematis','Darla','Deb','Debby','Dortha','Eleanora','Eliana','Elsabeth','Elyse','Emerson','Emmeline','Erica','Ettie','Eustacia','Evelyn','Gabrielle','Georgiana','Harper','Harrietta','Haylie','Haze','Hunter','Hyacinth','Indiana','Indie','Jacquetta','Janie','Jannine','Jonquil','Kaelyn','Kam','Khloe','Kolleen','Korrine','Kourtney','Krystine','Lavena','Leeann','Lela','Lesleigh','Lindsie','Lorena','Lucile','Luvinia','Lyn','Lyssa','Madeleine','Marian','Maudie','Maureen','Maxine','Melody','Milani','Misti','Nat','Noelle','Ottoline','Paige','Pauline','Payton','Pearl','Perlie','Petronel','Phebe','Posie','Praise','Rexana','Serena','Sharalyn','Sharla','Shauna','Sky','Sybella','Tracy','Tresha','Trudi','Wallis','Wilda','Wren','Yvette'];
			break;
	}
	// eslint-disable-next-line prettier/prettier
	names.pushUnique('Aaren','Addison','Alex','Alpha','Andie','Arden','Ariel','Artie','Ashton','Aston','Aubrey','Beau','Bernie','Bertie','Beverly','Bobbie','Brooklyn','Caelan','Cameron','Carol','Cary','Casey','Channing','Charley','Cherokee','Cheyenne','Coby','Codie','Collyn','Cyan','Dale','Dallas','Dana','Darby','Dee','Derby','Devan','Devin','Emmerson','Emory','Finley','Flannery','Florence','Gabby','Garnet','Garnett','Gray','Hadyn','Harlow','Hollis','Jackie','Jade','Jae','Jaiden','Johnnie','Joyce','Justice','Kam','Kelcey','Kelsey','Leslie','Lindsey','Lorin','Lyric','Maitland','Marley','McKinley','Merlyn','Murphy','Nicky','Oakley','Odell','Pacey','Paget','Peyton','Presley','Rain','Raleigh','Reagan','Regan','Reilly','Remington','Robbie','Rory','Royale','Sage','Sam','Schuyler','Selby','Shae','Shaye','Shelly','Skylar','Sloan','Stacey','Stacy','Tayler','Tommie','Tracey','Tristen','Tristin','Val');
	names.delete(usedNames);

	result = names[random(0, names.length - 1)];
	if(!result) result = "Unnamed";
	return result;
}
window.generateBabyName = generateBabyName;

window.spermObjectToArray = (spermObject = {}) => {
	let spermArray = [];
	let trackedNPCs = [];

	for(let npc in spermObject){
		if(V.NPCNameList.includes(npc) && !setup.npcPregnancy.canImpregnatePlayer.includes(npc)) continue;
		let sperm = spermObject[npc];
		let spermType;
		switch(sperm.type){
			case "human":
				if(V.playerPregnancyHumanDisable === "t") continue;
				spermType = "human";
			break;
			case "wolf": case "wolfboy": case "wolfgirl":
				if(V.playerPregnancyBeastDisable === "t") continue;
				spermType = "wolf";
			break;
			default: continue;
		}
		if(!trackedNPCs.includes(npc)) trackedNPCs.push([spermType, npc]);
		let count = sperm.count.length < 500 ? sperm.count.length : 500;
		for(let i = 0; i < count; i++){
			if(sperm.count[i][2] < random(0,100)) continue;
			let count2 = sperm.count[i][1] < 500 ? sperm.count[i][1] : 500;
			for(let j = 0; j < count2; j++){
				spermArray.push([sperm.type, npc]);
				if(sperm.count[i][2] > random(100,200)) spermArray.push([sperm.type, npc]);
			}
		}
	}
	return [trackedNPCs, spermArray];
}

/*V.pregnancytype === "fetish" uses this function*/
const fetishPregnancy = ({genital = "vagina", target = null, spermOwner = null, spermType, rngModifier = 100, quantity = 1}) => {
	let motherObject = npcPregObject(target);
	const [pregnancy, fertility, magicTattoo] = pregPrep({motherObject, genital});

	//Check the cycle settings
	let multi = 1;
	if(V.cycledisable === "f"){
		if(target === "pc"){
			let menstruation = V.sexStats.vagina.menstruation;
			if(menstruation.currentState !== "normal") return null;
			let diff = Math.abs(menstruation.stages[2] - menstruation.currentDay);
			multi = Math.clamp((diff > 1 ? 1 - (diff * 0.15) : 1),0,1);
		} else if(C.npc[target] && C.npc[target].pregnancy && C.npc[target].pregnancy.enabled){
			let diff = Math.abs(pregnancy.cycleDangerousDay - pregnancy.cycleDay);
			multi = Math.clamp((diff > 1 ? 1 - (diff * 0.15) : 1),0,1);
		}
	} else {
		//Other non-cycle modifiers
		if(target === "pc"){
			let menstruation = V.sexStats.vagina.menstruation;
			multi = 1 / Math.pow(4, menstruation.nonCycleRng[0]);
		} else if(C.npc[target] && C.npc[target].pregnancy && C.npc[target].pregnancy.enabled){
			multi = 1 / Math.pow(4, C.npc[target].pregnancy.nonCycleRng[0]);
		}
	}

	if(pregnancy && pregnancy.type === null){
		let chance = 100 / (target === "pc" ? 100 - V.baseVaginalPregnancyChance : 20 - V.baseNpcPregnancyChance);

		if(chance * quantity * (rngModifier / 100) * (1 + fertility + magicTattoo) * multi < random(1,100) - 15) return false;

		if(target === "pc"){
			let result = playerPregnancy(spermOwner, spermType, true, genital, undefined, true);
			if(result === true) T.playerIsPregnant = true;
		}else if(C.npc[target]){
			let result = namedNpcPregnancy(target, spermOwner, spermType, true);
			if(result === true) T.npcIsPregnant = true;
		}
		return true;
	}
	return false;
}

/*Player pregnancy starts here */
/*ToDo: Pregnancy - remove the ` || !V.pregnancyTesting` part of the check*/
/*V.pregnancytype === "realistic" uses this function*/
const playerPregnancyAttempt = (baseMulti = 1, genital = "vagina") => {
	let pregnancy = V.sexStats[genital].pregnancy;

	if(pregnancy.fetus.length || isNaN(baseMulti) || baseMulti < 1 || !V.pregnancyTesting || V.pregnancytype !== "realistic") return false;

	let [trackedNPCs, spermArray] = spermObjectToArray(V.sexStats[genital].sperm);

	let pills = V.sexStats.pills;
	let lastPillsTaken = pills.lastTaken.pregnancy;
	let contraceptive = lastPillsTaken === "contraceptive" ? pills.pills[lastPillsTaken].doseTaken : 0;

	if(spermArray.length === 0 || (contraceptive && (random(0,100) >= 10 || contraceptive > 1))) return false;
	let fertilityBoost = 1;
	if(lastPillsTaken === "fertility booster"){
		fertilityBoost -= Math.clamp((boosterPillsTaken * 0.2), 0, 0.7);
	}
	if(V.skin.pubic.pen === "magic" && V.skin.pubic.special === "pregnancy"){
		fertilityBoost -= 0.4;
	}
	let baseChance = Math.floor((100 - V.baseVaginalPregnancyChance) * Math.clamp(fertilityBoost, 0.1, 1) * baseMulti);
	let rng = random(0, spermArray.length - 1 > baseChance ? spermArray.length - 1 : baseChance);

	if(spermArray[rng]){
		let fatherKnown = Object.keys(trackedNPCs).length === 1;

		//Player becomes pregnant
		return playerPregnancy(spermArray[rng][1], spermArray[rng][0], fatherKnown, genital, trackedNPCs);
	}
	return false;
}
DefineMacro("playerPregnancyAttempt", playerPregnancyAttempt);
window.playerPregnancyAttemptTest = (baseMulti, genital) => {if(V.pregnancyTesting) return playerPregnancyAttempt(baseMulti, genital);};//V.pregnancyTesting Check should not be removed, debugging purposes only

const playerPregnancy = (npc, npcType, fatherKnown = false, genital = "vagina", trackedNPCs, awareOf = false) => {
	let pregnancy = clone(V.sexStats[genital].pregnancy);
	let newPregnancy;
	let backupSpermType;

	switch(npcType){
		case "human":
			newPregnancy = pregnancyGenerator.human("pc", npc, fatherKnown, genital);
			backupSpermType = "human";
		break;
		case "wolf":
			newPregnancy = pregnancyGenerator.wolf("pc", npc, fatherKnown, genital);
			backupSpermType = "wolf";
		break;
		case "wolfboy": case "wolfgirl":
			newPregnancy = pregnancyGenerator.wolf("pc", npc, fatherKnown, genital, true);
			backupSpermType = "wolf";
		break;
	}
	if(newPregnancy && !(typeof newPregnancy === 'string' || newPregnancy instanceof String) && newPregnancy.fetus.length){
		V.sexStats[genital].pregnancy = {
			...pregnancy,
			...newPregnancy,
			potentialFathers: trackedNPCs || [[backupSpermType,npc]],
			waterBreakingTimer: random(0,24),
			waterBreaking: false,
			awareOf: awareOf,
		}
		V.sexStats.vagina.menstruation.currentState = "pregnant";
		return true;
	}
	return false;
}
DefineMacro("playerPregnancy", playerPregnancy);
window.playerPregnancyTest = (npc, npcType, fatherKnown, genital, trackedNPCs, awareOf) => {if(V.pregnancyTesting) return playerPregnancy(npc, npcType, fatherKnown, genital, trackedNPCs, awareOf);};//V.pregnancyTesting Check should not be removed, debugging purposes only

const pregnancyProgress = (genital = "vagina") => {
	let pregnancy = V.sexStats[genital].pregnancy;
	if(!pregnancy || pregnancy.type === null || pregnancy.type === "parasites") return null;

	if(pregnancy.timer < pregnancy.timerEnd){
		let multiplier = 1;
		switch(pregnancy.type){
			case "human": multiplier = (1/(1/9*V.humanPregnancyMonths)); break;
			case "wolf": multiplier = (1/(1/12*V.wolfPregnancyWeeks)); break;
		}
		//The `0.5 * ` is because it runs at both midnight and noon
		pregnancy.timer += parseFloat((0.5 * multiplier).toFixed(3));

		/*Keeping fatigue low should help morning sickness*/
		if(between(pregnancy.timer / pregnancy.timerEnd, 0.15, 0.25)){
			/*Early Morning sickness*/
			/*Light Nausea/dizzyness at any time of day, but mostly when waking up*/
			if(random(0,100) >= 30){
				V.pregnancyStats.morningSicknessWaking = 1;
			}
			if(random(0,100) >= 30){
				V.pregnancyStats.morningSicknessGeneral = 1;
			}
		} else if(between(pregnancy.timer / pregnancy.timerEnd, 0.24, 0.45)){
			/*Morning sickness*/
			/*Nausea/dizzyness at any time of day, but mostly when waking up*/
			/*First pregnancy should be worse*/
			V.pregnancyStats.morningSicknessWaking = [1,2,2][random(0,2)];
			if(pregnancy.totalBirthEvents === 0 && V.pregnancyStats.morningSicknessWaking < 2){
				V.pregnancyStats.morningSicknessWaking = 2;
			}
		}
		if(pregnancy.timer >= pregnancy.timerEnd){
			if(V.player.breastsize <= 4 && V.player.breastsize < V.breastsizemax){
				V.player.breastsize += 1;
				if(V.player.breastsize <= 4 && V.player.breastsize < V.breastsizemax) V.player.breastsize += 1;
				V.breastgrowthtimer = 700;
				V.breastgrowthmessage = V.player.breastsize;
				V.effectsmessage = 1;
			}
			if(V.lactating !== 1 && V.player.breastsize > 0){
				V.lactating = 1;
				V.lactation_pressure = 100;
				Wikifier.wikifyEval('<<milkvolume 50>>');
				V.effectsmessage = 1;
				V.lactationmessage = 1;
			}
		}
	}	
}
DefineMacro("pregnancyProgress",pregnancyProgress);

const playerEndWaterProgress = (genital = "vagina") => {
	let pregnancy = V.sexStats[genital].pregnancy;
	if(!pregnancy || pregnancy.type === null || pregnancy.type === "parasites" || pregnancy.timer < pregnancy.timerEnd) return null;

	if(!isNaN(pregnancy.waterBreakingTimer) && pregnancy.waterBreakingTimer > 0){
		pregnancy.waterBreakingTimer--;
		if(pregnancy.waterBreakingTimer <= 0){
			pregnancy.waterBreaking = true;
			return true;
		}
		return false;
	}
}
DefineMacro("playerEndWaterProgress", playerEndWaterProgress);

//Used only when the player is about to give birth to their children and the player can name them
const playerEndWaterBreaking = () => {
	V.sexStats.vagina.pregnancy.waterBreaking = null;
	V.sexStats.vagina.pregnancy.waterBreakingTimer = null;
	V.sexStats.anus.pregnancy.waterBreaking = null;
	V.sexStats.anus.pregnancy.waterBreakingTimer = null;
}
DefineMacro("playerEndWaterBreaking", playerEndWaterBreaking);

const endPlayerPregnancy = (birthLocation, location) => {
	let type;
	if(V.player.vaginaExist){
		type = "vagina";
	}else{
		type = "anus";
	}
	let pregnancy = V.sexStats[type].pregnancy;
	let menstruation = V.sexStats.vagina.menstruation;

	if(!pregnancy || !pregnancy.fetus.length) return false;

	giveBirthToChildren("pc", birthLocation, location);

	if(pregnancy.potentialFathers.filter(npc => npc[0] === pregnancy.type).length >= 5) Wikifier.wikifyEval('<<earnFeat "Bicycle Mother">>');

	switch(pregnancy.type){
		case "human":
			V.pregnancyStats.humanToysUnlocked = true;
			menstruation.recoveryTime = random(2,3) * V.humanPregnancyMonths;
			if(pregnancy.fetus.length === 3) Wikifier.wikifyEval('<<earnFeat "Life Comes in Threes">>');
		break;
		case "wolf":
			V.pregnancyStats.wolfToysUnlocked = true;
			menstruation.recoveryTime = random(1,2) * V.wolfPregnancyWeeks;
		break;
	}

	if((V.player.virginity.anal === true && !V.player.vaginaExist) || (V.player.virginity.vaginal === true && V.player.vaginaExist)) Wikifier.wikifyEval('<<earnFeat "Miracle of Life">>');
	if(!V.player.vaginaExist) Wikifier.wikifyEval('<<earnFeat "Life begins when you least expect">>');

	V.sexStats[type].pregnancy = {
		...pregnancy,
		totalBirthEvents: (pregnancy.totalBirthEvents || 0) + 1,
		fetus: [],
		waterBreaking: false,
		waterBreakingTimer: null,
		type: null,
		bellySize: 0,
		timer: null,
		timerEnd: null,
		awareOf: null,
		awareOfDetails: null,
		potentialFathers: [],
	}

	V.sexStats.vagina.menstruation = {
		...menstruation,
		currentState: "recovering",
		recoveryTimeStart: menstruation.recoveryTime,
		recoveryStage: 0,
		periodEnabled: false,
		awareOfPeriodDelay: false,
	}
	return true;
}
DefineMacro("endPlayerPregnancy", endPlayerPregnancy);
window.endPlayerPregnancyTest = (birthLocation, location) => {if(V.pregnancyTesting && birthLocation && location) return endPlayerPregnancy(birthLocation, location);};//V.pregnancyTesting Check should not be removed, debugging purposes only
/*Player pregnancy ends here */

/*Named NPC pregnancy starts here*/
/*ToDo: NPC Pregnancy - run in time.twee, should only run once per day, update where required*/
const npcPregnancyCycle = () => {
	for(const npcName in V.NPCNameList){
		let npc = C.npc[npcName];
		let pregnancy = npc.pregnancy;
		if(!pregnancy || pregnancy.enabled === undefined) return false;

		if(pregnancy.fetus.length){
			let multiplier = 1;
			switch(pregnancy.type){
				case "human": multiplier = (1/(1/9*V.humanPregnancyMonths)); break;
				case "wolf": multiplier = (1/(1/12*V.wolfPregnancyWeeks)); break;
			}
			pregnancy.timer += parseFloat(multiplier.toFixed(3));
			if(pregnancy.timer > pregnancy.timerEnd * 0.2 && !pregnancy.npcAwareOf){
				pregnancy.npcAwareOf = true;
			}
			if(pregnancy.timer > pregnancy.timerEnd){
				if(pregnancy.timer >= pregnancy.timerEnd + (14 * multiplier)){
					/*ToDo: NPC Pregnancy*/
					/*Player has not seen the npc recently, sort out the pregnancy in another way*/
				} else {
					/*Can deal with the npc in the next event*/
					pregnancy.waterBreaking = true;
				}
			}
		} else if(pregnancy.enabled && V.npcPregnancyDisable === "f") {
			if(V.cycledisable === "f"){
				pregnancy.cycleDay++;
				if(pregnancy.cycleDay >= pregnancy.cycleDaysTotal){
					pregnancy.cycleDay = 1;
				} else if(between(pregnancy.cycleDay, pregnancy.cycleDangerousDay - 1, pregnancy.cycleDangerousDay + 1)){
					namedNpcPregnancyAttempt(npcName);
				}
			}else{
				pregnancy.nonCycleRng.push(random(0,4));
				pregnancy.nonCycleRng.deleteAt(0);
			}
		}
		updateRecordedSperm("vagina", npcName, 1);
	} 
}
DefineMacro("npcPregnancyCycle", npcPregnancyCycle);

/*V.pregnancytype === "realistic" uses this function*/
const namedNpcPregnancyAttempt = (npcName) => {
	if(!C.npc[npcName] || C.npc[npcName].vagina === "none" || V.pregnancytype !== "realistic") return false;
	
	let namedNpc = C.npc[npcName];
	let pregnancy = namedNpc.pregnancy;
	if(pregnancy || !pregnancy.enabled || pregnancy.fetus.length){
		//Pregnancy not supported or disabled by the player, or when they are already pregnant
		return false;
	}
	let [trackedNPCs, spermArray] = spermObjectToArray(pregnancy.sperm);

	let fertility = pregnancy.pills === "fertility" ? 0.8 : 1;
	let contraceptive = pregnancy.pills === "contraceptive";

	let baseChance = Math.floor((20 - V.baseNpcPregnancyChance) * fertility);
	let rng = random(0,(spermArray.length > baseChance ? spermArray.length : baseChance))
	if(contraceptive && random(0,100) >= 10){
		/*NPC doesn't get pregnant due to contraceptive*/
	} else if(spermArray[rng]){
		let fatherKnown = Object.keys(trackedNPCs).length === 1;

		/*NPC gets pregnant*/
		return namedNpcPregnancy(npcName, spermArray[rng][1], spermArray[rng][0], fatherKnown, trackedNPCs);
	}
	return false;
}

const namedNpcPregnancy = (mother, father, fatherSpecies, fatherKnown = false, trackedNPCs, awareOf = false) => {
	let namedNpc = C.npc[mother];
	let namedNpcType;
	switch(mother){
		case "Black Wolf":
			if((V.monsterchance > random(0,100) && (V.hallucinations >= 1 || V.monsterhallucinations === "f")) || (V.blackwolfmonster === 2)){
				namedNpcType = "wolfgirl";
			}else{
				namedNpcType = namedNpc.type;
			}
		break;
		default: namedNpcType = namedNpc.type; break;
	}
	let newPregnancy;
	let backupSpermType;
	switch(fatherSpecies + namedNpcType){
		case "humanhuman":
			newPregnancy = pregnancyGenerator.human(mother, father, fatherKnown, "vagina");
			backupSpermType = "human";
		break;
		case "wolfhuman": case "humanwolf": case "wolfwolf":
			newPregnancy = pregnancyGenerator.wolf(mother, father, fatherKnown, "vagina");
			backupSpermType = "wolf";
		break;
		case "humanwolfboy": case "wolfboyhuman": case "wolfwolfboy": case "wolfboywolf": case "wolfboywolfboy": case "humanwolfgirl": case "wolfgirlhuman": case "wolfwolfgirl": case "wolfgirlwolf": case "girlwolfgirlwolf":
			newPregnancy = pregnancyGenerator.wolf(mother, father, fatherKnown, "vagina", true);
			backupSpermType = "wolf";
		break;
	}
	if(newPregnancy && !(typeof newPregnancy === 'string' || newPregnancy instanceof String) && newPregnancy.fetus.length){
		namedNpc.pregnancy = {
			...namedNpc.pregnancy,
			...newPregnancy,
			potentialFathers: trackedNPCs || [[backupSpermType,father]],
			npcAwareOf: false,
			pcAwareOf: awareOf,
		}
		return true;
	}
	return false;
}
DefineMacro("namedNpcPregnancy", namedNpcPregnancy);
window.namedNpcPregnancyTest = (mother, father, pregnancyType, fatherKnown, trackedNPCs, awareOf) => {if(V.pregnancyTesting) return namedNpcPregnancy(mother, father, pregnancyType, fatherKnown, trackedNPCs, awareOf);};//V.pregnancyTesting Check should not be removed, debugging purposes only

const endNPCPregnancy = (npcName, birthLocation, location) => {
	if(!C.npc[npcName] || C.npc[npcName].vagina === "none" || C.npc[npcName].pregnancy.enabled === undefined){
		return false;
	}
	let pregnancy = C.npc[npcName].pregnancy;

	if(!pregnancy || pregnancy.enabled === undefined || !pregnancy.fetus.length) return false;

	giveBirthToChildren(npcName, birthLocation, location);
	switch(pregnancy.type){
		case "human":
			V.pregnancyStats.humanToysUnlocked = true;
			menstruation.recoveryTime = random(2,3) * V.humanPregnancyMonths;
		break;
		case "wolf":
			V.pregnancyStats.wolfToysUnlocked = true;
			menstruation.recoveryTime = random(1,2) * V.wolfPregnancyWeeks;
		break;
	}
	let birthEvents = clone(pregnancy.totalBirthEvents) + 1;
	let cycleDay = clone(pregnancy.cycleDaysTotal) - 3;

	V.NPCName[V.NPCNameList.indexOf(npcName)].pregnancy = {
		...pregnancy,
		fetus: [],
		bellySize: 0,
		birthEvents: birthEvents,
		timer: null,
		timerEnd: null,
		waterBreaking: false,
		npcAwareOf: null,
		pcAwareOf: null,
		type: null,
		potentialFathers: [],
		cycleDay: cycleDay,
	}

	V.pregnancyStats.npcTotalBirthEvents++;
	return true;
}
DefineMacro("endNPCPregnancy", endNPCPregnancy);
window.endNPCPregnancyTest = (npcName, birthLocation, location) => {if(V.pregnancyTesting && npcName && birthLocation && location) return endNPCPregnancy(npcName, birthLocation, location);};//V.pregnancyTesting Check should not be removed, debugging purposes only
/*Named NPC pregnancy ends here*/

const giveBirthToChildren = (mother, birthLocation, location) => {
	let pregnancy;
	if(mother === "pc"){
		if(V.player.vaginaExist){
			pregnancy = V.sexStats.vagina.pregnancy;
		}else{
			pregnancy = V.sexStats.anus.pregnancy;
		}
	} else if(C.npc[mother]) {
		pregnancy = C.npc[mother].pregnancy;
	}
	if(!pregnancy || !pregnancy.fetus.length) return false;

	let birthId = (mother + String(totalBirthEvents(mother) + 1).padStart(3,"0")).replace(' ','');

	pregnancy.fetus.forEach(childObject => {
		pregnancy.givenBirth++;
		let childId = (mother + String(totalBorn(mother)).padStart(4,"0")).replace(' ','');
		V.children[childId] = {
			...childObject,
			name: generateBabyName(childObject.name, childObject.gender),
			born: {day: clone(V.monthday), month: clone(V.month.toUpperFirst()), year: clone(V.year)},
			birthId: birthId,
			childId: childId,
			location: location,
			birthLocation: birthLocation,
		}
		if(childObject.mother === "pc"){
			V.pregnancyStats.playerChildren++;
			switch(childObject.type){
				case "human": V.pregnancyStats.humanChildren++; break;
				case "wolf": V.pregnancyStats.wolfChildren++; break;
			}
		} else if(childObject.father === "pc"){
			V.pregnancyStats.npcChildren++;
		} else {
			V.pregnancyStats.npcChildrenUnrelatedToPlayer++;
		}
	})
	return true;
}

const totalBirthEvents = (mother) => {
	if(mother === "pc") return V.sexStats.vagina.pregnancy.totalBirthEvents + V.sexStats.anus.pregnancy.totalBirthEvents;
	if(C.npc(mother) && C.npc(mother).pregnancy) return C.npc(mother).pregnancy.totalBirthEvents || 0
}

const totalBorn = (mother) => {
	if(mother === "pc") return (V.sexStats.vagina.pregnancy.givenBirth + V.sexStats.anus.pregnancy.givenBirth) || 0;
	if(C.npc(mother) && C.npc(mother).pregnancy) return C.npc(mother).pregnancy.givenBirth || 0;
	return 0;
}

const recordSperm = ({genital = "vagina", target = null, spermOwner = null, spermType = null, daysTillRemovalOverride = null, rngModifier = 100, rngType, quantity}) => {
	//ToDo: Pregnancy - remove the `V.pregnancyTesting` check
	if(!V.pregnancyTesting) return null;
	if(!target || !spermOwner || !spermType || !["anus","vagina"].includes(genital)) return null;

	if(V.pregnancytype === "fetish"){
		//Sperm on the outside should not be able to get the player pregnant
		if(rngType === "canWash") return null;
		return fetishPregnancy({genital, target, spermOwner, spermType, rngModifier, quantity});
	}

	let sperm;
	if(target === "pc") {
		sperm = V.sexStats[genital].sperm;
	}else if(C.npc[target] && C.npc[target].pregnancy && C.npc[target].pregnancy.enabled){
		sperm = C.npc[target].pregnancy.sperm;
	}
	if(sperm){
		if(sperm[spermOwner] === undefined){
			sperm[spermOwner] = {type:spermType, count:[]};
		}
		let daysTillRemoval = daysTillRemovalOverride || random(4,8);

		//Normal sperm should only last a day
		if(V.cycledisable === "t") daysTillRemoval = Math.ceil(daysTillRemoval / 8);

		rngModifier = !isNaN(rngModifier) ? rngModifier : 100;

		if(spermOwner === "pc"){
			let pills = V.sexStats.pills;
			let lastPillsTaken = pills.lastTaken.pregnancy;
			switch(lastPillsTaken){
				case "fertility booster": rngModifier += ((pills.pills[lastPillsTaken].doseTaken || 0) * 25); break;
				case "contraceptive": rngModifier -= ((pills.pills[lastPillsTaken].doseTaken || 0) * 50); break;
			}
		}else if(C.npc[spermOwner] && C.npc[spermOwner].pregnancy){
			switch(C.npc[spermOwner].pregnancy.pills){
				case "fertility": rngModifier += 25; break;
				case "contraceptive": rngModifier -= 50; break;
			}
		}
		rngModifier = Math.clamp(rngModifier,0,200);
		if(rngModifier === 0) return false;

		//The  number in `1 + rngType`, the number should match the number of times `updatePlayerRecordedSperm` should not delete the `canWash` tag
		switch(rngType){
			case "canWash": rngType = 1 + rngType; break;
			default: break;
		}

		let spermFound = sperm[spermOwner].count.find(s => s[0] === daysTillRemoval && s[2] === rngModifier && s[3] === rngType);
		if(spermFound){
			spermFound[1] += quantity || 1;
			return true;
		}else{
			sperm[spermOwner].count.push([daysTillRemoval, quantity || 1]);
			if(!isNaN(rngModifier)){
				sperm[spermOwner].count.last().push(rngModifier);
				if(rngType) sperm[spermOwner].count.last().push(rngType);
			}
			return true;
		}
	}
	return false;
}
DefineMacro("recordSperm",recordSperm);
DefineMacro("recordVaginalSperm", (target, spermOwner, spermType,daysTillRemovalOverride) => recordSperm({target:target, spermOwner:spermOwner, spermType:spermType, daysTillRemovalOverride:daysTillRemovalOverride}));
DefineMacro("recordAnusSperm", (target, spermOwner, spermType,daysTillRemovalOverride) => recordSperm({genital:"anus", target:target, spermOwner:spermOwner, spermType:spermType, daysTillRemovalOverride:daysTillRemovalOverride}));

//Period is `1 divided how many timers per day the function is run`
const updateRecordedSperm = (genital, target, period = 1) => {
	//ToDo: Pregnancy - remove the `V.pregnancyTesting` check
	if(!V.pregnancyTesting) return null;

	let sperm;
	if(genital !== "vagina" && target !== "pc") return null;
	if(target === "pc") {
		sperm = V.sexStats[genital].sperm;
	}else if(C.npc[target] && C.npc[target].pregnancy && C.npc[target].enabled){
		sperm = C.npc[target].sperm;
	}
	if(sperm){
		Object.values(sperm).forEach(s => {
			s.count.forEach(count => {
				count[0] -= period;
				if(count[3] && count[3].includes("canWash") && !isNaN(parseInt(count[3]))){
					let canWashCount = parseInt(count[3]);
					canWashCount--;
					if(canWashCount >= 0){
						count[3] = canWashCount + "canWash";
					}else{
						count[3] = 0;
					}
				}
			});
			//Delete sperm that has passed it's lifespan
			s.count = s.count.filter(count => count[0] > 0);
		})
	}
}
DefineMacro("updateRecordedSperm",updateRecordedSperm);

const washRecordedSperm = (genital, target) => {
	let sperm;
	if(genital !== "vagina" && target !== "pc") return null;
	if(target === "pc") {
		sperm = V.sexStats[genital].sperm;
	}else if(C.npc[target] && C.npc[target].pregnancy && C.npc[target].enabled){
		sperm = C.npc[target].sperm;
	}
	if(sperm){
		Object.values(sperm).forEach(s => {
			//Delete sperm thats been washed in time
			s.count = s.count.filter(count => !count[3].includes("canWash"));
		});
	}
}
DefineMacro("washRecordedSperm",washRecordedSperm);


window.playerCanBreedWith = (npc) => {
	/* This function can accept either a named NPC's name, or an NPC object from either NPCList or NPCName.
	 * Examples: playerCanBreedWith("Kylar"), or playerCanBreedWith($NPCList[0]) or playerCanBreedWith($NPCName[$NPCNameList.indexOf("Kylar")])
	 * Returns true or false. If you give it garbage, like a totally wrong name, it'll return false, so be careful about silent failures like that.
	 * Should be used for NPC breeding lines ONLY.
	 */
	if (typeof npc === "string") npc = V.NPCName[V.NPCNameList.indexOf(npc)];

	return (V.player.vaginaExist && npc.penis !== "none") || (V.player.penisExist && npc.vagina !== "none");
}

window.pregnancyCompatible = (NPC) => {
	if (playerPregnancyPossibleWith(NPC) === false || NPCPregnancyPossibleWithPlayer(NPC) === false) return false;
	return true;
}

window.playerPregnancyPossibleWith = (NPC) => {
	/* Like the above function, this will accept either a named NPC's name, or an NPC object from either NPCList or NPCName.
	* This one checks if the player could become pregnant, rather than the NPC.
	* Returns true or false, as well as sets T.pregFalseReason, so writers can make events around the specific reason why a player and NPC might not be compatible for pregnancy at any given time.
	*/
	T.pregFalseReason = "";
	let NPCObject;
	if (typeof NPC === "string" || V.NPCNameList.includes(NPC.fullDescription)) {
		// Check if this is a named NPC, whether the function is provided a string or NPCList object that belongs to a named NPC
		NPCObject = V.NPCName[V.NPCNameList.indexOf(typeof NPC === "string" ? NPC : NPC.fullDescription)];
		const NPCNameCheck = NPCObject.fullDescription;
		if (!C.npc[NPCNameCheck]) {
			Errors.report(
				"Named NPC " + NPCNameCheck + " is undefined for pregnancy compatibility check."
			); return false;
		}
		if (!NPCObject.pregnancy.enabled) {
			T.pregFalseReason = "infertile";
			return false; // Check for named NPC being "infertile"
			//"this check is placed here because it only applies to named NPCs" - hwp told me to put this here
		}
	}
	if(!NPCObject) {
		if(typeof NPC === 'object' && !Array.isArray(NPC) && NPC !== null){
			NPCObject = NPC;
		} else {
			T.pregFalseReason = "invalidNpc";
			return false; // Check if the npc is valid
		}
	}
	if (V.sexStats.vagina.pregnancy.fetus.length) {
		T.pregFalseReason = "playerPregnant";
		return false; // Check if player is already pregnant
	}
	switch (NPCObject.type) {
		case "human" :
			if (V.playerPregnancyHumanDisable === "t") {
				T.pregFalseReason = "pregnantDisabled";
				return false;
			} else break; // Check Human and Beast pregnancy settings
		case "wolf": case "bird":
			if (V.playerPregnancyBeastDisable === "t") {
				T.pregFalseReason = "pregnantDisabled";
				return false;
			} else break;
			// Check if NPC species can impregnate the player yet	
		default: T.pregFalseReason = "pregnantTypeUnsupported"; return false;
	}
	if (!V.player.vaginaExist || NPCObject.gender === "f"){
		T.pregFalseReason = "genitals";
		return false; // Check for genital compatibility for player pregnancy
	} 
	return true;
}

window.NPCPregnancyPossibleWithPlayer = (NPC) => {
	/* Like the above function, this will accept either a named NPC's name, or an NPC object from either NPCList or NPCName.
	* This one checks if the NPC could become pregnant, rather than the player.
	* Returns true or false, as well as sets T.pregFalseReason, so writers can make events around the specific reason why a player and NPC might not be compatible for pregnancy at any given time.
	*/
	T.pregFalseReason = "";
	let NPCObject;
	if (typeof NPC === "string" || V.NPCNameList.includes(NPC.fullDescription)) {
		// Check if this is a named NPC, whether the function is provided a string or NPCList object that belongs to a named NPC
		NPCObject = V.NPCName[V.NPCNameList.indexOf(typeof NPC === "string" ? NPC : NPC.fullDescription)];
		const NPCNameCheck = NPCObject.fullDescription;
		if (!C.npc[NPCNameCheck]) {
			Errors.report(
				"Named NPC " + NPCNameCheck + " is undefined for pregnancy compatibility check."
			); return false;
		}
		if (!NPCObject.pregnancy.enabled) {
			T.pregFalseReason = "infertile";
			return false; // Check for named NPC being "infertile"
			//"this check is placed here because it only applies to named NPCs" - hwp told me to put this here too
		}
		if (NPCObject.pregnancy.fetus.length) {
			T.pregFalseReason = "npcPregnant";
			return false; // Check if named NPC is already pregnant
		}
	} else {
		NPCObject = NPC;
		if (NPCObject.pregnancy) {
			T.pregFalseReason = "npcPregnant";
			return false; // Check if random NPC is already pregnant
		}
	}
	if (V.npcPregnancyDisable === "t") {
		T.pregFalseReason = "pregnantDisabled";
		return false; // Check if NPC pregnancy is enabled or possible in settings
	}
	if (!["human","wolf"].includes(NPCObject.type)){
		T.pregFalseReason = "pregnantTypeUnsupported";
		return false; // Check if NPC species can get impregnated by the player yet		
	}
	if (!V.player.penisExist || NPCObject.gender === "m") {
		T.pregFalseReason = "genitals";
		return false; // Check for genital compatibility for NPC pregnancy
	} 
	return true;
}
window.NPCPregnancyPossibleWithPlayer = NPCPregnancyPossibleWithPlayer;

window.wearingCondom = (npcNumber) => {
    let condom;
    if(!isNaN(npcNumber) && V.NPCList[npcNumber] && V.NPCList[npcNumber].condom){
        condom = V.NPCList[npcNumber].condom;
    }else if(npcNumber === "player"){
        condom = V.player.condom;
    }
    if(condom && condom.worn){
        if(condom.state === "damaged") return "damaged";
        return "worn";
    }
    return false;
}
