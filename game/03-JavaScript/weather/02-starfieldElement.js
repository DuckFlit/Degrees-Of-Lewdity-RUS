/* eslint-disable no-undef */
class SkyCanvasStars extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.generateStars();
	}

	createCanvasImage() {
		super.createCanvasImage(); // Call parent method

		// Custom modifications for SkyCanvasStars
		this.canvasElement.width = this.settings.dimensions.width;
		this.canvasElement.height = this.settings.dimensions.height;
		const offsetX = this.settings.pivot.x - this.canvasElement.width / 2;
		const offsetY = this.settings.pivot.y - this.canvasElement.height / 2;
		this.canvas.css({ left: `${offsetX}px`, top: `${offsetY}px` });
	}

	loadSprites() {
		// Custom sprite loading logic for SkyCanvasStars
		this.sprites = this.settings.stars.spriteChance.slice(1).map(entry => {
			const img = new Image();
			img.src = this.settings.imgPath + entry[0];
			return img;
		});
	}

	loaded() {
		// Call the loaded method from the parent class and then add additional logic
		return super.loaded().then(() => {
			this.offscreenCanvas = $("<canvas/>")[0];
		});
	}

	generateStars() {
		this.stars = [];
		const minDistance = this.settings.stars.minDistance;

		for (let i = 0; i < this.settings.stars.count; i++) {
			let tooClose;
			let attempts = 0;
			let newStar;

			// Make sure it doesn't generate stars too close to other stars
			do {
				tooClose = false;
				const spriteIndex = this.getRandomSpriteIndex();
				newStar = {
					x: Math.random() * this.canvasElement.width,
					y: Math.random() * this.canvasElement.height,
					sprite: spriteIndex === 0 ? null : this.sprites[spriteIndex - 1],
					color: this.getRandomStarColor(),
				};

				// Check distance from all existing stars
				for (const star of this.stars) {
					const dx = newStar.x - star.x;
					const dy = newStar.y - star.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < minDistance) {
						tooClose = true;
						break;
					}
				}

				// Failsafe to avoid infinite loops
				attempts++;
				if (attempts > 100) {
					break;
				}
			} while (tooClose);

			if (!tooClose) {
				this.stars.push(newStar);
			}
		}
	}

	getRandomSpriteIndex() {
		const weights = this.settings.stars.spriteChance.map((element, index) => [index, element[1]]);
		return weightedRandom(...weights);
	}

	getRandomStarColor() {
		if (!this.settings.stars.colorRange.length) return "#ffffff";
		const interpolateFrom = this.settings.stars.colorRange;
		const interpolateTo = interpolateFrom.slice(0, -1)[0];

		if (!interpolateFrom.length) return interpolateTo;
		return ColourUtils.interpolateColor(either(interpolateFrom), interpolateTo, randomFloat(0, 1));
		// const shading = random(125, 255);
		// return `rgba(${shading}, ${shading}, 255, ${alpha})`;
	}

	draw(cullingElement, dayFactor) {
		const moonRadius = cullingElement.position.diameter / 2;
		const moonX = cullingElement.position.x - (this.settings.pivot.x - this.canvasElement.width / 2) + cullingElement.position.diameter - moonRadius / 2;
		const moonY = cullingElement.position.y - (this.settings.pivot.y - this.canvasElement.height / 2) + cullingElement.position.diameter - moonRadius / 2;

		const directionMultiplier = this.settings.rotation.clockwise ? 1 : -1;
		const radians = directionMultiplier * this.angle * (Math.PI / 180);
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);

		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		this.ctx.globalAlpha = this.interpolate(this.settings.stars.opacity.night, this.settings.stars.opacity.day, this.normalize(dayFactor));

		this.ctx.shadowOffsetX = 0;
		this.ctx.shadowOffsetY = 0;

		this.stars.forEach(star => {
			const relativeX = star.x - this.canvasElement.width / 2;
			const relativeY = star.y - this.canvasElement.height / 2;
			const rotatedX = cos * relativeX - sin * relativeY + this.canvasElement.width / 2;
			const rotatedY = sin * relativeX + cos * relativeY + this.canvasElement.height / 2;

			// Cull stars if behind a culling object - like the moo
			const dx = rotatedX - moonX;
			const dy = rotatedY - moonY;
			const distanceFromMoonCenter = Math.sqrt(dx * dx + dy * dy);
			if (distanceFromMoonCenter < moonRadius + 2) {
				return;
			}

			if (star.sprite) {
				this.offscreenCanvas.width = star.sprite.width;
				this.offscreenCanvas.height = star.sprite.height;
				const offscreenCtx = this.offscreenCanvas.getContext("2d");

				offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
				offscreenCtx.drawImage(star.sprite, 0, 0);

				offscreenCtx.globalCompositeOperation = "source-atop";
				offscreenCtx.fillStyle = star.color;

				if (Weather.overcast) {
					this.ctx.filter = "blur(2px)";
					this.ctx.shadowBlur = 25;
					this.ctx.shadowColor = "white";
				} else {
					this.ctx.shadowBlur = 15;
					this.ctx.shadowColor = this.settings.stars.glowColor;
				}

				offscreenCtx.fillRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
				offscreenCtx.globalCompositeOperation = "source-over";

				this.ctx.drawImage(this.offscreenCanvas, rotatedX, rotatedY);

				this.ctx.filter = "none";
				this.ctx.shadowBlur = 0;
				this.ctx.shadowColor = "transparent";
			} else {
				if (Weather.overcast) {
					this.ctx.filter = "blur(1px)";
				}
				this.ctx.fillStyle = star.color;
				this.ctx.fillRect(rotatedX, rotatedY, 2, 2); // Drawing a 2x2 pixel star
				this.ctx.filter = "none";
			}
		});
	}

	updateRotation(newAngle) {
		this.angle = newAngle;
	}
}
window.SkyCanvasStars = SkyCanvasStars;
