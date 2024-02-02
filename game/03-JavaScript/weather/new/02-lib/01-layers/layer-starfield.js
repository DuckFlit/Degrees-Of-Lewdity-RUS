/* eslint-disable no-undef */
WeatherLayers.add({
	name: "starField",
	zIndex: 1, // zIndex value
	effects: [
		{
			effect: "skyStarField",
			drawCondition: () => false, //WeatherCanvas.orbitals.sun.factor > -0.5,
			params: {
				canvasArea: {
					width: 256,
					height: 256,
				},
				starsConfig: {
					minDistance: 12, // Min distance between stars in pixels
					count: 100,
					colorRange: ["#ae9ff5", "#bc91e6", "#7db9e3", "#ffffff"],
				},
				rotationClockwise: true, // Set false for anti-clockwise
				// dimensions: {
				// 	width: 256, // Size of the generated starfield - should be square
				// 	height: 256,
				// },
				// imgPath: "img/misc/sky/stars/",
				// pivot: { x: 64, y: 128 }, // At which coordinates the starfield rotates around
				// rotation: {
				// },
				// stars: {
				// 	count: 100, // Number of stars in the whole canvas (The actual visible stars in the area is less than 20%, since it rotates around a pivot)
				// 	colorRange: ["#ae9ff5", "#bc91e6", "#7db9e3", "#ffffff"],
				// 	// Sets the chance of which stars to spawn - The weight (second number) determines the chance based on the other weights
				// 	spriteChance: [
				// 		//Change to Map()
				// 		[0, 10], // Chance of square non-sprite 2x2 stars
				// 		["star_0.png", 0.7],
				// 		["star_1.png", 0.2],
				// 		["star_2.png", 0.1],
				// 		["star_3.png", 0.02],
				// 		["star_4.png", 0.02],
				// 	],
				// 	opacity: {
				// 		night: 0.75,
				// 		day: 0,
				// 		bloodMoon: 0.25,
				// 	},
				// 	glowColor: "#ffffff6a",
				// },
				spriteWeights: {
					square: 10, // Chance of square non-sprite 2x2 stars
					star0: 0.7,
					star1: 0.2,
					star2: 0.1,
					star3: 0.02,
					star4: 0.02,
				},
				images: {
					star0: "img/misc/sky/stars/star_0.png",
					star1: "img/misc/sky/stars/star_1.png",
					star2: "img/misc/sky/stars/star_2.png",
					star3: "img/misc/sky/stars/star_3.png",
					star4: "img/misc/sky/stars/star_4.png",
				},
			},
			bindings: {
				rotation() {
					return Time.date.fractionOfDay * 360;
				},
			},
		},
	],
});
