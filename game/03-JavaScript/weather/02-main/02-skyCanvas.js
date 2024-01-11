/* eslint-disable no-undef */

Weather.Sky = (() => {
	const imagesLoaded = new ObservableValue(false);
	let dayFactor = 0;

	const canvasLayers = {
		sun: new SkyCanvasSun("sun"),
		moon: new SkyCanvasMoon("moon"),
		stars: new SkyCanvasStars("starfield"),
		overcast: new SkyCanvasOvercast("overcast"),
		cirrus: new SkyCanvasCirrus("cirrus"),
		clouds: new SkyCanvasCloudy("clouds"),
		fog: new SkyCanvasFog("fog"),
		sky: new SkyCanvasSky("skyBackground"),
		sunGlow: new SkyCanvasSunGlow("sunGlow"),
		moonGlow: new SkyCanvasMoonGlow("moonGlow"),
		precipitation: new SkyCanvasPrecipitation("precipitation"),
		backgroundPrecipitation: new SkyCanvasBackgroundPrecipitation("backgroundPrecipitation"),
	};

	const elements = {};
	elements.skybox = $("<div />", { id: "canvasSkybox" });
	elements.locationLayer = $("<div />", { id: "skybox-location" }).appendTo(elements.skybox);

	Promise.all(Object.values(canvasLayers).map(element => element.loaded()))
		.then(() => {
			imagesLoaded.value = true;
			display(Time.date);
		})
		.catch(error => console.error("Error loading one or more images. Message: ", error));

	function getDayFactor() {
		const sunPositionYPercent =
			(canvasLayers.sun.position.adjustedY - canvasLayers.sun.orbit.path.horizon) /
			(canvasLayers.sun.orbit.path.peakY - canvasLayers.sun.orbit.path.horizon);
		if (sunPositionYPercent > 0) {
			dayFactor = 1 - Math.pow(1 - sunPositionYPercent, 6);
		} else {
			dayFactor = -(
				(canvasLayers.sun.position.adjustedY - canvasLayers.sun.orbit.path.horizon) /
				(canvasLayers.sun.position.bottom.y - canvasLayers.sun.orbit.path.horizon)
			);
		}
		T.dayFactor = dayFactor;
	}

	// Placeholder function - will be changed in a future update
	function updateLocationImage() {
		const seasonPath = Weather.SkySettings.location.isSnow() ? Weather.SkySettings.location.imgPath.winter : Weather.SkySettings.location.imgPath.normal;
		const dayState = "_" + Time.dayState;
		const dayStateBloodMoon = Weather.bloodMoon || V.forcedBloodmoon ? "_bloodmoon" : dayState;
		let imagePath = "";

		const location = !V.location ? "home" : V.location;
		switch (location) {
			case "adult_shop":
				getAdultShopState();
				if (Time.dayState === "day" && V.adultshopstate !== "closed") {
					imagePath = `${seasonPath}sex_shop${dayState}_open.apng`;
				} else {
					imagePath = `${seasonPath}sex_shop${dayState}.apng`;
				}
				break;
			case "alex_farm":
				imagePath = V.bus === "woodland" ? `${seasonPath}forest${dayStateBloodMoon}.apng` : `${seasonPath}/alex_farm${dayState}.apng`;
				break;
			case "alley":
				imagePath =
					V.bus === "industrial"
						? `${seasonPath}indust_alley${dayStateBloodMoon}.apng`
						: V.bus === "residential"
						? `${seasonPath}/resi_alley${dayStateBloodMoon}.apng`
						: `${seasonPath}/alley${dayStateBloodMoon}.apng`;
				break;
			case "asylum":
				imagePath = V.hallucinations >= 1 ? `${seasonPath}asylum${dayState}vfast.apng` : `${seasonPath}asylum${dayState}slow.apng`;
				break;
			case "cafe":
				imagePath =
					V.chef_state >= 9
						? `${seasonPath}cafe_renovated${dayState}.apng`
						: V.chef_state >= 9
						? `${seasonPath}cafe_construction${dayState}.apng`
						: `${seasonPath}cafe${dayState}.apng`;
				break;
			case "chalets":
				imagePath = `${seasonPath}beach${dayState}.apng`;
				break;
			case "bog":
				imagePath = `${seasonPath}bog${dayStateBloodMoon}.apng`;
				break;
			case "drain":
				imagePath = `${seasonPath}drain.apng`;
				break;
			case "forest":
				imagePath = `${seasonPath}forest${dayStateBloodMoon}.apng`;
				break;
			case "home":
				imagePath = `${seasonPath}home${dayStateBloodMoon}.apng`;
				break;
			case "lake":
				imagePath = `${seasonPath}lake${dayStateBloodMoon}.apng`;
				break;
			case "lake_ruin":
				imagePath = `${seasonPath}lake_ruin${dayStateBloodMoon}.apng`;
				break;
			case "mines":
				imagePath = `${seasonPath}underground${dayState}.apng`;
				break;
			case "prison":
				imagePath = `${seasonPath}prison${dayStateBloodMoon}.apng`;
				break;
			case "temple":
				imagePath = Time.year <= 1000 ? `${seasonPath}temple${dayState}_old.apng` : `${seasonPath}temple${dayState}.apng`;
				break;
			case "tower":
			case "castle":
				imagePath = `${seasonPath}tower${dayStateBloodMoon}.apng`;
				break;
			default:
				imagePath = `${seasonPath}${location}${dayState}.apng`;
		}
		const image = elements.skybox.find("#location");
		const newImage = $("<img>", { id: "location", src: imagePath });
		if (image.length) {
			image.replaceWith(newImage);
		} else {
			elements.skybox.append(newImage);
		}
	}

	// For later
	//
	// function updateLocationImage() {
	// 	const path = Weather.SkySettings.location.path;

	// 	const locationImages = location => {
	// 		switch (location) {
	// 			case "alex_cottage":
	// 				return "alex_cottage";
	// 			case "alex_farm":
	// 				return V.bus === "woodland" ? "forest" : "alex_farm";
	// 			case "home":
	// 				return "home";
	// 			case "town":
	// 				return "town";
	// 			case "forest":
	// 				return "forest";
	// 			default:
	// 				return "home";
	// 		}
	// 	};

	// 	const location = locationImages(!V.location ? "home" : V.location);
	// 	canvasLayers.locationOverlay.draw(dayFactor);
	// 	// Is snow?

	// 	//elements.skybox.append($("<img>", { id: "location", src: imagePath }));
	// }

	function updateSun(date) {
		canvasLayers.sun.setOrbit(Time.getSecondsSinceMidnight(date));
		getDayFactor();
	}

	function updateMoon(date) {
		canvasLayers.moon.setOrbit(Time.getSecondsSinceMidnight(date));
	}

	function updateStarField(date) {
		const rotation = date.fractionOfDay * 360;
		canvasLayers.stars.updateRotation(rotation);
	}

	function updateWeather(date, instant) {
		canvasLayers.overcast.updateWeather(date, instant);
		canvasLayers.clouds.updateWeather(date, instant);
		canvasLayers.cirrus.updateWeather(date, instant);
		canvasLayers.precipitation.updateEffects(canvasLayers.clouds.clouds, dayFactor);
		canvasLayers.backgroundPrecipitation.updateEffects(dayFactor);

		// Set moon and stars blur effect
		canvasLayers.moon.blurFactor = canvasLayers.overcast.overCastObj.fadeFactor;
		canvasLayers.stars.blurFactor = canvasLayers.overcast.overCastObj.fadeFactor;
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

	function updateTooltip() {
		elements.skybox.tooltip({
			//title: "Weather",
			message: "The weather is nice",
			delay: 150,
			position: "cursor",
		});
	}

	function drawCanvas(date, instant) {
		updateSun(date);
		updateMoon(date);
		updateStarField(date);
		updateWeather(date, instant);

		canvasLayers.sun.draw(dayFactor);
		canvasLayers.moon.draw(dayFactor);
		canvasLayers.sky.draw(canvasLayers.sun, canvasLayers.moon, dayFactor);
		canvasLayers.sunGlow.draw(canvasLayers.sun, dayFactor);
		canvasLayers.moonGlow.draw(canvasLayers.moon, dayFactor);
		canvasLayers.stars.draw(canvasLayers.moon, dayFactor);
		canvasLayers.overcast.draw(canvasLayers.moon, dayFactor);
		canvasLayers.clouds.draw(canvasLayers.moon, dayFactor, canvasLayers.overcast.overCastObj.fadeFactor);
		canvasLayers.fog.draw(dayFactor);
		canvasLayers.cirrus.draw(dayFactor);

		updateTooltip();
	}

	function display(date) {
		Object.keys(canvasLayers).forEach(elementKey => {
			elements.skybox.append(canvasLayers[elementKey].canvas);
		});

		setMoonPhase(date);
		redraw(date, true);
		updateLocationImage();

		// City glow
		// let glow = "";
		// if (dayFactor < 0) {
		// 	glow = `linear-gradient(#ffffff00 60%, ${Weather.SkySettings.skyBackground.colors.cityLights})`;
		// }
		//elements.locationLayer.css("background", glow);
	}

	function setMoonPhase(date) {
		canvasLayers.moon.updateCanvas(date.moonPhaseFraction);
	}

	return {
		get canvasLayers() {
			return canvasLayers;
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
		updateLocationImage,
		display,
		setMoonPhase,
		redraw,
		elements,
	};
})();

Macro.add("skybox", {
	handler() {
		Weather.Sky.elements.skybox.appendTo(this.output);
		if (Weather.Sky.imagesLoaded) {
			Weather.Sky.redraw(Time.date);
			Weather.Sky.updateLocationImage();
		}
	},
});
