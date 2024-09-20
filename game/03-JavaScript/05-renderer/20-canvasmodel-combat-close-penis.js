// @ts-check
/* globals CloseOptions */

/**
 * @type {CanvasModelOptions<CloseOptions>}
 */
const combatClosePenis = {
	name: "combatClosePenis",
	width: 64,
	height: 64,
	frames: 6,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return {
			root: "img/newsex/close/",
			position: "missionary",
			showPenis: false,
			penis: {},
			filters: {
				worn: {},
			},
		};
	},
	preprocess(options) {
		getCloseOptions(options);
	},
	layers: {
		base: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/base-${V.player.vaginaExist ? "herm" : "penis"}.png`;
			},
			showfn(options) {
				return !!options.showPenis;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["body"],
			z: ZIndices.closeBase,
		},
		panties: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/panties.png`;
			},
			showfn(options) {
				return !!options.showPenis && V.worn.under_lower.state === "totheside";
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["worn_under_lower_main"],
			z: ZIndices.closeWorn,
		},
		penis: {
			srcfn(options) {
				if (window.playerHasStrapon()) {
					options.pcPenis = V.worn.under_lower.name === "strap-on knotted cock" ? "strapon-knotted" : "strapon-dick";
				} else if (playerChastity("cage")) {
					options.pcPenis = options.penis.chastityPenis;
				} else if (["beast", "beast-oral"].includes(options.penis.npc)) {
					options.pcPenis = `${options.penis.size}-${options.penis.type}-${options.penis.state}`;
				} else {
					options.pcPenis = `${options.penis.size}-${options.penis.type}`;
				}
				return `${options.src}penis/${options.position}/${options.pcPenis}.png`;
			},
			showfn(options) {
				const concealed = V.worn.genitals.type.includes("hidden") || V.worn.genitals.name === "chastity parasite";
				return !!options.showPenis && !concealed;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["body"],
			z: ZIndices.closeGenitals + 4,
		},
		condom: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/${options.penis.size}-condom-${V.player.condom.type}.png`;
			},
			showfn(options) {
				return !!options.showPenis && !!options.penis.condom;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			alpha: 0.4,
			filters: ["condom"],
			z: ZIndices.closeGenitals + 4,
		},
		parasite: {
			srcfn(options) {
				const panties = V.earSlime.focus === "impregnation" ? "shorts" : "panties";
				const herm = V.player.vaginaExist ? "-herm" : "";
				return `${options.src}penis/${options.position}/parasite-${panties}${herm}.png`;
			},
			showfn(options) {
				return !!options.showPenis && (V.parasite.clit.name === "parasite" || V.parasite.penis.name === "parasite");
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["parasitePanties"],
			z: ZIndices.closeWornUnder,
		},
		parasiteBalls: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/parasite-balls.png`;
			},
			showfn(options) {
				return (
					!!options.showPenis &&
					!!V.player.ballsExist &&
					V.player.gender === "m" &&
					(V.parasite.clit.name === "parasite" || V.parasite.penis.name === "parasite") &&
					["mixed", "impregnation"].includes(V.earSlime.focus)
				);
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["parasitePanties"],
			z: ZIndices.closeWornUnder,
		},
		chastity: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/${options.penis.chastityDevice}.png`;
			},
			showfn(options) {
				return !!options.showPenis && !!playerChastity("penis");
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filtersfn(options) {
				return options.penis.chastityDevice.includes("parasite") ? ["parasitePanties"] : [];
			},
			z: ZIndices.closeWorn,
		},
		penetratedNpc: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/npc/${options.penis.npc}-${options.penis.state}.png`;
			},
			showfn(options) {
				return !!options.showPenis && !!options.penis.npc;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filtersfn(options) {
				return options.penis.npc === "tentacle" ? ["penisTentacle"] : ["penisNpc"];
			},
			alphafn(options) {
				return options.penis.npc === "tentacle" && ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour) ? 0.4 : 1;
			},
			z: ZIndices.closeNpc,
		},
		cum: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/npc/${options.penis.npc}-cum.png`;
			},
			showfn(options) {
				return !!options.showPenis && options.penis.npc === "beast-oral" && V.orgasmdown >= 1;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["parasitePanties"],
			z: ZIndices.closeCum,
		},
	},
};
Renderer.CanvasModels.combatClosePenis = combatClosePenis;
