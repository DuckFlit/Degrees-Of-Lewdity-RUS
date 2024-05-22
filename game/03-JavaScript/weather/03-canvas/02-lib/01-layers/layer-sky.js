/* eslint-disable no-undef */
Weather.Sky.Layers.add({
	name: "sky",
	zIndex: 0,
	effects: [
		{
			/* Night sky */
			effect: "skyGradiant",
			drawCondition: () => !Weather.bloodMoon && !Weather.Sky.skyDisabled,
			params: {
				radius: 82,
			},
			bindings: {
				color() {
					// Make it brighter when moon is lit
					const colorCloseMin = ColourUtils.interpolateColor("#00001c00", "#1c1c6100", Weather.Sky.moonBrightnessFactor);
					const colorClose = ColourUtils.interpolateColor("#00001c", "#1c1c61", Weather.Sky.moonBrightnessFactor);
					return {
						colorMin: { close: colorCloseMin, far: "#00001c00" },
						colorMed: { close: colorClose, far: "#00001c" },
						colorMax: { close: colorClose, far: "#00001c" },
					};
				},
				position() {
					return Weather.Sky.orbitals.moon.position;
				},
				factor() {
					return Weather.Sky.orbitals.moon.factor;
				},
			},
		},
		{
			/* Blood sky */
			effect: "skyGradiant",
			drawCondition: () => Weather.bloodMoon && !Weather.Sky.skyDisabled,
			params: {
				color: {
					colorMin: { close: "#4d000000", far: "#21070700" },
					colorMed: { close: "#4d0000", far: "#210707" },
					colorMax: { close: "#4d0000", far: "#210707" },
				},
				radius: 82,
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.bloodMoon.position;
				},
				factor() {
					return Weather.Sky.orbitals.bloodMoon.factor;
				},
			},
		},
		{
			/* Day sky */
			effect: "skyGradiant",
			drawCondition: () => !Weather.Sky.skyDisabled,
			params: {
				color: {
					colorMin: { close: "#14145200", far: "#00001c00" },
					colorMed: { close: "#d47d12", far: "#6c6d94" },
					colorMax: { close: "#d4d7ff", far: "#4692d4" },
				},
				radius: 128,
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.sun.position;
				},
				factor() {
					return Weather.Sky.orbitals.sun.factor;
				},
			},
		},
		{
			/* Tentacle sky */
			effect: "gradiantGlow",
			drawCondition: () => V.location === "tentworld",
			params: {
				fadeStartY: 192,
				color: {
					glow: "#300c36",
					dark: "#631582",
				},
			},
		},
	],
});
