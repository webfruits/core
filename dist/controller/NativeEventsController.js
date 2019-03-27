"use strict";
/******************************************************************
 * NativeEventsController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var NativeEventsController = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function NativeEventsController(_element) {
        this._element = _element;
        /******************************************************************
         * Properties
         *****************************************************************/
        this._registeredListeners = {};
        this._currentListenerID = 0;
    }
    Object.defineProperty(NativeEventsController.prototype, "listenerIDs", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            var listenerIDs = [];
            for (var listenerID in this._registeredListeners) {
                if (this._registeredListeners.hasOwnProperty(listenerID)) {
                    listenerIDs.push(parseInt(listenerID));
                }
            }
            return listenerIDs;
        },
        enumerable: true,
        configurable: true
    });
    NativeEventsController.prototype.destroy = function () {
        this.removeAllListeners();
        this._element = null;
    };
    NativeEventsController.prototype.addListener = function (eventType, listener, options) {
        this._registeredListeners[this._currentListenerID] = { eventType: eventType, listener: listener };
        this._element.addEventListener(eventType, listener, options);
        return this._currentListenerID++;
    };
    NativeEventsController.prototype.removeAllListeners = function () {
        var _this = this;
        this.listenerIDs.forEach(function (listenerID) {
            _this.removeListener(listenerID);
        });
    };
    NativeEventsController.prototype.removeListenersForEventType = function (eventType) {
        var _this = this;
        this.listenerIDs.forEach(function (listenerID) {
            if (_this._registeredListeners[listenerID].eventType == eventType) {
                _this.removeListener(listenerID);
            }
        });
    };
    NativeEventsController.prototype.removeListener = function (listenerID) {
        if (!this._registeredListeners[listenerID])
            return false;
        var listenerData = this._registeredListeners[listenerID];
        this._element.removeEventListener(listenerData.eventType, listenerData.listener);
        delete this._registeredListeners[listenerID];
        return true;
    };
    return NativeEventsController;
}());
exports.NativeEventsController = NativeEventsController;
