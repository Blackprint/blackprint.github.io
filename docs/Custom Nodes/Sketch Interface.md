## Sketch Interface Registration
This registration is optional but required if you registered `Blackprint.registerInterface()` for your node. To register an interface into Blackprint Engine, your class need to extends from the class that you have registered with `Blackprint.registerInterface()` and then register it with `Blackprint.Sketch.registerInterface(namespace, class)`.

> The namespace **must be** similar with the interface you have registered with `Blackprint.registerInterface()`.

```js
// CustomNodeIFace is a class we have made on "Custom Nodes -> Interface"
// when we're registering with Blackprint.registerInterface()

Blackprint.Sketch.registerInterface("BPIC/My/Custom/Node",{
	// If you already write your HTML in .sf file extension, you can skip this field
	html: `...see html template below...`,
},
class extends CustomNodeIFace {
    // 'constructor' here is optional, only for Blackprint.Node that was required to have
	constructor(node){
		super(node);
		this.node === (/* Object reference from .registerNode() */);
	}
});
```

> **Sketch Interface** is just like **Interface**, but with extended feature for handling user interface or HTML elements.

### Lifecycle order
1. `constructor()`: called on constructing new node object
2. `imported()`: called after new node was constructed
3. `init()`: called after all nodes have been constructed, all data imported, and cables has been connected
4. Special lifecycle
	- `initClone()`: called when new node interface is created but for different HTML element
	- `hotReload()`: called before Blackprint begin hot reloading the node and iface
	- `hotReloadedHTML()`: called when was HTML changed/reloaded
	- `hotReloaded()`: called after hot reload complete, you may want to call init again from here
	- `destroyClone()`: called when node interface's clone was deleted
5. `destroy()`: called on node deletion from instance

> `hotReload` feature must use ScarletsFrame in Development Mode (hot reload feature need to be enabled manually). When hot reloading, the iface will have `this.hotReloading === true` and reset to false after hot reload was completed.

### HTML template
When registering interface for sketch instance, it's **required** to have a HTML template for your node. 

```js
Blackprint.Sketch.registerInterface("BPIC/My/Custom/Node", {
	html: `...see html template below...`
}, class extends Blackprint.Interfce {})
```

Below is full basic template for a node, you're free to customize it to fit your needs and maybe remove some `<sf-template>` if you don't need it. You can add mustache template or apply two way binding on the template with the interface's property or data.
```html
<div class="node" style="transform: translate({{ x }}px, {{ y }}px)">
  <sf-template path="Blackprint/nodes/template/routes.sf"></sf-template>
  <sf-template path="Blackprint/nodes/template/header.sf"></sf-template>

  <div class="content">
    <div class="left-port">
      <sf-template path="Blackprint/nodes/template/input-port.sf"></sf-template>
    </div>

    <div class="right-port">
      <sf-template path="Blackprint/nodes/template/output-port.sf"></sf-template>
    </div>
  </div>

  <sf-template path="Blackprint/nodes/template/other.sf"></sf-template>
</div>
```

For styling the node, you need to specify the tag name. The tag name is a lowercased letters of the interface's name and `/` symbol is converted into `-`.
```scss
// Element name is based on interface's namespace, BPIC/LibraryName/FeatureName/Template
bpic-libraryname-featurename-template {
  .node{
	font-size: 16px;
	...
  }
}
```

### Initialize interface after creation
ScarletsFrame will call `init()` function once the node element was attached to DOM tree and you can begin initializing your HTML element.

```js
Blackprint.Sketch.registerInterface('BPIC/LibraryName/FeatureName/Template',
class IMyTemplate extends Context.IFace.MyTemplate {
	// Will run once the node element was attached to DOM tree
	init(){
		// You can use `$el` to help manipulate your HTML or obtain element by using query selector
		this.$el('.content').prepend(this.keepMe);

		// ====== Port Shortcut ======
		const {
			IInput, IOutput, // Port interface
			Input, Output, // Port value
		} = this.ref;
	}
});
```

### Handle removed interface
ScarletsFrame will call `destroy()` when the interface element is being removed.

```js
class extends Blackprint.Interface {
	destroy(){
        // You can remove event listener from here and do some clean up
	}
}
```

## Add event listener into a interface
You can also register an event that exist on **Interface** class. Below is some event addition for **Sketch Interface**:

|Event Name|Event Object|Description|
|---|---|---|
|`cable.created`|`{ port: Port, cable: Cable }`|A cable was created from a port|
|`port.hover`|`{ event: Event, port: Port }`|User hovered/focus on an port element|
|`port.unhover`|`{ event: Event, port: Port }`|User leaving focus from an port element|
|`port.menu`|<x-code2>{</x-t><x-t>instance: Engine \| Sketch,</x-t><x-t>port: Port,</x-t><x-t>menu: Array,</x-t><x-t>event: Event,</x-t><x-t>preventDefault: Callback</x-t>}</x-code2>|User right clicked port element to open a menu|
|`node.menu`|<x-code2>{<x-t>iface: Interface,</x-t><x-t>instance: Engine \| Sketch,</x-t><x-t>menu: Array,</x-t><x-t>event: Event,</x-t><x-t>preventDefault: Callback</x-t>}</x-code2>|User right clicked the node's header to open a menu|

Below is one of example on how to register event on an interface:
```js
// Optional, but recommended to avoid re-register similar listener
let EventSlot = {slot: "myLibraryName"};

class extends Blackprint.Interface {
	// Interface event can be listened after the node was initialized.
	init(){
		let iface = this;

		iface.on('port.menu', function(data){
			// data.iface === iface
			let menu = data.menu;

			// Add menu with callback
			menu.push({
				title: "With callback",
				callback(){...}
			});

			// Add menu with callback with the arguments
			menu.push({
				title: "Callback with arguments",
				args: [1, 2],
				callback(one, two){...}
			});

			// Add menu with callback with call context
			menu.push({
				title: "Callback with context",
				context: data.port,
				callback(one, two){
					// this === data.port
				}
			});

			// Add menu and listen for mouse hover/unhover
			menu.push({
				title: "When mouse over the dropdown item",
				hover(){...},
				unhover(){...},
			});

			// Add menu inside of menu
			menu.push({
				title: "Deep level menu",
				deep: [{
					title: "Level 1",
					deep: [{
						title: "Level 2",
						deep:[{...}]
					}]
				}]
			});
		});
	}
}
```