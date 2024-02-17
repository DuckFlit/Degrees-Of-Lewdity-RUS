/**
 * @typedef {object} FirepitItem
 * @property {string} name the name of the item, used by the firepit
 * @property {number} startedAt timestamp in seconds of when the item was added to the firepit,
 *                              defaults to `$timeStamp`
 * @property {number} timeReq the time required from `startedAt` for the item to be ready, in seconds
 */

/**
 * @typedef {object} FirepitType
 * @property {number} lastsUntil timestamp in seconds at which the fire goes out
 * @property {number} maxItems maximum amount of items the firepit can hold at once
 * @property {number} cookMult how much a lit fire speeds up the cooking process - (2x, 3x etc)
 * @property {number} timeFireMax the maximum lifetime of the fire at any point, in seconds
 * @property {Object<string, number>} cookTime key value pairs of the items allowed in the firepit
 *                                              and their base required time to cook
 * @property {FirepitItem[]} items the items currently in the firepit, up to `firepit.maxItems`
 */

const Firepit = (() => {
	/**
	 * @param {Partial<FirepitType>} options used to overwrite default values when creating the firepit
	 * @returns {FirepitType} the new firepit object
	 */
	function create(options = {}) {
		// prettier-ignore
		return Object.assign({
			lastsUntil: V.timeStamp,
			maxItems: 1,
			cookMult: 2,
			timeFireMax: 120 * 60, // 2 hours
			cookTime: {},
			items: [],
		}, options);
	}

	/**
	 * @param {FirepitType} fp
	 * @returns {number} the time left before the fire goes out, in seconds
	 */
	function getRawFireTime(fp) {
		return Math.max(fp.lastsUntil - V.timeStamp, 0);
	}

	/**
	 * Adds the given time to the fire lifetime and updates the time required for all items in the firepit.
	 *
	 * Clamps the given time to the max lifetime allowed by `fp.timeFireMax`.
	 *
	 * @param {FirepitType} fp
	 * @param {number} time the time to add to `fp.lastsUntil`, in seconds
	 * @param {() => number} getFireTime (optional) callback to get the updated time left, in seconds;
	 *                                   used to apply modifiers when updating the item time requirements.
	 *                                   Defaults to `Firepit.getRawFireTime`.
	 */
	function addFireTime(fp, time, getFireTime = getRawFireTime) {
		fp.lastsUntil = Math.max(V.timeStamp, fp.lastsUntil) + Math.min(time, fp.timeFireMax);
		const timeLeft = getFireTime(fp);
		fp.items.forEach(item => updateTimeReq(fp, item, timeLeft));
	}

	/**
	 * Adds an item to the given firepit's inventory, if the firepit accepts that item.
	 * If the firepit is currently on fire, applies modifiers to the base cookTime of the item before adding it.
	 *
	 * @param {FirepitType} fp
	 * @param {string} itemName name of the item to add to firepit, must be a key in `fp.cookTime`
	 * @param {number} fireTimeLeft (optional) time left before the fire goes out, in seconds;
	 *                              use this if don't want the raw fire time left to be used.
	 */
	function addItem(fp, itemName, fireTimeLeft = null) {
		const baseTime = fp.cookTime[itemName];
		if (!baseTime) return Errors.report(`Failed to add item ${itemName} to firepit: item not allowed`);
		if (fp.items.length >= fp.maxItems) return;
		const newItem = {
			name: itemName,
			startedAt: V.timeStamp,
			timeReq: baseTime,
		};
		if (fireTimeLeft == null) fireTimeLeft = getRawFireTime(fp);
		updateTimeReq(fp, newItem, fireTimeLeft);
		fp.items.push(newItem);
	}

	/**
	 * Updates `item.timeReq` according to `fp.cookMult` and `fireTimeLeft`
	 *
	 * @param {FirepitType} fp
	 * @param {FirepitItem} item item in `fp` getting it's `timeReq` updated
	 * @param {number} fireTimeLeft the fire time left in `fp` to use when updating `item.timeReq`, in seconds
	 */
	function updateTimeReq(fp, item, fireTimeLeft) {
		const cookMult = fp.cookMult;
		const elapsedTime = V.timeStamp - item.startedAt;
		if (cookMult === 1 || !fireTimeLeft || elapsedTime >= item.timeReq) return;

		const baseTime = fp.cookTime[item.name];
		const timeOnFire = Math.min(fireTimeLeft, baseTime - elapsedTime);

		/* 3x speed -> reduces time by 2/3 */
		const reducedTime = timeOnFire * ((cookMult - 1) / cookMult);
		item.timeReq = baseTime - reducedTime;
	}

	// function getItemsReady(fp) {
	// 	return fp.items.filter(({startedAt, timeReq}) => startedAt + timeReq <= V.timeStamp);
	// }

	// function getItemsNotReady(fp) {
	// 	return fp.items.filter(({startedAt, timeReq}) => startedAt + timeReq > V.timeStamp);
	// }

	return Object.freeze({
		create,
		addItem,
		addFireTime,
		getRawFireTime,
		updateTimeReq,
		// getItemsReady,
		// getItemsNotReady,
	});
})();
window.Firepit = Firepit;

/* ========================== PART BELOW GOES AWAY IF THIS IS IMPLEMENTED ========================== */

/*
	notes:
	- Firepit.addFireTime:
		- allows to put out the fire at any given time, updating the items seemlessly
		- each firepit should have it's own function to apply modifiers to the time left if needed
	- upgrading a firepit:
		- should be pretty straight forward: modify the properties in firepit according to the upgrade, then update all items in firepit using Firepit.updateTimeReq;
*/

window.firepitTest = function (hour = 9, minute = 0) {
	Time.setTime(hour, minute);
	// if this experiment works, $bird would get a firepit property that looks like this
	const firepit = Firepit.create({
		lastsUntil: V.timeStamp + 240 * 60, // 4 hours
		maxItems: 2,
		cookMult: 2,
		timeFireMax: 360 * 60, // 6 hours
		cookTime: {
			lurker: 120 * 60, // 2 hours (test value)
		},
		items: [],
	});

	/* each firepit would need it's own logic to apply time modifiers */
	const getBirdFireTime = (noModifiers = false) => {
		// let burnTime = Firepit.getRawFireTime(V.bird.firepit);
		let burnTime = Firepit.getRawFireTime(firepit);
		if (V.weather !== "rain" || V.bird.upgrades.shelter > 0 || noModifiers) return burnTime;
		burnTime = Math.floor(burnTime / 2);
		if (burnTime === 0) firepit.lastsUntil = V.timeStamp; // fire went out
		return burnTime;
	};

	/* each firepit would need it's own logic to apply upgrades */
	const upgradeBirdFirepit = level => {
		if (!level || !Number.isInteger(level)) return;
		let maxFireTime = 1480 * 60; // 24h
		switch (level) {
			case 1:
				maxFireTime = 360 * 60; // 6h
				break;
			case 2:
				maxFireTime = 740 * 60; // 12h
				break;
		}
		// Object.assign(V.bird.firepit, {
		Object.assign(firepit, {
			lastsUntil: V.timeStamp + maxFireTime,
			maxItems: level * 2,
			timeFireMax: maxFireTime,
			cookMult: level + 1,
		});
		const fireTimeLeft = getBirdFireTime();
		firepit.items.forEach(item => Firepit.updateTimeReq(firepit, item, fireTimeLeft));
	};

	return {
		firepit,
		getBirdFireTime,
		upgradeBirdFirepit,
	};
};
