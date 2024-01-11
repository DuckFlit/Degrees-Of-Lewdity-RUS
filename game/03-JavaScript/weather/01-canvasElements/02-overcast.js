/* eslint-disable no-undef */
class SkyCanvasOvercast extends SkyCanvasClouds {
	constructor(name, settings) {
		super(name, settings);
		this.overCastObj = {};

		this.OverCast = class OverCast extends this.CloudElement {
			constructor(obj, sprite, x, y, movementSpeed) {
				super(obj, sprite, x, y, movementSpeed);
				this.fadeFactor = 0; // Current fade factor (opacity)
				this.fadeTarget = 0; // Target fade factor
				this.fadeSpeed = obj.settings.fadeDuration;
			}

			move(elapsedTime) {
				if (elapsedTime === 0) return;
				this.x += this.movementSpeed * elapsedTime;
				if (this.x > this.sprite.width) {
					this.x -= this.sprite.width;
				} else if (this.x < -this.sprite.width) {
					this.x += this.sprite.width;
				}
			}

			update(ctx, elapsedTime, dayFactor) {
				this.move(elapsedTime);

				this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

				const dayNightOpacity = interpolate(
					Weather.SkySettings.overcast.alphaNight,
					Weather.SkySettings.overcast.alphaDay,
					normalise(dayFactor, 1, -1)
				);
				this.updateFade(elapsedTime, dayNightOpacity);

				// Repeating texture - draw the same texture to the left or right
				this.cloudCtx.drawImage(this.sprite, this.x, 0);
				if (this.x > 0) {
					this.cloudCtx.drawImage(this.sprite, this.x - this.sprite.width, 0);
				} else if (this.x < 0) {
					this.cloudCtx.drawImage(this.sprite, this.x + this.sprite.width, 0);
				}

				this.cloudCtx.fillStyle = Weather.SkySettings.clouds.overCastDayColor;
				this.cloudCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

				ctx.drawImage(this.canvasElement, 0, 0);
				this.cloudCtx.globalAlpha = 1;
			}
		};
	}

	onLoad() {
		if (this.sprites.length > 0) {
			const typeSprites = this.sprites.filter(sprite => sprite.type === "overcast");
			if (typeSprites.length > 0) {
				const type = typeSprites[random(0, typeSprites.length - 1)];
				const movementSpeed = 0.1;
				const xPos = random(0, type.img.width);
				this.overCastObj = new this.OverCast(this, type.img, xPos, 0, movementSpeed);
			}
		}
	}

	updateWeather(date, instant = false) {
		instant = super.updateWeather(date, instant);
		if (!instant && this.currentWeather === Weather.name) return;
		this.createBackground(instant);
	}

	createBackground(instant) {
		const overcastFactor = Weather.current.overcast;

		this.overCastObj.fadeTarget = overcastFactor;
		if (instant) {
			this.overCastObj.fadeFactor = overcastFactor;
		}
	}

	draw(moonCanvas, dayFactor) {
		const overcastFactor = this.overCastObj.fadeFactor;

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.globalAlpha = 1;

		// Update overcast background
		this.overCastObj.update(this.overCastObj.cloudCtx, this.elapsedTime, dayFactor);
		if (this.overCastObj.fadeFactor > 0) {
			this.darken(this.overCastObj.cloudCtx, dayFactor, overcastFactor);
			this.ctx.drawImage(this.overCastObj.canvasElement, 0, 0);
		}
	}
}
window.SkyCanvasOvercast = SkyCanvasOvercast;
