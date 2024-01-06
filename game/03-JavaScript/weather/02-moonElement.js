/* eslint-disable no-undef */
class SkyCanvasMoon extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.loadSprites(); // Load the moon sprite
	}

	loaded() {
		return new Promise((resolve, reject) => {
			this.sprites[0].onload = () => {
				this.canvasElement.width = this.sprites[0].width + this.settings.glow.size * 2;
				this.canvasElement.height = this.sprites[0].height + this.settings.glow.size * 2;
				this.position.diameter = this.sprites[0].width;
				this.spriteDiameter = this.position.diameter + 1;
				this.radius = this.spriteDiameter / 2;
				this.centerPos = (this.canvasElement.width - this.spriteDiameter) / 2 + this.radius;

				this.offscreenCanvas = $("<canvas/>")[0];
				this.shadowCanvas = $("<canvas/>")[0];
				resolve();
			};
			this.sprites[0].onerror = reject;
		});
	}

	updateCanvas(moonPhaseFraction) {
		this.updateShadow(moonPhaseFraction);

		this.offscreenCanvas.width = this.canvasElement.width;
		this.offscreenCanvas.height = this.canvasElement.height;
		const offscreenCtx = this.offscreenCanvas.getContext("2d");

		offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

		// Prepare the glow effect
		offscreenCtx.fillStyle = this.settings.glow.color;
		offscreenCtx.beginPath();
		offscreenCtx.arc(this.centerPos, this.centerPos, this.radius - 1, 0, 2 * Math.PI);
		offscreenCtx.fill();

		// First shadow-pass
		offscreenCtx.globalCompositeOperation = "destination-out";
		offscreenCtx.drawImage(this.shadowCanvas, 0, 0);

		// Cut away most of the inner glow to make the texture appear
		offscreenCtx.globalCompositeOperation = "destination-out";
		offscreenCtx.fillStyle = "black";
		offscreenCtx.beginPath();
		offscreenCtx.arc(this.centerPos, this.centerPos, this.radius - 3, 0, 2 * Math.PI);
		offscreenCtx.fill();

		// Draw the texture below the glow
		offscreenCtx.globalCompositeOperation = "destination-over";
		offscreenCtx.drawImage(this.sprites[0], this.centerPos - this.radius, this.centerPos - this.radius, this.sprites[0].width, this.sprites[0].height);

		// Second shadow pass - makes the shadow-area completely transparent
		offscreenCtx.globalCompositeOperation = "destination-out";
		offscreenCtx.drawImage(this.shadowCanvas, 0, 0);
	}

	updateShadow(moonPhaseFraction) {
		this.shadowCanvas.width = this.canvasElement.width;
		this.shadowCanvas.height = this.canvasElement.height;
		const shadowCtx = this.shadowCanvas.getContext("2d");

		shadowCtx.clearRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height);

		// Rotate the canvas based on angle setting
		shadowCtx.save();
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

	draw(lightFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		if (Weather.overcast || Weather.fog) {
			this.ctx.filter = "blur(2px)";
		}

		// Set transparency for the whole moon - from settings
		const interpolatedTransparency = this.interpolate(this.settings.visibility.night, this.settings.visibility.day, this.normalize(lightFactor));
		this.ctx.globalAlpha = interpolatedTransparency;

		// Glow effect only on non-shadow parts
		this.ctx.shadowBlur = this.settings.glow.size;
		this.ctx.shadowColor = this.settings.glow.color;

		this.ctx.drawImage(this.offscreenCanvas, 0, 0);
		this.ctx.globalAlpha = interpolatedTransparency;

		// Apply a transparent texture on top of the shadow-area based on settings
		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = "transparent";
		this.ctx.globalCompositeOperation = "destination-over";
		this.ctx.globalAlpha = this.interpolate(
			this.settings.shadow.opacity.night / interpolatedTransparency,
			this.settings.shadow.opacity.day / interpolatedTransparency,
			this.normalize(lightFactor)
		);
		this.ctx.drawImage(
			this.sprites[0],
			Math.round(this.centerPos - this.radius),
			Math.round(this.centerPos - this.radius),
			this.sprites[0].width,
			this.sprites[0].height
		);
		//}

		// Reset global settings
		this.ctx.globalCompositeOperation = "source-over";
		this.ctx.globalAlpha = 1;
		this.ctx.filter = "none";

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
