/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
Weather.Sky.Effect = class Effect {
	constructor(effect, condition, compositeOperation, params) {
		this.params = params ?? {};
		console.log(this.params);
		this.onInit = effect.init;
		this.onDraw = effect.draw;
		this.drawCondition = condition || (() => true);
		this.compositeOperation = compositeOperation || "source-over";
		this.images = {};
		this.imagePaths = this.params.images || effect.images;
		this.canvas = new Weather.Sky.Canvas();
		this.initPromise = null;
		this.alpha = this.params.alpha ?? 1;
		this.deepMerge(effect.defaultParameters, this.params);

		// Add sub-effects
		this.effects = [];
		if (effect.effects) {
			effect.effects.forEach(p => {
				console.log(p.params);
				this.addEffect(p.effect, p.params, p.bindings, p.drawCondition);
			});
		}
	}

	/**
	 * Binds a getter function to a property on the effect.
	 *
	 * @param {Function} getter The getter function.
	 * @param {string} prop The property name to bind the getter to.
	 */
	bind(getter, prop) {
		Object.defineProperty(this, prop, {
			get: getter,
		});
	}

	/**
	 * Loads all images specified in the effect's image paths.
	 *
	 * @returns {Promise} A promise that resolves when all images are loaded.
	 */
	loadImages() {
		let imageLoadPromises = [];

		if (this.imagePaths && Object.keys(this.imagePaths).length > 0) {
			imageLoadPromises = Object.keys(this.imagePaths).map(name => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = () => {
						this.images[name] = img;
						resolve(img);
					};
					img.onerror = () => reject(new Error(`Could not load image ${name} at path ${this.imagePaths[name]}`));
					img.src = this.imagePaths[name];
				});
			});
		}

		// Load images for subeffects
		const subEffectsImageLoadPromises = this.effects.map(subEffect => subEffect.loadImages());
		return Promise.all([...imageLoadPromises, ...subEffectsImageLoadPromises]);
	}

	/**
	 * Allows adding of sub-effects recursively
	 *
	 * @param {string} effectName The name of the effect to add
	 * @param {object} params Parameters for the sub-effect
	 * @param {object} bindings Bindings for the sub-effect
	 * @param {Function} condition Condition function for the sub-effect
	 */
	addEffect(effectName, params, bindings, condition) {
		const effectConfig = WeatherEffects.effects.get(effectName);
		if (!effectConfig) {
			console.error(new Error(`Could not add effect '${effectName}'.`));
			return;
		}

		// Don't override any of the functions
		params = params ?? {};
		params.deepMerge(this.params, (_, value) => typeof value !== "function");
		const newEffect = new Weather.Sky.Effect(effectConfig, condition, null, params);
		this.effects.push(newEffect);

		if (bindings) {
			for (const [prop, getter] of Object.entries(bindings)) {
				newEffect.bind(getter.bind(this), prop);
			}
		}
	}

	/**
	 * Initializes the effect. This method should be called before draw().
	 * It ensures all sub-effects are initialized and executes the effect's custom init logic
	 *
	 * @returns {Promise} A promise that resolves when the init is complete
	 */
	async init() {
		this.initPromise = (async () => {
			for (const subEffect of this.effects) {
				await subEffect.init();
			}

			if (this.onInit) {
				try {
					const result = this.onInit();
					if (result instanceof Promise) {
						await result;
					}
				} catch (e) {
					console.error("Error during effect init:", e, this);
				}
			}
		})();

		return this.initPromise;
	}

	/**
	 * Draws the effect onto its canvas.
	 * It will wait for the init to complete before drawing - to assure any images loaded in init will be drawn
	 *
	 */
	draw() {
		this.canvas.clear();
		if (!this.drawCondition()) return;
		try {
			this.canvas.ctx.save();
			this.onDraw();
			this.canvas.ctx.restore();
		} catch (e) {
			console.error("Error during effect", this.name, "'draw' function", e, this);
			return e;
		}
	}
};
