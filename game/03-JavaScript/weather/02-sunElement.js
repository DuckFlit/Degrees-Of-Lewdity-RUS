/* eslint-disable no-undef */
class SkyCanvasSun extends SkyCanvasElement {
	constructor(name, settings) {
		super(name, settings);
		this.loadSprites(); // Load the sun sprite
	}

	loaded() {
		// 'this.sprites[0]' refers to the sun image loaded in 'loadSprites'
		return new Promise((resolve, reject) => {
			this.sprites[0].onload = () => {
				this.canvasElement.width = this.sprites[0].width + this.settings.glow.outerSize * 5;
				this.canvasElement.height = this.sprites[0].height + this.settings.glow.outerSize * 5;
				this.position.bottom = this.getElementPosition(1);
				this.position.diameter = this.sprites[0].width;
				this.spriteDiameter = this.position.diameter + 1;
				this.radius = this.spriteDiameter / 2;
				this.centerPos = (this.canvasElement.width - this.spriteDiameter) / 2 + this.radius;

				this.offscreenCanvas = $("<canvas/>")[0];
				this.addGlowEffect(1);

				resolve();
			};
			this.sprites[0].onerror = reject;
		});
	}

	addGlowEffect(dayFactor) {
		// todo dayFactor?
		this.offscreenCanvas.width = this.canvasElement.width;
		this.offscreenCanvas.height = this.canvasElement.height;
		const offscreenCtx = this.offscreenCanvas.getContext("2d");

		offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

		const glowRadius = this.radius / 2 + this.settings.glow.outerSize;
		const gradient = offscreenCtx.createRadialGradient(this.centerPos, this.centerPos, 0, this.centerPos, this.centerPos, this.radius + glowRadius);
		const color = this.settings.glow.dayColor;

		gradient.addColorStop(0, color);
		gradient.addColorStop(0.3, color);
		gradient.addColorStop(1, "transparent");

		// ColourUtils.interpolateColor(this.settings.glow.nightColor, this.settings.glow.dayColor, dayFactor)
		// Overlay?

		offscreenCtx.fillStyle = gradient;
		offscreenCtx.fillRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

		// Cut away most of the inner glow to make the texture appear
		offscreenCtx.globalCompositeOperation = "destination-out";
		offscreenCtx.fillStyle = "black";
		offscreenCtx.beginPath();
		offscreenCtx.arc(this.centerPos, this.centerPos, this.radius - this.settings.glow.innerSize, 0, 2 * Math.PI);
		offscreenCtx.fill();
	}

	draw(dayFactor) {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		if (this.settings.glow.updateColor) this.addGlowEffect(dayFactor);
		this.ctx.drawImage(this.offscreenCanvas, 0, 0);

		this.ctx.globalCompositeOperation = "destination-over";
		this.ctx.drawImage(
			this.sprites[0],
			Math.round(this.centerPos - this.radius),
			Math.round(this.centerPos - this.radius),
			this.sprites[0].width,
			this.sprites[0].height
		);

		const x = this.position.adjustedX - this.canvasElement.width / 2;
		const y = this.position.adjustedY - this.canvasElement.height / 2;
		this.canvas.css({
			left: `${x}px`,
			top: `${y}px`,
		});
	}
}
window.SkyCanvasSun = SkyCanvasSun;
