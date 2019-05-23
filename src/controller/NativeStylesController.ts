/******************************************************************
 * NativeStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class NativeStylesController {

    /******************************************************************
     * Properties
     *****************************************************************/

    public static SHOW_WARNINGS_WHEN_PROPERTIES_GETTING_IGNORED = true;

    private static readonly PURE_NUMBER_TO_STRING_PROPERTIES = [
        "opacity",
        "fontweight",
        "zIndex"
    ];

    private static readonly IGNORED_PROPERTIES_FOR_INLINE = [
        "x",
        "y",
        "z",
        "scale",
        "scaleX",
        "scaleY",
        "scaleZ",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "width",
        "height",
        "margin",
        "marginTop",
        "marginBottom",
        "marginLeft",
        "marginRight"
    ];

    private static readonly DEFAULT_TRANSFORM_PROPERTY_VALUES = {
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
    };

    private _transformProperties = {
        x: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.x,
        y: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.y,
        z: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.z,
        rotate: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.rotate,
        rotateX: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.rotateX,
        rotateY: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.rotateY,
        rotateZ: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.rotateZ,
        scale: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scale,
        scaleX: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scaleX,
        scaleY: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scaleY,
        scaleZ: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scaleZ,
    };

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _element: HTMLElement) {
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public applyStyle(cssStyle: CSSStyleDeclaration | any) {
        for (let propertyName in cssStyle) {
            if (cssStyle.hasOwnProperty(propertyName)) {
                let value = cssStyle[propertyName];
                if (this.isTransformProperty(propertyName)) {
                    this.applyTransformProperties(propertyName, value);
                } else {
                    this.applyNativeProperties(propertyName, value);
                }
                this.warnIfStylesWillBeIgnored(propertyName, value);
            }
        }
    }

    get x(): number {
        return this._transformProperties.x;
    }

    set x(value: number) {
        this.applyTransformProperties("x", value);
    }

    get y(): number {
        return this._transformProperties.y;
    }

    set y(value: number) {
        this.applyTransformProperties("y", value);
    }

    get z(): number {
        return this._transformProperties.z;
    }

    set z(value: number) {
        this.applyTransformProperties("z", value);
    }

    get rotate(): number {
        return this._transformProperties.rotate;
    }

    set rotate(value: number) {
        this.applyTransformProperties("rotate", value);
    }

    get rotateX(): number {
        return this._transformProperties.rotateX;
    }

    set rotateX(value: number) {
        this.applyTransformProperties("rotateX", value);
    }

    get rotateY(): number {
        return this._transformProperties.rotateY;
    }

    set rotateY(value: number) {
        this.applyTransformProperties("rotateY", value);
    }

    get rotateZ(): number {
        return this._transformProperties.rotateZ;
    }

    set rotateZ(value: number) {
        this.applyTransformProperties("rotateZ", value);
    }

    get scale(): number {
        return this._transformProperties.scale;
    }

    set scale(value: number) {
        this.applyTransformProperties("scale", value);
    }

    get scaleX(): number {
        return this._transformProperties.scaleX;
    }

    set scaleX(value: number) {
        this.applyTransformProperties("scaleX", value);
    }

    get scaleY(): number {
        return this._transformProperties.scaleY;
    }

    set scaleY(value: number) {
        this.applyTransformProperties("scaleY", value);
    }

    get scaleZ(): number {
        return this._transformProperties.scaleZ;
    }

    set scaleZ(value: number) {
        this.applyTransformProperties("scaleZ", value);
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private applyNativeProperties(propertyName: string, value: any) {
        switch (typeof value) {
            case "number":
                if (propertyName.toLowerCase().indexOf("color") != -1) {
                    this._element.style[propertyName] = "#" + (value as number).toString(16);
                } else if (this.isPropertyNameAPureNumber(propertyName)) {
                    this._element.style[propertyName] = value.toString();
                } else {
                    this._element.style[propertyName] = value + "px";
                }
                break;
            case "string":
                this._element.style[propertyName] = value;
                break;
            case "undefined":
            case "object":
                this._element.style.removeProperty(propertyName);
        }
    }

    private applyTransformProperties(propertyName: string, value: any) {
        this._transformProperties[propertyName] = value;
        if (propertyName == "scale") {
            this._transformProperties.scaleX = value;
            this._transformProperties.scaleY = value;
        }
        let x = this.parseTransformProperty("x", "px");
        let y = this.parseTransformProperty("y", "px");
        let z = this.parseTransformProperty("z", "px");
        let sX = this.parseTransformProperty("scaleX");
        let sY = this.parseTransformProperty("scaleY");
        let sZ = this.parseTransformProperty("scaleZ");
        let r = this.parseTransformProperty("rotate", "deg");
        let rX = this.parseTransformProperty("rotateX", "deg");
        let rY = this.parseTransformProperty("rotateY", "deg");
        let rZ = this.parseTransformProperty("rotateZ", "deg");
        let composedValue = "";
        if (this.hasTransformPropertyAValue("x")) {
            composedValue += `translateX(${x})`;
        }
        if (this.hasTransformPropertyAValue("y")) {
            composedValue += `translateY(${y})`;
        }
        if (this.hasTransformPropertyAValue("z")) {
            composedValue += `translateZ(${z})`;
        }
        if (this.hasTransformPropertyAValue("rotate")) {
            composedValue += ` rotate(${r})`
        }
        if (this.hasTransformPropertyAValue("rotateX")) {
            composedValue += ` rotateX(${rX})`
        }
        if (this.hasTransformPropertyAValue("rotateY")) {
            composedValue += ` rotateY(${rY})`
        }
        if (this.hasTransformPropertyAValue("rotateZ")) {
            composedValue += ` rotateZ(${rZ})`
        }
        if (this.hasTransformPropertyAValue("scaleX")) {
            composedValue += ` scaleX(${sX})`;
        }
        if (this.hasTransformPropertyAValue("scaleY")) {
            composedValue += ` scaleY(${sY})`;
        }
        if (this.hasTransformPropertyAValue("scaleZ")) {
            composedValue += ` scaleZ(${sZ})`;
        }
        this._element.style.setProperty("transform", composedValue);
    }

    private parseTransformProperty(propertyName: string, numberUnit: string = undefined): string | number {
        let value = this._transformProperties[propertyName];
        switch (typeof value) {
            case "number":
                return numberUnit ? value + numberUnit : value;
            case "string":
                return value;
            case "undefined":
            case "object":
            default:
                if (propertyName == "scaleX" || propertyName == "scaleY") {
                    return 1;
                }
                return 0;
        }
    }

    private hasTransformPropertyAValue(propertyName: string): boolean {
        let value = this._transformProperties[propertyName];
        let defaultValue = 0;
        if (propertyName.indexOf("scale") != -1) {
            defaultValue = 1;
        }
        if (typeof value == "string") {
            return parseFloat(value) != defaultValue;
        }
        return value != defaultValue;
    }

    private isTransformProperty(propertyName: string): boolean {
        return this._transformProperties[propertyName] != undefined;
    }

    private hasDefaultTransform(transformPropertyName: string): boolean {
        if (!this.isTransformProperty(transformPropertyName)) return false;
        return this._transformProperties[transformPropertyName] == NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES[transformPropertyName];
    }

    private warnIfStylesWillBeIgnored(propertyName: string, value: any) {
        if (!NativeStylesController.SHOW_WARNINGS_WHEN_PROPERTIES_GETTING_IGNORED) {
            return;
        }
        if (propertyName == "display" && value == "inline") {
            NativeStylesController.IGNORED_PROPERTIES_FOR_INLINE.forEach((ignoredPropertyName: string) => {
                let showWarning = false;
                let ignoredValue = "";
                if (this.isTransformProperty(ignoredPropertyName)) {
                    if (!this.hasDefaultTransform(ignoredPropertyName)) {
                        showWarning = true;
                        ignoredValue = this._transformProperties[ignoredPropertyName];
                    }
                } else {
                    ignoredValue = this._element.style[ignoredPropertyName];
                    if (ignoredValue && ignoredValue.length != 0) {
                        showWarning = true;
                    }
                }
                if (showWarning) {
                    console.warn("WARNING:  display style is set to 'inline'. '" + ignoredPropertyName + "=" + ignoredValue + "' will be ignored for: ", this._element);
                }
            });
        }
        if (NativeStylesController.IGNORED_PROPERTIES_FOR_INLINE.indexOf(propertyName) != -1 && this._element.style.display == "inline") {
            console.warn("WARNING: display style is set to 'inline'. '" + propertyName + "=" + value + "' will be ignored for: ", this._element);
        }
    }

    private isPropertyNameAPureNumber(propertyName: string): boolean {
        let isPureNumber = false;
        NativeStylesController.PURE_NUMBER_TO_STRING_PROPERTIES.forEach((pureNumberToStringPropertyName: string) => {
            if (pureNumberToStringPropertyName.toLowerCase() == propertyName.toLowerCase()) {
                isPureNumber = true;
            }
        });
        return isPureNumber;
    }

    /******************************************************************
     * Events
     *****************************************************************/

    // no events

}
