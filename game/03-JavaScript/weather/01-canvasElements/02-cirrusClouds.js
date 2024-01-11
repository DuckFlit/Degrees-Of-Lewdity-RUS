/* eslint-disable no-undef */
class SkyCanvasCirrus extends SkyCanvasClouds {
	constructor(name, settings) {
		super(name, settings);
		this.clouds = [];

		this.Cirrus = class Cirrus extends this.CloudElement {
			constructor(obj, sprite, x, y, movementSpeed) {
				super(obj, sprite, x, y, movementSpeed);
				this.destroy = false;
				this.fadeFactor = 0;
				this.fadeTarget = 0;
				this.fadeSpeed = obj.settings.fadeDuration;
			}

			updateFade(elapsedTime, dayFactor) {
				const fadeChange = (1 / this.fadeSpeed) * Math.abs(elapsedTime);
				const fadeDirection = Math.sign(this.fadeTarget - this.fadeFactor);

				if (fadeDirection !== 0) {
					this.fadeFactor += fadeChange * fadeDirection;
					this.fadeFactor = Math.clamp(this.fadeFactor, 0, 1);
				}

				this.cloudCtx.globalAlpha = this.fadeFactor * dayFactor;
			}

			update(ctx, elapsedTime, dayFactor) {
				this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
				const dayNightOpacity = interpolate(Weather.SkySettings.cirrus.alphaNight, Weather.SkySettings.cirrus.alphaDay, normalise(dayFactor, 1, -1));

				this.updateFade(elapsedTime, dayNightOpacity);
				this.draw();
				super.update(ctx, elapsedTime);
				this.cloudCtx.globalAlpha = 1;
			}
		};
	}

	onLoad() {
		this.cloudsCanvas = $("<canvas/>")[0];
	}

	updateWeather(date, instant = false) {
		instant = super.updateWeather(date, instant);
		if ((!instant && this.currentWeather === Weather.name) || !this.sprites.length) return;

		this.currentWeather = Weather.name;
		this.currentBehavior = Weather.type;

		if (instant) {
			this.clouds = [];
		} else {
			this.clouds.forEach(cloud => {
				if (!cloud.destroy) {
					cloud.destroy = true;
				}
			});
		}

		const count = random(this.settings.minCount, this.settings.maxCount);
		for (let i = 0; i < count; i++) {
			this.clouds.push(this.createCloud(instant));
		}
	}

	createCloud(instant, startX = 0) {
		const sprites = this.sprites.filter(sprite => sprite.type === "cirrus");
		const cloudSprite = sprites[random(0, sprites.length - 1)];

		let cloud = null;
		let attempts = 0;
		do {
			const xPosition = instant
				? random(-cloudSprite.img.width * 0.5, Weather.SkySettings.canvasDimensions.width - cloudSprite.img.width / 2)
				: startX !== 0
				? startX
				: random(-cloudSprite.img.width * 0.5, -cloudSprite.img.width);
			const yPosition = random(this.settings.minY, this.settings.maxY);
			const movementSpeed = this.settings.movementSpeed;
			cloud = new this.Cirrus(this, cloudSprite.img, xPosition, yPosition, movementSpeed);
			cloud.fadeTarget = 1;
			if (instant) cloud.fadeFactor = 1;
			cloud.draw();

			attempts++;
		} while (attempts < 5 && !this.isPositionValid(cloud, this.settings.spriteOverlap));
		return cloud;
	}

	draw(dayFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.globalAlpha = 1;

		this.cloudCtx = this.cloudsCanvas.getContext("2d");
		this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		this.clouds.forEach(cloud => {
			cloud.update(this.cloudCtx, this.elapsedTime, dayFactor);
		});
		this.darken(this.cloudCtx, dayFactor, 1);
		this.ctx.drawImage(this.cloudsCanvas, 0, 0);

		if (this.elapsedTime > 3 * 60) return;

		// Clean the array by removing faded out or hidden clouds
		this.trimClouds();
	}
}
window.SkyCanvasCirrus = SkyCanvasCirrus;
