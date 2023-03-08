/* eslint-disable no-undef */
function displayMonthday() {
	return ordinalSuffixOf(V.monthday);
}
DefineMacroS("displayMonthday", displayMonthday);

function month() {
	T.month = V.month[0].toUpperCase() + V.month.substring(1);
	if (T.args[0]) {
		T.month = T.month.slice(0, 3);
	}
	return T.month;
}
DefineMacroS("month", month);
