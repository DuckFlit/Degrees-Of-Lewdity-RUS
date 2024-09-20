// @ts-check
// Someone needs to fix the close options code, it is shit.
/* global CombatRenderer, PlayerCombatMapper */

/**
 * @typedef {object} CloseOptions
 * @property {"img/newsex"} root
 * @property {string} src Source directory for closeup images.
 * @property {boolean} showChest
 * @property {boolean} showPenis
 * @property {boolean} showVagina
 * @property {boolean} showArse
 * @property {"doggy"|"missionary"} position Doggy or missionary position.
 * @property {number|"topdown"} breasts Breast size, or topdown sprites if size >= 8. (May want to add ability to toggle views.)
 * @property {"parasite"|"herm-balls"|"herm-base"} herm Player penis, used in vagina closeup.
 * @property {vagina} vagina Player vagina and penetrators, used in vagina closeup.
 * @property {penis} penis Player penis and penetrated, used in penis closeup.
 * @property {anus} anus Player anus and penetrators, used in arse closeup.
 * @property {chest} chest Player chest and titjob.
 * @property {pcPenis} pcPenis Computed sprite for player penis, taking size/chastity/type into account.
 * @property {"beast"|"penis"|"tentacle"} breastsNpc Type of npc giving boobjob.
 * @property {object} filters The filters for layers.
 * @property {string} animKeyVagina
 * @property {string} animKeyPenis
 * @property {string} animKeyArse
 * @property {string} animKeyChest
 */

/**
 * @param {CloseOptions} options
 * @returns {CloseOptions}
 */

function getCloseOptions(options = {}) {
	options.src = "img/newsex/close/";
	options.filters = options.filters || {
		worn: {},
	};

	// Show Conditions
	options.showPenis = (V.player.penisExist || playerHasStrapon()) && V.worn.under_lower.vagina_exposed === 1 && V.worn.lower.vagina_exposed === 1;
	options.showVagina = V.player.vaginaExist && V.worn.under_lower.vagina_exposed === 1 && V.worn.lower.vagina_exposed === 1;
	options.showChest = combat.isChestActive() || (V.worn.under_upper.exposed >= 1 && V.worn.upper.exposed >= 2);
	options.showArse = V.worn.under_lower.anus_exposed === 1 && V.worn.lower.anus_exposed === 1;

	// Position
	options.position = CombatRenderer.getPosition(V.position);

	// Genitals
	if (options.showArse) {
		mapClosePenetrators("anus", options);
	}
	if (V.player.vaginaExist) {
		mapClosePenetrators("vagina", options);
	}
	if (V.player.penisExist) {
		mapClosePenis(options);
	}
	if (options.showChest) {
		mapCloseChest(options);
	}

	// Colours
	CombatRenderer.generateBodyFilters(options);

	options.pbhairColour = V.makeup.pbcolour || V.naturalhaircolour;
	options.filters.pbhair = CombatRenderer.lookupColour(
		setup.colours.hair_map,
		options.pbhairColour || options.pbHairColour,
		"pbhair",
		"pbhair_custom",
		"pbhair"
	);

	options.condomColour = V.player.condom.colour || "red";
	options.filters.condom = CombatRenderer.lookupColour(setup.colours.condom_map, options.condomColour, "condom", "condom_custom", "condom");

	PlayerCombatMapper.mapPcToClothingOptions(V.player, options);
	options.parasitePanties = options.parasitePanties || "red";
	if (["parasite", "parasitem"].includes(V.parasite.clit.name) || ["parasite"].includes(V.parasite.penis.name)) {
		options.filters.parasitePanties = CombatRenderer.lookupColour(setup.colours.clothes_map, options.parasitePanties, "parasitePanties");
	}

	// Set animation speed
	const speedChest = combat.isRapid() ? "vfast" : combat.isChestActive("close") ? "mid" : "slow";
	const framesChest = V.player.breastsize >= 8 ? 10 : 6;
	options.animKeyChest = `sex-${framesChest}f-${speedChest}`;

	options.animKeyVagina = `sex-${combat.isVaginaActive("close") ? (combat.isRapid() ? "6f-vfast" : "6f-mid") : "1f-idle"}`;
	options.animKeyArse = `sex-${combat.isAnusActive("close") ? (combat.isRapid() ? "6f-vfast" : "6f-mid") : "1f-idle"}`;
	options.animKeyPenis = `sex-${combat.isPenisActive("close") ? (combat.isRapid() ? "6f-vfast" : "6f-mid") : "1f-idle"}`;

	return options;
}
window.getCloseOptions = getCloseOptions;

