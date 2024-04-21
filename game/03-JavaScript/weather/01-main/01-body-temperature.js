/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Manages the body temperature of the player in the game.
 * Simulates the body's regulation of heat generation to maintain the base body temperature
 *
 * Heat dissipation and generation are affected by:
 * - Heat dissipation:
 *   - Air temperature: Increases as the difference between body and air temperature widens.
 *   - Clothing: Reduces dissipation based on insulation factor.
 *   - Wetness: Increases heat dissipation
 * - Heat generation:
 *   - Base value: The body's base heat generation, adjusting according to the difference from the base body temperature.
 *   - Activity: Increases with physical activity. Typically 0.2, but varies with sleep or exercise.
 *
 * Effects from low temperatures:
 *   - Lowered arousal gains
 *   - Higher pain gains
 *   - Stress increase every minute
 *
 * Effects from high temperatures:
 *   - Higher fatigue gains
 *   - Slight stress increase every minute
 *
 * Limitations:
 * - The current implementation of heat generation from exercise is only based on the duration of the exercise.
 *   It does not account for the intensity of the activity beyond the addition of physique and athletics.
 *   To represent different levels of activity intensity, a future rework may be needed for these stats.
 * - The heat generation from activity assumes the time passed post-exercise.
 *   If only 1 minute is passed, it is assumed that there is only 1 minute of exercise, as it resets after time has passed.
 *   The different activity states are:
 *     - Sleep: 0 (no heat generation)
 *     - Normal activity: 0.2 (slight heat generation)
 *     - Exercise (either physique or athletics): 0.5
 *     - Heavy exercise (both physique and athletics): 0.7
 */

