<img src="https://webfruits.io/assets/wf-small-core-logo.svg" alt="wf core logo" height="50px">

# webfruits/core &nbsp; [![Language TypeScript](https://img.shields.io/badge/language-TypeScript-green.svg)](https://www.typescriptlang.org) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![GitHub package.json version](https://img.shields.io/github/package-json/v/webfruits/core.svg?color=green&label=master&logo=github) [![npm version](https://img.shields.io/npm/v/@webfruits/core.svg?color=green)](https://www.npmjs.com/package/@webfruits/core) 
... is all about creating highly customized, fast and interactive user interfaces using the real DOM and not a virtual one. It is super slim, modular and has no dependencies. All declarations and coding can be done with TypeScript. There is no need to learn any proprietary template language.

To make things easy, webfruits/core provides mainly one class with an easy API to work with: [`UIComponent`](src/UIComponent.ts). 

A `UIComponent` combines the creation of HTMLElements, the styling of those elements and any kind of logic. UIComponents can be combined and extended in any way to create simple to complex reusable custom components.

Here comes a little snippet of how webfruits/core looks on [Reacts HelloMessage](https://reactjs.org) example:
```typescript
class HelloMessage extends UIComponent {
    constructor(message: string) {
        super("hello-message");
        this.view.innerHTML = message;
    }
}

let helloMessage = new HelloMessage("Taylor");
document.body.appendChild(helloMessage.view);
```
The above example outputs following to the DOM:
```html
<body>
    <hello-message>Taylor</hello-message>
</body>
```
    


## Features
* **Flexible.** With `UIComponent` you can create CustomElements, use existing or native HTMLElements.
* **All in one place.** Elements, styles and logic are defined within each `UIComponent`.
* **Inline styling to have fun with.** All styles are defined with TypeScript and will be processed and updated automatically. Use transform properties like `x`, `y`, `scale` or `rotate` as direct styling properties.
* **Signals.** webfruits/core uses its own implemenation of [`Signals`](src/signal/Signal.ts) with the same API like [js-signals](https://millermedeiros.github.io/js-signals/).
* **DOMObserver.** With `UIComponent` you can subscribe to signals like ``onAddedToStageSignal`` or ``onRemovedFromStageSignal``.
* **Extended support for native events.** Adding and removing (!) native events has never been easier.
* **Modular.** `UIComponent` uses a handful classes, which all can be used indepedently like [`DeviceUtils`](src/utils/DeviceUtils.ts), [`NativeEventsController`](src/controller/NativeEventsController.ts) or [`DOMObserver`](src/observer/DOMObserver.ts).


## Benefits
* **No dependencies.** webfruits/core is a simple, super lightweight and modular ui library written in TypeScript.
* **No virtual DOM.** Create and access the real DOM. This brings you in full control and best performance.
* **It's not a framework.** It's a library. So it's up to your needs how to structure your application. But there is a recommondation for a best practice at [webfruits/best-practice](https://github.com/webfruits/best-practice)
* **It's vanilla coding.** Just use pure TypeScript to code your UI.
* **Easy to learn and work with.** Even the source code itself should be understandable within minutes. So you are in full control to fix or extend webfruits/core for your needs.

## Installation
webfruits/core is intended to use with npm and [webpack or similar module-handler](https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined).  

    npm install @webfruits/core --save


## Documentation
There is no documantion available at the moment. Meanwhile, please have look at the source code, which should not that hard to understand.


## Usage
After installation you have to import `UIComponent` to make use of it:
```typescript
import {UIComponent} from "@webfruits/core";
```

### Direct use of UIComponent
_The direct use of a UIComponent are mostly done within an extended UIComponent._
#### Create an UIComponent from an existing HTMLElement:
In this case `UIComponent` acts like a controller. It doesn't create a view, but instead it uses an existing HTMLElement as its view. For a WebApp this should be a rare use case, but with server side rendered pages this could get very handy to create additional features.
```typescript
let bodyComponent = new UIComponent(document.body);
let headerComponent = new UIComponent(document.getElementById('header')); 
```
#### Create an UIComponent with a CustomElement:
[CustomElements are part of the WC3 WebComponents Standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). Using them makes reading and understanding of the DOM much more specific. Instead of having something like this: `<div class="ui-component">` you are getting `<ui-component>`.  
 If `UIComponent` is getting constructed with no argument, it will create the default CustomElement `<ui-component>`. If a element name is giving as an argument, this will create a individual CustomElement like: `<ELEMENT-NAME>`. The element name has to contain a hyphen ("-") to meet the specification for creating CustomElements.   
```typescript
// creates the webfruits default CustomElement for UIComponent.view ("<ui-component>")
let defaultComponent = new UIComponent();

// creates a individual CustomElement for UIComponent.view ("<custom-component>")
let customComponent = new UIComponent("custom-component");
```
#### Create an UIComponent with a native HTMLElement:
If you need native APIs of specific HTMLElements like `HTMLImageElement` or `HTMLAnchorElement`, you can do that by using a native tag name as element name. 
 _Tip: In TypeScript you can pass the type of the `view` to offer full code support._
```typescript
// creates a native HTMLImageElement for UIComponent.view ("<img>")
let imageComponent = new UIComponent<HTMLImageElement>("img");
imageComponent.view.src = "image.jpg";

// creates a native HTMLAnchorElement for UIComponent.view ("<a>")
let imageComponent = new UIComponent<HTMLAnchorElement>("a");
imageComponent.view.href = "https://github.com";
```

### Extending UIComponent
`UIComponent` gets really powerful by extending it to create reusable, encapsuled custom components.  
The following snippet ports [Reacts Timer example](https://reactjs.org) to webfruits:
```typescript
class Timer extends UIComponent {
    
    private _intervalID;
    private _time = 0;
    
    constructor() {
        super("timer-component");
        this.onAddedToStageSignal.add(() => this.start());
        this.onRemovedFromStageSignal.add(() => this.stop());
        this.render();
    }
    
    public start() {
        this._intervalID = setInterval(() => this.tick(), 1000);
    }
    
    public stop() {
        clearInterval(this._intervalID);
    }
    
    private tick() {
        this._time += 1;
        this.render();
    }
    
    private render() {
        this.view.innerHTML = "Seconds: " + this._time;
    }
}
let timer = new Timer();
document.body.appendChild(timer.view);
```

### Styling a UIComponent
```typescript
class StyledComponent extends UIComponent {
    
    private _childComponent: UIComponent;
    
    constructor() {
        super("styled-component");
        this._childComponent = new UIComponent("child-component");
        this.addChild(this._childComponent);
    }
    
    // override UIComponent.updateStyles
    // updateStyles will be called after adding this component to DOM
    // and on every window resize event
    public updateStyles() {
        
        // styling of this view
        this.applyStyle({
            backgroundColor: 0xFF0000,
            userSelect: "none" 
        });
        
        // styling of a childComponent view
        this._childComponent.applyStyle({
            position: "relative",
            left: 100, // numeric value are in pixels (px)
            x: 100,
            top: "50%", // use string values
            y: "-50%",
            width: this.calcChildWidth(), // use functions to calculate complex values 
            height: 50 + "vh"
        })
    }
    
    private calcChildWidth(): number {
        return window.innerWidth > 500 ? 300 : 200;
    }
}
```

## more webfruits

- **[webfruits/toolbox](https://github.com/webfruits/toolbox)**  
provides additional features like SVGComponent, GridLayout and a lot of utilities.

- **[webfruits/best-practice](https://github.com/webfruits/best-practice)**  
our recommondation of how to structure an application using webfruits.

- **[webfruits/webpack-starterkit](https://github.com/webfruits/webpack-starterkit)**  
is a basic webpack setup and skeleton for an webfruits application.


## Licence
webfruits/core is [MIT licensed](./LICENSE).
