/* eslint-disable no-undef */
class SkyCanvasBackgroundPrecipitation extends SkyCanvasAnimationEffects {
	updateEffects(dayFactor = 1) {
		this.effects.forEach(effect => effect.stop());
		this.effects = [];
		this.dayFactor = dayFactor;
		this.currentType = Weather.precipitation;
		this.scale = 0.5;
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		if (Weather.current.precipitationIntensity > 0 && Weather.overcast) {
			this.addPrecipitation();
		}
	}

	addPrecipitation() {
		const type = this.currentType;
		const spriteFrames = this.sprites.filter(s => s.type === type).map(s => s.img);
		const settings = this.settings[type];
		const scaledSpriteWidth = spriteFrames[0].width * this.scale;
		const scaledSpriteHeight = spriteFrames[0].height * this.scale;
		const startY = 0; // Start at the top of the canvas
		const endY = this.canvasElement.height;
	
		const spriteCountX = Math.max(1, Math.floor((this.canvasElement.width / (scaledSpriteWidth + settings.spriteOverlap * this.scale)) * 2));
		const spriteCountY = Math.max(1, Math.ceil((endY - startY) / scaledSpriteHeight));
	
		for (let i = 0; i < spriteCountX; i++) {
			for (let j = 0; j < spriteCountY; j++) {
				// Calculate the x-coordinate with diagonalOffset for each row
				const offsetX = j * (settings.diagonalOffset * this.scale);
				const effectX = i * (scaledSpriteWidth + settings.spriteOverlap * this.scale) - offsetX;
	
				const effectY = j * scaledSpriteHeight;
				const effect = new this.Precipitation(this, spriteFrames, effectX, effectY, scaledSpriteWidth, scaledSpriteHeight, settings.fps);
				this.effects.push(effect);
				effect.start();
			}
		}
	}

	redrawEffects() {
		this.ctx.save();
		const settings = this.settings[this.currentType];
		const factor = this.normalize(this.dayFactor);
		const alpha = this.interpolate(0.05, settings.opacity, factor);

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		if (this.effects.length === 0) return;

		this.effects.forEach(effect => {
			this.ctx.save();
			this.ctx.globalAlpha = alpha;
			this.ctx.translate(effect.x * this.scale, effect.y * this.scale);
			this.ctx.scale(this.scale, this.scale);
			effect.draw();
			this.ctx.restore();
		});

		const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasElement.height);
		gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
		gradient.addColorStop(settings.fadePosition, "rgba(255, 255, 255, 0)");
		gradient.addColorStop(1, "rgba(255, 255, 255, 1)");

		this.ctx.globalCompositeOperation = "destination-out";
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		this.ctx.globalCompositeOperation = "source-atop"; // Reset the composite operation
		if (settings.darken > 0) {
			this.ctx.globalAlpha = settings.darken;
			this.ctx.fillStyle = settings.darkenColor;
			this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		}
		this.ctx.restore();
	}
}
window.SkyCanvasBackgroundPrecipitation = SkyCanvasBackgroundPrecipitation;
