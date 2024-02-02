/* eslint-disable no-undef */
WeatherEffects.create({
	name: "locationImage",
	defaultParameters: {
		width: 64,
		scale: 2, // Images are scaled from 32 to 64 to fill out the canvas width
	},
	effects: [
		{
			effect: "locationImageAnimation",
			params: {},
			bindings: {
				location() {
					return this.location;
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
		this.effects[0].draw();
		this.animations = this.effects[0].animations;
		this.canvas.ctx.drawImage(this.effects[0].canvas.element, 0, 0);
		// this.canvas.ctx.imageSmoothingEnabled = false;
		// if (this.animation) {
		// 	console.log("DRAW FRAME EFFECT", this.animation.currentFrame);
		// 	this.animation.draw(this.canvas.ctx, 0, this.yPos, this.frameWidth, this.frameHeight, this.width, this.height);
		// } else {
		// 	this.canvas.ctx.drawImage(this.image, 0, 0, this.frameWidth, this.frameHeight, 0, this.yPos, this.width, this.height);
		// }
	},
});

WeatherEffects.create({
	name: "locationOverlay",
	defaultParameters: {
		// radius: 128,
	},
	draw() {
		// Color based on the moon state and phase
		const nightColor = this.bloodMoon ? this.color.bloodMoon : ColourUtils.interpolateColor(this.color.nightDark, this.color.nightBright, this.moonFactor);
		const color = ColourUtils.interpolateTripleColor(nightColor, this.color.dawnDusk, this.color.day, this.sunFactor);

		this.canvas.ctx.fillStyle = color;
		this.canvas.fillRect();
	},
});

WeatherEffects.create({
	name: "locationEmissive",
	defaultParameters: {
		defaultColor: "#deae66",
		defaultSize: 5,
	},
	effects: [
		{
			effect: "locationImageAnimation",
			params: {},
			bindings: {
				location() {
					return this.location;
				},
				onFrame() {
					return this.onFrame;
				},
				parent() {
					return this.parent;
				},
			},
		},
	],
	init() {
		this.glow = new WeatherCanvas.Canvas();
	},
	draw() {
		this.effects[0].draw();

		const color = this.location.color ?? this.defaultColor;
		this.glow.clear();
		this.glow.ctx.shadowBlur = this.defaultSize;
		this.glow.ctx.shadowColor = color;
		this.glow.ctx.filter = `blur(0.5px) drop-shadow(0px 0px ${this.defaultSize}px ${color})`;
		this.glow.ctx.drawImage(this.effects[0].canvas.element, 0, 0);

		this.canvas.ctx.drawImage(this.glow.element, 0, 0);
	},
});

WeatherEffects.create({
	name: "locationImageAnimation",
	defaultParameters: {
		width: 64,
		scale: 2, // Images are scaled from 32 to 64 to fill out the canvas width
	},
	// Make it asyncronous to wait for the image to loaded before drawing
	// async init() {
	// 	if (this.location === undefined) return;

	// 	console.log("INIT IMAGES", this.location);
	// 	this.animations = [];

	// 	const locationData = typeof this.location === "string" ? { image: this.location } : this.location;
	// 	for (const key in locationData) {
	// 		const item = locationData[key];
	// 		console.log("1", key);
	// 		if (typeof item === "string" || (typeof item === "object" && item.image)) {
	// 			if ((item.condition && item.condition()) || !item.condition) {
	// 				console.log("2");
	// 				const image = new Image();
	// 				const imagePath = typeof item === "object" ? item.image : item;
	// 				image.src = `${this.path}/${imagePath}`;
	// 				console.log("IMG SRC", imagePath);
	// 				const animation = {
	// 					item, // Store the item for reference
	// 					image,
	// 					loaded: false,
	// 				};

	// 				this.animations.push(animation);

	// 				await new Promise((resolve, reject) => {
	// 					image.onload = () => {
	// 						console.log("IMAGE LOADED", item);
	// 						animation.loaded = true;
	// 						animation.height = image.height * this.scale;
	// 						animation.frameWidth = this.width / this.scale;
	// 						animation.frameHeight = image.height;
	// 						animation.yPos = this.canvas.element.height - animation.height;

	// 						if (typeof item === "object" && item.animation?.fps > 0) {
	// 							animation.numFrames = image.width / (this.width / this.scale);
	// 							animation.animationInstance = new Animation(image, item.animation.fps, animation.numFrames, item.animation.delay, this.onFrame);
	// 							animation.animationInstance.start();
	// 						}
	// 						resolve();
	// 					};
	// 					image.onerror = () => {
	// 						console.error("Error loading image: " + imagePath);
	// 						reject();
	// 					};
	// 				});
	// 			}
	// 		}
	// 	}
	// 	console.log("this.animations", this.animations);
	// },
	async init() {
		const loadImage = async loc => {
			// Wait for image to load - add animation if it exists, otherwise just use the image
			return new Promise((resolve, reject) => {
				const image = new Image();
				const imagePath = typeof loc === "object" ? loc.image : this.location;
				image.src = `${this.path}/${imagePath}`;
				image.onload = () => {
					const animDetails = {
						image,
						height: image.height * this.scale,
						frameWidth: this.width / this.scale,
						frameHeight: image.height,
						yPos: this.canvas.element.height - image.height * this.scale,
					};
					this.height = image.height * this.scale;
					this.frameWidth = this.width / this.scale;
					this.frameHeight = image.height;
					this.yPos = this.canvas.element.height - this.height;
					if (typeof loc === "object" && loc.animation?.fps > 0) {
						animDetails.numFrames = image.width / animDetails.frameWidth;
						this.numFrames = image.width / (this.width / this.scale);
						animDetails.animationInstance = new WeatherCanvas.Animation(
							image,
							loc.animation.fps,
							animDetails.numFrames,
							loc.animation.delay,
							this.onFrame
						);
						animDetails.animationInstance.start();
					}
					this.animations.push(animDetails);
					resolve();
				};
				image.onerror = reject;
			});
		};

		this.animations?.forEach(anim => {
			if (anim instanceof WeatherCanvas.Animation) {
				anim.stop();
			}
		});
		this.animations = [];

		if (this.location === undefined) return;

		// Check if there are sub-animations
		if (
			Object.keys(this.location).some(key => {
				const value = this.location[key];
				if (typeof value === "object" && value !== null && "image" in value) {
					return "animation" in value;
				}
				return false;
			})
		) {
			for (const key in this.location) {
				const loc = this.location[key];
				await loadImage(loc);
			}
		} else {
			await loadImage(this.location);
		}
	},

	draw() {
		this.canvas.ctx.imageSmoothingEnabled = false;

		for (const anim of this.animations) {
			if (anim.animationInstance) {
				anim.animationInstance.draw(this.canvas.ctx, 0, anim.yPos, anim.frameWidth, anim.frameHeight, this.width, anim.height);
			} else {
				let frameX = 0;
				if (this.location.animation === "parent") {
					const parentAnimationFrame = this.parent?.animations[0]?.animationInstance?.currentFrame;
					frameX = parentAnimationFrame ? this.frameWidth * parentAnimationFrame : 0;
				}
				this.canvas.ctx.drawImage(anim.image, frameX, 0, anim.frameWidth, anim.frameHeight, 0, anim.yPos, this.width, anim.height);
			}
		}
	},
});
