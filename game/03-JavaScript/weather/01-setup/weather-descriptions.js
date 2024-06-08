/* eslint-disable prettier/prettier */
setup.WeatherDescriptions = {
	type: {
		clear: {
			dawn: "A bright orange hue fills the sky.",
			day: "The sky is bright and sunny.",
			dusk: "Deep orange colors the sky.",
			night: "The stars shine brightly across the dark horizon.",
			bloodMoon: "The night sky glows ominously red under the glowing moon.",
			transition: () => Weather.isOvercast ? "The remnants of clouds are clearing, revealing a vivid sky." : null,
		},
		lightClouds: {
			dawn: "The sun's orange glow peeks through the clouds.",
			day: "The sun shines brightly through the clouds.",
			dusk: "Streaks of orange light covers the sky.",
			night: "The stars can be seen between the clouds.",
			bloodMoon: "Clouds drift across the eerie red glow of the moon.",
			transition: () => Weather.isOvercast ? "The overcast is dispersing, making way for clearer skies." : null,
		},
		heavyClouds: {
			dawn: () => "The cloudy sky is dyed orange by the rising sun.",
			day: () => "The sky is overcast and gray.",
			dusk: () => "The cloudy sky takes on an orange glow.",
			night: () => "The stars can barely be seen through the thick clouds.",
			bloodMoon: () => "The sky is filled with a red glow.",
			transition: () => !Weather.isOvercast ? "You see dark clouds forming overhead." : null,
		},
		lightPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "Gentle rain falls in the early light of dawn." : "Light snowflakes drift down in the early light.",
			day: () => Weather.precipitation === "rain" ? "Light raindrops patter down." : "A gentle snowfall fills the sky.",
			dusk: () => Weather.precipitation === "rain" ? "A soft drizzle accompanies the orange dusk." : "Fine snow mix with the orange twilight.",
			night: () => Weather.precipitation === "rain" ? "A light rain falls through the night." : "Light snow fills the dark landscape.",
			bloodMoon: () => Weather.precipitation === "rain" ? "The red moon casts a surreal glow on the light rain." : "The red glow of the moon illuminates falling snowflakes.",
			transition: () => !Weather.isOvercast && !Weather.isFreezing ? "You notice rain clouds forming above." : !Weather.isOvercast ? "The clouds are getting heavy. It will snow soon." : null,
		},
		heavyPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "A heavy rainstorm starts the day." : "Thick snowflakes blanket the early morning.",
			day: () => Weather.precipitation === "rain" ? "Rain pours heavily from the cloudy sky." : "Heavy snowfall obscures the sky.",
			dusk: () => Weather.precipitation === "rain" ? "The heavy rain intensifies." : "Snow piles up as evening falls.",
			night: () => Weather.precipitation === "rain" ? "Heavy rain defines the darkness." : "A heavy snowstorm envelops the night.",
			bloodMoon: () => Weather.precipitation === "rain" ? "The downpour reflects the red sky." : "Snow reflects the moon's eerie red, blanketing the world in surreal silence.",
			transition: () => !Weather.isOvercast && !Weather.isFreezing ? "Dark clouds begin to gather. It's going to be rain." : !Weather.isOvercast ? "Clouds are gathering above. It's going to snow soon." : null,
		},
		thunderStorm: {
			dawn: "A thunderstorm rages at dawn.",
			day: "Loud thunder and bright lightning strike.",
			dusk: "Orange skies and thunderstorms merge.",
			night: "Flashes of lightning illuminate the night.",
		},
		tentaclePlains: `<span class="purple">The sky glows with a vivid purple hue.</span>`,
	},
	/* Specific tooltips based on your location */
	location: {
		lake: () => Weather.isFrozen("lake") ? "The lake is frozen." : "The lake is calm.",
	},
	temperature: () => {
		if (Weather.temperature <= -15) {
			return `<span class="blue">It's extremely cold outside.</span>`;
		} else if (Weather.temperature <= -10) {
			return Weather.isSnow ? "The heavy snow adds to the biting cold." : "The cold air is biting.";
		} else if (Weather.temperature <= -5) {
			return Weather.isSnow ? "The air is cold and the ground is snow-packed." : "The air is freezing, feeling sharp and dry.";
		} else if (Weather.temperature <= 0) {
			return Weather.isSnow ? "The air is cold, the snow covers the ground." : "Frost begin forming on the ground.";
		} else if (Weather.temperature <= 5) {
			return Weather.isSnow ? "Melting snow creates a slush on the ground." : "Chilly, with a cool wind.";
		} else if (Weather.temperature <= 10) {
			return Weather.isSnow ? "The leftover snow quickly melts." : "It's cold, with a gentle breeze.";
		} else if (Weather.temperature <= 15) {
			return "The temperature is cool, but tolerable.";
		} else if (Weather.temperature <= 20) {
			return "The air is mild.";
		} else if (Weather.temperature <= 25) {
			return "The outside temperature is warm and comfortable.";
		} else if (Weather.temperature <= 30) {
			return "It's getting hot.";
		} else {
			return `<span class="red">It's extremely hot outside.</span>`;
		}
	},
	extremeTemperature: () => {
		if (!Weather.Temperature.isExtreme()) return "";
		const average = Weather.genSettings.months[Time.month - 1].temperatureRange.average;
		const extreme = Weather.genSettings.months[Time.month - 1].temperatureRange.extreme;

		if (Weather.temperature <= -18) {
			return `<span class="blue">It's frigid, likely one of the coldest days of the year.</span>`;
		} else if (Weather.temperature > 30) {
			return `<span class="red">It's sweltering. There might be a heatwave passing by.</span>`;
		}

		const warm = Weather.temperature > 20 ? "hot" : "warm";
		const cool = Weather.temperature < 7 ? "cold" : "cool";
		const frigid = Weather.temperature < -15 ? "frigid" : "cold";

		// 50% lower than average low
		if (average[0] + ((extreme[0] - average[0]) * 0.5) > Weather.temperature) {
			return `<span class="teal">It's unseasonably ${frigid}.</span>`;
		} else if (average[0] > Weather.temperature) {
			return `<span class="teal">It's ${cool} for this time of year.</span>`
		}

		// 50% higher than average high
		if (average[1] + ((extreme[1] - average[1]) * 0.5) < Weather.temperature) {
			return `<span class="orange">It's unseasonably ${warm}.</span>`
		} else if (average[1] < Weather.temperature) {
			return `<span class="orange">It's ${warm} for this time of year.</span>`
		}

		return "";
	},
	bodyTemperature: () => {
		if (Weather.bodyTemperature <= 34) {
			return "You're suffering from severe hypothermia.";
		} else if (Weather.bodyTemperature <= 35) {
			return "You feel freezing cold.";
		} else if (Weather.bodyTemperature <= 35.5) {
			return "You feel very cold and shiver uncontrollably.";
		} else if (Weather.bodyTemperature <= 36) {
			return "You shiver.";
		} else if (Weather.bodyTemperature <= 36.5) {
			return "You feel chilly.";
		} else if (Weather.bodyTemperature <= 37.5) {
			return "You feel comfortable.";
		} else if (Weather.bodyTemperature <= 38) {
			return "You feel snug.";
		} else if (Weather.bodyTemperature <= 38.5) {
			return "You feel a slight sweating and discomfort.";
		} else if (Weather.bodyTemperature <= 39) {
			return "You feel warm and sweaty.";
		} else if (Weather.bodyTemperature <= 39.5) {
			return "You feel overheated and uncomfortable.";
		} else if (Weather.bodyTemperature <= 40) {
			return "You feel hot.";
		} else {
			return "You're suffering from heatstroke.";
		}
	},
	bodyTemperatureChanges: () => {
		if (Math.abs(Weather.BodyTemperature.target - Weather.bodyTemperature) <= 0.5)
			return "";
		if (Weather.bodyTemperature < 35) {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "You let the warmth take the chill from your bones.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "Your shivers are subsiding.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "You're getting colder dangerously fast.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "You're still getting colder.";
			}
		} else if (Weather.bodyTemperature < 39) {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "You're heating up fast.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "You're warming up.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "You're getting colder fast.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "You're getting cooler.";
			}
		} else {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "You're heating up dangerously fast.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "You're heating up further.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "You let the chill take the heat away from your body.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "You're cooling off.";
			}
		}
	},
	waterTemperature: () => {
		if (!T.inWater) return "";
		if (Weather.waterTemperature <= 5) {
			return "The water feels freezing cold.";
		} else if (Weather.waterTemperature <= 15) {
			return "The water feels cold.";
		} else if (Weather.waterTemperature <= 25) {
			return "The water feels cool.";
		} else if (Weather.waterTemperature <= 35) {
			return "The water feels warm.";
		} else {
			return "The water feels hot.";
		}
	},
	clothingWarmth: warmth => {
		let output = "";
		if (warmth > 6) {
			output = "Very warm.";
		}
		else if (warmth > 4) {
			output = "Warm and snug.";
		}
		else if (warmth > 2) {
			output = "Should help keep the chill off.";
		}
		else if (warmth > 0) {
			output = "Light and cool.";
		}
		else {
			output = "No effect on warmth.";
		}
		return V.options.images ? output + ` (<span class="cold-resist-icon noDivider">${warmth}</span>)` : output;
	},
	shop: () => {
		if (Weather.temperature <= -5) {
			return "<span class='blue'>It's extremely cold outside.</span>";
		} else if (Weather.temperature <= 5) {
			return "<span class='purple'>It's very cold outside.</span>";
		} else if (Weather.temperature <= 15) {
			return "<span class='teal'>It's cold outside.</span>";
		} else if (Weather.temperature <= 25) {
			return "<span class='green'>It's a comfortable temperature outside.</span>";
		} else {
			return "<span class='orange'>It's hot outside.</span>";
		}
	},
};
