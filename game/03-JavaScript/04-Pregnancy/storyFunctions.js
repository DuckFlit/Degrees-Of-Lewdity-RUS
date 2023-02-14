/* eslint-disable no-undef */

// Determins how used to being pregnant the player is
function playerNormalPregnancyTotal() {
	const result = Math.clamp(V.sexStats.vagina.pregnancy.totalBirthEvents + V.sexStats.anus.pregnancy.totalBirthEvents, 0, 50);
	if (!isNaN(result)) return result;
	return 0;
}
window.playerNormalPregnancyTotal = playerNormalPregnancyTotal;

// `pregnancyOnly` is there intentially, please make use of it if you add to this function
function playerBellySize(pregnancyOnly = false) {
	if (!V.pregnancyTesting) return 0; // ToDo: Pregnancy, remove line
	let bellySize = 0;
	const vpregnancy = V.sexStats.vagina.pregnancy;
	const apregnancy = V.sexStats.anus.pregnancy;
	if (vpregnancy.fetus.length || apregnancy.fetus.length) {
		let pregnancyProgress = 0;
		if (vpregnancy.timerEnd) pregnancyProgress = Math.clamp(vpregnancy.timer / vpregnancy.timerEnd, 0, 1);
		if (apregnancy.timerEnd) pregnancyProgress = Math.clamp(apregnancy.timer / apregnancy.timerEnd, 0, 1);
		let maxSize = 0;
		switch (vpregnancy.type) {
			case "parasite":
				if (!pregnancyOnly) bellySize += Math.clamp(vpregnancy.fetus.length, 0, 4);
				break;
			case "human":
				if (!vpregnancy.gaveBirth) maxSize += 21 + Math.clamp(vpregnancy.fetus.length, 1, 3);
				break;
			// For human offspring, max sizes are 22 for single fetus, 23 for twins, and 24 for triplets.
			case "wolf":
				if (!vpregnancy.gaveBirth) maxSize += 20 + Math.clamp(vpregnancy.fetus.length / 2, 1, 4);
				break;
		}
		switch (apregnancy.type) {
			case "parasite":
				if (!pregnancyOnly) bellySize += Math.clamp(apregnancy.fetus.length, 0, 4);
				break;
			case "human":
				if (!apregnancy.gaveBirth) maxSize += 21 + Math.clamp(apregnancy.fetus.length, 1, 3);
				break;
			case "wolf":
				if (!apregnancy.gaveBirth) maxSize += 20 + Math.clamp(apregnancy.fetus.length / 2, 1, 4);
				break;
		}
		bellySize += pregnancyProgress * Math.clamp(maxSize, 0, 24);
	}
	return Math.floor(Math.clamp(bellySize, 0, 24));
}
window.playerBellySize = playerBellySize;

function pregnancyBellyVisible(pregnancyOnly = false) {
	const size = playerBellySize(pregnancyOnly);
	if (size <= 7) return false;
	if (size <= 11 && V.worn.upper.name !== "naked" && !V.worn.upper.type.includes("bellyShow")) return false;
	if (size <= 17 && V.worn.upper.type.includes("bellyHide")) return false;

	return true;
}
window.pregnancyBellyVisible = pregnancyBellyVisible;

function npcBellySize(npc) {
	let bellySize = 0;
	if (C.npc(npc) && C.npc(npc).pregnancy && C.npc(npc).pregnancy.enabled === undefined) {
		const pregnancy = C.npc(npc).pregnancy;
		let pregnancyProgress = 0;
		if (pregnancy.timerEnd) pregnancyProgress = Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1);
		let maxSize = 0;
		switch (pregnancy.type) {
			case "human":
				maxSize += 18 + Math.clamp(pregnancy.fetus.length, 1, 3);
				break;
			case "wolf":
				maxSize += 16 + Math.clamp(pregnancy.fetus.length / 2, 1, 4);
				break;
		}
		bellySize += pregnancyProgress * Math.clamp(maxSize, 0, 20);
	}

	return Math.floor(Math.clamp(bellySize, 0, 20));
}
window.npcBellySize = npcBellySize;

