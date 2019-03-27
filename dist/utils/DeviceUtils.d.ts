/******************************************************************
 * DeviceUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class DeviceUtils {
    static readonly HAS_TOUCH_SCREEN: boolean;
    static readonly IS_IOS: boolean;
    static readonly IS_MOBILE: boolean;
    static readonly IS_IE: boolean;
    static readonly IS_FIREFOX: boolean;
    static readonly IS_EDGE: boolean;
    static readonly IS_WINDOWS: boolean;
    static readonly IS_MAC: boolean;
    static readonly IS_WINDOWS_MOBILE: boolean;
    static getInternetExplorerVersion(): number;
}
