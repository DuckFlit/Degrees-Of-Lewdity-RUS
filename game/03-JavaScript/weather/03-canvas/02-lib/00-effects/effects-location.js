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
		this.effects[0].draw({
			start: key => {
				if (this.key === "reflective" && key === "mask") {
					return false;
				}
				return true;
			},
		});

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
		this.effects[0].draw({
			end: (_, obj, drawCanvas) => {
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
			},
		});
	},
});

Weather.Sky.Effects.create({
	name: "locationReflective",
	defaultParameters: {
		defaultHorizon: 40,
		defaultBlur: 0.7,
		defaultAlpha: 0.7,
		defaultCompositeOperation: "source-over",
		defaultContrast: 0.9,
		defaultWaveShiftFactor: 0.006,
		defaultWaveFrequency: 10,
		defaultMinAmplitude: 1,
		defaultMaxAmplitude: 6,
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
		{
			effect: "imageOverlay",
			params: {
				movement: {
					speed: 0,
				},
			},
			bindings: {
				images() {
					return {
						overlay: this.images.mask,
					};
				},
				factor() {
					return 1;
				},
			},
		},
	],
	init() {
		if (this.location?.[this.key] === undefined) return;
		const obj = this.location[this.key].mask;
		if (obj === undefined) throw new Error("Property 'mask' is not defined in reflective property.");

		this.reflectionCanvas = new Weather.Sky.Canvas();
		this.locationCanvas = new Weather.Sky.Canvas();
		this.distortionMask = new Weather.Sky.Canvas();
		this.distortionCanvas = new Weather.Sky.Canvas(this.canvas.element.width, this.canvas.element.height);

		this.horizon = resolveValue(obj.horizon, this.defaultHorizon) * setup.SkySettings.scale;
		this.overlayAlpha = resolveValue(obj.alpha, this.defaultAlpha);
		this.blur = resolveValue(obj.blur, this.defaultBlur);
		this.contrast = resolveValue(obj.contrast, this.defaultContrast);
		this.waveShiftFactor = resolveValue(obj.waveShiftFactor, this.defaultWaveShiftFactor);
		this.waveFrequency = resolveValue(obj.waveFrequency, this.defaultWaveFrequency);
		this.minAmplitude = resolveValue(obj.minAmplitude, this.defaultMinAmplitude);
		this.maxAmplitude = resolveValue(obj.maxAmplitude, this.defaultMaxAmplitude);
		this.animationCondition = resolveValue(obj.animationCondition, true);

		// Precalculate the sine curve for multiple frames
		this.sineFrames = [];
		const numFrames = 24;

		// Perform a full cycle to look fluent
		const phaseShiftPerFrame = (2 * Math.PI) / numFrames;

		this.startY = 2 + this.locationCanvas.element.height - (this.locationCanvas.element.height - this.horizon) * setup.SkySettings.scale;
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
			condition: () => (typeof this.animationCondition === "function" ? this.animationCondition() : this.animationCondition),
		};

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
		this.reflectionCanvas.ctx.globalCompositeOperation = "source-over";
		this.reflectionCanvas.ctx.scale(1, -1);
		this.reflectionCanvas.ctx.drawImage(
			this.locationCanvas.element,
			0,
			canvas.element.height - this.horizon * 2,
			this.reflectionCanvas.element.width,
			this.horizon,
			0,
			-canvas.element.height,
			this.reflectionCanvas.element.width,
			this.horizon
		);
		this.reflectionCanvas.ctx.restore();

		this.effects[2].draw();
		this.effects[1].draw();
		this.effects[0].draw({
			end: (key, obj, drawCanvas) => {
				// Save the mask separately from the other water sprites
				if (key === "mask") {
					this.distortionMask.drawImage(drawCanvas.element);
					drawCanvas.clear();
					return;
				}

				if (obj.gradientMask) {
					drawCanvas.ctx.globalAlpha = 1;
					drawCanvas.ctx.globalCompositeOperation = "destination-out";
					drawCanvas.drawImage(this.images.mask);
				}

				// Overlay sky only on the water effects and not the mask
				drawCanvas.ctx.globalCompositeOperation = "source-atop";
				drawCanvas.drawImage(this.effects[1].canvas.element);

				// Add the rest of the water sprites
				this.reflectionCanvas.ctx.globalAlpha = resolveValue(obj.alpha, this.defaultAlpha);
				this.reflectionCanvas.ctx.globalCompositeOperation = resolveValue(obj.compositeOperation, this.defaultCompositeOperation);
				this.reflectionCanvas.drawImage(drawCanvas.element);
			},
		});

		// Draw the reflection below the distortion first, in case of transparent pixels
		this.distortionCanvas.drawImage(this.reflectionCanvas.element);

		// Loop through the predetermined distortion frames for a simplified ripple effect
		const currentFrameIndex = this.animation.currentFrame;
		const sines = this.sineFrames[currentFrameIndex];
		for (let y = 0; y < this.distortionCanvas.element.height; y++) {
			const shiftX = sines[y] * this.waveShiftFactor;
			this.distortionCanvas.ctx.setTransform(1, 0, shiftX, 1, 0, 0);
			this.distortionCanvas.ctx.drawImage(
				this.reflectionCanvas.element,
				0,
				y + this.startY,
				this.distortionCanvas.element.width,
				1,
				0,
				y + this.startY,
				this.distortionCanvas.element.width,
				1
			);
		}
		this.distortionCanvas.ctx.setTransform(1, 0, 0, 1, 0, 0);

		// Remove any distortions that are outside of the water mask
		this.distortionCanvas.ctx.globalCompositeOperation = "destination-in";
		this.distortionCanvas.drawImage(this.distortionMask.element);

		// Draw the final frame
		this.canvas.drawImage(this.distortionCanvas.element);
	},
});

