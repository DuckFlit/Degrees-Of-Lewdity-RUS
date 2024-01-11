/* eslint-disable no-undef */
class SkyCanvasMoonGlow extends SkyCanvasElement {
	draw(moon, dayFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		const moonPosition = {
			x: (moon.position.adjustedX / this.canvasElement.width) * this.canvasElement.width,
			y: (moon.position.adjustedY / this.canvasElement.height) * this.canvasElement.height,
		};

		const glowGradient = this.ctx.createRadialGradient(moonPosition.x, moonPosition.y, 0, moonPosition.x, moonPosition.y, this.settings.glowRadius);

		const colors = this.settings.colors;
		if (dayFactor < 0) {
			const nightFactor = 1 - Math.abs(dayFactor);
			glowGradient.addColorStop(0, ColourUtils.interpolateColor(colors.night1, colors.dawnDusk, nightFactor));
			glowGradient.addColorStop(1, colors.night2);
		}

		this.ctx.globalAlpha = this.settings.maxAlpha;
		this.ctx.fillStyle = glowGradient;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
	}
}
window.SkyCanvasMoonGlow = SkyCanvasMoonGlow;
