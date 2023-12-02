/* eslint-disable no-undef */
Weather.Sky = (() => {
	const settings = {
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
				dawnDuskColor: "#f7ff4acc",
			},
			orbit: {
				riseTime: 6,
				setTime: 18,
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
				colorRange: ["#ae9ff5", "#bc91e6", "#7db9e3", "#ffffff"],
				// Sets the chance of which stars to spawn - The weight (second number) determines the chance based on the other weights
				spriteChance: [
					//Change to Map()
					[0, 10], // Chance of square non-sprite 2x2 stars
					["star_0.png", 0.8],
					["star_1.png", 0.3],
					["star_2.png", 0.15],
					["star_3.png", 0.02],
				],
				opacity: {
					night: 0.75,
					day: 0,
				},
				glowColor: "#ffffff6a",
			},
		},
		weather: {
			dimensions: {
				width: 64, // Size of the canvas
				height: 192,
			},
			behaviors: {
				clear: {
					count: {
						small: () => random(0, 2),
						large: () => 0,
					},
				},
				lightClouds: {
					count: {
						small: () => random(2, 3),
						large: () => random(0, 1),
					},
				},
				heavyClouds: {
					count: {
						small: () => 0,
						large: () => random(3, 3),
					},
				},
				lightPrecipitation: {
					count: {
						small: () => 0,
						large: () => random(3, 3),
					},
				},
				heavyPrecipitation: {
					count: {
						small: () => 0,
						large: () => random(3, 3),
					},
				},
			},
			clouds: {
				maxHeight: 15,
				minHeight: 128,
				movement: {
					speedMin: 0.3, // Pixels per minute of game time
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
				]),
			},
		},
		location: {
			imgPath: {
				normal: "img/misc/normal_apng/",
				winter: "img/misc/winter_apng/",
			},
		},
	};
	let dayFactor = 0;
	let imagesLoaded = false;
	const elements = {};

	const canvasElements = {
		sun: new SkyCanvasSun("sun", settings.sun),
		moon: new SkyCanvasMoon("moon", settings.moon),
		stars: new SkyCanvasStars("starField", settings.starfield),
		clouds: new SkyCanvasWeather("clouds", settings.weather),
	};

	function getDayFactor() {
		const sunPositionYPercent =
			(canvasElements.sun.position.adjustedY - settings.sun.orbit.path.horizon) / (settings.sun.orbit.path.peakY - settings.sun.orbit.path.horizon);
		if (sunPositionYPercent > 0) {
			dayFactor = 1 - Math.pow(1 - sunPositionYPercent, 6);
		} else {
			dayFactor = -(
				(canvasElements.sun.position.adjustedY - settings.sun.orbit.path.horizon) /
				(canvasElements.sun.position.bottom.y - settings.sun.orbit.path.horizon)
			);
		}
	}

	function updateSkyLighting() {
		const canvasSize = settings.sky.canvasSize;
		const positionX = (canvasElements.sun.position.adjustedX / canvasSize.x) * 100;
		const positionY = (canvasElements.sun.position.adjustedY / canvasSize.y) * 100;
		let background = "";
		let glow = "";

		if (dayFactor > 0) {
			const colors = settings.sky.colors;
			// Adds main sky radial lighting
			const color1 = ColourUtils.interpolateColor(colors.dawnDusk.sky1, colors.day.sky1, dayFactor);
			const color2 = ColourUtils.interpolateColor(colors.dawnDusk.sky2, colors.day.sky2, dayFactor);

			// Sun outer glow
			//todo add to canvas
			const glowColor1 = ColourUtils.interpolateColor(colors.dawnDusk.sunGlow, colors.day.sunGlow, dayFactor);
			const glowColor2 = "#ffffff00";

			glow = `radial-gradient(circle at ${positionX}% ${positionY}%, ${glowColor1} 5%, ${glowColor2} 40%)`;
			background = `radial-gradient(circle at ${positionX}% ${positionY}%, ${color1}, ${color2})`;
		} else {
			const nightFactor = 1 - Math.abs(dayFactor);
			const colors = settings.sky.colors;
			const transparent = "#ffffff00";
			const color1 = ColourUtils.interpolateColor(colors.night.sky1, colors.dawnDusk.sky1, nightFactor);
			const color2 = ColourUtils.interpolateColor(colors.night.sky2, colors.dawnDusk.sky2, nightFactor);
			const color3 = ColourUtils.interpolateColor(transparent, colors.night.sky1, Math.abs(nightFactor - 1));
			const color4 = ColourUtils.interpolateColor(transparent, colors.night.sky2, Math.abs(nightFactor - 1));
			const gradient = `radial-gradient(circle at ${positionX}% ${positionY}%, ${color4}, ${color3})`;

			const glowColor1 = ColourUtils.interpolateColor(colors.night.sunGlow, colors.dawnDusk.sunGlow, nightFactor);
			const glowColor2 = "#ffffff00";

			glow = `radial-gradient(circle at ${positionX}% ${positionY}%, ${glowColor1} 5%, ${glowColor2} 40%)`;
			background = `${gradient}, radial-gradient(circle at ${positionX}% ${positionY}%, ${color1}, ${color2})`;
		}
		elements.skybox.css("background", background);
		elements.skyboxGlow.css("background", glow);
	}

	function updateLocationImage() {
		// todo --- Change to  if snow
		const seasonPath = Time.season === "winter" ? settings.location.imgPath.winter : settings.location.imgPath.normal;
		const dayState = Time.dayState;
		let imagePath = "";

		switch (V.location) {
			case "adult_shop":
				getAdultShopState(); // Assuming getAdultShopState() updates the $adultshopstate
				if (Time.dayState === "day" && $adultshopstate !== "closed") {
					imagePath = `${seasonPath}sex_shop_${dayState}_open.apng`;
				} else {
					imagePath = `${seasonPath}sex_shop_${dayState}.apng`;
				}
				break;
			case "alex_farm":
				imagePath = $bus === "woodland" ? `${seasonPath}forest_${dayState}.apng` : `${seasonPath}/alex_farm_${dayState}.apng`;
				break;

			default:
				// Default case if $location doesn't match any of the cases
				imagePath = `${seasonPath}${V.location}_${dayState}.apng`;
		}
		elements.skybox.append($("<img>", { id: "location", src: imagePath }));
	}

	function updateSun(date) {
		canvasElements.sun.setOrbit(Time.getSecondsSinceMidnight(date));
		getDayFactor();
		canvasElements.sun.draw();
	}

	function updateMoon(date) {
		canvasElements.moon.setOrbit(Time.getSecondsSinceMidnight(date));
		canvasElements.moon.draw(dayFactor);
	}

	function updateStarField(date) {
		const rotation = date.fractionOfDay * 360;
		canvasElements.stars.updateRotation(rotation);
		canvasElements.stars.draw(canvasElements.moon, dayFactor);
	}

	function updateWeather(date) {
		canvasElements.clouds.updateWeather(Weather.currentWeatherType);
		canvasElements.clouds.draw(date);
	}

	function redraw(date) {
		updateSun(date);
		updateSkyLighting();
		updateMoon(date);
		updateStarField(date);
		updateWeather(date);
	}

	function display(date) {
		elements.skybox.append(canvasElements.sun.canvas);
		elements.skybox.append(canvasElements.moon.canvas);
		elements.skybox.append(canvasElements.stars.canvas);
		elements.skybox.append(canvasElements.clouds.canvas);

		setMoonPhase(date);
		canvasElements.clouds.updateWeather(Weather.currentWeatherType, true);
		redraw(date);

		updateLocationImage();

		// City glow
		let glow = "";
		if (dayFactor < 0) {
			glow = `linear-gradient(#ffffff00 60%, ${settings.sky.colors.cityLights})`;
		}
		elements.locationLayer.css("background", glow);
	}

	function setMoonPhase(date) {
		canvasElements.moon.updateCanvas(date.moonPhaseFraction);
	}

	function setWeather() {
		canvasElements.clouds.updateWeather(Weather.currentWeatherType);
	}

	return {
		settings,
		get canvasElements() {
			return canvasElements;
		},
		get imagesLoaded() {
			return imagesLoaded;
		},
		set imagesLoaded(value) {
			imagesLoaded = value;
		},
		updateSkyLighting,
		updateLocationImage,
		dayFactor,
		display,
		setMoonPhase,
		redraw,
		elements,
		setWeather,
	};
})();

Macro.add("skybox", {
	handler() {
		if (!Weather.Sky.imagesLoaded) {
			Weather.Sky.elements.skybox = $("<div />", { id: "skybox" }).appendTo(this.output);
			Weather.Sky.elements.skyboxGlow = $("<div />", { id: "skybox-sunGlow" }).appendTo(Weather.Sky.elements.skybox);
			Weather.Sky.elements.locationLayer = $("<div />", { id: "skybox-location" }).appendTo(Weather.Sky.elements.skybox);
		}
		Weather.Sky.elements.skybox.appendTo(this.output);
		const date = Time.date;
		// const $locationOverlay = $("#locationOverlay");
		// const $canvas = $("<canvas/>", {
		// 	id: "skybox",
		// }).prop({
		// 	width: 64,
		// 	height: 192,
		// });
		if (Weather.Sky.imagesLoaded) {
			Weather.Sky.redraw(date);
			return;
		}

		Promise.all(Object.values(Weather.Sky.canvasElements).map(element => element.loaded()))
			.then(() => {
				console.log("LOADED");
				Weather.Sky.imagesLoaded = true;
				Weather.Sky.display(date);
			})
			.catch(error => console.error("Error loading one or more images. Message: ", error));
	},
});
