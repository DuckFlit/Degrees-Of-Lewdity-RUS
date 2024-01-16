/* Sidebar swipe */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(ev) {
	const firstTouch = ev.touches[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
}

function handleTouchMove(ev) {
	if (!xDown || !yDown) return;

	// Activate the swipe only when finger is over the UI Bar
	const stowedWidth = 60; // appx. width of stowed UI Bar in px
	const unstowedWidth = 300; // same for unstowed UI Bar
	// actually, let's just use a threshold instead
	// if (UIBar.isStowed() && xDown > stowedWidth || xDown > unstowedWidth) return;

	const xUp = ev.touches[0].clientX;
	const yUp = ev.touches[0].clientY;

	const xDiff = xDown - xUp;
	const yDiff = yDown - yUp;

	// distance to swipe before triggering action
	const threshold = 100;
	if (Math.abs(xDiff) < threshold) return;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		// most significant
		if (xDiff > 0) UIBar.stow(); // left swipe
		else UIBar.unstow(); // right swipe
		// allow opening and then closing sidebar without breaking the touch
		xDown = xUp;
		yDown = yUp;
		return;
	}
	else {
		if (yDiff > 0); // up swipe
		else; // down swipe
		// nothing yet, just reset the values
		xDown = null;
		yDown = null;
	}
}