/**
 * @param {slot} slot
 * @param {CloseOptions} options
 * @returns {CloseOptions}
 */

function mapClosePenetrators(slot, options) {
	/**
	 * @param {slot} slot
	 * @returns {"anus" | "vagina"}
	 */
	const activeEnemy = V.NPCList[V.active_enemy].type;
	const chastity = (playerChastity("hidden") || V.worn.genitals.name === "chastity parasite") && slot === "vagina" && !playerHasStrapon();
	const belt = V.worn.genitals.name === "gold chastity belt" ? "gold-belt" : "belt";
	const npc = ["horse", "centaur"].includes(activeEnemy) ? "horse" : ["beast", "machine", "tentacles"].includes(V.enemytype) ? V.enemytype : "npc";
	options[slot] = {};

	/* check $anusstate or $vaginastate */
	switch (V[slot + "state"]) {
		case "tentacle":
		case "tentacledeep":
		case "tentacleentrance":
		case "tentacleimminent":
			/* tentacle penetrating, or preparing to penetrate, anus/vagina */
			options[slot].state = chastity ? "chastity" : ["tentacle", "tentacledeep"].includes(V[slot + "state"]) ? "penetrated" : "entrance";
			options[slot].npc = "tentacle";
			break;
		case "entrance":
		case "imminent":
		case "penetrated":
			/* other enemy types penetrating, or preparing to penetrate, anus/vagina */
			options[slot].state = chastity ? "chastity" : ["penetrated", "doublepenetrated"].includes(V[slot + "state"]) ? "penetrated" : "entrance";
			options[slot].npc = npc;
			break;
		case "doublepenetrated":
			options[slot].state = chastity ? "chastity" : "penetrated";
			/* futureproofing, in case we ever add the ability to get dped by non-humans */
			options[slot].npc = `dp-top-${npc}`;
			options[slot].npc2 = `dp-bottom-${npc}`;
			break;
		case "othermouth":
		case "othermouthentrance":
		case "othermouthimminent":
			/* beast oral. worst naming convention ever. */
			if (V.enemytype === "beast" && V.monster !== 1) {
				options[slot].state = V[slot + "state"] === "othermouth" ? "penetrated" : "entrance";
				options[slot].npc = "beast-oral";
			} else {
				/* if monsterperson, no beast sprites; anus or vagina is not actively in use */
				options[slot].state = "entrance";
				options[slot].npc = null;
			}
			break;
		default:
			/* anus or vagina is not actively in use */
			options[slot].state = "entrance";
			options[slot].npc = null;
	}

	if (slot === "vagina") {
		/* match drippy cum sprites to corresponding vagina state */
		const entrance = ["entrance", "doubleentrance", "tentacleentrance"].includes(V.vaginastate) ? "entrance" : "vagina";
		options[slot].cumState = options.vagina.state === "penetrated" ? "penetrated" : entrance;
		/* select appropriate chastity sprite */
		if (chastity) {
			options[slot].chastityDevice = V.worn.genitals.name === "chastity parasite" ? `chastity-parasite-${V.player.penissize + 2}` : `chastity-${belt}`;
		}
		/* hirsute pubes */
		options[slot].hirsute =
			!["hidden", "disabled"].includes(V.transformationParts.wolf.pubes) || !["hidden", "disabled"].includes(V.transformationParts.bird.pubes);
	}

	/* colour filters and silhouettes for enemies interacting with vagina/anus */
	if (!["horse", "beast-oral", "machine", "tentacle"].includes(options[slot].npc)) {
		if (options[slot].state === "penetrated" || V[`${slot}use`] === "othervagina") {
			options[slot].silhouette = V[`${slot}use`] === "othervagina" ? "trib" : V[`${slot}state`] === "doublepenetrated" ? "dp" : "solo";
		}
	}
	/* tentacle colour could theoretically be outside of these functions, as tentacles are incompatible with other enemy types and can only have one colour, which applies to all tentacles interacting with vagina, anus, and penis slots. combat rework should allow for tentacles to be incorporated into other encounters and multiple tentacle colours (vines and roots, for example) */
	if (options[slot].npc === "tentacle") {
		const tentacleColour = V.tentacleColour || "tentacles-purple";
		options.filters[`${slot}Tentacle`] = CombatRenderer.lookupColour(setup.colours.tentacle_map, tentacleColour, "tentacle");
	}
	/* enemyno check exists only to enable tentacle encounters to work, this check checks NPCList 0 by default which always returns true */
	if (V.NPCList[V[`${slot}target`]] && V.enemyno !== 0) {
		const targetNpc = V.NPCList[V[`${slot}target`]];

		/* skin colour of npc targeting vagina/anus */
		if (targetNpc?.penis !== "none" && targetNpc?.penisdesc.includes("strap-on") && !targetNpc?.penisdesc.includes("fleshy")) {
			const straponColours = ["black", "red", "pink", "purple", "blue", "green"];
			options.npcTone = straponColours.find(color => targetNpc?.penisdesc.includes(color));
			options.filters[`${slot}Npc`] = CombatRenderer.lookupColour(setup.colours.clothes_map, options.npcTone, "strapon");
			options[slot].strapon = true;
		} else {
			options.npcTone = targetNpc.skincolour === "black" ? "dark" : "light";
			options.filters[`${slot}Npc`] = setup.colours.getSkinFilter(options.npcTone, 0);
		}

		/* condom colour of npc targeting vagina/anus */
		if (targetNpc?.condom?.worn) {
			options[slot].npcCondom = targetNpc.condom.colour || "red";
			options.filters[`${slot}Condom`] = CombatRenderer.lookupColour(
				setup.colours.condom_map,
				options[slot].npcCondom,
				"condom",
				"condom_custom",
				"condom"
			);
		}
	}
	if (V.NPCList[V[`${slot}doubletarget`]] && V.enemyno !== 0) {
		const targetNpc2 = V.NPCList[V[`${slot}doubletarget`]];

		/* skin colour of npc double-penetrating vagina/anus */
		if (targetNpc2?.penisdesc.includes("strap-on")) {
			const straponColours = ["black", "dark red", "red", "pink", "purple", "fleshy", "blue", "green"];
			options.npcTone = straponColours.find(color => targetNpc2?.penisdesc.includes(color));
			options.filters[`${slot}Npc`] = CombatRenderer.lookupColour(options, setup.colours.clothes_map, options.npcTone, "strapon");
			options[slot].dpStrapon = true;
		} else {
			options.npc2Tone = targetNpc2.skincolour === "black" ? "dark" : "light";
			options.filters[`${slot}Npc2`] = setup.colours.getSkinFilter(options.npc2Tone, 0);
		}

		/* condom colour of npc double-penetrating vagina/anus */
		if (targetNpc2?.condom?.worn) {
			options[slot].npc2Condom = targetNpc2.condom.colour || "red";
			options.filters[`${slot}Condom2`] = CombatRenderer.lookupColour(
				setup.colours.condom_map,
				options[slot].npc2Condom,
				"condom",
				"condom_custom",
				"condom"
			);
		}
	}
}
window.mapClosePenetrators = mapClosePenetrators;

