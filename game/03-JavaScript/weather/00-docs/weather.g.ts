interface ImageLocation {
    folder: string;
    base: ImageSetting | { [key: string]: ImageSetting };
    emissive?: EmissiveSetting | { [key: string]: EmissiveSetting };
    reflective?: ReflectiveSetting };
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
    mask: MaskSetting;
    [key: string]: ImageSetting;
}

interface MaskSetting {
    image: string;
    alpha?: number;
	horizon?: number;
}

declare global {
    interface LocationImages {
        [locationKey: string]: ImageLocation;
    }
}
export {};
