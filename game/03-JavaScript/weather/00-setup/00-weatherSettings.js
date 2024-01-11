/*
All colors use a hex-value with an added alpha
The alpha use the 2 last characters of a 8-character hex-value and range from 0-255 (00-ff)

*/
setup.WeatherSettings = {
	months: [
		{
			// Jan
			temperatureRange: [-8, 7],
			sunIntensity: 0.1, // Modifies tanning changes from sun exposure
		},
		{
			// Feb
			temperatureRange: [-5, 9],
			sunIntensity: 0.2,
		},
		{
			// Mar
			temperatureRange: [4, 12],
			sunIntensity: 0.3,
		},
		{
			// Apr
			temperatureRange: [6, 16],
			sunIntensity: 0.5,
		},
		{
			// May
			temperatureRange: [9, 18],
			sunIntensity: 0.7,
		},
		{
			// Jun
			temperatureRange: [12, 21],
			sunIntensity: 1,
		},
		{
			// Jul
			temperatureRange: [14, 24],
			sunIntensity: 1,
		},
		{
			// Aug
			temperatureRange: [14, 22],
			sunIntensity: 0.8,
		},
		{
			// Sep
			temperatureRange: [11, 20],
			sunIntensity: 0.7,
		},
		{
			// Oct
			temperatureRange: [9, 16],
			sunIntensity: 0.5,
		},
		{
			// Nov
			temperatureRange: [-1, 10],
			sunIntensity: 0.3,
		},
		{
			// Dec
			temperatureRange: [-4, 7],
			sunIntensity: 0.1,
		},
	],
	weatherTypes: [
		{
			name: "clear",
			value: 0,
			probability: {
				summer: 0.7,
				winter: 0.3,
				spring: 0.5,
				autumn: 0.4,
			},
			cloudCount: {
				// Visual only
				small: () => random(0, 2),
				large: () => 0,
			},
			cirrus: 2,
			temperatureModifier: 2,
			tanningModifier: 1,
			overcast: () => 0,
			precipitationIntensity: 0,
			visibility: 1,
		},
		{
			name: "lightClouds",
			value: 1,
			probability: {
				summer: 0.5,
				winter: 0.4,
				spring: 0.5,
				autumn: 0.4,
			},
			cloudCount: {
				small: () => random(1, 2),
				large: () => random(0, 1),
			},
			cirrus: 2,
			temperatureModifier: 1.5,
			tanningModifier: 0.5,
			overcast: () => randomFloat(0, 0.3),
			precipitationIntensity: 0,
			visibility: 1,
		},
		{
			name: "heavyClouds",
			value: 2,
			probability: {
				summer: 0.1,
				winter: 0.4,
				spring: 0.2,
				autumn: 0.3,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(0, 4),
			},
			temperatureModifier: 1.2,
			tanningModifier: 0.2,
			overcast: () => randomFloat(0.7, 1),
			precipitationIntensity: 0,
			visibility: 0.8,
		},
		{
			name: "lightPrecipitation",
			value: 3,
			probability: {
				summer: 0.05,
				winter: 0.1,
				spring: 0.05,
				autumn: 0.15,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(1, 4),
			},
			temperatureModifier: 1,
			tanningModifier: 0.2,
			overcast: () => randomFloat(0.9, 1),
			precipitationIntensity: 1,
			visibility: 0.7,
		},
		{
			name: "heavyPrecipitation",
			value: 4,
			probability: {
				summer: 0.05,
				winter: 0.1,
				spring: 0.05,
				autumn: 0.1,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(2, 4),
			},
			temperatureModifier: 1,
			tanningModifier: 0.1,
			overcast: () => 1,
			precipitationIntensity: 2,
			visibility: 0.4,
		},
		{
			name: "thunderstorm",
			value: 4,
			probability: {
				summer: 0.02,
				winter: 0.005,
				spring: 0.015,
				autumn: 0.01,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(3, 4),
			},
			temperatureModifier: 1,
			tanningModifier: 0,
			overcast: () => 1,
			precipitationIntensity: 3,
			visibility: 0.3,
		},
	],
	forecast: {
		daysToGenerate: 20,
		minKeyPointsPerDay: 1,
		maxKeyPointsPerDay: 3,
		minTimeApartKeyPoints: 140, // Minimum time between each keypoint, in minutes
	},
};
