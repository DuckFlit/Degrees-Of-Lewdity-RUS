// @ts-check
/* global CombatRenderer, NpcCombatMapper */

/**
 * @typedef XrayOptions
 * @property {"img/newsex"} root
 * @property {string} src Source directory for xray images.
 * @property {boolean} showPcPenis
 * @property {boolean} showPcVagina
 * @property {boolean} showPcArse
 * @property {boolean} showNpcPenis
 * @property {boolean} showNpcVagina
 * @property {boolean} showNpcArse
 * @property {boolean} showCum
 * @property {object} penis Player penis and penetrated.
 * @property {object} vagina Player vagina and penetrators.
 * @property {object} anus Player anus and penetrators.
 * @property {object} filters The filters for layers.
 * @property {string} animKeyBase
 * @property {string} animKeyVagina
 * @property {string} animKeyPenis
 * @property {string} animKeyArse
 */

class XrayCombatMapper {
	/** @returns {XrayOptions} */
	static generateOptions() {
		// @ts-ignore
		return {
			src: "img/newsex/xray/",
			animKeyBase: "idle",
			animKeyVagina: "sex-1f-idle",
			animKeyPenis: "sex-1f-idle",
			animKeyArse: "sex-1f-idle",
			filters: {},
		};
	}

	/**
	 * @param {XrayOptions} options
	 * @returns {XrayOptions}
	 */
	static mapXrayOptions(options) {
		// Set directory for images
		options.root = "img/newsex";
		options.src = `${options.root}/xray/`;

		options.filters = options.filters || {};

		// Show Conditions
		// If penis-to-mouth xrays ever become a thing, adjust this check
		options.showPcPenis = V.player.penisExist && combat.isPenisPenetrated() && V.penisstate !== "othermouth";
		options.showPcVagina = V.player.vaginaExist && (combat.isVaginaPenetrated() || T.pullOutVagina);
		options.showPcArse = combat.isAnusPenetrated() || T.pullOutAnus;
		options.showNpcPenis = options.showPcVagina || options.showPcArse;

		// Genitals
		if (options.showPcPenis) {
			this.mapXrayPlayerPenis(options);
		}
		if (options.showPcVagina) {
			this.mapXrayPenetrators("vagina", options);
		}
		if (options.showPcArse) {
			this.mapXrayPenetrators("anus", options);
		}

		// Colours
		// @ts-ignore
		CombatRenderer.generateBodyFilters(options);

		// Set animation speed
		if (V.enemytype === "machine") {
			switch (V.machine?.speed) {
				case 1:
					options.animKeyBase = "slow";
					break;
				case 2:
					options.animKeyBase = "fast";
					break;
				default:
					options.animKeyBase = "vfast";
					break;
			}
		} else {
			if (T.knotted || T.knotted_short) options.animKeyBase = "mid";
			else if (V.enemyarousal >= (V.enemyarousalmax / 5) * 4) options.animKeyBase = "vfast";
			else if (V.enemyarousal >= (V.enemyarousalmax / 5) * 3) options.animKeyBase = "fast";
			else if (V.enemyarousal >= (V.enemyarousalmax / 5) * 1) options.animKeyBase = "mid";
			else options.animKeyBase = "slow";
		}

		options.animKeyVagina = `sex-${combat.isVaginaActive("xray") ? "8f-" + options.animKeyBase : "1f-idle"}`;
		options.animKeyArse = `sex-${combat.isAnusActive("xray") ? "8f-" + options.animKeyBase : "1f-idle"}`;
		options.animKeyPenis = `sex-${combat.isPenisActive("xray") ? "8f-" + options.animKeyBase : "1f-idle"}`;

		return options;
	}

