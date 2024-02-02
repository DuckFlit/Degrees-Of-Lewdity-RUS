/* eslint-disable no-undef */
/*
	WARNING: Do not modify this file before the next update.
	It's getting a major refactor and everything below will be replaced.
*/
class SkyCanvasAnimationEffects extends SkyCanvasElement {
	constructor(name) {
		super(name);
		this.effects = [];
		this.createCanvasImage();

		this.Animation = class Animation {
			constructor(sprite, fps, numFrames, onDraw) {
				this.sprite = sprite;
				this.frameInterval = 1000 / fps;
				this.currentFrame = 0;
				this.frameTimer = 0;
				this.onDraw = onDraw;
				this.isAnimating = false;
				this.numFrames = numFrames;
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

				let elapsedTime = currentTime - this.lastRenderTime;
				this.lastRenderTime = currentTime;
				// Prevent requestAnimationFrame from catching up after alt-tab
				elapsedTime = Math.min(elapsedTime, this.frameInterval);

				const frameUpdated = this.update(elapsedTime);
				// Only draw once per frame interval
				if (frameUpdated) {
					this.onDraw();
				}

				requestAnimationFrame(this.animate.bind(this));
			}

			update(elapsedTime) {
				this.frameTimer += elapsedTime;
				if (this.frameTimer >= this.frameInterval) {
					this.frameTimer -= this.frameInterval;
					this.currentFrame = (this.currentFrame + 1) % this.numFrames;
					return true;
				}
				return false;
			}

			draw(ctx, x, y, width, height) {
				const frameX = width * this.currentFrame;
				ctx.drawImage(this.sprite.img, frameX, 0, width, height, x, y, width, height);
			}
		};

		this.Precipitation = class Precipitation {
			constructor(obj, sprite, x, y, width, height, fps) {
				this.obj = obj;
				this.sprite = sprite;
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
				const numFrames = this.sprite.img.width / this.width;
				this.animation = new this.obj.Animation(sprite, fps, numFrames, () => {
					obj.redrawEffects();
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
		Object.keys(this.settings.images).forEach(key => {
			const img = new Image();
			img.src = this.settings.imgPath + this.settings.images[key].path;
			this.sprites[key] = {
				img,
				frameCount: this.settings.images[key].frameCount,
			};
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
