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
	/*
	TEMPLE
	<<case "temple">>
				<<if Time.year is 361>>
					<img id="location" @src="_imgLoc + _weather_display + '/temple'+_dayState+'_old.png'">
				<<else>>
					<img id="location" @src="_imgLoc + _weather_display + '/temple'+_dayState+'.png'">
				<</if>>
	*/
	/* ADULT SHOP
	<<case "adult_shop">>
				<<getadultshopstate>>
				<<if Time.dayState is "day" and $adultshopstate isnot "closed">>
					<img id="location" @src="_imgLoc + _weather_display + '/sex_shop'+_dayState+'_open.gif'">
				<<elseif Time.dayState is "night" or Time.dayState is "dusk">>
					<img id="location" @src="_imgLoc + _weather_display + '/sex_shop'+_dayState+'.gif'">
				<<else>>
					<img id="location" @src="_imgLoc + _weather_display + '/sex_shop'+_dayState+'.png'">
				<</if>>
	*/
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
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	alex_farm: {
		folder: "alex_farm",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	arcade: {
		folder: "arcade",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			red: {
				image: "emissive_red.png",
				color: "#e36c59",
				size: 2,
			},
			yellow: {
				image: "emissive_yellow.png",
				condition: () => Weather.lightsOn,
				color: "#dcdb99cc",
				size: 2,
			},
			green: {
				image: "emissive_green.png",
				condition: () => Weather.lightsOn,
				color: "#4bc248",
				size: 2,
			},
			orange: {
				image: "emissive_orange.png",
				condition: () => Weather.lightsOn,
				color: "#f59442",
				size: 2,
			},
			purple: {
				image: "emissive_purple.png",
				condition: () => Weather.lightsOn,
				color: "#cf51ca",
				size: 2,
			},
			blue: {
				image: "emissive_blue.png",
				condition: () => Weather.lightsOn,
				color: "#4f6edb",
				size: 2,
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
	},
	beach: {
		folder: "beach",
		base: {
			default: {
				image: "base.png",
			},
			water: {
				image: "water.png",
			},
			tree: {
				image: "tree.png",
				animation: {
					fps: 4,
					delay: () => 2000,
				},
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 4,
				delay: () => 2000,
			},
		},
		reflective: {
			image: "reflective.png",
			backgroundOnly: true,
			animation: "tree",
			blur: 0,
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
		emissive_blood: {
			image: "emissive_blood.png",
			color: "#e63e3e66",
			size: 15,
		},
	},
	brothel: {
		folder: "brothel",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
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
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	canal: {
		folder: "canal",
		base: {
			default: {
				image: "base.png",
			},
			water: {
				image: "water.png",
				animation: {
					fps: 1,
					delay: () => 0,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			drip: {
				image: "drip.png",
				animation: {
					fps: 6,
					delay: () => random(5, 15) * 1000,
				},
			},
		},
		reflective: {
			image: "reflective.png",
		},
	},
	cafe: {
		folder: "cafe",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
		reflective: {
			image: "reflective.png",
		},
	},
	cafe_construction: {
		folder: "cafe_construction",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
		reflective: {
			image: "reflective.png",
		},
	},
	cafe_renovated: {
		folder: "cafe_renovated",
		base: "base.png",
		snow: "snow.png",
		reflective: {
			image: "reflective.png",
		},
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
			image: "blood§n.png",
			animation: {
				fps: 6,
				delay: () => random(10, 60) * 1000,
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
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
			water: {
				image: "water.png",
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
			water: {
				image: "water.png",
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
		reflective: {
			image: "reflective.png",
			alpha: 0.6,
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
		reflective: {
			image: "reflective.png",
			alpha: 0.6,
		},
	},
	estate: {
		folder: "estate",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
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
				condition: () => Weather.lightsOn,
				size: 3,
				color: "#e7eb81",
			},
			stop_lights: {
				image: "lights_emissive.png",
				alwaysDrawFirstFrame: true,
				animation: "lorry_moving",
				size: 5,
				color: "#e34d4d",
			},
			lorry_lights: {
				image: "lorry_emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDrawFirstFrame: false,
				animation: "lorry_moving",
				size: 10,
				color: "#f7e092",
			},
			lorry_back_lights: {
				image: "lorry_back_emissive.png",
				alwaysDrawFirstFrame: false,
				animation: "lorry_moving",
				size: 4,
				color: "#e34d4d",
			},
			inside_lights: {
				image: "inside_emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDrawFirstFrame: false,
				animation: "inside",
				color: "#e6cc77",
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
		base: {
			default: {
				image: "base.png",
			},
			water: {
				image: "water.png",
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			water: {
				image: "water.png",
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDrawFirstFrame: false,
				color: "#deae66",
				size: 4,
			},
			spotLight: {
				waitForAnimation: "drivingCar",
				condition: () => Weather.lightsOn,
				image: "spotlight.png",
				color: "#9cabff",
				size: 4,
			},
		},
		reflective: {
			image: "reflective.png",
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
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
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
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	hospital: {
		folder: "hospital",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
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
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	island: {
		folder: "island",
		base: {
			default: {
				image: "base.png",
			},
			water: {
				image: "water.png",
				animation: {
					fps: 2,
					delay: () => 500,
				},
			}
		},
		reflective: {
			image: "reflective.png",
			animation: "water",
			horizon: 122,
			alpha: 0.25,
			blur: 0.8,
		},
	},
	kylar_manor: {
		folder: "kylar_manor",
		base: "base.png",
		snow: "snow.png",
	},
	lake: {
		folder: "lake",
		base: {
			default: {
				image: "base.png",
			},
			water: {
				image: "water.png",
				animation: {
					fps: 1,
					delay: () => 0,
				},
			},
			deer: {
				condition: () => Time.dayState === "dawn",
				image: "deer.png",
				animation: {
					fps: 6,
					delay: () => 12000,
				},
			},
		},
		snow: {
			image: "snow.png",
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			animation: {
				fps: 4,
				delay: () => 0,
			},
			color: "#deae66",
			strength: 2,
		},
		emissive_blood: {
			blood0: {
				image: "blood0.png",
				animation: {
					fps: 5,
					delay: () => random(2, 7) * 1000,
				},
			},
			blood1: {
				image: "blood1.png",
				animation: {
					fps: 0.5,
					delay: () => random(4, 10) * 1000,
				},
			},
			blood2: {
				image: "blood2.png",
				animation: {
					fps: 5,
					delay: () => random(4, 11) * 1000,
				},
			},
			color: "#e63e3e",
		},
		reflective: {
			image: "reflective.png",
			horizon: 156,
		},
	},
	lake_ruin: {
		folder: "lake_ruin",
		base: {
			default: {
				image: "base.png",
				animation: {
					fps: 0.3,
					delay: () => 5000,
				},
			},
			water: {
				image: "water.png",
				animation: {
					fps: 1,
					delay: () => 0,
				},
			}
		},
		snow: {
			default: {
				image: "snow.png",
				animation: {
					fps: 0.3,
					delay: () => 5000,
				},
			},
			water: {
				image: "water.png",
				animation: {
					fps: 1,
					delay: () => 0,
				},
			}
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
		reflective: {
			default: {
				condition: () => !Weather.bloodMoon,
				image: "reflective.png",
			},
			bloodMoon: {
				condition: () => Weather.bloodMoon,
				image: "reflective_blood.png",
			},
			horizon: 112,
		},
	},
	market: {
		folder: "market",
		base: "base.png",
		snow: "snow.png",
	},
	moor: {
		folder: "moor",
		base: {
			default: {
				image: "base.png",
			},
			grass: {
				image: "grass.png",
				animation: {
					fps: 3,
					delay: () => random(1, 8) * 1000,
				},
			},
			wind: {
				image: "wind.png",
				animation: {
					fps: 12,
					delay: () => random(5, 15) * 1000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			wind: {
				image: "wind.png",
				animation: {
					fps: 12,
					delay: () => random(5, 15) * 1000,
				},
			},
		},
		reflective: {
			image: "reflective.png",
			horizon: 112,
		},
	},
	night_monster_lair: {
		folder: "night_monster_lair",
		base: {
			default: {
				image: "base.png",
			},
			beast: {
				image: "beast.png",
				condition: () => Time.dayState === "morning",
				animation: {
					fps: 3,
					delay: () => random(1, 5) * 1000,
				},
			},
			drip: {
				image: "drip.png",
				animation: {
					fps: 3,
					delay: () => 4000,
				},
			},
			flies: {
				image: "drip.png",
				condition: () => Time.dayState !== "morning",
				animation: {
					fps: 3,
					delay: () => 0,
				},
			},
			rat: {
				image: "rat.png",
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
			beast: {
				image: "beast.png",
				condition: () => Time.dayState === "morning",
				animation: {
					fps: 3,
					delay: () => random(1, 5) * 1000,
				},
			},
			drip: {
				image: "drip.png",
				animation: {
					fps: 3,
					delay: () => 4000,
				},
			},
			flies: {
				image: "drip.png",
				condition: () => Time.dayState !== "morning",
				animation: {
					fps: 3,
					delay: () => 0,
				},
			},
			rat: {
				image: "rat.png",
				animation: {
					fps: 6,
					delay: () => random(10, 30) * 1000,
				},
			},
		},
	},
	office: {
		folder: "office",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			default: {
				image: "emissive.png",
				condition: () => Weather.lightsOn,
			},
			evening: {
				image: "emissive_evening.png",
				condition: () => Weather.lightsOn && Time.dayState === "dusk",
			},
			redBlinkingLight: {
				image: "red.png",
				color: "#ff5058",
				size: 3,
				animation: {
					fps: 1,
					delay: () => 1000,
				},
			},
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
			condition: () => Weather.lightsOn,
			color: "#deae66a5",
		},
	},
	pool: {
		folder: "pool",
		base: {
			image: "base.png",
			animation: {
				fps: 4,
				delay: () => 0,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 4,
				delay: () => 0,
			},
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
	prison: {
		folder: "prison",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 0,
			},
		},
		snow: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 0,
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
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
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
	riding_school: {
		folder: "riding_school",
		base: {
			image: "base.png",
			animation: {
				fps: 6,
				delay: () => 0,
			},
		},
		snow: {
			image: "snow.png",
			animation: {
				fps: 6,
				delay: () => 0,
			},
		},
	},
	school: {
		folder: "school",
		base: {
			default: {
				image: "base.png",
			},
			autumn: {
				image: "autumn.png",
			},
		},
		snow: "snow.png",
	},
	school_rear_courtyard: {
		folder: "school_rear_courtyard",
		base: "base.png",
		snow: "snow.png",
	},
	sea: {
		folder: "sea",
		base: {
			image: "base.png",
			animation: {
				fps: 3,
				delay: () => 0,
			},
		},
		reflective: {
			image: "reflective.png",
			alpha: 0.8,
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
			condition: () => Weather.lightsOn,
			animation: "base",
			color: "#deae66",
		},
	},
	sepulchre: {
		folder: "sepulchre",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			eyes: {
				image: "eyes.png",
				condition: () => Weather.lightsOn,
				color: "#e15151",
			},
			gem: {
				image: "gem.png",
				color: "#5b6ee1",
			},
		},
	},
	shopping_centre: {
		folder: "shopping_centre",
		base: "base.png",
		snow: "snow.png",
	},
	spa: {
		folder: "spa",
		base: {
			default: {
				image: "base.png",
				animation: {
					fps: 6,
					delay: () => 0,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
				animation: {
					fps: 6,
					delay: () => 0,
				},
			},
		},
		emissive: {
			emissive_dawn: {
				image: "emissive_dawn.png",
				condition: () => Time.dayState === "dawn",
				color: "#e6de57",
				size: 10,
			},
			light: {
				image: "emissive_lights.png",
				condition: () => Weather.lightsOn,
				color: "#e6de57dd",
				size: 20,
				animation: {
					fps: 0.5,
					delay: () => 2000,
				},
			},
		},
	},
	strip_club: {
		folder: "strip_club",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			windows: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_windows.png",
				size: 2,
			},
			green: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_green.png",
				color: "#74ff9099",
				size: 2,
			},
			pink1: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_pink1.png",
				color: "#ff4fd6",
				size: 0,
			},
			pink2: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_pink.png",
				color: "#fe99ff99",
				size: 4,
			},
			purple: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_purple.png",
				color: "#a91dff",
				size: 0,
			},
			red: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_red.png",
				color: "#ff1d2f",
				size: 0,
			},
			blue: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_blue.png",
				color: "#a6f8ff",
				size: 0,
			},
			lady: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_lady_pose.png",
				animation: {
					fps: 1,
					delay: () => 1000,
				},
				color: "#ff60a099",
				size: 3,
			},
			hair: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_lady_hair.png",
				color: "#d8294899",
				size: 3,
			},
		},
	},
	studio: {
		folder: "studio",
		base: "base.png",
		snow: "snow.png",
		emissive: {
			default: {
				image: "emissive.png",
				condition: () => Weather.lightsOn && between(Time.hour, 18, 23),
			},
		},
	},
	tentworld: {
		folder: "tentworld",
		base: {
			default: {
				image: "base.png",
				animation: {
					fps: 2,
					delay: () => 0,
				},
			},
			movingtent: {
				image: "moving_tentacle.png",
				animation: {
					fps: 3,
					delay: () => random(1, 9) * 1000,
				},
			},
		},
	},
	tower: {
		folder: "tower",
		base: {
			default: {
				image: "base.png",
			},
			wind: {
				image: "wind.png",
				animation: {
					fps: 12,
					delay: () => random(5, 15) * 1000,
				},
			},
		},
		snow: {
			default: {
				image: "snow.png",
			},
			wind: {
				image: "wind.png",
				animation: {
					fps: 12,
					delay: () => random(5, 15) * 1000,
				},
			},
		},
		emissive: {
			bonfire: {
				condition: () => getBirdBurnTime() > 0,
				image: "bonfire.png",
				animation: {
					fps: 4,
					delay: () => random(0, 700),
				},
				color: "#deae66",
				size: 5,
			},
		},
		emissive_blood: {
			image: "emissive_blood.png",
			color: "#e63e3e66",
			size: 5,
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
				condition: () => Weather.lightsOn,
				alwaysDrawFirstFrame: false,
				animation: "drivingCar",
				color: "#deae66",
				size: 4,
			},
			flickeringLights: {
				waitForAnimation: "drivingCar",
				condition: () => Weather.lightsOn,
				image: "emissive_flicker.png",
				alwaysDrawFirstFrame: false,
				color: "#deae66",
				size: 4,
				animation: {
					fps: 3,
					delay: () => random(5, 20) * 1000,
				},
			},
		},
	},
};
