/******************************************************************
 * DeviceUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class DeviceUtils {
    static get SCREEN_PIXEL_RATIO(): number;
    static get HAS_TOUCH_SCREEN(): boolean;
    static get IS_IOS(): boolean;
    static get IS_ANDROID(): boolean;
    static get IS_MOBILE(): boolean;
    static get IS_IE(): boolean;
    static get IS_FIREFOX(): boolean;
    static get IS_EDGE(): boolean;
    static get IS_WINDOWS(): boolean;
    static get IS_MAC(): boolean;
    static get IS_WINDOWS_MOBILE(): boolean;
    static getInternetExplorerVersion(): number;
}
