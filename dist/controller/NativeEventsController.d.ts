/******************************************************************
 * NativeEventsController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class NativeEventsController {
    private _element;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _registeredListeners;
    private _currentListenerID;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_element: HTMLElement | Window | Document);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    readonly listenerIDs: number[];
    destroy(): void;
    addListener(eventType: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): number;
    removeAllListeners(): void;
    removeListenersForEventType(eventType: string): void;
    removeListener(listenerID: number): boolean;
}
