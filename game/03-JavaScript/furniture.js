const Furniture = (() => {
	setup.furniture = new Map();

	/* Keep set to false, unless during developer testing. If on true, set to false unless in use. */
	const FORCE_UPDATE = false;

	const Categories = Object.freeze({ 
		bed			: 'bed', 
		table		: 'table', 
		chair		: 'chair',
		wardrobe	: 'wardrobe',
		decoration	: 'decoration',
		windowsill	: 'windowsill',
		poster		: 'poster',
		wallpaper	: 'wallpaper'
	});

	const Locations = Object.freeze({ 
		bedroom: "bedroom", 
		cabin: "cabin", 
		cottage: "cottage"
	});

	let target = Locations.bedroom;

	function furnitureInit() {
		const mapper = setup.furniture;

		/*
		mapper.chairs.set('name', {
			name: "stools", // name in lowercase
			nameCap: "Wooden stools", // capitalized name
			category: ["chair"], // used in the shop interface
			type: ["chair", "expensive"], // traits, can be multiple, shouldn't be shown because I'm too lazy to make a description /j
			cost: 69, //cost, 100 is one quid
			description: "Yo mom", // description for the shop interface to show
			iconFile: "stool.png", // used in image widgets; <img id="icon" @src="'img/misc/icon/' + $_chair.iconFile">
		});
		
		Egg armchairs are here to stay.
		Egg.
		*/
	
		/* ------------- CHAIRS ------------- */
		mapper.set('stool', {
			name: "stools",
			nameCap: "Wooden stools",
			category: ["chair"],
			type: [""],
			cost: setPrice(460),
			description: "A set of stools on which to sit. Not very comfortable, but better than nothing. Probably.",
			iconFile: "stool.png",
		});
		mapper.set('chair', {
			name: "wooden chairs",
			nameCap: "Wooden chairs",
			category: ["chair"],
			type: [""],
			cost: setPrice(1280),
			description: "A set of regular wooden chairs.",
			iconFile: "chair.png",
		});
		mapper.set('armchair', {
			name: "armchairs",
			nameCap: "Armchairs",
			category: ["chair"],
			type: [""],
			cost: setPrice(1970),
			description: "A set of armchairs, soft and relaxing. And expensive.",
			iconFile: "armchair.png",
		});
		mapper.set('egg', {
			name: "egg armchairs",
			nameCap: "Egg armchairs",
			category: ["chair"],
			type: [""],
			cost: setPrice(2420, 69),
			description: "A set of armchairs with a rounded back, in rather exotic colours. An absolute monstrosity to have in your room.",
			iconFile: "armchairegg.png",
		});
	
		/* ------------- TABLES ------------- */
		mapper.set('woodentable', {
			name: "wooden table",
			nameCap: "Wooden table",
			category: ["table"],
			type: [""],
			cost: setPrice(1100),
			description: "Can be used as a working or gathering spot. Just add chairs.",
			iconFile: "table.png",
		});
		mapper.set('marbletable', {
			name: "marble-topped table",
			nameCap: "Marble-topped table",
			category: ["table"],
			type: [""],
			cost: setPrice(1420),
			description: "A regular wooden table with a twist.",
			iconFile: "marbletable.png",
		});
	
		/* ------------- BEDS ------------- */
		mapper.set('poorbed', {
			name: "poor bed",
			nameCap: "Poor bed",
			category: ["bed"],
			type: ["single", "starter"],
			cost: setPrice(0),
			description: "An old, poor bed. Uncomfortable to sleep on.",
			iconFile: "poorbed.png",
		});
		mapper.set('singlebed', {
			name: "single bed",
			nameCap: "Single bed",
			category: ["bed"],
			type: ["single"],
			cost: setPrice(1680),
			description: "A bed for one person.",
			iconFile: "singlebed.png",
		});
		mapper.set('singlebeddeluxe', {
			name: "deluxe single bed",
			nameCap: "Deluxe single bed",
			category: ["bed"],
			type: ["single", "comfy"],
			cost: setPrice(2420),
			description: "An ergonomically designed bed. Very comfortable.",
			iconFile: "singlebeddeluxe.png",
		});
		mapper.set('doublebed', {
			name: "double bed",
			nameCap: "Double bed",
			category: ["bed"],
			type: ["double"],
			cost: setPrice(3400),
			description: "A simple bed that fits two people.",
			iconFile: "doublebed.png",
			showFn() {
				return target !== 'bedroom';
			}
		});
		mapper.set('doublebeddeluxe', {
			name: "deluxe double bed",
			nameCap: "Deluxe double bed",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: setPrice(2840),
			description: "A beautiful bed with a soft matress. Very comfortable to sleep on, and fits two.",
			iconFile: "doublebeddeluxe.png",
			showFn() {
				return target !== 'bedroom';
			}
		});
		mapper.set('doublebedexotic', {
			name: "exotic double bed",
			nameCap: "Exotic double bed",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: setPrice(4884),
			description: "A bed made in a contemporary, minimalist style. This monstrosity is very comfortable to sleep on, and fits two.",
			iconFile: "doublebedexotic.png",
			showFn() {
				return target !== 'bedroom';
			}
		});
		mapper.set('doublebedwicker', {
			name: "wicker double bed",
			nameCap: "Wicker double bed",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: setPrice(4860),
			description: "An authentic bed on a rattan frame. Very comfortable to sleep on, and fits two.",
			iconFile: "doublebedwicker.png",
			showFn() {
				return target !== 'bedroom';
			}
		});
	
		/* ------------- MISC ------------- */
		mapper.set('plantpot', {
			name: "plant pot",
			nameCap: "Plant pot",
			category: ["windowsill"],
			type: [""],
			cost: setPrice(680),
			description: "A clay pot with good soil, flowers come pre-planted. Can be put on your windowsill.",
			iconFile: "flower.png",
			});
		mapper.set('jar', {
			name: "ominous jar",
			nameCap: "Ominous jar",
			category: ["windowsill"],
			type: [""],
			cost: setPrice(1380),
			description: "A menacingly looking jar. Can be put on your windowsill...",
			iconFile: "JAR.png",
		});

		/* ------------- DECORATIONS ------------- */
		mapper.set('calendar', {
			name: "calendar",
			nameCap: "Calendar",
			category: ["decoration"],
			type: [""],
			cost: setPrice(360),
			description: "The days of this calendar are numbered.",
			iconFile: "calendar.png",
		});
		mapper.set('painting', {
			name: "painting",
			nameCap: "Painting",
			category: ["decoration"],
			type: [""],
			cost: setPrice(680),
			description: "It's not actually a painting. It's an illustration. ",
			iconFile: "painting.png",
		});
		mapper.set('banner', {
			name: "lewd",
			nameCap: "Lewd banner",
			category: ["decoration"],
			type: [""],
			cost: setPrice(620),
			description: "A banner with a tentacle. Looks oddly familiar.",
			iconFile: "banner.png",
		});
		mapper.set('bannerfestive', {
			name: "festive banner",
			nameCap: "Festive banner",
			category: ["decoration"],
			type: [""],
			cost: setPrice(620),
			description: "It may or may not be in season, but it still looks cool.",
			iconFile: "bannerfestive.png",
		});
		mapper.set('bearplushie', {
			name: "large bear plushie",
			nameCap: "Large bear plushie",
			category: ["decoration"],
			type: [""],
			cost: setPrice(1380),
			description: "Why.",
			iconFile: "bearplushie.png",
		});
		/* ------------- WARDROBES ------------- */
		/*  starter - 20 clothing slots for every type
			spacious - 30 clothing slots for every type
			organised - 40 clothing slots for every type */
		mapper.set('wardrobeold', {
			name: "creaky wardrobe",
			nameCap: "Creaky wardrobe",
			category: ["wardrobe"],
			type: ["starter"],
			cost: setPrice(0),
			description: "Old, creaky wardrobe. Doesn't hold much.",
			iconFile: "wardrobeold.png",
			showFn: () => false
		});
		mapper.set('wardrobebasic', {
			name: "wardrobe",
			nameCap: "Wardrobe",
			category: ["wardrobe"],
			type: ["spacious"],
			cost: setPrice(3160),
			description: "A basic wardrobe cabinet.",
			iconFile: "wardrobebasic.png",
			showFn() {
				return isWardrobeHigherTier(this);
			}
		});
		mapper.set('armoire', {
			name: "armoire",
			nameCap: "Armoire",
			category: ["wardrobe"],
			type: ["spacious"],
			cost: setPrice(3258),
			description: "A spacious wooden armoire.",
			iconFile: "armoire.png",
			showFn() {
				return isWardrobeHigherTier(this);
			}
		});
		mapper.set('organiser', {
			name: "organiser wardrobe",
			nameCap: "Organiser wardrobe",
			category: ["wardrobe"],
			type: ["organiser"],
			cost: setPrice(4296),
			description: "A wardrobe with a lot of space.",
			iconFile: "wardrobeorganiser.png",
			showFn() {
				return isWardrobeHigherTier(this);
			}
		});
		mapper.set('carved', {
			name: "carved armoire",
			nameCap: "Carved armoire",
			category: ["wardrobe"],
			type: ["organiser"],
			cost: setPrice(4620),
			description: "The exterior of this armoire was carved by hand, and it has a lot of drawers and garment rods.",
			iconFile: "armoirecarved.png",
			showFn() {
				return isWardrobeHigherTier(this);
			}
		});
		/* --------------- POSTERS --------------- */
		mapper.set('poster', {
			name: "empty",
			nameCap: "Empty",
			category: ["poster"],
			type: ["poster", "starter"],
			cost: setPrice(135),
			description: "The poster is currently empty.",
			iconFile: "poster.png",
		});
		/* ------------- WALLPAPERS -------------- */
		mapper.set('wallpaper', {
			name: "empty",
			nameCap: "Empty",
			category: ["wallpaper"],
			type: ["wallpaper", "starter"],
			cost: setPrice(135),
			description: "The wallpaper is currently empty.",
			iconFile: "wallpaper.png",
		});
	}

	function furnitureGet(type, onlySetup = false) {
		if (typeof type !== 'string') {
			console.debug('furnitureGet expected an argument of type: string.', type);
			return null;
		}
		if (onlySetup) {
			return setup.furniture.get(type);
		}
		if (!V) {
			console.debug('furnitureGet called before SugarCube is ready, postpone execution next time.', type);
			return null;
		}
		const area = V.furniture[target];
		if (area.hasOwnProperty(type)) {
			const current = area[type];
			const defaults = setup.furniture.get(current.id);
			return { ...defaults, ...current };
		} else {
			return null;
		}
	}

	function furnitureSet(id, category, propertyMap) {
		if (!setup.furniture.has(id)) {
			Errors.report(`Furniture.Set was incorrectly passed an id not listed in furniture: ${id}`);
			return false;
		}
		if (!Categories.hasOwnProperty(category)) {
			Errors.report(`Furniture.Set was incorrectly passed an invalid category : ${category}`);
			return false;
		}
		const home = V.furniture[target];

		home[category] = {
			'id'	: id
		};
		if (propertyMap) {
			/* Object.defineProperties(home[category], propertyMap); */
			Object.assign(home[category], propertyMap);
		}
		return true;
	}

	function furnitureIn(location) {
		if (Object.values(Locations).includes(location)) {
			target = location;
		} else {
			Errors.report(`Location provided (${location}) does not exist in the furniture system.`);
		}
		return Furniture;
	}

	function furnitureUpdate(fromBackComp = false) {
		const versions = V.objectVersion;
		if (versions.furniture === undefined || FORCE_UPDATE) {
			versions.furniture = 0;
		}
		switch (versions.furniture) {
			case 0:
				V.furniturePriceFactor = 1;
				V.furniture = {
					bedroom	: {
						bed	: {
							id: 'poorbed'
						},
						wardrobe : {
							id: fromBackComp ? 'organiser' : 'wardrobeold'
						}
					}
				}
				wardrobeSpaceUpdater();
				versions.furniture = 1;
				break;
		}
	}

	function getWardrobeTier(wardrobe) {
		const type = wardrobe.type.find(e => ['spacious', 'organiser'].includes(e)) || 'starter';
		const tier = { 'starter': 0, 'spacious': 1, 'organiser': 2 }[type];
		return tier;
	}

	function isWardrobeHigherTier(wardrobe) {
		const current = Furniture.get('wardrobe');
		if (current) {
			const targetTier = getWardrobeTier(wardrobe);
			const currentTier = getWardrobeTier(current);
			if (targetTier <= currentTier) {
				return false;
			}
		}
		return true;
	}

	function wardrobeSpaceUpdater() {
		const wardrobe = V.wardrobe;
		const furniture = furnitureGet('wardrobe');
		if (typeof furniture !== 'object') return;
		if (!(furniture.type instanceof Array)) return;
		/* Wardrobe object appears to be good: Is an object, type is an array. */
		if (furniture.type.includes('organiser')) {
			wardrobe.space = 40;
		} else if (furniture.type.includes('spacious')) {
			wardrobe.space = 30;
		} else {
			wardrobe.space = 20;
		}
	}

	function setPrice(pounds, pence = 0) {
		return () => Math.floor((pounds * 100 + pence) * V.furniturePriceFactor);
	}

	$(document).on(':start2', function() {
		furnitureUpdate();
	})

	/* Call the initiator function immediately. This happens when the game starts up and is loading. (Spinny wheel) */
	furnitureInit();

	return Object.freeze({
		init			: furnitureInit,
		get				: furnitureGet,
		set				: furnitureSet,
		in				: furnitureIn,
		update			: furnitureUpdate,
		wardrobeUpdate	: wardrobeSpaceUpdater,
		get target() {
			return target;
		}
	});
})();
window.Furniture = Furniture;
