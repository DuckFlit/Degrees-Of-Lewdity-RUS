/* eslint-disable no-undef */
WeatherEffects.create({
	name: "outerRadialGlow",
	defaultParameters: {
		innerRadius: 3, // Inset the glow into the circle to look more natural
	},
	init() {
		this.radius = this.diameter / 2;
		this.colorStopMiddle = this.radius / (this.radius + this.outerRadius);
		this.glowRadius = this.radius / 2 + this.outerRadius;
	},
	draw() {
		const { x, y } = this.position;

		const gradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius + this.outerRadius);
		const color1 = ColourUtils.interpolateColor(this.colorInside.dark, this.colorInside.bright, this.factor);
		const color2 = ColourUtils.interpolateColor(this.colorOutside.dark, this.colorOutside.bright, this.factor);

		gradient.addColorStop(0, color1);
		gradient.addColorStop(this.colorStopMiddle, color1);
		gradient.addColorStop(1, color2);

		this.canvas.ctx.fillStyle = gradient;
		this.canvas.fillRect();

		// Cut away the middle to define the inner glow
		this.canvas.ctx.globalCompositeOperation = "destination-out";
		this.canvas.ctx.fillStyle = "black";
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(x, y, this.radius - this.innerRadius, 0, 2 * Math.PI);
		this.canvas.ctx.fill();
	},
});

WeatherEffects.create({
	name: "innerRadialGlow",
	defaultParameters: {
		innerRadius: 5,
	},
	init() {
		this.radius = this.diameter / 2 - 1;
		// Calculate where the inner glow is most prominent
		this.glowStart = (this.radius - this.innerRadius) / this.radius;
	},
	draw() {
		const { x, y } = this.position;

		const gradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius);
		const color1 = ColourUtils.interpolateColor(this.colorOutside.min, this.colorOutside.max, this.factor);
		const color2 = ColourUtils.interpolateColor(this.colorInside.min, this.colorInside.max, this.factor);

		gradient.addColorStop(0, color2);
		gradient.addColorStop(this.glowStart, color2);
		gradient.addColorStop(1, color1);

		this.canvas.ctx.fillStyle = gradient;
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
		this.canvas.ctx.fill();
	},
});
