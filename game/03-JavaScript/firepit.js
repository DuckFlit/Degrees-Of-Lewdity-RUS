/**
 * @typedef {object} CookerItem
 * @property {string} name the name of the item, used by the cooker
 * @property {number} startedAt timestamp in seconds of when the item was added to the cooker,
 *                              defaults to `$timeStamp`
 * @property {number} timeBonus amount of time that is being deduced from the base cook time when
 *                              calculating the time required for the item to be ready
 * @property {number} bonusElapsed amount of time that has already been deduced when
 *                                 calculating the time required for the item to be ready
 */

/**
 * @typedef {object} CookerType
 * @property {number} lastsUntil timestamp in seconds at which the fire goes out
 * @property {number} updatedAt timestamp in seconds of the last time the cooker's fire was updated.
 *                              Used for calculating the `bonusElapsed` of items
 * @property {number} maxItems maximum amount of items the cooker can hold at once
 * @property {number} maxBurnTime the maximum lifetime of the fire at any point, in seconds
 * @property {number} cookMult how much a lit fire speeds up the cooking process - (0.5x, 2x, 3x etc)
 * @property {Object<string, number>} cookTime key value pairs of the items allowed in the cooker
 *                                              and their base required time to cook
 * @property {CookerItem[]} items the items currently in the cooker, up to `cooker.maxItems`
 */

