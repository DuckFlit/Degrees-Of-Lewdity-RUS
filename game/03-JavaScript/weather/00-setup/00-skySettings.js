/*
All colors use a hex-value with an added alpha
The alpha use the 2 last characters of a 8-character hex-value and range from 0-255 (00-ff)

*/
setup.SkySettings = {
	canvasDimensions: {
		width: 64, // Size of the canvas
		height: 192,
	},
	skyBackground: {
		glowRadius: {
			day: 128,
			night: 82,
		},
		colors: {
			day: {
				sky1: "#ccccff", // Sky color around the sun
				sky2: "#408aca", // Base sky color
				sunGlow: "#fbffdb25", // Additional glow effect
			},
			dawnDusk: {
				sky1: "#d47d12", // Sky color around the sun
				sky2: "#6c6d94", // Base sky color
				sunGlow: "#f7ff4a50", // Additional glow effect
			},
			night: {
				sky1: "#141452", // Sky color based on the moon state - will use this color during full moon
				sky2: "#00001c", // Base sky color, when there is no moon
				sunGlow: "#fd634d00", // Sun glow at the horizon, when its still night (during dawn and dusk)
			},
			bloodMoon: {
				sky1: "#4d0000",
				sky2: "#210707",
			},
			cityLights: "#b9a17925",
		},
	},
	sun: {
		images: "img/misc/sky/sun2.png",
		glow: {
			outerSize: 10,
			innerSize: 3,
			dayColor: "#f4ffd3cc",
			nightColor: "#fee000cc",
			updateColor: true,
		},
		orbitSummer: {
			riseTime: 7,
			setTime: 19,
			path: {
				startX: 0,
				endX: 64,
				peakY: 140,
				horizon: 162,
			},
		},
		orbitWinter: {
			riseTime: 7,
			setTime: 19,
			path: {
				startX: 0,
				endX: 64,
				peakY: 92,
				horizon: 162,
			},
		},
	},
	sunGlow: {
		glowRadius: 128,
		colors: {
			day: "#fbffdb50",
			dawnDusk: "#f7ff4a50",
			night: "#fd634d00",
		},
	},
	moon: {
		imgPath: "img/misc/sky/",
		images: new Map([
			["moon.png", "night"],
			["blood-moon.png", "bloodMoon"],
		]),
		glow: {
			night: {
				color: "#ffffffaa",
				opacity: 1,
				size: 6,
			},
			bloodMoon: {
				color: "#ad3a21",
				opacity: 0.8,
				size: 12,
			},
		},
		overlay: {
			night: "#ffffff00",
			bloodMoon: "#eb6565aa",
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
			riseTime: 19,
			setTime: 6,
			path: {
				startX: 0,
				endX: 64,
				peakY: 40,
				horizon: 162,
			},
		},
		bloodMoonOrbit: {
			riseTime: 20,
			setTime: 7,
			path: {
				startX: -16,
				endX: 92,
				peakY: 32,
				horizon: 64,
			},
		},
	},
	moonGlow: {
		glowRadius: 32,
		maxAlpha: 0,
		colors: {
			night1: "#cfcfff0f",
			night2: "#cfcfff00",
			dawnDusk: "#cfcfff00",
			bloodMoon: "#fd634d00",
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
				bloodMoon: 0.25,
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
		]),
		cirrusOpacity: 0.5,
		minDarkness: 0.15,
		dayColor: "#ffe9d300",
		dawnDuskColor: "#ff8000cc",
		nightColor: "#000412cc",
		bloodMoonColor: "#3d0c01dd",
		overcastColor: "#000412cc",
		farColor: "#aab7e6aa",
		farOpacity: 0.8,
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
			["overcast/0.png", "overcast"],
		]),
		minDarkness: 0.15,
		dayColor: "#ffe9d300",
		dawnDuskColor: "#ff8000cc",
		nightColor: "#000412cc",
		bloodMoonColor: "#570f00cc",
		overcastColor: "#000412cc",
		farColor: "#aab7e6aa",
		farOpacity: 0.8,
		alphaDay: 1,
		alphaNight: 0.9,
		overCastDayColor: "#97a9e8aa",
		overCastDawnDuskColor: "#97a9e8aa",
		overCastNightColor: "#0004128cc",
		fadeDuration: 60,
	},
	cirrus: {
		movementSpeed: 0.1,
		imgPath: "img/misc/sky/clouds/",
		images: new Map([
			["cirrus/0.png", "cirrus"],
			["cirrus/1.png", "cirrus"],
		]),
		spriteOverlap: 0.2,
		minY: 0,
		maxY: 48,
		minCount: 0,
		maxCount: 3,
		dayColor: "#ffe9d300",
		dawnDuskColor: "#ff8000cc",
		nightColor: "#000412cc",
		bloodMoonColor: "#570f00cc",
		overcastColor: "#000412cc",
		alphaDay: 0.6,
		alphaNight: 0.2,
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
		bloodMoon: {
			topColor: "#c7121200",
			midColor: "#c7121200",
			botColor: "#c7121240",
		},
		midPosition: 0.7,
		opacity: 1,
	},
	locationOverlay: {
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
		images: {
			rain: {
				path: "rain.png",
				frameCount: 8,
			},
			snow: {
				path: "snow.png",
				frameCount: 16,
			},
		},
		rain: {
			dayOpacity: 1,
			nightOpacity: 0.05,
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
		images: {
			rain: {
				path: "rain.png",
				frameCount: 8,
			},
			snow: {
				path: "snow_sparse.png",
				frameCount: 16,
			},
			mask: {
				path: "masks/transparency_mask.png",
			},
		},
		rain: {
			dayOpacity: 1,
			nightOpacity: 0.15,
			spriteOverlap: -16,
			startOffsetX: 0,
			verticalOffset: 0,
			fadePosition: 0.5,
			darken: 0.1,
			darkenColor: "#000412cc",
			fps: 6,
			scale: 0.7,
			maskAlpha: 1,
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
			scale: 0.7,
			maskAlpha: 0.9,
		},
		//alpha
		//offsets
	},
	location: {
		path: "img/misc/locations",
		imgPath: {
			normal: "img/misc/normal_apng/",
			winter: "img/misc/winter_apng/",
		},
		isSnow: () => Weather.isSnow,
		lightsOnTime: 18,
		lightsOffTime: 6,
	},
};
