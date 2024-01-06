/* eslint-disable no-undef */
class SkyCanvasFog extends SkyCanvasElement {
	draw(dayFactor) {
		if (!Weather.fog && Weather.precipitation !== "snow") return;

		const alpha = Weather.precipitation === "snow" ? 0.1 : this.settings.opacity;
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.save();

		const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasElement.height);

		const top = ColourUtils.interpolateColor(this.settings.night.topColor, this.settings.day.topColor, dayFactor);
		gradient.addColorStop(0, top);
		const mid = ColourUtils.interpolateColor(this.settings.night.midColor, this.settings.day.midColor, dayFactor);
		gradient.addColorStop(this.settings.midPosition, mid);
		const bot = ColourUtils.interpolateColor(this.settings.night.botColor, this.settings.day.botColor, dayFactor);
		gradient.addColorStop(1, bot);

		this.ctx.globalAlpha = alpha;
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.restore();
	}
}
window.SkyCanvasFog = SkyCanvasFog;
