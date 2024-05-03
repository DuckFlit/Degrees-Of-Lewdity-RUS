/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
Weather.Sky.Animation = class Animation {
	constructor(options) {
		this.image = options.image;
		this.targetCanvas = options.canvas;

		this.numFrames = resolveValue(options.numFrames, 0);
		this.frameDelay = resolveValue(options.frameDelay, 0);
		this.cycleDelay = resolveValue(options.cycleDelay, 0);
		this.startDelay = resolveValue(options.startDelay, 0);
		this.currentFrame = resolveValue(options.currentFrame, 0);
		this.alwaysDisplay = resolveValue(options.alwaysDisplay, true);

		this.startX = resolveValue(options.startX, 0);
		this.startY = resolveValue(options.startY, 0);
		this.offset = resolveValue(options.offset, 0);

		this.waitForAnimation = options.waitForAnimation;
		this.condition = options.condition;
		this.parentAnimation = options.parentAnimation;
		this.childAnimations = [];

		this.timeSinceLastFrame = 0;
		this.timeSinceCycleEnd = 0;
		this.inCycle = true;
		this.enabled = false;
		this.canDraw = true;

		// Initialize the start delay if any
		this.startDelayRemaining = this.startDelay;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	canUpdate(parentAnimationGroup) {
		this.canDraw = true;
		if (this.waitForAnimation && parentAnimationGroup.isAnimationRunning(this.waitForAnimation)) {
			if (!this.alwaysDisplay) this.canDraw = false;
			return false;
		}
		if (this.condition) {
			return this.condition();
		}
		return true;
	}

	update(deltaTime) {
		if (!this.enabled) return false;

		// Manage start delay before the actual animation begins
		if (this.handleStartDelay(deltaTime)) return false;

		// Handle the cycle's inactive phase
		if (!this.inCycle && this.handleCycleDelay(deltaTime)) return false;

		// Process the active animation frame updates
		return this.processFrameUpdates(deltaTime);
	}

	handleStartDelay(deltaTime) {
		if (this.startDelayRemaining > 0) {
			this.startDelayRemaining -= deltaTime;
			if (this.startDelayRemaining <= 0) {
				this.timeSinceLastFrame = -this.startDelayRemaining; // Compensate for delay overshoot
				this.startDelayRemaining = -1;
			}
			return true;
		}
		return false;
	}

	handleCycleDelay(deltaTime) {
		if (this.timeSinceCycleEnd < this.cycleDelay) {
			this.timeSinceCycleEnd += deltaTime;
			if (this.timeSinceCycleEnd >= this.cycleDelay) {
				this.inCycle = true;
				this.timeSinceCycleEnd = 0;
			}
			return true;
		}
		return false;
	}

	processFrameUpdates(deltaTime) {
		this.timeSinceLastFrame += deltaTime;
		if (this.timeSinceLastFrame >= this.frameDelay) {
			this.currentFrame = (this.currentFrame + 1) % this.numFrames;
			this.timeSinceLastFrame -= this.frameDelay; // Compensate for frame delay overshoot
			if (this.currentFrame === 0) {
				this.inCycle = false;
				this.timeSinceCycleEnd = 0;
			}
			return true;
		}
		return false;
	}

	draw() {
		if (this.condition && !this.condition()) {
			return;
		}

		if (!this.parentAnimation && !this.alwaysDisplay && !this.canDraw) {
			return;
		}

		const frameX = (this.offset || this.targetCanvas.element.width) * this.currentFrame;
		const width = this.targetCanvas.element.width;
		const height = this.image.height;
		this.targetCanvas.ctx.drawImage(this.image, frameX, 0, width, height, this.startX, this.startY, width, height);

		// Also draw child animations
		this.childAnimations.forEach(animation => {
			animation.currentFrame = this.currentFrame;
		});
	}
};
