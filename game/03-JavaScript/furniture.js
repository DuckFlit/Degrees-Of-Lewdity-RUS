const Furniture = (() => {
	setup.furniture = new Map();

	/* Keep set to false, unless during developer testing. If on true, set to false unless in use. */
	const FORCE_UPDATE = false; /* IMPORTANT: Switch to false before the next update. */
	const DEBUG_ENABLED = false;

	const print = (...args) => {
		if (DEBUG_ENABLED) console.debug(...args);
	};

	const Categories = Object.freeze({
		/* Generic categories */
		bed: "bed",
		table: "table",
		chair: "chair",
		desk: "desk",
		wardrobe: "wardrobe",
		decoration: "decoration",
		windowsill: "windowsill",
		poster: "poster",
		wallpaper: "wallpaper",
		/* Special category for Kylar event */
		owlplushie: "owlplushie",
	});

	const Locations = Object.freeze({
		bedroom: "bedroom",
		cabin: "cabin",
		cottage: "cottage",
	});

	let target = Locations.bedroom;

	function furnitureInit() {
		const mapper = setup.furniture;

		/*
		mapper.chairs.set('name', {
			name: "stools",					Name in lowercase.
			nameCap: "Wooden stools",		Capitalised name.
			category: ["chair"],			Used in the shop interface.
			type: ["chair", "expensive"],	Traits, can be multiple, shouldn't be shown because I'm too lazy to make a description /j
			cost: 160,						Cost, 100 is one pound.
			description: "A set of stools on which to sit on.",			Description for the shop interface to show.
			iconFile: "stool",		    	Used in image widgets; <<furnitureicon "stool">>
		});

		Egg armchairs are here to stay.
		Egg.
		*/

		/* ------------- CHAIRS ------------- */
		mapper.set("chair", {
			name: "chair",
			nameCap: "Стул",
			article: "a",
			nameSolo: "chair",
			category: ["chair"],
			type: ["starter"],
			cost: 0,
			description: "Старый, подержанный стул. Шатающийся и неудобный.",
			iconFile: "basicChair",
			iconFile2: "basicChairDesk",
			tier: 0,
		});
		mapper.set("stool", {
			name: "stools",
			nameCap: "Деревянные табуреты",
			article: "a",
			nameSolo: "wooden stool",
			category: ["chair"],
			type: [],
			cost: 460,
			description: "Набор табуреток. Неудобно, но лучше, чем ничего.",
			iconFile: "stool",
			iconFile2: "stoolDesk",
			tier: 0,
		});
		mapper.set("woodenchair", {
			name: "wooden chairs",
			nameCap: "Деревянные стулья",
			article: "a",
			nameSolo: "wooden chair",
			category: ["chair"],
			type: [],
			cost: 1280,
			description: "Набор обычных деревянных стульев. Не самые удобные.",
			iconFile: "chair",
			iconFile2: "chairDesk",
			tier: 0,
		});
		mapper.set("swivelchair", {
			name: "swivel chairs",
			nameCap: "Swivel chairs",
			article: "a",
			nameSolo: "swivel chair",
			category: ["chair"],
			type: ["comfy"],
			cost: 1480,
			description: "A pair of swivel chairs. Comfortable and ergonomic.",
			iconFile: "swivelChair",
			iconFile2: "swivelChairDesk",
			tier: 1,
		});
		mapper.set("shellchair", {
			name: "shell chairs",
			nameCap: "Shell chairs",
			article: "a",
			nameSolo: "shell chair",
			category: ["chair"],
			type: ["comfy"],
			cost: 1750,
			description: "A set of wheeled chairs with a shell-shaped back. Luxurious.",
			iconFile: "shellChair",
			iconFile2: "shellChairDesk",
			tier: 1,
		});
		mapper.set("armchair", {
			name: "armchairs",
			nameCap: "Кресла",
			article: "an",
			nameSolo: "armchair",
			category: ["chair"],
			type: ["comfy"],
			cost: 1970,
			description: "Набор кресел. Мягкие, расслабляющие и дорогие.",
			iconFile: "armchair",
			iconFile2: "armchairDesk",
			tier: 1,
		});
		mapper.set("egg", {
			name: "egg armchairs",
			nameCap: "Кресла-яйца",
			article: "an",
			nameSolo: "egg armchair",
			category: ["chair"],
			type: ["comfy"],
			cost: 2420,
			description: "Набор кресел с округлой спинкой в экзотических цветах. Непростая установка.",
			iconFile: "armchairegg",
			iconFile2: "armchaireggDesk",
			tier: 1,
		});

		/* ------------- TABLES ------------- */
		mapper.set("woodentable", {
			name: "wooden table",
			nameCap: "Деревянный стол",
			category: ["table"],
			type: [],
			cost: 1100,
			description: "Можно использовать как рабочее место или место для собраний. Просто добавьте стулья",
			iconFile: "table",
			tier: 0,
		});
		mapper.set("marbletable", {
			name: "marble-topped table",
			nameCap: "Стол с мраморной столешницей",
			category: ["table"],
			type: [],
			cost: 1430,
			description: "Обычный деревянный стол с изюминкой.",
			iconFile: "marbletable",
			tier: 1,
		});

		/* ------------- DESKS ------------- */
		mapper.set("desk", {
			name: "basic desk",
			nameCap: "Базовый стол",
			category: ["desk"],
			type: ["stable", "starter"],
			cost: 0,
			description: "Старый, доставшийся в наследство письменный стол. Оскверненный высечками сирот прошлых лет.",
			iconFile: "desk",
		});
		mapper.set("deskGlass", {
			name: "glass desk",
			nameCap: "Glass desk",
			category: ["desk"],
			type: ["fragile"],
			cost: 1250,
			description: "A sleek, contemporary desk. Breakable.",
			iconFile: "deskGlass",
		});
		mapper.set("deskMidcentury", {
			name: "mid-century modern desk",
			nameCap: "Современный письменный стол середины века",
			category: ["desk"],
			type: ["stable"],
			cost: 1550,
			description: "Простой письменный стол в стиле модерн. Популярный в середине XX века",
			iconFile: "deskMidcentury",
		});
		mapper.set("deskAntique", {
			name: "antique desk",
			nameCap: "Антикварный стол",
			category: ["desk"],
			type: ["sturdy"],
			cost: 3820,
			description: "Вычурный, антикварный письменный стол. Построен так, чтобы прослужить всю жизнь.",
			iconFile: "deskAntique",
		});

		/* ------------- BEDS ------------- */
		mapper.set("bed", {
			name: "basic bed",
			nameCap: "Основная кровать",
			category: ["bed"],
			type: ["single", "starter"],
			cost: 0,
			description: "Старая, убогая кровать. Неудобная",
			iconFile: "bed",
			tier: 0,
		});
		mapper.set("singlebed", {
			name: "single bed",
			nameCap: "Одноместная кровать",
			category: ["bed"],
			type: ["single"],
			cost: 1680,
			description: "Кровать для одного.",
			iconFile: "singlebed",
			tier: 0,
		});
		mapper.set("singlebeddeluxe", {
			name: "deluxe single bed",
			nameCap: "Односпальная кровать класса люкс",
			category: ["bed"],
			type: ["single", "comfy"],
			cost: 2400,
			description: "Эргономичная кровать. Очень удобная.",
			iconFile: "singlebeddeluxe",
			tier: 1,
		});
		mapper.set("doublebed", {
			name: "double bed",
			nameCap: "Двухместная кровать",
			category: ["bed"],
			type: ["double"],
			cost: 3400,
			description: "Простая кровать. Подходит для двоих.",
			iconFile: "doublebed",
			tier: 1,
			showCheck: "notBedroom",
		});
		mapper.set("doublebeddeluxe", {
			name: "deluxe double bed",
			nameCap: "Двуспальная кровать класса люкс",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: 2840,
			description: "Красивая кровать с мягким матрасом. Очень удобная, помещается двое.",
			iconFile: "doublebeddeluxe",
			tier: 2,
			showCheck: "notBedroom",
		});
		mapper.set("doublebedexotic", {
			name: "exotic double bed",
			nameCap: "Экзотическая двуспальная кровать",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: 4884,
			description: "Кровать, выполненная в современном минималистском стиле. Очень удобная, подходит для двоих.",
			iconFile: "doublebedexotic",
			tier: 2,
			showCheck: "notBedroom",
		});
		mapper.set("doublebedwicker", {
			name: "wicker double bed",
			nameCap: "Плетеная двуспальная кровать",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: 4860,
			description: "Аутентичная кровать на ротанговой раме. Очень удобная, подходит для двоих.",
			iconFile: "doublebedwicker",
			tier: 2,
			showCheck: "notBedroom",
		});

		/* ------------- MISC ------------- */
		mapper.set("plantpot", {
			name: "plant pot",
			nameCap: "Горшок для растений",
			category: ["windowsill"],
			type: [],
			cost: 680,
			description: "Глиняный горшок с хорошей почвой. Цветы предварительно высажены. Можно поставить на подоконник",
			iconFile: "flower",
		});
		mapper.set("bunnySucculent", {
			name: "bunny succulent",
			nameCap: "Суккулент с кроликом",
			category: ["windowsill"],
			type: [],
			cost: 840,
			description: "Цементный горшок для небольших суккулентов. Предварительно посажена 'Monilaria obconica', также известная как суккулент кролик.",
			iconFile: "bunnySucculent",
		});
		mapper.set("jar", {
			name: "jar",
			nameCap: "Банка",
			category: ["windowsill"],
			type: [],
			cost: 1380,
			description: "Цилиндрическая банка. Можно поставить на подоконник.",
			iconFile: "jar",
		});

		/* ------------- DECORATIONS ------------- */
		mapper.set("calendar", {
			name: "calendar",
			nameCap: "Календарь",
			category: ["decoration"],
			type: [],
			cost: 360,
			description: "Дни этого календаря сочтены.",
			iconFile: "calendar",
		});
		mapper.set("painting", {
			name: "painting",
			nameCap: "Картина",
			category: ["decoration"],
			type: [],
			cost: 680,
			description: "На самом деле это не картина. Это иллюстрация. ",
			iconFile: "painting",
		});
		mapper.set("banner", {
			name: "banner",
			nameCap: "Баннер",
			category: ["decoration"],
			type: [],
			cost: 620,
			description: "В центре стоит фигура из старого фильма.",
			iconFile: "banner",
		});
		mapper.set("bannerlewd", {
			name: "lewd banner",
			nameCap: "Непристойный баннер",
			category: ["decoration"],
			type: [],
			cost: 790,
			description: "Знамя с щупальцем.",
			iconFile: "banner",
		});
		mapper.set("bannerfestive", {
			name: "festive banner",
			nameCap: "Праздничный баннер",
			category: ["decoration"],
			type: [],
			cost: 670,
			description: "Это может быть не по сезону, но все равно выглядит круто.",
			iconFile: "bannerfestive",
		});
		mapper.set("bearplushie", {
			name: "large bear plushie",
			nameCap: "Большой плюшевый медведь",
			category: ["decoration"],
			type: [],
			cost: 1380,
			description: "Мягкий, ласковый и вечно преданный.",
			iconFile: "bearplushie",
		});
		mapper.set("owlplushie", {
			name: "owl plushie",
			nameCap: "Плюшевая сова",
			category: ["owlplushie"],
			type: [],
			cost: 0,
			description: "Большие глаза смотрят на мир.",
			iconFile: "owlplushie",
			showCheck: "disabled",
		});
		/* ------------- WARDROBES ------------- */
		/*	starter - 20 clothing slots for every type
			spacious - 30 clothing slots for every type
			organised - 40 clothing slots for every type */
		mapper.set("wardrobe", {
			name: "creaky wardrobe",
			nameCap: "Скрипучий шкаф",
			category: ["wardrobe"],
			type: ["starter"],
			cost: 0,
			description: "Старый, скрипучий шкаф. В нем мало что поместится",
			iconFile: "wardrobe",
			tier: 0,
			showCheck: "disabled",
		});
		mapper.set("wardrobebasic", {
			name: "wardrobe",
			nameCap: "Шкаф",
			category: ["wardrobe"],
			type: ["spacious"],
			cost: 3160,
			description: "Базовый шкаф для одежды.",
			iconFile: "wardrobebasic",
			tier: 1,
			showCheck: "isWardrobeHigherTier",
		});
		mapper.set("armoire", {
			name: "armoire",
			nameCap: "Шкаф",
			category: ["wardrobe"],
			type: ["spacious"],
			cost: 3258,
			description: "Вместительный деревянный шкаф.",
			iconFile: "armoire",
			tier: 1,
			showCheck: "isWardrobeHigherTier",
		});
		mapper.set("organiser", {
			name: "organiser wardrobe",
			nameCap: "Шкаф-органайзер",
			category: ["wardrobe"],
			type: ["organiser"],
			cost: 4296,
			description: "Шкаф с большим количеством места.",
			iconFile: "wardrobeorganiser",
			tier: 2,
			showCheck: "isWardrobeHigherTier",
		});
		mapper.set("carved", {
			name: "carved armoire",
			nameCap: "Резной шкаф",
			category: ["wardrobe"],
			type: ["organiser"],
			cost: 4620,
			description: "Вырезанный вручную, он содержит несколько выдвижных ящиков и вешалок для одежды.",
			iconFile: "armoirecarved",
			tier: 2,
			showCheck: "isWardrobeHigherTier",
		});
		/* --------------- POSTERS --------------- */
		mapper.set("poster", {
			name: "blank poster",
			nameCap: "Пустой плакат",
			category: ["poster"],
			type: ["poster", "starter"],
			cost: 135,
			description: "В настоящее время плакат пуст.",
			iconFile: "poster",
		});
		/* ------------- WALLPAPERS -------------- */
		mapper.set("wallpaper", {
			name: "blank wallpaper",
			nameCap: "Пустые обои",
			category: ["wallpaper"],
			type: ["wallpaper", "starter"],
			cost: 135,
			description: "Обои в настоящее время пустые.",
			iconFile: "wallpaper",
		});
	}

	function furnitureGet(category, onlySetup = false) {
		print("Furniture.get > getting:", category);
		if (typeof category !== "string") {
			print("Furniture.Get expected an argument of type: string.", category);
			return null;
		}
		if (onlySetup) {
			return setup.furniture.get(category);
		}
		if (!V) {
			print("Furniture.Get called before SugarCube is ready, postpone execution next time.", category);
			return null;
		}
		const area = V.furniture[target];
		if (typeof area !== "object" && area === null) {
			print("Furniture.Get called with a location that doesn't exist:", target, area);
			return null;
		}
		const current = area[category];
		if (typeof current === "object" && current !== null) {
			const defaults = setup.furniture.get(current.id);
			const composite = Object.assign({}, defaults, current);
			return composite;
		} else {
			return null;
		}
	}

	function furnitureSet(id, category, overrides) {
		print("Furniture.set > setting:", id, category, overrides);
		if (!setup.furniture.has(id)) {
			Errors.report(`Furniture.Set was incorrectly passed an id not listed in furniture: ${id}`);
			return false;
		}
		if (!Categories[category]) {
			Errors.report(`Furniture.Set was incorrectly passed an invalid category : ${category}`);
			return false;
		}
		const home = V.furniture[target];

		home[category] = { id };
		if (typeof overrides === "object" && overrides !== null) {
			/* Object.defineProperties(home[category], propertyMap); */
			Object.assign(home[category], overrides);
		}
		// Log the id in case mistakes in the future occur and we need to track previous ownership.
		furnitureLog(id);
		return true;
	}

	function furnitureDelete(category) {
		print("Furniture.delete > Deleting:", category);
		delete V.furniture[target][category];
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
		print("Furniture.update > Updating - from backcomp:", fromBackComp);
		const versions = V.objectVersion;
		let wallpaper;
		let decoration;
		let poster;
		if (versions.furniture === undefined || FORCE_UPDATE) {
			versions.furniture = 0;
		}
		switch (versions.furniture) {
			case 0:
				if (!V.furniturePriceFactor) V.furniturePriceFactor = 1;
				V.furniture = {
					bedroom: {
						bed: {
							id: "bed",
						},
						wardrobe: {
							id: fromBackComp ? "organiser" : "wardrobe",
						},
						desk: {
							id: "desk",
						},
					},
				};
				wardrobeSpaceUpdater();
			// eslint-disable-next-line no-fallthrough
			case 1:
				/* Set the target to the bedroom in the unlikely event it wasn't preset. */
				furnitureIn(Locations.bedroom);
				/* Search for the wallpaper object, returns null if not found. */
				wallpaper = furnitureGet(Categories.wallpaper);
				if (wallpaper != null && wallpaper.name.includes("<<")) {
					const name = Util.escape(wallpaper.name);
					furnitureSet("wallpaper", Categories.wallpaper, {
						name,
						nameCap: name.toUpperFirst(),
					});
				}
				/* Search for the poster object, returns null if not found. */
				poster = furnitureGet(Categories.poster);
				if (poster != null && poster.name.includes("<<")) {
					const name = Util.escape(poster.name);
					furnitureSet("poster", Categories.poster, {
						name,
						nameCap: name.toUpperFirst(),
					});
				}
				versions.furniture = 2;
			// eslint-disable-next-line no-fallthrough
			case 2:
				/* Start log of existing items owned. */
				updaterLogAll();
				/* Fix owl-plushie being in the decoration category, as it can then be deleted,
					or potentially lock out decorations in the current system. */
				furnitureIn(Locations.bedroom);
				decoration = furnitureGet(Categories.decoration);
				if (decoration !== null && decoration.id === "owlplushie") {
					furnitureSet("owlplushie", Categories.owlplushie, {
						name: "owl plushie",
						nameCap: "Плюшевая сова",
					});
					furnitureDelete(Categories.decoration);
				}
				if ([2, 4, 7].includes(V.kylar_camera)) {
					furnitureSet("owlplushie", Categories.owlplushie, {
						name: "owl plushie",
						nameCap: "Плюшевая сова",
					});
				}
				versions.furniture = 3;
				break;
		}
	}

	function getWardrobeTier(wardrobe) {
		const type = wardrobe.type.find(e => ["spacious", "organiser"].includes(e)) || "starter";
		const tier = { starter: 0, spacious: 1, organiser: 2 }[type];
		return tier;
	}

	function isWardrobeHigherTier(wardrobe) {
		const current = Furniture.get("wardrobe");
		if (current) {
			const targetTier = getWardrobeTier(wardrobe);
			const currentTier = getWardrobeTier(current);
			if (targetTier <= currentTier) {
				return false;
			}
		}
		return true;
	}

	function showFn(item) {
		switch (item.showCheck) {
			case "isWardrobeHigherTier":
				// console.log("isWardrobeHigherTier", isWardrobeHigherTier(item));
				return isWardrobeHigherTier(item);
			case "notBedroom":
				// console.log("notBedroom", target !== "bedroom", target);
				return target !== "bedroom";
			case "disabled":
				// console.log("disabled");
				return false;
			default:
				return null;
		}
	}

	function wardrobeSpaceUpdater() {
		const wardrobe = V.wardrobe;
		const furniture = furnitureGet("wardrobe");
		if (typeof furniture !== "object") return;
		if (!(furniture.type instanceof Array)) return;
		/* Wardrobe object appears to be good: Is an object, type is an array. */
		if (furniture.type.includes("organiser")) {
			wardrobe.space = 40;
		} else if (furniture.type.includes("spacious")) {
			wardrobe.space = 30;
		} else {
			wardrobe.space = 20;
		}
	}

	function setPrice(pounds, pence = 0) {
		return Math.floor((pounds * 100 + pence) * V.furniturePriceFactor);
	}

	function updaterLogAll() {
		print("updaterLogAll > Logging all existing items.");
		for (const location in V.furniture) {
			const items = V.furniture[location];
			if (typeof items !== "object" || items === null) continue;
			for (const key in items) {
				const item = items[key];
				if (typeof item !== "object" || item === null) continue;
				furnitureLog(item.id);
			}
		}
	}

	function furnitureLog(id) {
		print("Furniture.log > Logging:", id);
		// Ensure furniture log exists.
		if (!Array.isArray(V.furnitureLog)) V.furnitureLog = [];
		if (!V.furnitureLog.includes(id)) V.furnitureLog.push(id);
	}

	/* Call the initiator function immediately. This happens when the game starts up and is loading. (Spinny wheel) */
	furnitureInit();

	return Object.freeze({
		init: furnitureInit,
		get: furnitureGet,
		set: furnitureSet,
		delete: furnitureDelete,
		in: furnitureIn,
		update: furnitureUpdate,
		wardrobeUpdate: wardrobeSpaceUpdater,
		log: furnitureLog,
		setPrice,
		showFn,
		get target() {
			return target;
		},
	});
})();
window.Furniture = Furniture;
