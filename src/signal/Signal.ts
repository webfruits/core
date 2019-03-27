/******************************************************************
 * Signal
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class Signal<T = void> {

    /******************************************************************
     * Properties
     *****************************************************************/

    public _listeners: {callback: (param: T) => void, onlyOnce?: boolean}[] = [];

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor() {
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public add(callback: (param: T) => void): (param: T) => void {
        if (!this.callbackAlreadyExists(callback)) {
            this._listeners.push({
                callback: callback
            });
        }
        return callback;
    }

    public addOnce(callback: (param: T) => void): (param: T) => void {
        if (!this.callbackAlreadyExists(callback)) {
            this._listeners.push({
                callback: callback,
                onlyOnce: true
            });
        }
        return callback;
    }

    public remove(callbackToRemove: (param: T) => void) {
        let listenerID = undefined;
        this._listeners.forEach((listener, i: number) => {
            if (listener.callback == callbackToRemove) {
                listenerID = i;
            }
        });
        if (listenerID != undefined) {
            this._listeners.splice(listenerID, 1);
        }
    }

    public removeAll() {
        this._listeners = [];
    }

    public dispatch(param: T) {
        this._listeners.forEach((listener) => {
            listener.callback(param);
            if (listener.onlyOnce) {
                this.remove(listener.callback);
            }
        });
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private callbackAlreadyExists(callbackToAdd: (param: T) => void) {
        let doesExist = false;
        this._listeners.forEach((listener) => {
            if (listener.callback == callbackToAdd) {
                doesExist = true;
            }
        });
        return doesExist;
    }

    /******************************************************************
     * Events
     *****************************************************************/

    // no events


}
