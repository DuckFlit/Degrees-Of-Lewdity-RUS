/* eslint-disable no-undef */

Weather.Sky = (() => {
	const imagesLoaded = new ObservableValue(false);
	let dayFactor = 0;

	const canvasElements = {
		sun: new SkyCanvasSun("sun"),
		moon: new SkyCanvasMoon("moon"),
		stars: new SkyCanvasStars("starfield"),
		overcast: new SkyCanvasOvercast("overcast"),
		cirrus: new SkyCanvasCirrus("cirrus"),
		clouds: new SkyCanvasCloudy("clouds"),
		fog: new SkyCanvasFog("fog"),
		precipitation: new SkyCanvasPrecipitation("precipitation"),
		backgroundPrecipitation: new SkyCanvasBackgroundPrecipitation("backgroundPrecipitation"),
	};

	const elements = {};
	let currentWeather = "";
	elements.skybox = $("<div />", { id: "skybox" });
	elements.skyboxGlow = $("<div />", { id: "skybox-sunGlow" }).appendTo(elements.skybox);
	elements.locationLayer = $("<div />", { id: "skybox-location" }).appendTo(elements.skybox);

	Promise.all(Object.values(canvasElements).map(element => element.loaded()))
		.then(() => {
			imagesLoaded.value = true;
			display(Time.date);
		})
		.catch(error => console.error("Error loading one or more images. Message: ", error));

	function getDayFactor() {
		const sunPositionYPercent =
			(canvasElements.sun.position.adjustedY - Weather.Settings.visuals.sun.orbit.path.horizon) /
			(Weather.Settings.visuals.sun.orbit.path.peakY - Weather.Settings.visuals.sun.orbit.path.horizon);
		if (sunPositionYPercent > 0) {
			dayFactor = 1 - Math.pow(1 - sunPositionYPercent, 6);
		} else {
			dayFactor = -(
				(canvasElements.sun.position.adjustedY - Weather.Settings.visuals.sun.orbit.path.horizon) /
				(canvasElements.sun.position.bottom.y - Weather.Settings.visuals.sun.orbit.path.horizon)
			);
		}
		T.dayFactor = dayFactor;
	}

	function updateSkyLighting() {
		const canvasSize = Weather.Settings.visuals.sky.canvasSize;
		const sunPosition = {
			x: (canvasElements.sun.position.adjustedX / canvasSize.x) * 100,
			y: (canvasElements.sun.position.adjustedY / canvasSize.y) * 100,
		};
		const moonPosition = {
			x: (canvasElements.moon.position.adjustedX / canvasSize.x) * 100,
			y: (canvasElements.moon.position.adjustedY / canvasSize.y) * 100,
		};
		let background = "";
		let glow = "";

		if (dayFactor > 0) {
			const colors = Weather.Settings.visuals.sky.colors;
			// Adds main sky radial lighting
			const color1 = ColourUtils.interpolateColor(colors.dawnDusk.sky1, colors.day.sky1, dayFactor);
			const color2 = ColourUtils.interpolateColor(colors.dawnDusk.sky2, colors.day.sky2, dayFactor);

			// Sun outer glow
			//todo add to canvas
			const glowColor1 = ColourUtils.interpolateColor(colors.dawnDusk.sunGlow, colors.day.sunGlow, dayFactor);
			const glowColor2 = "#ffffff00";

			glow = `radial-gradient(circle at ${sunPosition.x}% ${sunPosition.y}%, ${glowColor1} 5%, ${glowColor2} 40%)`;
			background = `radial-gradient(circle at ${sunPosition.x}% ${sunPosition.y}%, ${color1}, ${color2})`;
		} else {
			const nightFactor = 1 - Math.abs(dayFactor);
			const colors = Weather.Settings.visuals.sky.colors;
			const transparent = "#ffffff00";
			const color1 = ColourUtils.interpolateColor(colors.night.sky1, colors.dawnDusk.sky1, nightFactor);
			const color2 = ColourUtils.interpolateColor(colors.night.sky2, colors.dawnDusk.sky2, nightFactor);
			const color3 = ColourUtils.interpolateColor(transparent, colors.night.sky1, Math.abs(nightFactor - 1));
			const color4 = ColourUtils.interpolateColor(transparent, colors.night.sky2, Math.abs(nightFactor - 1));
			const gradient = `radial-gradient(circle at ${sunPosition.x}% ${sunPosition.y}%, ${color4}, ${color3})`;

			const glowColor1 = ColourUtils.interpolateColor(colors.night.sunGlow, colors.dawnDusk.sunGlow, nightFactor);
			const glowColor2 = "#ffffff00";

			glow = `radial-gradient(circle at ${sunPosition.x}% ${sunPosition.y}%, ${glowColor1} 5%, ${glowColor2} 40%)`;
			background = `${gradient}, radial-gradient(circle at ${sunPosition.x}% ${sunPosition.y}%, ${color1}, ${color2})`;
		}
		elements.skybox.css("background", background);
		elements.skyboxGlow.css("background", glow);
	}

	// Placeholder function - will be changed in a future update
	function updateLocationImage() {
		// todo --- Change to  if snow
		const seasonPath = Time.season === "winter" ? Weather.Settings.visuals.location.imgPath.winter : Weather.Settings.visuals.location.imgPath.normal;
		const dayState = Time.dayState;
		let imagePath = "";

		const location = !V.location ? "home" : V.location;
		switch (location) {
			case "adult_shop":
				getAdultShopState(); // Assuming getAdultShopState() updates the $adultshopstate
				if (Time.dayState === "day" && V.adultshopstate !== "closed") {
					imagePath = `${seasonPath}sex_shop_${dayState}_open.apng`;
				} else {
					imagePath = `${seasonPath}sex_shop_${dayState}.apng`;
				}
				break;
			case "alex_farm":
				imagePath = V.bus === "woodland" ? `${seasonPath}forest_${dayState}.apng` : `${seasonPath}/alex_farm_${dayState}.apng`;
				break;

			default:
				// Default case if $location doesn't match any of the cases
				imagePath = `${seasonPath}${location}_${dayState}.apng`;
		}
		elements.skybox.append($("<img>", { id: "location", src: imagePath }));
	}

	function updateSun(date) {
		canvasElements.sun.setOrbit(Time.getSecondsSinceMidnight(date));
		getDayFactor();
		console.log("DAY FACTOR??!?!", dayFactor);
		canvasElements.sun.draw(dayFactor);
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

	function updateWeather(date, instant) {
		canvasElements.overcast.updateWeather(date, instant);
		canvasElements.clouds.updateWeather(date, instant);
		canvasElements.cirrus.updateWeather(date, instant);
		canvasElements.overcast.draw(canvasElements.moon, dayFactor);
		canvasElements.clouds.draw(canvasElements.moon, dayFactor, canvasElements.overcast.overCastObj.fadeFactor);
		canvasElements.fog.draw(dayFactor);
		canvasElements.cirrus.draw(dayFactor);

		const activeClouds = canvasElements.clouds.activeClouds;
		canvasElements.precipitation.updateEffects(activeClouds, dayFactor);
		canvasElements.backgroundPrecipitation.updateEffects(dayFactor);
	}

	function redraw(date, instant = false) {
		if (imagesLoaded.value === true) {
			drawCanvas(date, instant);
			return;
		}
		imagesLoaded.subscribe(val => {
			if (!val) return;
			drawCanvas(date, instant);
		});
	}

	function drawCanvas(date, instant) {
		updateSun(date);
		updateSkyLighting();
		updateMoon(date);
		updateStarField(date);
		updateWeather(date, instant);
	}

	function display(date) {
		elements.skybox.append(canvasElements.sun.canvas);
		elements.skybox.append(canvasElements.moon.canvas);
		elements.skybox.append(canvasElements.stars.canvas);
		elements.skybox.append(canvasElements.overcast.canvas);
		elements.skybox.append(canvasElements.clouds.canvas);
		elements.skybox.append(canvasElements.fog.canvas);
		elements.skybox.append(canvasElements.cirrus.canvas);

		setMoonPhase(date);
		redraw(date, true);
		updateLocationImage();
		elements.skybox.append(canvasElements.precipitation.canvas);
		elements.skybox.append(canvasElements.backgroundPrecipitation.canvas);

		// City glow
		let glow = "";
		if (dayFactor < 0) {
			glow = `linear-gradient(#ffffff00 60%, ${Weather.Settings.visuals.sky.colors.cityLights})`;
		}
		elements.locationLayer.css("background", glow);
	}

	function setMoonPhase(date) {
		canvasElements.moon.updateCanvas(date.moonPhaseFraction);
	}

	function setWeather() {
		canvasElements.clouds.updateWeather(Weather.current);
	}

	return {
		get canvasElements() {
			return canvasElements;
		},
		get imagesLoaded() {
			return imagesLoaded.value;
		},
		set imagesLoaded(value) {
			imagesLoaded.value = value;
		},
		get enabled() {
			return enabled;
		},
		set enabled(value) {
			enabled = value;
		},
		get dayFactor() {
			return dayFactor;
		},
		updateSkyLighting,
		updateLocationImage,
		display,
		setMoonPhase,
		redraw,
		elements,
		setWeather,
	};
})();

Macro.add("skybox", {
	handler() {
		Weather.Sky.elements.skybox.appendTo(this.output);

		// const $locationOverlay = $("#locationOverlay");
		// const $canvas = $("<canvas/>", {
		// 	id: "skybox",
		// }).prop({
		// 	width: 64,
		// 	height: 192,
		// });
		if (Weather.Sky.imagesLoaded) {
			Weather.Sky.redraw(Time.date);
		}
	},
});
