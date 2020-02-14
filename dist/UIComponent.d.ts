import { NativeStylesController } from "./controller/NativeStylesController";
import { Signal } from "./signal/Signal";
/******************************************************************
 * UIComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class UIComponent<T extends HTMLElement = HTMLElement> {
    protected _elementName: string | HTMLElement;
    protected _options?: {
        disableDOMObserver?: boolean;
        resizeSignalDelay?: number;
    };
    /******************************************************************
     * Properties
     *****************************************************************/
    private _view;
    private _children;
    private _styleController;
    private _nativeViewEvents;
    private _nativeWindowEvents;
    private _domObserver;
    private _resizeTimeoutID;
    onAddedToStageSignal: Signal<void>;
    onRemovedFromStageSignal: Signal<void>;
    onStyleAppliedSignal: Signal<void>;
    onStageResizeSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *
     * @param _elementName could be a html tag name or a custom element
     * name, which will define a CustomElement HTMLElement. It can also be an HTMLElement which will be used as view
     * @param _options
     *  .disableDOMObserver [true/false, default is false] if true stops the DOMObserver and no listeners onAddedToStageSignal/onRemovedFromStageSignal are provided, but maybe have better performance on many DOM-Objects
     *  .resizeSignalDelay [number in milliseconds, default is 100] delayed resize event
     *****************************************************************/
    constructor(_elementName?: string | HTMLElement, _options?: {
        disableDOMObserver?: boolean;
        resizeSignalDelay?: number;
    });
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get view(): T;
    get transform(): NativeStylesController;
    get children(): UIComponent[];
    get isStaged(): boolean;
    get interactive(): boolean;
    set interactive(value: boolean);
    addNativeListener(eventType: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): number;
    removeNativeListener(listenerID: number): void;
    removeAllNativeListeners(): void;
    destroy(recursivly?: boolean, recursiveDelayInMS?: number): void;
    getAppliedStyles(): {
        level: number;
        styles: CSSStyleDeclaration | any;
    }[];
    applyStyle(cssStyle: CSSStyleDeclaration | any, priorityLevel?: number): void;
    addChild(child: UIComponent): void;
    addChildAt(child: UIComponent, at: number): void;
    removeChild(child: UIComponent, destroy?: boolean, destroyRecursivly?: boolean): void;
    removeAllChildren(destroy?: boolean, destroyRecursivly?: boolean): void;
    updateStyles(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initView;
    private initEventsControllers;
    private initStyleController;
    private initDOMObserver;
    /******************************************************************
     * Events
     *****************************************************************/
    private onStageResized;
    private onAddedToStage;
    private onRemovedFromStage;
}
