// /* eslint-disable no-undef */

// WeatherEffects.create({
// 	name: "fogEffect",
// 	defaultParameters: {
// 		colorTop: "#000000",
// 		colorMiddle: "#999999",
// 		colorBottom: "#ffffff",
// 		midOffset: 0.7,
// 	},
// 	init() {
// 		const gradient = this.canvas.ctx.createLinearGradient(0, 0, 0, this.canvas.element.height);
// 		gradient.addColorStop(0, this.colorTop);
// 		gradient.addColorStop(this.midOffset, this.colorMiddle);
// 		gradient.addColorStop(1, this.colorBottom);
// 		this.canvas.ctx.fillStyle = gradient;
// 	},
// 	draw() {
// 		this.canvas.fillRect();
// 	},
// });

// WeatherEffects.create({
// 	name: "skyGradiant",
// 	defaultParameters: {
// 		radius: 128,
// 	},
// 	draw() {
// 		const { x, y } = this.orbital.position;
// 		const sunGradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius);

// 		const color1 = ColourUtils.interpolateTripleColor(this.color.colorNeg.close, this.color.colorMed.close, this.color.colorPos.close, this.orbital.factor);
// 		const color2 = ColourUtils.interpolateTripleColor(this.color.colorNeg.far, this.color.colorMed.far, this.color.colorPos.far, this.orbital.factor);
// 		sunGradient.addColorStop(0, color1);
// 		sunGradient.addColorStop(1, color2);

// 		this.canvas.ctx.fillStyle = sunGradient;
// 		this.canvas.fillRect();
// 	},
// });

// WeatherEffects.create({
// 	name: "skyOrbital",
// 	defaultParameters: {},
// 	images: { orbital: "img/misc/sky/sun.png" },
// 	draw() {
// 		const x = this.position.x - this.images.orbital.width / 2;
// 		const y = this.position.y - this.images.orbital.height / 2;

// 		this.canvas.ctx.drawImage(this.images.orbital, x, y, this.images.orbital.width, this.images.orbital.height);
// 		//this.effects[0].draw();
// 		//this.canvas.ctx.drawImage(this.effects[0].canvas.element, 0, 0);
// 	},
// });

// // WeatherEffects.create({
// // 	name: "skyOrbital",
// // 	defaultParameters: {},
// // 	images: { orbital: "img/misc/sky/sun.png" },
// // 	draw() {
// // 		const x = this.position.x - this.images.orbital.width / 2;
// // 		const y = this.position.y - this.images.orbital.height / 2;

// // 		this.canvas.ctx.drawImage(this.images.orbital, x, y, this.images.orbital.width, this.images.orbital.height);
// // 		//this.effects[0].draw();
// // 		//this.canvas.ctx.drawImage(this.effects[0].canvas.element, 0, 0);
// // 	},
// // });


// WeatherEffects.create({
// 	name: "outerRadialGlow",
// 	defaultParameters: {
// 		innerRadius: 2, // Inset the glow into the circle to look more natural
// 	},
// 	init() {
// 		this.radius = this.diameter / 2;
// 		this.colorStopMiddle = this.radius / (this.radius + this.outerRadius);
// 		this.glowRadius = this.radius / 2 + this.outerRadius;
// 	},
// 	draw() {
// 		const gradient = this.canvas.ctx.createRadialGradient(
// 			this.position.x,
// 			this.position.y,
// 			0,
// 			this.position.x,
// 			this.position.y,
// 			this.radius + this.outerRadius
// 		);
// 		const color1 = ColourUtils.interpolateColor(this.colorInside.dark, this.colorInside.bright, this.factor);
// 		const color2 = ColourUtils.interpolateColor(this.colorOutside.dark, this.colorOutside.bright, this.factor);

// 		gradient.addColorStop(0, color1);
// 		gradient.addColorStop(this.colorStopMiddle, color1);
// 		gradient.addColorStop(1, color2);

