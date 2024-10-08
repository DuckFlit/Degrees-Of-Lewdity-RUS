// @ts-check
/* globals CombatRenderer, XrayCombatMapper, XrayOptions, CanvasModelLayers */

/**
 * @type {CanvasModelOptions<XrayOptions>}
 */
const combatXrayVagina = {
	name: "combatXrayVagina",
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
		vagina: {
			srcfn(options) {
				const baseSize = options.vagina.size ? "_size" + options.vagina.size : "";
				const baseSizeDP = options.vagina.doublePen ? "_dp" + options.vagina.size2 : "";
				return `${options.src}vaginal/${options.vagina.base}${baseSize}${baseSizeDP}.png`;
			},
			showfn(options) {
				return !!options.showPcVagina;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: [],
			z: CombatRenderer.indices.xrayBase,
		},
		penetrator: xrayVaginaPenetrator("npc"),
		penetrator2: xrayVaginaPenetrator("npc2"),
		condom: xrayVaginaCondom("npc"),
		condom2: xrayVaginaCondom("npc2"),
		cum: {
			srcfn(options) {
				const baseSize = options.vagina.size ? "_size" + options.vagina.size : "";
				const dp = options.vagina.doublePen ? "_dp" : "";
				const cumAmt = "_cum" + options.vagina.cum;
				return `${options.src}vaginal/cum/${options.vagina.base}${baseSize}${dp}${cumAmt}.png`;
			},
			showfn(options) {
				return !!options.showCum;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: [],
			z: CombatRenderer.indices.xrayCum,
		},
		ejaculating: {
			srcfn(options) {
				const cumSize = options.vagina.size ? "_size" + options.vagina.size + "_cumming" : "";
				return `${options.src}vaginal/cum/${options.vagina.base}${cumSize}.png`;
			},
			showfn(options) {
				return !!options.showCum && !!options.vagina.isCumActive;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: [],
			z: CombatRenderer.indices.xrayEjac,
		},
	},
};

/**
 * @param {string} npc
 * @param {CanvasModelLayers<XrayOptions>} overrideOptions
 * @returns {CanvasModelLayers<XrayOptions>}
 */
function xrayVaginaPenetrator(npc, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<XrayOptions>}
	 */
	const defaults = {
		srcfn(options) {
			const penSize = "_size" + options.vagina.size;
			const dp = options.vagina.doublePen && npc === "npc2" ? "_dp" : "";
			return `${options.src}vaginal/${options.vagina.penetratorSprite}${penSize}${dp}.png`;
		},
		showfn(options) {
			return !!options.showNpcPenis && !!options.vagina[npc];
		},
		animationfn(options) {
			return options.animKeyVagina;
		},
		filters: npc === "npc2" ? ["vaginaPenetrator2"] : ["vaginaPenetrator"],
		desaturatefn(options) {
			return !!options.vagina[npc].strapon;
		},
		brightnessfn(options) {
			return options.vagina[npc].strapon ? -0.25 : 0;
		},
		z: npc === "npc2" ? CombatRenderer.indices.xrayPenetrator2 : CombatRenderer.indices.xrayPenetrator,
	};
	return Object.assign(defaults, overrideOptions);
}

/**
 * @param {string} npc
 * @param {CanvasModelLayers<XrayOptions>} overrideOptions
 * @returns {CanvasModelLayers<XrayOptions>}
 */
function xrayVaginaCondom(npc, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<XrayOptions>}
	 */
	const defaults = {
		srcfn(options) {
			const conSize = "_size" + options.vagina.size;
			const dp = options.vagina.doublePen && npc === "npc2" ? "_dp" : "";
			return `${options.src}vaginal/tentacle${conSize}${dp}.png`;
		},
		showfn(options) {
			const target = npc === "npc2" ? V.vaginadoubletarget : V.vaginatarget;
			return !!options.showNpcPenis && !!options.vagina[npc] && !!V.NPCList[target].condom.worn;
		},
		animationfn(options) {
			return options.animKeyVagina;
		},
		alpha: 0.4,
		filters: npc === "npc2" ? ["vaginaCondom2"] : ["vaginaCondom"],
		z: npc === "npc2" ? CombatRenderer.indices.xrayCondom2 : CombatRenderer.indices.xrayCondom,
	};
	return Object.assign(defaults, overrideOptions);
}
Renderer.CanvasModels.combatXrayVagina = combatXrayVagina;
