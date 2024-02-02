/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const WeatherCanvas = (() => {
	class Canvas {
		constructor() {
			const [width, height] = setup.WeatherCSettings.canvasSize;
			this.canvas = $("<canvas/>");
			this.element = this.canvas[0];
			this.ctx = this.element.getContext("2d");
			this.element.width = width;
			this.element.height = height;
		}

		clear() {
			this.ctx.clearRect(0, 0, this.element.width, this.element.height);
		}

		fillRect() {
			this.ctx.fillRect(0, 0, this.element.width, this.element.height);
		}
	}

	class Animation {
		constructor(image, fps, numFrames, delay, onFrameDraw) {
			this.image = image;
			this.frameInterval = 1000 / fps;
			this.numFrames = numFrames;
			if (typeof delay === "function") {
				this.delayFunc = delay;
				this.delay = delay();
			} else {
				this.delay = delay;
			}
			this.delayTimer = this.delay;
			this.onFrameDraw = onFrameDraw;
			this.currentFrame = 0;
			this.frameTimer = 0;
			this.isAnimating = false;

			// Bind it once
			this.animate = this.animate.bind(this);
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
			if (frameUpdated && typeof this.onFrameDraw === "function") {
				this.onFrameDraw();
			}

			requestAnimationFrame(this.animate);
		}

		update(elapsedTime) {
			// Wait for delay timer
			if (this.delayTimer > 0) {
				this.delayTimer -= elapsedTime;
				if (this.delayTimer <= 0) {
					this.delayTimer = 0;
					this.currentFrame = 0;
				}
				return false;
			}

			this.frameTimer += elapsedTime;
			if (this.frameTimer < this.frameInterval) {
				return false;
			}

			this.frameTimer -= this.frameInterval;
			this.currentFrame = (this.currentFrame + 1) % this.numFrames;

			// Start delay timer if it's the end of the animation
			if (this.currentFrame === 0 && this.delay > 0) {
				this.delay = this.delayFunc ? this.delayFunc() : this.delay;
				this.delayTimer = this.delay;
			}

			return true;
		}

		draw(ctx, x, y, frameWidth, frameHeight, destWidth, destHeight) {
			const frameX = frameWidth * this.currentFrame;
			ctx.drawImage(this.image, frameX, 0, frameWidth, frameHeight, x, y, destWidth, destHeight);
		}
	}

	/**
	 * expandFactor is used to contract or expand the duration between sunrise and sunset
	 */
	class Orbit {
		constructor(settings, date, expandFactor = 0.1) {
			this.settings = settings;
			this.expandFactor = expandFactor;
			this.bottomOffset = 100; // Pixels below the horizon which is the max Y value
			this.setPosition(date);
		}

		/**
		 * @param {DateTime} date
		 */
		setPosition(date) {
			const currentTime = Time.getSecondsSinceMidnight(date);

			// Get a percentage of time - modified by the expandFactor
			const riseTimeInSeconds = this.settings.riseTime * Time.secondsPerHour;
			const setTimeInSeconds = this.settings.setTime * Time.secondsPerHour;
			const adjustedSetTime = setTimeInSeconds < riseTimeInSeconds ? setTimeInSeconds + Time.secondsPerDay : setTimeInSeconds;
			const expandedDuration = (adjustedSetTime - riseTimeInSeconds) / (1 - 2 * this.expandFactor);

			const elapsed =
				currentTime < riseTimeInSeconds
					? (currentTime + Time.secondsPerDay - riseTimeInSeconds + this.expandFactor * expandedDuration) % Time.secondsPerDay
					: (currentTime - riseTimeInSeconds + this.expandFactor * expandedDuration) % Time.secondsPerDay;

			const timePercent = Math.clamp(elapsed / expandedDuration, 0, 1);
			const adjustedTimePercent = (timePercent - this.expandFactor) / (1 - 2 * this.expandFactor);

			// Calculate the arc
			const bottomY = this.settings.path.horizon + this.bottomOffset;
			const amplitude = (this.settings.path.peakY - bottomY) / 2;
			const baselineY = bottomY + amplitude;
			const factor = 1 - 4 * Math.pow(adjustedTimePercent - 0.5, 2);

			// Use a simple lerp for the x position while y uses a parabolic function for a simplified arc
			this.position = {
				x: lerp(adjustedTimePercent, this.settings.path.startX, this.settings.path.endX),
				y: baselineY + amplitude * factor,
				bottom: bottomY + amplitude,
			};

			const steepness = 5;
			const scalingFactor = 1;
			this.setFactor(steepness, scalingFactor);
		}

		setFactor(steepness, amplitude) {
			const x = (this.position.y - this.settings.path.horizon) / (this.settings.path.peakY - this.settings.path.horizon);
			this.factor = 2 * Math.pow(1 / (1 + Math.exp(-steepness * x)), amplitude) - 1;
		}
	}

	const _skybox = $("<div />", { id: "canvasSkybox" });
	const _mainLayer = new Canvas();
	const _orbits = {};
	let _animationInterval = null;

	_skybox.append(_mainLayer.canvas);
	const loaded = new ObservableValue(false);

	/**
	 * Executes once - when page is loaded
	 */
	async function initialize() {
		const loadPromises = Array.from(WeatherLayers.layers.values()).flatMap(layer => layer.loadPromises);

		// Sequentially await each promise in loadPromises
		for (const loadPromise of loadPromises) {
			try {
				await loadPromise;
			} catch (error) {
				console.warn(error);
			}
		}

		WeatherLayers.sortByZIndex();
		initOrbits();
		await initEffects();
		draw();
		loaded.value = true;
	}

	function initOrbits() {
		const sunOrbitSettings = setup.WeatherCSettings.orbits.sun;
		_orbits.sun = new Orbit(interpolateObject(sunOrbitSettings.summer, sunOrbitSettings.winter, Time.date.seasonFactor), Time.date);

		const moonOrbitSettings = setup.WeatherCSettings.orbits.moon;
		_orbits.moon = new Orbit(interpolateObject(moonOrbitSettings.summer, moonOrbitSettings.winter, Time.date.seasonFactor), Time.date);

		const bloodMoonOrbitSettings = setup.WeatherCSettings.orbits.bloodmoon;
		_orbits.bloodMoon = new Orbit(bloodMoonOrbitSettings, Time.date);
	}

	async function initEffects() {
		for (const layer of WeatherLayers.layers.values()) {
			await layer.init();
		}
	}

	function updateOrbits() {
		_orbits.sun.setPosition(Time.date);
		if (Weather.bloodMoon) {
			_orbits.bloodMoon.setPosition(Time.date);
		} else {
			_orbits.moon.setPosition(Time.date);
		}
	}

	/**
	 * Executes every frame
	 */
	async function draw() {
		const t0 = performance.now();
		updateOrbits();

		for (const layer of WeatherLayers.layers.values()) {
			try {
				const errors = await layer.draw();

				_mainLayer.ctx.drawImage(layer.canvas.element, 0, 0);

				if (errors.length > 0) {
					console.error(`Errors in layer '${layer.name}':`, errors);
				}
			} catch (error) {
				console.error(`Error in layer '${layer.name}':`, error.message);
			}
		}
		const t1 = performance.now();
		console.log(`DRAW: ${t1 - t0}`);
	}

	/**
	 * Only recalculate the draw functions on the animated layer
	 * All other layers redraw their previous canvas
	 * @param {string} layerName
	 * @param {Animation} animation
	 */
	async function drawFrame(layerName, animation) {
		for (const layer of WeatherLayers.layers.values()) {
			if (layer.name === layerName) {
				try {
					await layer.draw();
				} catch (error) {
					console.error(`Error drawing layer '${layer.name}':`, error.message);
					animation.stop();
				}
			}
			_mainLayer.ctx.drawImage(layer.canvas.element, 0, 0);
		}
	}

	function getLayer(name) {
		return WeatherLayers.layers.get(name);
	}

	function setMoonPhase() {
		getLayer("moon").init(_mainLayer);
	}

	// Make properties readonly
	return {
		Canvas,
		Animation,
		get dayFactor() {
			return _orbits.sun.factor;
		},
		// Returns 1 when moon is fully lit - and 0 when its fully dark
		get moonBrightnessFactor() {
			return 1 - 2 * Math.abs(Time.date.moonPhaseFraction - 0.5);
		},
		skybox: _skybox,
		mainLayer: _mainLayer,
		orbitals: _orbits,
		loaded,
		initialize,
		draw,
		drawFrame,
		getLayer,
		setMoonPhase,
	};
})();
window.WeatherCanvas = WeatherCanvas;
