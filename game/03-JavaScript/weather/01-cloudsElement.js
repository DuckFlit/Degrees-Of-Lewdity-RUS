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

	loadSprites() {
		this.settings.images.forEach((value, key) => {
			const img = new Image();
			img.src = this.settings.imgPath + key;
			this.sprites.push({ img, type: value });
		});
	}

	loaded() {
		const loadSprites = this.sprites.map((sprite, index) => {
			return new Promise(resolve => {
				sprite.img.onload = resolve;
				sprite.img.onerror = e => {
					console.error("Error loading cloud sprite (undefined):", sprite.img.src);
					this.sprites.splice(index, 1);
					resolve();
				};
			});
		});
		return Promise.all(loadSprites).then(() => {
			this.currentDate = 0;
			this.onLoad();
		});
	}

	onLoad() {}

	updateWeather(date, instant) {
		this.elapsedTime = this.currentDate === 0 ? 0 : this.currentDate.compareWith(date, true) / Time.secondsPerMinute;

		this.currentDate = new DateTime(date);
		if (this.elapsedTime > 3 * 60) {
			instant = true;
			this.elapsedTime = 0;
		}
		return instant;
	}

	darken(ctx, dayFactor, overcastFactor) {
		ctx.globalCompositeOperation = "source-atop";

		overcastFactor = overcastFactor * (1 - Weather.type.visibility);
		const dayColor =
			Weather.precipitation === "snow"
				? this.settings.dayColor
				: ColourUtils.interpolateColor(this.settings.dayColor, this.settings.overcastColor, overcastFactor);
		const color = ColourUtils.interpolateColor(this.settings.dawnDuskColor, dayColor, this.normalize(dayFactor));
		const mask = ColourUtils.interpolateColor(this.settings.nightColor, color, this.normalize(dayFactor));

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
