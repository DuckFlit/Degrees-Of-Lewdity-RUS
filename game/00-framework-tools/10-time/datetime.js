class DateTime {
	constructor(year = 2020, month = 1, day = 1, hour = 0, minute = 0, second = 1) {
		if (arguments.length === 1) {
			// If the argument is a DateTime object, copy its properties
			if (year instanceof DateTime) {
				this.year = year.year;
				this.month = year.month;
				this.day = year.day;
				this.hour = year.hour;
				this.minute = year.minute;
				this.second = year.second;
				this.timeStamp = year.timeStamp;
				return;
			}
			// If the argument is a timestamp, validate it and set the DateTime object accordingly
			if (arguments[0] < 0 || arguments[0] > 315569437199)
				throw new Error("Invalid timestamp: Timestamp cannot be lower than 0 or higher than 315569437199.");
			this.fromTimestamp(arguments[0]);
			return;
		}
		this.toTimestamp(year, month, day, hour, minute, second);
	}

	/**
	 * Total days since start of timeStamp calculation (year 1)
	 *
	 * @param {number} year The year to calculate total days from.
	 * @returns {number} Total number of days since year 1.
	 */
	static getTotalDaysSinceStart(year) {
		return (year - 1) * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400);
	}

	/**
	 * Check if a given year is a leap year.
	 *
	 * @param {number} year The year to check.
	 * @returns {boolean} True if the year is a leap year, false otherwise
	 */
	static isLeapYear(year) {
		return year !== 0 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	/**
	 * Get the number of days in each month for a given year, considering leap years.
	 *
	 * @param {number} year Year to check
	 * @returns {Array<number>} Array with number of days in each month for the given year
	 */
	static getDaysOfMonthFromYear(year) {
		return DateTime.isLeapYear(year) ? TimeConstants.leapYearMonths : TimeConstants.standardYearMonths;
	}

	/**
	 * Get number of days in a given year, considering leap years.
	 *
	 * @param {number} year The year
	 * @returns {number} Total number of days
	 */
	static getDaysOfYear(year) {
		return DateTime.isLeapYear(year) ? 366 : 365;
	}

	/**
	 * Converts the given date components into a timestamp.
	 *
	 * @param {number} year
	 * @param {number} month
	 * @param {number} day
	 * @param {number} hour
	 * @param {number} minute
	 * @param {number} second
	 */
	toTimestamp(year, month, day, hour, minute, second) {
		if (year < 1 || year > 9999) throw new Error("Invalid year: Year must be between 1-9999.");
		if (month < 1 || month > 12) throw new Error("Invalid month: Month must be between 1-12.");
		const daysInMonth = DateTime.getDaysOfMonthFromYear(year);
		if (day < 1 || day > daysInMonth[month - 1]) throw new Error("Invalid date: Day must be between 1-" + daysInMonth[month - 1] + ".");

		const totalDays = DateTime.getTotalDaysSinceStart(year) + daysInMonth.slice(0, month - 1).reduce((a, b) => a + b, 0) + day - 1;
		const totalSeconds = totalDays * TimeConstants.secondsPerDay + hour * TimeConstants.secondsPerHour + minute * TimeConstants.secondsPerMinute + second;

		this.timeStamp = totalSeconds;
		this.year = year;
		this.month = month;
		this.day = day;
		this.hour = hour;
		this.minute = minute;
		this.second = second;
	}

	/**
	 * Converts a timestamp into year, month, day, hour, minute, and second
	 *
	 * @param {number} timestamp The timestamp to convert.
	 */
	fromTimestamp(timestamp) {
		// Initialize the year to 1
		let year = 1;
		let month = 0;
		let day = (timestamp / TimeConstants.secondsPerDay) | 0;
		const hour = (timestamp / TimeConstants.secondsPerHour) | 0;
		const minute = (timestamp / TimeConstants.secondsPerMinute) | 0;
		const second = timestamp;

		// Maps the total number of days to the corresponding year and day.
		while (day > DateTime.getDaysOfYear(year)) {
			day -= DateTime.getDaysOfYear(year++);
		}

		const daysPerMonth = DateTime.getDaysOfMonthFromYear(year);

		// Determines the month and day by subtracting the number of days in each month and incrementing the month value.
		while (day >= daysPerMonth[month]) {
			day -= daysPerMonth[month++];
			if (month > 11) {
				month = 0;
				year++;
			}
		}

		this.timeStamp = timestamp;
		this.year = year;
		this.month = month + 1;
		this.day = day + 1;
		this.hour = hour % 24;
		this.minute = minute % 60;
		this.second = second % 60;
	}

	/**
	 * Compares this DateTime object with another DateTime object and returns the difference.
	 * Gives an approximate comparison only when working with higher numbers (several years), since it doesn't take leap years into account for simplicity
	 *
	 * @param {DateTime} otherDateTime The DateTime object to compare with.
	 * @param {boolean} getSeconds If true, returns the difference in seconds, rather than an object
	 * @returns {object} An object with the difference
	 */
	compareWith(otherDateTime, getSeconds = false) {
		let diffSeconds = otherDateTime.timeStamp - this.timeStamp;
		if (getSeconds) return diffSeconds;

		const sign = Math.sign(diffSeconds);
		diffSeconds = Math.abs(diffSeconds);

		const years = Math.floor(diffSeconds / (TimeConstants.secondsPerDay * 365.25));
		diffSeconds -= years * TimeConstants.secondsPerDay * 365;

		const months = Math.floor(diffSeconds / (TimeConstants.secondsPerDay * 30));
		diffSeconds -= months * TimeConstants.secondsPerDay * 30;

		const days = Math.floor(diffSeconds / TimeConstants.secondsPerDay);
		diffSeconds -= days * TimeConstants.secondsPerDay;

		const hours = Math.floor(diffSeconds / TimeConstants.secondsPerHour);
		diffSeconds -= hours * TimeConstants.secondsPerHour;

		const minutes = Math.floor(diffSeconds / TimeConstants.secondsPerMinute);
		diffSeconds -= minutes * TimeConstants.secondsPerMinute;

		const seconds = diffSeconds;

		return {
			years: years * sign,
			months: months * sign,
			days: days * sign,
			hours: hours * sign,
			minutes: minutes * sign,
			seconds: seconds * sign,
		};
	}

	/**
	 * Returns the first occurrence of a specified weekday in the current month
	 *
	 * @param {number} weekDay The day of the week (1-7 for Sun-Sat)
	 * @returns {DateTime} The DateTime for the first occurrence of the specified weekday
	 */
	getFirstWeekdayOfMonth(weekDay) {
		if (weekDay < 1 || weekDay > 7) throw new Error("Invalid weekDay: Must be between 1-7");

		const date = new DateTime(this.year, this.month, 1);
		return date.addDays((weekDay - date.weekDay + 7) % 7);
	}

	/**
	 * Returns the next occurrence of a specified weekday after the current date.
	 *
	 * @param {number} weekDay The day of the week (1-7 for Sun-Sat).
	 * @returns {DateTime} The DateTime for the next occurrence of the specified weekday
	 */
	getNextWeekdayDate(weekDay) {
		if (weekDay < 1 || weekDay > 7) throw new Error("Invalid weekDay: Must be between 1-7");

		const days = ((7 + weekDay - this.weekDay - 1) % 7) + 1;
		const date = new DateTime(this);
		return date.addDays(days);
	}

	/**
	 * Returns the previous occurrence of a specified weekday before the current date.
	 *
	 * @param {number} weekDay The day of the week (1-7 for Sun-Sat).
	 * @returns {DateTime} The DateTime for the previous occurrence of the specified weekday
	 */
	getPreviousWeekdayDate(weekDay) {
		if (weekDay < 1 || weekDay > 7) throw new Error("Invalid weekDay: Must be between 1-7");
		const days = ((7 + weekDay - this.weekDay) % 7) - 7;
		const date = new DateTime(this);
		return date.addDays(days);
	}

	/**
	 * Adds a specified number of years to the current date
	 * Adding a negative value (e.g. -1) subtracts the years instead
	 *
	 * @param {number} years The number of years to add.
	 * @returns {DateTime}
	 */
	addYears(years) {
		if (!years) return this;
		const newYear = this.year + years;
		const daysInMonth = DateTime.getDaysOfMonthFromYear(newYear);
		const newDay = Math.min(this.day, daysInMonth[this.month - 1]);

		this.toTimestamp(newYear, this.month, newDay, this.hour, this.minute, this.second);
		return this;
	}

	/**
	 * Adds a specified number of months to the current date
	 * Adding a negative value (e.g. -1) subtracts the months instead
	 *
	 * @param {number} months The number of months to add.
	 * @returns {DateTime}
	 */
	addMonths(months) {
		if (!months) return this;
		const addedMonths = this.month + months;
		const newYear = this.year + Math.floor((addedMonths - 1) / 12);
		const newMonth = ((addedMonths - 1) % 12) + 1;
		const newDay = Math.min(this.day, DateTime.getDaysOfMonthFromYear(newYear)[newMonth - 1]);

		this.toTimestamp(newYear, newMonth, newDay, this.hour, this.minute, this.second);
		return this;
	}

	/**
	 * Adds a specified number of days to the current date
	 * Adding a negative value (e.g. -1) subtracts the days instead
	 *
	 * @param {number} days The number of days to add.
	 * @returns {DateTime}
	 */
	addDays(days) {
		if (!days) return this;
		this.fromTimestamp(this.timeStamp + days * TimeConstants.secondsPerDay);
		return this;
	}

	/**
	 * Adds a specified number of hours to the current date
	 * Adding a negative value (e.g. -1) subtracts the hours instead
	 *
	 * @param {number} hours The number of hours to add.
	 * @returns {DateTime}
	 */
	addHours(hours) {
		if (!hours) return this;
		this.timeStamp += hours * TimeConstants.secondsPerHour;
		this.fromTimestamp(this.timeStamp);
		return this;
	}

	/**
	 * Adds a specified number of minutes to the current date
	 * Adding a negative value (e.g. -1) subtracts the minutes instead
	 *
	 * @param {number} minutes The number of minutes to add.
	 * @returns {DateTime}
	 */
	addMinutes(minutes) {
		if (!minutes) return this;
		this.timeStamp += minutes * TimeConstants.secondsPerMinute;
		this.fromTimestamp(this.timeStamp);
		return this;
	}

	/**
	 * Adds a specified number of seconds to the current date
	 * Adding a negative value (e.g. -1) subtracts the seconds instead
	 *
	 * @param {number} seconds The number of seconds to add.
	 * @returns {DateTime}
	 */
	addSeconds(seconds) {
		if (!seconds) return this;
		this.timeStamp += seconds;
		this.fromTimestamp(this.timeStamp);
		return this;
	}

	/**
	 * Checks if the current date is the last day of the month
	 *
	 * @returns {boolean} True if it's the last day of the month, false otherwise
	 */
	isLastDayOfMonth() {
		const daysInMonth = DateTime.getDaysOfMonthFromYear(this.year)[this.month - 1];
		return this.day === daysInMonth;
	}

	/**
	 * Checks if the current date is the first day of the month
	 *
	 * @returns {boolean} True if it's the first day of the month, false otherwise
	 */
	isFirstDayOfMonth() {
		return this.day === 1;
	}

	/**
	 * Checks if the current date is between two specified dates
	 *
	 * @param {DateTime} startDate The start date
	 * @param {DateTime} endDate The end date
	 * @returns {boolean} True if the current date is between the specified dates, false otherwise
	 */
	between(startDate, endDate) {
		if (!(startDate instanceof DateTime && endDate instanceof DateTime)) {
			throw new Error("Parameters must be instances of DateTime.");
		}

		return this.timeStamp >= startDate.timeStamp && this.timeStamp <= endDate.timeStamp;
	}

	/**
	 * Returns the weekday (1-7 for Sun-Sat) of the current object's date
	 *
	 * @returns {number} The weekday number of the current date
	 */
	get weekDay() {
		const daysSinceStart = DateTime.getTotalDaysSinceStart(this.year + 1);
		const daysInMonth = TimeConstants.standardYearMonths.slice(0, this.month - 1).reduce((a, b) => a + b, 0);
		const isLeapYear = DateTime.isLeapYear(this.year) && this.month < 3;
		const weekDayOffset = V.weekDayOffset !== undefined ? V.weekDayOffset : 6;

		const totalDays = daysSinceStart + daysInMonth + this.day - Number(isLeapYear) + weekDayOffset;
		const weekDay = (totalDays % 7) + 1;

		return weekDay;
	}

	/**
	 * Returns the name of the weekday of the current object's date
	 *
	 * @returns {string} The name of the weekday
	 */
	get weekDayName() {
		return Time.daysOfWeek[this.weekDay - 1];
	}

	/**
	 * Returns the name of the month (e.g. "January") of the current object's date
	 *
	 * @returns {string} Name of month
	 */
	get monthName() {
		return Time.monthNames[this.month - 1];
	}

	/**
	 * Returns whether the current object's date falls on a weekend (Saturday or Sunday)
	 *
	 * @returns {boolean} True if the current date is a weekend, false otherwise
	 */
	get weekEnd() {
		return this.weekDay === 7 || this.weekDay === 1;
	}

	/**
	 * Returns the last date of the current month
	 *
	 * @returns {number} 1-31
	 */
	get lastDayOfMonth() {
		const daysPerMonth = DateTime.getDaysOfMonthFromYear(this.year);
		return daysPerMonth[this.month - 1];
	}

	/**
	 * Returns the day of the year for the current object's date
	 *
	 * @returns {number} The day of the year
	 */
	get yearDay() {
		const daysPerMonth = DateTime.getDaysOfMonthFromYear(this.year);
		return daysPerMonth.slice(0, this.month - 1).reduce((a, b) => a + b, 0) + this.day;
	}

	/**
	 * Returns the current moon phase as a fraction, where 0 and 1 are new moon and 0.5 is full moon
	 *
	 * @returns {number} The current moon phase as a fraction
	 */
	get moonPhaseFraction() {
		// Real new moon (in london) as a reference point
		const referenceNewMoon = new DateTime(2022, 1, 2, 18, 33);
		let phaseFraction = ((this.timeStamp - referenceNewMoon.timeStamp) / (TimeConstants.synodicMonth * TimeConstants.secondsPerDay)) % 1;

		// Adjust in case of negative date (date before the reference date)
		phaseFraction = (phaseFraction + 1) % 1;

		// Special rounding cases - to round to a complete new-moon or full-moon more often
		return phaseFraction >= 0.48 && phaseFraction <= 0.52 ? 0.5 : phaseFraction < 0.02 || phaseFraction > 0.98 ? 0 : round(phaseFraction, 2);
	}

	/**
	 * Returns a fraction of a day (0 at 0:00 and 1 at 24:00) for the current date and time
	 *
	 * @returns {number} Fraction between 0 and 1
	 */
	get fractionOfDay() {
		return (this.hour * 60 + this.minute) / (24 * 60);
	}

	/**
	 * Returns a fraction of a day starting at noon (0 at 12:00 and 0.99 at 11:59)
	 *
	 * @returns {number} Fraction between 0 and 1
	 */
	get fractionOfDayFromNoon() {
		return (((this.hour + 12) % 24) * 60 + this.minute) / (24 * 60);
	}

	/**
	 * Returns 1 during noon, and 0 during midnight, interpolating between. The difference between a fraction is that
	 * at the dawn and dusk (6 and 18 - the factor is 0.5)
	 *
	 * @returns {number} Factor between 0 and 1
	 */
	get simplifiedDayFactor() {
		const timeInHours = this.hour + this.minute / 60;
		return (Math.sin((Math.PI / 12) * timeInHours - Math.PI / 2) + 1) / 2;
	}

	/**
	 * Returns a fraction of the year (0 at the start of the year and 1 at the end) for the current date
	 *
	 * @returns {number} The fraction of the year.
	 */
	get fractionOfYear() {
		return this.yearDay / DateTime.getDaysOfYear(this.year);
	}

	/**
	 * Calculates the seasonal factor for the current date
	 * Returns 1 in winter (December 21) and 0 in summer (June 21), interpolating between them.
	 *
	 * @returns {number} Factor between 0 and 1
	 */
	get seasonFactor() {
		const summerSolstice = new DateTime(this.year, 6, 21);
		const winterSolstice = new DateTime(this.year, 12, 21);

		const previousSolstice =
			this.timeStamp < summerSolstice.timeStamp
				? new DateTime(this.year - 1, 12, 21)
				: this.timeStamp < winterSolstice.timeStamp
				? summerSolstice
				: winterSolstice;

		const nextSolstice =
			this.timeStamp < summerSolstice.timeStamp
				? summerSolstice
				: this.timeStamp < winterSolstice.timeStamp
				? winterSolstice
				: new DateTime(this.year + 1, 6, 21);

		const nextSolsticeFactor = nextSolstice === winterSolstice ? 1 : 0;

		const totalSecondsBetweenSolstices = nextSolstice.timeStamp - previousSolstice.timeStamp;
		const secondsSinceLastSolstice = this.timeStamp - previousSolstice.timeStamp;
		const factor = secondsSinceLastSolstice / totalSecondsBetweenSolstices;

		return nextSolsticeFactor === 1 ? factor : 1 - factor;
	}
}
window.DateTime = DateTime;