// 		this.canvas.ctx.fillStyle = gradient;
// 		this.canvas.fillRect();

// 		// Cut away the middle to make any texture more pronounced
// 		this.canvas.ctx.globalCompositeOperation = "destination-out";
// 		this.canvas.ctx.fillStyle = "black";
// 		this.canvas.ctx.beginPath();
// 		this.canvas.ctx.arc(this.position.x, this.position.y, this.radius - this.innerRadius, 0, 2 * Math.PI);
// 		this.canvas.ctx.fill();
// 	},
// });

// WeatherEffects.create({
// 	name: "innerRadialGlow",
// 	defaultParameters: {
// 		innerRadius: 5,
// 	},
// 	init() {
// 		this.radius = this.diameter / 2 - 1;
// 		// Calculate where the inner glow is most prominent
// 		this.glowStart = (this.radius - this.innerRadius) / this.radius;
// 	},
// 	draw() {
// 		const { x, y } = this.position;

// 		console.log("INNER RADIAL", this);
// 		// Create a radial gradient for the inner glow
// 		const gradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius);
// 		const color1 = ColourUtils.interpolateColor(this.colorOutside.min, this.colorOutside.max, this.factor);
// 		const color2 = ColourUtils.interpolateColor(this.colorInside.min, this.colorInside.max, this.factor);

// 		gradient.addColorStop(0, color2);
// 		gradient.addColorStop(this.glowStart, color2);
// 		gradient.addColorStop(1, color1);

// 		this.canvas.ctx.fillStyle = gradient;
// 		this.canvas.ctx.beginPath();
// 		this.canvas.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
// 		this.canvas.ctx.fill();
// 	},
// });

// WeatherEffects.create({
// 	name: "moonWithPhases",
// 	images: { orbital: "img/misc/sky/moon.png" },
// 	effects: [
// 		{
// 			effect: "moonPhase",
// 			params: {},
// 			bindings: {
// 				position() {
// 					return this.position;
// 				},
// 				diameter() {
// 					return this.images.orbital.width;
// 				},
// 				moonPhaseFraction() {
// 					return this.moonPhaseFraction;
// 				},
// 			},
// 		},
// 	],
// 	init() {
// 		this.effects[1].init();
// 	},
// 	draw() {
// 		const x = this.position.x - this.images.orbital.width / 2;
// 		const y = this.position.y - this.images.orbital.height / 2;

// 		const opacity = interpolate(this.opacity.max, this.opacity.min, normalise(this.factor, 1, -1));
// 		this.canvas.ctx.globalAlpha = opacity;

// 		// Outer glow
// 		this.canvas.ctx.shadowBlur = this.glow.size;
// 		this.canvas.ctx.shadowColor = this.glow.color;

// 		// Moon with shadow from moon phase
// 		this.effects[0].draw();
// 		this.canvas.ctx.drawImage(this.effects[0].canvas.element, 0, 0);

// 		this.canvas.ctx.globalAlpha = interpolate(this.shadow.opacity.max / opacity, this.shadow.opacity.min / opacity, normalise(this.factor, 1, -1));
// 		console.log("GLOBAL ALPHA", this.canvas.ctx.globalAlpha);
// 		this.canvas.ctx.globalCompositeOperation = "destination-over";
// 		this.canvas.ctx.drawImage(this.images.orbital, x, y, this.images.orbital.width, this.images.orbital.height);
// 	},
// });
// WeatherEffects.create({
// 	name: "moonPhase",
// 	images: { orbital: "img/misc/sky/moon.png" },
// 	effects: [
// 		{
// 			effect: "innerRadialGlow",
// 			params: {
// 				innerRadius: 4,
// 				colorInside: { min: "#ffffff00", max: "#ffffff00" },
// 				colorOutside: { min: "#ffffffee", max: "#ffffffee" },
// 				factor: 1,
// 			},
// 			bindings: {
// 				position() {
// 					return this.position;
// 				},
// 				diameter() {
// 					return this.images.orbital.width;
// 				},
// 			},
// 		},
// 		{
// 			effect: "moonShadow",
// 			params: {},
// 			bindings: {
// 				position() {
// 					return this.position;
// 				},
// 				diameter() {
// 					return this.images.orbital.width;
// 				},
// 				moonPhaseFraction() {
// 					return this.moonPhaseFraction;
// 				},
// 			},
// 		},
// 	],
// 	init() {
// 		this.effects[1].init();
// 	},
// 	draw() {
// 		const x = this.position.x - this.images.orbital.width / 2;
// 		const y = this.position.y - this.images.orbital.height / 2;

