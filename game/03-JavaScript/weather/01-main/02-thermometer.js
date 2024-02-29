/* eslint-disable no-new */
Weather.Thermometer = (() => {
	const minTemperature = 34;
	const maxTemperature = 40;
	const minClip = 4; // Minimum clipping from the bottom in pixels
	const maxClip = 0; // Maximum clipping from the top in pixels
	const scaleFactor = 2;
	let thermometerCanvas = null;
	const baseImg = new Image();
	const fillImg = new Image();
	const size = {
		width: 0,
		height: 0,
	};
	const element = $("<div />", { id: "characterTemperature" });
	const loaded = new ObservableValue(false);

	function load() {
		loaded.value = true;
		thermometerCanvas = new Weather.Sky.Canvas(0, 0);
		baseImg.onload = () => {
			size.width = baseImg.width * scaleFactor;
			size.height = baseImg.height * scaleFactor;
			thermometerCanvas.element.width = size.width;
			thermometerCanvas.element.height = size.height;
			thermometerCanvas.ctx.imageSmoothingEnabled = false;
			element.append(thermometerCanvas.canvas);
		};
		fillImg.onload = update;

		baseImg.src = setup.WeatherSettings.thermometer.base;
		fillImg.src = setup.WeatherSettings.thermometer.fill;
	}

	function update() {
		thermometerCanvas.clear();
		const normalisedTemperature = normalise(Weather.bodyTemperature, maxTemperature, minTemperature);
		const usableHeight = size.height - minClip - maxClip; // Deduct minClip and maxClip from total height for usable area
		const fillHeight = interpolate(minClip, usableHeight + minClip, normalisedTemperature);

		// Calculate the factor for color interpolation
		// Adjusted to range from -1 (minTemperature) through 0 (midTemperature) to 1 (maxTemperature)
		const midTemperature = (maxTemperature + minTemperature) / 2;
		let colorFactor = (Weather.bodyTemperature - midTemperature) / (maxTemperature - midTemperature);

		// Ensure factor stays within the [-1, 1] range
		colorFactor = Math.max(-1, Math.min(1, colorFactor));
		// Define your color extremes
		const colorMin = "#000dff"; // Color at minimum temperature
		const colorMid = "#00ff91"; // Color at midpoint temperature
		const colorMax = "#ff0000"; // Color at maximum temperature

		// Get the interpolated color based on current temperature
		const fillColor = ColourUtils.interpolateTripleColor(colorMin, colorMid, colorMax, colorFactor);
		thermometerCanvas.ctx.fillStyle = fillColor;
		thermometerCanvas.ctx.globalAlpha = 1.0;
		thermometerCanvas.ctx.globalCompositeOperation = "source-over";

		thermometerCanvas.ctx.save();
		thermometerCanvas.ctx.beginPath();
		thermometerCanvas.ctx.rect(0, size.height - fillHeight, size.width, fillHeight);
		thermometerCanvas.ctx.clip();
		thermometerCanvas.ctx.drawImage(fillImg, 0, 0, size.width, size.height);
		thermometerCanvas.ctx.restore();
		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.fillRect(0, size.height - fillHeight, size.width, fillHeight);
		thermometerCanvas.ctx.globalCompositeOperation = "source-over";
		thermometerCanvas.ctx.drawImage(baseImg, 0, 0, size.width, size.height);

		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.globalAlpha = 0.25;
		thermometerCanvas.ctx.fillRect(0, 0, size.width, size.height);
	}

	function updateTooltip() {
		const tempDescription = Weather.TooltipDescriptions.bodyTemperature();
		// eslint-disable-next-line prettier/prettier
		const debug = V.debug
			? `<br><span class="teal">DEBUG:</span><br><span class="blue">Body temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)}</span>`
			: "";
		element.tooltip({
			message: `${tempDescription}<br>${debug}`,
			delay: 200,
			position: "cursor",
		});
	}

	return Object.create({
		element,
		loaded,
		load,
		update,
		updateTooltip,
	});
})();

Macro.add("thermometer", {
	handler() {
		Weather.Thermometer.element.appendTo(this.output);
		if (!Weather.Thermometer.loaded.value) {
			Weather.Thermometer.load();
		}
		Weather.Thermometer.update();
		Weather.Thermometer.updateTooltip();
	},
});
