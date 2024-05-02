/* eslint-disable no-new */
Weather.Thermometer = (() => {
	const temperature = {
		min: 34,
		max: 40,
	};
	const clippingArea = {
		min: 4, // Minimum clipping from the bottom in pixels
		max: 0, // Maximum clipping from the top in pixels
	};
	const color = {
		min: "#000dff",
		mid: "#00ff91",
		max: "#ff0000",
	};
	const size = {
		scaleFactor: 2,
	};

	let thermometerCanvas = null;
	const images = {
		baseImg: { src: setup.WeatherSettings.thermometer.base },
		fillImg: { src: setup.WeatherSettings.thermometer.fill },
		upImg: { src: setup.WeatherSettings.thermometer.upArrow },
		downImg: { src: setup.WeatherSettings.thermometer.downArrow },
	};
	const element = $("<div />", { id: "characterTemperature" });
	const tooltipElement = $("<div />", { id: "characterTemperatureTooltip" });
	const loaded = new ObservableValue(false);
	const loadPromises = [];
	let allImagesLoaded = false;

	function load() {
		Object.entries(images).map(([key, imageInfo]) => {
			const promise = new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					images[key].img = img;
					resolve();
				};
				img.onerror = reject;
				img.src = imageInfo.src;
			});
			loadPromises.push(promise);
			return 0;
		});

		Promise.all(loadPromises).then(() => {
			thermometerCanvas = new Weather.Sky.Canvas(0, 0);
			const baseImg = images.baseImg.img;
			size.width = baseImg.width * size.scaleFactor;
			size.height = baseImg.height * size.scaleFactor;
			thermometerCanvas.element.width = size.width * 2;
			thermometerCanvas.element.height = size.height;
			thermometerCanvas.ctx.imageSmoothingEnabled = false;
			element.append(thermometerCanvas.canvas);
			allImagesLoaded = true;
			update();
		});
	}

	function update() {
		if (!allImagesLoaded) return;
		const normalisedTemperature = normalise(Weather.bodyTemperature, temperature.max, temperature.min);
		const usableHeight = size.height - clippingArea.min - clippingArea.max;
		const fillHeight = interpolate(clippingArea.min, usableHeight + clippingArea.min, normalisedTemperature);

		// Adjusted to range from -1 (temperature.min) through 0 (temperature.med) to 1 (temperature.max)
		const midTemperature = (temperature.max + temperature.min) / 2;
		let colorFactor = (Weather.bodyTemperature - midTemperature) / (temperature.max - midTemperature);
		colorFactor = Math.max(-1, Math.min(1, colorFactor));
		const fillColor = ColourUtils.interpolateTripleColor(color.min, color.mid, color.max, colorFactor);

		// Reset canvas on update
		thermometerCanvas.clear();
		thermometerCanvas.ctx.globalAlpha = 1;
		thermometerCanvas.ctx.globalCompositeOperation = "source-over";
		thermometerCanvas.ctx.fillStyle = fillColor;

		// Clip the fill image based on the temperature to make it look like its filling up
		thermometerCanvas.ctx.save();
		thermometerCanvas.ctx.beginPath();
		thermometerCanvas.ctx.rect(0, size.height - fillHeight, size.width, fillHeight);
		thermometerCanvas.ctx.clip();
		thermometerCanvas.ctx.drawImage(images.fillImg.img, 0, 0, size.width, size.height);
		thermometerCanvas.ctx.restore();

		// Recolour the fill
		thermometerCanvas.ctx.save();
		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.fillRect(0, size.height - fillHeight, size.width, fillHeight);
		thermometerCanvas.ctx.globalCompositeOperation = "source-over";
		thermometerCanvas.ctx.drawImage(images.baseImg.img, 0, 0, size.width, size.height);

		// Recolour the shell, but with a low opacity
		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.globalAlpha = 0.25;
		thermometerCanvas.ctx.fillRect(0, 0, size.width, size.height);
		thermometerCanvas.ctx.restore();

		// Add the up or down arrows
		if (Weather.BodyTemperature.direction !== 0) {
			const img = Weather.BodyTemperature.direction > 0 ? images.upImg.img : images.downImg.img;
			thermometerCanvas.ctx.drawImage(img, 13, 2, img.width, img.height);
			if (Weather.BodyTemperature.direction > 0) {
				thermometerCanvas.ctx.fillStyle = normalisedTemperature > 0.5 ? color.max : color.mid;
			} else {
				thermometerCanvas.ctx.fillStyle = normalisedTemperature <= 0.5 ? color.max : color.mid;
			}
			thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
			thermometerCanvas.ctx.fillRect(13, 2, img.width, img.height);
		}

		updateTooltip();
	}

	function updateTooltip() {
		const tempDescription = Weather.TooltipDescriptions.bodyTemperature();
		const waterDescription = `<br>${Weather.TooltipDescriptions.waterTemperature()}`;
		const fatigueModifier = categorise(Weather.BodyTemperature.fatigueModifier, 1, setup.WeatherSettings.temperature.effects.maxFatigueGainMultiplier, 4);
		const arousalModifier = categorise(Weather.BodyTemperature.arousalModifier, 1, setup.WeatherSettings.temperature.effects.maxArousalGainMultiplier, 4);
		const painModifier = categorise(Weather.BodyTemperature.painModifier, 1, setup.WeatherSettings.temperature.effects.maxPainGainMultiplier, 4);
		const stressModifier = categorise(Weather.BodyTemperature.stressModifier, 0, setup.WeatherSettings.temperature.effects.lowerMaxStressGain, 4);

		const arousalOutput = arousalModifier > 0 ? `<span class="teal">${"- ".repeat(Math.abs(arousalModifier))}Arousal gains</span><br>` : "";
		const fatigueOutput = fatigueModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(fatigueModifier))}Fatigue gains</span><br>` : "";
		const painOutput = painModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(painModifier))}Pain gains</span><br>` : "";
		const stressOutput = stressModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(stressModifier))}Stress gains</span><br>` : "";
		const modifiers =
			arousalOutput || fatigueOutput || painOutput || stressOutput ? "<br>" + arousalOutput + fatigueOutput + painOutput + stressOutput : "";

		const direction = Weather.BodyTemperature.direction > 0 ? "(increasing)" : Weather.BodyTemperature.direction < 0 ? "(decreasing)" : "";
		// eslint-disable-next-line prettier/prettier
		const debug = V.debug ? `<br><br><span class="teal">DEBUG:</span><br><span class="blue">Passage:</span> <span class="yellow">${V.passage}</span>
			<br><span class="blue">Time:</span> <span class="yellow">${ampm()}</span>
			<br><span class="blue">Body temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)} ${direction}</span>
			<br><span class="blue">Body wetness:</span> <span class="yellow">${Math.round(Weather.wetness * 100)}%</span>
			<br><span class="blue">Clothing warmth:</span> <span class="yellow">${Weather.BodyTemperature.getTotalWarmth()}</span>
			<br><span class="blue">Target temperature (current clothing)</span> <span class="yellow">${Weather.toSelectedString(
				Weather.BodyTemperature.getRestingPoint(6)
			)}</span>`
			: "";
		tooltipElement.tooltip({
			message: tempDescription + waterDescription + modifiers + debug,
			delay: 200,
			position: "cursor",
		});
	}

	return Object.create({
		element,
		tooltipElement,
		loaded,
		load,
		update,
		updateTooltip,
	});
})();

Macro.add("thermometer", {
	handler() {
		Weather.Thermometer.element.appendTo(this.output);
		Weather.Thermometer.tooltipElement.appendTo(this.output);
		if (!Weather.Thermometer.loaded.value) {
			Weather.Thermometer.loaded.value = true;
			Weather.Thermometer.load();
			return;
		}
		Weather.Thermometer.update();
	},
});
