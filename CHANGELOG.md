<img src="https://webfruits.io/assets/wf-small-core-logo.svg" alt="wf core logo" height="50px">

#Changelog

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
