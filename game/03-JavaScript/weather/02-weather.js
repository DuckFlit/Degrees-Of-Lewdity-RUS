/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*

- Add function:
	- setWeather: Should replace current weather, but then smoothly transition to a new weather after a while.

	- Only use winter-images after it has snowed once
	- if it melts (at least 5 hours of warm temperature) back to normal images until it snow again
*/

const Weather = (() => {
	const Settings = {
		months: [
			{
				// Jan
				temperatureRange: [-8, 7],
				sunIntensity: 0.1, // Modifies tanning changes from sun exposure
			},
			{
				// Feb
				temperatureRange: [-5, 9],
				sunIntensity: 0.2,
			},
			{
				// Mar
				temperatureRange: [4, 12],
				sunIntensity: 0.3,
			},
			{
				// Apr
				temperatureRange: [6, 16],
				sunIntensity: 0.5,
			},
			{
				// May
				temperatureRange: [9, 18],
				sunIntensity: 0.7,
			},
			{
				// Jun
				temperatureRange: [12, 21],
				sunIntensity: 1,
			},
			{
				// Jul
				temperatureRange: [14, 24],
				sunIntensity: 1,
			},
			{
				// Aug
				temperatureRange: [14, 22],
				sunIntensity: 0.8,
			},
			{
				// Sep
				temperatureRange: [11, 20],
				sunIntensity: 0.7,
			},
			{
				// Oct
				temperatureRange: [9, 16],
				sunIntensity: 0.5,
			},
			{
				// Nov
				temperatureRange: [-1, 10],
				sunIntensity: 0.3,
			},
			{
				// Dec
				temperatureRange: [-4, 7],
				sunIntensity: 0.1,
			},
		],
		weatherTypes: [
			{
				name: "clear",
				value: 0,
				probability: {
					summer: 0.6,
					winter: 0.3,
					spring: 0.5,
					autumn: 0.4,
				},
				cloudCount: {
					// Visual only
					small: () => random(0, 2),
					large: () => 0,
				},
				temperatureModifier: 2,
				tanningModifier: 1, // Also works as a body-heat modifier
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds",
				value: 1,
				probability: {
					summer: 0.3,
					winter: 0.4,
					spring: 0.4,
					autumn: 0.3,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds8",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds7",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds6",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds5",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds4",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds3",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "lightClouds2",
				value: 1,
				probability: {
					summer: 0,
					winter: 0,
					spring: 0,
					autumn: 0,
				},
				cloudCount: {
					small: () => random(1, 2),
					large: () => random(0, 1),
				},
				temperatureModifier: 1.5,
				tanningModifier: 0.5,
				overcast: () => false,
				precipitationIntensity: 0,
			},
			{
				name: "heavyClouds",
				value: 2,
				probability: {
					summer: 0.1,
					winter: 0.4,
					spring: 0.2,
					autumn: 0.3,
				},
				cloudCount: {
					small: () => 0,
					large: () => random(0, 4),
				},
				temperatureModifier: 1.2,
				tanningModifier: 0.1,
				overcast: () => weightedRandom([true, 1], [false, 0.5]), // ~66% to be true
				precipitationIntensity: 0,
			},
			{
				name: "lightPrecipitation",
				value: 3,
				probability: {
					summer: 0.05,
					winter: 0.1,
					spring: 0.05,
					autumn: 0.15,
				},
				cloudCount: {
					small: () => 0,
					large: () => random(1, 4),
				},
				temperatureModifier: 1,
				tanningModifier: 0.1,
				overcast: () => weightedRandom([true, 1], [false, 0.1]), // ~91% to be true
				precipitationIntensity: 0,
			},
			{
				name: "heavyPrecipitation",
				value: 4,
				probability: {
					summer: 0.05,
					winter: 0.1,
					spring: 0.05,
					autumn: 0.1,
				},
				cloudCount: {
					small: () => 0,
					large: () => random(2, 4),
				},
				temperatureModifier: 1,
				tanningModifier: 0,
				overcast: () => 1,
				precipitationIntensity: 2,
			},
			{
				name: "thunderstorm",
				value: 4,
				probability: {
					summer: 0.02,
					winter: 0.005,
					spring: 0.015,
					autumn: 0.01,
				},
				cloudCount: {
					small: () => 0,
					large: () => random(3, 4),
				},
				temperatureModifier: 1,
				tanningModifier: 0,
				overcast: () => 1,
				precipitationIntensity: 2,
			},
		],
		forecast: {
			daysToGenerate: 20,
			minKeyPointsPerDay: 1,
			maxKeyPointsPerDay: 4,
			minTimeApartKeyPoints: 140, // Minimum time between each keypoint, in minutes
		},
		visuals: {
			canvasDimensions: {
				width: 64, // Size of the canvas
				height: 192,
			},
			sky: {
				canvasSize: { x: 64, y: 192 },
				colors: {
					day: {
						sky1: "#ccccff",
						sky2: "#408aca",
						sunGlow: "#fbffdb25",
					},
					dawnDusk: {
						sky1: "#d47d12",
						sky2: "#6c6d94",
						sunGlow: "#f7ff4a50",
					},
					night: {
						sky1: "#010015",
						sky2: "#0f0f41",
						sunGlow: "#fd634d00",
					},
					cityLights: "#b9a17925",
				},
				lightsOnTime: 18,
				lightsOffTime: 6,
			},
			sun: {
				imgPath: "img/misc/sky/sun2.png",
				glow: {
					outerSize: 10,
					innerSize: 3,
					dayColor: "#f4ffd3cc",
					nightColor: "#fee000cc",
					updateColor: true,
				},
				orbit: {
					riseTime: 7,
					setTime: 19,
					path: {
						startX: 0,
						endX: 64,
						peakY: 40,
						horizon: 162,
					},
				},
			},
			moon: {
				imgPath: "img/misc/sky/moon2.png",
				glow: {
					color: "#ffffffaa",
					size: 6,
				},
				shadow: {
					color: "#0d001522",
					opacity: {
						night: 0.02,
						day: 0.08,
					},
					angle: 10, // In degrees - The angle the shadow eclipse travels (from right to left)
				},
				visibility: {
					night: 1,
					day: 0.4,
				},
				orbit: {
					riseTime: 18,
					setTime: 6,
					path: {
						startX: 0,
						endX: 64,
						peakY: 40,
						horizon: 162,
					},
				},
			},
			starfield: {
				dimensions: {
					width: 256, // Size of the generated starfield - should be square
					height: 256,
				},
				imgPath: "img/misc/sky/stars/",
				pivot: { x: 64, y: 128 }, // At which coordinates the starfield rotates around
				rotation: {
					clockwise: true, // Set false for anti-clockwise
				},
				stars: {
					count: 100, // Number of stars in the whole canvas (The actual visible stars in the area is less than 20%, since it rotates around a pivot)
					minDistance: 12, // Min distance between stars in pixels
					colorRange: ["#ae9ff5", "#bc91e6", "#7db9e3", "#ffffff"],
					// Sets the chance of which stars to spawn - The weight (second number) determines the chance based on the other weights
					spriteChance: [
						//Change to Map()
						[0, 10], // Chance of square non-sprite 2x2 stars
						["star_0.png", 0.8],
						["star_1.png", 0.3],
						["star_2.png", 0.15],
						["star_3.png", 0.02],
						["star_4.png", 0.02],
					],
					opacity: {
						night: 0.75,
						day: 0,
					},
					glowColor: "#ffffff6a",
				},
			},
			clouds: {
				maxHeight: 64,
				minHeight: 112,
				spriteOverlap: 0.2,
				movement: {
					speedMin: 0.1, // Pixels per minute of game time
					speedMax: 0.5,
					direction: 1,
				},
				imgPath: "img/misc/sky/clouds/",
				images: new Map([
					["0.png", "small"],
					["1.png", "small"],
					["2.png", "small"],
					["3.png", "large"],
					["4.png", "large"],
					["5.png", "large"],
					["cirrus/0.png", "cirrus"],
					["cirrus/1.png", "cirrus"],
					["overcast/4.png", "overcast"],
					["precipitation/rain.png", "rain"],
					["precipitation/snow.png", "snow"],
				]),
				minDarkness: 0.15,
				dayColor: "#ffe9d300",
				dawnDuskColor: "#ff8000cc",
				nightColor: "#000412cc",
				farColor: "#aab7e6aa",
				farOpacity: 0.8,
				overCastAlphaDay: 1,
				overCastAlphaNight: 0.9,
				overCastDayColor: "#97a9e8aa",
				overCastDawnDuskColor: "#97a9e8aa",
				overCastNightColor: "#0004128aa",
				fadeDuration: 60,
			},
		}
	};

	/* Helper functions */
	function generateKeyPoints({ date, minKeys, maxKeys, timeApart, rangeValue, totalSteps }) {
		const numberOfKeyPoints = random(minKeys - 1, maxKeys - 1);
		const keyPoints = new Map();

		while (keyPoints.size < numberOfKeyPoints) {
			const randomUnit = random(timeApart + 1, totalSteps - timeApart);

			const isFarEnough = Array.from(keyPoints.keys()).every(kp => Math.abs(kp - randomUnit) >= timeApart);
			if (isFarEnough) {
				keyPoints.set(randomUnit, rangeValue(date));
			}
		}
		// Add the last key point
		keyPoints.set(totalSteps + 1, rangeValue(date));
		return new Map([...keyPoints.entries()].sort((a, b) => a[0] - b[0]));
	}

	return {
		Settings,
		generateKeyPoints,
		get current() {
			return Weather.WeatherConditions.getWeather();
		},
		get name() {
			return Weather.WeatherConditions.getWeather().name;
		},
		get type() {
			return Weather.WeatherConditions.getWeather().defines;
		},
		get overcast() {
			return Weather.WeatherConditions.getWeather().overcast;
		},
		get temperature() {
			return Weather.Temperature.getCelcius();
		},
		set: (weatherType, instant) => Weather.WeatherConditions.setWeather(weatherType, instant),
		get: date => Weather.WeatherConditions.getWeather(date),
		is: weatherType => Weather.WeatherConditions.isWeather(weatherType),
	};
})();
window.Weather = Weather;
