/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*

- Option to increase number of temp months more than 2
- Option to increase number of weather days more than 2 - min 2 max 28
Minimum 2 check
- Add function:
	- setWeather: Should replace current weather, but then smoothly transition to a new weather after a while.

	- Only use winter-images after it has snowed once
	- if it melts (at least 5 hours of warm temperature) back to normal images until it snow again
*/

Weather.WeatherConditions = (() => {
	const monthlyTemperatureRanges = [
		[-8, 7], // Jan
		[-5, 9], // Feb
		[4, 12], // Mar
		[6, 16], // Apr
		[9, 18], // May
		[12, 21], // Jun
		[14, 24], // Jul
		[14, 22], // Aug
		[11, 20], // Sep
		[9, 16], // Oct
		[-1, 10], // Nov
		[-4, 7], // Dec
	];

	const WeatherTypes = {
		clear: {
			value: 0,
			probability: {
				summer: 0.6,
				winter: 0.3,
				spring: 0.5,
				autumn: 0.4,
			},
		},
		lightClouds: {
			value: 1,
			probability: {
				summer: 0.3,
				winter: 0.4,
				spring: 0.4,
				autumn: 0.3,
			},
		},
		heavyClouds: {
			value: 2,
			probability: {
				summer: 0.1,
				winter: 0.4,
				spring: 0.2,
				autumn: 0.3,
			},
		},
		lightPrecipitation: {
			value: 3,
			probability: {
				summer: 0.05,
				winter: 0.1,
				spring: 0.05,
				autumn: 0.15,
			},
		},
		heavyPrecipitation: {
			value: 4,
			probability: {
				summer: 0.05,
				winter: 0.1,
				spring: 0.05,
				autumn: 0.1,
			},
		},
		thunderstorm: {
			value: 4,
			probability: {
				summer: 0.02,
				winter: 0.005,
				spring: 0.015,
				autumn: 0.01,
			},
		},
	};

	function getWeather(date) {
		date = new DateTime(date ?? Time.date);
		generateWeather(date);
		return interpolateWeather(date);
	}

	function interpolateWeather(date) {
		const currentTimeStamp = date.timeStamp;

		// Find the current and next weather key points
		let currentKeyPoint = null;
		let nextKeyPoint = null;

		for (const keyPoint of V.weatherKeypointsArr) {
			if (keyPoint.timestamp <= currentTimeStamp) {
				currentKeyPoint = keyPoint;
			}
			if (keyPoint.timestamp > currentTimeStamp && !nextKeyPoint) {
				nextKeyPoint = keyPoint;
			}
		}

		// If no next key point is found for the day, assume weather stays the same
		if (!nextKeyPoint) {
			return currentKeyPoint ? currentKeyPoint.value : "Clear"; // Default to 'Clear' if none found
		}
		const currentValueNumeric = WeatherTypes[currentKeyPoint.value].value;
		const nextValueNumeric = WeatherTypes[nextKeyPoint.value].value;
		// Calculate the fraction of time passed between the current and next key points
		const fraction = (currentTimeStamp - currentKeyPoint.timestamp) / (nextKeyPoint.timestamp - currentKeyPoint.timestamp);

		// Interpolate the weather value
		const interpolatedValueNumeric = Math.round(currentValueNumeric + (nextValueNumeric - currentValueNumeric) * fraction);

		// Find the closest weather type to the interpolated value
		return findClosestWeatherType(interpolatedValueNumeric);
	}

	function findClosestWeatherType(interpolatedValue) {
		const closestTypes = Object.entries(WeatherTypes).reduce(
			(acc, [key, type]) => {
				const difference = Math.abs(type.value - interpolatedValue);
				if (difference < acc.minDifference) {
					return { minDifference: difference, types: [key] };
				}
				if (difference === acc.minDifference) {
					acc.types.push(key);
				}
				return acc;
			},
			{ minDifference: Number.MAX_VALUE, types: [] }
		).types;

		// Randomly choose one type if there are multiple options with the same int value
		return closestTypes[random(0, closestTypes.length - 1)];
	}

	function generateWeather(currentDate) {
		const numDays = 20;

		if (V.weatherKeypointsArr === undefined) {
			V.weatherKeypointsArr = [];
			generateWeatherKeypoints(currentDate, numDays);
		}

		// Trim old keypoints, keeping one before the current time for interpolation
		while (V.weatherKeypointsArr.length > 1 && V.weatherKeypointsArr[1].timestamp <= currentDate.timeStamp) {
			V.weatherKeypointsArr.shift();
		}

		const lastKeypoint = V.weatherKeypointsArr[V.weatherKeypointsArr.length - 1];
		const lastDate = new DateTime(lastKeypoint.timestamp);
		const targetDate = new DateTime(currentDate).addDays(numDays);
		const dayDifferenceFromKeypoint = (targetDate.timeStamp - lastDate.timeStamp) / Time.secondsPerDay;

		if (dayDifferenceFromKeypoint > 0) {
			generateWeatherKeypoints(lastDate.addDays(1), dayDifferenceFromKeypoint);
		}
	}

	function generateWeatherKeypoints(startDate, daysToAdd) {
		const minKeyPointsPerDay = 2;
		const maxKeyPointsPerDay = 5;
		const timeApart = 120; // Minimum time apart in minutes

		for (let dayCount = 0; dayCount < daysToAdd; dayCount++) {
			const date = new DateTime(startDate).addDays(dayCount);
			const numKeyPoints = random(minKeyPointsPerDay, maxKeyPointsPerDay);
			let lastTime = -timeApart;
			for (let i = 0; i < numKeyPoints; i++) {
				const timeWindow = 24 * 60 - lastTime - timeApart;
				const time = lastTime + timeApart + random(1, timeWindow / (numKeyPoints - i));
				const value = getRandomWeatherValue();

				const timestamp = new DateTime(date.year, date.month, date.day, Math.floor(time / 60), time % 60).timeStamp;
				V.weatherKeypointsArr.push({ timestamp, value });
				lastTime = time;
			}
		}
	}

	function getRandomWeatherValue() {
		const currentSeason = Time.season;
		const options = Object.entries(WeatherTypes).map(([key, weatherType]) => {
			const weight = weatherType.probability[currentSeason];
			return [key, weight];
		});

		return weightedRandom(...options);
	}

	return Object.create({
		get keysObject() {
			const arr = V.weatherKeypointsArr;
			return arr.map(item => {
				const date = new DateTime(item.timestamp);
				return {
					date: `${date.day}/${date.month} ${ampm(date.hour, date.minute)}`,
					value: item.value,
				};
			});
		},
		getWeather,
		generateWeatherKeypoints,
	});
})();
