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
    alpha?: number | (() => number);
}

interface ReflectiveSetting {
	/**
     * The primary mask setting used to define the basic masking properties of a reflection.
     * This should be the first property defined for clarity when setting up reflective properties.
     */
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
    interface LocationImages {
        [locationKey: string]: ImageLocation;
    }
}
export {};
