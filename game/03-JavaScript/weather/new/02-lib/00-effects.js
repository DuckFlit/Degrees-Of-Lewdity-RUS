/* eslint-disable no-undef */

WeatherEffects.create({
	name: "fog",
	defaultParameters: {
		alpha: 1,
		colorTop: "#000000",
		colorMiddle: "#999999",
		colorBottom: "ffffff",
		midOffset: 0.7,
	},
	init() {
		const gradient = this.canvas.ctx.createLinearGradient(0, 0, 0, this.canvas.element);
		gradient.addColorStop(0, this.colorTop);
		gradient.addColorStop(this.midOffset, this.colorMiddle);
		gradient.addColorStop(1, this.colorBottom);
		this.canvas.ctx.fillStyle = gradient;
		this.canvas.ctx.alpha = this.alpha;
		this.canvas.fillRect();
	},
	onDraw() {},
});
