/**
 * @typedef {Object<string, ImageLocation>} LocationImages
 */

/**
 * @typedef {object} ImageLocation
 * @property {string} folder The folder path.
 * @property {ImageSetting|Object<string, ImageSetting>} base Base images and conditions.
 * @property {EmissiveSetting|Object<string, EmissiveSetting>} [emissive] Emissive images and settings.
 * @property {ReflectiveSetting|Object<string, ReflectiveSetting>} [reflective] Reflective images and settings.
 */

/**
 * @typedef {object} AnimationSetting
 * @property {number|Function} frameDelay Delay between frames in milliseconds.
 * @property {number|Function} [cycleDelay] Delay between animation cycles in milliseconds.
 * @property {number|Function} [startDelay] Delay before starting the animation in milliseconds.
 * @property {number|Function} [startFrame] Start frame on image load
 */

/**
 * @typedef {object} ImageSetting
 * @property {string} image Image filename.
 * @property {boolean|Function} [condition] Function that determines if the condition is met.
 * @property {string} [waitForAnimation] If set, pauses current delays while selected animation is running.
 * @property {boolean} [alwaysDisplay] When false, hide the first frame while startDelay or cycleDelay is running. If true, always draw the first frame, regardless.
 * @property {string|AnimationSetting} [animation] Animation settings for the image.
 * @property {number|Function} [frame] Selected frame in the spritesheet.
 */

/**
 * @typedef {object} EmissiveSetting
 * @property {string} image Image filename.
 * @property {Function} [condition] Function that determines if the condition is met.
 * @property {string} [waitForAnimation] If set, pauses current delays while selected animation is running.
 * @property {boolean} [alwaysDisplay] When false, hide the first frame while startDelay or cycleDelay is running. If true, always draw the first frame, regardless.
 * @property {string|AnimationSetting} [animation] Animation settings for the image.
 * @property {string} [color] Color for emissive effects.
 * @property {number} [size] Size modifier for the image or effect.
 * @property {number} [strength]
 * @property {number|Function} [alpha]
 */

/**
 * @typedef {object} ReflectiveSetting
 * @property {string} image Image filename.
 * @property {number} [alpha] Optional alpha.
 * @property {Function} [condition] Function that determines if the condition is met.
 */
