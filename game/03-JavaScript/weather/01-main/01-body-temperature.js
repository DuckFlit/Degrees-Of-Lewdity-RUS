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
 * - Heat generation:
 *   - Base value: The body's base heat generation, adjusting according to the difference from the base body temperature.
 *   - Activity: Increases with physical activity. Typically 0.2, but varies with sleep or exercise.
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
	const baseBodyTemperature = 37; // The normal body temperature in degrees Celsius.
	const baseHeatGeneration = 0.06; // The base rate of heat generation by the body.
	const activityRate = 0.08; // How much physical activity affects heat generation.
	const baseDissipation = 0.049; // The base rate of heat dissipation without modifiers.
	const dissipationRate = 0.000001; // The curve at higher temperatures where dissipation levels out
	const dissipationModifier = 0.07; // Modifies the importance of the temperature difference between current temperature and base temperature.
	const insulationFactor = 0.007; // The effectiveness of clothing warmth
	const wetnessFactor = 0.5; // 50% increase in dissipation at full wetness

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
	 * Retrieves the current body temperature
	 *
	 * @returns {number} The current body temperature.
	 */
	function get() {
		return V.player.bodyTemperature;
	}

	/**
	 * Updates the body temperature based on air temperature and time elapsed.
	 * Called from time.js
	 *
	 * @param {number} outsideTemperature The current air temperature.
	 * @param {number} minutes The time elapsed in minutes.
	 */
	function update(outsideTemperature, minutes) {
		if (T.bodyActivity === undefined) resetActivity();

		if (V.inwater && V.outside) {
			outsideTemperature = Weather.waterTemperature;
		}

		// To prevent exaggerated changes in large time skips and for performance reasons
		// we scale down the additional minutes after an hour of time passed at once
		// Won't affect sleep, since it runs in hourly chunks
		const scaledMinutes = Math.min(minutes, 60 + Math.sqrt(Math.max(minutes - 60, 0)));

		const dissipation = calculateHeatDissipation(outsideTemperature);
		V.player.bodyTemperature = round(V.player.bodyTemperature + (calculateHeatGeneration() - dissipation) * scaledMinutes, 2);
		resetActivity();
	}

	/**
	 * Pending a wetness refactor (evaporation depending on temperature?)
	 * Goal is to replace $upperwet, etc. with clothing having its own wetness
	 * Currently uses a simplified model
	 * Max wetness is 80% outside of water
	 */
	function calculateWetness() {
		if (V.inwater) return 1; // 100% wet if in water
		const maxWetness = 200;
		const maxClothingFactor = 0.8; // Max 80%  outside of water
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
	function calculateHeatDissipation(outsideTemperature) {
		const bodyTemperature = V.player.bodyTemperature;
		const temperatureDifference = bodyTemperature - outsideTemperature;

		// Base dissipation
		const dissipationFactor = Math.max(1, 1 + temperatureDifference * dissipationModifier * Math.exp(-Math.abs(temperatureDifference) / 50));
		const baseDissipationValue = (dissipationRate * Math.abs(temperatureDifference) + baseDissipation) * dissipationFactor;

		// Insulation reduces dissipation
		const warmth = getTotalWarmth();
		const insulationModifier = Math.max(0, 1 - warmth * insulationFactor);

		// Wetness increases dissipation
		const wetnessMultiplier = 1 + calculateWetness() * wetnessFactor;

		// Adjust dissipation based on insulation and temperature difference.
		return baseDissipationValue * insulationModifier * wetnessMultiplier;
	}

	

	/**
	 * Calculates heat generation based on the current activity level and difference from the base body temperature.
	 * Increases heat generation if body temperature is below base and decreases if above.
	 *
	 * @returns {number} The calculated heat generation value.
	 */
	function calculateHeatGeneration() {
		const activityHeatGeneration = activityRate * activityLevel();
		const temperatureDifference = V.player.bodyTemperature - baseBodyTemperature;
		return baseHeatGeneration + activityHeatGeneration - 0.01 * temperatureDifference;
	}
	function temperatureFactor() {
		if (get() <= temperatureEffects.lowerThresholdEnd) {
			return -1 - normalise(currentTemp, temperatureEffects.lowerThresholdStart, temperatureEffects.lowerThresholdEnd);
		}

		if (get() >= temperatureEffects.upperThresholdStart) {
			return normalise(currentTemp, temperatureEffects.upperThresholdEnd, temperatureEffects.upperThresholdStart);
		}
		return 0;
	}

	function getTotalWarmth() {
		return Object.values(V.worn).reduce((acc, item) => {
			return acc + (item.warmth || 0);
		}, 0);
	}

	/* Debug */
	function getRestingPoint(iterations = 120, naked = undefined, outsideTemperature) {
		outsideTemperature = outsideTemperature ?? (V.outside ? Weather.temperature : Weather.insideTemperature);
		let temp = V.player.bodyTemperature;
		if (V.inwater && V.outside) {
			outsideTemperature = Weather.waterTemperature;
		}
		let dissipation, generation;
		for (let i = 0; i < iterations; i++) {
			dissipation = calculateHeatDissipation(outsideTemperature, naked);
			generation = calculateHeatGeneration();
			temp = round(temp + (generation - dissipation) * 15, 2);
		}
		return { temp, dissipation, generation };
	}

	return Object.create({
		temperatureEffects,
		get wetness() {
			return calculateWetness();
		},
		get direction() {
			return Math.sign(getRestingPoint(1).temp - get());
		},
		// For compatibility with combat system - since I don't want to touch it
		get state() {
			if (get() < 35) return "cold";
			if (get() < 36.5) return "chilly";
			if (get() < 37.5) return "comfy";
			if (get() < 39) return "warm";
			return "hot";
		},
		get fatigueModifier() {
			const factor = temperatureFactor();
			return factor > 0 ? interpolate(1, temperatureEffects.maxFatigueGainMultiplier, factor) : 0;
		},
		get arousalModifier() {
			const factor = temperatureFactor();
			return factor < 0 ? interpolate(1, temperatureEffects.maxArousalGainMultiplier, Math.abs(factor)) : 0;
		},
		get painModifier() {
			const factor = temperatureFactor();
			return factor < 0 ? interpolate(1, temperatureEffects.maxPainGainMultiplier, Math.abs(factor)) : 0;
		},
		get stressModifier() {
			const factor = temperatureFactor();
			if (factor > 0) return interpolate(0, temperatureEffects.upperMaxStressGain, factor);
			return interpolate(0, temperatureEffects.lowerMaxStressGain, Math.abs(factor));
		},
		addActivity,
		get,
		update,
		activityLevel,
		calculateHeatDissipation,
		getTotalWarmth,
		// Debug
		getRestingPoint,
	});
})();
