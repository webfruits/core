"use strict";
/******************************************************************
 * NativeStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var NativeStylesController = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function NativeStylesController(_element) {
        this._element = _element;
        this._transformProperties = {
            x: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.x,
            y: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.y,
            scale: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scale,
            scaleX: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scaleX,
            scaleY: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.scaleY,
            rotate: NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES.rotate
        };
    }
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    NativeStylesController.prototype.applyStyle = function (cssStyle) {
        for (var propertyName in cssStyle) {
            if (cssStyle.hasOwnProperty(propertyName)) {
                var value = cssStyle[propertyName];
                if (this.isTransformProperty(propertyName)) {
                    this.applyTransformProperties(propertyName, value);
                }
                else {
                    this.applyNativeProperties(propertyName, value);
                }
                this.warnIfStylesWillBeIgnored(propertyName, value);
            }
        }
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    NativeStylesController.prototype.applyNativeProperties = function (propertyName, value) {
        switch (typeof value) {
            case "number":
                if (propertyName.toLowerCase().indexOf("color") != -1) {
                    this._element.style[propertyName] = "#" + value.toString(16);
                }
                else if (this.isPropertyNameAPureNumber(propertyName)) {
                    this._element.style[propertyName] = value.toString();
                }
                else {
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
    };
    NativeStylesController.prototype.applyTransformProperties = function (propertyName, value) {
        this._transformProperties[propertyName] = value;
        if (propertyName == "scale") {
            this._transformProperties.scaleX = value;
            this._transformProperties.scaleY = value;
        }
        var x = this.parseTransformProperty("x", "px");
        var y = this.parseTransformProperty("y", "px");
        var sX = this.parseTransformProperty("scaleX");
        var sY = this.parseTransformProperty("scaleY");
        var r = this.parseTransformProperty("rotate", "deg");
        var composedValue = "";
        if (this.hasTransformPropertyAValue("x")) {
            composedValue += "translateX(" + x + ")";
        }
        if (this.hasTransformPropertyAValue("y")) {
            composedValue += "translateY(" + y + ")";
        }
        if (this.hasTransformPropertyAValue("rotate")) {
            composedValue += " rotate(" + r + ")";
        }
        if (this.hasTransformPropertyAValue("scaleX") || this.hasTransformPropertyAValue("scaleY")) {
            composedValue += " scale(" + sX + ", " + sY + ")";
        }
        this._element.style.setProperty("transform", composedValue);
    };
    NativeStylesController.prototype.parseTransformProperty = function (propertyName, numberUnit) {
        if (numberUnit === void 0) { numberUnit = undefined; }
        var value = this._transformProperties[propertyName];
        switch (typeof value) {
            case "number":
                return numberUnit ? value + numberUnit : value;
            case "string":
                return value;
            case "undefined":
            case "object":
            default:
                return 0;
        }
    };
    NativeStylesController.prototype.hasTransformPropertyAValue = function (propertyName) {
        var value = this._transformProperties[propertyName];
        var defaultValue = 0;
        if (propertyName.indexOf("scale") != -1) {
            defaultValue = 1;
        }
        if (typeof value == "string") {
            return parseFloat(value) != defaultValue;
        }
        return value != defaultValue;
    };
    NativeStylesController.prototype.isTransformProperty = function (propertyName) {
        return this._transformProperties[propertyName] != undefined;
    };
    NativeStylesController.prototype.hasDefaultTransform = function (transformPropertyName) {
        if (!this.isTransformProperty(transformPropertyName))
            return false;
        return this._transformProperties[transformPropertyName] == NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES[transformPropertyName];
    };
    NativeStylesController.prototype.warnIfStylesWillBeIgnored = function (propertyName, value) {
        var _this = this;
        if (!NativeStylesController.SHOW_WARNINGS_WHEN_PROPERTIES_GETTING_IGNORED) {
            return;
        }
        if (propertyName == "display" && value == "inline") {
            NativeStylesController.IGNORED_PROPERTIES_FOR_INLINE.forEach(function (ignoredPropertyName) {
                var showWarning = false;
                var ignoredValue = "";
                if (_this.isTransformProperty(ignoredPropertyName)) {
                    if (!_this.hasDefaultTransform(ignoredPropertyName)) {
                        showWarning = true;
                        ignoredValue = _this._transformProperties[ignoredPropertyName];
                    }
                }
                else {
                    ignoredValue = _this._element.style[ignoredPropertyName];
                    if (ignoredValue && ignoredValue.length != 0) {
                        showWarning = true;
                    }
                }
                if (showWarning) {
                    console.warn("WARNING:  display style is set to 'inline'. '" + ignoredPropertyName + "=" + ignoredValue + "' will be ignored for: ", _this._element);
                }
            });
        }
        if (NativeStylesController.IGNORED_PROPERTIES_FOR_INLINE.indexOf(propertyName) != -1 && this._element.style.display == "inline") {
            console.warn("WARNING: display style is set to 'inline'. '" + propertyName + "=" + value + "' will be ignored for: ", this._element);
        }
    };
    NativeStylesController.prototype.isPropertyNameAPureNumber = function (propertyName) {
        var isPureNumber = false;
        NativeStylesController.PURE_NUMBER_TO_STRING_PROPERTIES.forEach(function (pureNumberToStringPropertyName) {
            if (pureNumberToStringPropertyName.toLowerCase() == propertyName.toLowerCase()) {
                isPureNumber = true;
            }
        });
        return isPureNumber;
    };
    /******************************************************************
     * Properties
     *****************************************************************/
    NativeStylesController.SHOW_WARNINGS_WHEN_PROPERTIES_GETTING_IGNORED = true;
    NativeStylesController.PURE_NUMBER_TO_STRING_PROPERTIES = [
        "opacity",
        "fontweight"
    ];
    NativeStylesController.IGNORED_PROPERTIES_FOR_INLINE = [
        "x",
        "y",
        "scale",
        "scaleX",
        "scaleY",
        "rotate",
        "width",
        "height",
        "margin",
        "marginTop",
        "marginBottom",
        "marginLeft",
        "marginRight"
    ];
    NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES = {
        x: 0,
        y: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotate: 0
    };
    return NativeStylesController;
}());
exports.NativeStylesController = NativeStylesController;