	/**
	 * @param {string} slot
	 * @param {XrayOptions} options
	 */
	static mapXrayPenetrators(slot, options) {
		options[slot] = {};

		/* Type of NPC penetrating the player */
		options[slot].npcType =
			V.enemytype === "machine" ? "machine" : ["tentacle", "tentacledeep"].includes(V[slot + "state"]) ? "tentacle" : V.NPCList[V[slot + "target"]].type;

		/* slot is being doublepenetrated or not */
		options[slot].doublePen =
			V[slot + "state"] === "doublepenetrated" &&
			V.NPCList[V[slot + "target"]].penis === slot + "double" &&
			V.NPCList[V[slot + "doubletarget"]].penis === slot + "double";

		/* If NPC pulled out, show empty xray base for that turn */
		if (T["pullOut" + slot.toUpperFirst()]) {
			options[slot].npcType = "none";
			options[slot].size = null;
			options[slot].base = slot === "vagina" && V.orgasmdown >= 1 ? "twitching" : "rest";
		} else {
			options[slot].base = "sex";
			options[slot].npc = V[slot + "target"];
		}

		/* Penetrator control */
		switch (options[slot].npcType) {
			case "none":
				options[slot].penetratorSprite = "";
				options[slot].size = null;
				options.showNpcPenis = false;
				options.filters[slot + "Penetrator"] = "";
				break;
			case "machine":
				options[slot].penetratorSprite = "tentacle";
				options[slot].size = 3;
				options[slot].tentacleColour = V.tentacleColour || "tentacles-peach";
				options.filters[slot + "Penetrator"] = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					options[slot].tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
				break;
			case "tentacle":
				options[slot].penetratorSprite = "tentacle";
				for (let tentacleIndex = 0; tentacleIndex < V.tentacles.max; tentacleIndex++) {
					if (V.tentacles[tentacleIndex] !== undefined && V.tentacles[tentacleIndex].fullDesc === V["tentacle" + slot.toUpperFirst()]) {
						options[slot].size = V.tentacles[tentacleIndex].size;
						break;
					}
				}
				options[slot].tentacleColour = V.tentacleColour || "tentacles-purple";
				options.filters[slot + "Penetrator"] = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					options[slot].tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
				break;
			case "human":
			case "plant":
				/* For DP, bigger penis MUST be the primary target sprite. */
				if (options[slot].doublePen) {
					options[slot].npc =
						V.NPCList[V[slot + "target"]].penissize <= V.NPCList[V[slot + "doubletarget"]].penissize
							? V[slot + "doubletarget"]
							: V[slot + "target"];
					options[slot].npc2 = options[slot].npc === V[slot + "doubletarget"] ? V[slot + "target"] : V[slot + "doubletarget"];
				} else {
					options[slot].npc = V[slot + "target"];
				}

				this.mapXrayHumanPenis("npc", slot, options);
				if (options[slot].npc2) {
					this.mapXrayHumanPenis("npc2", slot, options);

					/* size 1 and 5 penises are supposed to be impossible to dp with, so just in case, make sure sprites don't error out */
					Math.clamp(options[slot].size, 2, 4);
					Math.clamp(options[slot].size2, 2, 4);
				}
				break;
			case "horse":
			case "centaur":
			case "cow":
			case "cowgirl":
			case "bull":
			case "bullboy":
				options[slot].penetratorSprite = "horse";
				options[slot].size = 5;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			case "dog":
			case "doggirl":
			case "dogboy":
			case "fox":
			case "foxgirl":
			case "foxboy":
			case "wolf":
			case "wolfgirl":
			case "wolfboy":
				options[slot].penetratorSprite = V.ejaculating === 1 && (T.knotted || T.knotted_short) ? "knottedFull" : "knotted";
				options[slot].size = options[slot].npcType.includes("wolf") ? 3 : 2;
				options[slot].base = V.ejaculating === 1 && (T.knotted || T.knotted_short) ? "knotting" : options[slot].base;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			case "pig":
			case "piggirl":
			case "pigboy":
			case "boar":
			case "boargirl":
			case "boarboy":
				options[slot].penetratorSprite = "spiral";
				options[slot].size = options[slot].npcType.includes("boar") ? 3 : 2;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			case "hawk":
			case "harpy":
			case "cat":
			case "catgirl":
			case "catboy":
			case "dolphin":
			case "dolphingirl":
			case "dolphinboy":
				options[slot].penetratorSprite = "point";
				options[slot].size = 2;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			case "bear":
			case "beargirl":
			case "bearboy":
			case "creature":
			case "horned girl":
			case "horned boy":
				options[slot].penetratorSprite = "tentacle";
				options[slot].size = 3;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			case "lizard":
			case "lizardgirl":
			case "lizardboy":
				options[slot].penetratorSprite = "penis";
				options[slot].size = 2;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			default:
				Errors.report("Invalid npc for xray image. options[slot].npcType");
				break;
		}

		options[slot].isCumActive =
			(V.ejaculating === 1 &&
				((wearingCondom(options[slot].npc) !== "worn" && !options[slot].npc.strapon) ||
					(wearingCondom(options[slot].npc2) !== "worn" && !options[slot].npc2.strapon))) ||
			V[slot + "state"] === "tentacledeep";

		if (options[slot].base !== "knotting" && (setup.bodyliquid.combined("vagina") >= 1 || options[slot].isCumActive)) {
			options[slot].cum = Math.clamp(setup.bodyliquid.combined("vagina"), 1, 5);
			options.showCum = true;
		}
	}