function mapClosePenis(options) {
	const chastityTypes = {
		"chastity belt": "belt",
		"gold chastity belt": "belt-gold",
		"chastity parasite": `parasite-${V.player.penissize + 2}`,
		"flat chastity cage": "flat",
		"small chastity cage": "small",
	};
	const chastityDevice = chastityTypes[V.worn.genitals.name] || "base";
	const penisType = V.player.gender === "f" ? "parasite" : V.player.ballsExist ? "penis" : "herm";
	/* V.showPenisSize is a placeholder, in case we ever get visual representation of other penis sizes in the closeups */
	options.penis = {
		type: penisType,
		size: V.showPenisSize ? V.player.penissize : 1,
		condom: V.player.condom && !playerChastity(),
		chastityDevice: `chastity-${V.worn.genitals.name.includes("cage") ? "cage-" + chastityDevice : chastityDevice}`,
		chastityPenis: `chastity-${penisType + "-"}${chastityDevice}`,
	};

	/* npc targeting player penis */
	switch (V.penisstate) {
		case "tentacle":
		case "tentacledeep":
		case "tentacleentrance":
		case "tentacleimminent":
			/* penis penetrating, or preparing to penetrate, tentussy */
			options.penis.state = playerChastity() ? "chastity" : ["tentacle", "tentacledeep"].includes(V.penisstate) ? "penetrated" : "entrance";
			options.penis.npc = "tentacle";
			break;
		case "entrance":
		case "imminent":
		case "otheranusimminent":
		case "otheranusentrance":
			/* penis preparing to penetrate npc */
			options.penis.state = "entrance";
			options.penis.npc = V.enemytype === "beast" && V.monster !== 1 ? "beast" : "npc";
			break;
		case "penetrated":
		case "otheranus":
			/* penis penetrating npc */
			options.penis.state = "penetrated";
			options.penis.npc = V.enemytype === "beast" && V.monster !== 1 ? "beast" : "npc";
			break;
		case "othermouth":
		case "othermouthentrance":
		case "othermouthimminent":
			/* penis penetrating beast mouth */
			if (V.enemytype === "beast" && V.monster !== 1) {
				options.penis.state = V.penisstate === "othermouth" ? "penetrated" : V.penisstate === "othermouthimminent" ? "imminent" : "entrance";
				options.penis.npc = "beast-oral";
			} else {
				/* if monsterperson, no beast sprites. no oral sprites */
				options.penis.state = "entrance";
				options.penis.npc = null;
			}
			break;
		default:
			/* penis is not actively in use */
			options.penis.state = "entrance";
			options.penis.npc = null;
	}

	if (options.penis.npc === "tentacle") {
		const tentacleColour = V.tentacleColour || "tentacles-purple";
		options.filters.penisTentacle = CombatRenderer.lookupColour(setup.colours.tentacle_map, tentacleColour, "penisTentacle");
	}
	if (V.NPCList[V.penistarget]) {
		/* skin colour of npc targeting penis */
		options.penis.npcTone = V.NPCList[V.penistarget].skincolour === "black" ? "dark" : "light";
		options.filters.penisNpc = setup.colours.getSkinFilter(options.penis.npcTone, 0);
	}

	return options.penis;
}
window.mapClosePenis = mapClosePenis;

