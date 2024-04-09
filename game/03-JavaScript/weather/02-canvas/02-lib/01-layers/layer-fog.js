/* eslint-disable no-undef */
WeatherLayers.add({
	name: "fog",
	zIndex: 11,
	blur: false,
	effects: [
		{
			effect: "fog",
			drawCondition: () => Weather.fog > 0,
			params: {
				images: {
					fog: "img/misc/sky/clouds/fog/0.png",
				},
				movement: {
					speed: 0.4,
				},
				baseAlpha: 0.8,
			},
			bindings: {
				fogFactor() {
					return Weather.fog;
				},
				factor() {
					return 1 - interpolate(0, 1, normalise(Math.min(Weather.Sky.orbitals.sun.factor, 0), 0, -0.7));
				},
			},
		},
		{
			effect: "colorOverlay",
			drawCondition: () => !Weather.bloodMoon,
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#000412ee",
					nightBright: "#000412dd",
					day: "#97a9e8e5",
					dawnDusk: "#7a511895",
				},
			},
			bindings: {
				sunFactor() {
					return Weather.Sky.orbitals.sun.factor;
				},
				moonFactor() {
					return Weather.Sky.moonBrightnessFactor;
				},
			},
		},
	],
});
