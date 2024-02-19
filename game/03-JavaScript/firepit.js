/**
 * @typedef {object} FirepitItem
 * @property {string} name the name of the item, used by the firepit
 * @property {number} startedAt timestamp in seconds of when the item was added to the firepit,
 *                              defaults to `$timeStamp`
 * @property {number} timeBonus amount of time to be deduced from the base cookTime when determining
 *                              if the item is ready or not.
 */

/**
 * @typedef {object} FirepitType
 * @property {number} lastsUntil timestamp in seconds at which the fire goes out
 * @property {number} maxItems maximum amount of items the firepit can hold at once
 * @property {number} maxFireTime the maximum lifetime of the fire at any point, in seconds
 * @property {number} cookMult how much a lit fire speeds up the cooking process - (0.5x, 2x, 3x etc)
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
			maxFireTime: 120 * 60, // 2 hours
			cookTime: {},
			items: [],
		}, options);
	}

	/**
	 * @param {FirepitType} fp
	 * @returns {number} the time left before the fire goes out, in seconds
	 */
	function getFireTimeRaw(fp) {
		return Math.max(fp.lastsUntil - V.timeStamp, 0);
	}

	/**
	 * Adds the given time to the fire lifetime and updates the time required for all items in the firepit.
	 *
	 * Clamps the given time to the max lifetime allowed by `fp.maxFireTime`.
	 *
	 * @param {FirepitType} fp
	 * @param {number} time the time to add to `fp.lastsUntil`, in seconds
	 * @param {(FirepitType) => number} getFireTime (optional) callback that takes the firepit as an argument
	 *                                   and gets the updated time left, in seconds.
	 *                                   Used to apply extra modifiers when updating the
	 *                                   time bonuses of items. Defaults to `Firepit.getFireTimeRaw`.
	 */
	function addFireTime(fp, time, getFireTime = getFireTimeRaw) {
		if (!fp || !Number.isInteger(time)) return;
		const nowLastsUntil = Math.max(V.timeStamp, fp.lastsUntil) + time;
		fp.lastsUntil = Math.min(nowLastsUntil, V.timeStamp + fp.maxFireTime);
		const timeLeft = Number(getFireTime(fp)) || 0;
		fp.items.forEach(item => updateTimeBonus(fp, item, timeLeft));
	}

	/**
	 * Adds an item to the given firepit's inventory if it accepts that item.
	 *
	 * If the firepit is currently on fire and not skipping the update of `item.timeBonus`,
	 * applies modifiers to it before adding the item.
	 *
	 * @param {FirepitType} fp
	 * @param {FirepitItem} itemName the item to add to firepit, it's name must be a key in `fp.cookTime`
	 * @param item
	 * @param {object} options (optional)
	 * @param {number} options.fireTimeLeft time left before the fire goes out, in seconds.
	 *                                      Used only if updating the timeBonus of the given item.
	 *                                      Use this if don't want the raw time left to be used.
	 * @param {boolean} options.skipUpdateBonus if set to true, does not update the timeBonus of
	 *                                          the item before adding it
	 * @returns {void}
	 */
	function addItem(fp, item, options = {}) {
		const { fireTimeLeft, skipUpdateBonus = false } = options;
		if (fp.items.length >= fp.maxItems || !item) return;
		if (fp.cookTime[item.name] == null) {
			return Errors.report(`Failed to add item ${item.name} to firepit: item not allowed`);
		}
		if (!skipUpdateBonus) {
			updateTimeBonus(fp, item, fireTimeLeft);
		}
		fp.items.push(item);
	}

	/**
	 * Creates an item that can be inserted into the given firepit.
	 *
	 * @param {FirepitType} fp
	 * @param {string} itemName needs to be a key in `fp.cookTime`
	 * @param {number} fireTimeLeft (optional) the fire time left in `fp` to use when
	 *                              determining `item.timeBonus`, in seconds. Use this if you want
	 *                              modifiers applied to the raw fire time left.
	 * @returns {FirepitItem|undefined} the created item, if successful.
	 */
	function createItem(fp, itemName, fireTimeLeft = null) {
		if (fp.cookTime[itemName] == null) {
			return Errors.report(`Failed to add item ${itemName} to firepit: item not allowed`);
		}
		const newItem = {
			name: itemName,
			startedAt: V.timeStamp,
			timeBonus: 0,
		};
		if (fireTimeLeft == null) fireTimeLeft = getFireTimeRaw(fp);
		updateTimeBonus(fp, newItem, fireTimeLeft);
		return newItem;
	}

	/**
	 * Calculates a new time bonus for the given item, updating the previous bonus.
	 *
	 * @param {FirepitType} fp
	 * @param {FirepitItem} item item in `fp` getting it's bonus updated
	 * @param {number} fireTimeLeft the fire time left in `fp` to use when updating `item.timeBonus`, in seconds
	 */
	function updateTimeBonus(fp, item, fireTimeLeft = null) {
		item.timeBonus = getTimeBonus(fp, item, fireTimeLeft);
	}

	/**
	 * Calculates the time bonus for the given item, without updating it.
	 *
	 * @param {FirepitType} fp
	 * @param {FirepitItem} item item in `fp` getting it's bonus updated
	 * @param {number} fireTimeLeft the fire time left in `fp` to use when updating `item.timeBonus`, in seconds
	 * @returns {number} the total time, in seconds, that the item can skip from the
	 *                   value in `fp.cookTime` (including bonus already applied)
	 */
	// prettier-ignore
	function getTimeBonus(fp, item, fireTimeLeft = null) {
		const cookMult = fp.cookMult;
		const baseTime = fp.cookTime[item.name];
		if (!baseTime || cookMult <= 0) return item.timeBonus;

		const elapsedTimeRaw = V.timeStamp - item.startedAt;
		// time that the bonus has already applied to
		const elapsedTimeVirtual = Math.floor(
			Math[item.timeBonus >= 0 ? "min" : "max"](elapsedTimeRaw, item.timeBonus) * (cookMult - 1)
		);
		const elapsedTime = elapsedTimeRaw + elapsedTimeVirtual;
		if (elapsedTime >= baseTime - item.timeBonus) return item.timeBonus;
		if (fireTimeLeft == null) {
			fireTimeLeft = getFireTimeRaw(fp);
		}
		/*
		 * bonus is the how much time will be ignored from baseTime
		 * example: if cookMult is 3, ignores 2/3 of the time left
		 * If there's enough fire, applies the bonus to the whole time left,
		 * else considers only the time left on fire for the bonus.
		 */
		const bonus = Math.min(baseTime - elapsedTime, fireTimeLeft * cookMult) * ((cookMult - 1) / cookMult);
		const totalBonus = Math.floor(elapsedTimeVirtual + bonus);
		return totalBonus - (totalBonus % 60); // truncating possible seconds
	}

	/**
	 * Helper function to get all items that are "ready" in the given firepit.
	 *
	 * @param {FirepitType} fp
	 * @returns {FirepitItem[]}
	 */
	function getItemsReady(fp) {
		return fp.items.filter(({ name, startedAt, timeBonus }) => {
			return V.timeStamp - startedAt >= fp.cookTime[name] - timeBonus;
		});
	}

	/**
	 * Helper function to get all items that are not "ready" in the given firepit.
	 *
	 * @param {FirepitType} fp
	 * @returns {FirepitItem[]}
	 */
	function getItemsNotReady(fp) {
		return fp.items.filter(({ name, startedAt, timeBonus }) => {
			return V.timeStamp - startedAt < fp.cookTime[name] - timeBonus;
		});
	}

	return Object.freeze({
		create,

		addFireTime,
		getFireTimeRaw,

		createItem,
		addItem,
		updateTimeBonus,
		getTimeBonus,
		getItemsReady,
		getItemsNotReady,
	});
})();
window.Firepit = Firepit;

