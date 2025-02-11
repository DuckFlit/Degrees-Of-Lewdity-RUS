function playerHasStrapon() {
	return V.worn.under_lower.type.includes("strap-on") && V.worn.under_lower.state === "waist";
}
window.playerHasStrapon = playerHasStrapon;

function playerPenisSize() {
	if (playerHasStrapon() && V.worn.under_lower.size !== undefined) return V.worn.under_lower.size;
	return V.player.penissize;
}
window.playerPenisSize = playerPenisSize;

function npcHasStrapon(index) {
	if (typeof index !== "number") {
		if (V.options.debugdisable === "f" || V.debug === 1)
			Errors.report(`[npcHasStrapon]: index must be a number, was ${typeof index}.`, {
				index,
			});
		return false;
	} else if (index < 0 || index > 5) {
		if (V.options.debugdisable === "f" || V.debug === 1)
			Errors.report(`[npcHasStrapon]: index must be between 0 and 5 inclusive, was ${index}.`, { index });
		return false;
	}
	// index is 0 to 5
	const npc = V.NPCList[index];
	return !!npc && !!npc.strapon && npc.strapon.state === "worn";
}
window.npcHasStrapon = npcHasStrapon;

function getSexToysofType(toyType) {
	const sexToys = {
		dildos: ["dildo", "length of anal beads"],
		whip: ["riding crop", "flog"],
		stroker: ["stroker"],
		vibrator: ["vibrator", "bullet vibe"],
		get all() {
			return [...this.dildos, ...this.whip, ...this.stroker, ...this.vibrator];
		},
	};

	/* sexToys.all = sexToys.dildos.concat(sexToys.whip, sexToys.stroker, sexToys.vibrator); */

	const dandv = sexToys.dildos.concat(sexToys.vibrator);
	const dandvs = dandv.concat(sexToys.stroker);
	const dandvw = dandv.concat(sexToys.whip);

	if (toyType) {
		if (Object.keys(sexToys).includes(toyType)) return sexToys[toyType];
		else if (toyType === "dildo") return dandv;
		else if (toyType === "dildos and strokers") return dandvs;
		else if (toyType === "dildos and whips") return dandvw;
		else return sexToys.all;
	} else {
		// console.log("All sex toys. Length = "+sexToys["all"].length+ " and I contain: " +sexToys["all"]);
		return sexToys.all;
	}
}
window.getSexToysofType = getSexToysofType;

function npcHasSexToyOfType(npcIndex, toyType) {
	const npc = V.NPCList[npcIndex];
	const sexToyList = getSexToysofType(toyType);

	/* Only output to console if in debug mode. */
	if (V.debug) console.log("sex toys: " + getSexToysofType("all"));

	return sexToyList.includes(npc.righttool) || sexToyList.includes(npc.lefttool);
}
window.npcHasSexToyOfType = npcHasSexToyOfType;

const randomSexToy = toyType => getSexToysofType(toyType).random();
window.randomSexToy = randomSexToy;

function playerHasButtPlug() {
	return V.worn.butt_plug != null && V.worn.butt_plug.state === "worn" && V.worn.butt_plug.worn;
	// V.worn.butt_plug.worn is just as a safeguard for now
}
window.playerHasButtPlug = playerHasButtPlug;

function existsInSexToyInventory(name, colour) {
	if (V.player.inventory.sextoys[name] && V.player.inventory.sextoys[name].length > 0) {
		if (!colour || colour === "any") {
			return true;
		}
		for (const item of V.player.inventory.sextoys[name]) {
			if (item.colour === colour) {
				return true;
			}
		}
	}
	return false;
}
window.existsInSexToyInventory = existsInSexToyInventory;

function sexToysInventoryDelete(name, colour) {
	if (!existsInSexToyInventory(name, colour)) {
		console.log("Item does not exist in the inventory.");
		return;
	}
	if (colour && colour !== "any") {
		let foundIndex = -1;
		// Find the index of the first item with the specified name and colour
		for (let i = 0; i < V.player.inventory.sextoys[name].length; i++) {
			if (V.player.inventory.sextoys[name][i].colour === colour) {
				foundIndex = i;
				break;
			}
		}
		if (foundIndex === -1) {
			console.log(`Item ${name} ${colour} does not exist in the inventory.`);
			return;
		}
		const item = V.player.inventory.sextoys[name][foundIndex];
		if (item.worn && item.type.includes("anal")) {
			delete V.worn.butt_plug;
		}
		if (item.worn && item.type.includes("strap-on")) {
			V.worn.under_lower = clone(setup.clothes.under_lower[0]);
			setLowerVisibility(true);
		}
		V.player.inventory.sextoys[name].splice(foundIndex, 1);
		console.log(`Deleted ${name} ${colour} from inventory.`);
		return;
	}
	// If no specific colour is specified or colour is 'any', then remove the first item with the specified name
	const item = V.player.inventory.sextoys[name][0];
	if (item.worn && item.type.includes("anal")) {
		delete V.worn.butt_plug;
	}
	if (item.worn && item.type.includes("strap-on")) {
		V.worn.under_lower = clone(setup.clothes.under_lower[0]);
		setLowerVisibility(true);
	}
	V.player.inventory.sextoys[name].splice(0, 1);
	console.log(`Deleted ${name} from inventory.`);
}
window.sexToysInventoryDelete = sexToysInventoryDelete;
