/* eslint-disable no-undef */
/*
	WARNING: Do not modify this file before the next update.
	It's getting a major refactor and everything below will be replaced.
*/
class SkyCanvasSky extends SkyCanvasElement {
	draw(sun, moon, dayFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		const sunPosition = {
			x: sun.position.adjustedX,
			y: sun.position.adjustedY,
		};

		const moonPosition = {
			x: moon.position.adjustedX,
			y: moon.position.adjustedY,
		};

		// Create radial gradients for the sun glow and the sky background
		const sunGradient = this.ctx.createRadialGradient(sunPosition.x, sunPosition.y, 0, sunPosition.x, sunPosition.y, this.settings.glowRadius.day);
		const moonGradient = this.ctx.createRadialGradient(moonPosition.x, moonPosition.y, 0, moonPosition.x, moonPosition.y, this.settings.glowRadius.night);

		// Determine the colors based on the day factor
		const colors = this.settings.colors;

		if (dayFactor > 0) {
			// Daytime gradient
			sunGradient.addColorStop(0, ColourUtils.interpolateColor(colors.dawnDusk.sky1, colors.day.sky1, dayFactor));
			sunGradient.addColorStop(1, ColourUtils.interpolateColor(colors.dawnDusk.sky2, colors.day.sky2, dayFactor));
		} else {
			// Nighttime gradient
			const nightFactor = 1 - Math.abs(dayFactor);
			const state = Weather.bloodMoon ? "bloodMoon" : "night";
			const moonGlowFactor = Weather.bloodMoon ? 1 : 1 - 2 * Math.abs(Time.date.moonPhaseFraction - 0.5);

			sunGradient.addColorStop(0, ColourUtils.interpolateColor("#ffffff00", colors.dawnDusk.sky1, nightFactor));
			sunGradient.addColorStop(1, ColourUtils.interpolateColor("#ffffff00", colors.dawnDusk.sky2, nightFactor));

			const moonGlowColor = ColourUtils.interpolateColor(colors[state].sky2, colors[state].sky1, moonGlowFactor)
			moonGradient.addColorStop(0, ColourUtils.interpolateColor(moonGlowColor, colors.dawnDusk.sky1, nightFactor));
			moonGradient.addColorStop(1, ColourUtils.interpolateColor(colors[state].sky2, colors.dawnDusk.sky2, nightFactor));
			this.ctx.fillStyle = moonGradient;
			this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		}

		this.ctx.fillStyle = sunGradient;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
	}
}
window.SkyCanvasSky = SkyCanvasSky;
