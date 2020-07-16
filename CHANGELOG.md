<img src="https://webfruits.io/assets/wf-small-core-logo.svg" alt="wf core logo" height="50px">

#Changelog

## v1.0.2
* Added: DeviceUtils.IS_ANDROID
* Added: UIComponent.ignoreStageResizeSignals

## v1.0.1
* Added: INativeStyleDeclaration to replace `CSSStyleDeclaration | any` 
* Refactored: use `number | string | object` type for style property values instead of `any`

## v1.0.0
* Added: `Signal.listeners` returns all currently registered listeners
* Added: `UIComponent.destroy` will remove all signal list**eners automatically 

## v0.1.19
* Added: `UIComponent.destroy(.., recursiveDelayInMS)` delayed destroying children, for better performance

## v0.1.18
* Added: `NativeStylesController.applyStyles(.., priorityLevel)` Higher style levels will override styles defined at lower levels. Default level is 0.
* Added: `NativeStylesController.getAppliedStyles()`
* Added: `UIComponent.getAppliedStyles()`
* Added: `UIComponent.applyStyles(.., priorityLevel)`

## v0.1.17
* Added: `ColorUtils.addAlphaToCSS`
* Added: `options` paramter for `UIComponent` to make DOMObserver optional and to set a delay for onResizeSignal
* Updated: TypeScript to v3.7.5

## v0.1.16
* Added: `ColorUtils.convertColorFromHexToCSS`
* Fixed: color conversion from hex to string in `NativeStylesController`

## v0.1.15
* Added: `NativeStylesController.alpha`

## v0.1.14
* Added: getter `NativeStylesController.element`

## v0.1.13
* Added: `useTransformRotateFirst` in `NativeStylesController`
* Added: `transformRotateOrder` to `NativeStylesController`

## v0.1.12
* Fixed: `UIComponent.removeChild` throws error when `UI`Compnoent.view` not defined anymore

## v0.1.11
* Fixed: propertyName `zIndex` not applied in `NativeStylesController`

## v0.1.10
* Added: 'transform' getter to `UIComponent` to access transform properties
* Added: transform properties getters/setters to `NativeStyleContoller`

## v0.1.9
* Added: 3D transform properties to `NativeStyleContoller`

## v0.1.8
* Added: UIComponent.destroy() recursivly by default
* Fixed: scaleX/scaleY are buggy when using seperatly

## v0.1.7
* Fixed: propertyName `y` not applied in `NativeStylesController`

## v0.1.6
* Added: check in `NativeStylesController` for pure number to string properties 

## v0.1.5
* Optimized: some minor optimizations in UIComponent

## v0.1.4
* Fixed: if `fontWeight` is a number, it will not apply 

## v0.1.3
* Added: Warning when CustomElements are not supported
* Optimized: `Signals._listener` now is private 
