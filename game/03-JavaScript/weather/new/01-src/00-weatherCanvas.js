/* eslint-disable no-unused-vars */
class WeatherCanvas {
	constructor(width, height) {
		this.object = $("<canvas/>");
		this.element = this.object[0];
		this.ctx = this.element.getContext("2d");

		this.element.width = width;
		this.element.height = height;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	}

	fillRect() {
		this.ctx.fillRect(0, 0, this.element.width, this.element.height);
	}
}
