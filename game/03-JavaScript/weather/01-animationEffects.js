/* eslint-disable no-undef */
class SkyCanvasAnimationEffects extends SkyCanvasElement {
	constructor(name) {
		super(name);
		this.effects = [];
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
				this.onDraw();

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
				ctx.drawImage(this.frames[this.currentFrame], x, y);
			}
		};

		this.Precipitation = class Precipitation {
			constructor(obj, frames, x, y, width, height, fps) {
				this.obj = obj;
				this.frames = frames; // Array of sprite frames
				this.x = x; // X position for precipitation
				this.y = y; // Y position for precipitation
				this.width = width;
				this.height = height;
				this.animation = new this.obj.Animation(frames, fps, () => {
					obj.redrawEffects();
					this.draw();
				});
			}

			draw() {
				this.animation.draw(this.obj.ctx, this.x, this.y, this.width, this.height);
			}

			update(elapsedTime) {
				this.animation.update(elapsedTime);
			}

			start() {
				if (!this.animation.isAnimating) {
					this.animation.start();
				}
			}

			stop() {
				if (this.animation.isAnimating) {
					this.animation.stop();
				}
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
					console.error("Error loading animation sprite (undefined):", sprite.img.src);
					this.sprites.splice(index, 1);
					resolve();
				};
			});
		});
		return Promise.all(loadSprites);
	}

	updateEffects() {}

	redrawEffects() {}
}
window.SkyCanvasAnimationEffects = SkyCanvasAnimationEffects;
