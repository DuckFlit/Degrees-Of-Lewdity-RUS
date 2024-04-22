/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
WeatherEffects.create({
	name: "locationImage",
	effects: [
		{
			effect: "locationImageAnimation",
			bindings: {
				location() {
					return this.location;
				},
				key() {
					return this.key;
				},
				otherEffects() {
					return this.otherEffects;
				},
				onFrame() {
					return this.onFrame;
				},
			},
		},
	],
	init() {
		this.animationFrame = 0;
	},
	draw() {
		// Set this.animations to be accessible from outside
		this.animations = this.effects[0].animations;
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);
	},
});

WeatherEffects.create({
	name: "locationEmissive",
	effects: [
		{
			effect: "locationImageAnimation",
			params: {
				glow: true,
				defaultColor: "#deae66",
				defaultSize: 5,
				defaultAlpha: 1,
			},
			bindings: {
				location() {
					return this.location;
				},
				key() {
					return this.key;
				},
				otherEffects() {
					return this.otherEffects;
				},
				onFrame() {
					return this.onFrame;
				},
			},
		},
	],
	draw() {
		// Set this.animations to be accessible from outside
		this.animations = this.effects[0].animations;
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);
	},
});

WeatherEffects.create({
	name: "locationReflective",
	defaultParameters: {
		horizon: 112,
		blur: 0.6,
		reflectionAlpha: 0.8,
		contrast: 0.9,
	},
	effects: [
		{
			effect: "locationImageAnimation",
			bindings: {
				location() {
					return this.location;
				},
				key() {
					return this.key;
				},
				otherEffects() {
					return this.otherEffects;
				},
				onFrame() {
					return this.onFrame;
				},
			},
		},
	],
	init() {
		this.reflectionCanvas = new Weather.Sky.Canvas(); 
		this.locationCanvas = new Weather.Sky.Canvas(); 

	},
	draw(canvas, layerCanvas) {
		// Temporarily disable reflections until next update
		return;

	},
});

