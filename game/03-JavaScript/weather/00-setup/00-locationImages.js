/*
	Temporary until we have a better system for locations
*/
setup.Locations = {
	alex_farm: () => (V.bus === "woodland" ? "forest" : "alex_farm"),
	alley: () => {
		if (V.bus === "industrial") return "ind_alley";
		if (V.bus === "residential") return "res_alley";
		return "com_alley";
	},
	cafe: () => {
		if (V.chef_state >= 9) return "cafe_renovated";
		if (V.chef_state >= 7) return "cafe_construction";
		return "cafe";
	},
	get() {
		if (typeof this[V.location] === "function") {
			return this[V.location]();
		}
		if (setup.LocationImages && Object.hasOwn(setup.LocationImages, V.location)) {
			return V.location;
		}
		return "home";
	},
};

/*
Additional animation settings:
- Lock to specific other animation
- repeat: none - makes it not repeat
- 

sss

*/
setup.LocationImages = {
	alex_cottage: {
		folder: "alex_cottage",
		base: "base.png",
		snow: "snow.png",
		emissive: "emissive.png",
	},
	alex_farm: {
		folder: "alex_farm",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	arcade: {
		folder: "arcade",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	beach: {
		folder: "beach",
		base: {
			image: "base.png",
			animation: {
				fps: 4,
				delay: () => 2000,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 4,
				delay: () => 2000,
			},
		},
	},
	asylum: {
		folder: "asylum",
		base: {
			default: {
				image: "base.png",
			},
			clockMinute: {
				condition: () => V.hallucinations < 1,
				image: "clock1.png",
				frame: () => {
					const numFrames = 8;
					const segmentSize = 60 / numFrames;
					return Math.floor(((Time.minute + segmentSize / 2) / segmentSize) % numFrames);
				},
			},
			clockHour: {
				condition: () => V.hallucinations < 1,
				image: "clock2.png",
				frame: () => {
					const numFrames = 8;
					const segmentSize = 12 / numFrames;
					return Math.floor((((Time.hour % 12) + segmentSize / 2) / segmentSize) % numFrames);
				},
			},
			clockHallucinationMinute: {
				condition: () => V.hallucinations >= 1,
				image: "clock1.png",
				animation: {
					fps: 8,
					delay: () => 0,
				},
			},
			clockHallucinationHour: {
				condition: () => V.hallucinations >= 1,
				image: "clock2.png",
				animation: {
					fps: 1,
					delay: () => 0,
				},
			},
			
		},
		//snow: "alex_farm_w.png",
		// emissive: {
		// 	image: "alex_farm_e.png",
		// 	color: "#deae66",
		// 	strength: 2,
		// },
	},
	cafe: {
		folder: "cafe",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	cafe_construction: {
		folder: "cafe_construction",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	cafe_renovated: {
		folder: "cafe_renovated",
		base: "base.png",
		snow: "snow.png",
	},
	com_alley: {
		folder: "com_alley",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => random(5, 30) * 1000,
			},
		},
		snow: "snow.png",
		base_blood: {
			image: "bloodmoon.png",
			animation: {
				fps: 6,
				delay: () => random(10, 60) * 1000,
			},
		},
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	bog: {
		folder: "bog",
		base: {
			image: "base.png",
			animation: {
				fps: 0.5,
				delay: () => 1000,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 0.5,
				delay: () => 1000,
			},
		},
	},
	res_alley: {
		folder: "res_alley",
		base: {
			image: "base.png",
			animation: {
				fps: 1,
				delay: () => random(4, 15) * 1000,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 1,
				delay: () => random(4, 15) * 1000,
			},
		},
	},
	ind_alley: {
		folder: "ind_alley",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => random(4, 15) * 1000,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 6,
				delay: () => random(4, 15) * 1000,
			},
		},
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	home: {
		folder: "home",
		base: {
			default: {
				image: "base.png",
			},
			smoke: {
				condition: () => !Time.bloodMoon,
				image: "smoke.png",
				animation: {
					fps: 6,
					delay: () => 3000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			smoke: {
				condition: () => !Weather.bloodMoon,
				image: "smoke.png",
				animation: {
					fps: 6,
					delay: () => 3000,
				},
			},
		},
		emissive: "emissive.png",
	},
	town: {
		folder: "town",
		base: {
			default: {
				image: "base.png",
			},
			drivingCar: {
				condition: () => !Weather.bloodMoon,
				image: "drivingcar.png",
				waitForAnimation: "flickeringLights",
				animation: {
					method: "overlay",
					fps: 7,
					delay: () => random(5, 15) * 1000,
				},
			},
			parkedCar: {
				condition: () => !Weather.bloodMoon,
				image: "parkedcar.png",
			},
			cat: {
				condition: () => Time.dayState === "night",
				image: "cat.png",
				animation: {
					fps: 4,
					delay: () => random(2, 7) * 1000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			drivingCar: {
				image: "drivingcar.png",
				waitForAnimation: "flickeringLights",
				animation: {
					method: "overlay",
					fps: 7,
					delay: () => random(5, 15) * 1000,
				},
			},
			parkedCar: {
				image: "parkedcar_snow.png",
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				alwaysDrawFirstFrame: false,
				animation: "drivingCar",
				color: "#deae66",
			},
			flickeringLights: {
				waitForAnimation: "drivingCar",
				image: "emissive_flicker.png",
				alwaysDrawFirstFrame: false,
				color: "#deae66",
				animation: {
					fps: 4,
					delay: () => random(5, 20) * 1000,
				},
			},
		},
	},
	forest: {
		folder: "forest",
		base: {
			default: {
				image: "base.png",
			},
			birds_light: {
				condition: () => !Weather.bloodMoon,
				image: "birds_light.png",
				animation: {
					fps: 6,
					delay: () => random(5, 15) * 1000,
				},
			},
			bloodmoon: {
				condition: () => Weather.bloodMoon,
				image: "bloodmoon.png",
				animation: {
					fps: 4,
					delay: () => random(2, 7) * 1000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			birds_dark: {
				condition: () => !Weather.bloodMoon,
				image: "birds_dark.png",
				animation: {
					fps: 6,
					delay: () => random(5, 15) * 1000,
				},
			},
			bloodmoon: {
				condition: () => Weather.bloodMoon,
				image: "bloodmoon.png",
				animation: {
					fps: 4,
					delay: () => random(2, 7) * 1000,
				},
			},
		},
		emissive_blood: {
			blood0: {
				image: "emissive_blood0.png",
				animation: {
					fps: 5,
					delay: () => random(2, 7) * 1000,
				},
			},
			blood1: {
				image: "emissive_blood1.png",
				animation: {
					fps: 0.5,
					delay: () => random(4, 10) * 1000,
				},
			},
			blood2: {
				image: "emissive_blood2.png",
				animation: {
					fps: 5,
					delay: () => random(4, 11) * 1000,
				},
			},
			blood3: {
				image: "emissive_blood3.png",
				animation: {
					fps: 5,
					delay: () => random(3, 12) * 1000,
				},
			},
			color: "#e63e3e",
		},
	},
	sea: {
		folder: "sea",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		snow: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
	},
	sea_pirates: {
		folder: "sea_pirates",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		snow: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		emissive: {
			image: "emissive.png",
			animation: "parent",
			color: "#deae66",
		},
	},
	promenade: {
		folder: "promenade",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		emissive: "emissive.png",
	},
	park: {
		folder: "park",
		base: {
			default: {
				image: "base.png",
			},
			fountain: {
				image: "fountain.png",
				animation: {
					fps: 5,
					delay: () => 0,
				},
			},
			treebirds: {
				condition: () => Time.dayState !== "night",
				// Not at same time as flyingbird
				waitForAnimation: "flyingbird",
				image: "treebirds.png",
				animation: {
					fps: 3,
					delay: () => random(2, 10) * 1000,
				},
			},
			flyingbird: {
				condition: () => Time.dayState === "dawn" || Time.dayState === "dusk",
				// Not at same time as treebirds
				waitForAnimation: "treebirds",
				image: "flyingbird.png",
				animation: {
					fps: 6,
					delay: () => random(10, 30) * 1000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			fountain: {
				image: "fountain.png",
				frame: 0,
			},
		},
		emissive: {
			image: "emissive.png",
			color: "#deae66a5",
		},
	},
};
