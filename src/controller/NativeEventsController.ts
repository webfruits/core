/******************************************************************
 * NativeEventsController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class NativeEventsController {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _registeredListeners: { [id: number]: { eventType: string, listener: EventListenerOrEventListenerObject } } = {};
    private _currentListenerID = 0;

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _element: HTMLElement | Window | Document) {
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get listenerIDs(): number[] {
        let listenerIDs: number[] = [];
        for (const listenerID in this._registeredListeners) {
            if (this._registeredListeners.hasOwnProperty(listenerID)) {
                listenerIDs.push(parseInt(listenerID));
            }
        }
        return listenerIDs;
    }

    public destroy() {
        this.removeAllListeners();
        this._element = null;
    }

    public addListener(eventType: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): number {
        this._registeredListeners[this._currentListenerID] = {eventType: eventType, listener: listener};
        this._element.addEventListener(eventType, listener, options);
        return this._currentListenerID++;
    }

    public removeAllListeners() {
        this.listenerIDs.forEach((listenerID: number) => {
            this.removeListener(listenerID);
        });
    }

    public removeListenersForEventType(eventType: string) {
        this.listenerIDs.forEach((listenerID: number) => {
            if (this._registeredListeners[listenerID].eventType == eventType) {
                this.removeListener(listenerID);
            }
        });
    }

    public removeListener(listenerID: number): boolean {
        if (!this._registeredListeners[listenerID]) return false;
        let listenerData = this._registeredListeners[listenerID];
        this._element.removeEventListener(listenerData.eventType, listenerData.listener);
        delete this._registeredListeners[listenerID];
        return true;
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    /******************************************************************
     * Events
     *****************************************************************/

}
