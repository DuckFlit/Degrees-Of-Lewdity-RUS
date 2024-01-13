/* eslint-disable no-unused-vars */
class WeatherCanvas {
	constructor(width, height) {
		this.object = $("<canvas/>");
		this.element = this.object[0];
		this.ctx = this.element.getContext("2d");

		this.element.width = width;
		this.element.height = height;
	}
}
