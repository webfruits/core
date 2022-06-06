import {Signal} from "../signal/Signal";

/******************************************************************
 * DOMObserver
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class DOMObserver {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _mutationObserver: MutationObserver;
    private _isStaged: boolean;
    private _currentObserveRootElement: HTMLElement;

    public onAddedToStageSignal = new Signal();
    public onRemovedFromStageSignal = new Signal();

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _elementToObserve: HTMLElement, private _defaultObserveRootElement = document.body) {
        this._isStaged = this._defaultObserveRootElement.contains(this._elementToObserve);
        this.start();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public start(observeRootElement: HTMLElement = this._defaultObserveRootElement) {
        this.stop();
        this._currentObserveRootElement = observeRootElement;
        this._mutationObserver = new MutationObserver(() => this.onDOMMutation());
        this._mutationObserver.observe(this._currentObserveRootElement, {childList: true, subtree: true});
    }

    public stop() {
        if (!this._mutationObserver) return;
        this._mutationObserver.disconnect();
        this._mutationObserver = null;
    }

    public destroy() {
        this.stop();
        this.onAddedToStageSignal.removeAll();
        this.onRemovedFromStageSignal.removeAll();
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    /******************************************************************
     * Events
     *****************************************************************/

    private onDOMMutation() {
        if (this._currentObserveRootElement.contains(this._elementToObserve)) {
            if (!this._isStaged) {
                this._isStaged = true;
                this.onAddedToStageSignal.dispatch();
            }
        } else {
            if (this._isStaged) {
                this._isStaged = false;
                this.onRemovedFromStageSignal.dispatch();
            }
        }
    }
}
