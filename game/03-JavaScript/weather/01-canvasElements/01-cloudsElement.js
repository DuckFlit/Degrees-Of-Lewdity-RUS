/* eslint-disable no-undef */
class SkyCanvasClouds extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.elapsedTime = 0;
		this.movementSpeed = 0;

		this.CloudElement = class CloudElement {
			constructor(obj, sprite, x, y, movementSpeed) {
				this.obj = obj;
				this.sprite = sprite;
				this.x = x;
				this.y = y;
				this.movementSpeed = movementSpeed;
				this.canvasElement = $("<canvas/>")[0];
				this.canvasElement.width = this.sprite.width;
				this.canvasElement.height = this.sprite.height;
				this.cloudCtx = this.canvasElement.getContext("2d");
			}

			updateFade(elapsedTime, dayFactor) {
				const fadeChange = (1 / this.fadeSpeed) * Math.abs(elapsedTime);
				const fadeDirection = Math.sign(this.fadeTarget - this.fadeFactor);

				if (fadeDirection !== 0) {
					this.fadeFactor += fadeChange * fadeDirection;

					// Ensure fadeFactor does not overshoot fadeTarget
					if ((fadeDirection > 0 && this.fadeFactor > this.fadeTarget) || (fadeDirection < 0 && this.fadeFactor < this.fadeTarget)) {
						this.fadeFactor = this.fadeTarget;
					}

					// Clamp fadeFactor to be within 0 to 1
					this.fadeFactor = Math.clamp(this.fadeFactor, 0, 1);
				}

				this.cloudCtx.globalAlpha = this.fadeFactor * dayFactor;
			}

			draw() {
				if (this.opacity) this.cloudCtx.globalAlpha = this.opacity;
				this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
				this.cloudCtx.drawImage(this.sprite, 0, 0);
			}

			move(elapsedTime) {
				if (elapsedTime === 0) return;
				this.x += this.movementSpeed * elapsedTime;
			}

			update(ctx, elapsedTime) {
				this.move(elapsedTime);
				const x = Math.round(this.x);
				const y = Math.round(this.y);
				ctx.drawImage(this.canvasElement, x, y);
			}
		};
	}

	trimClouds() {
		for (let i = this.clouds.length - 1; i >= 0; i--) {
			const cloud = this.clouds[i];
			if (cloud.x >= this.canvasElement.width) {
				if (!cloud.destroy) {
					const extraX = this.canvasElement.width - cloud.x;
					let newCloudStartX = 0;
					if (extraX > cloud.sprite.width / 2) {
						newCloudStartX =
							extraX > this.canvasElement.width + cloud.sprite.width / 2
								? random(-cloud.sprite.img.width / 2, Weather.SkySettings.canvasDimensions.width)
								: extraX;
					}
					this.clouds.splice(i, 1, this.createCloud(cloud.type, false, newCloudStartX));
				} else {
					this.clouds.splice(i, 1);
				}
			}
		}
	}

	loaded() {
		return super.loaded().then(() => {
			this.currentDate = 0;
			this.onLoad();
		});
	}

	onLoad() {}

	updateWeather(instant) {
		this.elapsedTime = this.currentDate === 0 ? 0 : this.currentDate.compareWith(Time.date, true) / Time.secondsPerMinute;

		this.currentDate = new DateTime(Time.date);
		if (this.elapsedTime > 3 * 60) {
			instant = true;
			this.elapsedTime = 0;
		}
		return instant;
	}

	/**
	 * A position is considered valid if the new cloud does not overlap with any existing clouds at the same z-index.
	 *
	 * @param {object} newCloud The cloud object to be checked
	 * @param overlap
	 * @returns {boolean} Returns true if the position is valid, false otherwise.
	 */
	isPositionValid(newCloud, overlap) {
		for (const cloud of this.clouds) {
			if (this.isSpriteOverlap(cloud, newCloud, overlap) && cloud.z === newCloud.z) {
				return false;
			}
		}
		return true;
	}

	darken(ctx, dayFactor, overcastFactor) {
		ctx.globalCompositeOperation = "source-atop";

		const nightColor = Weather.bloodMoon ? "bloodMoonColor" : "nightColor";
		overcastFactor = overcastFactor * (1 - Weather.type.visibility);

		const dayColor =
			Weather.precipitation === "snow"
				? this.settings.dayColor
				: ColourUtils.interpolateColor(this.settings.dayColor, this.settings.overcastColor, overcastFactor);
		const color = ColourUtils.interpolateColor(this.settings.dawnDuskColor, dayColor, normalise(dayFactor, 1, -1));
		const mask = ColourUtils.interpolateColor(this.settings[nightColor], color, normalise(dayFactor, 1, -1));

		if (Weather.precipitation === "snow") {
			ctx.globalAlpha = 0.8;
		}
		ctx.fillStyle = mask;
		ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 1;
	}

	draw() {}
}
window.SkyCanvasClouds = SkyCanvasClouds;
