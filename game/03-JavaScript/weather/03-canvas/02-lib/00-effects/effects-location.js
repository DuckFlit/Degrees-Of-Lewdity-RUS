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
		{
			effect: "colorOverlay",
			drawCondition: () => !Weather.Sky.skyDisabled,
			params: {
				color: {
					nightDark: "#00001ceb",
					nightBright: "#0d0d26bf",
					day: "#00000000",
					dawnDusk: "#4f3605a5",
					bloodMoon: "#380101bf",
				},
			},
			bindings: {
				sunFactor() {
					return Weather.Sky.orbitals.sun.factor;
				},
				moonFactor() {
					return Weather.Sky.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
	],
	init() {
		this.animationFrame = 0;
	},
	draw() {
		
		// Add the overlay to the effect itself
		// Fallback if reflections are turned off: Ignore mask
		this.effects[0].draw({ start: key => {
			if (this.key === "reflective" && key === "mask") {
				return false;
			}
			return true;
		}});
		this.effects[1].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);
		this.canvas.ctx.globalCompositeOperation = "source-atop";
		this.canvas.drawImage(this.effects[1].canvas.element);
		
	},
});

Weather.Sky.Effects.create({
	name: "locationEmissive",
	defaultParameters: {
		defaultColor: "#deae66",
		defaultSize: 3,
		defaultIntensity: 1,
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
		// Set the blur
		this.effects[0].draw({ end: (_, obj, drawCanvas) => {
			const glowSize = resolveValue(obj.size, this.defaultSize);
			const glowColor = resolveValue(obj.color, this.defaultColor);
			const glowIntensity = Math.min(10, resolveValue(obj.intensity, this.defaultIntensity));
			
			let remainingIntensity = glowIntensity;
			while (remainingIntensity > 0) {
				const currentAlpha = remainingIntensity >= 1 ? 1 : remainingIntensity;
				this.canvas.ctx.shadowColor = glowColor;
				this.canvas.ctx.shadowBlur = glowSize;
				this.canvas.ctx.filter = `blur(0.5px) drop-shadow(0px 0px ${glowSize}px ${glowColor})`;
				this.canvas.ctx.globalAlpha = currentAlpha;

				remainingIntensity -= 1;
				this.canvas.drawImage(drawCanvas.element);
			}
			this.canvas.ctx.globalAlpha = 1;
		}});
	},
});

