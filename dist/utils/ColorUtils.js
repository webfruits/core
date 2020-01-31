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
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