const Cooker = (() => {
	/**
	 * @param {Partial<CookerType>} options used to overwrite default values when creating the cooker
	 * @returns {CookerType} the new cooker object
	 */
	function create(options = {}) {
		// prettier-ignore
		return Object.assign({
			lastsUntil: V.timeStamp,
			maxItems: 1,
			cookMult: 2,
			maxBurnTime: 120 * 60, // 2 hours
			cookTime: {},
			items: [],
		}, options);
	}

	/**
	 * @param {CookerType} c
	 * @returns {number} the time left before the fire goes out, in seconds
	 */
	function getBurnTime(c) {
		if (c?.lastsUntil == null) return Errors.report("No cooker provided to getBurnTime");
		return Math.max(c.lastsUntil - V.timeStamp, 0);
	}

	/**
	 * Adds the given time to the fire lifetime and updates the time required for all items in the cooker.
	 *
	 * Clamps the given time to the max lifetime allowed by `c.maxBurnTime`.
	 *
	 * @param {CookerType} c
	 * @param {number} time the time to add to `c.lastsUntil`, in seconds
	 */
	function addBurnTime(c, time) {
		if (!c || !Number.isInteger(time)) return;
		const nowLastsUntil = Math.max(V.timeStamp, c.lastsUntil) + time;
		updateElapsedBonuses(c);
		c.lastsUntil = Math.min(nowLastsUntil, V.timeStamp + c.maxBurnTime);
		c.items.forEach(item => updateTimeBonus(c, item));
	}

	/**
	 * Adds an item to the given cooker's inventory if it accepts that item.
	 *
	 * Calculates the timeBonus for the item before adding it.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item the item to add to cooker, it's name must be a key in `c.cookTime`
	 * @returns {void}
	 */
	function cookItem(c, item) {
		if (c.items.length >= c.maxItems || !item) return;
		if (c.cookTime[item.name] == null) {
			return Errors.report(`Failed to add item ${item.name} to cooker: item not allowed`);
		}
		updateTimeBonus(c, item);
		c.items.push(item);
	}

	/**
	 * Creates an item that can be inserted into the given cooker.
	 *
	 * @param {CookerType} c
	 * @param {string} itemName needs to be a key in `c.cookTime`
	 * @param {boolean} skipBonusCalc if set to true, does not update the timeBonus of
	 *                                on creation.
	 * @returns {CookerItem|undefined} the created item, if successful.
	 */
	function createItem(c, itemName, skipBonusCalc = false) {
		if (c.cookTime[itemName] == null) {
			return Errors.report(`Failed to create item ${itemName}: item not allowed in provided cooker`);
		}
		const newItem = {
			name: itemName,
			startedAt: V.timeStamp,
			timeBonus: 0,
			bonusElapsed: 0,
		};
		if (!skipBonusCalc) {
			updateTimeBonus(c, newItem);
		}
		return newItem;
	}

	/**
	 * Updates the timeBonus of the given item. To update the bonusElapsed, use `updateElapsedBonuses`.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item item in `c` getting it's bonus updated
	 */
	function updateTimeBonus(c, item) {
		item.timeBonus = getTimeBonus(c, item);
	}

	/**
	 * Updates `c.updatedAt` and every item's elapsedBonus property at once.
	 * `item.elapsedBonus` should never be updated outside of this function.
	 *
	 * @param {CookerType} c
	 */
	function updateElapsedBonuses(c) {
		c.items.forEach(item => {
			item.bonusElapsed += _getBonusElapsedSinceUpdated(c, item);
		});
		c.updatedAt = V.timeStamp;
	}

	/**
	 * Gets the bonus time elapsed for the given item since the cooker's fire was last updated.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item
	 */
	function _getBonusElapsedSinceUpdated(c, item) {
		if (item.timeBonus === 0 || V.timeStamp === c.updatedAt) return 0;
		const min = Math.max(item.startedAt, c.updatedAt);
		const max = Math.clamp(c.lastsUntil, item.startedAt, V.timeStamp);
		const interval = Math.floor((max - min) * (c.cookMult - 1)); // min <= max
		return item.timeBonus < 0 ? Math.max(item.timeBonus, interval) : Math.min(item.timeBonus, interval);
	}

	/**
	 * Calculates the remaining time bonus for the given item, without updating it.
	 *
	 * Considers that `item.bonusElapsed` is up to date.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item item in `c` getting it's bonus updated
	 * @returns {number} the total time, in seconds, that the item can still skip from the
	 *                   value in `c.cookTime`
	 */
	function getTimeBonus(c, item) {
		const cookMult = c.cookMult;
		const baseTime = c.cookTime[item.name];
		if (!baseTime || cookMult <= 0) {
			Errors.report("No valid cooker provided for getTimeBonus");
			return 0;
		}
		const timeElapsedRaw = V.timeStamp - item.startedAt;
		// assumes item.bonusElapsed is up to date
		const timeLeftRaw = Math.max(baseTime - timeElapsedRaw - item.bonusElapsed, 0);
		if (timeLeftRaw === 0) return 0;
		/*
		 * bonus is how much time will be ignored from baseTime
		 * example: if cookMult is 3, ignores 2/3 of the time left
		 * If there's enough fire, applies the bonus to the whole time left,
		 * else considers only the time left on fire for the bonus.
		 */
		const bonusLeft = (Math.min(timeLeftRaw, getBurnTime(c) * cookMult) * (cookMult - 1)) / cookMult;
		return Math.floor(bonusLeft - (bonusLeft % 60)); // truncating possible seconds
	}

	/**
	 * Helper function to get all items that are "ready" in the given cooker.
	 *
	 * @param {CookerType} fp
	 * @returns {CookerItem[]}
	 */
	// prettier-ignore
	function getItemsReady(fp) {
		return fp?.items.filter(({ name, startedAt, timeBonus, bonusElapsed }) => {
			return V.timeStamp - startedAt >= fp.cookTime[name] - timeBonus - bonusElapsed;
		}) || [];
	}

	/**
	 * Helper function to get all items that are not "ready" in the given cooker.
	 *
	 * @param {CookerType} fp
	 * @returns {CookerItem[]}
	 */
	// prettier-ignore
	function getItemsNotReady(fp) {
		return fp?.items.filter(({ name, startedAt, timeBonus, bonusElapsed }) => {
			return V.timeStamp - startedAt < fp.cookTime[name] - timeBonus - bonusElapsed;
		}) || [];
	}

	return Object.freeze({
		create,

		addBurnTime,
		getBurnTime,

		createItem,
		cookItem,
		updateTimeBonus,
		getTimeBonus,

		updateElapsedBonuses,
		getItemsReady,
		getItemsNotReady,
	});
})();
window.Cooker = Cooker;

function getBirdBurnTime() {
	if (!V.bird?.firepit) return 0;
	return Math.floor(Cooker.getBurnTime(V.bird.firepit) / 60); // minutes
}
window.getBirdBurnTime = getBirdBurnTime;

function upgradeBirdFirepit() {
	const level = V.bird?.upgrades.firepit;
	if (!Number.isInteger(level) || level < 1) return;
	let maxBurnTime = 1480 * 60; // 24h40min
	switch (level) {
		case 1:
			maxBurnTime = 360 * 60; // 6h
			break;
		case 2:
			maxBurnTime = 740 * 60; // 12h20min
			break;
	}
	// update the elapsed bonus for all items, so cookMult can correctly calculate timeBonus after upgrading
	Cooker.updateElapsedBonuses(V.bird.firepit);
	Object.assign(V.bird.firepit, {
		maxBurnTime,
		maxItems: V.bird.upgrades.rack * 2,
		cookMult: level + 1,
	});
	// 2/3 of max hours
	const burnTime = Math.floor((maxBurnTime / 3600) * (2 / 3)) * 3600;
	Cooker.addBurnTime(V.bird.firepit, burnTime);
}
window.upgradeBirdFirepit = upgradeBirdFirepit;

