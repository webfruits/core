/******************************************************************
 * CustomElementsUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class CustomElementsUtils {
    /******************************************************************
     * Properties
     *****************************************************************/
    private static readonly HTML_TAGS;
    private static _es5CustomElementsAdapterInitizialied;
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    static isHTML5Element(elementName: string): boolean;
    static defineCustomElement(elementName: string): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private static initES5CustomElementsAdapter;
}
