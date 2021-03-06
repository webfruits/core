/******************************************************************
 * Signal
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class Signal<T = void> {
    /******************************************************************
     * Properties
     *****************************************************************/
    private _listeners;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor();
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get listeners(): {
        callback: (param: T) => void;
        onlyOnce?: boolean;
    }[];
    add(callback: (param: T) => void): (param: T) => void;
    addOnce(callback: (param: T) => void): (param: T) => void;
    remove(callbackToRemove: (param: T) => void): void;
    removeAll(): void;
    dispatch(param: T): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private callbackAlreadyExists;
}
