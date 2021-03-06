import { ColorUtils } from "../utils/ColorUtils";
import { INativeStyleDeclaration } from "../interface/INativeStyleDeclaration";

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
    private _alpha: number = 1;
    private _useTransformRotateFirst: boolean = false;
    private _transformRotateOrder: string = "x,y,z";
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
    private _stylePriorityLevels: {level: number, styles: INativeStyleDeclaration}[] = [];

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _element: HTMLElement) {
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public getAppliedStyles(): {level: number, styles: INativeStyleDeclaration}[] {
        return this._stylePriorityLevels;
    }

    public applyStyle(cssStyle: INativeStyleDeclaration, priorityLevel: number = 0) {
        let currentLevelStyle = this._stylePriorityLevels.filter((styleLevel) => styleLevel.level == priorityLevel)[0];
        if (!currentLevelStyle) {
            currentLevelStyle = {level: priorityLevel, styles: cssStyle};
            this._stylePriorityLevels.push(currentLevelStyle);
        } else {
            currentLevelStyle.styles = Object.assign(currentLevelStyle.styles, cssStyle);
        }
        this._stylePriorityLevels.sort((a, b) => a.level - b.level);
        let mergedStyles = {};
        this._stylePriorityLevels.forEach((styleLevel) => {
            mergedStyles = Object.assign(mergedStyles, styleLevel.styles);
        });
        for (let propertyName in mergedStyles) {
            let success = true;
            if (mergedStyles.hasOwnProperty(propertyName)) {
                let value = mergedStyles[propertyName];
                if (this.isTransformProperty(propertyName)) {
                    this.applyTransformProperties(propertyName, value);
                } else {
                    success = this.applyNativeProperties(propertyName, value);
                }
                if (success) {
                    this.warnIfStylesWillBeIgnored(propertyName, value);
                }
            }
        }
    }

    get element(): HTMLElement {
        return this._element;
    }

    set useTransformRotateFirst(value: boolean) {
        this._useTransformRotateFirst = value;
    }

    set transformRotateOrder(order: string) {
        this._transformRotateOrder = order;
    }

    get alpha(): number {
        return this._alpha;
    }

    set alpha(value: number) {
        this.applyNativeProperties("opacity", value);
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

    private applyNativeProperties(propertyName: string, value: number | string | object): boolean {
        switch (typeof value) {
            case "number":
                if (propertyName.toLowerCase().indexOf("color") != -1) {
                    this._element.style[propertyName] = ColorUtils.convertColorFromHexToCSS(value);
                } else if (this.isPropertyNameAPureNumber(propertyName)) {
                    if (propertyName == "opacity") {
                        this._alpha = value;
                    }
                    this._element.style[propertyName] = value.toString();
                } else {
                    this._element.style[propertyName] = value + "px";
                }
                return true;
            case "string":
                this._element.style[propertyName] = value;
               return true;
            case "undefined":
            case "object":
                this._element.style.removeProperty(propertyName);
                return false;
        }
    }

    private applyTransformProperties(propertyName: string, value: number | string | object) {
        this._transformProperties[propertyName] = value;
        if (propertyName == "scale") {
            this._transformProperties.scaleX = value as number;
            this._transformProperties.scaleY = value as number;
        }
        let props = {
            x: this.parseTransformProperty("x", "px"),
            y: this.parseTransformProperty("y", "px"),
            z: this.parseTransformProperty("z", "px"),
            sX: this.parseTransformProperty("scaleX"),
            sY: this.parseTransformProperty("scaleY"),
            sZ: this.parseTransformProperty("scaleZ"),
            r: this.parseTransformProperty("rotate", "deg"),
            rX: this.parseTransformProperty("rotateX", "deg"),
            rY: this.parseTransformProperty("rotateY", "deg"),
            rZ: this.parseTransformProperty("rotateZ", "deg"),
        };

        let composedValue = "";

        const addTranslateXYZ = () => {
            if (this.hasTransformPropertyAValue("x")) {
                composedValue += `translateX(${props.x})`;
            }
            if (this.hasTransformPropertyAValue("y")) {
                composedValue += `translateY(${props.y})`;
            }
            if (this.hasTransformPropertyAValue("z")) {
                composedValue += `translateZ(${props.z})`;
            }
        };

        const addRotateXYZ = () => {
            if (this.hasTransformPropertyAValue("rotate")) {
                composedValue += ` rotate(${props.r})`
            }
            this._transformRotateOrder.split(",").forEach((axis: string) => {
                let propName = "rotate" + axis.toUpperCase();
                if (this.hasTransformPropertyAValue(propName)) {
                    composedValue += ` ${propName}(${props["r" + axis.toUpperCase()]})`
                }
            });
        };

        const addScaleXYZ = () => {
            if (this.hasTransformPropertyAValue("scaleX")) {
                composedValue += ` scaleX(${props.sX})`;
            }
            if (this.hasTransformPropertyAValue("scaleY")) {
                composedValue += ` scaleY(${props.sY})`;
            }
            if (this.hasTransformPropertyAValue("scaleZ")) {
                composedValue += ` scaleZ(${props.sZ})`;
            }
        };

        if (this._useTransformRotateFirst) {
            addRotateXYZ();
            addTranslateXYZ();
            addScaleXYZ();
        } else {
            addTranslateXYZ();
            addRotateXYZ();
            addScaleXYZ();
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

    private warnIfStylesWillBeIgnored(propertyName: string, value: number | string | object) {
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
