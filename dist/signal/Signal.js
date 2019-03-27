"use strict";
/******************************************************************
 * Signal
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Signal = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function Signal() {
        /******************************************************************
         * Properties
         *****************************************************************/
        this._listeners = [];
    }
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    Signal.prototype.add = function (callback) {
        if (!this.callbackAlreadyExists(callback)) {
            this._listeners.push({
                callback: callback
            });
        }
        return callback;
    };
    Signal.prototype.addOnce = function (callback) {
        if (!this.callbackAlreadyExists(callback)) {
            this._listeners.push({
                callback: callback,
                onlyOnce: true
            });
        }
        return callback;
    };
    Signal.prototype.remove = function (callbackToRemove) {
        var listenerID = undefined;
        this._listeners.forEach(function (listener, i) {
            if (listener.callback == callbackToRemove) {
                listenerID = i;
            }
        });
        if (listenerID != undefined) {
            this._listeners.splice(listenerID, 1);
        }
    };
    Signal.prototype.removeAll = function () {
        this._listeners = [];
    };
    Signal.prototype.dispatch = function (param) {
        var _this = this;
        this._listeners.forEach(function (listener) {
            listener.callback(param);
            if (listener.onlyOnce) {
                _this.remove(listener.callback);
            }
        });
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    Signal.prototype.callbackAlreadyExists = function (callbackToAdd) {
        var doesExist = false;
        this._listeners.forEach(function (listener) {
            if (listener.callback == callbackToAdd) {
                doesExist = true;
            }
        });
        return doesExist;
    };
    return Signal;
}());
exports.Signal = Signal;
