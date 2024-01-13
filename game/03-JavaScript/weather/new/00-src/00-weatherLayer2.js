/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class WeatherLayer {
	constructor(options) {
		console.log("WeatherLayer constructor", options);

		this.name = options.name;
		this.canvas = new WeatherCanvas(5, 5);
		this.draw();
	}

	drawLayer() {
		const { draw, ...context } = this;
		draw.call(context);
	}
}
