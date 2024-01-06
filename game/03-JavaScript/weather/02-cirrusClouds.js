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

			updateFade(elapsedTime) {
				const fadeChange = (1 / this.fadeSpeed) * Math.abs(elapsedTime);
				const fadeDirection = Math.sign(this.fadeTarget - this.fadeFactor);

				if (fadeDirection !== 0) {
					this.fadeFactor += fadeChange * fadeDirection;
					this.fadeFactor = Math.clamp(this.fadeFactor, 0, 1);
				}
			}

			update(ctx, elapsedTime, dayFactor) {
				this.move(elapsedTime);

				this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

				this.updateFade(elapsedTime);

				const dayNightOpacity = this.obj.interpolate(
					Weather.Settings.visuals.clouds.overCastAlphaNight,
					Weather.Settings.visuals.clouds.overCastAlphaDay,
					this.obj.normalize(dayFactor)
				);

				this.cloudCtx.globalAlpha = this.fadeFactor * dayNightOpacity;

				// this.cloudCtx.drawImage(this.sprite, this.x, 0);

				// this.cloudCtx.fillStyle = Weather.Settings.visuals.clouds.overCastDayColor;
				// this.cloudCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

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

		const count = 3;
		for (let i = 0; i < count; i++) {
			this.clouds.push(this.createCloud(instant));
		}
		console.warn("CIRRUSISDADSASA", this.clouds);
	}

	createCloud(instant, startX = 0) {
		const sprites = this.sprites.filter(sprite => sprite.type === "cirrus");
		const cloudSprite = sprites[random(0, sprites.length - 1)];

		const xPosition = instant
			? random(-cloudSprite.img.width * 0.5, Weather.Settings.visuals.canvasDimensions.width - cloudSprite.img.width / 2)
			: startX !== 0
			? startX
			: random(-cloudSprite.img.width * 0.5, -cloudSprite.img.width);
		const yPosition = random(0, 32);
		const movementSpeed = 0.1;
		const cloud = new this.Cirrus(this, cloudSprite.img, xPosition, yPosition, movementSpeed);
		cloud.fadeTarget = 1;
		if (instant) cloud.fadeFactor = 0;
		cloud.draw();
		return cloud;
	}

	draw(dayFactor) {
		console.warn("this.clouds CIRRUS", this.clouds);

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.globalAlpha = 1;

		this.cloudCtx = this.cloudsCanvas.getContext("2d");
		this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		this.clouds.forEach(cloud => {
			cloud.update(this.cloudCtx, this.elapsedTime, 1);
		});
		//this.darken(this.cloudCtx, dayFactor, overcastFactor);

		this.ctx.drawImage(this.cloudsCanvas, 0, 0);

		if (this.elapsedTime > 3 * 60) return;

		// Clean the array by removing faded out or hidden clouds
		for (let i = this.clouds.length - 1; i >= 0; i--) {
			const cloud = this.clouds[i];
			if (cloud.x >= this.canvasElement.width) {
				if (!cloud.destroy) {
					const extraX = this.canvasElement.width - cloud.x;
					let newCloudStartX = 0;
					if (extraX > cloud.sprite.width / 2) {
						newCloudStartX =
							extraX > this.canvasElement.width + cloud.sprite.width / 2
								? random(-cloudSprite.img.width, Weather.Settings.visuals.canvasDimensions.width)
								: extraX;
					}
					this.clouds.splice(i, 1, this.createCloud(false, newCloudStartX));
				} else {
					this.clouds.splice(i, 1);
				}
			}
		}
	}
}
window.SkyCanvasCirrus = SkyCanvasCirrus;
