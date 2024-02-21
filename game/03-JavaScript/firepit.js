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
 * @property {number} maxBurnTime the maximum lifetime of the fire at any point, in seconds
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
			maxBurnTime: 120 * 60, // 2 hours
			cookTime: {},
			items: [],
		}, options);
	}

	/**
	 * @param {FirepitType} fp
	 * @returns {number} the time left before the fire goes out, in seconds
	 */
	function getBurnTime(fp) {
		if (fp?.lastsUntil == null) return Errors.report("No firepit provided to getBurnTime");
		return Math.max(fp.lastsUntil - V.timeStamp, 0);
	}

	/**
	 * Adds the given time to the fire lifetime and updates the time required for all items in the firepit.
	 *
	 * Clamps the given time to the max lifetime allowed by `fp.maxBurnTime`.
	 *
	 * @param {FirepitType} fp
	 * @param {number} time the time to add to `fp.lastsUntil`, in seconds
	 */
	function addBurnTime(fp, time) {
		if (!fp || !Number.isInteger(time)) return;
		const nowLastsUntil = Math.max(V.timeStamp, fp.lastsUntil) + time;
		fp.lastsUntil = Math.min(nowLastsUntil, V.timeStamp + fp.maxBurnTime);
		fp.items.forEach(item => updateTimeBonus(fp, item));
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
	 * @param {boolean} skipUpdateBonus if set to true, does not update the timeBonus of
	 *                                  the item before adding it
	 * @returns {void}
	 */
	function cookItem(fp, item, skipUpdateBonus = false) {
		if (fp.items.length >= fp.maxItems || !item) return;
		if (fp.cookTime[item.name] == null) {
			return Errors.report(`Failed to add item ${item.name} to firepit: item not allowed`);
		}
		if (!skipUpdateBonus) {
			updateTimeBonus(fp, item);
		}
		fp.items.push(item);
	}

	/**
	 * Creates an item that can be inserted into the given firepit.
	 *
	 * @param {FirepitType} fp
	 * @param {string} itemName needs to be a key in `fp.cookTime`
	 * @returns {FirepitItem|undefined} the created item, if successful.
	 */
	function createItem(fp, itemName) {
		if (fp.cookTime[itemName] == null) {
			return Errors.report(`Failed to create item ${itemName}: item not allowed in provided firepit`);
		}
		const newItem = {
			name: itemName,
			startedAt: V.timeStamp,
			timeBonus: 0,
		};
		updateTimeBonus(fp, newItem);
		return newItem;
	}

	/**
	 * Calculates a new time bonus for the given item, updating the previous bonus.
	 *
	 * @param {FirepitType} fp
	 * @param {FirepitItem} item item in `fp` getting it's bonus updated
	 */
	function updateTimeBonus(fp, item) {
		item.timeBonus = getTimeBonus(fp, item);
	}

	/**
	 * Calculates the time bonus for the given item, without updating it.
	 *
	 * @param {FirepitType} fp
	 * @param {FirepitItem} item item in `fp` getting it's bonus updated
	 * @returns {number} the total time, in seconds, that the item can skip from the
	 *                   value in `fp.cookTime` (including bonus already applied)
	 */
	// prettier-ignore
	function getTimeBonus(fp, item) {
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
		const fireTimeLeft = getBurnTime(fp);
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
		return fp?.items.filter(({ name, startedAt, timeBonus }) => {
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
		return fp?.items.filter(({ name, startedAt, timeBonus }) => {
			return V.timeStamp - startedAt < fp.cookTime[name] - timeBonus;
		});
	}

	return Object.freeze({
		create,

		addBurnTime,
		getBurnTime,

		createItem,
		cookItem,
		updateTimeBonus,
		getTimeBonus,
		getItemsReady,
		getItemsNotReady,
	});
})();
window.Firepit = Firepit;

function getBirdBurnTime() {
	if (!V.bird?.firepit) return 0;
	return Math.floor(Firepit.getBurnTime(V.bird.firepit) / 60); // minutes
}
window.getBirdBurnTime = getBirdBurnTime;

/* each firepit would need it's own logic to apply upgrades */
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
	Object.assign(V.bird.firepit, {
		maxBurnTime,
		maxItems: V.bird.upgrades.rack * 2,
		cookMult: level + 1,
	});
	// 2/3 of max hours
	const burnTime = Math.floor((maxBurnTime / 3600) * (2 / 3)) * 3600;
	Firepit.addBurnTime(V.bird.firepit, burnTime);
}
window.upgradeBirdFirepit = upgradeBirdFirepit;

/* ========================== PART BELOW GOES AWAY IF THIS IS IMPLEMENTED ========================== */

/*
	notes:
	- Firepit.addBurnTime:
		- allows to put out the fire at any given time, updating the items seemlessly
	- firepit.cookMult:
		- if set to a value between 0 and 1, should allow to slow down the progress instead of speeding it up:
				in theory, the firepit could be used as a fridge that stops items from going bad :D
		- modifying the getTimeBonus to allow for cookMult === 0 to freeze progress should be pretty simple too
	- upgrading a firepit's cookMult:
		- when not holding items, it should be pretty straight forward;
		- UPGRADING WHEN HOLDING ITEMS: the elapsedTimeVirtual (see getTimeBonus) will get messed up
			- to avoid this, either disallow upgrading when there are items in the firepit, or set item.startedAt to $timeStamp on upgrade.
*/

function birdFirepitTest(hour = 9, minute = 0) {
	Time.setTime(hour, minute);
	// if this experiment works, $bird would get a firepit property that looks like this
	const firepit = Firepit.create({
		lastsUntil: V.timeStamp + 240 * 60, // 4 hours
		maxItems: 2,
		cookMult: 2,
		maxBurnTime: 360 * 60, // 6 hours
		cookTime: {
			lurker: 120 * 60, // 2 hours (test value)
		},
		items: [],
	});

	return firepit;
}
window.birdFirepitTest = birdFirepitTest;
