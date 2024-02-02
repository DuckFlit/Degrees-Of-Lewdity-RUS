/* eslint-disable no-undef */
WeatherCanvas.Layer = class Layer {
	constructor(name, zIndex = 0) {
		this.name = name;
		this.zIndex = zIndex;
		this.effects = [];
		this.loadPromises = [];
		this.loading = false;
	}

	addEffect(effectName, params, bindings, condition, compositeOperation) {
		const effectConfig = WeatherEffects.effects.get(effectName);
		if (!effectConfig) {
			const errorPromise = Promise.reject(new Error(`Could not add effect '${effectName}' to layer ${this.name}. That effect does not exist.`));
			this.loadPromises.push(errorPromise);
			return errorPromise;
		}

		// Set index for a consistent order - since it loads asyncronously
		const currentIndex = (this.effectIndex = (this.effectIndex ?? 0) + 1);
		const effect = new WeatherCanvas.Effect(effectConfig, condition, compositeOperation, params);

		const loadPromise = effect.loadImages().then(() => {
			if (bindings) {
				for (const [prop, getter] of Object.entries(bindings)) {
					effect.bind(getter, prop);
				}
			}
			this.effects[currentIndex - 1] = effect;
		});
		this.loadPromises.push(loadPromise);
		return loadPromise;
	}

	async init() {
		this.loading = true;
		this.canvas = new WeatherCanvas.Canvas();

		// Sequentially initialize each effect
		for (const effect of this.effects) {
			await effect.init();
		}
	}

	async draw() {
		const errors = [];
		if (this.effects.length === 0) {
			errors.push(new Error(`Could not draw layer '${this.name}'. It contains no effects.`));
		}
		const initPromises = this.effects.map(effect => effect.initPromise);
		await Promise.all(initPromises);
		this.canvas.clear();
		for (const effect of this.effects) {
			try {
				effect.draw();
				this.canvas.ctx.globalAlpha = effect.alpha;
				this.canvas.ctx.globalCompositeOperation = effect.compositeOperation;
				this.canvas.ctx.drawImage(effect.canvas.element, 0, 0);
			} catch (e) {
				console.error(`Error drawing effect in layer '${this.name}':`, e);
				errors.push(e);
			}
		}
		this.loading = false;
		return errors;
	}
};
