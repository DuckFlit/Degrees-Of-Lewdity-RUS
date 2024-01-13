/* eslint-disable no-undef */
class SkyCanvasBackgroundPrecipitation extends SkyCanvasAnimationEffects {
	updateEffects(dayFactor = 1) {
		this.effects.forEach(effect => effect.stop());
		this.effects = [];
		this.dayFactor = dayFactor;
		this.currentType = Weather.precipitation;
		this.mask = this.sprites.mask;
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		if (Weather.current.precipitationIntensity > 0 && Weather.overcast) {
			this.addPrecipitation();
		}
	}

	addPrecipitation() {
		const type = this.currentType;
		const sprite = this.sprites[type];
		const settings = this.settings[type];
		this.scale = settings.scale;

		console.log("SPRITE", sprite);
		if (!sprite) return;

		const spriteWidth = sprite.img.width / sprite.frameCount;
		const spriteHeight = sprite.img.height;
		const startY = 0; // Start at the top of the canvas
		const endY = this.canvasElement.height;

		const spriteCountY = Math.max(1, Math.ceil((endY - startY) / spriteHeight) / this.scale);

		for (let i = 0; i < spriteCountY; i++) {
			const effectY = i * spriteHeight;
			let effectX = settings.startOffsetX + i * settings.spriteOverlap;
			while (effectX <= this.canvasElement.width / this.scale) {
				const effect = new this.Precipitation(this, sprite, effectX, effectY, spriteWidth, spriteHeight, settings.fps);
				this.effects.push(effect);
				effect.start();
				effectX += spriteWidth + settings.spriteOverlap;
			}
		}
	}

	redrawEffects() {
		this.ctx.save();
		const settings = this.settings[this.currentType];
		const factor = normalise(this.dayFactor, 1, -1);
		const alpha = interpolate(settings.nightOpacity, settings.dayOpacity, factor);

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		if (this.effects.length === 0) return;

		this.effects.forEach(effect => {
			this.ctx.save();
			this.ctx.globalAlpha = alpha;
			this.ctx.scale(this.scale, this.scale);
			effect.draw();
			this.ctx.restore();
		});

		this.ctx.globalAlpha = 1;
		this.ctx.globalCompositeOperation = "source-atop";
		this.ctx.fillStyle = ColourUtils.interpolateColor(settings.darkenColorDay, settings.darkenColorNight, 1 - this.dayFactor);
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		this.ctx.globalCompositeOperation = "destination-out";
		this.ctx.globalAlpha = settings.maskAlpha;

		this.ctx.drawImage(this.mask.img, 0, 0, this.canvasElement.width, this.canvasElement.height);

		this.ctx.restore();
	}
}
window.SkyCanvasBackgroundPrecipitation = SkyCanvasBackgroundPrecipitation;
