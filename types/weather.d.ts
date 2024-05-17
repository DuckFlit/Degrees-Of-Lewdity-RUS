interface ImageLocation {
    folder: string;
    base?: ImageSetting | { [key: string]: ImageSetting };
    emissive?: EmissiveSetting | { [key: string]: EmissiveSetting };
    reflective?: ReflectiveSetting;
    layerTop?: ImageSetting | { [key: string]: ImageSetting };
}

interface AnimationSetting {
    frameDelay: number | (() => number);
    cycleDelay?: number | (() => number);
    startDelay?: number | (() => number);
    startFrame?: number | (() => number);
}

interface ImageSetting {
    image: string;
    condition?: boolean | (() => boolean);
    waitForAnimation?: string;
    alwaysDisplay?: boolean;
    animation?: string | AnimationSetting;
    frame?: number | (() => number);
}

interface EmissiveSetting {
    image: string;
    condition?: () => boolean;
    waitForAnimation?: string;
    alwaysDisplay?: boolean;
    animation?: string | AnimationSetting;
    color?: string;
    size?: number;
    strength?: number;
    intensity?: number | (() => number);
}

interface ReflectiveSetting {
    mask: MaskSetting;
    [key: string]: ImageSetting | any;
}

interface MaskSetting {
    image: string;
    alpha?: number | (() => number);
	horizon?: number | (() => number);
	waveShiftFactor?: number | (() => number);
	animationCondition?: boolean | (() => boolean);
}
declare global {
	export interface LocationImages {
        [locationKey: string]: ImageLocation;
    }
}

export {};
