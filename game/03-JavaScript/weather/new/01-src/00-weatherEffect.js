/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class WeatherEffect {
	constructor(options) {
		this.canvas = new WeatherCanvas(5, 5);
		this.enabled = true;

		this.name = options.name;
		this.init = options.init;
		this.onDraw = options.onDraw;

		if (options.defaultParameters) {
			Object.entries(options.defaultParameters).forEach(([key, value]) => {
				this[key] = value;
			});
		}
		//this.onInit();
		// This should only execute if its been added to a layer
	}

	onInit() {
		const context = weatherC.getObjectValues(this);
		try {
			init.call(context);
		} catch (e) {
			console.log(e.message);
		}
	}

	onDraw() {
		if (!this.enabled) return;
		const context = weatherC.getObjectValues(this);
		try {
			this.canvas.clear();
			draw.call(context);
		} catch (e) {
			console.log(e.message);
		}
	}
}
