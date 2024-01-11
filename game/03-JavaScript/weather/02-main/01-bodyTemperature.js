// TODO!
// When passing time more than 1 hour the temperature gets wacky

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
	const baseBodyTemperature = 37; // The normal body temperature in degrees Celsius.
	const baseHeatGeneration = 0.075; // The base rate of heat generation by the body.
	const activityRate = 0.075; // How much physical activity affects heat generation.
	const baseDissipation = 0.065; // The base rate of heat dissipation without modifiers.
	const dissipationRate = 0.0015; // The rate at which heat dissipates based on air temperature.

	/**
	 * Calculates the level of activity based on the current state of the body.
	 * Determines the heat generation rate by considering activities like sleeping, exercising, and normal activity.
	 *
	 * @returns {number} The current activity level, influencing heat generation.
	 */
	function activityLevel() {
		if (T.bodyActivity.sleep) return 0;
		if (T.bodyActivity.athletics && T.bodyActivity.physique) return 0.7;
		if (T.bodyActivity.athletics || T.bodyActivity.physique) return 0.5;
		return 0.2;
	}

	/**
	 * Calculations for insulation level goes here.
	 * It takes into account all clothing
	 */
	function insulationLevel() {
		return 0;
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
	 * Retrieves the current body temperature of the player.
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
	 * @param {number} airTemperature The current air temperature.
	 * @param {number} minutes The time elapsed in minutes.
	 */
	function update(airTemperature, minutes) {
		if (T.bodyActivity === undefined) resetActivity();

		// To prevent exaggerated changes in large time skips and for performance reasons
		// we scale down the additional minutes after an hour of time passed at once
		// Won't affect sleep, since it runs in hourly chunks
		let scaledMinutes;
		if (minutes <= 60) {
			// For up to an hour, use the actual minutes
			scaledMinutes = minutes;
		} else {
			// For longer periods, scale down the additional minutes
			scaledMinutes = 60 + Math.sqrt(minutes - 60);
		}

		const dissipation = calculateHeatDissipation(airTemperature);
		V.player.bodyTemperature += round((calculateHeatGeneration() - dissipation) * scaledMinutes, 2);
		resetActivity();
	}

	/**
	 * Calculates the adjusted dissipation factor based on the difference between body and air temperatures.
	 * Assumes that insulation becomes more effective as the temperature difference increases.
	 * The closer the air temperature is to the body temperature - the less effective clothes are:
	 * This is to not penalise the player too much from wearing a lot of clothes, especially in room temperature
	 *
	 * @param {number} airTemperature The current air temperature.
	 * @returns {number} The adjusted insulation factor.
	 */
	function calculateHeatDissipation(airTemperature) {
		const temperatureDifference = V.player.bodyTemperature - airTemperature;

		// Determine the insulation level based on clothing, in a 0-1 scale.
		const insulation = insulationLevel() / 100;

		// Factor based on the absolute value of the temperature difference.
		// This factor increases as the temperature difference increases
		let insulationFactor = 1 / (1 + Math.exp(Math.abs(temperatureDifference) / 10));
		insulationFactor = Math.clamp(insulation * (1 - insulationFactor), 0, 1);

		// Calculate the heat dissipation from the insulation factor + base dissipation rate + temperature difference
		return (dissipationRate * temperatureDifference + baseDissipation) * (1 - insulationFactor);
	}

	/**
	 * Calculates heat generation based on the current activity level and difference from the base body temperature.
	 * Increases heat generation if body temperature is below base and decreases if above.
	 *
	 * @returns {number} The calculated heat generation value.
	 */
	function calculateHeatGeneration() {
		const activityHeatGeneration = activityRate * activityLevel();
		const temperatureDiffFromBase = V.player.bodyTemperature - baseBodyTemperature;
		return baseHeatGeneration + activityHeatGeneration - 0.01 * temperatureDiffFromBase;
	}

	return Object.create({
		addActivity,
		get,
		update,
	});
})();
