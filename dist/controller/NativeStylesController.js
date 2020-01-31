"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorUtils_1 = require("../utils/ColorUtils");
/******************************************************************
 * NativeStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var NativeStylesController = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function NativeStylesController(_element) {
        this._element = _element;
        this._alpha = 1;
        this._useTransformRotateFirst = false;
        this._transformRotateOrder = "x,y,z";
        this._transformProperties = {
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
    Object.defineProperty(NativeStylesController.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "useTransformRotateFirst", {
        set: function (value) {
            this._useTransformRotateFirst = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "transformRotateOrder", {
        set: function (order) {
            this._transformRotateOrder = order;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            this.applyNativeProperties("opacity", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "x", {
        get: function () {
            return this._transformProperties.x;
        },
        set: function (value) {
            this.applyTransformProperties("x", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "y", {
        get: function () {
            return this._transformProperties.y;
        },
        set: function (value) {
            this.applyTransformProperties("y", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "z", {
        get: function () {
            return this._transformProperties.z;
        },
        set: function (value) {
            this.applyTransformProperties("z", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "rotate", {
        get: function () {
            return this._transformProperties.rotate;
        },
        set: function (value) {
            this.applyTransformProperties("rotate", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "rotateX", {
        get: function () {
            return this._transformProperties.rotateX;
        },
        set: function (value) {
            this.applyTransformProperties("rotateX", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "rotateY", {
        get: function () {
            return this._transformProperties.rotateY;
        },
        set: function (value) {
            this.applyTransformProperties("rotateY", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "rotateZ", {
        get: function () {
            return this._transformProperties.rotateZ;
        },
        set: function (value) {
            this.applyTransformProperties("rotateZ", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "scale", {
        get: function () {
            return this._transformProperties.scale;
        },
        set: function (value) {
            this.applyTransformProperties("scale", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "scaleX", {
        get: function () {
            return this._transformProperties.scaleX;
        },
        set: function (value) {
            this.applyTransformProperties("scaleX", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "scaleY", {
        get: function () {
            return this._transformProperties.scaleY;
        },
        set: function (value) {
            this.applyTransformProperties("scaleY", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeStylesController.prototype, "scaleZ", {
        get: function () {
            return this._transformProperties.scaleZ;
        },
        set: function (value) {
            this.applyTransformProperties("scaleZ", value);
        },
        enumerable: true,
        configurable: true
    });
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    NativeStylesController.prototype.applyNativeProperties = function (propertyName, value) {
        switch (typeof value) {
            case "number":
                if (propertyName.toLowerCase().indexOf("color") != -1) {
                    this._element.style[propertyName] = ColorUtils_1.ColorUtils.convertColorFromHexToCSS(value);
                }
                else if (this.isPropertyNameAPureNumber(propertyName)) {
                    if (propertyName == "opacity") {
                        this._alpha = value;
                    }
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
        var _this = this;
        this._transformProperties[propertyName] = value;
        if (propertyName == "scale") {
            this._transformProperties.scaleX = value;
            this._transformProperties.scaleY = value;
        }
        var props = {
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
        var composedValue = "";
        var addTranslateXYZ = function () {
            if (_this.hasTransformPropertyAValue("x")) {
                composedValue += "translateX(" + props.x + ")";
            }
            if (_this.hasTransformPropertyAValue("y")) {
                composedValue += "translateY(" + props.y + ")";
            }
            if (_this.hasTransformPropertyAValue("z")) {
                composedValue += "translateZ(" + props.z + ")";
            }
        };
        var addRotateXYZ = function () {
            if (_this.hasTransformPropertyAValue("rotate")) {
                composedValue += " rotate(" + props.r + ")";
            }
            _this._transformRotateOrder.split(",").forEach(function (axis) {
                var propName = "rotate" + axis.toUpperCase();
                if (_this.hasTransformPropertyAValue(propName)) {
                    composedValue += " " + propName + "(" + props["r" + axis.toUpperCase()] + ")";
                }
            });
        };
        var addScaleXYZ = function () {
            if (_this.hasTransformPropertyAValue("scaleX")) {
                composedValue += " scaleX(" + props.sX + ")";
            }
            if (_this.hasTransformPropertyAValue("scaleY")) {
                composedValue += " scaleY(" + props.sY + ")";
            }
            if (_this.hasTransformPropertyAValue("scaleZ")) {
                composedValue += " scaleZ(" + props.sZ + ")";
            }
        };
        if (this._useTransformRotateFirst) {
            addRotateXYZ();
            addTranslateXYZ();
            addScaleXYZ();
        }
        else {
            addTranslateXYZ();
            addRotateXYZ();
            addScaleXYZ();
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
                if (propertyName == "scaleX" || propertyName == "scaleY") {
                    return 1;
                }
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
        "fontweight",
        "zIndex"
    ];
    NativeStylesController.IGNORED_PROPERTIES_FOR_INLINE = [
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
    NativeStylesController.DEFAULT_TRANSFORM_PROPERTY_VALUES = {
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
    return NativeStylesController;
}());
exports.NativeStylesController = NativeStylesController;