/**
 * @param {CloseOptions} options
 */
function mapCloseChest(options) {
	const breastsNpc = V.NPCList[V.chesttarget];
	const topdown = V.player.breastsize >= 8 && ["penis", "tentacle"].includes(V.chestuse);
	options.chest = {
		base: ["penis", "tentacle"].includes(V.chestuse) ? (V.player.breastsize >= 8 ? "topdown-job" : "base-job") : V.player.breastsize,
		breasts: V.player.breastsize,
		npc: topdown ? "penis-topdown" : V.enemytype === "beast" ? "beast" : V.chestuse,
	};

	if (options.chest.npc === "tentacle") {
		const tentacleColour = V.tentacleColour || "tentacles-purple";
		options.filters.chestTentacle = CombatRenderer.lookupColour(setup.colours.tentacle_map, tentacleColour, "chestTentacle");
	}
	if (breastsNpc) {
		options.chest.npcTone = breastsNpc.skincolour === "black" ? "dark" : "light";
		options.filters.chestNpc = setup.colours.getSkinFilter(options.chest.npcTone, 0);
		if (breastsNpc.condom?.worn) {
			options.chest.condom = breastsNpc.condom.colour || "red";
			options.filters.breastsCondom = CombatRenderer.lookupColour(setup.colours.condom_map, options.chest.condom, "condom", "condom_custom", "condom");
		}
	}
}
window.mapCloseChest = mapCloseChest;
