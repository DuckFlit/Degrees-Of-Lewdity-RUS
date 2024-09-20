declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		combat: boolean;
		position: 0 | "doggy" | "missionary" | "wall" | "stalk" | "wall";

		walltype?: "pillory" | "cleanpillory" | "horse_pillory";
		pilloryaudience?: number;

		arousalmax: number;
		enemyarousal: number;
		enemyarousalmax: number;

		orgasmdown: number;
		orgasmcount: number;

		vaginause: number | string;
		anususe: number | string;
		mouth: number | string;
		head: number | string;
		front: number | string;
		back: number | string;
		chest: number | string;
		leftarm: number | string;
		rightarm: number | string;

		anustarget: number;
		anususe: number;
		anusstate: string | 0;
		bottomtarget: number;
		bottomuse: number;
		bottomstate: string | 0;
		chesttarget: number;
		chestuse: "penis" | 0;
		cheststate: string | 0;
		feettarget: number;
		feetuse: "penis" | 0;
		feetstate: string | 0;
		handtarget: number;
		handuse: number;
		handstate: string | 0;
		lefttarget: number;
		leftuse: number;
		leftstate: string | 0;
		mouthtarget: number;
		mouthuse: number;
		mouthstate: string | 0;
		penistarget: number;
		penisuse: string | 1 | 0;
		penisstate: string | 0;
		righttarget: number;
		rightuse: number;
		rightstate: string | 0;
		stealtarget: number;
		stealuse: number;
		stealstate: string | 0;
		thightarget: number;
		thighuse: "penis" | 0;
		thighstate: string | 0;
		tooltarget: number;
		tooluse: number;
		toolstate: string | 0;
		vaginatarget: number;
		vaginause: number;
		vaginastate: string | 0;

		fingersInVagina: number;
		vaginaFingerLimit: number;
		selfsuckDepth: number;
		penisHeight: number;
		corruptionMasturbation: boolean;
		corruptionMasturbationCount: number;
		masturbationorgasmstat: number;
		masturbationOrgasmTimeStat: TimeStamp;
		masturbationorgasm: number;
		masturbationorgasmsemen: number;
		secondsSpentMasturbating: number;
		femaleclimax: number;

		currentToyLeft: any;
		currentToyRight: any;
		currentToyVagina: any;
		currentToyAnus: any;

		prop: string[];
		machine?: {
			tattoo: {
				use: string;
			};
		};
		tentacleColour:
			| "tentacles-blue"
			| "tentacles-vines"
			| "tentacles-roots"
			| "tentacles-red"
			| "tentacles-purple"
			| "tentacles-peach"
			| "tentacles-wraith"
			| "tentacles-wraith-penetrated";
		tentacles: {
			0?: TentacleState;
			1?: TentacleState;
			2?: TentacleState;
			3?: TentacleState;
			4?: TentacleState;
			5?: TentacleState;
			6?: TentacleState;
			7?: TentacleState;
			8?: TentacleState;
			9?: TentacleState;
			10?: TentacleState;
			11?: TentacleState;
			12?: TentacleState;
			13?: TentacleState;
			14?: TentacleState;
			15?: TentacleState;
			16?: TentacleState;
			17?: TentacleState;
			18?: TentacleState;
			19?: TentacleState;
			20?: TentacleState;
			active: number;
			max: number;
		};
		swarm: Swarm;
	}

	export interface SugarCubeTemporaryVariables {
		crOverrides?: CombatRendererOverrides;
	}

	export interface SugarCubeSetupObject {
		positions: Positions[];
		legPositions: LegPositions[];
	}
}

declare global {
	export type Positions = 0 | "doggy" | "missionary" | "wall" | "stalk" | "wall";

	export type LegPositions = "up" | "down" | "footjob";

	export type AnimationSpeed = "vfast" | "fast" | "mid" | "slow" | "idle";

	export interface CombatRendererOverrides {
		legBackPosition?: LegPositions;
		legFrontPosition?: LegPositions;
		animSpeed?: AnimationSpeed;
		animFrames?: number;
	}

	export interface TentacleState {
		baby: number;
		babychance: number;
		desc: string;
		fullDesc: string;
		head: string;
		id: string;
		shaft: string;
		size: number;
		tentaclehealth: number;
		tentaclehealthstart: number;
		traits: string[];
		type: "tentacle";
	}

	export interface Swarm {
		amount: {
			active: number[];
			genital: number[];
			butt: number[];
		};
	}
}

export {};
