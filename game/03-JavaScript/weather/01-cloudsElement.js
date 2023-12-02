/* eslint-disable no-undef */
class SkyCanvasWeather extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.currentWeather = "clear";

		this.Cloud = class Cloud {
			constructor(type, sprite, x, y, movementSpeed) {
				this.type = type;
				this.sprite = sprite;
				this.x = x;
				this.y = y;
				this.movementSpeed = movementSpeed;
				this.destroy = false;

				this._opacity = 0;
				this.fadeDuration = 20; // Duration for fade in/out in minutes
			}

			get opacity() {
				return this._opacity;
			}

			set opacity(value) {
				this._opacity = Math.max(0, Math.min(1, value));
				if (this._opacity === 1) this.fadeIn = false;
				else if (this._opacity === 0) this.fadeOut = false;
			}

			move(elapsedTime) {
				this.x += this.movementSpeed * elapsedTime;
			}

			updateOpacity(elapsedTime) {
				this.opacity += ((this.fadeIn ? 1 : -1) * elapsedTime) / this.fadeDuration;
			}

			create(fadeIn = false) {
				if (fadeIn) {
					this._opacity = 0;
					this.fadeIn = true;
				} else {
					this._opacity = 1;
				}
			}

			update(elapsedTime) {
				if (elapsedTime < 1) return;
				this.move(elapsedTime);
				if (this.fadeIn || this.fadeOut) this.updateOpacity(elapsedTime);
			}

			draw(ctx) {
				ctx.globalAlpha = this.opacity;
				console.log("GLOBAL ALPHA", ctx.globalAlpha);
				ctx.drawImage(this.sprite, this.x, this.y);
				ctx.globalAlpha = 1; // Reset alpha
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

		this.canvasElement.width = this.settings.dimensions.width;
		this.canvasElement.height = this.settings.dimensions.height;

		const x = 0;
		const y = 0;
		this.canvas.css({
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	loadCloudSprites() {
		this.settings.clouds.images.forEach((value, key) => {
			const img = new Image();
			img.src = this.settings.clouds.imgPath + key;
			this.cloudSprites.push({ img, size: value });
		});
		console.log("cloudSprites", this.cloudSprites);
	}

	loaded() {
		const loadSprites = this.cloudSprites.map(sprite => {
			return new Promise((resolve, reject) => {
				sprite.img.onload = resolve;
				sprite.img.onerror = e => reject(new Error("Error loading cloud image: " + e.message));
				this.currentDate = 0;
			});
		});
		return Promise.all(loadSprites);
	}

	updateWeather(weatherType, instant = false) {
		if (!instant && this.currentWeather === weatherType) return;

		this.clouds.forEach(cloud => {
			cloud.movementSpeed *= 2;
			cloud.destroy = true;
		});

		let behavior = this.settings.behaviors[weatherType];
		if (!behavior) behavior = this.settings.behaviors.clear;

		this.currentWeather = weatherType;

		console.log("behavior.count", behavior.count);

		for (const key in behavior.count) {
			console.log("Object.prototype.hasOwnProperty.call(behavior.count, key)", Object.prototype.hasOwnProperty.call(behavior.count, key));
			console.log("key", key);
			if (Object.prototype.hasOwnProperty.call(behavior.count, key)) {
				const count = behavior.count[key]();
				console.log("count", count);
				for (let i = 0; i < count; i++) {
					this.clouds.push(this.createCloud(key));
				}
			}
		}
		console.log("CLOUDS1", this.clouds);
	}

	createCloud(cloudType, fadeIn = true, offScreen = false) {
		console.log("CreateCloud");

		const spritesOfSameType = this.cloudSprites.filter(sprite => sprite.size === cloudType);
		const cloudSprite = spritesOfSameType.filter(sprite => !this.clouds.some(cloud => cloud.sprite === sprite.img)).concat(spritesOfSameType)[
			random(0, spritesOfSameType.length - 1)
		];

		let xPosition, yPosition, isPositionValid;
		const maxAttempts = 5;
		let attempts = 0;
		do {
			xPosition = offScreen ? -cloudSprite.img.width - random(0, cloudSprite.img.width) : random(-cloudSprite.img.width, this.settings.dimensions.width);
			yPosition = random(this.settings.clouds.maxHeight - cloudSprite.img.height / 2, this.settings.clouds.minHeight - cloudSprite.img.height / 2);

			isPositionValid = !this.clouds.some(cloud => {
				const xOverlap = Math.abs(cloud.x - xPosition) < (cloud.sprite.width + cloudSprite.img.width) / 2;
				const yOverlap = Math.abs(cloud.y - yPosition) < (cloud.sprite.height + cloudSprite.img.height) / 2;
				return xOverlap && yOverlap;
			});

			attempts++;
		} while (!isPositionValid && attempts < maxAttempts);

		const movementSpeed = randomFloat(this.settings.clouds.movement.speedMin, this.settings.clouds.movement.speedMax);

		const newCloud = new this.Cloud(cloudType, cloudSprite.img, xPosition, yPosition, movementSpeed);
		newCloud.create(fadeIn);
		console.log("CREATED CLOUD:", newCloud);
		return newCloud;
	}

	draw(date) {
		console.log("NEW DATE", date);
		console.log("OLD DATE", this.currentDate);
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		const elapsedTime = this.currentDate === 0 ? 0 : this.currentDate.compareWith(date, true) / Time.secondsPerMinute;
		this.currentDate = new DateTime(date);
		console.log("elapsedTime", elapsedTime);
		console.log("CLOUDS2", this.clouds);
		// Drawing each cloud
		this.clouds.forEach(cloud => {
			cloud.update(elapsedTime);
			if (cloud.x >= this.canvasElement.width) cloud.opacity = 0;
			cloud.draw(this.ctx);
		});

		// Clean the array by removing faded out or hidden clouds
		for (let i = this.clouds.length - 1; i >= 0; i--) {
			const cloud = this.clouds[i];
			if (!cloud.fadeIn && cloud.opacity === 0) {
				if (!cloud.destroy) {
					this.clouds.splice(i, 1, this.createCloud(cloud.type, false, true));
				} else {
					this.clouds.splice(i, 1);
				}
			}
		}
	}
}
window.SkyCanvasWeather = SkyCanvasWeather;
