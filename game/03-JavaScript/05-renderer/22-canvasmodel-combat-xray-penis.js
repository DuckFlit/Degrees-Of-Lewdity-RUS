// @ts-check
/* globals CombatRenderer, XrayCombatMapper, XrayOptions */

/**
 * @type {CanvasModelOptions<XrayOptions>}
 */
const combatXrayPenis = {
	name: "combatXrayPenis",
	width: 128,
	height: 60,
	scale: true,
	frames: 8,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return { ...XrayCombatMapper.generateOptions(), ...this.metadata };
	},
	preprocess(options) {
		XrayCombatMapper.mapXrayOptions(options);
	},
	layers: {
		base: {
			srcfn(options) {
				const base = ["machine", "tentacle"].includes(options.penis.penetratedType) ? options.penis.base + "_tentacle" : options.penis.base;
				const baseSize = options.penis.size ? "_size" + options.penis.size : "";
				return `${options.src}${options.penis.penetrated}/${base}${baseSize}.png`;
			},
			showfn(options) {
				return options.penis.penetrated === "vaginal" ? !!options.showNpcVagina : !!options.showNpcArse;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["penisPenetrator"],
			z: CombatRenderer.indices.xrayBase,
		},
		playerPenis: {
			srcfn(options) {
				const playerPenis = options.penis.playerSprite;
				const size = options.penis.size ? "_size" + options.penis.size : "";
				return `${options.src}${options.penis.penetrated}/${playerPenis}${size}.png`;
			},
			showfn(options) {
				return !!options.showPcPenis;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["body"],
			z: CombatRenderer.indices.xrayPenetrator,
		},
		playerCum: {
			srcfn(options) {
				const size = options.penis.size ? "_size" + options.penis.size : "";
				const cumAmt = options.penis.penetrated === "vaginal" ? "_cum" + options.penis.cum : "_cum";
				return `${options.src}${options.penis.penetrated}/cum/${options.penis.base}${size}${cumAmt}.png`;
			},
			showfn(options) {
				return !!options.penis.showCum;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: [],
			z: CombatRenderer.indices.xrayCum,
		},
		playerEjac: {
			srcfn(options) {
				const cumSize = options.penis.size ? "_size" + options.penis.size + "_cumming" : "";
				return `${options.src}${options.penis.penetrated}/cum/${options.penis.base}${cumSize}.png`;
			},
			showfn(options) {
				return !!options.penis.showCum && !!options.penis.isCumActive;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: [],
			z: CombatRenderer.indices.xrayEjac,
		},
		playerCondom: {
			srcfn(options) {
				const conSize = "_size" + options.penis.size;
				return `${options.src}${options.penis.penetrated}/tentacle${conSize}.png`;
			},
			showfn(options) {
				return !!options.showPcPenis && !!options.penis.condom;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			alpha: 0.4,
			filters: ["playerCondom"],
			z: CombatRenderer.indices.xrayCondom,
		},
	},
};
Renderer.CanvasModels.combatXrayPenis = combatXrayPenis;
