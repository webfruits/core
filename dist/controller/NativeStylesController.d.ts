/******************************************************************
 * NativeStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class NativeStylesController {
    private _element;
    /******************************************************************
     * Properties
     *****************************************************************/
    static SHOW_WARNINGS_WHEN_PROPERTIES_GETTING_IGNORED: boolean;
    private static readonly PURE_NUMBER_TO_STRING_PROPERTIES;
    private static readonly IGNORED_PROPERTIES_FOR_INLINE;
    private static readonly DEFAULT_TRANSFORM_PROPERTY_VALUES;
    private _useTransformRotateFirst;
    private _transformRotateOrder;
    private _transformProperties;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_element: HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    applyStyle(cssStyle: CSSStyleDeclaration | any): void;
    useTransformRotateFirst: boolean;
    transformRotateOrder: string;
    x: number;
    y: number;
    z: number;
    rotate: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private applyNativeProperties;
    private applyTransformProperties;
    private parseTransformProperty;
    private hasTransformPropertyAValue;
    private isTransformProperty;
    private hasDefaultTransform;
    private warnIfStylesWillBeIgnored;
    private isPropertyNameAPureNumber;
}
