/* eslint-disable no-undef */
class SkyCanvasWeather extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.currentWeather = "clear";
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

		this.Cloud = class Cloud extends this.CloudElement {
			constructor(obj, type, sprite, x, y, movementSpeed) {
				super(obj, sprite, x, y, movementSpeed);
				this.type = type;
				this.z = 0;
				this.destroy = false;
			}

			move(elapsedTime) {
				if (elapsedTime === 0) return;
				const speedFactor = 1 / this.z;
				const adjustedSpeed =
					this.movementSpeed * speedFactor +
					(this.destroy ? Weather.Settings.visuals.clouds.movement.speedMin + Weather.Settings.visuals.clouds.movement.speedMax : 0);
				this.x += adjustedSpeed * elapsedTime;
			}

			draw() {
				// Darken the cloud if z-value is more than 1
				super.draw();
				this.cloudCtx.globalCompositeOperation = "source-atop";

				if (Weather.overcast) {
					this.cloudCtx.globalAlpha = 0.5;
					this.cloudCtx.fillStyle = Weather.Settings.visuals.clouds.farColor;
					this.cloudCtx.fillRect(0, 0, this.sprite.width, this.sprite.height);
				}

				if (this.z > 1) {
					this.cloudCtx.globalAlpha = 1 - Math.clamp((this.z - 1) * (1 - Weather.Settings.visuals.clouds.farOpacity), 0, 1);
					this.cloudCtx.fillStyle = Weather.Settings.visuals.clouds.farColor;
					this.cloudCtx.fillRect(0, 0, this.sprite.width, this.sprite.height);
				}
			}
		};
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

				// Repeating texture - draw the same texture to the left or right
				this.cloudCtx.drawImage(this.sprite, this.x, 0);
				if (this.x > 0) {
					this.cloudCtx.drawImage(this.sprite, this.x - this.sprite.width, 0);
				} else if (this.x < 0) {
					this.cloudCtx.drawImage(this.sprite, this.x + this.sprite.width, 0);
				}

				this.cloudCtx.fillStyle = Weather.Settings.visuals.clouds.overCastDayColor;
				this.cloudCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

				ctx.drawImage(this.canvasElement, 0, 0);
				this.cloudCtx.globalAlpha = 1;
			}
		};
	}

	createCanvasImage() {
		this.cloudSprites = [];
		this.clouds = [];
		this.loadCloudSprites();

		this.canvas = $("<canvas/>", {
			id: this.name,
		});
		this.canvasElement = this.canvas[0];
		this.ctx = this.canvasElement.getContext("2d");

		this.canvasElement.width = Weather.Settings.visuals.canvasDimensions.width;
		this.canvasElement.height = Weather.Settings.visuals.canvasDimensions.height;

		const x = 0;
		const y = 0;
		this.canvas.css({
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	loadCloudSprites() {
		this.settings.images.forEach((value, key) => {
			const img = new Image();
			img.src = this.settings.imgPath + key;
			this.cloudSprites.push({ img, size: value });
		});
	}

	loaded() {
		const loadSprites = this.cloudSprites.map((sprite, index) => {
			return new Promise(resolve => {
				sprite.img.onload = resolve;
				sprite.img.onerror = e => {
					console.error("Error loading cloud sprite (undefined):", sprite.img.src);
					this.cloudSprites.splice(index, 1);
					resolve();
				};
			});
		});
		return Promise.all(loadSprites).then(() => {
			this.currentDate = 0;
			this.cloudsCanvas = $("<canvas/>")[0];
			if (this.cloudSprites.length > 0) {
				const typeSprites = this.cloudSprites.filter(sprite => sprite.size === "overcast");
				if (typeSprites.length > 0) {
					const type = typeSprites[random(0, typeSprites.length - 1)];
					const movementSpeed = 0.1;
					const xPos = random(0, type.img.width);
					this.overCastObj = new this.OverCast(this, type.img, xPos, 0, movementSpeed);
				}
			}
		});
	}

	updateWeather(date, instant = false) {
		this.elapsedTime = this.currentDate === 0 ? 0 : this.currentDate.compareWith(date, true) / Time.secondsPerMinute;

		this.currentDate = new DateTime(date);
		if (this.elapsedTime > 3 * 60) {
			instant = true;
			this.elapsedTime = 0;
		}

		if (!instant && this.currentWeather === Weather.name) return;

		if (instant) {
			this.clouds = [];
		} else {
			this.clouds.forEach(cloud => {
				if (!cloud.destroy) {
					cloud.destroy = true;
				}
			});
		}

		this.currentWeather = Weather.current.name;
		this.currentBehavior = Weather.type;

		this.movementSpeed = randomFloat(this.settings.movement.speedMin, this.settings.movement.speedMax);

		this.createBackground(instant);

		for (const key in this.currentBehavior.cloudCount) {
			if (Object.hasOwn(Weather.type.cloudCount, key)) {
				const count = Weather.type.cloudCount[key]();
				for (let i = 0; i < count; i++) {
					this.clouds.push(this.createCloud(key, instant));
				}
			}
		}
		console.warn("this.clouds", this.clouds);
	}

	createBackground(instant) {
		if (Weather.overcast) {
			if (this.overCastObj.fadeTarget === 1) return;
			this.overCastObj.fadeTarget = 1;
			if (instant) this.overCastObj.fadeFactor = 1;
			return;
		}
		if (this.overCastObj && this.overCastObj.fadeTarget !== 0) {
			this.overCastObj.fadeTarget = 0;
			if (instant) this.overCastObj.fadeFactor = 0;
		}
	}

	createCloud(cloudType, randomPosition = false, startX = 0) {
		// Filter out sprites of the same type - to reduce duplicates (2 of the same type of sprite in a row)
		const cloudSprite = this.reduceDuplicateClouds(cloudType);

		let xPosition, yPosition;
		let nextCloud = null;

		let attempts = 0;

		do {
			xPosition = randomPosition
				? random(-cloudSprite.img.width / 2, Weather.Settings.visuals.canvasDimensions.width - cloudSprite.img.width / 2)
				: startX !== 0
				? startX
				: random(-cloudSprite.img.width * 1.5, -cloudSprite.img.width);
			yPosition = random(this.settings.maxHeight - cloudSprite.img.height / 2, this.settings.minHeight - cloudSprite.img.height / 2);

			const movementSpeed = this.movementSpeed;

			nextCloud = new this.Cloud(this, cloudType, cloudSprite.img, xPosition, yPosition, movementSpeed);
			nextCloud.z = 1;

			let maxZ = 0;
			this.clouds.forEach(prevCloud => {
				this.isSpriteOverlap(prevCloud, nextCloud, 1);
				if (this.isSpriteOverlap(prevCloud, nextCloud, this.settings.spriteOverlap)) {
					maxZ = Math.max(maxZ, prevCloud.z);
				}
			});
			nextCloud.z = maxZ + 1;
			nextCloud.draw();

			attempts++;
		} while (attempts < 5 && !this.isPositionValid(nextCloud, xPosition, yPosition));

		return nextCloud;
	}

	isPositionValid(newCloud) {
		for (const cloud of this.clouds) {
			if (this.isSpriteOverlap(cloud, newCloud, this.settings.spriteOverlap) && cloud.z === newCloud.z) {
				return false;
			}
		}
		return true;
	}

	reduceDuplicateClouds(cloudType) {
		const typeSprites = this.cloudSprites.filter(sprite => sprite.size === cloudType);
		const spriteUsage = typeSprites.map(sprite => ({
			sprite,
			usageCount: this.clouds.filter(cloud => cloud.sprite === sprite.img).length,
		}));

		const unusedSprites = spriteUsage.filter(item => item.usageCount === 0).map(item => item.sprite);
		const leastUsedSprite = spriteUsage.reduce((min, item) => (item.usageCount < min.usageCount ? item : min), spriteUsage[0]).sprite;

		return unusedSprites.length > 0 ? unusedSprites[random(0, unusedSprites.length - 1)] : leastUsedSprite;
	}

	darken(ctx, dayFactor) {
		ctx.globalCompositeOperation = "source-atop";

		// if (Weather.type.darken) {
			// Darken based on interpolated value fade
		// }

		const color = ColourUtils.interpolateColor(this.settings.dawnDuskColor, this.settings.dayColor, this.normalize(dayFactor));
		const mask = ColourUtils.interpolateColor(this.settings.nightColor, color, this.normalize(dayFactor));

		ctx.fillStyle = mask;
		ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		ctx.globalCompositeOperation = "source-over";
	}

	draw(moonCanvas, dayFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.globalAlpha = 1;

		this.cloudCtx = this.cloudsCanvas.getContext("2d");
		this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		// Update overcast background
		this.overCastObj.update(this.overCastObj.cloudCtx, this.elapsedTime, dayFactor);
		if (this.overCastObj.fadeFactor > 0) {
			this.darken(this.overCastObj.cloudCtx, dayFactor);
			this.ctx.drawImage(this.overCastObj.canvasElement, 0, 0);
		}

		// Update cloud sprites
		this.clouds
			.sort((a, b) => b.z - a.z)
			.forEach(cloud => {
				cloud.update(this.cloudCtx, this.elapsedTime);
			});
		this.darken(this.cloudCtx, dayFactor);

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
					this.clouds.splice(i, 1, this.createCloud(cloud.type, false, newCloudStartX));
				} else {
					this.clouds.splice(i, 1);
				}
			}
		}
	}
}
window.SkyCanvasWeather = SkyCanvasWeather;