/* ================================ TEST CASES =============================== */
// WARNING: If you value your sanity, turn back now.
// will not be merged in, just for testing and conversation purposes

window.runFirepitTests = () => {
	const initialTime = V.timeStamp;
	class TestBatch {
		/**
		 * @param {object<string, (tb: TestBatch) => void>} cases
		 * @param {Partial<FirepitType>} fp
		 */
		constructor(cases = {}, fp = {}) {
			this.fp = Firepit.create(fp);
			this.cases = cases;
		}

		beforeEach() {
			this.fp.items = [];
			V.timeStamp = initialTime;
			this.fp.lastsUntil = V.timeStamp;
			this.fp.updatedAt = V.timeStamp;
		}

		afterAll() {
			this.beforeEach();
		}

		runCases() {
			const caseCount = Object.keys(this.cases).length;
			console.log(`Running test batch with ${caseCount} cases...`);
			this.beforeAll?.();
			let failCount = 0;
			Object.entries(this.cases).forEach(([name, case_], i) => {
				try {
					this.beforeEach?.();
					case_(this);
					console.log(`%c\tTest case passed: ${name}`, "color: green");
				} catch (e) {
					console.log(`%c\tTest case failed: ${name}`, "color: red");
					console.log(`%c\t${e.message}`, "color: red");
					failCount++;
				} finally {
					this.afterEach?.();
				}
			});
			this.afterAll?.();
			console.log(`Batch finished with ${caseCount - failCount}/${caseCount} successful case${failCount === 1 ? "" : "s"}`);
		}
	}

	// making sure the basics work
	/**
	 * @type {object<string, (tb: TestBatch) => void>}
	 */
	const batch1Cases = {
		"1h of burn time should reduce cook time by 1h": tb => {
			tb.fp.lastsUntil += 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);

			const expBonus = 3600;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"1h of burn time plus another 10min after 10mins passed should only reduce cook time by 1h": tb => {
			tb.fp.lastsUntil += 3600;
			V.timeStamp += 600; // 10min
			Firepit.addBurnTime(tb.fp, 600);
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);

			const expBonus = 3600;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"50min of burn time should reduce cook time by 50min": tb => {
			tb.fp.lastsUntil += 3600;
			V.timeStamp += 600; // 10min
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);

			const expBonus = 3000;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"4h of burn time should reduce cook time by 1h": tb => {
			tb.fp.lastsUntil += 4 * 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);

			const expBonus = 3600;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"adding burn time beyond what the item needs should not affect its cook time": tb => {
			tb.fp.lastsUntil += 3 * 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 600;
			Firepit.addBurnTime(tb.fp, 1200);

			const expBonusElapsed = 600;
			if (item.bonusElapsed !== expBonusElapsed) {
				throw new Error(`Expected bonus elapsed to be ${expBonusElapsed}, got ${item.bonusElapsed}`);
			}
			const expBonusLeft = 3000;
			if (item.timeBonus !== expBonusLeft) {
				throw new Error(`Expected bonus left to be ${expBonusLeft}, got ${item.timeBonus}`);
			}
		},
		"adding enough burn time after the item was cooking for 10min should reduce cook time by 55min": tb => {
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 600; // 10min without fire
			Firepit.addBurnTime(tb.fp, 5 * 3600); // should get clamped to 4h

			const expBurnTime = 4 * 3600;
			const burnTime = Firepit.getBurnTime(tb.fp);
			if (burnTime !== expBurnTime) {
				throw new Error(`Expected firepit burn time to be ${expBurnTime}, got ${burnTime}`);
			}
			const expBonus = 3300; // 55min
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"30min of burn time should reduce cook time by 30min": tb => {
			tb.fp.lastsUntil += 1800;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);

			const expBonus = 1800; // 30min
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"adding 10min of burn time after 20/30min of burn time elapsed should reduce cook time by a total of 40min": tb => {
			tb.fp.lastsUntil += 1800;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 1200;
			Firepit.addBurnTime(tb.fp, 600); // updates bonusElapsed

			const expBonusElapsed = 1200;
			if (item.bonusElapsed !== expBonusElapsed) {
				throw new Error(`Expected bonus elapsed to be ${expBonusElapsed}, got ${item.bonusElapsed}`);
			}
			const expBonusLeft = 1200;
			if (item.timeBonus !== expBonusLeft) {
				throw new Error(`Expected bonus left to be ${expBonusLeft}, got ${item.timeBonus}`);
			}
		},
		"adding 20min of burn time after the item was cooking for 20min should reduce cook time by 20min": tb => {
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 1200;
			Firepit.addBurnTime(tb.fp, 1200);

			const expBonus = 1200;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
	};
	const batch1 = new TestBatch(batch1Cases, {
		cookTime: { lurker: 2 * 3600 },
		cookMult: 2,
		maxBurnTime: 4 * 3600,
	});
	batch1.runCases();

	// testing cookMult between 0 and 1 for slowing down progress
	/**
	 * @type {object<string, (tb: TestBatch) => void>}
	 */
	const batch2Cases = {
		"4h of burn time should increase cook time by 2h": tb => {
			tb.fp.lastsUntil += 4 * 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);

			const expBonus = -2 * 3600;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"4h of burn time plus another 20min after 10mins passed should still increase cook time by 2h": tb => {
			tb.fp.lastsUntil += 4 * 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 600;
			Firepit.addBurnTime(tb.fp, 1200); // back to 4h

			const expBonusElapsed = -300; // -5min
			if (item.bonusElapsed !== expBonusElapsed) {
				throw new Error(`Expected bonus elapsed to be ${expBonusElapsed}, got ${item.bonusElapsed}`);
			}
			const expBonusLeft = -115 * 60; // -1h55min
			if (item.timeBonus !== expBonusLeft) {
				throw new Error(`Expected bonus left to be ${expBonusLeft}, got ${item.timeBonus}`);
			}
		},
		"adding 10min of burn time after the item was cooking for 10min should increase cook time by 1h50min": tb => {
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 600; // 10min without fire
			Firepit.addBurnTime(tb.fp, 4 * 3600);

			const expBonus = -110 * 60; // -1h50min
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"adding burn time beyond what the item needs should not affect its cook time": tb => {
			tb.fp.lastsUntil += 4 * 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 130 * 60; // 2h10min elapsed
			Firepit.addBurnTime(tb.fp, 600);

			const expBonusElapsed = -130 * 30; // 0.5x elapsed
			if (item.bonusElapsed !== expBonusElapsed) {
				throw new Error(`Expected bonus elapsed to be ${expBonusElapsed}, got ${item.bonusElapsed}`);
			}
			const expBonusLeft = -110 * 30; // 1h50min * 0.5x
			if (item.timeBonus !== expBonusLeft) {
				throw new Error(`Expected bonus left to be ${expBonusLeft}, got ${item.timeBonus}`);
			}
		},
		"it should count 30min passing as only 15min, with the total bonus being -1h": tb => {
			// tb.fp.lastsUntil += 2 * 3600;
			Firepit.addBurnTime(tb.fp, 2 * 3600);
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 1800;
			// Firepit.addBurnTime(tb.fp, 0); // just updates the firepit

			const expBonus = -3600;
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"it should not update the time bonus": tb => {
			tb.fp.lastsUntil += 2 * 3600;
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 150 * 60; // 2h30min elapsed
			Firepit.addBurnTime(tb.fp, 0); // updates the firepit -> bonusElapsed = timeBonus; timeBonus = 0

			const expBonusElapsed = -120 * 30; // burnTime was 2h only
			if (item.bonusElapsed !== expBonusElapsed) {
				throw new Error(`Expected bonus elapsed to be ${expBonusElapsed}, got ${item.bonusElapsed}`);
			}
			const expBonusLeft = 0;
			if (item.timeBonus !== expBonusLeft) {
				throw new Error(`Expected bonus left to be ${expBonusLeft}, got ${item.timeBonus}`);
			}
		},
	};
	const batch2 = new TestBatch(batch2Cases, {
		cookTime: { lurker: 2 * 3600 },
		cookMult: 0.5, // item cooks at 0.5x speed while fire is on
		maxBurnTime: 4 * 3600,
	});
	batch2.runCases();

	// testing firepit updates effects on timeBonus and elapsedBonus
	/**
	 * @type {object<string, (tb: TestBatch) => void>}
	 */
	const batch3Cases = {
		"updating burn time twice for an item that wasn't on fire should not change its elapsed bonus": tb => {
			/*
			 * first 1h no fire, then add 30min of burn time, then add 30min of burn time again
			 * expected timeBonus: 30min
			 */
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 3600;
			Firepit.addBurnTime(tb.fp, 1800);

			const expBonus = 1800;
			if (item.timeBonus !== expBonus) {
				throw new Error(`First result expected to be ${expBonus}, got ${item.timeBonus}`);
			}

			Firepit.addBurnTime(tb.fp, 0); // just updates the firepit
			if (item.timeBonus !== expBonus) {
				throw new Error(`Second result expected to be ${expBonus}, got ${item.timeBonus}`);
			}
		},
		"increasing burn time by 30min twice for an item that has elapsed for 1h should give it a total bonus of 1h": tb => {
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 3600;
			Firepit.addBurnTime(tb.fp, 1800);

			const expBonus1 = 1800;
			if (item.timeBonus !== expBonus1) {
				throw new Error(`First bonus expected to be ${expBonus1}, got ${item.timeBonus}`);
			}

			Firepit.addBurnTime(tb.fp, 1800);
			const expBonus2 = 3600;
			if (item.timeBonus !== expBonus2) {
				throw new Error(`Second bonus expected to be ${expBonus2}, got ${item.timeBonus}`);
			}
		},
		"fuck me up, Scotty": tb => {
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 3600;
			Firepit.addBurnTime(tb.fp, 3600);

			const expBonus1 = 3600;
			if (item.timeBonus !== expBonus1) {
				throw new Error(`First bonus expected to be ${expBonus1}, got ${item.timeBonus}`);
			}

			V.timeStamp += 3 * 3600;
			Firepit.addBurnTime(tb.fp, 3600);
			const expBonusE2 = 3600; // elapsed all initial 1h bonus
			if (item.bonusElapsed !== expBonusE2) {
				throw new Error(`First elapsed bonus expected to be ${expBonusE2}, got ${item.bonusElapsed}`);
			}
			const expBonus2 = 3600;
			if (item.timeBonus !== expBonus2) {
				throw new Error(`Second bonus expected to be ${expBonus2}, got ${item.timeBonus}`);
			}

			V.timeStamp += 3 * 3600; // 7h elapsed
			Firepit.addBurnTime(tb.fp, 3600);
			Firepit.addBurnTime(tb.fp, 3600);

			const expBonusE3 = 2 * 3600;
			if (item.bonusElapsed !== expBonusE3) {
				throw new Error(`Second elapsed bonus expected to be ${expBonusE3}, got ${item.bonusElapsed}`);
			}
			const expBonus3 = 2 * 3600;
			if (item.timeBonus !== expBonus3) {
				throw new Error(`Second bonus expected to be ${expBonus3}, got ${item.timeBonus}`);
			}
			const expLeft = (24 - 7 - 4) * 3600;
			// prettier-ignore
			const gotLeft = tb.fp.cookTime[item.name]
				- (V.timeStamp - item.startedAt)
				- item.bonusElapsed
				- item.timeBonus;
			if (gotLeft !== expLeft) {
				throw new Error(`Expected the time left to be ${expLeft}, got ${gotLeft}`);
			}
		},
		"upgrading firepit should not affect elapsedBonus, but should affect timeBonus": tb => {
			const item = Firepit.createItem(tb.fp, "lurker", true);
			Firepit.cookItem(tb.fp, item);
			V.timeStamp += 3600;
			Firepit.addBurnTime(tb.fp, 3 * 3600);

			const expBonus1 = 3 * 3600;
			if (item.timeBonus !== expBonus1) {
				throw new Error(`First bonus expected to be ${expBonus1}, got ${item.timeBonus}`);
			}

			V.timeStamp += 2 * 3600; // 2h elapsed

			// upgrading a firepit, very fancy
			Firepit.updateElapsedBonuses(tb.fp);
			Object.assign(tb.fp, {
				maxBurnTime: 1480 * 60,
				cookMult: 3,
			});
			// add 2/3 of max hours
			// const burnTime = Math.floor((1480 * 60 / 3600) * (2 / 3)) * 3600;
			// Firepit.addBurnTime(tb.fp, burnTime);
			Firepit.addBurnTime(tb.fp, 0); // update timeBonus

			const expBonusElapsed = 2 * 3600;
			if (item.bonusElapsed !== expBonusElapsed) {
				throw new Error(`Expected bonus elapsed to be ${expBonusElapsed}, got ${item.bonusElapsed}`);
			}

			const expBonus = 2 * 3600; // 1h === 3h of progress -> bonus 2h
			if (item.timeBonus !== expBonus) {
				throw new Error(`Expected bonus to be ${expBonus}, got ${item.timeBonus}`);
			}

			Object.assign(tb.fp, {
				maxBurnTime: 12 * 3600,
				cookMult: 2,
			});
		},
	};
	const batch3 = new TestBatch(batch3Cases, {
		cookTime: { lurker: 24 * 3600 },
		cookMult: 2,
		maxBurnTime: 12 * 3600,
	});
	batch3.runCases();
};
