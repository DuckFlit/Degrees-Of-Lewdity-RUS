type EnglishPlayNames = "Cass" | "Taylor" | "Sterling" | "none";

declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		schoolstate:
			| "lunch"
			| "afternoon"
			| "early"
			| "morning"
			| "first"
			| "second"
			| "third"
			| "fourth"
			| "fifth"
			| "late"
			| "earlynoschool"
			| "daynoschool"
			| "latenoschool";

		englishPlay: "ongoing" | "none" | "missed" | "done";
		englishPlayReadiness: number;
		englishPlayDoubleRehearsal: boolean;

		englishPlayRoles: {
			Player: EnglishPlayNames;
			Kylar: EnglishPlayNames;
			Sydney: EnglishPlayNames;
			KylarKnown: boolean;
			KylarCount: number;
			SydneyKnown: boolean;
			SydneyCount: number;
		};
	}
}

export {};
