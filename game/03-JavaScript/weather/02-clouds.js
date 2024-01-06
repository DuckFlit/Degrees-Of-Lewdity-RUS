/* eslint-disable no-undef */
class SkyCanvasCloudy extends SkyCanvasClouds {
	constructor(name, settings) {
		super(name, settings);
		this.clouds = [];
		this.activeClouds = [];

		this.Cloud = class Cloud extends this.CloudElement {
			constructor(obj, type, sprite, x, y, movementSpeed) {
				super(obj, sprite, x, y, movementSpeed);
				this.type = type;
				this.z = 0;
				this.destroy = false;
				this.width = this.sprite.width;
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
	}

	onLoad() {
		this.cloudsCanvas = $("<canvas/>")[0];
	}

	updateWeather(date, instant = false) {
		instant = super.updateWeather(date, instant);
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

		for (const key in this.currentBehavior.cloudCount) {
			if (Object.hasOwn(Weather.type.cloudCount, key)) {
				const count = Weather.type.cloudCount[key]();
				for (let i = 0; i < count; i++) {
					this.clouds.push(this.createCloud(key, instant));
				}
			}
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
				? random(-cloudSprite.img.width, Weather.Settings.visuals.canvasDimensions.width - cloudSprite.img.width / 2)
				: startX !== 0
				? startX
				: random(-cloudSprite.img.width * 1.5, -cloudSprite.img.width);
			yPosition = random(this.settings.maxHeight - cloudSprite.img.height / 2, this.settings.minHeight - cloudSprite.img.height / 2);

			const movementSpeed = this.movementSpeed;

			nextCloud = new this.Cloud(this, cloudType, cloudSprite.img, xPosition, yPosition, movementSpeed);
			nextCloud.z = 1;

			let maxZ = 0;
			this.clouds.forEach(prevCloud => {
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
		const typeSprites = this.sprites.filter(sprite => sprite.type === cloudType);
		const spriteUsage = typeSprites.map(sprite => ({
			sprite,
			usageCount: this.clouds.filter(cloud => cloud.sprite === sprite.img).length,
		}));

		const unusedSprites = spriteUsage.filter(item => item.usageCount === 0).map(item => item.sprite);
		const leastUsedSprite = spriteUsage.reduce((min, item) => (item.usageCount < min.usageCount ? item : min), spriteUsage[0]).sprite;

		return unusedSprites.length > 0 ? unusedSprites[random(0, unusedSprites.length - 1)] : leastUsedSprite;
	}

	draw(moonCanvas, dayFactor, overcastFactor) {
		console.warn("this.clouds", this.clouds);

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		this.ctx.globalAlpha = 1;

		this.cloudCtx = this.cloudsCanvas.getContext("2d");
		this.cloudCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		// Update cloud sprites
		this.clouds
			.sort((a, b) => b.z - a.z)
			.forEach(cloud => {
				cloud.update(this.cloudCtx, this.elapsedTime);
			});
		this.darken(this.cloudCtx, dayFactor, overcastFactor);

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

		// Update active clouds
		this.activeClouds = this.clouds
			.filter(cloud => cloud.z === 1)
			.map(cloud => ({ x: cloud.x, y: cloud.y, width: cloud.sprite.width, height: cloud.sprite.height }));

		if (this.activeClouds.length > 0) console.warn("active.clouds", this.activeClouds, this.activeClouds[0].x, this.activeClouds[0].width);
	}
}
window.SkyCanvasCloudy = SkyCanvasCloudy;
