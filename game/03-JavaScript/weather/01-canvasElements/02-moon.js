/* eslint-disable no-undef */
class SkyCanvasMoon extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.moonSprite = null;
		this.blurFactor = 0;
	}

	loaded() {
		return super.loaded().then(() => {
			const canvasSize = Math.max(...Object.values(this.settings.glow).map(glow => glow.size));
			this.orbit = this.settings.orbit;
			this.canvasElement.width = this.sprites[0].img.width + canvasSize * 2;
			this.canvasElement.height = this.sprites[0].img.height + canvasSize * 2;
			this.position.diameter = this.sprites[0].img.width;
			this.spriteDiameter = this.position.diameter + 1;
			this.radius = this.spriteDiameter / 2;
			this.centerPos = (this.canvasElement.width - this.spriteDiameter) / 2 + this.radius;

			this.moonCanvas = $("<canvas/>")[0];
			this.shadowCanvas = $("<canvas/>")[0];
		});
	}

	updateCanvas(moonPhaseFraction) {
		const fraction = Weather.bloodMoon ? 0.5 : moonPhaseFraction;
		const nightColor = Weather.bloodMoon ? "bloodMoon" : "night";
		const sprite = this.sprites.find(sprite => sprite.type === nightColor).img;

		this.updateShadow(fraction);

		this.moonCanvas.width = this.canvasElement.width;
		this.moonCanvas.height = this.canvasElement.height;
		const moonCtx = this.moonCanvas.getContext("2d");

		moonCtx.clearRect(0, 0, this.moonCanvas.width, this.moonCanvas.height);

		// Prepare the glow effect
		moonCtx.fillStyle = this.settings.glow[nightColor].color;
		moonCtx.globalAlpha = this.settings.glow[nightColor].opacity;
		moonCtx.beginPath();
		moonCtx.arc(this.centerPos, this.centerPos, this.radius - 1, 0, 2 * Math.PI);
		moonCtx.fill();

		// First shadow-pass
		moonCtx.globalCompositeOperation = "destination-out";
		moonCtx.drawImage(this.shadowCanvas, 0, 0);

		// Cut away most of the inner glow to make the texture appear
		moonCtx.globalCompositeOperation = "destination-out";
		moonCtx.fillStyle = "black";
		moonCtx.beginPath();
		moonCtx.arc(this.centerPos, this.centerPos, this.radius - 3, 0, 2 * Math.PI);
		moonCtx.fill();

		// Draw the texture below the glow
		moonCtx.globalCompositeOperation = "destination-over";
		moonCtx.drawImage(sprite, this.centerPos - this.radius, this.centerPos - this.radius, sprite.width, sprite.height);

		// Second shadow pass - makes the shadow-area completely transparent
		moonCtx.globalCompositeOperation = "destination-out";
		moonCtx.drawImage(this.shadowCanvas, 0, 0);
	}

	updateShadow(moonPhaseFraction) {
		this.shadowCanvas.width = this.canvasElement.width;
		this.shadowCanvas.height = this.canvasElement.height;
		const shadowCtx = this.shadowCanvas.getContext("2d");

		shadowCtx.clearRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height);
		shadowCtx.save();

		// Rotate the canvas based on angle setting
		shadowCtx.translate(this.centerPos, this.centerPos);
		shadowCtx.rotate((this.settings.shadow.angle * Math.PI) / 180);
		shadowCtx.translate(-this.centerPos, -this.centerPos);

		shadowCtx.fillStyle = "black";
		shadowCtx.beginPath();
		const radius = this.radius + 2;

		// Calculate the shadow arc offset based on the moon-phase
		let antiClockwise = false;
		let flippedRadius = radius;
		if (moonPhaseFraction > 0.5) {
			antiClockwise = true;
			moonPhaseFraction = 1 - moonPhaseFraction;
			flippedRadius = -radius;
		}
		const fraction = moonPhaseFraction * 4;

		// Offset depends on if it's before or after half-moon
		const offset = fraction <= 1 ? flippedRadius * 2 * (1 - fraction) : flippedRadius * 2 * (0.5 - Math.abs(0.5 - fraction));

		if (fraction === 0) {
			// New moon
			shadowCtx.arc(this.centerPos, this.centerPos, radius, 0, 2 * Math.PI);
		} else if (fraction === 2) {
			// Full moon
			return;
		} else {
			// Other phases
			shadowCtx.moveTo(this.centerPos, this.centerPos - radius);
			if (fraction < 2) {
				shadowCtx.arc(this.centerPos, this.centerPos, radius, Math.PI / 2, (3 * Math.PI) / 2, antiClockwise);
			} else {
				shadowCtx.arc(this.centerPos, this.centerPos, radius, (3 * Math.PI) / 2, Math.PI / 2, !antiClockwise);
			}
			shadowCtx.quadraticCurveTo(this.centerPos + offset, this.centerPos, this.centerPos, this.centerPos + radius);
		}

		shadowCtx.closePath();
		shadowCtx.fill();
		shadowCtx.restore();
	}

	setOrbit(currentTime) {
		const orbit = Weather.bloodMoon ? this.settings.bloodMoonOrbit : this.settings.orbit;
		super.setOrbit(currentTime, orbit);
	}

	setBlur() {
		if (this.blurFactor === 0) {
			this.ctx.filter = "none";
			return;
		}
		const blurAmount = Math.clamp(this.blurFactor * 2.5, 0, 2);
		this.ctx.filter = `blur(${blurAmount}px)`;
	}

	draw(lightFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		const nightColor = Weather.bloodMoon ? "bloodMoon" : "night";
		const sprite = this.sprites.find(sprite => sprite.type === nightColor).img;

		// Set transparency for the whole moon - from settings
		const interpolatedTransparency = interpolate(this.settings.visibility.night, this.settings.visibility.day, normalise(lightFactor, 1, -1));
		this.ctx.globalAlpha = interpolatedTransparency;

		this.setBlur();

		// Glow effect only on non-shadow parts
		this.ctx.shadowBlur = this.settings.glow[nightColor].size;
		this.ctx.shadowColor = this.settings.glow[nightColor].color;
		this.ctx.globalAlpha = this.settings.glow[nightColor].opacity;

		this.ctx.drawImage(this.moonCanvas, 0, 0);
		this.ctx.globalAlpha = interpolatedTransparency;

		// Apply a transparent texture on top of the shadow-area based on settings
		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = "transparent";
		this.ctx.globalCompositeOperation = "destination-over";
		this.ctx.globalAlpha = interpolate(
			this.settings.shadow.opacity.night / interpolatedTransparency,
			this.settings.shadow.opacity.day / interpolatedTransparency,
			normalise(lightFactor, 1, -1)
		);
		this.ctx.drawImage(sprite, Math.round(this.centerPos - this.radius), Math.round(this.centerPos - this.radius), sprite.width, sprite.height);

		// Reset global settings
		this.ctx.globalCompositeOperation = "source-over";
		this.ctx.globalAlpha = 1;

		// Position the canvas
		this.position.x = this.position.adjustedX - this.canvasElement.width / 2;
		this.position.y = this.position.adjustedY - this.canvasElement.height / 2;
		this.canvas.css({
			left: `${this.position.x}px`,
			top: `${this.position.y}px`,
		});
	}
}
window.SkyCanvasMoon = SkyCanvasMoon;
