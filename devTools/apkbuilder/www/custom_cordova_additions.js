// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// Cordova is now initialized. Have fun!

	// turn on the toaster
	window.Toast = cordova.plugins.rnk.toast;
	// record the last time when back button was pressed
	window.lastBackEvent = 0;
	// save back button from instant seppuku and give it purpose
    document.addEventListener("backbutton", (ev) => {
		ev.preventDefault();
		// back button can now close opened dialog menus
		if (SugarCube.Dialog.isOpen()) SugarCube.Dialog.close();
		if (window.T && T.currentOverlay) closeOverlay(); // dol-specific
		// if no menus are open, warn that the next back button press in short succession will close the app
		else if (Date.now() > window.lastBackEvent + 3500) {
			Toast.showToast("Press BACK again to exit", Toast.LONG);
			window.lastBackEvent = Date.now();
		}
		// otherwise, quit the app
		else navigator.app.exitApp();

		return false;
	}, false)
}
