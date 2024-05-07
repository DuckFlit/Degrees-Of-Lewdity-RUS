/**
 * Temperature Explanation:
 * 	Temperature calculations work by setting a number of key-points per month.
 * 	Key-points represent specific days where the temperature is defined, and temperatures for other days are interpolated between these points.
 * 	The number of key-points is selected randomly within a specified range set below in 'months'.
 *
 * Weather Explanation:
 *	Determines the current weather condition based on a series of key-points, similar to temperature.
 *	Instead of several key points per month - it instead uses 1 to several key points per day. (set in settings below)
 *	This leads to a more realistic weather pattern. It interpolates between weather types realistically (e.g. to go from clear to heavy rain - it must first be cloudy)
 *  Every season has its own probability for each weather type, set in weatherTypes, below.
 *
 * Explanation for each variable will follow, once per variable type.
 */
setup.WeatherSettings = {
	snow: {
		minAccumulation: 15, // Min 15 mm for it to be considered snow on the ground
		maxAccumulation: 500, // max 500 mm of accumulated snow on the ground
		snowfallRate: 0.8, // mm per minute while snowing (snowfallRate * precipitationIntensity)
		meltingRate: 0.04, // base mm per minute when above freezing (meltingRate * temperature)
	},
	ice: {
		minThickness: {
			lake: 40, // min 40 mm for it to be considered walkable
			fountain: 5,
		},
		maxThickness: {
			lake: 450, // max 500 mm of accumulated ice on the lake
			fountain: 50,
		},
		freezingRate: 0.3, // mm per minute while freezing (freezingRate * temperature)
		meltingRate: 0.03, // base mm per minute when above freezing (meltingRate * temperature)
	},
	forecast: {
		weather: {
			/* Will generate random number of key points between the min and max value */
			daysToGenerate: 20, // How many days of forecast to generate ahead of the current day. Do not set too low or it will generate new key points too often.
			minTimeApartKeyPoints: 140, // Minimum time between each keypoint, in minutes
			minKeyPointsPerDay: 1, // Mininum number of key points per day. Must be at least 1
			maxKeyPointsPerDay: 3, // Maximum number of key points per day.
		},
		temperature: {
			// Generates at least 1 month ahead, dynamically
			minTimeApartKeyPoints: 3, // Minimum time between each keypoint, in days
			minKeyPointsPerMonth: 4, // Minimum number of key points per month. Must be at least 1
			maxKeyPointsPerMonth: 6, // Maximum number of key points per month.
		},
	},
	temperature: {
		// Body temperature
		/* Be careful when modifying the factors, as small changes can have big effects */
		// General
		baseBodyTemperature: 37, // The normal body temperature in degrees Celsius.
		minTemperature: 33, // Below this point will result in player passing out from hypothermia
		maxTemperature: 40, // Above this point will result in player passing out from hyperthermia
		tempApproachRate: 0.012, // Will nudge the temperature towards the base temperature by this rate (per degree celcius)

		// Heat generation
		baseHeatGeneration: 0.07, // The base rate of heat generation by the body.
		activityRate: 0.087, // How much physical activity affects heat generation.

		// Heat dissipation
		baseDissipation: 0.04, // The base rate of heat dissipation without modifiers.
		dissipationRate: 0.0035, // The curve at higher temperatures where dissipation levels out

		// Clothing
		baseInsulation: 0,
		insulationCap: 55, // Target warmth cap where its effectiveness is reduced
		insulationMultiplier: 1.05, // The effectiveness of clothing warmth

		// Wetness
		maxWetness: 200,
		maxClothingFactor: 0.8, // Max wetness outside of water (80%)
		wetnessFactor: 0.65, // 65% increase in dissipation at full wetness

		// Effects from temperature
		effects: {
			lowerThresholdStart: 36,
			lowerThresholdEnd: 33,
			upperThresholdStart: 38,
			upperThresholdEnd: 41,
			lowerMaxStressGain: 3,
			upperMaxStressGain: 2,
			maxFatigueGainMultiplier: 3,
			maxPainGainMultiplier: 1.5,
			maxArousalGainMultiplier: 0.3,
		},
	},
	thermometer: {
		base: "img/misc/icon/weather/thermometer.png",
		fill: "img/misc/icon/weather/thermo_filled.png",
		upArrow: "img/misc/icon/weather/arrow_up.png",
		downArrow: "img/misc/icon/weather/arrow_down.png",
	},
	months: [
		{
			// Jan
			temperatureRange: [-8, 7], // Range of temperature for a specific month. A range of [5, 15] means that it will generate temperatures between that range for that specific month.
			sunIntensity: 0.1, // Modifies tanning changes from sun exposure
		},
		{
			// Feb
			temperatureRange: [-15, 7],
			sunIntensity: 0.2,
		},
		{
			// Mar
			temperatureRange: [-5, 13],
			sunIntensity: 0.3,
		},
		{
			// Apr
			temperatureRange: [0, 18],
			sunIntensity: 0.5,
		},
		{
			// May
			temperatureRange: [8, 19],
			sunIntensity: 0.7,
		},
		{
			// Jun
			temperatureRange: [12, 22],
			sunIntensity: 1,
		},
		{
			// Jul
			temperatureRange: [14, 27],
			sunIntensity: 1,
		},
		{
			// Aug
			temperatureRange: [14, 24],
			sunIntensity: 0.8,
		},
		{
			// Sep
			temperatureRange: [11, 20],
			sunIntensity: 0.7,
		},
		{
			// Oct
			temperatureRange: [5, 16],
			sunIntensity: 0.5,
		},
		{
			// Nov
			temperatureRange: [-5, 10],
			sunIntensity: 0.3,
		},
		{
			// Dec
			temperatureRange: [-12, 5],
			sunIntensity: 0.1,
		},
	],
	weatherTypes: [
		{
			name: "clear",
			value: 0, // Value determines how to interpolate between different weather types. It always interpolates to a adjacent value first.
			probability: {
				// Weighted probabilities per month - there are compared to the other weather types, and not to the other seasons.
				summer: 0.7,
				winter: 0.3,
				spring: 0.5,
				autumn: 0.4,
			},
			cloudCount: {
				// Visual only - determines how many clouds spawn at once in the sidebar of each type
				small: () => random(0, 2),
				large: () => 0,
			},
			// This is a factor that adjusts temperature based on weather conditions. It generally increases
			// in clear weather to simulate greater heat from the sun or faster heat loss during clear nights and winters.
			// Conversely, it decreases under cloudy conditions to reflect the effect of cloud cover on temperature.
			temperatureModifier: 2,
			// Modifies the tanning factor, based on cloud coverage. A modifier of 1 has no penalties.
			tanningModifier: 1,
			// Determines how overcast the sky should be. (Between 0 and 1)
			overcast: () => 0,
			// Determines the intensity of the precipitation. A bigger value accumulates snow faster during winter.
			precipitationIntensity: 0,
			// Determines how dark the clouds should be when it's overcast
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
				small: () => random(1, 3),
				large: () => random(0, 1),
			},
			temperatureModifier: 1.5,
			tanningModifier: 0.5,
			overcast: () => random(0, 1) * randomFloat(0, 0.3),
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
			overcast: () => randomFloat(0.6, 1),
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
				large: () => random(1, 5),
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
				large: () => random(2, 5),
			},
			temperatureModifier: 1,
			tanningModifier: 0.1,
			overcast: () => 1,
			precipitationIntensity: 2,
			visibility: 0.4,
		},
		{
			name: "thunderStorm",
			value: 4,
			probability: {
				// Disabled for now since it's not implemented yet
				summer: 0, // 0.02,
				winter: 0, // 0.005,
				spring: 0, // 0.015,
				autumn: 0, // 0.01,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(3, 5),
			},
			temperatureModifier: 1,
			tanningModifier: 0,
			overcast: () => 1,
			precipitationIntensity: 3,
			visibility: 0.3,
		},
	],
};
