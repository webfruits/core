/******************************************************************
 * DOMObserver
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
import { Signal } from "../signal/Signal";
export declare class DOMObserver {
    private _elementToObserve;
    private _defaultObserveRootElement;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _mutationObserver;
    private _isStaged;
    private _currentObserveRootElement;
    onAddedToStageSignal: Signal<void>;
    onRemovedFromStageSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_elementToObserve: HTMLElement, _defaultObserveRootElement?: HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    start(observeRootElement?: HTMLElement): void;
    stop(): void;
    destroy(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    /******************************************************************
     * Events
     *****************************************************************/
    private onDOMMutation;
}