Weather.Sky.Effects.create({
	name: "locationReflective",
	defaultParameters: {
		defaultHorizon: 40,
		defaultBlur: 0.7,
		defaultAlpha: 0.7,
		defaultContrast: 0.9,
		minAmplitude: 1,
		maxAmplitude: 6,
		waveFrequency: 10,
		defaultWaveShiftFactor: 0.006,
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
		{
			effect: "colorOverlay",
			params: {
				color: {
					nightDark: "#00001ceb",
					nightBright: "#0d0d26bf",
					day: "#00000000",
					dawnDusk: "#4f3605a5",
					bloodMoon: "#380101bf",
				},
			},
			bindings: {
				sunFactor() {
					return Weather.Sky.orbitals.sun.factor;
				},
				moonFactor() {
					return Weather.Sky.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
	],
	init() {
		if (this.location?.[this.key] === undefined) return;
		const obj = this.location[this.key].mask;
		if (obj === undefined) throw new Error("Property 'mask' is not defined in reflective property.")

		this.reflectionCanvas = new Weather.Sky.Canvas();
		this.locationCanvas = new Weather.Sky.Canvas();
		this.distortionMask = new Weather.Sky.Canvas();
		this.distortionCanvas = new Weather.Sky.Canvas(this.canvas.element.width, this.canvas.element.height);

		this.horizon = resolveValue(obj.horizon, this.defaultHorizon) * setup.SkySettings.scale;
		this.overlayAlpha = resolveValue(obj.alpha, this.defaultAlpha);
		this.blur = resolveValue(obj.blur, this.defaultBlur);
		this.contrast = resolveValue(obj.contrast, this.defaultContrast);
		this.waveShiftFactor = resolveValue(obj.waveShiftFactor, this.defaultWaveShiftFactor);
		this.animationCondition = resolveValue(obj.animationCondition, true);

		// Precalculate the sine curve for multiple frames
		this.sineFrames = [];
		const numFrames = 24;
		
		// Perform a full cycle to look fluent
    	const phaseShiftPerFrame = (2 * Math.PI) / numFrames;

		this.startY = 2 + this.locationCanvas.element.height - ((this.locationCanvas.element.height - this.horizon) * setup.SkySettings.scale);
		for (let frame = 0; frame < numFrames; frame++) {
			const sines = [];
			for (let y = 0; y < this.distortionCanvas.element.height; y++) {
				// Linear interpolation for amplitude based on y position
				const amplitude = this.minAmplitude + (this.maxAmplitude - this.minAmplitude) * (y / this.distortionCanvas.element.height);
				const basePhase = (y + this.startY) * this.waveFrequency;
				const animPhase = basePhase + frame * phaseShiftPerFrame;
				const totalSineValue = Math.sin(basePhase) * amplitude + Math.sin(animPhase) * amplitude * 0.5;
				sines.push(totalSineValue);
			}
			this.sineFrames.push(sines);
		}

		// Set up animation properties
		const animationOptions = {
			image: this.distortionCanvas.element,
			canvas: this.canvas,
			numFrames,
			frameDelay: 150, // milliseconds per frame
			cycleDelay: 0, // No delay between cycles
			startDelay: 0,
			currentFrame: 0,
			alwaysDisplay: true,
			condition: () => typeof this.animationCondition === "function" ? this.animationCondition() : this.animationCondition,
		};

		// Only try to draw overlay if there is one
		this.drawOverlay = this.effects[0].animations.size > 0 && [...this.effects[0].animations.keys()].some(key => key !== "mask");

		this.animation = new Weather.Sky.Animation(animationOptions);
		this.parentLayer.animationGroup.add("distortionAnimation", this.animation);
		this.animation.enable();
	},
	draw(canvas, locationLayer) {
		this.reflectionCanvas.reset();
		this.locationCanvas.reset();
		this.distortionMask.reset();
		this.distortionCanvas.reset();

		// Draw the background canvas, then flip it upside down, and only draw it on top of the reflection map
		this.locationCanvas.drawImage(canvas.element);
		this.locationCanvas.drawImage(locationLayer.element);
		this.reflectionCanvas.ctx.save();
		this.reflectionCanvas.ctx.filter = `blur(${this.blur}px) contrast(${this.contrast})`;
		this.reflectionCanvas.ctx.globalCompositeOperation = 'source-over';
		this.reflectionCanvas.ctx.scale(1, -1);
		this.reflectionCanvas.ctx.drawImage(
			this.locationCanvas.element,
			0,
			canvas.element.height - (this.horizon * 2),
			this.reflectionCanvas.element.width,
			this.horizon,
			0,
			-canvas.element.height,
			this.reflectionCanvas.element.width,
			this.horizon
		);
		this.reflectionCanvas.ctx.restore();

		// Save the mask separately from the other water sprites
		this.effects[0].draw({ end: (key, obj, drawCanvas) => {
			if (key === "mask") {
				this.distortionMask.drawImage(drawCanvas.element);
				drawCanvas.clear();
			}
			return true;
		}});

		// Overlay sky only on the water effects
		if (this.drawOverlay) {
			this.effects[1].draw();
			this.effects[0].canvas.ctx.globalCompositeOperation = "source-atop";
			this.effects[0].canvas.drawImage(this.effects[1].canvas.element);
			
			// Add the rest of the water effects here
			this.reflectionCanvas.ctx.globalAlpha = 1 - this.overlayAlpha;
			this.reflectionCanvas.drawImage(this.effects[0].canvas.element);
		}

		// Draw the reflection below the distortion first, in case of transparent pixels
		this.distortionCanvas.drawImage(this.reflectionCanvas.element);

		// Loop through the predetermined distortion frames for a simplified ripple effect
		const currentFrameIndex = this.animation.currentFrame;
		const sines = this.sineFrames[currentFrameIndex];
		for (let y = 0; y < this.distortionCanvas.element.height; y++) {
			const shiftX = sines[y] * this.waveShiftFactor;
			this.distortionCanvas.ctx.setTransform(1, 0, shiftX, 1, 0, 0);
			this.distortionCanvas.ctx.drawImage(this.reflectionCanvas.element, 0, y + this.startY, this.distortionCanvas.element.width, 1, 0, y + this.startY, this.distortionCanvas.element.width, 1);
		}
		this.distortionCanvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
		
		// Remove any distortions that are outside of the water mask
		this.distortionCanvas.ctx.globalCompositeOperation = 'destination-in';
		this.distortionCanvas.drawImage(this.distortionMask.element);

		// Draw the final frame
		this.canvas.drawImage(this.distortionCanvas.element);
	},
});

Weather.Sky.Effects.create({
	name: "locationImageAnimation",
	async init() {		
		const loadImage = async (key, obj) => {
			// Make it asyncronous to wait for the image to load before animating without slowing down the main flow
			return new Promise((resolve, reject) => {
				let image = new Image();
				const imagePath = typeof obj === "object" && obj.image ? obj.image : this.obj;

				const handleLoadedImage = () => {
					if (typeof obj !== "object") obj = {};
					
					// If it's an animation, add it to the animation group
					if (obj.animation) {
						const animationOptions = {
							image,
							canvas: this.canvas,
							alwaysDisplay: obj.alwaysDisplay,
							waitForAnimation: obj.waitForAnimation,
							frameDelay: obj.animation.frameDelay,
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
					else { // If it's a static image
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
					image.onerror = () => {
						console.error("Could not load image", image.src);
						resolve();
					};
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
	},

	draw(onDraw = {}) {
		this.canvas.ctx.reset();
		for (const [key, obj] of this.animations.entries()) {
			// Preprocess based on effect
			if (onDraw.start) {
				if (!onDraw.start(key, obj, this.canvas)) continue;
			}
			
			// Check conditions
			if (obj.condition && !obj.condition(this.parentLayer.animationGroup)) {
				continue;
			}

			if (obj.animation) { // If animation, let the animation object draw the right frame
				obj.animation.draw();
			} else { // If static image
				const yPosition = this.canvas.element.height - obj.image.height;
				
				// If it's a spritesheet, we can choose which frame to draw
				const frame = typeof obj.frame === "function" ? obj.frame() : obj.frame;
				const frameX = Math.clamp((frame ?? 0) * this.canvas.element.width, 0, obj.image.width - this.canvas.element.width);
				
				this.canvas.ctx.drawImage(obj.image, frameX, 0, this.canvas.element.width, this.canvas.element.height, 0, yPosition, this.canvas.element.width, this.canvas.element.height);
			}

			if (onDraw.end) {
				onDraw.end(key, obj, this.canvas);
			}
		}
	},
});