function npcPregnancyBellyVisible(npc) {
	const size = npcBellySize(npc);
	if (size <= 7) return false;

	return true;
}
window.npcPregnancyBellyVisible = npcPregnancyBellyVisible;

function npcIsPregnant(npc) {
	return (
		C.npc[npc] &&
		C.npc[npc].pregnancy &&
		C.npc[npc].pregnancy.enabled === undefined &&
		C.npc[npc].pregnancy.type &&
		C.npc[npc].pregnancy.type !== "parasite"
	);
}
window.npcIsPregnant = npcIsPregnant;

function npcPregnancyEnding(npc) {
	return C.npc[npc] && C.npc[npc].pregnancy && C.npc[npc].pregnancy.waterBreaking;
}
window.npcPregnancyEnding = npcPregnancyEnding;

function playerIsPregnant() {
	return (
		(V.sexStats.vagina.pregnancy.type !== null && V.sexStats.vagina.pregnancy.type !== "parasite") ||
		(V.sexStats.anus.pregnancy.type !== null && V.sexStats.anus.pregnancy.type !== "parasite")
	);
}
window.playerIsPregnant = playerIsPregnant;

function playerPregnancyProgress(percent = true) {
	if (!V.sexStats) return null;
	const vpregnancy = V.sexStats.vagina.pregnancy;
	const apregnancy = V.sexStats.anus.pregnancy;
	if (percent) {
		if (vpregnancy.timerEnd) return Math.clamp(vpregnancy.timer / vpregnancy.timerEnd, 0, 1);
		if (apregnancy.timerEnd) return Math.clamp(apregnancy.timer / apregnancy.timerEnd, 0, 1);
	} else {
		if (vpregnancy.timerEnd) return vpregnancy.timer;
		if (apregnancy.timerEnd) return apregnancy.timer;
	}
	return null;
}
window.playerPregnancyProgress = playerPregnancyProgress;

function isPlayerNonparasitePregnancyEnding() {
	return (
		(V.sexStats.vagina.pregnancy.waterBreaking && !V.sexStats.vagina.pregnancy.gaveBirth) ||
		(V.sexStats.anus.pregnancy.waterBreaking && !V.sexStats.anus.pregnancy.gaveBirth) ||
		false
	);
}
window.isPlayerNonparasitePregnancyEnding = isPlayerNonparasitePregnancyEnding;

function playerNormalPregnancyType() {
	if (V.player.vaginaExist && V.sexStats.vagina.pregnancy.type !== "parasite") {
		return V.sexStats.vagina.pregnancy.type;
	} else if (V.sexStats.anus.pregnancy.type !== "parasite") {
		return V.sexStats.anus.pregnancy.type;
	}
	return null;
}
window.playerNormalPregnancyType = playerNormalPregnancyType;

