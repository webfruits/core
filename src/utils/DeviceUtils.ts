/******************************************************************
 * DeviceUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class DeviceUtils {

    static get SCREEN_PIXEL_RATIO(): number {
        return window.devicePixelRatio || 1;
    }

    public static get HAS_TOUCH_SCREEN(): boolean {
        return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    }

    public static get IS_IOS(): boolean {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }

    public static get IS_IPAD_OS(): boolean {
        return DeviceUtils.IS_IOS || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
    }

    public static get IS_ANDROID(): boolean {
        return /Android/.test(navigator.userAgent);
    }

    public static get IS_MOBILE(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    public static get IS_IE(): boolean {
        let ieVersion = this.getInternetExplorerVersion();
        return (ieVersion == 10 || ieVersion == 11);
    }

    public static get IS_FIREFOX(): boolean {
        return navigator.userAgent.search("Firefox") != -1;
    }

    public static get IS_EDGE(): boolean {
        return navigator.userAgent.search("Edge") != -1;
    }

    public static get IS_WINDOWS(): boolean {
        return navigator.platform.toUpperCase().indexOf('WIN') > -1
    }

    public static get IS_MAC(): boolean {
        return navigator.platform.toUpperCase().indexOf('MAC')>=0;
    }

    public static get IS_WINDOWS_MOBILE(): boolean {
        let isWindowsMobile = false;
        if(navigator.userAgent.match(/Windows Phone/i)){
            isWindowsMobile = true;
        }
        if(navigator.userAgent.match(/iemobile/i)){
            isWindowsMobile = true;
        }
        if(navigator.userAgent.match(/WPDesktop/i)){
            isWindowsMobile = true;
        }
        return isWindowsMobile;
    }

    public static getInternetExplorerVersion() {
        let rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            let ua = navigator.userAgent;
            let re = new RegExp("MSIE ([0-9]+[\.0-9]*)");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.appName == 'Netscape') {
            let ua = navigator.userAgent;
            let re = new RegExp("Trident/.*rv:([0-9]+[\.0-9]*)");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

}
