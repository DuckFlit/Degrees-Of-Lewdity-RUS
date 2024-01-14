/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class WeatherEffect {
	constructor(options) {
		this.canvas = new WeatherCanvas(5, 5);
		this.enabled = true;

		this.name = options.name;
		this.init = options.init;
		this.onDraw = options.onDraw;

		if (options.parameters) {
			Object.entries(options.parameters).forEach(([key, value]) => {
				this[key] = value;
			});
		}
		this.onInit();
	}

	onInit() {
		const { init, draw, ...context } = this;
		try {
			init.call(context);
		} catch (e) {
			console.log(e.message);
		}
	}

	onDraw() {
		if (!this.enabled) return;
		const { init, draw, ...context } = this;
		try {
			this.canvas.clear();
			draw.call(context);
		} catch (e) {
			console.log(e.message);
		}
	}
}
