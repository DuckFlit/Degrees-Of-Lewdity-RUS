/* eslint-disable no-undef */
WeatherEffects.create({
	name: "precipitation",
	defaultParameters: {
		animationFrames: [],
		animation: null,
		position: {
			diagonalOffset: 0,
			offset: 0,
		},
	},
	init() {
		this.stopAnimation = () => this.animation?.stop();
		this.startAnimation = () => this.animation?.start();

		const scaledFrameWidth = this.originalFrameWidth * this.scale;
		const scaledFrameHeight = this.images.precipitation.height * this.scale;
		const numFrames = this.images.precipitation.width / this.originalFrameWidth;

		const spriteRows = Math.max(1, Math.ceil(this.canvas.element.height / scaledFrameHeight));

		const effectiveFrameWidth = scaledFrameWidth + this.position.offset; // New effective frame width considering the offset
		const spriteColumns = Math.max(1, Math.ceil((this.canvas.element.width - this.position.offset) / effectiveFrameWidth));

		const precipitationSheet = new Weather.Sky.Canvas(scaledFrameWidth * numFrames * spriteColumns, scaledFrameHeight * spriteRows);
		const precipitationFrame = new Weather.Sky.Canvas(scaledFrameWidth * spriteColumns, scaledFrameHeight * spriteRows);
		precipitationFrame.ctx.imageSmoothingEnabled = false;

		for (let i = 0; i < numFrames; i++) {
			precipitationFrame.clear();

			for (let r = 0; r < spriteRows; r++) {
				const rowOffset = r * this.position.diagonalOffset * this.scale;
				const adjustedColumns = spriteColumns + (rowOffset < 0 ? Math.ceil(Math.abs(rowOffset) / effectiveFrameWidth) : 0);

				const y = r * scaledFrameHeight;
				for (let c = 0; c < adjustedColumns; c++) {
					// Apply this.offset to the x-coordinate calculation
					const x = c * effectiveFrameWidth + rowOffset + this.position.offset;
					const frameX = i * this.originalFrameWidth;

					if (x + scaledFrameWidth > 0 && x < precipitationFrame.element.width) {
						precipitationFrame.ctx.drawImage(this.images.precipitation, frameX, 0, this.originalFrameWidth, this.images.precipitation.height, x, y, scaledFrameWidth, scaledFrameHeight);
					}
				}
			}

			const destX = i * scaledFrameWidth * spriteColumns;
			precipitationSheet.ctx.drawImage(precipitationFrame.element, 0, 0, precipitationFrame.element.width, precipitationFrame.element.height, destX, 0, precipitationFrame.element.width, precipitationFrame.element.height);
		}

		this.frameTotalWidth = precipitationSheet.element.width / numFrames;
		this.animation = new Weather.Sky.Animation(precipitationSheet.element, this.fps, numFrames, 0, this.onFrame);
	},

	draw() {
		if (!this.animation.enabled) this.startAnimation();
		this.canvas.ctx.globalAlpha = this.alpha;
		this.animation.draw(this.canvas.ctx, 0, 0, this.canvas.element.width, this.canvas.element.height, this.canvas.element.width, this.canvas.element.height, this.frameTotalWidth);
	},
});
