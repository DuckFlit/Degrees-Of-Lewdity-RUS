class DateTime {
	static secondsPerDay = 86400;
	static secondsPerHour = 3600;
	static secondsPerMinute = 60;
	static standardYearMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	static leapYearMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	static monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	static daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	constructor(year = 2000, month = 1, day = 1, hour = 0, minute = 0, second = 0) {
		if (arguments.length === 1) {
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
			if (arguments[0] < 0 || arguments[0] > 315569437199)
				throw new Error("Invalid timestamp: Timestamp cannot be lower than 0 or higher than 315569437199.");
			this.fromTimestamp(arguments[0]);
			return;
		}

		this.toTimestamp(year, month, day, hour, minute, second);
	}

	/*
	 * Total days since start of timeStamp calculation (year 0)
	 */
	static getTotalDaysSinceStart(year) {
		return year * 365 + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
	}

	static isLeapYear(year) {
		return year !== 0 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	static getDaysOfMonthFromYear(year) {
		return DateTime.isLeapYear(year) ? DateTime.leapYearMonths : DateTime.standardYearMonths;
	}

	static getDaysOfYear(year) {
		return DateTime.isLeapYear(year) ? 366 : 365;
	}

	toTimestamp(year, month, day, hour, minute, second) {
		if (year < 1 || year > 9999) throw new Error("Invalid year: Year must be between 1-9999.");
		if (month < 1 || month > 12) throw new Error("Invalid month: Month must be between 1-12.");
		const daysInMonth = DateTime.getDaysOfMonthFromYear(year);
		if (day < 1 || day > daysInMonth[month - 1]) throw new Error("Invalid date: Day must be between 1-" + daysInMonth[month - 1] + ".");

		const totalDays = DateTime.getTotalDaysSinceStart(year) + daysInMonth.slice(0, month - 1).reduce((a, b) => a + b, 0) + day - 1;
		const totalSeconds = totalDays * DateTime.secondsPerDay + hour * DateTime.secondsPerHour + minute * DateTime.secondsPerMinute + second;

		this.timeStamp = totalSeconds;
		this.year = year;
		this.month = month;
		this.day = day;
		this.hour = hour;
		this.minute = minute;
		this.second = second;
	}

	fromTimestamp(timestamp) {
		let year = 0;
		let month = 0;
		let day = (timestamp / DateTime.secondsPerDay) | 0;
		const hour = (timestamp / DateTime.secondsPerHour) | 0;
		const minute = (timestamp / DateTime.secondsPerMinute) | 0;
		const second = timestamp;

		while (day >= DateTime.getDaysOfYear(year + 1)) day -= DateTime.getDaysOfYear(year++ + 1);
		const daysPerMonth = DateTime.getDaysOfMonthFromYear(year);
		while (day >= daysPerMonth[month]) day -= daysPerMonth[month++];

		this.timeStamp = timestamp;
		this.year = year;
		this.month = month + 1;
		this.day = day + 1;
		this.hour = hour % 24;
		this.minute = minute % 60;
		this.second = second % 60;
	}

	getFirstWeekdayOfMonth(weekDay) {
		if (weekDay < 1 || weekDay > 7) throw new Error("Invalid weekDay: Must be between 1-7");

		const date = new DateTime(this.year, this.month, 1);
		return date.addDays((weekDay - date.weekDay + 7) % 7);
	}

	getNextWeekdayDate(weekDay) {
		if (weekDay < 1 || weekDay > 7) throw new Error("Invalid weekDay: Must be between 1-7");

		const days = ((7 + weekDay - this.weekDay - 1) % 7) + 1;
		const date = new DateTime(this);
		return date.addDays(days);
	}

	getPreviousWeekdayDate(weekDay) {
		if (weekDay < 1 || weekDay > 7) throw new Error("Invalid weekDay: Must be between 1-7");
		const days = ((7 + weekDay - this.weekDay) % 7) - 7;
		const date = new DateTime(this);
		return date.addDays(days);
	}

	addYears(years) {
		if (years === 0) return this;
		const newYear = this.year + years;
		const daysInMonth = DateTime.getDaysOfMonthFromYear(newYear);
		const newDay = Math.min(this.day, daysInMonth[this.month - 1]);

		this.toTimestamp(newYear, this.month, newDay, this.hour, this.minute, this.second);
		return this;
	}

	addMonths(months) {
		if (months === 0) return this;
		const addedMonths = this.month + months;
		const newYear = this.year + Math.floor((addedMonths - 1) / 12);
		const newMonth = ((addedMonths - 1) % 12) + 1;
		const newDay = Math.min(this.day, DateTime.getDaysOfMonthFromYear(newYear)[newMonth - 1]);

		this.toTimestamp(newYear, newMonth, newDay, this.hour, this.minute, this.second);
		return this;
	}

	addDays(days) {
		if (days === 0) return this;
		this.fromTimestamp(this.timeStamp + days * DateTime.secondsPerDay);
		return this;
	}

	addHours(hours) {
		if (hours === 0) return this;
		this.timeStamp += hours * DateTime.secondsPerHour;
		this.fromTimestamp(this.timeStamp);
		return this;
	}

	addMinutes(minutes) {
		if (minutes === 0) return this;
		this.timeStamp += minutes * DateTime.secondsPerMinute;
		this.fromTimestamp(this.timeStamp);
		return this;
	}

	addSeconds(seconds) {
		if (seconds === 0) return this;
		this.timeStamp += seconds;
		this.fromTimestamp(this.timeStamp);
		return this;
	}

	get weekDay() {
		return (
			1 +
			((DateTime.getTotalDaysSinceStart(this.year) +
				(DateTime.standardYearMonths.slice(0, this.month - 1).reduce((a, b) => a + b, 0) -
					(DateTime.isLeapYear(this.year) && this.month < 3) +
					this.day +
					(V.weekDayOffset !== undefined ? V.weekDayOffset : 6))) % // teach the bird to f
				7)
		);
	}

	get weekDayName() {
		return DateTime.daysOfWeek[this.weekDay - 1];
	}

	get monthName() {
		return DateTime.monthNames[this.month - 1];
	}

	get weekEnd() {
		return this.weekDay === 7 || this.weekDay === 1;
	}

	get lastDayOfMonth() {
		const daysPerMonth = DateTime.getDaysOfMonthFromYear(this.year);
		return daysPerMonth[this.month - 1];
	}

	get yearDay() {
		const daysPerMonth = DateTime.getDaysOfMonthFromYear(this.year);
		return daysPerMonth.slice(0, this.month - 1).reduce((a, b) => a + b, 0) + this.day;
	}
}
window.DateTime = DateTime;
