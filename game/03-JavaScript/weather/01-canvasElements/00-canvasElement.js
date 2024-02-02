/* eslint-disable no-undef */
/*
	WARNING: Do not modify this file before the next update.
	It's getting a major refactor and everything below will be replaced.
*/
class SkyCanvasElement {
	constructor(name) {
		if (!arguments[0]) return;

		this.name = name;
		this.settings = Weather.SkySettings[this.name];
		this.sprites = [];

		this.position = {};
		this.expandFactor = 0.1;
		this.createCanvasImage();
	}

	createCanvasImage() {
		this.canvas = $("<canvas/>", { id: this.name });
		this.canvasElement = this.canvas[0];
		this.ctx = this.canvasElement.getContext("2d");

		this.canvasElement.width = Weather.SkySettings.canvasDimensions.width;
		this.canvasElement.height = Weather.SkySettings.canvasDimensions.height;

		const x = 0;
		const y = 0;
		this.canvas.css({ left: `${x}px`, top: `${y}px` });
		this.loadSprites();
	}

	loadSprites() {
		if (this.settings.images instanceof Map) {
			// If images is a Map
			this.settings.images.forEach((value, key) => {
				const img = new Image();
				img.src = this.settings.imgPath + key;
				this.sprites.push({ img, type: value });
			});
		} else if (this.settings.images) {
			const img = new Image();
			img.src = this.settings.images;
			this.sprites.push(img);
		}
	}

	loaded() {
		const loadSprites = this.sprites.map((sprite, index) => {
			const img = sprite.img ? sprite.img : sprite;
			return new Promise(resolve => {
				img.onload = resolve;
				img.onerror = e => {
					console.error("Error loading sprite:", img.src);
					this.sprites.splice(index, 1);
					resolve();
				};
			});
		});
		return Promise.all(loadSprites);
	}

	// Modifier determines how much of the sprite overlaps. Modifier of 1 means 100% of the sprite has to overlap with the other sprite.
	isSpriteOverlap(spriteA, spriteB, modifier = 1) {
		const xOverlap = Math.max(0, Math.min(spriteA.x + spriteA.sprite.width, spriteB.x + spriteB.sprite.width) - Math.max(spriteA.x, spriteB.x));
		const yOverlap = Math.max(0, Math.min(spriteA.y + spriteA.sprite.height, spriteB.y + spriteB.sprite.height) - Math.max(spriteA.y, spriteB.y));

		// Calculate the area of intersection
		const intersectionArea = xOverlap * yOverlap;

		// Determine the minimum overlap required (based on spriteA's area and the modifier)
		const minOverlapArea = spriteA.sprite.width * spriteA.sprite.height * modifier;

		// Check if the intersecting area meets the minimum overlap requirement
		return intersectionArea >= minOverlapArea;
	}

	setOrbit(currentTime, orbit) {
		this.orbit = orbit ?? this.orbit;
		this.riseTime = this.orbit.riseTime * Time.secondsPerHour;
		this.setTime = this.orbit.setTime * Time.secondsPerHour;

		// Adjusts for overnight duration if needed
		if (this.setTime < this.riseTime) {
			this.setTime += Time.secondsPerDay;
		}

		const timePercent = this.calculateTimePercent(currentTime);
		const position = this.getElementPosition(timePercent);

		this.position.adjustedX = position.x;
		this.position.adjustedY = position.y;
	}

	calculateTimePercent(currentTime) {
		const expandedDuration = (this.setTime - this.riseTime) / (1 - 2 * this.expandFactor);
		let elapsed = currentTime - (this.riseTime - this.expandFactor * expandedDuration);
		if (elapsed < 0) elapsed += Time.secondsPerDay;
		return Math.clamp(elapsed / expandedDuration, 0, 1);
	}

	getElementPosition(timePercent) {
		timePercent = Math.clamp(timePercent, 0, 1);
		const adjustedTimePercent = (timePercent - this.expandFactor) / (1 - 2 * this.expandFactor);
		const x = lerp(Math.clamp(adjustedTimePercent, 0, 1), this.orbit.path.startX, this.orbit.path.endX);

		const bottomY = this.orbit.path.horizon + 100; // 100 pixels below the horizon
		const peakY = this.orbit.path.peakY;

		// Adjusting amplitude and baseline to make the sun start and end at bottomY
		const amplitude = (peakY - bottomY) / 2;
		const baselineY = bottomY + amplitude; // Adjusted baseline to be in the middle of bottomY and peakY

		const factor = 1 - 4 * Math.pow(adjustedTimePercent - 0.5, 2);
		const y = baselineY + amplitude * factor;

		return { x, y };
	}

	draw() {}
}
window.SkyCanvasElement = SkyCanvasElement;