WeatherEffects.create({
	name: "locationImageAnimation",
	defaultParameters: {
		width: 64,
	},
	// Make it asyncronous to wait for the image to load before animating without slowing down the main flow
	async init() {
		this.scaledWidth = this.width * setup.SkySettings.scale;
		// Update only animations of which its condition states has changed
		this.updateConditions = () => {
			const animationsArr =
				this.otherEffects && Array.isArray(this.otherEffects.animations) ? [...this.otherEffects.animations, ...this.animations] : this.animations;
			this.animations?.forEach(anim => {
				if (!anim.condition) return;
				if (anim.condition(animationsArr) && !anim.displayed) {
					anim.displayed = true;
					if (anim.animationInstance) anim.animationInstance.start();
				} else if (!anim.condition(animationsArr) && anim.displayed) {
					anim.displayed = false;
					if (anim.animationInstance) anim.animationInstance.stop();
				}
			});
		};
		const loadImage = async (loc, key) => {
			// Wait for image to load - add animation if it exists, otherwise just use the image
			return new Promise((resolve, reject) => {
				const image = new Image();
				const imagePath = typeof loc === "object" && loc.image ? loc.image : this.obj;
				image.src = this.fullPath + imagePath;
				image.onload = () => {
					const animDetails = {
						name: key,
						displayed: true,
						image,
						condition: loc.condition,
						frame: loc.frame,
						height: image.height,
						frameWidth: this.scaledWidth,
						frameHeight: image.height,
						yPos: this.canvas.element.height - image.height,
						alwaysDrawFirstFrame: loc.alwaysDrawFirstFrame ?? true,
						waitForAnimation: loc.waitForAnimation,
						glow: this.glow ? {
							size: typeof loc.size === "function" ? loc.size() : loc.size ?? this.defaultSize ?? 0,
							color: typeof loc.color === "function" ? loc.color() : loc.color ?? this.defaultColor ?? "#ffffff",
							alpha: typeof loc.alpha === "function" ? loc.alpha() : loc.alpha ?? this.defaultAlpha ?? 1,
						} : null,
						parent: typeof loc.animation === "string" ? loc.animation : undefined,
					};
					this.frameWidth = this.scaledWidth;
					this.frameHeight = image.height;
					if (typeof loc === "object" && loc.animation?.fps > 0) {
						animDetails.numFrames = image.width / animDetails.frameWidth;
						animDetails.animationInstance = new Weather.Sky.Animation(
							image,
							loc.animation.fps,
							animDetails.numFrames,
							loc.animation.delay,
							this.onFrame,
							loc.animation.delayFirst ?? true
						);
						if (loc.animation.startFrame) {
							animDetails.animationInstance.currentFrame =
								typeof loc.animation.startFrame === "function" ? loc.animation.startFrame() : loc.animation.startFrame;
						}
						animDetails.animationInstance.start();
						animDetails.isPlaying = () => animDetails.animationInstance.isAnimating.value;
					}
					this.animations.push(animDetails);
					resolve();
				};
				image.onerror = reject;
			});
		};

		this.animations?.forEach(anim => {
			if (anim.animationInstance instanceof Weather.Sky.Animation) {
				anim.animationInstance.stop();
			}
		});
		this.animations = [];

		if (this.location?.[this.key] === undefined) return;
		this.obj = this.location[this.key];
		this.fullPath = `${this.path}/` + (this.location.folder ? `${this.location.folder}/` : "");

		// Check if there are sub-animations
		// In that case we'd want a separate animation for each of them
		if (
			Object.keys(this.obj).some(key => {
				const value = this.obj[key];
				if (typeof value === "object" && value !== null && "image" in value) {
					return true;
				}
				return false;
			})
		) {
			for (const key in this.obj) {
				const loc = this.obj[key];
				await loadImage(loc, key);
			}
		} else {
			await loadImage(this.obj, this.key);
		}
		this.updateConditions();
	},

	draw() {
		const animationsArr =
			this.otherEffects && Array.isArray(this.otherEffects.animations) ? [...this.otherEffects.animations, ...this.animations] : this.animations;

		for (const anim of this.animations) {
			const shouldDraw = anim.animationInstance ? anim.animationInstance.enabled && anim.displayed : anim.displayed;

			// Pause the current animation timers if a specified animation is playing
			if (anim.waitForAnimation) {
				const isAnimating = animationsArr.find(val => val.name === anim.waitForAnimation)?.animationInstance.isAnimating;
				if (isAnimating && isAnimating.value && anim.animationInstance?.enabled) {
					anim.animationInstance.stop();
					const onAnimationChange = value => {
						if (value === false) {
							isAnimating.unsubscribe(onAnimationChange);
							anim.animationInstance.start();
						}
					};
					isAnimating.subscribe(onAnimationChange);
				}
			}

			if (anim.glow) {
				this.canvas.glow(anim.glow.size, anim.glow.color);
				this.canvas.ctx.globalAlpha = anim.glow.alpha;
			}
			
			if (anim.animationInstance && shouldDraw) {
				if (!anim.animationInstance.enabled && !anim.alwaysDrawFirstFrame) continue;
				anim.animationInstance.draw(this.canvas.ctx, 0, anim.yPos, anim.frameWidth, anim.frameHeight, this.scaledWidth, anim.height);

			} else if (shouldDraw || (anim.animationInstance && anim.alwaysDrawFirstFrame && anim.displayed)) {
				const frame = typeof anim.frame === "function" ? anim.frame() : anim.frame;
				let frameX = frame ? anim.frameWidth * frame : 0;
				if (anim.parent) {
					if (typeof anim.parent === "string") {
						anim.parent = animationsArr.find(value => value.name === anim.parent);
					}
					if (!anim.parent.isPlaying() && !anim.alwaysDrawFirstFrame) continue;
					const parentAnimationFrame = anim.parent.animationInstance?.currentFrame;
					frameX = parentAnimationFrame ? this.frameWidth * parentAnimationFrame : 0;
				}
				this.canvas.ctx.drawImage(anim.image, frameX, 0, anim.frameWidth, anim.frameHeight, 0, anim.yPos, this.scaledWidth, anim.height);
			}
		}
	},
});
