import {DeviceUtils} from "./utils/DeviceUtils";
import {NativeStylesController} from "./controller/NativeStylesController";
import {CustomElementsUtils} from "./utils/CustomElementsUtils";
import {NativeEventsController} from "./controller/NativeEventsController";
import {DOMObserver} from "./observer/DOMObserver";
import {Signal} from "./signal/Signal";
import {INativeStyleDeclaration} from "./interface/INativeStyleDeclaration";

/******************************************************************
 * UIComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class UIComponent<T extends HTMLElement = HTMLElement> {

    /******************************************************************
     * Properties
     *****************************************************************/

    static ignoreStageResizeSignals: boolean = false;

    private _view: T;
    private _children: UIComponent[] = [];
    private _styleController: NativeStylesController;
    private _nativeViewEvents: NativeEventsController;
    private _nativeWindowEvents: NativeEventsController;
    private _domObserver: DOMObserver;
    private _resizeTimeoutID: number;

    public onAddedToStageSignal = new Signal(); // will only dispatch if _options.useDOMServer is true
    public onRemovedFromStageSignal = new Signal(); // will only dispatch if _options.useDOMServer is true
    public onStyleAppliedSignal = new Signal();
    public onStageResizeSignal = new Signal();

    /******************************************************************
     * Constructor
     *
     * @param _elementName could be a html tag name or a custom element
     * name, which will define a CustomElement HTMLElement. It can also be an HTMLElement which will be used as view
     * @param _options
     *  .disableDOMObserver [true/false, default is false] if true stops the DOMObserver and no listeners onAddedToStageSignal/onRemovedFromStageSignal are provided, but maybe have better performance on many DOM-Objects
     *  .resizeSignalDelay [number in milliseconds, default is 100] delayed resize event
     *****************************************************************/

    constructor(
        protected _elementName: string | HTMLElement = null,
        protected _options?: {
            disableDOMObserver?: boolean,
            resizeSignalDelay?: number
        }) {
        if (!this._elementName) this._elementName = "ui-component";
        this.initView();
        this.initEventsControllers();
        this.initStyleController();
        this.initDOMObserver();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get view(): T {
        return this._view;
    }

    get transform(): NativeStylesController {
        return this._styleController;
    }

    get children(): UIComponent[] {
        return this._children;
    }

    get isStaged(): boolean {
        if (!document || !document.body) return false;
        return document.body.contains(this.view);
    }

    get interactive(): boolean {
        return this._view.style.pointerEvents != "none";
    }

    set interactive(value: boolean) {
        this._view.style.pointerEvents = value ? "auto" : "none";
        if (DeviceUtils.IS_IE) {
            if (value) {
                this._view.onclick = null;
            } else {
                this._view.onclick = (e) => {
                    e.preventDefault();
                }
            }
        }
    }

    public addNativeListener(eventType: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): number {
        return this._nativeViewEvents.addListener(eventType, listener, options);
    }

    public removeNativeListener(listenerID: number) {
        this._nativeViewEvents.removeListener(listenerID);
    }

    public removeAllNativeListeners() {
        this._nativeViewEvents.removeAllListeners();
    }

    public destroy(recursivly: boolean = true, recursiveDelayInMS: number = 0) {
        if (recursivly) {
            this.children.forEach((child: UIComponent, i: number) => {
                setTimeout(() => {
                    child.destroy(recursivly, recursiveDelayInMS);
                }, recursiveDelayInMS * (i + 1))
            });
        }
        Object.values(this).forEach((prop) => {
            if (prop instanceof Signal) {
                prop.removeAll();
            }
        });
        this._nativeViewEvents.destroy();
        this._nativeWindowEvents.destroy();
        this._domObserver.destroy();
        if (this.view) {
            this._view.remove();
            this._view = null;
        }
    }

    public getAppliedStyles(): { level: number, styles: INativeStyleDeclaration }[] {
        return this._styleController.getAppliedStyles();
    }

    public applyStyle(cssStyle: INativeStyleDeclaration, priorityLevel: number = 0) {
        this._styleController.applyStyle(cssStyle, priorityLevel);
        this.onStyleAppliedSignal.dispatch();
    }

    public addChild(child: UIComponent) {
        if (this._children.indexOf(child) == -1) {
            this._children.push(child);
        }
        this._view.appendChild(child.view);
    }

    public addChildAt(child: UIComponent, at: number) {
        if (this._children.indexOf(child) != -1) {
            this._children.splice(this._children.indexOf(child), 1);
        }
        this._children.splice(at, 0, child);
        this._view.insertBefore(child.view, this.view.childNodes[at]);
    }

    public removeChild(child: UIComponent, destroy: boolean = false, destroyRecursivly: boolean = true) {
        let childIndex = this._children.indexOf(child);
        if (childIndex != -1) {
            this._children.splice(childIndex, 1);
        }
        if (child.view && child.view.parentElement) {
            child.view.parentElement.removeChild(child.view);
        }
        if (destroy) {
            child.destroy(destroyRecursivly);
        }
    }

    public removeAllChildren(destroy: boolean = false, destroyRecursivly: boolean = true) {
        while (this.children.length > 0) {
            let child = this.children[this.children.length - 1];
            this.removeChild(child, destroy, destroyRecursivly);
        }
    }

    public updateStyles() {
        // override this
        // updateStyles is called automatically on window.resize and after view added to stage
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private initView() {
        if (typeof this._elementName == "string") {
            if (CustomElementsUtils.isHTML5Element(this._elementName)) {
                this._view = document.createElement(this._elementName) as T;
            } else {
                CustomElementsUtils.defineCustomElement(this._elementName);
                this._view = document.createElement(this._elementName) as T;
            }
        } else if (this._elementName instanceof HTMLElement) {
            this._view = this._elementName as T;
        }
    }

    private initEventsControllers() {
        this._nativeViewEvents = new NativeEventsController(this._view);
        this._nativeWindowEvents = new NativeEventsController(window);
        this._nativeWindowEvents.addListener("resize", () => this.onStageResized());
    }

    private initStyleController() {
        this._styleController = new NativeStylesController(this._view);
        if (typeof this._elementName == "string" && !CustomElementsUtils.isHTML5Element(this._elementName)) {
            this._styleController.applyStyle({
                display: "block"
            })
        }
    }

    private initDOMObserver() {
        if (this._options?.disableDOMObserver) return;
        this._domObserver = new DOMObserver(this._view);
        this._domObserver.onAddedToStageSignal.add(() => this.onAddedToStage());
        this._domObserver.onRemovedFromStageSignal.add(() => this.onRemovedFromStage());
    }

    /******************************************************************
     * Events
     *****************************************************************/

    private onStageResized() {
        if (UIComponent.ignoreStageResizeSignals) {
            return;
        }
        clearTimeout(this._resizeTimeoutID);
        this._resizeTimeoutID = window.setTimeout(() => {
            this.updateStyles();
            this.onStageResizeSignal.dispatch();
        }, this._options?.resizeSignalDelay ? this._options?.resizeSignalDelay : 100);
    }

    private onAddedToStage() {
        this.updateStyles();
        this.onAddedToStageSignal.dispatch();
    }

    private onRemovedFromStage() {
        this.onRemovedFromStageSignal.dispatch();
    }
}
