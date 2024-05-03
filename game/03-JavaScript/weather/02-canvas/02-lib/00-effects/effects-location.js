/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
Weather.Sky.Effects.create({
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
				parentLayer() {
					return this.parentLayer;
				},
				fullPath() {
					return `${this.path}/` + (this.location.folder ? `${this.location.folder}/` : "");
				},
			},
		},
	],
	init() {
		this.animationFrame = 0;
	},
	draw() {
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);
		
	},
});

Weather.Sky.Effects.create({
	name: "locationEmissive",
	defaultParameters: {
		defaultColor: "#deae66",
		defaultSize: 3,
		defaultAlpha: 1,
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
				parentLayer() {
					return this.parentLayer;
				},
				fullPath() {
					return `${this.path}/` + (this.location.folder ? `${this.location.folder}/` : "");
				},
			},
		},
	],
	draw() {
		this.effects[0].draw((drawCanvas, obj) => {
			const glowSize = obj.size ?? this.defaultSize;
			const glowColor = obj.color ?? this.defaultColor;
			drawCanvas.ctx.shadowColor = glowColor;
			drawCanvas.ctx.shadowBlur = glowSize;
			drawCanvas.ctx.filter = `blur(0.5px) drop-shadow(0px 0px ${glowSize}px ${glowColor})`;
			return drawCanvas;
		});
		this.canvas.drawImage(this.effects[0].canvas.element);
	},
});

Weather.Sky.Effects.create({
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
				parentLayer() {
					return this.parentLayer;
				}
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

Weather.Sky.Effects.create({
	name: "locationImageAnimation",
	// Make it asyncronous to wait for the image to load before animating without slowing down the main flow
	async init() {		
		const loadImage = async (key, obj) => {
			return new Promise((resolve, reject) => {
				let image = new Image();
				const imagePath = typeof obj === "object" && obj.image ? obj.image : this.obj;

				const handleLoadedImage = () => {
					if (typeof obj !== "object") obj = {};
					
					if (obj.animation) {
						const animationOptions = {
							image,
							canvas: this.canvas,
							alwaysDisplay: obj.alwaysDisplay,
							waitForAnimation: obj.waitForAnimation,
							frameDelay: obj.animation.frameDelay, // Will never be lower than the layer updateRate
							cycleDelay: obj.animation.cycleDelay,
							startDelay: obj.animation.startDelay,
							startY: this.canvas.element.height - image.height,
							numFrames: image.width / this.canvas.element.width,
							currentFrame: obj.animation.startFrame,
							condition: obj.condition,
						};
						if (typeof obj.animation !== "object") {
							obj.parentAnimation = obj.animation;
						}
						animationOptions.parentAnimation = obj.parentAnimation;
						obj.animation = new Weather.Sky.Animation(animationOptions);
						obj.animation.enable();
						this.parentLayer.animationGroup.add(key, obj.animation);
					}
					else {
						obj.image = image;
					}
					this.animations.set(key, obj);
					resolve();
				};
		
				// Only load image if it isn't loaded already
				if (imagePath instanceof Image) {
					image = obj.image;
					handleLoadedImage();
				} else {
					image = new Image();
					image.src = this.fullPath + imagePath;
					image.onload = handleLoadedImage;
					image.onerror = reject;
				}
			});
		};

		this.animations = new Map();
		if (this.location?.[this.key] === undefined) return;
		this.obj = this.location[this.key];
		// Check if there are sub-animations
		// In that case we want a separate animation for each of them
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
				const obj = this.obj[key];
				await loadImage(key, obj);
			}
		} else {
			await loadImage(this.key, this.obj);
		}
	console.log("THIS ANIMASTIDKSAN",this.animations);
	},

	draw(onDraw) {
		for (const obj of this.animations.values()) {
			if (onDraw) onDraw(this.canvas, obj);
			if (obj.animation) {
				obj.animation.draw();
			} else if (!obj.condition || obj.condition && obj.condition()) {
				const yPosition = this.canvas.element.height - obj.image.height;

				// If it's a spritesheet, we can choose which frame to draw, if we don't want an animation
				const frame = typeof obj.frame === "function" ? obj.frame() : obj.frame;
				const frameX = Math.clamp((frame ?? 0) * this.canvas.element.width, 0, obj.image.width - this.canvas.element.width);
				
				this.canvas.ctx.drawImage(obj.image, frameX, 0, this.canvas.element.width, this.canvas.element.height, 0, yPosition, this.canvas.element.width, this.canvas.element.height);
			}
		}
	},
});
