"use strict";
/******************************************************************
 * ColorUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var ColorUtils = /** @class */ (function () {
    function ColorUtils() {
    }
    ColorUtils.convertColorFromHexToCSS = function (color) {
        // taken from https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
        var c = (color & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        var result = "00000".substring(0, 6 - c.length) + c;
        return "#" + result;
    };
    ColorUtils.addAlphaToCSS = function (cssColor, alpha) {
        // taken from https://stackoverflow.com/questions/19799777/how-to-add-transparency-information-to-a-hex-color-code
        var alphaFloat = alpha * 255;
        var alphaInt = Math.floor(alphaFloat);
        var alphaString = alphaInt.toString(16);
        alphaString = alphaInt < 16 ? '0' + alphaString : alphaString;
        return cssColor + alphaString;
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
