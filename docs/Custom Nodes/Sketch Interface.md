## Sketch Interface Registration
To register an interface into Blackprint Engine, you need to prepare class that extends from the class you have registered with `Blackprint.registerInterface()` and register it with `Blackprint.Sketch.registerInterface(namespace, class)`.

> The namespace **must be** similar with the interface you have registered with `Blackprint.registerInterface()`.

```js
// CustomNodeIFace is a class we have made on "Custom Nodes -> Interface"
// when we're registering with Blackprint.registerInterface()

Blackprint.Sketch.registerInterface("BPIC/My/Custom/Node",
class extends CustomNodeIFace {
	constructor(node){
		super(node);
		this.node === (/* Object reference from .registerNode() */);
	}
});
```

> **Sketch Interface** is just like **Interface**, but with extended feature for handling user interface or HTML elements.

### Initializing interface after creation
|init|()|Callback function to be run after current handle and all interface was initialized|

### Handling data import on creation
|importing|A boolean indicating if this node is being imported/created|
|imported|(options)|This is a callback after node was created, imported options should be handled here|

```jsx
This file is just reference, you can remove unnecessary lines.

## html
<div class="node your-class" style="transform: translate({{ x }}px, {{ y }}px)">
  <sf-template path="Blackprint/nodes/template/routes.sf"></sf-template>
  <sf-template path="Blackprint/nodes/template/header.sf"></sf-template>

  <div class="content">
    <div class="design-me">You can design me with CSS</div>

    <div class="left-port">
      <sf-template path="Blackprint/nodes/template/input-port.sf"></sf-template>
    </div>

    <div class="right-port">
      <sf-template path="Blackprint/nodes/template/output-port.sf"></sf-template>
    </div>
  </div>

  <sf-template path="Blackprint/nodes/template/other.sf"></sf-template>
</div>

## scss-global
// BPIC/LibraryName is prefix from blackprint.config.js

// Element name based on html path, BPIC/LibraryName/FeatureName/Template.sf
bpic-libraryname-featurename-template {
  /* Write your scoped SCSS here */
  .design-me{
    color: yellow;
    width: 100%;
    height: 15px;
    text-align: center;
    padding: 5px;
  }
}

## js-global
// You can also write JavaScript here
// All script from .sf will be combined and wrapped depends on the configuration
console.log("Hello from Template.sf");

// Get the reference from Template.js
let PlaceHolder = Context.PlaceHolder;

// .registerInterface is case sensitive
// Please also use capitalization on the file name


// For Sketch Interface, let ScarletszFrame handle this (HotReload available here)
// - first parameter is HTML file path
// - second parameter is optional if using different settings
// - third parameter can be placed on second parameter
Blackprint.Sketch.registerInterface('BPIC/LibraryName/FeatureName/Template',
class IMyTemplate extends Context.IFace.MyTemplate {
  // this == iface

  constructor(node){
    super(node); // 'node' object from .registerNode

    this.keepMe = $('<div>');
    this.keepMe.text("Hello world!");
    this.keepMe.css({
      width: '100%',
      textAlign: 'center'
    });

    // Any property on 'iface' can be binded with the HTML
    this.log = '123'; // <div attr="{{ log }}">{{ log }}</div>
  }

  // Will run once the node element was attached to DOM tree
  init(){
    // When ScarletsFrame initialized this HTML element

    // Run everytime ScarletsFrame hot reload current scope
    this.$el('.content').prepend(this.keepMe);
    var Node = this.node; // 'node' object from .registerNode

    // === Shortcut to get/set node's port value ===
    var My = this; // Lazy Shortcut :3
    // My.init = function(){...}

    // This is just a shortcut of "Node.input" and "Node.output"
    // initialized from Template.js
    const {
      IInput, IOutput, // Port interface
      Input, Output, // Port value
    } = My.ref; // My.ref === this.ref

    // Update the port value
    Output.PortName2 = 123; // This will also trigger 'value' event to connected input ports
    // Output.PortName2 === My.node.output.PortName2

    // Node event listener can only be registered after node init
    My.on('cable.connect', Context.EventSlot, function({ port, target, cable }){});

    // Can be used for IInput, IOutput
    // Control the port interface (event listener, add new port, etc)
    IInput.PortName1
      // When connected output node have updated the value
      // Also called after 'connect' event
      .on('value', Context.EventSlot, function(ev){
        console.log("PortName1:", ev);

	      // If have changed output port's value inside this listener
        // you may also need to trigger route out `iface.node.routes.routeOut();`
      })

      // When connection success
      .on('connect', Context.EventSlot, function({ port, target, cable }){})

      // When connection closed
      // not being called if the connection doesn't happen before
      .on('disconnect', Context.EventSlot, function({ port, target, cable }){});

    function myLongTask(callback){
      setTimeout(()=> callback(true), 1000);
    }

    IOutput.PortName2
      // When this port are trying to connect with other node
      .on('connecting', Context.EventSlot, function({ port, target, activate }){
        myLongTask(function(success){
          if(success)
            activate(true) // Cable will be activated
          else activate(false) // Cable will be destroyed
        });

        // Empty = is like we're not giving the answer now
        activate() // Mark as async

        // Or destroy it now
        // activate(false)
      })

    // ...
  }

  // Below are optional life cycle, only for Blackprint.Sketch.Interface

  // This must use ScarletsFrame Development mode
  // Hot reload feature also must be activated
  hotReload(){
    console.log("Going to hot reload this object", this);
    this.hotReloading === true; // this will be true
  }

  hotReloadedHTML(){
    console.log("Was HTML changed/reloaded", this);
  }

  hotReloaded(){
    console.log("Hot reload active", this);

    // Let's call init again
    this.init();
  }

  /*
  destroy(){
    this.init();
  }

  initClone(){
    this.init();
  }

  destroyClone(){
    this.init();
  }
  */
});
```

## Add event listener into a interface
Addition for **Interface** events

|Event Name|Event Object|Description|
|---|---|---|
|`node.menu`|<x-code2>{<x-t>iface: Interface,</x-t><x-t>instance: Engine \| Sketch,</x-t><x-t>menu: Array,</x-t><x-t>event: Event,</x-t><x-t>preventDefault: Callback</x-t>}</x-code2>|d|
|`cable.created`|`{ port: Port, cable: Cable }`|d|
|`port.hover`|`{ event: Event, port: Port }`|d|
|`port.unhover`|`{ event: Event, port: Port }`|d|
|`port.menu`|<x-code2>{<x-t>iface: Interface,</x-t><x-t>instance: Engine \| Sketch,</x-t><x-t>port: Port,</x-t><x-t>menu: Array,</x-t><x-t>event: Event,</x-t><x-t>preventDefault: Callback</x-t>}</x-code2>|Set this to false if you don't want to export custom function|