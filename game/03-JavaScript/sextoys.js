function playerHasStrapon() {
	return (V.worn.under_lower.type.includes("strap-on") && V.worn.under_lower.state == "waist")
}
window.playerHasStrapon = playerHasStrapon;

function npcHasStrapon(index) {
	if (typeof index !== 'number') {
		if (V.debugdisable === 'f' || V.debug === 1)
			Errors.report(`[npcHasStrapon]: index must be a number, was ${typeof index}.`, { index });
		return false;
	} else if (index < 0 || index > 5) {
		if (V.debugdisable === 'f' || V.debug === 1)
			Errors.report(`[npcHasStrapon]: index must be between 0 and 5 inclusive, was ${index}.`, { index });
		return false;
	}
	// index is 0 to 5
	const npc = V.NPCList[index];
	return (npc && npc.strapon && npc.strapon.state === "worn");
}
window.npcHasStrapon = npcHasStrapon;

function getSexToysofType(toyType) {
	var sexToys = ["dildo","whip","stroker","vibrator","all"];
	sexToys["dildo"] = ["dildo","length of anal beads"];
	sexToys["whip"] = ["riding crop","flog"];
	sexToys["stroker"] = ["stroker"];
	sexToys["vibrator"] = ["vibrator","bullet vibe"];
	sexToys["all"] = sexToys["dildo"].concat(sexToys["whip"],sexToys["stroker"],sexToys["vibrator"]);

	if (toyType != undefined){
		if (toyType == "dildo"){
			var dildos = sexToys["dildo"].concat(sexToys["vibrator"]);
			return dildos;
		}
		else if (toyType == "stroker"){
			return sexToys["stroker"];
		}
		else if (toyType == "whip"){
			return sexToys["whip"];
		}
		else if (toyType == "vibrator"){
			return sexToys["vibrator"];
		}
		else if (toyType == "dildos and strokers"){
			var dildos = sexToys["dildo"].concat(sexToys["vibrator"],sexToys["stroker"]);
			return dildos;
		}
		else if (toyType == "dildos and whips"){
			var dildos = sexToys["dildo"].concat(sexToys["vibrator"],sexToys["whip"]);
			return dildos;
		}
		else {
			return sexToys["all"];
		}
	}
	else {
		//console.log("All sex toys. Length = "+sexToys["all"].length+ " and I contain: " +sexToys["all"]);
		return sexToys["all"];
	}
}
window.getSexToysofType = getSexToysofType;

function npcHasSexToyOfType(npcIndex,toyType) {
	var npc = V.NPCList[npcIndex];
	if (npc.righttool != undefined || npc.lefttool != undefined){
		var sexToys = ["dildo","whip","stroker","all"];
		sexToys.dildo = getSexToysofType("dildo");
		sexToys.whip = getSexToysofType("whip");
		sexToys.stroker = getSexToysofType("stroker");
		sexToys.vibrator = getSexToysofType("vibrator");
		sexToys.all = getSexToysofType("all");

		/* Only output to console if in debug mode. */
		if (V.debug) console.log("sex toys: "+sexToys.all);

		return sexToys[toyType].includes(V.NPCList[npcIndex].righttool) || sexToys[toyType].includes(V.NPCList[npcIndex].lefttool)
	}
	else {
		return false;
	}
}
window.npcHasSexToyOfType = npcHasSexToyOfType;

function randomSexToy(toyType) {
	if (toyType != undefined){
		if (toyType == "dildo"){
			var dildos = getSexToysofType("dildo");
			return dildos[random(0,dildos.length-1)];
		}
		else if (toyType == "stroker"){
			var strokers = getSexToysofType("stroker");
			return strokers[random(0,strokers.length-1)];
		}
		else if (toyType == "whip"){
			var whips = getSexToysofType("whip");
			return whips[random(0,whips.length-1)];
		}
		else if (toyType == "vibrator"){
			var vibrators = getSexToysofType("vibrator");
			return vibrators[random(0,vibrators.length-1)];
		}
		else if (toyType == "dildos and strokers"){
			var dildos = getSexToysofType("dildos and strokers");
			return dildos[random(0,dildos.length-1)];
		}
		else if (toyType == "dildos and whips"){
			var dildos = getSexToysofType("dildos and whips");
			return dildos[random(0,dildos.length-1)];
		}
		else {
			var sexToys = getSexToysofType("all")
			return sexToys[random(0,sexToys.length-1)];
		}
	}
	else {
		//console.log("All sex toys. Length = "+sexToys["all"].length+ " and I contain: " +sexToys["all"]);
		var sexToys = getSexToysofType("all")
		return sexToys[random(0,sexToys.length-1)];
	}
}
window.randomSexToy = randomSexToy;

function playerHasButtPlug() {
	return (V.worn.butt_plug != undefined && V.worn.butt_plug.state == "worn" && V.worn.butt_plug.worn == 1) // V.worn.butt_plug.worn == 1 is just as a safeguard for now
}
window.playerHasButtPlug = playerHasButtPlug;
