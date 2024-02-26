/* eslint-disable no-undef */
/**
 * Sky gradient effect, simulating transitions between different times of day
 *
 * @param {number} radius The radius of the radial gradient in pixels. Determines how far the gradient extends from the center position.
 *
 * Dynamic parameters (bindings):
 * @param {object} color Object containing color scheme for the gradient. It has three properties,
 * 	each representing a different time of day with two sub-properties for gradient colors:
 *   colorMin: { close: "color", far: "color" } - Represents the night-time color scheme.
 *   colorMed: { close: "color", far: "color" } - Represents dawn/dusk color scheme.
 *   colorMax: { close: "color", far: "color" } - Represents the daytime color scheme.
 * @param {object} position An object { x, y } indicating the center of the radial gradient on the canvas.
 * @param {number} factor Numeric value between -1 and 1 that determines the blend between the three color schemes.
 * 	A factor of -1 corresponds to "colorMin", 0 to "colorMed", and 1 to "colorMax",
 */
WeatherEffects.create({
	name: "skyGradiant",
	draw() {
		const { x, y } = this.position;
		const sunGradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius);

		// Interpolate between night - dawn/dusk - day
		const color1 = ColourUtils.interpolateTripleColor(this.color.colorMin.close, this.color.colorMed.close, this.color.colorMax.close, this.factor);
		const color2 = ColourUtils.interpolateTripleColor(this.color.colorMin.far, this.color.colorMed.far, this.color.colorMax.far, this.factor);

		sunGradient.addColorStop(0, color1);
		sunGradient.addColorStop(1, color2);

		this.canvas.ctx.fillStyle = sunGradient;
		this.canvas.fillRect();
	},
});

/**
 * Generates a random star-field on init() based on the starsConfig parameters.
 * Rotates the starfield on draw() based on the rotation binding.
 *
 * @param {number} area Diameter of the starfield canvas.
 *   @param {number} starsConfig.minDistance Minimum distance between stars in pixels to avoid overlap.
 *   @param {number} starsConfig.count Total number of stars to generate within the area.
 *   @param {string[]} starsConfig.colorRange Array of colors for randomly assigning star colors. It interpolates between any of the first colours to the last colour in the array.
 * @param {object} pivot The { x, y } pivot point around which the starfield rotates.
 * @param {boolean} rotationClockwise Determines the direction of star field rotation. true for clockwise, false for anti-clockwise.
 *   @param {number} opacity.night Opacity of stars during night.
 *   @param {number} opacity.day Opacity of stars during day.
 *   @param {number} opacity.bloodMoon Opacity of stars during blood moon.
 * @param {object} spriteOptions Properties of different star types - keys must equal to the below images keys
 *     - {number} weight: The likelihood of this star type being chosen relative to others.
 *     - {number} glowSize: The size of the glow effect around the star.
 *     - {string} glowColor: Color for the glow effect (optional).
 *     - {boolean} randomColor: default false - If false, the star's color will not be randomized and will use the base color of the sprite.
 * @param {object} images Star sprite images
 *
 * Dynamic parameters (bindings):
 * @param {number} alpha Global alpha applied to the entire star field.
 * @param {number} rotation The angle of rotation for the star field in degrees.
 * @param {object} moonPosition The { x, y } position of the simulated moon within the canvas.
 * @param {number} moonDiameter Diameter of the simulated moon used to cull stars that are "behind" the moon.
 */
WeatherEffects.create({
	name: "skyStarField",
	init() {
		// Returns a random star based on the weights from spriteOptions
		const getRandomStar = () => {
			const options = Object.entries(this.spriteOptions).map(([key, value]) => {
				return { key, weight: value.weight };
			});
			const totalWeight = options.reduce((sum, { weight }) => sum + weight, 0);
			let choice = Math.random() * totalWeight;
			for (const { key, weight } of options) {
				if ((choice -= weight) < 0) {
					return key;
				}
			}
		};

		// Returns a random colour based on the starsConfig colorRange array
		const getRandomStarColor = spriteKey => {
			const spriteOption = this.spriteOptions[spriteKey];
			if (spriteOption && spriteOption.randomColor === false) {
				return "transparent";
			}
			const interpolateFrom = this.starsConfig.colorRange;
			const interpolateTo = interpolateFrom.slice(0, -1)[0];

			if (!interpolateFrom.length) return interpolateTo;
			return ColourUtils.interpolateColor(either(interpolateFrom), interpolateTo, Math.random());
		};

		const radius = this.area / 2;
		this.stars = [];

		// Create all the stars
		for (let i = 0; i < this.starsConfig.count; i++) {
			let tooClose;
			let attempts = 0;
			let newStar;
			// Make sure it doesn't generate stars too close to other stars
			do {
				const distance = Math.random() * radius; // Random radius
				const angle = Math.random() * Math.PI * 2; // Random angle

				const spriteKey = getRandomStar();

				// Since we are generating in a circular area we have to convert the radius/distance to x/y coordinates
				newStar = {
					x: this.pivot.x + distance * Math.cos(angle),
					y: this.pivot.y + distance * Math.sin(angle),
					sprite: spriteKey === "square" ? null : this.images[spriteKey],
					color: getRandomStarColor(spriteKey),
					glowSize: this.spriteOptions[spriteKey].glowSize,
					glowColor: this.spriteOptions[spriteKey].glowColor,
				};

				// Check distance from existing stars
				for (const star of this.stars) {
					const dx = newStar.x - star.x;
					const dy = newStar.y - star.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < this.starsConfig.minDistance) {
						tooClose = true;
						break;
					}
				}

				// Give up if too many attempts
				attempts++;
				if (attempts > 100) {
					break;
				}
			} while (tooClose);

			if (!tooClose) {
				this.stars.push(newStar);
			}
		}
	},
	draw() {
		const directionMultiplier = this.rotationClockwise ? 1 : -1;
		const radians = directionMultiplier * this.rotation * (Math.PI / 180);
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);
		this.canvas.ctx.globalAlpha = this.alpha;

		// Rotate the stars around the pivot point
		this.stars.forEach(star => {
			const relativeX = star.x - this.pivot.x;
			const relativeY = star.y - this.pivot.y;
			const rotatedX = cos * relativeX - sin * relativeY + this.pivot.x;
			const rotatedY = sin * relativeX + cos * relativeY + this.pivot.y;

			// Cull stars that are behind the moon - since the moon shadow is transparent
			const dx = rotatedX - this.moonPosition.x;
			const dy = rotatedY - this.moonPosition.y;
			const distanceFromMoonCenter = Math.sqrt(dx * dx + dy * dy);
			if (distanceFromMoonCenter < this.moonDiameter / 2 + 1) {
				return;
			}

			// Draw the stars
			this.canvas.ctx.save();
			if (star.sprite) {
				if (star.glowSize) {
					this.canvas.ctx.shadowColor = star.glowColor || star.color;
					this.canvas.ctx.shadowBlur = star.glowSize;
				}
				this.canvas.drawImage(star.sprite, rotatedX, rotatedY);

				if (star.color !== "transparent") {
					this.canvas.ctx.globalCompositeOperation = "source-atop";
					this.canvas.ctx.fillStyle = star.color;
					this.canvas.ctx.fillRect(rotatedX, rotatedY, star.sprite.width, star.sprite.height);
				}
			} else {
				this.canvas.ctx.fillStyle = star.color;
				this.canvas.ctx.fillRect(rotatedX, rotatedY, 2, 2);
			}
			this.canvas.ctx.restore();
		});
	},
});
