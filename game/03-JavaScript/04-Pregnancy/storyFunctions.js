
//Determins how used to being pregnant the player is
window.playerNormalPregnancyTotal = () => {
	let result = Math.clamp(V.sexStats.vagina.pregnancy.totalBirthEvents + V.sexStats.anus.pregnancy.totalBirthEvents, 0, 8);
	if(!isNaN(result)) return result;
	return 0;
};

//`pregnancyOnly` is there intentially, please make use of it if you add to this function
window.playerBellySize = (pregnancyOnly = false) => {
	if(!V.pregnancyTesting) return 0;//ToDo: Pregnancy, remove line
	let bellySize = 0;
	let vpregnancy = V.sexStats.vagina.pregnancy;
	let apregnancy = V.sexStats.anus.pregnancy;
	if(vpregnancy.fetus.length || apregnancy.fetus.length){
		let pregnancyProgress = 0;
		if(vpregnancy.timerEnd) pregnancyProgress = Math.clamp(vpregnancy.timer / vpregnancy.timerEnd, 0, 1);
		if(apregnancy.timerEnd) pregnancyProgress = Math.clamp(apregnancy.timer / apregnancy.timerEnd, 0, 1);
		let maxSize = 0;
		switch(vpregnancy.type){
			case "parasite":
				if(!pregnancyOnly) bellySize += Math.clamp(vpregnancy.fetus.length,0,4);
			break;
			case "human":
				maxSize += 21 + Math.clamp(vpregnancy.fetus.length,1,3);
			break;
			//For human offspring, max sizes are 22 for single fetus, 23 for twins, and 24 for triplets.
			case "wolf":
				maxSize += 20 + Math.clamp(vpregnancy.fetus.length / 2,1,4);
			break;
		}
		switch(apregnancy.type){
			case "parasite":
				if(!pregnancyOnly) bellySize += Math.clamp(apregnancy.fetus.length,0,4);
			break;
			case "human":
				maxSize += 21 + Math.clamp(apregnancy.fetus.length,1,3);
			break;
			case "wolf":
				maxSize += 20 + Math.clamp(apregnancy.fetus.length / 2,1,4);
			break;
		}
		bellySize += pregnancyProgress * Math.clamp(maxSize,0,24);
	}
	return Math.floor(Math.clamp(bellySize,0,24));
}

window.pregnancyBellyVisible = (pregnancyOnly = false) => {
	const size = playerBellySize(pregnancyOnly);
	if (size <= 7) return false;
	if (size <= 11 && V.worn.upper.name !== "naked" && !V.worn.upper.type.includes("bellyShow")) return false;
	if (size <= 17 && V.worn.upper.type.includes("bellyHide")) return false;

	return true;
}

window.npcBellySize = (npc) => {
	let bellySize = 0;
	if(C.npc(npc) && C.npc(npc).pregnancy && C.npc(npc).pregnancy.enabled){
		let pregnancy = C.npc(npc).pregnancy;
		let pregnancyProgress = 0;
		if(pregnancy.timerEnd) pregnancyProgress = Math.clamp(vpregnancy.timer / vpregnancy.timerEnd, 0, 1);
		let maxSize = 0;
		switch(pregnancy.type){
			case "human":
				maxSize += 18 + Math.clamp(vpregnancy.fetus.length,1,3);
			break;
			case "wolf":
				maxSize += 16 + Math.clamp(vpregnancy.fetus.length / 2,1,4);
			break;
		}
		bellySize += pregnancyProgress * Math.clamp(maxSize,0,20);
	}

	return Math.floor(Math.clamp(bellySize,0,20));
}

window.npcPregnancyBellyVisible = (npc) => {
	const size = npcBellySize(npc);
	if (size <= 7) return false;

	return true;
}

window.npcIsPregnant = (npc) => C.npc[npc] && C.npc[npc].pregnancy && C.npc[npc].pregnancy.enabled && C.npc[npc].pregnancy.type && C.npc[npc].pregnancy.type !== "parasite";

window.playerIsPregnant = () => (V.sexStats.vagina.pregnancy.type !== null && V.sexStats.vagina.pregnancy.type !== "parasite") || (V.sexStats.anus.pregnancy.type !== null && V.sexStats.anus.pregnancy.type !== "parasite");

window.isPlayerNonparasitePregnancyEnding = () => {
	return V.sexStats.vagina.pregnancy.waterBreaking || V.sexStats.anus.pregnancy.waterBreaking || false;
}

window.playerNormalPregnancyType = () => {
	if(V.player.vaginaExist && V.sexStats.vagina.pregnancy.type !== "parasite"){
		return V.sexStats.vagina.pregnancy.type;
	}else if(V.sexStats.anus.pregnancy.type !== "parasite"){
		return V.sexStats.anus.pregnancy.type;
	}
	return null;
}

