/* eslint-disable no-undef */
WeatherLayers.add({
	name: "location",
	zIndex: 9,
	// blur: {
	// 	max: 2,
	// 	factor: () => Weather.Sky.fadables.overcast.factor,
	// },
	blur: 1.5,
	effects: [
		{
			effect: "locationImage",
			params: {
				path: "img/misc/locations",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
				key() {
					const location = setup.Locations.get();
					const seasonKey = Weather.isSnow && setup.LocationImages[location].snow ? "snow" : "base";
					const bloodMoonKey = Weather.isSnow && setup.LocationImages[location].bloodmoon_snow ? "bloodmoon_snow" : "bloodmoon";
					return Weather.bloodMoon && setup.LocationImages[location][bloodMoonKey] ? bloodMoonKey : seasonKey;
				},
				otherEffects() {
					return Weather.Sky.getLayer("location").effects[2];
				},
				onFrame() {
					return () => {
						Weather.Sky.drawLayers("location");
					};
				},
			},
		},
		{
			effect: "colorOverlay",
			compositeOperation: "source-atop",
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
		{
			effect: "locationEmissive",
			drawCondition: () => {
				return setup.LocationImages[setup.Locations.get()].emissive || setup.LocationImages[setup.Locations.get()].emissive_blood;
			},
			params: {
				path: "img/misc/locations",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
				key() {
					return Weather.bloodMoon ? "emissive_blood" : "emissive";
				},
				// Only applicable if animation is set to "parent"
				otherEffects() {
					return Weather.Sky.getLayer("location").effects[0];
				},
				// Only applicable if the emissive effect has its own animation
				onFrame() {
					return () => {
						Weather.Sky.drawLayers("location");
					};
				},
			},
		},
	],
});

WeatherLayers.add({
	name: "horizonGlow",
	zIndex: 8,
	effects: [
		// City glow
		{
			effect: "gradiantGlow",
			drawCondition: () => {
				if (Weather.bloodMoon || !(Time.hour >= setup.SkySettings.lightsTime.on || Time.hour < setup.SkySettings.lightsTime.off)) {
					return false;
				}
				// Placeholder
				const locations = [
					"alley",
					"brothel",
					"canal",
					"compound",
					"dance_studio",
					"dilapitaded_shop",
					"estate",
					"factory",
					"home",
					"hospital",
					"kylar_manor",
					"landfill",
					"market",
					"museum",
					"office",
					"park",
					"police_station",
					"pool",
					"pub",
					"school",
					"sewers",
					"shopping_centre",
					"spa",
					"studio",
					"strip_club",
					"temple",
					"town",
				];
				return locations.includes(V.location);
			},
			params: {
				color: {
					glow: "#c9ba76d0",
					dark: "#c9ba7600",
				},
			},
		},
		// Blood moon glow
		{
			effect: "gradiantGlow",
			drawCondition: () => (Time.hour >= setup.SkySettings.lightsTime.on || Time.hour < setup.SkySettings.lightsTime.off) && Weather.bloodMoon,
			params: {
				color: {
					glow: "#eb3b2fee",
					dark: "#eb3b2f00",
				},
			},
		},
	],
});
