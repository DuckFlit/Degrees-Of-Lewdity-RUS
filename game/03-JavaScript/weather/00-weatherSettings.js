/*
All colors use a hex-value with an added alpha
The alpha use the 2 last characters of a 8-character hex-value and range from 0-255 (00-ff)

*/
setup.WeatherSettings = {
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
			cirrus: 2,
			temperatureModifier: 2,
			tanningModifier: 1,
			overcast: () => false,
			precipitationIntensity: 0,
			visibility: 1,
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
			cirrus: 2,
			temperatureModifier: 1.5,
			tanningModifier: 0.5,
			overcast: () => false,
			precipitationIntensity: 0,
			visibility: 1,
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
			tanningModifier: 0.2,
			overcast: () => weightedRandom([true, 1], [false, 0.2]),
			precipitationIntensity: 0,
			visibility: 0.8,
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
			tanningModifier: 0.2,
			overcast: () => true,
			precipitationIntensity: 1,
			visibility: 0.7,
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
			tanningModifier: 0.1,
			overcast: () => 1,
			precipitationIntensity: 2,
			visibility: 0.4,
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
			visibility: 0.3,
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
				cirrusSpeed: 0.05,
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
			]),
			cirrusOpacity: 0.5,
			minDarkness: 0.15,
			dayColor: "#ffe9d300",
			dawnDuskColor: "#ff8000cc",
			nightColor: "#000412cc",
			overcastColor: "#000412cc",
			farColor: "#aab7e6aa",
			farOpacity: 0.8,
			overCastAlphaDay: 1,
			overCastAlphaNight: 0.9,
			overCastDayColor: "#97a9e8aa",
			overCastDawnDuskColor: "#97a9e8aa",
			overCastNightColor: "#0004128aa",
			fadeDuration: 60,
		},
		overcast: {
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
			]),
			minDarkness: 0.15,
			dayColor: "#ffe9d300",
			dawnDuskColor: "#ff8000cc",
			nightColor: "#000412cc",
			overcastColor: "#000412cc",
			farColor: "#aab7e6aa",
			farOpacity: 0.8,
			overCastAlphaDay: 1,
			overCastAlphaNight: 0.9,
			overCastDayColor: "#97a9e8aa",
			overCastDawnDuskColor: "#97a9e8aa",
			overCastNightColor: "#0004128aa",
			fadeDuration: 60,
		},
		cirrus: {
			movement: {
				speedMin: 0.1, // Pixels per minute of game time
				speedMax: 0.5,
				direction: 1,
			},
			imgPath: "img/misc/sky/clouds/",
			images: new Map([
				["cirrus/0.png", "cirrus"],
				["cirrus/1.png", "cirrus"],
			]),
			dayColor: "#ffe9d300",
			dawnDuskColor: "#ff8000cc",
			nightColor: "#000412cc",
			overcastColor: "#000412cc",
			overCastAlphaDay: 1,
			overCastAlphaNight: 0.9,
			overCastDayColor: "#97a9e8aa",
			overCastDawnDuskColor: "#97a9e8aa",
			overCastNightColor: "#0004128aa",
			fadeDuration: 60,
		},
		fog: {
			day: {
				topColor: "#f2f8f733", // 80%
				midColor: "#f2f8f766", // 40%
				botColor: "#f2f8f7cc", // 20%
			},
			night: {
				topColor: "#4c4d5466",
				midColor: "#4c4d5499",
				botColor: "#4c4d54cc",
			},
			midPosition: 0.7,
			opacity: 1,
		},
		precipitation: {
			imgPath: "img/misc/sky/effects/",
			images: new Map([
				["rain1.png", "rain"],
				["rain2.png", "rain"],
				["rain3.png", "rain"],
				["rain4.png", "rain"],
				["rain5.png", "rain"],
				["rain6.png", "rain"],
				["rain7.png", "rain"],
				["rain8.png", "rain"],
				["snow1.png", "snow"],
				["snow2.png", "snow"],
				["snow3.png", "snow"],
				["snow4.png", "snow"],
				["snow5.png", "snow"],
				["snow6.png", "snow"],
				["snow7.png", "snow"],
				["snow8.png", "snow"],
				["snow9.png", "snow"],
				["snow10.png", "snow"],
				["snow11.png", "snow"],
				["snow12.png", "snow"],
				["snow13.png", "snow"],
				["snow14.png", "snow"],
				["snow15.png", "snow"],
				["snow16.png", "snow"],
			]),
			rain: {
				opacity: 0.15,
				spriteOverlap: -16,
				startOffsetX: 0,
				verticalOffset: -10,
				diagonalOffset: 16,
				fps: 9,
			},
			snow: {
				opacity: 0.8,
				spriteOverlap: 0,
				startOffsetX: 0,
				verticalOffset: -10,
				diagonalOffset: 0,
				fps: 7,
			},
			//alpha
			//offsets
		},
		backgroundPrecipitation: {
			imgPath: "img/misc/sky/effects/",
			images: new Map([
				["rain_sparse1.png", "rain"],
				["rain_sparse2.png", "rain"],
				["rain_sparse3.png", "rain"],
				["rain_sparse4.png", "rain"],
				["rain_sparse5.png", "rain"],
				["rain_sparse6.png", "rain"],
				["rain_sparse7.png", "rain"],
				["rain_sparse8.png", "rain"],
				["snow_sparse1.png", "snow"],
				["snow_sparse2.png", "snow"],
				["snow_sparse3.png", "snow"],
				["snow_sparse4.png", "snow"],
				["snow_sparse5.png", "snow"],
				["snow_sparse6.png", "snow"],
				["snow_sparse7.png", "snow"],
				["snow_sparse8.png", "snow"],
				["snow_sparse9.png", "snow"],
				["snow_sparse10.png", "snow"],
				["snow_sparse11.png", "snow"],
				["snow_sparse12.png", "snow"],
				["snow_sparse13.png", "snow"],
				["snow_sparse14.png", "snow"],
				["snow_sparse15.png", "snow"],
				["snow_sparse16.png", "snow"],
			]),
			rain: {
				opacity: 0.15,
				spriteOverlap: -16,
				startOffsetX: 0,
				verticalOffset: 0,
				diagonalOffset: 16,
				fadePosition: 0.5,
				darken: 0.2,
				darkenColor: "#000412cc",
				fps: 6,
			},
			snow: {
				opacity: 0.5,
				spriteOverlap: 0,
				startOffsetX: 0,
				verticalOffset: 0,
				diagonalOffset: 0,
				fadePosition: 0.5,
				darken: 0,
				fps: 4,
			},
			//alpha
			//offsets
		},
		location: {
			imgPath: {
				normal: "img/misc/normal_apng/",
				winter: "img/misc/winter_apng/",
			},
		},
	},
};
