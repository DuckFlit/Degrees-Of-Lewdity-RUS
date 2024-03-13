/* eslint-disable no-undef */
WeatherLayers.add({
	name: "moon",
	zIndex: 3, // zIndex value
	blur: {
		max: 3,
		factor: () => (!Weather.bloodMoon ? Weather.Sky.fadables.overcast.factor : 0),
	},
	effects: [
		{
			/* Regular moon */
			effect: "moonWithPhases",
			drawCondition: () => !Weather.bloodMoon && !Weather.Sky.skyDisabled,
			params: {
				opacity: {
					// Defines the opacity of the whole moon (including shadow part)
					// min is when dayfactor is -1 while max is when factor is +1
					min: 0.98,
					max: 0.25,
				},
				glow: {
					colorDay: "#ffffff00",
					colorNight: "#ffffffbb",
					size: 9,
				},
				shadow: {
					opacity: {
						// Defines if the opacity of the shadow part of the moon - if opacity is 0, the moon is completely invisible when not lit
						// min is when dayfactor is -1 while max is when factor is +1
						min: 0.04,
						max: 0.05,
					},
					// Angle of the moon shadow generation
					angle: 10,
				},
				images: { orbital: "img/misc/sky/moon.png" },
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.moon.position;
				},
				factor() {
					return Weather.Sky.orbitals.moon.factor;
				},
				dayFactor() {
					return Weather.Sky.orbitals.sun.factor;
				},
				moonPhaseFraction() {
					return Time.date.moonPhaseFraction;
				},
			},
		},
		{
			/* Blood moon */
			effect: "skyOrbital",
			drawCondition: () => Weather.bloodMoon && !Weather.Sky.skyDisabled,
			params: {
				images: { orbital: "img/misc/sky/blood-moon.png" },
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.bloodMoon.position;
				},
			},
		},
		{
			effect: "innerRadialGlow",
			drawCondition: () => Weather.bloodMoon && !Weather.Sky.skyDisabled,
			params: {
				innerRadius: 7,
				colorInside: { min: "#fd634d00", max: "#fd634d00" },
				colorOutside: { min: "#fd634d44", max: "#fd634d44" },
				factor: 1,
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.bloodMoon.position;
				},
				diameter() {
					return Weather.Sky.getLayer("moon").effects[1].images.orbital.width;
				},
			},
		},
		{
			effect: "outerRadialGlow",
			drawCondition: () => Weather.bloodMoon && !Weather.Sky.skyDisabled,
			params: {
				innerRadius: 3,
				outerRadius: 12, // The radius of the outer glow
				colorInside: { dark: "#ad3a2133", med: "#ad3a2133", bright: "#ad3a2133" },
				colorOutside: { dark: "#ad3a2100", med: "#ad3a2100", bright: "#ad3a2100" },
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.bloodMoon.position;
				},
				factor() {
					return Weather.Sky.orbitals.bloodMoon.factor;
				},
				diameter() {
					// Reference this layer and above effect image
					return Weather.Sky.getLayer("moon").effects[1].images.orbital.width;
				},
			},
		},
	],
});
