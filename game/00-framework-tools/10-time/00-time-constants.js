/**
 * Stores constants for time.
 * This was contained in time.js, but that causes issues with placement of that file.
 * As datetime.js had to reference Time to get these. Even though datetime.js should be
 * an isolated type for the most part.
 *
 * We could move these again at some point, like into datetime.js, as static fields of DateTime.
 * This cannot be done at the moment due to ECMA2022 being too new.
 */
const TimeConstants = (() => {
	const secondsPerDay = 86400;
	const secondsPerHour = 3600;
	const secondsPerMinute = 60;
	const standardYearMonths = Object.freeze([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
	const leapYearMonths = Object.freeze([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
	const synodicMonth = 29.53058867;

	return Object.freeze({
		secondsPerDay,
		secondsPerHour,
		secondsPerMinute,
		standardYearMonths,
		leapYearMonths,
		synodicMonth,
	});
})();
window.TimeConstants = TimeConstants;