// 		this.canvas.ctx.drawImage(this.images.orbital, x, y, this.images.orbital.width, this.images.orbital.height);

// 		// Inner glow
// 		this.effects[0].draw();
// 		this.canvas.ctx.drawImage(this.effects[0].canvas.element, 0, 0);

// 		// Inner shadow (phase)
// 		this.effects[1].draw();
// 		this.canvas.ctx.globalCompositeOperation = "destination-out";
// 		this.canvas.ctx.drawImage(this.effects[1].canvas.element, 0, 0);
// 	},
// });

// WeatherEffects.create({
// 	name: "moonShadow",
// 	init() {
// 		// diameter // position
// 		this.shadowCanvas = new WeatherCanvas.Canvas();
// 		const { x, y } = this.position;

// 		this.radius = this.diameter / 2 + 2; // + 2 to prevent any edges
// 		let moonPhaseFraction = this.moonPhaseFraction;

// 		console.log("this.diameter", this.diameter);
// 		console.log("this.position", this.position);

// 		this.shadowCanvas.ctx.translate(x, y);
// 		this.shadowCanvas.ctx.rotate((this.shadow.angle * Math.PI) / 180);
// 		this.shadowCanvas.ctx.translate(-x, -y);

// 		this.shadowCanvas.ctx.fillStyle = "black";
// 		this.shadowCanvas.ctx.beginPath();

// 		// Calculate the shadow arc offset based on the moon-phase
// 		let antiClockwise = false;
// 		let flippedRadius = this.radius;

// 		if (moonPhaseFraction > 0.5) {
// 			antiClockwise = true;
// 			moonPhaseFraction = 1 - moonPhaseFraction;
// 			flippedRadius = -this.radius;
// 		}
// 		const fraction = moonPhaseFraction * 4;
// 		console.log("fraction", fraction);

// 		// Offset depends on if it's before or after half-moon
// 		const offset = fraction <= 1 ? flippedRadius * 2 * (1 - fraction) : flippedRadius * 2 * (0.5 - Math.abs(0.5 - fraction));
// 		console.log("offset", offset);

// 		if (fraction === 0) {
// 			// New moon
// 			this.shadowCanvas.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
// 		} else if (fraction === 2) {
// 			// Full moon
// 			return;
// 		} else {
// 			// Other phases
// 			this.shadowCanvas.ctx.moveTo(x, y - this.radius);
// 			if (fraction < 2) {
// 				this.shadowCanvas.ctx.arc(x, y, this.radius, Math.PI / 2, (3 * Math.PI) / 2, antiClockwise);
// 			} else {
// 				this.shadowCanvas.ctx.arc(x, y, this.radius, (3 * Math.PI) / 2, Math.PI / 2, !antiClockwise);
// 			}
// 			this.shadowCanvas.ctx.quadraticCurveTo(x + offset, y, x, y + this.radius);
// 		}

// 		this.shadowCanvas.ctx.closePath();
// 		this.shadowCanvas.ctx.fill();
// 	},
// 	draw() {
// 		this.canvas.ctx.drawImage(this.shadowCanvas.element, 0, 0);
// 	},
// });
