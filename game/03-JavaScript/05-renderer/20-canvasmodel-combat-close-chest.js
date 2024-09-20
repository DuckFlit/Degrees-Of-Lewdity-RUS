// @ts-check
/* globals CloseOptions */

/**
 * @type {CanvasModelOptions<CloseOptions>}
 */
const combatCloseChest = {
	name: "combatCloseChest",
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
			showChest: false,
			filters: {
				worn: {},
			},
		};
	},
	preprocess(options) {
		getCloseOptions(options);
	},
	layers: {
		chest: {
			srcfn(options) {
				return `${options.src}chest/${options.chest.base}.png`;
			},
			showfn(options) {
				return !!options.showChest;
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filters: ["body"],
			z: ZIndices.closeBase,
		},
		breasts: {
			srcfn(options) {
				return `${options.src}chest/${options.chest.breasts}-job.png`;
			},
			showfn(options) {
				return !!options.showChest && options.chest.base === "base-job" && V.player.breastsize > 0;
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filters: ["body"],
			z: ZIndices.closeNpc + 1,
		},
		npc: {
			srcfn(options) {
				return `${options.src}chest/npc/${options.chest.npc}.png`;
			},
			showfn(options) {
				return !!options.showChest && ["penis", "tentacle"].includes(V.chestuse);
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filtersfn(options) {
				return options.chest.npc === "tentacle" ? ["chestTentacle"] : ["chestNpc"];
			},
			alphafn(options) {
				const isWraith = ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour);
				return options.chest.npc === "tentacle" && isWraith ? 0.8 : 1;
			},
			brightnessfn(options) {
				const isWraith = ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour);
				return options.chest.npc === "tentacle" && isWraith ? 0.2 : 0;
			},
			z: ZIndices.closeNpc,
		},
		npcCondom: {
			srcfn(options) {
				return `${options.src}chest/npc/penis-condom.png`;
			},
			showfn(options) {
				return !!options.showChest && options.chest.npc === "penis" && !!options.chest.condom;
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filters: ["chestCondom"],
			alpha: 0.4,
			z: ZIndices.closeNpc,
		},
	},
};
Renderer.CanvasModels.combatCloseChest = combatCloseChest;
