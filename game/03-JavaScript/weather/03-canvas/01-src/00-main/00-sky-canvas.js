/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
Weather.Sky = (() => {
	class Canvas {
		constructor(width, height) {
			this.canvas = $("<canvas/>");
			this.element = this.canvas[0];
			this.ctx = this.element.getContext("2d");

			const scale = setup.SkySettings.scale;
			const scaledWidth = width ?? setup.SkySettings.canvasSize[0] * scale;
			const scaledHeight = height ?? setup.SkySettings.canvasSize[1] * scale;
			this.element.width = scaledWidth;
			this.element.height = scaledHeight;
		}

		scale(width, height) {
			this.element.width = width;
			this.element.height = height;
		}

		reset() {
			this.clear();
			this.ctx.reset();
		}

		/* Aliases */
		clear() {
			this.ctx.clearRect(0, 0, this.element.width, this.element.height);
		}

		fillRect() {
			this.ctx.fillRect(0, 0, this.element.width, this.element.height);
		}

		drawImage(image, x = 0, y = 0) {
			this.ctx.drawImage(image, x, y);
		}
	}

	/**
	 * expandFactor is used to contract or expand the duration between sunrise and sunset
	 */
	class Orbit {
		constructor(settings, date, expandFactor = 0.1) {
			this.settings = settings;
			this.expandFactor = expandFactor;
			this.bottomOffset = 100 * setup.SkySettings.scale;
			this.setPosition(date);
		}

		/**
		 * @param {DateTime} date
		 */
		setPosition(date) {
			const currentTime = Time.getSecondsSinceMidnight(date);

			const riseTimeInSeconds = this.settings.riseTime * TimeConstants.secondsPerHour;
			const setTimeInSeconds = this.settings.setTime * TimeConstants.secondsPerHour;
			const adjustedSetTime = setTimeInSeconds < riseTimeInSeconds ? setTimeInSeconds + TimeConstants.secondsPerDay : setTimeInSeconds;
			const expandedDuration = (adjustedSetTime - riseTimeInSeconds) / (1 - 2 * this.expandFactor);

			const elapsed =
				currentTime < riseTimeInSeconds
					? (currentTime + TimeConstants.secondsPerDay - riseTimeInSeconds + this.expandFactor * expandedDuration) % TimeConstants.secondsPerDay
					: (currentTime - riseTimeInSeconds + this.expandFactor * expandedDuration) % TimeConstants.secondsPerDay;

			const timePercent = Math.clamp(elapsed / expandedDuration, 0, 1);
			const adjustedTimePercent = (timePercent - this.expandFactor) / (1 - 2 * this.expandFactor);

			// Adjust these values based on the scale
			const horizon = this.settings.path.horizon * setup.SkySettings.scale;
			const startX = this.settings.path.startX * setup.SkySettings.scale;
			const bottomY = horizon + this.bottomOffset;
			const endX = this.settings.path.endX * setup.SkySettings.scale;
			const peakY = this.settings.path.peakY * setup.SkySettings.scale;
			const amplitude = (peakY - bottomY) / 2;
			const baselineY = bottomY + amplitude;
			const factor = 1 - 4 * Math.pow(adjustedTimePercent - 0.5, 2);

			// Use a simple lerp for the x position while y uses a parabolic function for a simplified arc
			this.position = {
				x: lerp(adjustedTimePercent, startX, endX),
				y: baselineY + amplitude * factor,
				bottom: bottomY + amplitude, // Consider if scaling is needed here based on your canvas logic
			};

			const steepness = 5;
			this.setFactor(steepness, 1);
		}

		setFactor(steepness, amplitude) {
			// Adjust based on scale
			const horizon = this.settings.path.horizon * setup.SkySettings.scale;
			const peakY = this.settings.path.peakY * setup.SkySettings.scale;
			const x = (this.position.y - horizon) / (peakY - horizon);
			this.factor = 2 * Math.pow(1 / (1 + Math.exp(-steepness * x)), amplitude) - 1;
		}
	}

	class Fadable {
		constructor(settings, date, initFactor) {
			this.settings = settings;
			this.factor = initFactor;
			this.currentDate = new DateTime(date);
		}

		setTime(date) {
			this.elapsedTime = this.currentDate?.compareWith(date, true) / TimeConstants.secondsPerMinute;
			this.currentDate = new DateTime(date);
		}

		setFadeFactor(date, fadeTarget) {
			this.setTime(date);
			const fadeChange = (1 / this.settings.timeToFade) * Math.abs(this.elapsedTime);
			const fadeDirection = Math.sign(fadeTarget - this.factor);

			if (fadeDirection !== 0) {
				this.factor += fadeChange * fadeDirection;

				// Ensure factor does not overshoot fadeTarget
				if ((fadeDirection > 0 && this.factor > fadeTarget) || (fadeDirection < 0 && this.factor < fadeTarget)) {
					this.factor = fadeTarget;
				}
				this.factor = Math.clamp(this.factor, 0, 1);
			}
		}
	}

	const _skybox = $("<div />", { id: "canvasSkybox" });
	const _mainLayer = new Canvas();
	const _orbitals = {};
	const _fadables = {};

	_skybox.append(_mainLayer.canvas);
	const _loaded = new ObservableValue(false);

	/**
	 * @param {object} objA Position object {x, y, width, height}
	 * @param {object} objB Position object {x, y, width, height}
	 * @param {number} modifier 0-1
	 * @returns {boolean}
	 */
	function isOverlapping(objA, objB, modifier = 1) {
		const xOverlap = Math.max(0, Math.min(objA.x + objA.width, objB.x + objB.width) - Math.max(objA.x, objB.x));
		const yOverlap = Math.max(0, Math.min(objA.y + objA.height, objB.y + objB.height) - Math.max(objA.y, objB.y));

		const intersectionArea = xOverlap * yOverlap;
		const minOverlapArea = objA.width * objA.height * modifier;
		return intersectionArea >= minOverlapArea;
	}

	function isOverlappingAny(objA, objList, modifier) {
		if (!objList.length) return false;
		for (const objB of objList) {
			if (Weather.Sky.isOverlapping(objA, objB, modifier)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Executes once - when page is loaded
	 */
	function initialize() {
		initOrbits();
		setupCanvas();
	}

	async function setupCanvas() {
		const loadPromises = Array.from(Weather.Sky.Layers.layers.values()).flatMap(layer => layer.loadPromises);

		// Sequentially await each promise in loadPromises
		for (const loadPromise of loadPromises) {
			try {
				await loadPromise;
			} catch (error) {
				console.warn(error);
			}
		}

		Weather.Sky.Layers.sortByZIndex();
		initFadables();
		await initEffects();
		drawLayers();
		_loaded.value = true;
	}

	// todo initOrbits doesn't run every day - should run weekly or daily? (run at midday to update moon, run at midnight to update sun)
	function initOrbits() {
		const sunOrbitSettings = setup.SkySettings.orbits.sun;
		_orbitals.sun = new Orbit(interpolateObject(sunOrbitSettings.summer, sunOrbitSettings.winter, Time.date.seasonFactor), Time.date);

		const moonOrbitSettings = setup.SkySettings.orbits.moon;
		_orbitals.moon = new Orbit(interpolateObject(moonOrbitSettings.summer, moonOrbitSettings.winter, Time.date.seasonFactor), Time.date);

		const bloodMoonOrbitSettings = setup.SkySettings.orbits.bloodmoon;
		_orbitals.bloodMoon = new Orbit(bloodMoonOrbitSettings, Time.date);
	}

	function initFadables() {
		const overcastSettings = setup.SkySettings.fade.overcast;
		const maxOvercast = Weather.bloodMoon ? 0.7 : Weather.current.overcast;
		_fadables.overcast = new Fadable(overcastSettings, Time.date, maxOvercast);
	}

	async function initEffects() {
		for (const layer of Weather.Sky.Layers.layers.values()) {
			await layer.init();
		}
	}

	/**
	 * Only recalculate the draw functions on the animated layer if a name is specified
	 * All other layers redraw their previous canvas
	 * If no layerName is specified - recalculate draw functions for all layers
	 *
	 * @param {string} args
	 */
	async function drawLayers(...args) {
		const tempCanvas = new Canvas();
		for (const layer of Weather.Sky.Layers.layers.values()) {
			if (args.length === 0 || args.includes(layer.name)) {
				try {
					const errors = await layer.drawEffects(tempCanvas);
					if (errors && errors.length > 0) {
						console.error(`Errors drawing layer '${layer.name}':`, errors);
					}
				} catch (error) {
					console.error(`Error drawing layer '${layer.name}':`, error.message);
				}
			}
			layer.drawLayer(tempCanvas);
		}

		_mainLayer.element.width = setup.SkySettings.canvasSize[0];
		_mainLayer.element.height = setup.SkySettings.canvasSize[1];
		_mainLayer.ctx.imageSmoothingEnabled = false;
		_mainLayer.clear();
		_mainLayer.ctx.drawImage(tempCanvas.element, 0, 0, setup.SkySettings.canvasSize[0], setup.SkySettings.canvasSize[1]);
	}

	function updateOrbits() {
		_orbitals.sun.setPosition(Time.date);
		if (Weather.bloodMoon) {
			_orbitals.bloodMoon.setPosition(Time.date);
		} else {
			_orbitals.moon.setPosition(Time.date);
		}
	}

	function updateFade() {
		_fadables.overcast.setFadeFactor(Time.date, Weather.current.overcast);
	}

	function getLayer(name) {
		return Weather.Sky.Layers.layers.get(name);
	}

	function updateTooltip() {
		// Maybe not hardcode this here
		const key = V.location === "tentworld" ? "tentaclePlains" : Weather.name;
		const weatherState = Weather.TooltipDescriptions.type[key];

		if (!weatherState) return;
		const transition = weatherState.transition ? weatherState.transition() : null;
		console.log("transition", weatherState, transition);
		const weatherDescription = transition || (typeof weatherState === "string" ? weatherState : resolveValue(weatherState[Weather.skyState], ""));

		const tempDescription = Weather.TooltipDescriptions.temperature();
		const debug = V.debug
			? `<br><br><span class="teal">DEBUG:</span>
			<br><span class="blue">Passage:</span> <span class="yellow">${V.passage}</span>
			<br><span class="blue">Time:</span> <span class="yellow">${ampm()}</span>
			<br><span class="blue">Weather:</span> <span class="yellow">${Weather.name}</span>
			<br><span class="blue">Outside temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.temperature)}</span>
			<br><span class="blue">Inside temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.insideTemperature)}</span>
			<br><span class="blue">Water temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.waterTemperature)}</span>
			<br><span class="blue">Body temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)}</span>
			<br><span class="blue">Sun intensity:</span> <span class="yellow">${round(Weather.sunIntensity * 100, 2)}% (${V.outside ? "outside" : "inside"})</span>
			<br><span class="blue">Overcast amount:</span> <span class="yellow">${round(_fadables.overcast.factor * 100, 2)}%</span>
			<br><span class="blue">Fog amount:</span> <span class="yellow">${round(Weather.fog * 100, 2)}%</span>
			<br><span class="blue">Snow ground accumulation:</span> <span class="yellow">${V.weatherObj.snow}mm</span>
			<br><span class="blue">Lake ice thickness:</span> <span class="yellow">${V.weatherObj.ice.lake ?? 0}mm</span>`
			: "";
		_skybox.tooltip({
			message: `${weatherDescription}<br>${tempDescription}${debug}`,
			delay: 200,
			position: "cursor",
		});
	}

	// Make properties readonly
	return {
		Canvas,
		get dayFactor() {
			return _orbitals.sun?.factor ?? 0;
		},
		// Returns 1 when moon is fully lit - and 0 when its fully dark
		get moonBrightnessFactor() {
			return 1 - 2 * Math.abs(Time.date.moonPhaseFraction - 0.5);
		},
		get blur() {
			return Weather.fog;
		},
		get skyDisabled() {
			return V.location === "tentworld";
		},
		skybox: _skybox,
		mainLayer: _mainLayer,
		orbitals: _orbitals,
		fadables: _fadables,
		loaded: _loaded,
		isOverlapping,
		isOverlappingAny,
		updateOrbits,
		updateFade,
		initialize,
		drawLayers,
		getLayer,
		updateTooltip,
		setMoonPhase() {
			getLayer("moon").init();
		},
	};
})();
window.Weather.Sky = Weather.Sky;

$(document).one(":passagestart", () => {
	if (!V.weatherObj) return;
	Weather.Sky.initialize();
});

Macro.add("skybox", {
	handler() {
		Weather.Sky.skybox.appendTo(this.output);
	},
});
