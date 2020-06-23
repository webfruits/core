import { INativeStyleDeclaration } from "../interface/INativeStyleDeclaration";
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
    private _alpha;
    private _useTransformRotateFirst;
    private _transformRotateOrder;
    private _transformProperties;
    private _stylePriorityLevels;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_element: HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    getAppliedStyles(): {
        level: number;
        styles: INativeStyleDeclaration;
    }[];
    applyStyle(cssStyle: INativeStyleDeclaration, priorityLevel?: number): void;
    get element(): HTMLElement;
    set useTransformRotateFirst(value: boolean);
    set transformRotateOrder(order: string);
    get alpha(): number;
    set alpha(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get rotate(): number;
    set rotate(value: number);
    get rotateX(): number;
    set rotateX(value: number);
    get rotateY(): number;
    set rotateY(value: number);
    get rotateZ(): number;
    set rotateZ(value: number);
    get scale(): number;
    set scale(value: number);
    get scaleX(): number;
    set scaleX(value: number);
    get scaleY(): number;
    set scaleY(value: number);
    get scaleZ(): number;
    set scaleZ(value: number);
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
