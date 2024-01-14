/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

const observables = ObservableValue.fromObject({
    location: "",
	time: 0,
	weather: ""
});
/* Variable observables */
$(document).on(":passageend", () => {
	observables.location.value = V.location;
	observables.time.value = Time.date.timeStamp;
	observables.weather.value = Weather.name;
});

const WeatherObservables = (() => {
	

	/* LOCATION */
	observables.location.subscribe( (value) => {
		onLocationUpdate(value);
	})


	function onWeatherUpdate() {
		// do things
	}

	// const awaitValidation = newValue => {
	// 	if (newValue === true) {

	// 		// Take a snapshot of the previous passage to prevent variables and widgets to be run twice in a row
	// 		setup.combatSnapshot = Object.assign({}, State.variables);
	// 		Engine.play(V.passage, true);
	// 	}
	// };
	// // This code only runs when page is refreshed during a combat-passage - otherwise validation will finish in another passage
	// if (!Combat.validationFinished.value) {
	// 	Combat.validationFinished.subscribe(awaitValidation);
	// 	return;
	// }
 
	function onLocationUpdate() {
		// Check which location
		// location = x
		// Later use a property
		// For now, if-else or switch
		//
		//In each location that has an effect:
		//WeatherC.addEffect("fog"
		return;

		/* Placeholder code */
		const seasonPath = Weather.SkyCanvas.location.isSnow() ? Weather.SkyCanvas.location.imgPath.winter : Weather.SkyCanvas.location.imgPath.normal;
		const dayState = "_" + Time.dayState;
		const dayStateBloodMoon = Weather.bloodMoon || V.forcedBloodmoon ? "_bloodmoon" : dayState;
		let imagePath = "";

		const location = !V.location ? "home" : V.location;
		switch (location) {
			case "adult_shop":
				getAdultShopState();
				if (Time.dayState === "day" && V.adultshopstate !== "closed") {
					imagePath = `${seasonPath}sex_shop${dayState}_open.apng`;
				} else {
					imagePath = `${seasonPath}sex_shop${dayState}.apng`;
				}
				break;
			case "alex_farm":
				imagePath = V.bus === "woodland" ? `${seasonPath}forest${dayStateBloodMoon}.apng` : `${seasonPath}/alex_farm${dayState}.apng`;
				break;
			case "alley":
				imagePath =
					V.bus === "industrial"
						? `${seasonPath}indust_alley${dayStateBloodMoon}.apng`
						: V.bus === "residential"
						? `${seasonPath}/resi_alley${dayStateBloodMoon}.apng`
						: `${seasonPath}/alley${dayStateBloodMoon}.apng`;
				break;
			case "asylum":
				imagePath = V.hallucinations >= 1 ? `${seasonPath}asylum${dayState}vfast.apng` : `${seasonPath}asylum${dayState}slow.apng`;
				break;
			case "cafe":
				imagePath =
					V.chef_state >= 9
						? `${seasonPath}cafe_renovated${dayState}.apng`
						: V.chef_state >= 9
						? `${seasonPath}cafe_construction${dayState}.apng`
						: `${seasonPath}cafe${dayState}.apng`;
				break;
			case "chalets":
				imagePath = `${seasonPath}beach${dayState}.apng`;
				break;
			case "bog":
				imagePath = `${seasonPath}bog${dayStateBloodMoon}.apng`;
				break;
			case "drain":
				imagePath = `${seasonPath}drain.apng`;
				break;
			case "forest":
				imagePath = `${seasonPath}forest${dayStateBloodMoon}.apng`;
				break;
			case "home":
				imagePath = `${seasonPath}home${dayStateBloodMoon}.apng`;
				break;
			case "lake":
				imagePath = `${seasonPath}lake${dayStateBloodMoon}.apng`;
				break;
			case "lake_ruin":
				imagePath = `${seasonPath}lake_ruin${dayStateBloodMoon}.apng`;
				break;
			case "mines":
				imagePath = `${seasonPath}underground${dayState}.apng`;
				break;
			case "prison":
				imagePath = `${seasonPath}prison${dayStateBloodMoon}.apng`;
				break;
			case "temple":
				imagePath = Time.year <= 1000 ? `${seasonPath}temple${dayState}_old.apng` : `${seasonPath}temple${dayState}.apng`;
				break;
			case "tower":
			case "castle":
				imagePath = `${seasonPath}tower${dayStateBloodMoon}.apng`;
				break;
			default:
				imagePath = `${seasonPath}${location}${dayState}.apng`;
		}

		WeatherC.addEffect("fog");
		//WeatherC.
	}

	return {
		onWeatherUpdate
	};
})();

/*
Factory:
	- Effect
	- Layer
	- 

Events: (ObservableValue)
	- onImagesLoaded
	- onWeatherUpdate
	- onChangeMoonPhase
	- onRedraw
	- onChangeLocation
	- on

*/


//Weather.Sky.AddEffect();