window.wakingPregnancyEvent = () => {
	let pregnancy;
	if(V.player.vaginaExist){
		pregnancy = V.sexStats.vagina.pregnancy;
	}else{
		pregnancy = V.sexStats.anus.pregnancy;
	}
	const rng = random(0,100);
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let wakingEffects;

	if(playerBellySize(true) >= 8 && !pregnancy.awareOf){
		return "bellySize";
	} else if(playerBellySize() >= 9 && V.worn.genitals.type.includes("hidden")){
		return "chastityBeltRemoval";
	} else if(V.cycledisable === "f" && !menstruation.awareOfPeriodDelay && V.awareness >= 100 && V.sciencetrait >= 3 && !pregnancy.awareOf && pregnancyStage !== false && between(pregnancy.timer - (menstruation.currentDaysMax - menstruation.currentDay), 4, 8)){
		return "missedPeriod";
	} else if(between(pregnancyStage, 0.9, 1)){
		wakingEffects = "nearBirthEvent";
	} else if(between(pregnancyStage, 0.7, 0.9)){
		wakingEffects = "nearBirth";
	} else if(between(pregnancyStage, 0.4, 0.7) && rng > 50){
		wakingEffects = "midPregnancy";
	} else if(V.pregnancyStats.morningSicknessWaking >= 2){
		wakingEffects = "morningSicknessOnly";
		V.pregnancyStats.morningSicknessWaking = 0;
	} else if(V.pregnancyStats.morningSicknessWaking >= 1 && rng >= 50){
		wakingEffects = "morningSicknessPills";
		V.pregnancyStats.morningSicknessWaking = 0;
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 2 && rng >= 50){
		wakingEffects = "morningSicknessPills";
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 1 && rng >= 75){
		wakingEffects = "mildIssues";
	}

	switch(wakingEffects){
		case "mildIssues": return ["nothing","nothing","lightHeaded","lightHeaded","dizzy","dizzy","dizzy","mildNausea"];
		case "morningSicknessPills": return ["lightHeaded","dizzy","dizzy","dizzy","mildNausea","mildNausea","mildNausea","nausea","headache"];
		case "morningSicknessOnly": return ["lightHeaded","dizzy","sensitiveBreasts","mildNausea","headache","nausea","nausea","nausea","nausea","dryheaving","dryheaving","dryheaving"];
		case "midPregnancy":
			let wakingEffect = ["tired"];
			if(V.submissive >= 1000){
				wakingEffect.push("crying");
			} else {
				wakingEffect.push("angry");
			}
			switch(pregnancy.type){
				case "wolf": wakingEffect.push("meatCraving"); break;
				default: wakingEffect.push("foodCraving"); break;
			}
			return wakingEffect;
		case "nearBirth": return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup"];
		case "nearBirthEvent": return ["lightBabyKick","babyKick","babyMovement","babyHiccup","earlyContractions","earlyContractions"];
	}
	return false;
}

window.dailyPregnancyEvent = () => {
	let pregnancy;
	if(V.player.vaginaExist){
		pregnancy = V.sexStats.vagina.pregnancy;
	}else{
		pregnancy = V.sexStats.anus.pregnancy;
	}
	const rng = random(0,100) + (V.daily.pregnancyEvent || 0);
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let dailyEffects;

	if((between(pregnancyStage, 0.9, 0.95) && rng > 80) || (between(pregnancyStage, 0.95, 1) && rng >= 75)){
		dailyEffects = "nearBirthEvent";
	} else if((between(pregnancyStage, 0.7, 0.8) && rng > 85) || (between(pregnancyStage, 0.8, 0.9) && rng >= 80)){
		dailyEffects = "nearBirth";
	} else if((between(pregnancyStage, 0.4, 0.5) && rng > 90) || (between(pregnancyStage, 0.5, 0.7) && rng >= 85)){
		dailyEffects = "midPregnancy";
	} else if(V.pregnancyStats.morningSicknessGeneral >= 2 && rng >= 85){
		dailyEffects = "morningSicknessOnly";
		V.pregnancyStats.morningSicknessGeneral--;
	} else if(V.pregnancyStats.morningSicknessGeneral >= 1 && rng >= 90){
		dailyEffects = "morningSicknessPills";
		V.pregnancyStats.morningSicknessGeneral--;
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 2 && rng >= 90){
		dailyEffects = "morningSicknessPills";
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 1 && rng >= 95){
		dailyEffects = "mildIssues";
	} else if(V.cycledisable === "f" && menstruation.currentState === "normal" && (menstruation.currentDay < 3 || menstruation.currentDay >= menstruation.currentDaysMax - 1 && rng >= 80)){
		dailyEffects = "periodIssues";
	}

	switch(dailyEffects){
		case "periodIssues": return ["nothing","cramping","bloated","lightHeaded","mildNausea","nausea"];
		case "mildIssues": return ["nothing","lightHeaded","lightHeaded","dizzy","dizzy","dizzy","dizzy","mildNausea"];
		case "morningSicknessPills": return ["lightHeaded","dizzy","dizzy","dizzy","mildNausea","mildNausea","mildNausea","nausea","headache"];
		case "morningSicknessOnly": return ["lightHeaded","dizzy","sensitiveBreasts","mildNausea","headache","nausea","nausea","nausea","nausea","dryheaving","dryheaving","dryheaving"];
		case "midPregnancy":
			let dailyEffect = ["tired"];
			if(V.submissive >= 1000){
				dailyEffect.push("crying");
			} else {
				dailyEffect.push("angry");
			}
			switch(pregnancy.type){
				case "wolf": dailyEffect.push("meatCraving"); break;
				default: dailyEffect.push("foodCraving"); break;
			}
			return dailyEffect;
		case "nearBirth": return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup"];
		case "nearBirthEvent": return ["lightBabyKick","babyKick","babyMovement","babyHiccup","earlyContractions","earlyContractions"];
	}
	return false;
}

window.pregnancyNameCorrection = (name) => {
	switch(name){
		case "Black Wolf": case "Great Hawk": case "Ivory Wraith":
			name = "the " + name;
		break;
	}
	return name;
}
