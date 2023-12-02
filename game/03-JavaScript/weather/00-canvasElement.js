/* eslint-disable no-undef */
class SkyCanvasElement {
	constructor(name, settings) {
		if (!arguments[0]) return;

		this.name = name;
		this.settings = settings;

		this.position = {};
		this.expandFactor = 0.1;
		this.createCanvasImage(settings);
	}

	createCanvasImage() {
		this.img = new Image();
		this.img.src = this.settings.imgPath;
		this.canvas = $("<canvas/>", {
			id: this.name,
		});
		this.canvasElement = this.canvas[0];
		this.ctx = this.canvasElement.getContext("2d");
	}

	loaded() {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	interpolate(value1, value2, factor) {
		return value1 + (value2 - value1) * factor;
	}

	normalize(value) {
		return (value + 1) / 2;
	}

	setOrbit(currentTime) {
		this.riseTime = this.settings.orbit.riseTime * Time.secondsPerHour;
		this.setTime = this.settings.orbit.setTime * Time.secondsPerHour;

		// Adjusts for overnight duration if needed
		if (this.setTime < this.riseTime) {
			this.setTime += Time.secondsPerDay;
		}

		const timePercent = this.calculateTimePercent(currentTime);
		const position = this.getElementPosition(timePercent);

		this.position.adjustedX = position.x;
		this.position.adjustedY = position.y;
	}

	calculateTimePercent(currentTime) {
		const expandedDuration = (this.setTime - this.riseTime) / (1 - 2 * this.expandFactor);
		let elapsed = currentTime - (this.riseTime - this.expandFactor * expandedDuration);
		if (elapsed < 0) elapsed += Time.secondsPerDay;
		return Math.clamp(elapsed / expandedDuration, 0, 1);
	}

	getElementPosition(timePercent) {
		timePercent = Math.clamp(timePercent, 0, 1);
		const adjustedTimePercent = (timePercent - this.expandFactor) / (1 - 2 * this.expandFactor);
		const x = lerp(Math.clamp(adjustedTimePercent, 0, 1), this.settings.orbit.path.startX, this.settings.orbit.path.endX);

		const amplitude = this.settings.orbit.path.peakY - this.settings.orbit.path.horizon;
		const factor = 1 - 4 * Math.pow(adjustedTimePercent - 0.5, 2);
		const y = this.settings.orbit.path.horizon + amplitude * factor;

		return { x, y };
	}

	draw() {}
}
window.SkyCanvasElement = SkyCanvasElement;