Weather.Sky.Effects.create({
	name: "locationImageAnimation",
	async init() {
		this.name = this.name ?? this.key;
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
							name: `${this.name}_${key}`,
							canvas: this.canvas,
							alwaysDisplay: obj.alwaysDisplay,
							waitForAnimation: obj.waitForAnimation,
							frameDelay: obj.animation.frameDelay,
							cycleDelay: obj.animation.cycleDelay,
							startDelay: obj.animation.startDelay,
							startY: this.canvas.element.height - image.height,
							currentFrame: obj.animation.startFrame ?? 0,
							condition: obj.condition,
						};

						if (resolveValue(obj.animation.slider, false)) {
							const sliderFrames = resolveValue(obj.animation.frames, 24);
							const sliderDirection = resolveValue(obj.animation.direction, "right");
							const direction = sliderDirection === "right" ? 1 : -1;
							const sliderMovementPerFrame = image.width / sliderFrames;

							const slider = new Weather.Sky.Canvas(image.width * sliderFrames, image.height);

							for (let i = 0; i < sliderFrames; i++) {
								const offsetX = round(direction * sliderMovementPerFrame * i, 0);

								slider.clear();
								slider.drawImage(image, offsetX, 0);
								slider.drawImage(image, direction === 1 ? round(offsetX - image.width, 0) : round(offsetX + image.width, 0), 0);
							}

							animationOptions.image = slider.element;
							animationOptions.numFrames = sliderFrames;
							animationOptions.offset = direction * sliderMovementPerFrame;
						} else {
							animationOptions.image = image;
							animationOptions.numFrames = image.width / this.canvas.element.width;
							if (typeof obj.animation !== "object") {
								obj.parentAnimation = obj.animation;
							}
							animationOptions.parentAnimation = obj.parentAnimation;
						}

						obj.animationObj = new Weather.Sky.Animation(animationOptions);
						obj.animationObj.enable();
						this.parentLayer.animationGroup.add(animationOptions.name, obj.animationObj);
					} else {
						// If it's a static image
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

		// Need to create a deep copy in case of other effects using the same object
		this.obj = this.location[this.key].deepCopy();

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
	onEnable() {
		for (const obj of this.animations.values()) {
			obj.animationObj?.enable();
		}
	},
	onDisable() {
		for (const obj of this.animations.values()) {
			obj.animationObj?.disable();
		}
	},
	draw(onDraw = {}) {
		this.canvas.ctx.reset();
		for (const [key, obj] of this.animations.entries()) {
			// Preprocess
			if (onDraw.start) {
				if (!onDraw.start(key, obj, this.canvas)) continue;
			}

			// Check conditions
			if (obj.condition && !obj.condition(this.parentLayer.animationGroup)) {
				continue;
			}

			if (obj.animationObj) {
				// If animation, let the animation object itself draw the right frame
				obj.animationObj.draw();
			} else {
				// If static image
				const yPosition = this.canvas.element.height - obj.image.height;

				// If it's a spritesheet, we can choose which frame to draw
				const frame = resolveValue(obj.frame, 0);
				const frameX = Math.clamp(frame * this.canvas.element.width, 0, obj.image.width - this.canvas.element.width);

				this.canvas.ctx.drawImage(
					obj.image,
					frameX,
					0,
					this.canvas.element.width,
					this.canvas.element.height,
					0,
					yPosition,
					this.canvas.element.width,
					this.canvas.element.height
				);
			}

			// Postprocess
			if (onDraw.end) {
				onDraw.end(key, obj, this.canvas);
			}
		}
	},
});
