/* eslint-disable no-undef */
WeatherEffects.create({
	name: "skyGradiant",
	defaultParameters: {
		radius: 128,
	},
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

WeatherEffects.create({
	name: "skyStarField",
	defaultParameters: {},
	init() {
		const getRandomStar = () => {
			const options = Object.keys(this.spriteWeights).map(key => {
				return [key, this.spriteWeights[key]];
			});
			return weightedRandom(...options);
		};

		const getRandomStarColor = () => {
			const interpolateFrom = this.starsConfig.colorRange;
			const interpolateTo = interpolateFrom.slice(0, -1)[0];

			if (!interpolateFrom.length) return interpolateTo;
			return ColourUtils.interpolateColor(either(interpolateFrom), interpolateTo, randomFloat(0, 1));
		};

		this.stars = [];

		for (let i = 0; i < this.starsConfig.count; i++) {
			let tooClose;
			let attempts = 0;
			let newStar;
			// Make sure it doesn't generate stars too close to other stars
			do {
				tooClose = false;
				const spriteKey = getRandomStar();
				newStar = {
					x: Math.random() * this.canvasArea.width,
					y: Math.random() * this.canvasArea.height,
					sprite: spriteKey === "square" ? null : this.images[spriteKey],
					color: getRandomStarColor(),
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
		console.log("INIT STARS");
	},
	// todo
	// Opacity?
	// Moon culling?
	draw() {
		console.log("DRAW STARS");
		const directionMultiplier = this.rotationClockwise ? 1 : -1;
		const radians = directionMultiplier * this.rotation * (Math.PI / 180);
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);

		this.stars.forEach(star => {
			const relativeX = star.x - this.canvasArea.width / 2;
			const relativeY = star.y - this.canvasArea.height / 2;
			const rotatedX = cos * relativeX - sin * relativeY + this.canvasArea.width / 2;
			const rotatedY = sin * relativeX + cos * relativeY + this.canvasArea.height / 2;

			if (star.sprite) {
				this.canvas.ctx.drawImage(star.sprite, rotatedX, rotatedY);
			} else {
				this.canvas.ctx.fillStyle = star.color;
				this.canvas.ctx.fillRect(rotatedX, rotatedY, 2, 2);
				console.log("ROTATED", rotatedX, rotatedY);
			}
		});
	},
});
