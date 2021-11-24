"use strict";
/******************************************************************
 * DeviceUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceUtils = /** @class */ (function () {
    function DeviceUtils() {
    }
    Object.defineProperty(DeviceUtils, "SCREEN_PIXEL_RATIO", {
        get: function () {
            return window.devicePixelRatio || 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "HAS_TOUCH_SCREEN", {
        get: function () {
            return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_IOS", {
        get: function () {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_IPAD_OS", {
        get: function () {
            return DeviceUtils.IS_IOS || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_ANDROID", {
        get: function () {
            return /Android/.test(navigator.userAgent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_MOBILE", {
        get: function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_IE", {
        get: function () {
            var ieVersion = this.getInternetExplorerVersion();
            return (ieVersion == 10 || ieVersion == 11);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_FIREFOX", {
        get: function () {
            return navigator.userAgent.search("Firefox") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_EDGE", {
        get: function () {
            return navigator.userAgent.search("Edge") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_WINDOWS", {
        get: function () {
            return navigator.platform.toUpperCase().indexOf('WIN') > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_MAC", {
        get: function () {
            return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IS_WINDOWS_MOBILE", {
        get: function () {
            var isWindowsMobile = false;
            if (navigator.userAgent.match(/Windows Phone/i)) {
                isWindowsMobile = true;
            }
            if (navigator.userAgent.match(/iemobile/i)) {
                isWindowsMobile = true;
            }
            if (navigator.userAgent.match(/WPDesktop/i)) {
                isWindowsMobile = true;
            }
            return isWindowsMobile;
        },
        enumerable: true,
        configurable: true
    });
    DeviceUtils.getInternetExplorerVersion = function () {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]+[\.0-9]*)");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent;
            var re = new RegExp("Trident/.*rv:([0-9]+[\.0-9]*)");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    };
    return DeviceUtils;
}());
exports.DeviceUtils = DeviceUtils;