/* ========================== PART BELOW GOES AWAY IF THIS IS IMPLEMENTED ========================== */

/*
	notes:
	- Firepit.addFireTime:
		- allows to put out the fire at any given time, updating the items seemlessly
		- each firepit should have it's own function to apply modifiers to the time left if needed
	- firepit.cookMult:
		- if set to a value between 0 and 1, should allow to slow down the progress instead of speeding it up:
				in theory, the firepit could be used as a fridge that stops items from going bad :D
		- modifying the getTimeBonus to allow for cookMult === 0 to freeze progress should be pretty simple too
	- upgrading a firepit's cookMult:
		- when not holding items, it should be pretty straight forward;
		- UPGRADING WHEN HOLDING ITEMS: the elapsedTimeVirtual (see getTimeBonus) will get messed up
			- to avoid this, either disallow upgrading when there are items in the firepit, or set item.startedAt to $timeStamp on upgrade.
*/

window.getBirdFirepit = function (hour = 9, minute = 0) {
	Time.setTime(hour, minute);
	// if this experiment works, $bird would get a firepit property that looks like this
	const firepit = Firepit.create({
		lastsUntil: V.timeStamp + 240 * 60, // 4 hours
		maxItems: 2,
		cookMult: 2,
		maxFireTime: 360 * 60, // 6 hours
		cookTime: {
			lurker: 120 * 60, // 2 hours (test value)
		},
		items: [],
	});

	/* each firepit would need it's own logic to apply time modifiers */
	const getBirdFireTime = (noModifiers = false) => {
		// let burnTime = Firepit.getFireTimeRaw(V.bird.firepit);
		let burnTime = Firepit.getFireTimeRaw(firepit);
		if (V.weather !== "rain" || V.bird.upgrades.shelter > 0 || noModifiers) return burnTime;
		burnTime = Math.floor(burnTime / 2);
		if (burnTime === 0) firepit.lastsUntil = V.timeStamp; // fire went out
		return burnTime;
	};

	/* each firepit would need it's own logic to apply upgrades */
	const upgradeBirdFirepit = level => {
		if (!level || !Number.isInteger(level) || firepit.items.length) return;
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
			maxFireTime,
			lastsUntil: V.timeStamp + maxFireTime,
			maxItems: level * 2,
			cookMult: level + 1,
		});
		const fireTimeLeft = getBirdFireTime();
		firepit.items.forEach(item => Firepit.updateTimeBonus(firepit, item, fireTimeLeft));
	};

	return {
		firepit,
		getBirdFireTime,
		upgradeBirdFirepit,
	};
};
