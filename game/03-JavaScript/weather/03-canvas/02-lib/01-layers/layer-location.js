Weather.Sky.Layers.add({
	name: "location",
	zIndex: 9,
	animation: {
		updateRate: 50, // Updates every 50ms
	},
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
					return "base";
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
				return setup.LocationImages[setup.Locations.get()].emissive;
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
					return "emissive";
				},
			},
		},
		// {
		// 	effect: "locationReflective",
		// 	drawCondition: () => {
		// 		return false;//!!setup.LocationImages[setup.Locations.get()].reflective;
		// 	},
		// 	params: {
		// 		path: "img/misc/locations",
		// 	},
		// 	bindings: {
		// 		location() {
		// 			const location = setup.Locations.get();
		// 			return setup.LocationImages[location];
		// 		},
		// 		key() {
		// 			return "reflective";
		// 		},
		// 	},
		// },
	],
});

Weather.Sky.Layers.add({
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
