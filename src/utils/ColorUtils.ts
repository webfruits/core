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

}
