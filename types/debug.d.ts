declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		debug: 0 | 1;
		event?: {
			buffer: EventNpc[];
			schema: number;
		};
		/** @deprecated */
		eventslot?: number;
		/** @deprecated */
		eventtime?: number;
		options: DolSettingsOptions;
		passage: string;
		phase: number | string;
		rng: number;
		danger: number;
		index: number;
	}
}

declare global {
	export interface DolSettingsOptions {
		debugdisable: "f" | "t";
	}

	export interface Window {
		EventSystem: EventData;
	}

	export interface EventNpc {
		slot: number;
		time: number;
		area: string[];
	}
}

export {};
