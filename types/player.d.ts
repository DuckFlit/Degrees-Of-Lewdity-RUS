declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		player: Player;
		arousal: number;
		awareness: number;
		possessed: boolean;
	}
}

declare global {
	export interface Player {
		penisExist: boolean;
		vaginaExist: boolean;
		penissize: number;
		penis: string;
		vagina: string;
	}
}

export {};