Weather.BodyTemperature = (() => {
	/* Be careful when modifying the factors, as small changes can have big effects */

	// General
	const baseBodyTemperature = 37; // The normal body temperature in degrees Celsius.
	const tempApproachRate = 0.0125; // Will nudge the temperature towards the base temperature by this rate (per degree celcius)

	// Heat generation
	const baseHeatGeneration = 0.07; // The base rate of heat generation by the body.
	const activityRate = 0.086; // How much physical activity affects heat generation.

	// Heat dissipation
	const baseDissipation = 0.04; // The base rate of heat dissipation without modifiers.
	const dissipationRate = 0.0035; // The curve at higher temperatures where dissipation levels out

	// Clothing
	const baseInsulation = 5;
	const insulationCap = 55; // Target warmth cap where its effectiveness is reduced
	const insulationMultiplier = 1; // The effectiveness of clothing warmth

	// Wetness
	const maxWetness = 200;
	const maxClothingFactor = 0.8; // Max wetness outside of water (80%)
	const wetnessFactor = 0.6; // 60% increase in dissipation at full wetness

	// Effects from temperature
	const temperatureEffects = {
		lowerThresholdStart: 36,
		lowerThresholdEnd: 33,
		upperThresholdStart: 38,
		upperThresholdEnd: 41,
		lowerMaxStressGain: 3,
		upperMaxStressGain: 2,
		maxFatigueGainMultiplier: 3,
		maxPainGainMultiplier: 1.5,
		maxArousalGainMultiplier: 0.3,
	};

	/**
	 * Calculates the level of activity based on the current state of the body.
	 * Determines the heat generation rate by considering activities like sleeping, exercising, and normal activity.
	 *
	 * @returns {number} The current activity level, influencing heat generation.
	 */
	function activityLevel() {
		if (T.bodyActivity?.sleep) return 0;
		if (T.bodyActivity?.athletics && T.bodyActivity?.physique) return 0.7;
		if (T.bodyActivity?.athletics || T.bodyActivity?.physique) return 0.5;
		return 0.2;
	}

	/**
	 * Adds an activity to the body's current state.
	 *
	 * @param {string} activity The activity to be added (e.g., 'athletics', 'physique', 'sleep').
	 */
	function addActivity(activity) {
		if (T.bodyActivity === undefined) resetActivity();
		if (activity in T.bodyActivity) {
			T.bodyActivity[activity] = 1;
		} else {
			console.error(`addActivity(): ${activity} doesn't exist.`);
		}
	}

	/**
	 * Resets the activity states to default values.
	 */
	function resetActivity() {
		T.bodyActivity = {
			athletics: 0,
			physique: 0,
			sleep: 0,
		};
	}

	/**
	 * Updates the body temperature based on air temperature and time elapsed.
	 * Called from time.js
	 *
	 * @param {number} temperature The current air temperature.
	 * @param {number} minutes The time elapsed in minutes.
	 */
	function update(temperature, minutes) {
		if (T.bodyActivity === undefined) resetActivity();

		if (T.inWater && V.outside) {
			temperature = Weather.waterTemperature;
		}

		const scaledMinutes = Math.min(minutes, 60 + Math.sqrt(Math.max(minutes - 60, 0)));
		V.player.bodyTemperature = calculateTemperatureChange(V.player.bodyTemperature, temperature, scaledMinutes, getTotalWarmth());
		resetActivity();
	}

	function getRestingPoint(iterations = 6, warmth = undefined, bodyTemperature, outside) {
		let temperature = outside || V.outside ? Weather.temperature : Weather.insideTemperature;
		if (T.inWater && V.outside) {
			temperature = Weather.waterTemperature;
		}
		let temp = bodyTemperature ?? V.player.bodyTemperature;

		for (let i = 0; i < iterations; i++) {
			temp = calculateTemperatureChange(temp, temperature, 15, warmth);
		}

		return temp;
	}

	function calculateTemperatureChange(currentTemperature, airTemperature, minutes, warmth) {
		const generation = calculateHeatGeneration(currentTemperature);
		const dissipation = calculateHeatDissipation(airTemperature, warmth);
		const newTemperature = currentTemperature + (generation - dissipation) * minutes;
		const baseDifference = newTemperature - baseBodyTemperature;

		// Nudge the temperature slowly towards the base temperature
		return newTemperature + baseDifference * -tempApproachRate * minutes;
	}

	/**
	 * Pending a wetness refactor (evaporation depending on temperature?)
	 * Goal is to replace $upperwet, etc. with clothing having its own wetness
	 * Currently uses a simplified model
	 * Max wetness is 80% outside of water
	 */
	function calculateWetness() {
		if (T.inWater) return 1; // 100% wet if in water
		if (V.outside && Weather.precipitation === "rain" && T.bottomless && T.topless) return 0.7;
		const upper = (Math.max(V.overupperwet, V.upperwet, V.underupperwet) / maxWetness) * (maxClothingFactor / 2);
		const lower = (Math.max(V.overlowerwet, V.lowerwet, V.underlowerwet) / maxWetness) * (maxClothingFactor / 2);
		return Math.min(upper + lower, maxClothingFactor);
	}

	/**
	 * Calculates the adjusted dissipation factor based on the difference between body and air temperatures.
	 * Assumes that insulation becomes more effective as the temperature difference increases.
	 * The closer the air temperature is to the body temperature - the less effective clothes are:
	 * This is to not penalise the player too much from wearing a lot of clothes, especially in room temperature
	 *
	 * @param {number} outsideTemperature The current air temperature.
	 * @returns {number} The adjusted insulation factor.
	 */
	function calculateHeatDissipation(temperature, warmth2) {
		const temperatureDifference = Math.max(0, V.player.bodyTemperature - temperature);

		// Base dissipation
		const dissipation = temperatureDifference * dissipationRate;
		const totalDissipation = baseDissipation + dissipation;

		// Insulation reduces dissipation
		const warmth = warmth2 ?? getTotalWarmth();
		const insulationModifier = Math.exp((-warmth * insulationMultiplier) / insulationCap);

		// Wetness increases dissipation
		const wetnessMultiplier = 1 + calculateWetness() * wetnessFactor;

		// Adjust dissipation based on insulation and temperature difference.
		return totalDissipation * insulationModifier * wetnessMultiplier;
	}

	/**
	 * Calculates heat generation based on the current activity level and difference from the base body temperature.
	 * Increases heat generation if body temperature is below base and decreases if above.
	 */
	function calculateHeatGeneration(bodyTemperature) {
		const activityHeatGeneration = activityRate * activityLevel();
		const temperatureDifference = bodyTemperature - baseBodyTemperature;
		return baseHeatGeneration + activityHeatGeneration - 0.01 * temperatureDifference;
	}

	function temperatureFactor() {
		if (V.player.bodyTemperature <= temperatureEffects.lowerThresholdStart) {
			return 1 - normalise(V.player.bodyTemperature, temperatureEffects.lowerThresholdStart, temperatureEffects.lowerThresholdEnd);
		}

		if (V.player.bodyTemperature >= temperatureEffects.upperThresholdStart) {
			return normalise(V.player.bodyTemperature, temperatureEffects.upperThresholdEnd, temperatureEffects.upperThresholdStart);
		}
		return 0;
	}

	function getTotalWarmth() {
		return (
			baseInsulation +
			Object.values(V.worn).reduce((acc, item) => {
				return acc + (item.warmth || 0);
			}, 0)
		);
	}

	return Object.create({
		temperatureEffects,
		get wetness() {
			return calculateWetness();
		},
		get direction() {
			return Math.sign(getRestingPoint(1).temp - V.player.bodyTemperature);
		},
		// For compatibility with /base-combat/ - since I don't want to touch it
		get state() {
			if (V.player.bodyTemperature < 35) return "cold";
			if (V.player.bodyTemperature < 36.5) return "chilly";
			if (V.player.bodyTemperature < 37.5) return "comfy";
			if (V.player.bodyTemperature < 39) return "warm";
			return "hot";
		},
		get fatigueModifier() {
			const factor = temperatureFactor();
			return V.player.bodyTemperature > baseBodyTemperature ? interpolate(1, temperatureEffects.maxFatigueGainMultiplier, factor) : 1;
		},
		get arousalModifier() {
			const factor = temperatureFactor();
			return V.player.bodyTemperature < baseBodyTemperature ? interpolate(1, temperatureEffects.maxArousalGainMultiplier, factor) : 1;
		},
		get painModifier() {
			const factor = temperatureFactor();
			return V.player.bodyTemperature < baseBodyTemperature ? interpolate(1, temperatureEffects.maxPainGainMultiplier, factor) : 1;
		},
		get stressModifier() {
			// temporarily disabled
			const factor = temperatureFactor();
			if (V.player.bodyTemperature > baseBodyTemperature) return interpolate(0, temperatureEffects.upperMaxStressGain, factor);
			return interpolate(0, temperatureEffects.lowerMaxStressGain, factor);
		},
		addActivity,
		get current() {
			return V.player.bodyTemperature;
		},
		update,
		activityLevel,
		calculateHeatGeneration,
		calculateHeatDissipation,
		getTotalWarmth,
		getRestingPoint,
	});
})();
