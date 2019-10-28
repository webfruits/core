"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceUtils_1 = require("./utils/DeviceUtils");
var NativeStylesController_1 = require("./controller/NativeStylesController");
var CustomElementsUtils_1 = require("./utils/CustomElementsUtils");
var NativeEventsController_1 = require("./controller/NativeEventsController");
var DOMObserver_1 = require("./observer/DOMObserver");
var Signal_1 = require("./signal/Signal");
/******************************************************************
 * UIComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var UIComponent = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *
     * @param _elementName could be a html tag name or a custom element
     * name, which will define a CustomElement HTMLElement. It can also be an HTMLElement which will be used as view
     *****************************************************************/
    function UIComponent(_elementName) {
        if (_elementName === void 0) { _elementName = null; }
        this._elementName = _elementName;
        this._children = [];
        this.onAddedToStageSignal = new Signal_1.Signal();
        this.onRemovedFromStageSignal = new Signal_1.Signal();
        this.onStyleAppliedSignal = new Signal_1.Signal();
        this.onStageResizeSignal = new Signal_1.Signal();
        if (!this._elementName)
            this._elementName = "ui-component";
        this.initView();
        this.initNativeEventsControllers();
        this.initStyleController();
        this.initDOMOberver();
    }
    Object.defineProperty(UIComponent.prototype, "view", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "transform", {
        get: function () {
            return this._styleController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "isStaged", {
        get: function () {
            if (!document || !document.body)
                return false;
            return document.body.contains(this.view);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "interactive", {
        get: function () {
            return this._view.style.pointerEvents != "none";
        },
        set: function (value) {
            this._view.style.pointerEvents = value ? "auto" : "none";
            if (DeviceUtils_1.DeviceUtils.IS_IE) {
                if (value) {
                    this._view.onclick = null;
                }
                else {
                    this._view.onclick = function (e) {
                        e.preventDefault();
                    };
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "useTransformRotateFirst", {
        set: function (value) {
            this._styleController.useTransformRotateFirst = value;
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype.addNativeListener = function (eventType, listener, options) {
        return this._nativeViewEvents.addListener(eventType, listener, options);
    };
    UIComponent.prototype.removeNativeListener = function (listenerID) {
        this._nativeViewEvents.removeListener(listenerID);
    };
    UIComponent.prototype.removeAllNativeListeners = function () {
        this._nativeViewEvents.removeAllListeners();
    };
    UIComponent.prototype.destroy = function (recursivly) {
        if (recursivly === void 0) { recursivly = true; }
        if (recursivly) {
            this.children.forEach(function (child) {
                child.destroy();
            });
        }
        this.onAddedToStageSignal.removeAll();
        this.onRemovedFromStageSignal.removeAll();
        this.onStyleAppliedSignal.removeAll();
        this.onStageResizeSignal.removeAll();
        this._nativeViewEvents.destroy();
        this._nativeWindowEvents.destroy();
        this._domObserver.destroy();
        if (this.view) {
            this._view.remove();
            this._view = null;
        }
    };
    UIComponent.prototype.applyStyle = function (cssStyle) {
        this._styleController.applyStyle(cssStyle);
        this.onStyleAppliedSignal.dispatch();
    };
    UIComponent.prototype.addChild = function (child) {
        if (this._children.indexOf(child) == -1) {
            this._children.push(child);
        }
        this._view.appendChild(child.view);
    };
    UIComponent.prototype.addChildAt = function (child, at) {
        if (this._children.indexOf(child) != -1) {
            this._children.splice(this._children.indexOf(child), 1);
        }
        this._children.splice(at, 0, child);
        this._view.insertBefore(child.view, this.view.childNodes[at]);
    };
    UIComponent.prototype.removeChild = function (child, destroy, destroyRecursivly) {
        if (destroy === void 0) { destroy = false; }
        if (destroyRecursivly === void 0) { destroyRecursivly = true; }
        var childIndex = this._children.indexOf(child);
        if (childIndex != -1) {
            this._children.splice(childIndex, 1);
        }
        if (child.view && child.view.parentElement) {
            child.view.parentElement.removeChild(child.view);
        }
        if (destroy) {
            child.destroy(destroyRecursivly);
        }
    };
    UIComponent.prototype.removeAllChildren = function (destroy, destroyRecursivly) {
        if (destroy === void 0) { destroy = false; }
        if (destroyRecursivly === void 0) { destroyRecursivly = true; }
        while (this.children.length > 0) {
            var child = this.children[this.children.length - 1];
            this.removeChild(child, destroy, destroyRecursivly);
        }
    };
    UIComponent.prototype.updateStyles = function () {
        // override this
        // updateStyles is called automatically on window.resize and after view added to stage
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    UIComponent.prototype.initView = function () {
        if (typeof this._elementName == "string") {
            if (CustomElementsUtils_1.CustomElementsUtils.isHTML5Element(this._elementName)) {
                this._view = document.createElement(this._elementName);
            }
            else {
                CustomElementsUtils_1.CustomElementsUtils.defineCustomElement(this._elementName);
                this._view = document.createElement(this._elementName);
            }
        }
        else if (this._elementName instanceof HTMLElement) {
            this._view = this._elementName;
        }
    };
    UIComponent.prototype.initNativeEventsControllers = function () {
        var _this = this;
        this._nativeViewEvents = new NativeEventsController_1.NativeEventsController(this._view);
        this._nativeWindowEvents = new NativeEventsController_1.NativeEventsController(window);
        this._nativeWindowEvents.addListener("resize", function () { return _this.onStageResized(); });
    };
    UIComponent.prototype.initStyleController = function () {
        this._styleController = new NativeStylesController_1.NativeStylesController(this._view);
        if (typeof this._elementName == "string" && !CustomElementsUtils_1.CustomElementsUtils.isHTML5Element(this._elementName)) {
            this._styleController.applyStyle({
                display: "block"
            });
        }
    };
    UIComponent.prototype.initDOMOberver = function () {
        var _this = this;
        this._domObserver = new DOMObserver_1.DOMObserver(this._view);
        this._domObserver.onAddedToStageSignal.add(function () { return _this.onAddedToStage(); });
        this._domObserver.onRemovedFromStageSignal.add(function () { return _this.onRemovedFromStage(); });
    };
    /******************************************************************
     * Events
     *****************************************************************/
    UIComponent.prototype.onStageResized = function () {
        this.updateStyles();
        this.onStageResizeSignal.dispatch();
    };
    UIComponent.prototype.onAddedToStage = function () {
        this.updateStyles();
        this.onAddedToStageSignal.dispatch();
    };
    UIComponent.prototype.onRemovedFromStage = function () {
        this.onRemovedFromStageSignal.dispatch();
    };
    return UIComponent;
}());
exports.UIComponent = UIComponent;
