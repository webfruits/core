"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signal_1 = require("../signal/Signal");
/******************************************************************
 * DOMObserver
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var DOMObserver = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function DOMObserver(_elementToObserve, _defaultObserveRootElement) {
        if (_defaultObserveRootElement === void 0) { _defaultObserveRootElement = document.body; }
        this._elementToObserve = _elementToObserve;
        this._defaultObserveRootElement = _defaultObserveRootElement;
        this.onAddedToStageSignal = new Signal_1.Signal();
        this.onRemovedFromStageSignal = new Signal_1.Signal();
        this._isStaged = this._defaultObserveRootElement.contains(this._elementToObserve);
        this.start();
    }
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    DOMObserver.prototype.start = function (observeRootElement) {
        var _this = this;
        if (observeRootElement === void 0) { observeRootElement = this._defaultObserveRootElement; }
        this.stop();
        this._currentObserveRootElement = observeRootElement;
        this._mutationObserver = new MutationObserver(function () { return _this.onDOMMutation(); });
        this._mutationObserver.observe(this._currentObserveRootElement, { childList: true, subtree: true });
    };
    DOMObserver.prototype.stop = function () {
        if (!this._mutationObserver)
            return;
        this._mutationObserver.disconnect();
        this._mutationObserver = null;
    };
    DOMObserver.prototype.destroy = function () {
        this.onAddedToStageSignal.removeAll();
        this.onRemovedFromStageSignal.removeAll();
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    /******************************************************************
     * Events
     *****************************************************************/
    DOMObserver.prototype.onDOMMutation = function () {
        if (this._currentObserveRootElement.contains(this._elementToObserve)) {
            if (!this._isStaged) {
                this._isStaged = true;
                this.onAddedToStageSignal.dispatch();
            }
        }
        else {
            if (this._isStaged) {
                this._isStaged = false;
                this.onRemovedFromStageSignal.dispatch();
            }
        }
    };
    return DOMObserver;
}());
exports.DOMObserver = DOMObserver;
