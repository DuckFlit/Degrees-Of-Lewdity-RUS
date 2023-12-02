/* eslint-disable no-undef */
class SkyCanvasSun extends SkyCanvasElement {
	loaded() {
		return new Promise((resolve, reject) => {
			this.img.onload = () => {
				this.canvasElement.width = this.img.width + this.settings.glow.outerSize * 5;
				this.canvasElement.height = this.img.height + this.settings.glow.outerSize * 5;
				this.position.bottom = this.getElementPosition(1);
				this.position.diameter = this.img.width;
				this.spriteDiameter = this.position.diameter + 1;
				this.radius = this.spriteDiameter / 2;
				this.centerPos = (this.canvasElement.width - this.spriteDiameter) / 2 + this.radius;
				this.addGlowEffect();
				resolve();
			};
			this.img.onerror = reject;
		});
	}

	addGlowEffect() {
		this.offscreenCanvas = $("<canvas/>")[0];
		this.offscreenCanvas.width = this.canvasElement.width;
		this.offscreenCanvas.height = this.canvasElement.height;
		const offscreenCtx = this.offscreenCanvas.getContext("2d");

		offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

		const glowRadius = this.radius / 2 + this.settings.glow.outerSize;
		const gradient = offscreenCtx.createRadialGradient(this.centerPos, this.centerPos, 0, this.centerPos, this.centerPos, this.radius + glowRadius);
		gradient.addColorStop(0, this.settings.glow.dayColor);
		gradient.addColorStop(0.3, this.settings.glow.dayColor);
		gradient.addColorStop(1, "transparent");

		offscreenCtx.fillStyle = gradient;
		offscreenCtx.fillRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

		// Cut away most of the inner glow to make the texture appear
		offscreenCtx.globalCompositeOperation = "destination-out";
		offscreenCtx.fillStyle = "black";
		offscreenCtx.beginPath();
		offscreenCtx.arc(this.centerPos, this.centerPos, this.radius - this.settings.glow.innerSize, 0, 2 * Math.PI);
		offscreenCtx.fill();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

		this.ctx.drawImage(this.offscreenCanvas, 0, 0);

		this.ctx.globalCompositeOperation = "destination-over";
		this.ctx.drawImage(this.img, this.centerPos - this.radius, this.centerPos - this.radius, this.img.width, this.img.height);

		const x = this.position.adjustedX - this.canvasElement.width / 2;
		const y = this.position.adjustedY - this.canvasElement.height / 2;
		this.canvas.css({
			left: `${x}px`,
			top: `${y}px`,
		});
	}
}
window.SkyCanvasSun = SkyCanvasSun;
