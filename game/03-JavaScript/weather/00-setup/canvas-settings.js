setup.SkySettings = {
	canvasSize: [64, 192],
	scale: 0.5, // Renders the canvas in half the resolution, then scales up - set it to 1 to render in the original resolution
	lightsTime: {
		on: 19,
		off: 7,
	},
	orbits: {
		sun: {
			summer: {
				// Sunrise, sunset, and height of the orbit can be changed, based on the season
				// Between summer and winter the actual values are interpolated between.
				riseTime: 7, // At what time the sun reaches the horizon before rising
				setTime: 19, // At what time the sun reaches the horizon before setting
				path: {
					startX: 0,
					endX: 64,
					peakY: 40, // The y value of the top of the orbit arc
					horizon: 162, // The y value of the horizon
				},
			},
			winter: {
				riseTime: 7,
				setTime: 19,
				path: {
					startX: -14, // Start offscreen
					endX: 64 + 14, // End offscreen
					peakY: 70,
					horizon: 162,
				},
			},
		},
		moon: {
			summer: {
				riseTime: 19,
				setTime: 7,
				path: {
					startX: -12, // Start offscreen
					endX: 64 + 12, // End offscreen
					peakY: 50, // The y value of the top of the orbit arc
					horizon: 162, // The y value of the horizon
				},
			},
			winter: {
				riseTime: 19,
				setTime: 7,
				path: {
					startX: -12, // Start offscreen
					endX: 64 + 12, // End offscreen
					peakY: 90,
					horizon: 162,
				},
			},
		},
		bloodmoon: {
			riseTime: 19,
			setTime: 7,
			path: {
				startX: -12,
				endX: 64 + 12,
				peakY: 40,
				horizon: 80,
			},
		},
	},
	fade: {
		overcast: {
			timeToFade: 60,
		},
	},
	blur: {
		minFactorToBlur: 0.4,
		fogMaxBlurValue: 2,
	},
};
