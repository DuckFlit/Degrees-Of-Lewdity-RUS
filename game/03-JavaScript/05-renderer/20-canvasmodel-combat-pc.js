// @ts-check
/* global CombatRenderer, CombatPlayerOptions, PlayerCombatMapper, PlayerCanvasHelper */

/**
 * @type {CanvasModelOptions<CombatPlayerOptions>}
 */
const combatMainPc = {
	name: "combatMainPc",
	width: 256,
	height: 256,
	scale: true,
	frames: 4,
	/*
	 * http://patorjk.com/software/taag/#p=display&c=c&f=ANSI%20Regular&t=generated
	 *	 ██████  ███████ ███    ██ ███████ ██████   █████  ████████ ███████ ██████
	 *	██       ██      ████   ██ ██      ██   ██ ██   ██    ██    ██      ██   ██
	 *	██   ███ █████   ██ ██  ██ █████   ██████  ███████    ██    █████   ██   ██
	 *	██    ██ ██      ██  ██ ██ ██      ██   ██ ██   ██    ██    ██      ██   ██
	 *	 ██████  ███████ ██   ████ ███████ ██   ██ ██   ██    ██    ███████ ██████
	 */
	generatedOptions() {
		/* Ask Aim about how this could be used? */
		return [];
	},
	/*
	 *	██████  ███████ ███████  █████  ██    ██ ██      ████████ ███████
	 *	██   ██ ██      ██      ██   ██ ██    ██ ██         ██    ██
	 *	██   ██ █████   █████   ███████ ██    ██ ██         ██    ███████
	 *	██   ██ ██      ██      ██   ██ ██    ██ ██         ██         ██
	 *	██████  ███████ ██      ██   ██  ██████  ███████    ██    ███████
	 */
	defaultOptions() {
		const options = { ...PlayerCombatMapper.generateOptions(), ...this.metadata };
		return options;
	},
	/*
	 *	██████  ██████  ███████ ██████  ██████   ██████   ██████ ███████ ███████ ███████
	 *	██   ██ ██   ██ ██      ██   ██ ██   ██ ██    ██ ██      ██      ██      ██
	 *	██████  ██████  █████   ██████  ██████  ██    ██ ██      █████   ███████ ███████
	 *	██      ██   ██ ██      ██      ██   ██ ██    ██ ██      ██           ██      ██
	 *	██      ██   ██ ███████ ██      ██   ██  ██████   ██████ ███████ ███████ ███████
	 */
	preprocess(options) {
		PlayerCombatMapper.mapPlayerToOptions(options);
		if (V.debug) {
			// Save options for easy lookup
			CombatRenderer.options[this.name] = options;
		}
	},
	layers: {
		/*
		 *    ██████  ███████ ██████  ██    ██  ██████
		 *    ██   ██ ██      ██   ██ ██    ██ ██
		 *    ██   ██ █████   ██████  ██    ██ ██   ███
		 *    ██   ██ ██      ██   ██ ██    ██ ██    ██
		 *    ██████  ███████ ██████   ██████   ██████
		 */
		frameCount: {
			srcfn(options) {
				const frames = PlayerCombatMapper.getPcAnimationFrameCount(options);
				return `${options.root}${frames}f.png`;
			},
			showfn(options) {
				return options.isDebugging;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.near,
		},
		/*
		 *    ██    ██  ██████  ██████  ███████
		 *    ██    ██ ██    ██ ██   ██ ██
		 *    ██    ██ ██    ██ ██████  █████
		 *     ██  ██  ██    ██ ██   ██ ██
		 *      ████    ██████  ██   ██ ███████
		 */
		voreBack: {
			srcfn(options) {
				return `${options.src}vore/back-${options.vore.stage}.png`;
			},
			showfn(options) {
				return !!options.vore.show;
			},
			z: CombatRenderer.indices.far,
		},
		voreFront: {
			srcfn(options) {
				return `${options.src}vore/front-${options.vore.stage}.png`;
			},
			showfn(options) {
				return !!options.vore.show;
			},
			z: CombatRenderer.indices.near,
		},
		/*
		 *    ██████  ██████   ██████  ██████  ███████
		 *    ██   ██ ██   ██ ██    ██ ██   ██ ██
		 *    ██████  ██████  ██    ██ ██████  ███████
		 *    ██      ██   ██ ██    ██ ██           ██
		 *    ██      ██   ██  ██████  ██      ███████
		 */
		wall: {
			srcfn(options) {
				return `${options.root}prop/wall/wall.png`;
			},
			showfn(options) {
				return !!options.props.wall.show;
			},
			z: CombatRenderer.indices.near,
		},
		bench: {
			srcfn(options) {
				return `${options.root}prop/bench/${options.position}.png`;
			},
			showfn(options) {
				return !!options.props.bench.show;
			},
			z: 5,
		},
		examTable: {
			srcfn(options) {
				return `${options.root}prop/exam-table/${options.position}.png`;
			},
			showfn(options) {
				return !!options.props.examTable.show;
			},
			z: 5,
		},
		haybale: {
			srcfn(options) {
				return `${options.root}prop/haybale/haybale.png`;
			},
			showfn(options) {
				return !!options.props.haybale.show;
			},
			z: 5,
		},
		hospitalBed: {
			srcfn(options) {
				return `${options.root}prop/hospital-bed/${options.position}.png`;
			},
			showfn(options) {
				return !!options.props.hospitalBed.show;
			},
			z: 5,
		},
		hospitalBedRails: {
			srcfn(options) {
				return `${options.root}prop/hospital-bed/${options.position}-rails.png`;
			},
			showfn(options) {
				return !!options.props.hospitalBed.show;
			},
			z: 95,
		},
		ivBag: {
			srcfn(options) {
				return `${options.root}prop/iv-bag/${options.position}.png`;
			},
			showfn(options) {
				return !!options.props.ivBag.show;
			},
			z: 5,
		},
		milkTank: {
			srcfn(options) {
				const tank = options.props.milkTank;
				if (tank.isFull) {
					return `${options.root}prop/milk-tank/tank-full.png`;
				}
				return `${options.root}prop/milk-tank/tank.png`;
			},
			showfn(options) {
				return !!options.props.milkTank.show;
			},
			animation: "prop-4f-tank",
			z: 1,
		},
		milkTankVolume: {
			srcfn(options) {
				const tank = options.props.milkTank;
				return `${options.root}prop/milk-tank/${tank.volume}.png`;
			},
			showfn(options) {
				return !!options.props.milkTank.show;
			},
			animation: "prop-4f-tank",
			z: 3,
		},
		semenTank: {
			srcfn(options) {
				if (options.props.semenTank.isFull) {
					return `${options.root}prop/semen-tank/semen-full.png`;
				}
				return `${options.root}prop/semen-tank/semen.png`;
			},
			showfn(options) {
				const show = options.props.semenTank.show;
				return !!show;
			},
			animation: "prop-4f-tank",
			z: 2,
		},
		semenTankVolume: {
			srcfn(options) {
				const tank = options.props.semenTank;
				return `${options.root}prop/semen-tank/${tank.volume}.png`;
			},
			showfn(options) {
				const show = options.props.semenTank.show;
				return !!show;
			},
			animation: "prop-4f-tank",
			z: 2,
		},
		table: {
			srcfn(options) {
				return `${options.root}prop/table/${options.position}.png`;
			},
			showfn(options) {
				return !!options.props.table.show;
			},
			z: 5,
		},
		leash: {
			srcfn(options) {
				return `${options.root}prop/leash/${options.position}.png`;
			},
			showfn(options) {
				return !!options.props.leash.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.base,
		},
		neck_shackle: {
			srcfn(options) {
				return `${options.root}prop/shackles/${options.position}/neck.png`;
			},
			showfn(options) {
				return !!options.props.neck_shackle.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.base,
		},
		arm_shackle: {
			srcfn(options) {
				if (options.armBackPosition === "bound") return `${options.root}prop/shackles/${options.position}/arms_bound.png`;
				return `${options.root}prop/shackles/${options.position}/arms.png`;
			},
			showfn(options) {
				return !!options.props.arm_shackle.show || !!options.machines.arm_chains.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.frontArm + 1,
		},
		leg_shackle: {
			srcfn(options) {
				return `${options.root}prop/shackles/${options.position}/legs_${options.legFrontPosition}.png`;
			},
			showfn(options) {
				return !!options.props.leg_shackle.show || !!options.machines.leg_chains.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.frontLeg + 1,
		},
		rail: {
			srcfn(options) {
				return `${options.root}prop/rail/rails.png`;
			},
			showfn(options) {
				return !!options.props.rail.show;
			},
			z: CombatRenderer.indices.base,
		},
		pilloryBack: {
			srcfn(options) {
				const pillory = options.props.pillory;
				if (pillory.isDirty) {
					return `${options.root}prop/pillory/back-dirty.png`;
				}
				return `${options.root}prop/pillory/back-clean.png`;
			},
			showfn(options) {
				const pillory = options.props.pillory;
				return pillory.show && !pillory.hasHorse;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: 74,
		},
		pilloryFront: {
			srcfn(options) {
				const pillory = options.props.pillory;
				if (pillory.hasHorse) {
					return `${options.root}prop/pillory/front-horse.png`;
				}
				if (pillory.isDirty) {
					return `${options.root}prop/pillory/front-dirty.png`;
				}
				return `${options.root}prop/pillory/front-clean.png`;
			},
			showfn(options) {
				return options.props.pillory.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: 80,
		},
		pilloryTomatoes: {
			srcfn(options) {
				const pillory = options.props.pillory;
				return `${options.root}prop/pillory/tomato/${pillory.tomatoes}.png`;
			},
			showfn(options) {
				const pillory = options.props.pillory;
				return pillory.show && pillory.isDirty && [1, 2, 3, 4].includes(pillory.tomatoes);
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.head + 1,
		},
		/*
		 *    ███    ███  █████   ██████ ██   ██ ██ ███    ██ ███████ ███████
		 *    ████  ████ ██   ██ ██      ██   ██ ██ ████   ██ ██      ██
		 *    ██ ████ ██ ███████ ██      ███████ ██ ██ ██  ██ █████   ███████
		 *    ██  ██  ██ ██   ██ ██      ██   ██ ██ ██  ██ ██ ██           ██
		 *    ██      ██ ██   ██  ██████ ██   ██ ██ ██   ████ ███████ ███████
		 */
		breastMilker: {
			srcfn(options) {
				const size = Math.clamp(options.breastSize, 1, 4);
				return `${options.root}machine/milker/${options.position}/breasts-${size}.png`;
			},
			showfn(options) {
				return !!options.machines.breastMilker.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				if (options.position === "doggy") {
					return CombatRenderer.indices.base + 10;
				}
				return CombatRenderer.indices.base + 12;
			},
		},
		breastMilkerVolume: {
			srcfn(options) {
				const size = Math.clamp(options.breastSize, 1, 4);
				return `${options.root}machine/milker/${options.position}/breasts-${size}-milk.png`;
			},
			showfn(options) {
				return !!options.machines.breastMilker.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				if (options.position === "doggy") {
					return CombatRenderer.indices.base + 9;
				}
				return CombatRenderer.indices.base + 11;
			},
		},
		penisMilker: {
			srcfn(options) {
				return `${options.root}machine/milker/${options.position}/penis.png`;
			},
			showfn(options) {
				return !!options.machines.penisMilker.show;
			},
			animationfn(options) {
				return options.machineAnimKey;
			},
			z: CombatRenderer.indices.base + 7,
		},
		penisMilkerVolume: {
			srcfn(options) {
				return `${options.root}machine/milker/${options.position}/penis-semen.png`;
			},
			showfn(options) {
				return !!options.machines.penisMilker.show;
			},
			animationfn(options) {
				return options.machineAnimKey;
			},
			z: CombatRenderer.indices.base + 4,
		},
		tattooMachine: {
			srcfn(options) {
				return `${options.root}machine/tattoo/${options.position}/${options.machines.tattoo.state}.png`;
			},
			showfn(options) {
				return !!options.machines.tattoo.show;
			},
			animationfn(options) {
				return options.machineAnimKey;
			},
			z: CombatRenderer.indices.base + 4,
		},
		dildoVaginal: {
			srcfn(options) {
				return `${options.root}machine/z-vaginal/${options.position}/${options.machines.vaginal.state}.png`;
			},
			showfn(options) {
				return !!options.machines.vaginal.show;
			},
			animationfn(options) {
				return options.machineAnimKey;
			},
			z: CombatRenderer.indices.backLowerOverwear + 1,
		},
		dildoAnal: {
			srcfn(options) {
				return `${options.root}machine/z-anal/${options.position}/${options.machines.anal.state}.png`;
			},
			showfn(options) {
				return !!options.machines.anal.show;
			},
			animationfn(options) {
				return options.machineAnimKey;
			},
			z: CombatRenderer.indices.backLowerOverwear + 1,
		},
		/*
		 *    ████████ ███████ ███    ██ ████████  █████   ██████ ██      ███████ ███████
		 *       ██    ██      ████   ██    ██    ██   ██ ██      ██      ██      ██
		 *       ██    █████   ██ ██  ██    ██    ███████ ██      ██      █████   ███████
		 *       ██    ██      ██  ██ ██    ██    ██   ██ ██      ██      ██           ██
		 *       ██    ███████ ██   ████    ██    ██   ██  ██████ ███████ ███████ ███████
		 */
		tentacleAnal: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.anus.state}.png`;
			},
			showfn(options) {
				return options.tentacles.anus.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleBreasts: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.breasts.state}.png`;
			},
			showfn(options) {
				return options.tentacles.breasts.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleFeet: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.feet.state}.png`;
			},
			showfn(options) {
				return options.tentacles.feet.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleLeftArm: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.backArm.state}.png`;
			},
			showfn(options) {
				return options.tentacles.backArm.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleRightArm: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.frontArm.state}.png`;
			},
			showfn(options) {
				return options.tentacles.frontArm.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleLeftLeg: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.backLeg.state}.png`;
			},
			showfn(options) {
				return options.tentacles.backLeg.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleRightLeg: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.frontLeg.state}.png`;
			},
			showfn(options) {
				return options.tentacles.frontLeg.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		tentacleOral: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.mouth.state}.png`;
			},
			showfn(options) {
				return options.tentacles.mouth.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 72,
		},
		tentaclePenis: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.penis.state}.png`;
			},
			showfn(options) {
				return options.tentacles.penis.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: CombatRenderer.indices.frontLowerOverwear + 1,
		},
		tentacleVagina: {
			srcfn(options) {
				return `${options.src}tentacles/${options.tentacles.vagina.state}.png`;
			},
			showfn(options) {
				return options.tentacles.vagina.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["tentacles"],
			z: 49,
		},
		/*
		 *	██████   █████  ███████ ███████
		 *	██   ██ ██   ██ ██      ██
		 *	██████  ███████ ███████ █████
		 *	██   ██ ██   ██      ██ ██
		 *	██████  ██   ██ ███████ ███████
		 */
		backarm: {
			srcfn(options) {
				if (options.position === "doggy" && PlayerCanvasHelper.isBestialHandjob(options, "back")) {
					return `${options.src}body/arms/back-default.png`;
				}
				return `${options.src}body/arms/back-${options.armBackPosition}.png`;
			},
			showfn(options) {
				if (!options.showPlayer) return false;
				if (options.position === "missionary" && options.armBackPosition === "default") return false;
				if (options.armBackPosition === "bound") return false;
				return true;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.backArm,
		},
		backthigh: {
			srcfn(options) {
				return `${options.src}body/thighs/back-${options.legBackPosition}.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.backThigh,
		},
		backleg: {
			srcfn(options) {
				return `${options.src}body/legs/back-${options.legBackPosition}.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.backLeg,
		},
		base: {
			srcfn(options) {
				return `${options.src}body/base.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.base,
		},
		frontthigh: {
			srcfn(options) {
				return `${options.src}body/thighs/front-${options.legFrontPosition}.png`;
			},
			showfn(options) {
				const result = options.showPlayer;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.frontThigh,
		},
		frontleg: {
			srcfn(options) {
				return `${options.src}body/legs/front-${options.legFrontPosition}.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.frontLeg,
		},
		frontarm: {
			srcfn(options) {
				// Find target of hand if any, if bestial (pig) swap out sprite.
				if (PlayerCanvasHelper.isBestialHandjob(options, "front")) {
					return `${options.src}body/arms/front-${options.armFrontPosition}-bestial.png`;
				}
				// Generic position.
				return `${options.src}body/arms/front-${options.armFrontPosition}.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			zfn(options) {
				if (options.props.pillory.show) {
					return CombatRenderer.indices.frontArm - 2;
				}
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms;
				}
				return CombatRenderer.indices.frontArm;
			},
		},
		frontbreast: {
			srcfn(options) {
				return `${options.src}body/breasts/${options.breastSize}.png`;
			},
			showfn(options) {
				if (!options.breastSize) return false;
				const result = options.showPlayer && options.breastsExposed;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.base + 10,
		},
		penetrator: {
			srcfn(options) {
				return `${options.src}body/penetrator/default-default.png`;
			},
			showfn(options) {
				const penetrator = options.penetrator;
				const result = options.showPlayer && penetrator?.show;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.backLowerOverwear + 1,
		},
		penetratorEjaculate: {
			srcfn(options) {
				const penetrator = options.penetrator;
				return `${options.src}body/penetrator/default-default-${penetrator?.ejaculate.type}.png`;
			},
			showfn(options) {
				const penetrator = options.penetrator;
				if (options.machines.penisMilker.show) return false;
				const result = options.showPlayer && penetrator?.show && penetrator?.isEjaculating;
				return !!result;
			},
			animationfn(options) {
				return "sex-4f-vfast";
			},
			z: CombatRenderer.indices.backLowerOverwear + 1,
		},
		pregnantBelly: {
			srcfn(options) {
				return `${options.src}body/pregnantBelly/${options.pregnantBellyPath}/${options.bellySize}.png`;
			},
			showfn(options) {
				if (!options.bellySize || !options.bellyState) return false;
				const result = options.showPlayer && options.bellyState !== "hidden";
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				return options.bellyState !== "clothed" ? ["body"] : [{ blend: options.filters.worn_upper_main.blend, blendMode: "multiply" }];
			},
			z: CombatRenderer.indices.base + 24,
		},
		pregnantBellyOverlay: {
			srcfn(options) {
				return options.bellyState === "exposed" && options.position === "doggy"
					? `${options.src}body/pregnantBelly/base/overlay_exposed.png`
					: `${options.src}body/pregnantBelly/${options.pregnantBellyPath}/overlay.png`;
			},
			showfn(options) {
				if (!options.bellySize || !options.bellyState) return false;
				const result = options.showPlayer && options.bellyState !== "hidden";
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				return options.bellyState !== "clothed" ? ["body"] : [{ blend: options.filters.worn_upper_main.blend, blendMode: "multiply" }];
			},
			z: CombatRenderer.indices.base + 23,
		},
		/*
		 *	██   ██ ███████  █████  ██████
		 *	██   ██ ██      ██   ██ ██   ██
		 *	███████ █████   ███████ ██   ██
		 *	██   ██ ██      ██   ██ ██   ██
		 *	██   ██ ███████ ██   ██ ██████
		 */
		head: {
			srcfn(options) {
				return `${options.src}body/head/head.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.head,
		},
		frontEye: {
			srcfn(options) {
				return options.trauma ? `${options.src}body/head/eyesempty.png` : `${options.src}body/head/eyes.png`;
			},
			showfn(options) {
				return !!options.showPlayer && !!options.showFace;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				return [options.position === "missionary" ? "rightEye" : "leftEye"];
			},
			z: CombatRenderer.indices.head + 1,
		},
		eyelid: {
			srcfn(options) {
				return `${options.src}body/head/eyelids.png`;
			},
			showfn(options) {
				const result = options.showPlayer && !!options.showFace;
				return !!result;
			},
			animationfn(options) {
				if (PlayerCombatMapper.getPcAnimationFrameCount(options) === 2 && options.position === "doggy") {
					return "eyelids-doggy-idle";
				}
				if (combat.isActive()) {
					return options.animKey;
				}
				return "sex-1f2-idle";
			},
			filters: ["body"],
			z: CombatRenderer.indices.head + 2,
		},
		eyelashes: {
			srcfn(options) {
				return `${options.src}body/head/lashes.png`;
			},
			showfn(options) {
				return !!options.showPlayer && !!options.showFace;
			},
			animationfn(options) {
				if (PlayerCombatMapper.getPcAnimationFrameCount(options) === 2 && options.position === "doggy") {
					return "eyelashes-doggy-idle";
				}
				if (combat.isActive()) {
					return options.animKey;
				}
				return "sex-1f2-idle";
			},
			filters: ["hair"],
			z: CombatRenderer.indices.head + 3,
		},
		blush: {
			srcfn(options) {
				return `${options.src}body/head/blush/${options.blush}.png`;
			},
			showfn(options) {
				const result = options.showPlayer && !!options.showFace && options.blush > 0;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.head + 1,
		},
		freckles: {
			srcfn(options) {
				return `${options.src}body/head/freckles.png`;
			},
			showfn(options) {
				const result = options.showPlayer && !!options.showFace && !!options.freckles;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: ["body"],
			z: CombatRenderer.indices.head + 1,
		},
		/* This creates a weird effect on the face, tbi */
		tears: {
			srcfn(options) {
				return `${options.src}body/head/tear/${options.tears}.png`;
			},
			showfn(options) {
				const result = options.showPlayer && options.showFace && options.tears > 0;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.head + 2,
		},
		mouth: {
			srcfn(options) {
				const mouth = options.mouth;
				if (mouth.inOral || mouth.open) {
					return `${options.src}body/oral/mouth.png`;
				}
				return `${options.src}body/oral/closedmouth.png`;
			},
			showfn(options) {
				return !!options.showPlayer && !!options.showFace;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const mouth = options.mouth;
				return mouth.inOral || mouth.open ? [""] : ["body"];
			},
			z: CombatRenderer.indices.head + 1,
		},
		tongue: {
			srcfn(options) {
				return `${options.src}body/oral/tongue.png`;
			},
			showfn(options) {
				const mouth = options.mouth;
				return !!options.showPlayer && !!options.showFace && mouth.inOral;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.head + 1,
		},
		hair: {
			srcfn(options) {
				return `${options.src}hair/${options.hairType}/${options.hairLength}.png`;
			},
			showfn(options) {
				return !!options.showPlayer;
			},
			animationfn(options) {
				return options.animKey;
			},
			masksrcfn(options) {
				if (options.clothes.head?.hasMaskImg) {
					return `${options.src}clothing/head/${options.clothes.head.name}/mask.png`;
				}
				return null;
			},
			filters: ["hair"],
			z: CombatRenderer.indices.hair,
		},
		/*
		 *    ████████ ██████   █████  ███    ██ ███████ ███████  ██████  ██████  ███    ███  █████  ████████ ██  ██████  ███    ██
		 *       ██    ██   ██ ██   ██ ████   ██ ██      ██      ██    ██ ██   ██ ████  ████ ██   ██    ██    ██ ██    ██ ████   ██
		 *       ██    ██████  ███████ ██ ██  ██ ███████ █████   ██    ██ ██████  ██ ████ ██ ███████    ██    ██ ██    ██ ██ ██  ██
		 *       ██    ██   ██ ██   ██ ██  ██ ██      ██ ██      ██    ██ ██   ██ ██  ██  ██ ██   ██    ██    ██ ██    ██ ██  ██ ██
		 *       ██    ██   ██ ██   ██ ██   ████ ███████ ██       ██████  ██   ██ ██      ██ ██   ██    ██    ██  ██████  ██   ████
		 */
		angelWingsBack: PlayerCanvasHelper.genTransformationLayer("angel", "wings", "back"),
		angelWingsFront: PlayerCanvasHelper.genTransformationLayer("angel", "wings", "front"),
		angelHaloBack: PlayerCanvasHelper.genTransformationLayer("angel", "halo", "back"),
		angelHaloFront: PlayerCanvasHelper.genTransformationLayer("angel", "halo", "front"),

		birdTailBack: PlayerCanvasHelper.genTransformationLayer("bird", "tail", "back"),
		birdTailFront: PlayerCanvasHelper.genTransformationLayer("bird", "tail", "front"),
		birdWingsBack: PlayerCanvasHelper.genTransformationLayer("bird", "wings", "back"),
		birdWingsFront: PlayerCanvasHelper.genTransformationLayer("bird", "wings", "front"),
		birdMalar: PlayerCanvasHelper.genTransformationLayer("bird", "malar", "front"),
		birdPubes: PlayerCanvasHelper.genTransformationLayer("bird", "pubes", "front"),
		birdPlumage: PlayerCanvasHelper.genTransformationLayer("bird", "plumage", "front"),
		birdEyes: PlayerCanvasHelper.genTransformationLayer("bird", "eyes", "front", {
			animationfn(options) {
				if (PlayerCombatMapper.getPcAnimationFrameCount(options) === 2) {
					return "eyes-bird-idle";
				}
				return options.animKey;
			},
		}),

		catEarsFront: PlayerCanvasHelper.genTransformationLayer("cat", "ears", "front"),
		catEarsBack: PlayerCanvasHelper.genTransformationLayer("cat", "ears", "back"),
		catTailBack: PlayerCanvasHelper.genTransformationLayer("cat", "tail", "back"),
		catTailFront: PlayerCanvasHelper.genTransformationLayer("cat", "tail", "front"),

		cowHornsBack: PlayerCanvasHelper.genTransformationLayer("cow", "horns", "back"),
		cowHornsFront: PlayerCanvasHelper.genTransformationLayer("cow", "horns", "front"),
		cowEarsFront: PlayerCanvasHelper.genTransformationLayer("cow", "ears", "front"),
		cowEarsBack: PlayerCanvasHelper.genTransformationLayer("cow", "ears", "back"),
		cowTailBack: PlayerCanvasHelper.genTransformationLayer("cow", "tail", "back"),
		cowTailFront: PlayerCanvasHelper.genTransformationLayer("cow", "tail", "front"),

		demonHornsBack: PlayerCanvasHelper.genTransformationLayer("demon", "horns", "back"),
		demonHornsFront: PlayerCanvasHelper.genTransformationLayer("demon", "horns", "front"),
		demonTailBack: PlayerCanvasHelper.genTransformationLayer("demon", "tail", "back"),
		demonTailFront: PlayerCanvasHelper.genTransformationLayer("demon", "tail", "front"),
		demonWingsBack: PlayerCanvasHelper.genTransformationLayer("demon", "wings", "back"),
		demonWingsFront: PlayerCanvasHelper.genTransformationLayer("demon", "wings", "front"),

		fallenAngelWingsBack: PlayerCanvasHelper.genTransformationLayer("fallenAngel", "wings", "back"),
		fallenAngelWingsFront: PlayerCanvasHelper.genTransformationLayer("fallenAngel", "wings", "front"),
		fallenAngelHaloBack: PlayerCanvasHelper.genTransformationLayer("fallenAngel", "halo", "back"),
		fallenAngelHaloFront: PlayerCanvasHelper.genTransformationLayer("fallenAngel", "halo", "front"),

		foxEarsBack: PlayerCanvasHelper.genTransformationLayer("fox", "ears", "back"),
		foxEarsFront: PlayerCanvasHelper.genTransformationLayer("fox", "ears", "front"),
		foxTailBack: PlayerCanvasHelper.genTransformationLayer("fox", "tail", "back"),
		foxTailFront: PlayerCanvasHelper.genTransformationLayer("fox", "tail", "front"),
		foxCheeks: PlayerCanvasHelper.genTransformationLayer("fox", "cheeks", "front"),

		wolfEarsBack: PlayerCanvasHelper.genTransformationLayer("wolf", "ears", "back"),
		wolfEarsFront: PlayerCanvasHelper.genTransformationLayer("wolf", "ears", "front"),
		wolfTailBack: PlayerCanvasHelper.genTransformationLayer("wolf", "tail", "back"),
		wolfTailFront: PlayerCanvasHelper.genTransformationLayer("wolf", "tail", "front"),
		wolfCheeks: PlayerCanvasHelper.genTransformationLayer("wolf", "cheeks", "front"),
		/*
		 *    ██████   ██████  ██████  ██    ██ ██     ██ ██████  ██ ████████ ██ ███    ██  ██████
		 *    ██   ██ ██    ██ ██   ██  ██  ██  ██     ██ ██   ██ ██    ██    ██ ████   ██ ██
		 *    ██████  ██    ██ ██   ██   ████   ██  █  ██ ██████  ██    ██    ██ ██ ██  ██ ██   ███
		 *    ██   ██ ██    ██ ██   ██    ██    ██ ███ ██ ██   ██ ██    ██    ██ ██  ██ ██ ██    ██
		 *    ██████   ██████  ██████     ██     ███ ███  ██   ██ ██    ██    ██ ██   ████  ██████
		 */
		bodywritingForehead: PlayerCanvasHelper.genBodywritingLayer("forehead", {
			z: CombatRenderer.indices.head + 3,
		}),
		bodywritingBackCheek: PlayerCanvasHelper.genBodywritingLayer("backCheek", {
			z: CombatRenderer.indices.head - 1,
		}),
		bodywritingFrontCheek: PlayerCanvasHelper.genBodywritingLayer("frontCheek", {
			z: CombatRenderer.indices.head + 1,
		}),
		bodywritingBackShoulder: PlayerCanvasHelper.genBodywritingLayer("backShoulder", {
			z: CombatRenderer.indices.base - 1,
		}),
		bodywritingFrontShoulder: PlayerCanvasHelper.genBodywritingLayer("frontShoulder", {
			z: CombatRenderer.indices.frontArm + 1,
		}),
		bodywritingBreasts: PlayerCanvasHelper.genBodywritingLayer("breasts", {
			z: CombatRenderer.indices.base + 11,
		}),
		bodywritingBack: PlayerCanvasHelper.genBodywritingLayer("back", {
			z: CombatRenderer.indices.base + 1,
		}),
		bodywritingBackBottom: PlayerCanvasHelper.genBodywritingLayer("backBottom", {
			z: CombatRenderer.indices.base - 1,
		}),
		bodywritingFrontBottom: PlayerCanvasHelper.genBodywritingLayer("frontBottom", {
			z: CombatRenderer.indices.frontLeg + 1,
		}),
		bodywritingPubic: PlayerCanvasHelper.genBodywritingLayer("pubic", {
			z: CombatRenderer.indices.base + 1,
		}),
		bodywritingBackThigh: PlayerCanvasHelper.genBodywritingLayer("backThigh", {
			z: CombatRenderer.indices.backThigh + 1,
		}),
		bodywritingFrontThigh: PlayerCanvasHelper.genBodywritingLayer("frontThigh", {
			z: CombatRenderer.indices.frontThigh + 1,
		}),
		/*
		 *	 ██████ ██       ██████  ████████ ██   ██ ██ ███    ██  ██████
		 *	██      ██      ██    ██    ██    ██   ██ ██ ████   ██ ██
		 *	██      ██      ██    ██    ██    ███████ ██ ██ ██  ██ ██   ███
		 *	██      ██      ██    ██    ██    ██   ██ ██ ██  ██ ██ ██    ██
		 *	 ██████ ███████  ██████     ██    ██   ██ ██ ██   ████  ██████
		 */
		facewear: PlayerCanvasHelper.genClothingLayer("face", {
			z: CombatRenderer.indices.head + 4,
		}),
		facewearAcc: PlayerCanvasHelper.genClothingAccLayer("face", {
			z: CombatRenderer.indices.head + 4,
		}),
		footwearBack: PlayerCanvasHelper.genClothingLayer("feet", {
			srcfn(options) {
				const clothes = options.clothes.feet;
				if (clothes?.name == null || clothes.positions == null) return "";
				const path = `${options.src}clothing/feet/${clothes.name}/back-${clothes.positions.back}.png`;
				return path;
			},
			z: CombatRenderer.indices.backFootwear,
		}),
		footwearAccBack: PlayerCanvasHelper.genClothingAccLayer("feet", {
			srcfn(options) {
				const clothes = options.clothes.feet;
				if (clothes?.name == null || clothes.positions == null) return "";
				const path = `${options.src}clothing/feet/${clothes.name}/back-${clothes.positions.back}-acc.png`;
				return path;
			},
			z: CombatRenderer.indices.backFootwear,
		}),
		footwearFront: PlayerCanvasHelper.genClothingLayer("feet", {
			srcfn(options) {
				const clothes = options.clothes.feet;
				if (clothes?.name == null || clothes.positions == null) return "";
				const path = `${options.src}clothing/feet/${clothes.name}/front-${clothes.positions.front}.png`;
				return path;
			},
			z: CombatRenderer.indices.frontFootwear,
		}),
		footwearAccFront: PlayerCanvasHelper.genClothingAccLayer("feet", {
			srcfn(options) {
				const clothes = options.clothes.feet;
				if (clothes?.name == null || clothes.positions == null) return "";
				const path = `${options.src}clothing/feet/${clothes.name}/front-${clothes.positions.front}-acc.png`;
				return path;
			},
			z: CombatRenderer.indices.frontFootwear,
		}),
		genitals: PlayerCanvasHelper.genClothingLayer("genitals", {
			z: CombatRenderer.indices.base + 6,
		}),
		genitalsAcc: PlayerCanvasHelper.genClothingAccLayer("genitals", {
			z: CombatRenderer.indices.base + 6,
		}),
		handsBack: PlayerCanvasHelper.genClothingLayer("hands", {
			srcfn(options) {
				const clothes = options.clothes.hands;
				if (clothes?.name == null) return "";
				if (options.position === "doggy" && PlayerCanvasHelper.isBestialHandjob(options, "back")) {
					// return `${options.src}clothing/hands/${clothes.name}/back-handjob-bestial-acc.png`;
					return `${options.src}clothing/hands/${clothes.name}/back-default.png`;
				}
				const path = `${options.src}clothing/hands/${clothes.name}/back-${options.armBackPosition}.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes.hands;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				if (!CombatRenderer.isClothingShown(clothes, options.showClothing)) {
					return false;
				}
				if (options.position === "doggy") {
					const states = ["default", "handjob"];
					if (clothes.isBoundable) {
						states.push("bound");
					}
					return states.includes(options.armBackPosition);
				}
				return ["handjob"].includes(options.armBackPosition);
			},
			z: CombatRenderer.indices.backArm + 1,
		}),
		handsBackAcc: PlayerCanvasHelper.genClothingAccLayer("hands", {
			srcfn(options) {
				const clothes = options.clothes.hands;
				if (clothes?.name == null) return "";
				if (options.position === "doggy" && PlayerCanvasHelper.isBestialHandjob(options, "back")) {
					// return `${options.src}clothing/hands/${clothes.name}/back-handjob-bestial-acc.png`;
					return `${options.src}clothing/hands/${clothes.name}/back-default.png-acc`;
				}
				const path = `${options.src}clothing/hands/${clothes.name}/back-${options.armBackPosition}-acc.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes.hands;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				if (!CombatRenderer.isClothingShown(clothes, options.showClothing)) {
					return false;
				}
				if (!clothes.hasAccessory) return false;
				if (options.position === "doggy") {
					const states = ["default", "handjob"];
					if (clothes.isBoundable) {
						states.push("bound");
					}
					return states.includes(options.armBackPosition);
				}
				return ["handjob"].includes(options.armBackPosition);
			},
			z: CombatRenderer.indices.backArm + 1,
		}),
		handsFront: PlayerCanvasHelper.genClothingLayer("hands", {
			srcfn(options) {
				const clothes = options.clothes.hands;
				if (clothes?.name == null) return "";
				if (PlayerCanvasHelper.isBestialHandjob(options, "front")) {
					return `${options.src}clothing/hands/${clothes.name}/front-handjob-bestial.png`;
				}
				return `${options.src}clothing/hands/${clothes.name}/front-${options.armFrontPosition}.png`;
			},
			showfn(options) {
				const clothes = options.clothes.hands;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				if (!CombatRenderer.isClothingShown(clothes, options.showClothing)) {
					return false;
				}
				const available = options.position === "doggy" ? ["default", "handjob"] : ["default", "handjob", "stroke"];
				return available.includes(options.armFrontPosition);
			},
			zfn(options) {
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms + 1;
				}
				return CombatRenderer.indices.frontArm + 1;
			},
		}),
		handsFrontAcc: PlayerCanvasHelper.genClothingAccLayer("hands", {
			srcfn(options) {
				const clothes = options.clothes.hands;
				if (clothes?.name == null) return "";
				if (PlayerCanvasHelper.isBestialHandjob(options, "front")) {
					return `${options.src}clothing/hands/${clothes.name}/front-handjob-bestial-acc.png`;
				}
				const path = `${options.src}clothing/hands/${clothes.name}/front-${options.armFrontPosition}-acc.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes.hands;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = options.showClothing && !CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.hasAccessory;
				const available = options.position === "doggy" ? ["default", "handjob"] : ["default", "handjob", "stroke"];
				const found = available.includes(options.armFrontPosition);
				return !!show && !!found;
			},
			zfn(options) {
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms + 1;
				}
				return CombatRenderer.indices.frontArm + 1;
			},
		}),
		headwearBackAcc: PlayerCanvasHelper.genClothingAccLayer("head", {
			srcfn(options) {
				const clothes = options.clothes.head;
				if (clothes?.name == null) return "";
				const path = `${options.src}clothing/head/${clothes.name}/back-acc.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes.head;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				if (!CombatRenderer.isClothingShown(clothes, options.showClothing)) return false;
				return !!clothes.hasBackAccessory;
			},
			z: CombatRenderer.indices.head - 1,
		}),
		headwearBack: PlayerCanvasHelper.genClothingLayer("head", {
			srcfn(options) {
				const clothes = options.clothes.head;
				if (clothes?.name == null) return "";
				const path = `${options.src}clothing/head/${clothes.name}/back.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes.head;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				if (!CombatRenderer.isClothingShown(clothes, options.showClothing)) return false;
				return !!clothes.hasBackImg;
			},
			z: CombatRenderer.indices.head - 1,
		}),
		headwear: PlayerCanvasHelper.genClothingLayer("head", {
			z: CombatRenderer.indices.hair + 1,
		}),
		headwearAcc: PlayerCanvasHelper.genClothingAccLayer("head", {
			z: CombatRenderer.indices.hair + 1,
		}),
		legwearBack: PlayerCanvasHelper.genClothingLayerLowerStep("legs", "back", false, {
			z: CombatRenderer.indices.backLegwear,
		}),
		legwearAccBack: PlayerCanvasHelper.genClothingLayerLowerStep("legs", "back", true, {
			z: CombatRenderer.indices.backLegwear,
		}),
		legwearFront: PlayerCanvasHelper.genClothingLayerLowerStep("legs", "front", false, {
			z: CombatRenderer.indices.frontLegwear,
		}),
		legwearAccFront: PlayerCanvasHelper.genClothingLayerLowerStep("legs", "front", true, {
			z: CombatRenderer.indices.frontLegwear,
		}),
		backUnderLower: PlayerCanvasHelper.genClothingLayerLowerStep("under_lower", "back", false, {
			z: CombatRenderer.indices.backLowerUnderwear,
		}),
		backUnderLowerAcc: PlayerCanvasHelper.genClothingLayerLowerStep("under_lower", "back", true, {
			z: CombatRenderer.indices.backLowerUnderwear,
		}),
		frontUnderLower: PlayerCanvasHelper.genClothingLayerLowerStep("under_lower", "front", false, {
			z: CombatRenderer.indices.frontLowerUnderwear,
		}),
		frontUnderLowerAcc: PlayerCanvasHelper.genClothingLayerLowerStep("under_lower", "front", true, {
			z: CombatRenderer.indices.frontLowerUnderwear,
		}),
		backLower: PlayerCanvasHelper.genClothingLayerLowerStep("lower", "back", false, {
			z: CombatRenderer.indices.backLowerWear,
		}),
		backLowerAcc: PlayerCanvasHelper.genClothingLayerLowerStep("lower", "back", true, {
			z: CombatRenderer.indices.backLowerWear,
		}),
		frontLower: PlayerCanvasHelper.genClothingLayerLowerStep("lower", "front", false, {
			z: CombatRenderer.indices.frontLowerWear,
		}),
		frontLowerAcc: PlayerCanvasHelper.genClothingLayerLowerStep("lower", "front", true, {
			z: CombatRenderer.indices.frontLowerWear,
		}),
		neckWear: PlayerCanvasHelper.genClothingLayer("neck", {
			z: CombatRenderer.indices.head - 1,
		}),
		neckWearAcc: PlayerCanvasHelper.genClothingAccLayer("neck", {
			z: CombatRenderer.indices.head - 1,
		}),
		overHead: PlayerCanvasHelper.genClothingLayer("over_head", {
			z: CombatRenderer.indices.head + 2,
		}),
		overHeadAcc: PlayerCanvasHelper.genClothingAccLayer("over_head", {
			z: CombatRenderer.indices.head + 2,
		}),
		backOverLower: PlayerCanvasHelper.genClothingLayer("over_lower", {
			srcfn(options) {
				const clothes = options.clothes.over_lower;
				if (clothes?.name == null || clothes.positions == null) return "";
				const path = `${options.src}clothing/over_lower/${clothes.name}/back-${clothes.positions.back}-${clothes.state}.png`;
				return path;
			},
			show: false,
			z: CombatRenderer.indices.backLowerOverwear,
		}),
		backOverLowerAcc: PlayerCanvasHelper.genClothingAccLayer("over_lower", {
			srcfn(options) {
				const clothes = options.clothes.over_lower;
				if (clothes?.name == null || clothes.positions == null) return "";
				const path = `${options.src}clothing/over_lower/${clothes.name}/back-${clothes.positions.back}-${clothes.state}-acc.png`;
				return path;
			},
			show: false,
			z: CombatRenderer.indices.backLowerOverwear,
		}),
		frontOverLower: PlayerCanvasHelper.genClothingLayer("over_lower", {
			z: CombatRenderer.indices.frontLowerOverwear,
		}),
		frontOverLowerAcc: PlayerCanvasHelper.genClothingAccLayer("over_lower", {
			z: CombatRenderer.indices.frontLowerOverwear,
		}),
		overUpper: PlayerCanvasHelper.genClothingLayer("over_upper", {
			z: CombatRenderer.indices.frontArm - 1,
		}),
		overUpperAcc: PlayerCanvasHelper.genClothingAccLayer("over_upper", {
			z: CombatRenderer.indices.frontArm - 1,
		}),
		overUpperBreasts: PlayerCanvasHelper.genBreastsLayer("over_upper", {
			z: CombatRenderer.indices.frontArm - 1,
		}),
		overUpperBreastsAcc: PlayerCanvasHelper.genBreastsAccLayer("over_upper", {
			z: CombatRenderer.indices.frontArm - 1,
		}),
		underUpper: PlayerCanvasHelper.genClothingLayer("under_upper", {
			z: CombatRenderer.indices.frontArm - 4,
		}),
		underUpperAcc: PlayerCanvasHelper.genClothingAccLayer("under_upper", {
			z: CombatRenderer.indices.frontArm - 4,
		}),
		underUpperBreasts: PlayerCanvasHelper.genBreastsLayer("under_upper", {
			z: CombatRenderer.indices.frontArm - 4,
		}),
		underUpperBreastsAcc: PlayerCanvasHelper.genBreastsAccLayer("under_upper", {
			z: CombatRenderer.indices.frontArm - 4,
		}),
		upper: PlayerCanvasHelper.genClothingLayer("upper", {
			z: CombatRenderer.indices.frontArm - 3,
		}),
		upperAcc: PlayerCanvasHelper.genClothingAccLayer("upper", {
			z: CombatRenderer.indices.frontArm - 3,
		}),
		upperBreasts: PlayerCanvasHelper.genBreastsLayer("upper", {
			z: CombatRenderer.indices.frontArm - 3,
		}),
		upperBreastsAcc: PlayerCanvasHelper.genBreastsAccLayer("upper", {
			z: CombatRenderer.indices.frontArm - 3,
		}),
		upperBackSleeves: PlayerCanvasHelper.genClothingSleeves("upper", "back", {
			showfn(options) {
				const clothes = options.clothes.upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.show;
				// If missionary: Sleeves on the side behind are never shown, except for handjobs.
				if (options.position === "doggy" && options.armBackPosition === "bound") return false;
				if (options.position === "missionary" && !["handjob"].includes(clothes.sleeves.state)) return false;
				return !!show;
			},
			z: CombatRenderer.indices.backArm + 2,
		}),
		upperBackSleevesAcc: PlayerCanvasHelper.genClothingSleevesAcc("upper", "back", {
			showfn(options) {
				const clothes = options.clothes.upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.hasAccessory;
				// If missionary: Sleeves on the side behind are never shown, except for handjobs.
				if (options.position === "doggy" && options.armBackPosition === "bound") return false;
				if (options.position === "missionary" && !["handjob"].includes(clothes.sleeves.state)) return false;
				return !!show;
			},
			z: CombatRenderer.indices.backArm + 2,
		}),
		upperFrontSleeves: PlayerCanvasHelper.genClothingSleeves("upper", "front", {
			showfn(options) {
				const clothes = options.clothes.upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.show;
				return !!show;
			},
			zfn(options) {
				if (options.props.pillory.show) {
					return CombatRenderer.indices.frontArm - 2;
				}
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms + 1;
				}
				return CombatRenderer.indices.frontArm + 2;
			},
		}),
		upperFrontSleevesAcc: PlayerCanvasHelper.genClothingSleevesAcc("upper", "front", {
			showfn(options) {
				const clothes = options.clothes.upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.hasAccessory;
				return !!show;
			},
			zfn(options) {
				if (options.props.pillory.show) {
					return CombatRenderer.indices.frontArm - 2;
				}
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms + 1;
				}
				return CombatRenderer.indices.frontArm + 2;
			},
		}),
		underUpperBackSleeves: PlayerCanvasHelper.genClothingSleeves("under_upper", "back", {
			showfn(options) {
				const clothes = options.clothes.under_upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.show;
				// If missionary: Sleeves on the side behind are never shown, except for handjobs.
				if (options.position === "doggy" && options.armBackPosition === "bound") return false;
				if (options.position === "missionary" && !["handjob"].includes(clothes.sleeves.state)) return false;
				return !!show;
			},
			z: CombatRenderer.indices.backArm + 1,
		}),
		underUpperBackSleevesAcc: PlayerCanvasHelper.genClothingSleevesAcc("under_upper", "back", {
			showfn(options) {
				const clothes = options.clothes.under_upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.hasAccessory;
				// If missionary: Sleeves on the side behind are never shown, except for handjobs.
				if (options.position === "doggy" && options.armBackPosition === "bound") return false;
				if (options.position === "missionary" && !["handjob"].includes(clothes.sleeves.state)) return false;
				return !!show;
			},
			z: CombatRenderer.indices.backArm + 1,
		}),
		underUpperFrontSleeves: PlayerCanvasHelper.genClothingSleeves("under_upper", "front", {
			showfn(options) {
				const clothes = options.clothes.under_upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.show;
				return !!show;
			},
			zfn(options) {
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms + 1;
				}
				return CombatRenderer.indices.frontArm + 1;
			},
		}),
		underUpperFrontSleevesAcc: PlayerCanvasHelper.genClothingSleevesAcc("under_upper", "front", {
			showfn(options) {
				const clothes = options.clothes.under_upper;
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.sleeves.hasAccessory;
				return !!show;
			},
			zfn(options) {
				if (options.armFrontPosition === "bound") {
					return CombatRenderer.indices.frontBoundArms + 1;
				}
				return CombatRenderer.indices.frontArm + 1;
			},
		}),
	},
};
Renderer.CanvasModels.combatMainPc = combatMainPc;
