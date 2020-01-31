/******************************************************************
 * ColorUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class ColorUtils {

    static convertColorFromHexToCSS(color: number): string {
        // taken from https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
        let c = (color & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        let result = "00000".substring(0, 6 - c.length) + c;
        return "#" + result;
    }

    static addAlphaToCSS(cssColor: string, alpha: number): string {
        // taken from https://stackoverflow.com/questions/19799777/how-to-add-transparency-information-to-a-hex-color-code
        let alphaFloat = alpha * 255;
        let alphaInt = Math.floor(alphaFloat);
        let alphaString = alphaInt.toString(16);
        alphaString = alphaInt < 16 ? '0' + alphaString : alphaString;
        return cssColor + alphaString;
    }

}
