/* eslint-disable no-undef */
class SkyCanvasSunGlow extends SkyCanvasElement {
	draw(sun, dayFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		const sunPosition = {
			x: (sun.position.adjustedX / this.canvasElement.width) * this.canvasElement.width,
			y: (sun.position.adjustedY / this.canvasElement.height) * this.canvasElement.height,
		};

		const glowGradient = this.ctx.createRadialGradient(sunPosition.x, sunPosition.y, 0, sunPosition.x, sunPosition.y, this.settings.glowRadius);

		// Determine the colors based on the day factor
		const colors = this.settings.colors;
		if (dayFactor > 0) {
			glowGradient.addColorStop(0, ColourUtils.interpolateColor(colors.dawnDusk, colors.day, dayFactor));
			glowGradient.addColorStop(0.2, ColourUtils.interpolateColor(colors.dawnDusk, colors.day, dayFactor));
			glowGradient.addColorStop(1, "#ffffff00");
		} else {
			// Nighttime gradient
			const nightFactor = 1 - Math.abs(dayFactor);
			glowGradient.addColorStop(0, ColourUtils.interpolateColor(colors.night, colors.dawnDusk, nightFactor));
			glowGradient.addColorStop(1, "#ffffff00");
		}

		this.ctx.fillStyle = glowGradient;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
	}
}
window.SkyCanvasSunGlow = SkyCanvasSunGlow;
