import { Signal } from "./signal/Signal";
/******************************************************************
 * UIComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class UIComponent<T extends HTMLElement = HTMLElement> {
    protected _elementName: string | HTMLElement;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _view;
    private _children;
    private _styleController;
    private _nativeViewEvents;
    private _nativeWindowEvents;
    private _domObserver;
    onAddedToStageSignal: Signal<void>;
    onRemovedFromStageSignal: Signal<void>;
    onStyleAppliedSignal: Signal<void>;
    onStageResizeSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *
     * @param _elementName could be a html tag name or a custom element
     * name, which will define a CustomElement HTMLElement. It can also be an HTMLElement which will be used as view
     *****************************************************************/
    constructor(_elementName?: string | HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    readonly view: T;
    readonly children: UIComponent[];
    readonly isStaged: boolean;
    interactive: boolean;
    addNativeListener(eventType: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): number;
    removeNativeListener(listenerID: number): void;
    removeAllNativeListeners(): void;
    destroy(recursivly?: boolean): void;
    applyStyle(cssStyle: CSSStyleDeclaration | any): void;
    addChild(child: UIComponent): void;
    addChildAt(child: UIComponent, at: number): void;
    removeChild(child: UIComponent): void;
    removeAllChildren(): void;
    updateStyles(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initView;
    private initNativeEventsControllers;
    private initStyleController;
    private initDOMOberver;
    /******************************************************************
     * Events
     *****************************************************************/
    private onStageResized;
    private onAddedToStage;
    private onRemovedFromStage;
}
