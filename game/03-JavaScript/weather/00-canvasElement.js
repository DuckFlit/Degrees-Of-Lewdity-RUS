/* eslint-disable no-undef */
class SkyCanvasElement {
	constructor(name) {
		if (!arguments[0]) return;

		this.name = name;
		this.settings = Weather.Settings.visuals[this.name];
		this.sprites = [];

		this.position = {};
		this.expandFactor = 0.1;
		this.createCanvasImage();

		this.Animation = class Animation {
			constructor(frames, fps, onDraw) {
				this.frames = frames; // Array of Image objects (PNG frames)
				this.frameInterval = 1000 / fps; // Time in milliseconds for each frame
				this.currentFrame = 0;
				this.frameTimer = 0;
				this.onDraw = onDraw; // Callback for drawing
				this.isAnimating = false;
			}

			start() {
				if (!this.isAnimating) {
					this.isAnimating = true;
					this.lastRenderTime = performance.now();
					this.animate();
				}
			}

			stop() {
				this.isAnimating = false;
			}

			animate(currentTime = performance.now()) {
				if (!this.isAnimating) return;

				const elapsedTime = currentTime - this.lastRenderTime;
				this.lastRenderTime = currentTime;

				if (elapsedTime < 100) {
					this.update(elapsedTime);
				}
				this.onDraw(); // Delegate the drawing responsibility

				requestAnimationFrame(this.animate.bind(this));
			}

			update(elapsedTime) {
				this.frameTimer += elapsedTime;
				if (this.frameTimer >= this.frameInterval) {
					this.frameTimer -= this.frameInterval;
					this.currentFrame = (this.currentFrame + 1) % this.frames.length;
				}
			}

			draw(ctx, x, y, width, height) {
				ctx.globalCompositeOperation = "source-over";
				ctx.drawImage(this.frames[this.currentFrame], x, y);

				// TODO
				/*
					1. Examine if the rain can be layered behind the clouds (Maybe separate the overcast with clouds?)

					2. Make them overlay below too
					3. When alt tabbing and back it speeds up immensely (frameTimer is probably wrong - should pause?)
				*/
			}
		};
	}

	createCanvasImage() {
		this.canvas = $("<canvas/>", { id: this.name });
		this.canvasElement = this.canvas[0];
		this.ctx = this.canvasElement.getContext("2d");

		this.canvasElement.width = Weather.Settings.visuals.canvasDimensions.width;
		this.canvasElement.height = Weather.Settings.visuals.canvasDimensions.height;

		const x = 0;
		const y = 0;
		this.canvas.css({ left: `${x}px`, top: `${y}px` });
		this.loadSprites();
	}

	loadSprites() {
		if (Array.isArray(this.settings.images)) {
			this.sprites = this.settings.images.map(key => {
				const img = new Image();
				img.src = this.settings.imgPath + key;
				return img;
			});
		} else {
			const img = new Image();
			img.src = this.settings.imgPath;
			this.sprites.push(img);
		}
	}

	loaded() {
		const loadSprites = this.sprites.map((img, index) => {
			return new Promise(resolve => {
				img.onload = resolve;
				img.onerror = e => {
					console.error("Error loading sprite:", img.src);
					this.sprites.splice(index, 1);
					resolve();
				};
			});
		});
		return Promise.all(loadSprites);
	}

	interpolate(value1, value2, factor) {
		return value1 + (value2 - value1) * factor;
	}

	normalize(value) {
		return Math.min((value + 1) / 2, 1);
	}

	// Modifier determines how much of the sprite overlaps. Modifier of 1 means 100% of the sprite has to overlap with the other sprite.
	isSpriteOverlap(spriteA, spriteB, modifier = 1) {
		const xOverlap = Math.max(0, Math.min(spriteA.x + spriteA.sprite.width, spriteB.x + spriteB.sprite.width) - Math.max(spriteA.x, spriteB.x));
		const yOverlap = Math.max(0, Math.min(spriteA.y + spriteA.sprite.height, spriteB.y + spriteB.sprite.height) - Math.max(spriteA.y, spriteB.y));

		// Calculate the area of intersection
		const intersectionArea = xOverlap * yOverlap;

		// Determine the minimum overlap required (based on spriteA's area and the modifier)
		const minOverlapArea = spriteA.sprite.width * spriteA.sprite.height * modifier;

		// Check if the intersecting area meets the minimum overlap requirement
		return intersectionArea >= minOverlapArea;
	}

	setOrbit(currentTime) {
		this.riseTime = this.settings.orbit.riseTime * Time.secondsPerHour;
		this.setTime = this.settings.orbit.setTime * Time.secondsPerHour;

		// Adjusts for overnight duration if needed
		if (this.setTime < this.riseTime) {
			this.setTime += Time.secondsPerDay;
		}

		const timePercent = this.calculateTimePercent(currentTime);
		const position = this.getElementPosition(timePercent);

		this.position.adjustedX = position.x;
		this.position.adjustedY = position.y;
	}

	calculateTimePercent(currentTime) {
		const expandedDuration = (this.setTime - this.riseTime) / (1 - 2 * this.expandFactor);
		let elapsed = currentTime - (this.riseTime - this.expandFactor * expandedDuration);
		if (elapsed < 0) elapsed += Time.secondsPerDay;
		return Math.clamp(elapsed / expandedDuration, 0, 1);
	}

	getElementPosition(timePercent) {
		timePercent = Math.clamp(timePercent, 0, 1);
		const adjustedTimePercent = (timePercent - this.expandFactor) / (1 - 2 * this.expandFactor);
		const x = lerp(Math.clamp(adjustedTimePercent, 0, 1), this.settings.orbit.path.startX, this.settings.orbit.path.endX);

		const amplitude = this.settings.orbit.path.peakY - this.settings.orbit.path.horizon;
		const factor = 1 - 4 * Math.pow(adjustedTimePercent - 0.5, 2);
		const y = this.settings.orbit.path.horizon + amplitude * factor;

		return { x, y };
	}

	draw() {}
}
window.SkyCanvasElement = SkyCanvasElement;