function wakingPregnancyEvent() {
	let pregnancy;
	if (V.player.vaginaExist) {
		pregnancy = V.sexStats.vagina.pregnancy;
	} else {
		pregnancy = V.sexStats.anus.pregnancy;
	}
	const rng = random(0, 100);
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let wakingEffects;

	if (playerBellySize(true) >= 8 && !pregnancy.awareOf) {
		return "bellySize";
	} else if (playerBellySize() >= 9 && V.worn.genitals.type.includes("hidden")) {
		return "chastityBeltRemoval";
	} else if (
		V.cycledisable === "f" &&
		!menstruation.awareOfPeriodDelay &&
		V.awareness >= 100 &&
		V.sciencetrait >= 3 &&
		!pregnancy.awareOf &&
		pregnancyStage !== false &&
		between(pregnancy.timer - (menstruation.currentDaysMax - menstruation.currentDay), 4, 8)
	) {
		return "missedPeriod";
	} else if (between(pregnancyStage, 0.9, 1)) {
		wakingEffects = "nearBirthEvent";
	} else if (between(pregnancyStage, 0.7, 0.9)) {
		wakingEffects = "nearBirth";
	} else if (between(pregnancyStage, 0.4, 0.7) && rng > 50) {
		wakingEffects = "midPregnancy";
	} else if (V.pregnancyStats.morningSicknessWaking >= 2) {
		wakingEffects = "morningSicknessOnly";
		V.pregnancyStats.morningSicknessWaking = 0;
	} else if (V.pregnancyStats.morningSicknessWaking >= 1 && rng >= 50) {
		wakingEffects = "morningSicknessPills";
		V.pregnancyStats.morningSicknessWaking = 0;
	} else if (["contraceptive", "fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 2 && rng >= 50) {
		wakingEffects = "morningSicknessPills";
	} else if (["contraceptive", "fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 1 && rng >= 75) {
		wakingEffects = "mildIssues";
	}
	const result = [];
	switch (wakingEffects) {
		case "mildIssues":
			return ["nothing", "nothing", "lightHeaded", "lightHeaded", "dizzy", "dizzy", "dizzy", "mildNausea"];
		case "morningSicknessPills":
			return ["lightHeaded", "dizzy", "dizzy", "dizzy", "mildNausea", "mildNausea", "mildNausea", "nausea", "headache"];
		case "morningSicknessOnly":
			return [
				"lightHeaded",
				"dizzy",
				"sensitiveBreasts",
				"mildNausea",
				"headache",
				"nausea",
				"nausea",
				"nausea",
				"nausea",
				"dryheaving",
				"dryheaving",
				"dryheaving",
			];
		case "midPregnancy":
			result.push("tired");
			if (V.submissive >= 1000) {
				result.push("crying");
			} else {
				result.push("angry");
			}
			switch (pregnancy.type) {
				case "wolf":
					result.push("meatCraving");
					break;
				default:
					result.push("foodCraving");
					break;
			}
			return result;
		case "nearBirth":
			return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup"];
		case "nearBirthEvent":
			return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup", "earlyContractions", "earlyContractions"];
	}
	return false;
}
window.wakingPregnancyEvent = wakingPregnancyEvent;

function dailyPregnancyEvent() {
	let pregnancy;
	if (V.player.vaginaExist) {
		pregnancy = V.sexStats.vagina.pregnancy;
	} else {
		pregnancy = V.sexStats.anus.pregnancy;
	}
	const rng = random(0, 100) + (V.daily.pregnancyEvent || 0);
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let dailyEffects;

	if ((between(pregnancyStage, 0.9, 0.95) && rng > 80) || (between(pregnancyStage, 0.95, 1) && rng >= 75)) {
		dailyEffects = "nearBirthEvent";
	} else if ((between(pregnancyStage, 0.7, 0.8) && rng > 85) || (between(pregnancyStage, 0.8, 0.9) && rng >= 80)) {
		dailyEffects = "nearBirth";
	} else if ((between(pregnancyStage, 0.4, 0.5) && rng > 90) || (between(pregnancyStage, 0.5, 0.7) && rng >= 85)) {
		dailyEffects = "midPregnancy";
	} else if (V.pregnancyStats.morningSicknessGeneral >= 2 && rng >= 85) {
		dailyEffects = "morningSicknessOnly";
		V.pregnancyStats.morningSicknessGeneral--;
	} else if (V.pregnancyStats.morningSicknessGeneral >= 1 && rng >= 90) {
		dailyEffects = "morningSicknessPills";
		V.pregnancyStats.morningSicknessGeneral--;
	} else if (["contraceptive", "fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 2 && rng >= 90) {
		dailyEffects = "morningSicknessPills";
	} else if (["contraceptive", "fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 1 && rng >= 95) {
		dailyEffects = "mildIssues";
	} else if (
		V.cycledisable === "f" &&
		menstruation.currentState === "normal" &&
		(menstruation.currentDay < 3 || (menstruation.currentDay >= menstruation.currentDaysMax - 1 && rng >= 80))
	) {
		dailyEffects = "periodIssues";
	}

	const result = [];
	switch (dailyEffects) {
		case "periodIssues":
			return ["nothing", "cramping", "bloated", "lightHeaded", "mildNausea", "nausea"];
		case "mildIssues":
			return ["nothing", "lightHeaded", "lightHeaded", "dizzy", "dizzy", "dizzy", "dizzy", "mildNausea"];
		case "morningSicknessPills":
			return ["lightHeaded", "dizzy", "dizzy", "dizzy", "mildNausea", "mildNausea", "mildNausea", "nausea", "headache"];
		case "morningSicknessOnly":
			return [
				"lightHeaded",
				"dizzy",
				"sensitiveBreasts",
				"mildNausea",
				"headache",
				"nausea",
				"nausea",
				"nausea",
				"nausea",
				"dryheaving",
				"dryheaving",
				"dryheaving",
			];
		case "midPregnancy":
			result.push("tired");
			if (V.submissive >= 1000) {
				result.push("crying");
			} else {
				result.push("angry");
			}
			switch (pregnancy.type) {
				case "wolf":
					result.push("meatCraving");
					break;
				default:
					result.push("foodCraving");
					break;
			}
			return result;
		case "nearBirth":
			return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup"];
		case "nearBirthEvent":
			return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup", "earlyContractions", "earlyContractions"];
	}
	return false;
}
window.dailyPregnancyEvent = dailyPregnancyEvent;

function pregnancyNameCorrection(name, caps = false) {
	switch (name) {
		case "Black Wolf":
		case "Great Hawk":
		case "Ivory Wraith":
		case "cum bucket":
			name = (caps ? "The " : "the ") + name;
			break;
		case "pc":
			name = caps ? "Yourself" : "yourself";
			break;
		default:
			name = name[0] === name[0].toLowerCase() ? (caps ? "A " : "a ") + name : name;
			break;
	}
	return name;
}
window.pregnancyNameCorrection = pregnancyNameCorrection;

function pregnancyUINameCorrection(name) {
	switch (name) {
		case "pc":
			name = "You";
			break;
	}
	return name;
}
window.pregnancyUINameCorrection = pregnancyUINameCorrection;

function playerPregnancyRisk() {
	if (V.playerPregnancyHumanDisable === "t" && V.playerPregnancyBeastDisable === "t") return 6; // Player Pregnancy Disabled
	if (!V.player.vaginaExist && !canBeMPregnant()) return 6; // Player is male and can't become MPregnant
	const menstruation = V.sexStats.vagina.menstruation;

	if (V.cycledisable === "t") return menstruation.nonCycleRng[0];

	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;

	let risk;
	let daysTillEnd;
	let multi = 1;
	switch (V.pregnancytype) {
		case "realistic":
			// Was a pain to calculate, might need to be adjusted
			if (menstruation.currentDay > menstruation.stages[3] + 4) {
				daysTillEnd = menstruation.currentDaysMax - menstruation.currentDay + menstruation.stages[3];
			} else {
				daysTillEnd = menstruation.stages[3] - menstruation.currentDay;
			}

			if (V.skin.pubic.type === "magic" && V.skin.pubic.special === "pregnancy") multi += 1;
			if (lastPregPill === "fertility booster" && pills.pills["fertility booster"].doseTaken >= 2) multi += 1;
			daysTillEnd = daysTillEnd / multi;
			daysTillEnd += 4;

			if (between(daysTillEnd, 4, 10)) {
				risk = 0;
			} else if (between(daysTillEnd, 2, 4) || between(daysTillEnd, 10, 12)) {
				risk = 1;
			} else if (between(daysTillEnd, 1, 2) || between(daysTillEnd, 12, 14)) {
				risk = 2;
			} else if (between(daysTillEnd, 0, 1) || between(daysTillEnd, 14, 15)) {
				risk = 3;
			} else if (between(daysTillEnd, 15, 16)) {
				risk = 4;
			} else if (between(daysTillEnd, 16, 17)) {
				risk = 5;
			} else {
				risk = 6;
			}
			break;
		case "fetish":
			switch (Math.abs(menstruation.stages[2] - menstruation.currentDay)) {
				case 0:
					risk = 0;
					break;
				case 1:
					risk = 1;
					break;
				case 2:
					risk = 2;
					break;
				case 3:
					risk = 3;
					break;
				case 4:
				case 5:
					risk = 4;
					break;
				case 6:
					risk = 5;
					break;
				default:
					risk = 6;
					break;
			}
			break;
	}
	return risk;
}
window.playerPregnancyRisk = playerPregnancyRisk;

function playerHeatMinArousal() {
	if (!V.sexStats || !V.sexStats.pills) return 0;
	if (!V.player.vaginaExist && !canBeMPregnant()) return 0;
	if (playerIsPregnant() && playerPregnancyProgress(false) > 10) return 0;

	const pills = V.sexStats.pills.pills;
	const risk = playerPregnancyRisk();
	let minArousal = 0;

	if (risk <= 1 && pills.contraceptive.doseTaken === 0) {
		if (V.wolfgirl >= 2) minArousal += Math.clamp(V.wolfbuild, 0, 100) * 10 * (2 - risk);
		if (V.cat >= 2) minArousal += Math.clamp(V.catbuild, 0, 100) * 10 * (2 - risk);
		if (V.cow >= 2) minArousal += Math.clamp(V.cowbuild, 0, 100) * 10 * (2 - risk);
	}
	if (pills["fertility booster"].doseTaken > 2) {
		minArousal += 500;
	}

	return minArousal;
}
window.playerHeatMinArousal = playerHeatMinArousal;

function playerRutMinArousal() {
	if (!V.player.penisExist || V.player.penissize < -1 || !V.sexStats || !V.sexStats.pills) return 0;

	const pills = V.sexStats.pills.pills;
	let minArousal = 0;

	if (pills.contraceptive.doseTaken === 0 && V.player.beastRut !== undefined && V.player.beastRut <= 1) {
		if (V.wolfgirl >= 2) minArousal += Math.clamp(V.wolfbuild, 0, 100) * 10;
		if (V.cat >= 2) minArousal += Math.clamp(V.catbuild, 0, 100) * 10;
		if (V.cow >= 2) minArousal += Math.clamp(V.cowbuild, 0, 100) * 10;
	}
	if (pills["fertility booster"].doseTaken > 2) {
		minArousal += 500;
	}

	return minArousal;
}
window.playerRutMinArousal = playerRutMinArousal;

function playerAwareTheyCanBePregnant() {
	return V.player.vaginaExist || (canBeMPregnant() && V.sexStats.anus.pregnancy.totalBirthEvents >= 1);
}
window.playerAwareTheyCanBePregnant = playerAwareTheyCanBePregnant;

function playerAwareTheyAreInHeat() {
	return playerHeatMinArousal() && playerAwareTheyCanBePregnant();
}
window.playerAwareTheyAreInHeat = playerAwareTheyAreInHeat;

function pregnancyDaysEta(pregnancyObject) {
	if (
		!pregnancyObject ||
		!pregnancyObject.fetus ||
		!pregnancyObject.fetus.length ||
		!pregnancyObject.type ||
		pregnancyObject.timer === undefined ||
		pregnancyObject.timer === null ||
		!pregnancyObject.timerEnd
	) {
		return null;
	}
	const timerLeft = pregnancyObject.timerEnd - pregnancyObject.timer;
	switch (pregnancyObject.type) {
		case "human":
			return Math.floor(timerLeft / (1 / ((1 / 9) * V.humanPregnancyMonths)));
		case "wolf":
			return Math.floor(timerLeft / (1 / ((1 / 12) * V.wolfPregnancyWeeks)));
		default:
			return null;
	}
}
window.pregnancyDaysEta = pregnancyDaysEta;
