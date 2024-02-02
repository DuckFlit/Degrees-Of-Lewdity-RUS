/* eslint-disable no-undef */
WeatherLayers.add({
	name: "location",
	zIndex: 10, // zIndex value
	effects: [
		{
			effect: "locationImage",
			params: {
				path: "img/misc/locations",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					const seasonKey = Weather.isSnow ? "snow" : "normal";
					const bloodMoonKey = Weather.isSnow ? "snow_blood" : "normal_blood";

					return Weather.bloodMoon && setup.LocationImages[location][bloodMoonKey]
						? setup.LocationImages[location][bloodMoonKey]
						: setup.LocationImages[location][seasonKey];
				},
				onFrame() {
					return () => {
						WeatherCanvas.drawFrame("location", this.animation);
					};
				},
			},
		},
		{
			effect: "locationOverlay",
			compositeOperation: "source-atop",
			// drawCondition: () => WeatherCanvas.orbitals.sun.factor > -0.5,
			params: {
				color: {
					nightDark: "#00001ce6",
					nightBright: "#0d0d26b3",
					day: "#00000000",
					dawnDusk: "#4f3605cc",
					bloodMoon: "#38010199",
				},
			},
			bindings: {
				sunFactor() {
					return WeatherCanvas.orbitals.sun.factor;
				},
				moonFactor() {
					return WeatherCanvas.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
		{
			effect: "locationEmissive",
			drawCondition: () => {
				return (
					(Time.hour >= setup.WeatherCSettings.lightsTime.on || Time.hour < setup.WeatherCSettings.lightsTime.off) &&
					setup.LocationImages[setup.Locations.get()].emissive
				);
			},
			params: {
				path: "img/misc/locations",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					const bloodMoon = Weather.bloodMoon ? "emissive_blood" : "emissive";
					return setup.LocationImages[location][bloodMoon];
				},
				// Only applicable if animation is set to "parent"
				parent() {
					return WeatherCanvas.getLayer("location").effects[0];
				},
				// Only applicable if the emissive effect has its own animation
				onFrame() {
					return () => {
						WeatherCanvas.drawFrame("location", this.animation);
					};
				},
			},
		},
	],
});
