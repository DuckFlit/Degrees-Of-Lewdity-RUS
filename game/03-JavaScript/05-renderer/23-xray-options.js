// @ts-check
/* global CombatRenderer, NpcCombatMapper, Condom */

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
 * @property {XrayPlayerPenetrator} penis Player penis and penetrated.
 * @property {XrayNpcPenetrator} vagina Player vagina and penetrators.
 * @property {XrayNpcPenetrator} anus Player anus and penetrators.
 * @property {object} filters The filters for layers.
 * @property {string} animKeyBase
 * @property {string} animKeyVagina
 * @property {string} animKeyPenis
 * @property {string} animKeyArse
 */

/**
 * @typedef XrayPlayerPenetrator
 * @property {string} base
 * @property {string} penetratedType
 * @property {string} type
 * @property {"anal" | "vaginal"} penetrated
 * @property {string} playerSprite
 * @property {string} tentacleColour
 * @property {number} size
 * @property {string | 0} state
 * @property {Condom} condom
 * @property {number} cum
 * @property {boolean} isCumActive
 * @property {boolean} showCum
 */

/**
 * @typedef XrayNpcPenetrator
 * @property {string} base
 * @property {number=} npc
 * @property {number=} npc2
 * @property {string} npcType
 * @property {number} size
 * @property {number} size2
 * @property {boolean} doublePen
 * @property {string} penetratorSprite
 * @property {string} tentacleColour
 * @property {boolean} isCumActive
 * @property {boolean} showCum
 * @property {number} cum
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
			// For the default objects below, replace default values where applicable
			// You may want to set these properties as nullable/undefinable in the typings
			vagina: {
				base: "",
				cum: 0,
				doublePen: false,
				isCumActive: false,
				showCum: false,
				npcType: "",
				penetratorSprite: "",
				size: 0,
				size2: 0,
				tentacleColour: "tentacle-purple",
			},
			anus: {
				base: "",
				cum: 0,
				doublePen: false,
				isCumActive: false,
				showCum: false,
				npcType: "",
				penetratorSprite: "",
				size: 0,
				size2: 0,
				tentacleColour: "tentacle-purple",
			},
			penis: {
				base: "",
				cum: 0,
				isCumActive: false,
				size: 0,
				tentacleColour: "tentacle-purple",
				condom: {
					state: "",
					colour: "",
					type: "",
					willUse: false,
					worn: false,
				},
				penetrated: "vaginal",
				penetratedType: "",
				playerSprite: "",
				showCum: false,
				state: "",
				type: "",
			},
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
			XrayCombatMapper.mapXrayPlayerPenis(options, options.penis);
		}
		if (options.showPcVagina) {
			XrayCombatMapper.mapXrayPenetrators(options, options.vagina, "vagina");
		}
		if (options.showPcArse) {
			XrayCombatMapper.mapXrayPenetrators(options, options.anus, "anus");
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
	 * @param {XrayOptions} options
	 * @param {XrayNpcPenetrator} penetrator
	 * @param {"vagina" | "anus" | "penis"} slot
	 */
	static mapXrayPenetrators(options, penetrator, slot) {
		/* Type of NPC penetrating the player */
		penetrator.npcType =
			V.enemytype === "machine" ? "machine" : ["tentacle", "tentacledeep"].includes(V[slot + "state"]) ? "tentacle" : V.NPCList[V[slot + "target"]].type;

		/* slot is being doublepenetrated or not */
		penetrator.doublePen =
			V[slot + "state"] === "doublepenetrated" &&
			V.NPCList[V[slot + "target"]].penis === slot + "double" &&
			V.NPCList[V[slot + "doubletarget"]].penis === slot + "double";

		/* If NPC pulled out, show empty xray base for that turn */
		if (T["pullOut" + slot.toUpperFirst()]) {
			penetrator.npcType = "none";
			penetrator.size = 0;
			penetrator.base = slot === "vagina" && V.orgasmdown >= 1 ? "twitching" : "rest";
		} else {
			penetrator.base = "sex";
			penetrator.npc = V[slot + "target"];
		}

		/* Penetrator control */
		switch (penetrator.npcType) {
			case "none":
				penetrator.penetratorSprite = "";
				penetrator.size = 0;
				options.showNpcPenis = false;
				options.filters[slot + "Penetrator"] = "";
				break;
			case "machine":
				penetrator.penetratorSprite = "tentacle";
				penetrator.size = 3;
				penetrator.tentacleColour = V.tentacleColour || "tentacles-peach";
				options.filters[slot + "Penetrator"] = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					penetrator.tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
				break;
			case "tentacle":
				penetrator.penetratorSprite = "tentacle";
				for (let tentacleIndex = 0; tentacleIndex < V.tentacles.max; tentacleIndex++) {
					if (V.tentacles[tentacleIndex] !== undefined && V.tentacles[tentacleIndex].fullDesc === V["tentacle" + slot.toUpperFirst()]) {
						penetrator.size = V.tentacles[tentacleIndex].size;
						break;
					}
				}
				penetrator.tentacleColour = V.tentacleColour || "tentacles-purple";
				options.filters[slot + "Penetrator"] = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					penetrator.tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
				break;
			case "human":
			case "plant":
				/* For DP, bigger penis MUST be the primary target sprite. */
				if (penetrator.doublePen) {
					penetrator.npc =
						V.NPCList[V[slot + "target"]].penissize <= V.NPCList[V[slot + "doubletarget"]].penissize
							? V[slot + "doubletarget"]
							: V[slot + "target"];
					penetrator.npc2 = penetrator.npc === V[slot + "doubletarget"] ? V[slot + "target"] : V[slot + "doubletarget"];
				} else {
					penetrator.npc = V[slot + "target"];
				}

				this.mapXrayHumanPenis("npc", slot, options);
				if (penetrator.npc2) {
					this.mapXrayHumanPenis("npc2", slot, options);

					/* size 1 and 5 penises are supposed to be impossible to dp with, so just in case, make sure sprites don't error out */
					Math.clamp(penetrator.size, 2, 4);
					Math.clamp(penetrator.size2, 2, 4);
				}
				break;
			case "horse":
			case "centaur":
			case "cow":
			case "cowgirl":
			case "bull":
			case "bullboy":
				penetrator.penetratorSprite = "horse";
				penetrator.size = 5;
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
				penetrator.penetratorSprite = V.ejaculating === 1 && (T.knotted || T.knotted_short) ? "knottedFull" : "knotted";
				penetrator.size = penetrator.npcType.includes("wolf") ? 3 : 2;
				penetrator.base = V.ejaculating === 1 && (T.knotted || T.knotted_short) ? "knotting" : penetrator.base;
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
				penetrator.penetratorSprite = "spiral";
				penetrator.size = penetrator.npcType.includes("boar") ? 3 : 2;
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
				penetrator.penetratorSprite = "point";
				penetrator.size = 2;
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
				penetrator.penetratorSprite = "tentacle";
				penetrator.size = 3;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			case "lizard":
			case "lizardgirl":
			case "lizardboy":
				penetrator.penetratorSprite = "penis";
				penetrator.size = 2;
				options.filters[slot + "Penetrator"] = {
					blend: "#ec3535",
					blendMode: "multiply",
					desaturate: true,
				};
				break;
			default:
				Errors.report("Invalid npc for xray image. penetrator.npcType");
				break;
		}

		penetrator.isCumActive = false;
		if (V.ejaculating === 1 || V[slot + "state"] === "tentacledeep") {
			const npc1HasSperm = wearingCondom(penetrator.npc) !== "worn" && !npcHasStrapon(penetrator.npc);
			const npc2HasSperm = wearingCondom(penetrator.npc2) !== "worn" && !npcHasStrapon(penetrator.npc2);
			// Should this also check if NCPs are ejaculating? Or does $ejaculating = 1 do that
			penetrator.isCumActive = npc1HasSperm || npc2HasSperm || V[slot + "state"] === "tentacledeep";
		}

		if (penetrator.base !== "knotting" && (setup.bodyliquid.combined(slot) >= 1 || penetrator.isCumActive)) {
			penetrator.cum = Math.clamp(setup.bodyliquid.combined(slot), 1, 5);
			penetrator.showCum = true;
		}
	}

	/**
	 * @param {"npc" | "npc2"} npc
	 * @param {"vagina" | "anus" | "penis"} slot
	 * @param {XrayOptions} options
	 */
	static mapXrayHumanPenis(npc, slot, options) {
		const index = npc === "npc2" ? "2" : "";
		const penetrator = options[slot];
		if (npcHasStrapon(options[slot][npc])) {
			penetrator[npc + "Strapon"] = true;
			if (V.NPCList[penetrator[npc]].penisdesc.includes("horse")) {
				penetrator["penetratorSprite" + index] = "horseGray";
				penetrator["size" + index] = 5;
			} else if (V.NPCList[penetrator[npc]].penisdesc.includes("knotted")) {
				penetrator["penetratorSprite" + index] = "knotted";
				penetrator["size" + index] = 3;
			} else if (V.NPCList[penetrator[npc]].penisdesc.includes("tentacle")) {
				penetrator["penetratorSprite" + index] = "tentacle";
				penetrator["size" + index] = V.NPCList[penetrator[npc]].penissize;
			} else if (V.NPCList[penetrator[npc]].penisdesc.includes("dolphin")) {
				penetrator["penetratorSprite" + index] = "point";
				penetrator["size" + index] = 2;
			} else {
				penetrator["penetratorSprite" + index] = "penis";
				penetrator["size" + index] = V.NPCList[penetrator[npc]].penissize;
			}
		} else {
			penetrator["penetratorSprite" + index] = "penis";
			penetrator["size" + index] = V.NPCList[penetrator[npc]].penissize;
			if (wearingCondom(penetrator[npc])) {
				options.filters[slot + "Condom" + index] = CombatRenderer.getCondomOptions(V.NPCList[penetrator[npc]].condom).colour;
			}
		}
		options.filters[slot + "Penetrator" + index] = NpcCombatMapper.getNpcPenetratorFilter(V.NPCList[penetrator[npc]]);

		return penetrator;
	}

	/**
	 * @param {XrayOptions} options
	 * @param {XrayPlayerPenetrator} penetrator
	 */
	static mapXrayPlayerPenis(options, penetrator) {
		/* if player penetrating others */
		penetrator.penetratedType =
			V.enemytype === "machine"
				? "machine"
				: V.penisstate !== 0 && ["tentacle", "tentacledeep"].includes(V.penisstate)
				? "tentacle"
				: V.NPCList[V.penistarget].type;

		const playerPenisType = playerHasStrapon() ? "strap" : V.player.gender === "f" ? "parasite" : "penis";
		penetrator.type = playerPenisType;
		penetrator.playerSprite = penetrator.type === "parasite" ? "parasite" : "penis";
		penetrator.size = playerHasStrapon() && V.worn.under_lower.size !== undefined ? V.worn.under_lower.size : V.player.penissize;
		penetrator.state = V.penisstate;

		if (V.player.condom) {
			penetrator.condom = V.player.condom;
			if (penetrator.condom.colour) {
				options.filters.playerCondom = CombatRenderer.lookupColour(
					setup.colours.condom_map,
					penetrator.condom.colour,
					"condom",
					"condom_custom",
					"condom"
				);
			}
		}

		penetrator.cum = penetrator.cum || 0;
		if (V.orgasmdown >= 1 && V.orgasmcount <= 24 && V.femaleclimax !== 1 && wearingCondom("player") !== "worn" && !playerHasStrapon()) {
			penetrator.cum += V.semen_amount > (V.semen_volume / 24) * 18 ? 2 : 1;
			penetrator.cum = Math.clamp(penetrator.cum, 0, 5);
			penetrator.isCumActive = true;
			penetrator.showCum = true;
		}

		if (penetrator.state && ["tentacle", "tentacledeep"].includes(penetrator.state)) {
			if (penetrator.penetratedType === "machine") {
				penetrator.penetrated = "vaginal";
				penetrator.tentacleColour = V.tentacleColour || "tentacles-peach";
				options.filters.penisPenetrated = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					penetrator.tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
			} else {
				penetrator.penetrated = "vaginal";
				penetrator.tentacleColour = V.tentacleColour || "tentacles-purple";
				options.filters.penisPenetrated = CombatRenderer.lookupColour(
					setup.colours.tentacle_map,
					penetrator.tentacleColour,
					"xrayTentacle",
					undefined,
					undefined
				);
			}
		} else {
			penetrator.penetrated = penetrator.state === "otheranus" ? "anal" : "vaginal";
		}
		penetrator.base = "sex";
		options.showNpcVagina = penetrator.penetrated === "vaginal";
		options.showNpcArse = penetrator.penetrated === "anal";

		return penetrator;
	}
}
window.XrayCombatMapper = XrayCombatMapper;
