setup.Locations = {
	alex_cottage: () => "alex_cottage",
	alex_farm: () => (V.bus === "woodland" ? "forest" : "alex_farm"),
	alley: () => (V.bus === "industrial" ? "ind_alley" : V.bus === "residential" ? "res_alley" : "com_alley"),
	home: () => "home",
	town: () => "town",
	park: () => "park",
	forest: () => "forest",
	get() {
		return typeof this[V.location] === "function" ? this[V.location]() : "home";
	},
};

setup.LocationImages = {
	alex_cottage: {
		normal: "alex_cottage.png",
		snow: "alex_cottage_w.png",
		emissive: "alex_cottage_e.png",
	},
	alex_farm: {
		normal: "alex_farm.png",
		snow: "alex_farm_w.png",
		emissive: {
			image: "alex_farm_e.png",
			color: "#deae66",
			strength: 2,
		},
	},
	com_alley: {
		normal: {
			image: "com_alley.png",
			animation: {
				fps: 6,
				delay: () => random(5, 30) * 1000,
			},
		},
		snow: "com_alley_w.png",
		normal_blood: {
			image: "com_alley_b.png",
			animation: {
				fps: 6,
				delay: () => random(10, 60) * 1000,
			},
		},
		emissive: {
			image: "com_alley_e.png",
			color: "#deae66",
			strength: 2,
		},
	},
	res_alley: {
		normal: {
			image: "res_alley.png",
			animation: {
				fps: 1,
				delay: () => random(4, 15) * 1000,
			},
		},
		snow: {
			image: "res_alley_w.png",
			animation: {
				fps: 1,
				delay: () => random(4, 15) * 1000,
			},
		},
	},
	ind_alley: {
		normal: {
			image: "ind_alley.png",
			animation: {
				fps: 6,
				delay: () => random(4, 15) * 1000,
			},
		},
		snow: {
			image: "ind_alley_w.png",
			animation: {
				fps: 6,
				delay: () => random(4, 15) * 1000,
			},
		},
		emissive: {
			image: "ind_alley_e.png",
			color: "#deae66",
			strength: 2,
		},
	},
	home: {
		normal: {
			image: "home.png",
			animation: {
				fps: 6,
				delay: 3000,
			},
		},
		snow: {
			image: "home_w.png",
			animation: {
				fps: 6,
				delay: 2000,
			},
		},
		emissive: "home_e.png",
	},
	town: {
		normal: {
			image: "town.png",
			animation: {
				fps: 7,
				delay: () => random(5, 15) * 1000,
			},
		},
		snow: {
			image: "town_w.png",
			animation: {
				fps: 7,
				delay: () => random(5, 15) * 1000,
			},
		},
		emissive: {
			image: "town_e.png",
			animation: "parent",
			color: "#deae66",
		},
	},
	forest: {
		normal: {
			image: "forest.png",
			animation: {
				fps: 6,
				delay: () => random(5, 15) * 1000,
			},
		},
		snow: {
			image: "forest_w.png",
			animation: {
				fps: 6,
				delay: () => random(5, 15) * 1000,
			},
		},
		normal_blood: "forest_b.png",
		snow_blood: "forest_b_w.png",
	},
	sea: {
		normal: {
			image: "sea.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		snow: {
			image: "sea.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
	},
	sea_pirates: {
		normal: {
			image: "sea_pirates.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		snow: {
			image: "sea_pirates.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		emissive: {
			image: "sea_pirates_e.png",
			animation: "parent",
			color: "#deae66",
		},
	},
	promenade: {
		normal: {
			image: "promenade.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		snow: {
			image: "promenade_s.png",
			animation: {
				fps: 6,
				delay: () => 5000,
			},
		},
		emissive: "promenade_e.png",
	},
	park: {
		normal: {
			default: {
				image: "park.png",
				animation: {
					fps: 5,
					delay: () => 0,
				},
			},
			treebirds: {
				condition: () => Time.dayState !== "night",
				image: "park_treebirds.png",
				animation: {
					method: "overlay",
					fps: 3,
					delay: () => random(2, 10) * 1000,
				},
			},
			flyingbird: {
				condition: () => Time.dayState === "dawn" || Time.dayState === "dusk",
				image: "park_flyingbird.png",
				animation: {
					method: "overlay",
					fps: 6,
					delay: () => random(10, 30) * 1000,
				},
			},
		},
		snow: "park_w.png",
		emissive: {
			image: "park_e.png",
			color: "#deae6633",
		},
	},
};
