/*
	Temporary until we have a better system for locations
	Exceptions are defined here
	Otherwise locations will match the folder name
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
	brothel: {
		folder: "brothel",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	cabin: {
		folder: "cabin",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 2,
		},
	},
	canal: {
		folder: "canal",
		base: {
			image: "base.png",
			animation: {
				fps: 1,
				delay: () => 0,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 5,
				delay: () => random(5, 10) * 1000,
			},
		},
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
	churchyard: {
		folder: "churchyard",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#a8b5ff",
			size: 8,
		},
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
	compound: {
		folder: "compound",
		base: {
			default: {
				image: "base.png",
			},
			smoke: {
				condition: () => !Weather.bloodMoon,
				image: "smoke.png",
				animation: {
					fps: 4,
					delay: 0,
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
					fps: 4,
					delay: 0,
				},
			},
		},
	},
	dance_studio: {
		folder: "dance_studio",
		base: "base.png",
		snow: "snow.png",
	},
	dilapidated_shop: {
		folder: "dilapidated_shop",
		base: "base.png",
		snow: "snow.png",
	},
	docks: {
		folder: "docks",
		base: {
			default: {
				image: "base.png",
			},
			boat: {
				// Not at same time as cruiser
				waitForAnimation: "cruiser",
				image: "boat.png",
				animation: {
					fps: 0.15,
					delay: () => random(2, 100) * 1000,
					delayFirst: false,
					startFrame: () => random(0, 24),
				},
			},
			cruiser: {
				condition: () => Time.dayState !== "night",
				// Not at same time as boat
				waitForAnimation: "boat",
				image: "cruiser.png",
				animation: {
					fps: 0.1,
					delay: () => random(2, 100) * 1000,
					startFrame: () => random(0, 24),
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			boat: {
				// Not at same time as cruiser
				waitForAnimation: "cruiser",
				image: "boat.png",
				animation: {
					fps: 0.1,
					delay: () => random(10, 100) * 1000,
				},
			},
			cruiser: {
				condition: () => Time.dayState !== "night",
				// Not at same time as boat
				waitForAnimation: "boat",
				image: "cruiser.png",
				animation: {
					fps: 0.1,
					delay: () => random(10, 100) * 1000,
				},
			},
		},
	},
	drain: {
		folder: "drain",
		base: {
			default: {
				image: "base.png",
			},
			drain: {
				condition: () => !Weather.isFreezing,
				image: "drain.png",
				animation: {
					fps: 4,
					delay: () => 0,
				},
			},
			water: {
				image: "water.png",
				animation: {
					fps: 1,
					delay: () => 2000,
				},
			},
		},
	},
	estate: {
		folder: "estate",
		base: "base.png",
		snow: "snow.png",
		emissive: "emissive.png",
	},
	factory: {
		folder: "factory",
		base: {
			default: {
				image: "base.png",
			},
			lorry_back: {
				condition: () => Time.dayState !== "night" && Time.dayState !== "day",
				image: "lorry_back.png",
			},
			lorry_front: {
				condition: () => Time.dayState !== "night",
				image: "lorry_front.png",
			},
			gate: {
				condition: () => Time.dayState !== "night",
				image: "gate.png",
			},
			inside: {
				condition: () => Time.dayState !== "night",
				image: "inside.png",
				waitForAnimation: "lorry_moving",
				animation: {
					fps: 6,
					delay: () => random(5, 15) * 1000,
				},
			},
			lorry_moving: {
				condition: () => Time.dayState !== "night",
				image: "lorry_moving.png",
				waitForAnimation: "inside",
				animation: {
					fps: 6,
					delay: () => random(10, 30) * 1000,
				},
			},
		},
		// snow: {
		// 	default: {
		// 		image: "snow.png",
		// 	},
		// },
		emissive: {
			lights: {
				image: "emissive.png",
				color: "#b91313",
			},
			stop_lights: {
				image: "lights_emissive.png",
				alwaysDrawFirstFrame: true,
				animation: "lorry_moving",
				color: "#b91313",
			},
			lorry_lights: {
				image: "lorry_emissive.png",
				alwaysDrawFirstFrame: false,
				animation: "lorry_moving",
				color: "#f7e092",
			},
			inside_lights: {
				image: "inside_emissive.png",
				alwaysDrawFirstFrame: false,
				animation: "inside",
				color: "#f7e092",
			},
		},
	},
	farm: {
		folder: "farm",
		base: "base.png",
		snow: "snow.png",
	},
	flats: {
		folder: "flats",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			color: "#deae66",
			strength: 5,
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
	forest_shop: {
		folder: "forest_shop",
		base: "base.png",
		snow: "snow.png",
		emissive: "emissive.png",
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
	hospital: {
		folder: "hospital",
		base: "base.png",
		snow: "snow.png",
		emissive: "emissive.png",
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
	island: {
		folder: "island",
		base: {
			image: "base.png",
			animation: {
				fps: 2,
				delay: () => 500,
			},
		},
	},
	kylar_manor: {
		folder: "kylar_manor",
		base: "base.png",
		snow: "snow.png",
	},
	lake_ruin: {
		folder: "lake_ruin",
		base: {
			image: "base.png",
			animation: {
				fps: 0.6,
				delay: () => 0,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 0.6,
				delay: () => 0,
			},
		},
		bloodmoon: {
			image: "bloodmoon.png",
			animation: {
				fps: 3,
				delay: () => 0,
			},
		},
		bloodmoon_snow: {
			image: "bloodmoon_snow.png",
			animation: {
				fps: 3,
				delay: () => 0,
			},
		},
		emissive_blood: {
			image: "emissive_blood.png",
			animation: "bloodmoon",
			color: "#e63e3e",
		},
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
	pound: {
		folder: "pound",
		base: {
			default: {
				image: "base.png",
			},
			cage: {
				condition: () => !Weather.bloodMoon,
				image: "cage.png",
				animation: {
					fps: 2,
					delay: () => random(3, 15) * 1000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			cage: {
				condition: () => !Weather.bloodMoon,
				image: "cage.png",
				animation: {
					fps: 2,
					delay: () => random(3, 15) * 1000,
				},
			},
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
			animation: "base",
			color: "#deae66",
		},
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
				alwaysDrawFirstFrame: false,
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
};
