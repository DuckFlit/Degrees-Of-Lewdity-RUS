/* eslint-disable no-undef */
class SkyCanvasPrecipitation extends SkyCanvasAnimationEffects {
	updateEffects(cloudPositions, dayFactor = 1) {
		this.effects.forEach(effect => effect.stop());
		this.effects = [];
		this.dayFactor = dayFactor;
		this.currentType = Weather.precipitation;
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		if (Weather.current.precipitationIntensity > 0) {
			this.addPrecipitation(cloudPositions);
		}
		console.log("this.effects", this.effects);
	}

	addPrecipitation(clouds) {
		const type = Weather.precipitation;
		const sprite = this.sprites[type];
		const settings = this.settings[type];

		if (!sprite) return;

		const spriteWidth = sprite.img.width / sprite.frameCount;
		const spriteHeight = sprite.img.height;

		clouds
			.filter(cloud => cloud.z === 1)
			.forEach(({ x, y, sprite: cloudSprite }) => {
				const startY = y + cloudSprite.height + settings.verticalOffset;
				const endY = this.canvasElement.height;

				const spriteCountX = Math.max(1, Math.floor(cloudSprite.width / (spriteWidth + settings.spriteOverlap)));
				const spriteCountY = Math.max(1, Math.ceil((endY - startY) / spriteHeight));

				for (let i = 0; i < spriteCountX; i++) {
					for (let j = 0; j < spriteCountY; j++) {
						const effectX = x + settings.startOffsetX + i * (spriteWidth + settings.spriteOverlap) - j * settings.diagonalOffset;
						const effectY = startY + j * spriteHeight;
						const effect = new this.Precipitation(this, sprite, effectX, effectY, spriteWidth, spriteHeight, settings.fps);
						this.effects.push(effect);
						effect.start();
					}
				}
			});
	}

	redrawEffects() {
		this.ctx.save();
		const settings = this.settings[this.currentType];
		const factor = normalise(this.dayFactor, 1, -1);
		const alpha = interpolate(settings.nightOpacity, settings.dayOpacity, factor);

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		if (this.effects.length === 0) return;
		this.effects.forEach(effect => {
			this.ctx.globalAlpha = alpha;
			effect.draw();
		});

		const minY = this.effects[0].y;
		const gradientStart = minY;
		const gradientEnd = minY + 40;

		const gradient = this.ctx.createLinearGradient(0, gradientStart, 0, gradientEnd);
		gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
		gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

		this.ctx.globalCompositeOperation = "destination-out";
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.globalCompositeOperation = "source-over"; // Reset the composite operation
		this.ctx.restore();
	}
}
window.SkyCanvasPrecipitation = SkyCanvasPrecipitation;