	/**
	 * @param {string} npc
	 * @param {object} slot
	 * @param {XrayOptions} options
	 */
	static mapXrayHumanPenis(npc, slot, options) {
		const index = npc === "npc2" ? "2" : "";
		if (npcHasStrapon(options[slot][npc])) {
			options[slot][npc].strapon = true;
			if (V.NPCList[options[slot][npc]].penisdesc.includes("horse")) {
				options[slot]["penetratorSprite" + index] = "horseGray";
				options[slot]["size" + index] = 5;
			} else if (V.NPCList[options[slot][npc]].penisdesc.includes("knotted")) {
				options[slot]["penetratorSprite" + index] = "knotted";
				options[slot]["size" + index] = 3;
			} else if (V.NPCList[options[slot][npc]].penisdesc.includes("tentacle")) {
				options[slot]["penetratorSprite" + index] = "tentacle";
				options[slot]["size" + index] = V.NPCList[options[slot][npc]].penissize;
			} else if (V.NPCList[options[slot][npc]].penisdesc.includes("dolphin")) {
				options[slot]["penetratorSprite" + index] = "point";
				options[slot]["size" + index] = 2;
			} else {
				options[slot]["penetratorSprite" + index] = "penis";
				options[slot]["size" + index] = V.NPCList[options[slot][npc]].penissize;
			}
		} else {
			options[slot]["penetratorSprite" + index] = "penis";
			options[slot]["size" + index] = V.NPCList[options[slot][npc]].penissize;
			if (wearingCondom(options[slot][npc])) {
				options.filters[slot + "Condom" + index] = CombatRenderer.getCondomOptions(V.NPCList[options[slot][npc]].condom).colour;
			}
		}
		options.filters[slot + "Penetrator" + index] = NpcCombatMapper.getNpcPenetratorFilter(V.NPCList[options[slot][npc]]);

		return options[slot];
	}

	/**
	 * @param {XrayOptions} options
	 */
	static mapXrayPlayerPenis(options) {
		options.penis = {};

		/* if player penetrating others */
		options.penis.penetratedType =
			V.enemytype === "machine"
				? "machine"
				: V.penisstate !== 0 && ["tentacle", "tentacledeep"].includes(V.penisstate)
				? "tentacle"
				: V.NPCList[V.penistarget].type;

		const playerPenisType = playerHasStrapon() ? "strap" : V.player.gender === "f" ? "parasite" : "penis";
		options.penis.type = playerPenisType;
		options.penis.playerSprite = options.penis.type === "parasite" ? "parasite" : "penis";
		options.penis.size = playerHasStrapon() && V.worn.under_lower.size !== undefined ? V.worn.under_lower.size : V.player.penissize;
		options.penis.state = V.penisstate;

		options.penis.condom = V.player.condom;
		if (options.penis.condom.colour) {
			options.filters.playerCondom = CombatRenderer.lookupColour(
				setup.colours.condom_map,
				options.penis.condom.colour,
				"condom",
				"condom_custom",
				"condom"
			);
		}

		options.penis.cum = options.penis.cum || 0;
		if (V.orgasmdown >= 1 && V.orgasmcount <= 24 && V.femaleclimax !== 1 && wearingCondom("player") !== "worn" && !playerHasStrapon()) {
			options.penis.cum += V.semen_amount > (V.semen_volume / 24) * 18 ? 2 : 1;
			options.penis.cum = Math.clamp(options.penis.cum, 0, 5);
			options.penis.isCumActive = true;
			options.showCum = true;
		}

		if (["tentacle", "tentacledeep"].includes(options.penis.state)) {
			if (options.penis.penetratedType === "machine") {
				options.penis.penetrated = "vaginal";
				options.penis.tentacleColour = V.tentacleColour || "tentacles-peach";
				options.filters.penisPenetrated = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					options.penis.tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
			} else {
				options.penis.penetrated = "vaginal";
				options.penis.tentacleColour = V.tentacleColour || "tentacles-purple";
				options.filters.penisPenetrated = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					options.penis.tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
			}
		} else {
			options.penis.penetrated = options.penis.state === "otheranus" ? "anal" : "vaginal";
		}
		options.penis.base = "sex";
		options.showNpcVagina = options.penis.penetrated === "vaginal";
		options.showNpcArse = options.penis.penetrated === "anal";

		return options.penis;
	}
}
window.XrayCombatMapper = XrayCombatMapper;
