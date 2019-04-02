/******************************************************************
 * CustomElementsUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class CustomElementsUtils {

    /******************************************************************
     * Properties
     *****************************************************************/

    private static readonly HTML_TAGS = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rb", "rbc", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"];
    private static _es5CustomElementsAdapterInitizialied: boolean = false;

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    static isHTML5Element(elementName: string): boolean {
        return this.HTML_TAGS.indexOf(elementName.toLowerCase()) != -1;
    }

    static defineCustomElement(elementName: string) {
        if (typeof customElements == "undefined") {
            console.error("CustomElements not supported. Try to use a polyfill like '@webcomponents/custom-elements'");
        }
        if (elementName.indexOf("-") == -1) {
            console.error("'" + elementName + "' does not contain a hyphen, which is required by CustomElement specifications.");
            return;
        }
        if (this.isHTML5Element(elementName)) {
            console.error("'" + elementName + "' is a native html tag name, which is not allowed for a CustomElement");
            return;
        }
        this.initES5CustomElementsAdapter();
        if (customElements.get(elementName) != undefined) {
            return;
        }
        customElements.define(elementName, class extends HTMLElement {
        });
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    // taken from @webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
    private static initES5CustomElementsAdapter() {
        if (this._es5CustomElementsAdapterInitizialied) return;
        this._es5CustomElementsAdapterInitizialied = true;
        if (void 0 === window['Reflect'] || void 0 === window.customElements || window.customElements.hasOwnProperty('polyfillWrapFlushCallback')) return;
        const a = HTMLElement;
        window['HTMLElement'] = function HTMLElement() {
            return Reflect.construct(a, [], this.constructor)
        };
        HTMLElement.prototype = a.prototype;
        HTMLElement.prototype.constructor = HTMLElement;
        Object.setPrototypeOf(HTMLElement, a)
    }

    /******************************************************************
     * Events
     *****************************************************************/

}
