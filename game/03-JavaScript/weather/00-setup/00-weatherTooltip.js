/* eslint-disable prettier/prettier */
setup.WeatherTooltip = {
	type: {
		clear: {
			dawn: "A bright orange hue fills the sky.",
			day: "The sky is bright and sunny.",
			dusk: "Deep orange colors the sky.",
			night: "A clear sky reveals a blanket of stars.",
		},
		lightClouds: {
			dawn: "The sun's orange glow peeks through the clouds.",
			day: "The sun shines through the thin clouds.",
			dusk: "Streaks of orange light covers the sky.",
			night: "The stars can be seen between the clouds.",
		},
		heavyClouds: {
			dawn: "An cloudy sky carries a hint of orange at dawn.",
			day: "The sky is overcast and gray.",
			dusk: "The cloudy sky takes on an orange glow.",
			night: "The stars can barely be seen through the thick clouds.",
		},
		lightPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "Gentle rain falls in the early light of dawn." : "Light snowflakes drift down in the early light.",
			day: () => Weather.precipitation === "rain" ? "Light raindrops patter down." : "A gentle snowfall fills the sky.",
			dusk: () => Weather.precipitation === "rain" ? "A soft drizzle accompanies the orange dusk." : "Fine snow mix with the orange twilight.",
			night: () => Weather.precipitation === "rain" ? "A light rain falls through the night." : "Light snow fills the dark landscape.",
		},
		heavyPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "A heavy rainstorm starts the day." : "Thick snowflakes blanket the early morning.",
			day: () => Weather.precipitation === "rain" ? "Rain pours heavily from the cloudy sky." : "Heavy snowfall obscures the sky.",
			dusk: () => Weather.precipitation === "rain" ? "The heavy rain intensifies." : "Snow piles up as evening falls.",
			night: () => Weather.precipitation === "rain" ? "Heavy rain defines the darkness." : "A heavy snowstorm envelops the night.",
		},
		thunderStorm: {
			dawn: "A thunderstorm rages at dawn.",
			day: "Loud thunder and bright lightning strike.",
			dusk: "Orange skies and thunderstorms merge.",
			night: "Flashes of lightning illuminate the night.",
		},
	},
	temperature: () => {
		if (Weather.temperature <= -15) {
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
			return "The temperature is cool, but tolerable";
		} else if (Weather.temperature <= 20) {
			return "The air is mild.";
		} else if (Weather.temperature <= 25) {
			return "The outside temperature is warm and comfortable.";
		} else {
			return "It's getting hot.";
		}
	},
	bodyTemperature: () => {
		if (Weather.bodyTemperature <= 34) {
			return "You're suffering from hypothermia'."
		} else if (Weather.bodyTemperature <= 35) {
			return "You are freezing cold."
		} else if (Weather.bodyTemperature <= 36) {
			return "You shiver."
		} else if (Weather.bodyTemperature <= 36.5) {
			return "You are chilly."
		} else if (Weather.bodyTemperature <= 38) {
			return "You are snug."
		} else if (Weather.bodyTemperature <= 39) {
			return "You are warm and sweaty."
		} else if (Weather.bodyTemperature <= 40) {
			return "You are hot."
		} else {
			return "You're suffering from heatstroke."
		}
	}
};
