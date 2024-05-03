/* eslint-disable no-undef */
Weather.Sky.Layers.add({
	name: "fog",
	zIndex: 11,
	blur: false,
	effects: [
		{
			effect: "fog",
			drawCondition: () => !Weather.Sky.skyDisabled,
			params: {
				images: {
					fog: "img/misc/sky/clouds/fog/0.png",
				},
				movement: {
					speed: 0.4,
				},
				baseAlpha: 0.9,
			},
			bindings: {
				fogFactor() {
					return Weather.fog;
				},
				weather() {
					return Weather.current;
				},
			},
		},
		{
			effect: "colorOverlay",
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#000412ee",
					nightBright: "#000412dd",
					day: "#97a9e8e5",
					dawnDusk: "#7a511895",
					bloodMoon: "#4a0505ee",
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
	],
});
