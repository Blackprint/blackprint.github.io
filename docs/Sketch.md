> Blackprint Sketch is using ScarletsFrame for the HTML templating system.

Blackprint Sketch is only available for modern Browser, it can also running on Node.js for unit testing. Chromium based browser is more recommended, and there will be no support for IE11 or old Safari browser.

## Load Blackprint required files

<docs-md-tabs>
<div class="tabs"><div sf-each="x in tabs">{{ x }}</div></div>

<div tab="Browser">

You need to put this in the `<head>` tag.
```html
<!-- If you're going to use Sketch, the framework must be loaded before the engine -->
<script src="https://cdn.jsdelivr.net/npm/scarletsframe@0.35" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@blackprint/engine@0.7" crossorigin="anonymous"></script>

<!-- Load Sketch after the Engine -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blackprint/sketch@0.7/dist/blackprint.sf.css">
<script src="https://cdn.jsdelivr.net/npm/@blackprint/sketch@0.7/dist/blackprint.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@blackprint/sketch@0.7/dist/blackprint.sf.js" crossorigin="anonymous"></script>
```

</div><div tab="Unit Test">

If you want to import Blackprint Sketch for unit testing in Node.js, you also need to set the Blackprint to use `windowless` mode. I also recommend for using Jest.
```js
window.ResizeObserver = class{}; // Polyfill with empty class
window.sf = require("scarletsframe/dist/scarletsframe.min.js");

// Disable sf.loader for browser
sf.loader.turnedOff = true;
sf.loader.task = false;

// Load Blackprint Engine before the Sketch
require("@blackprint/engine");
require("@blackprint/sketch/dist/blackprint.min.js");
require("@blackprint/sketch/dist/blackprint.sf.js");

// Let Blackprint know we're running in windowless environment
Blackprint.settings('windowless', true);

// Force Blackprint module to load from node_modules
Blackprint.Environment.loadFromURL = false;

// Force to browser environment
Blackprint.Environment.isBrowser = true;
Blackprint.Environment.isNode = false;

// Begin testing, below can be different depends on what you want to test
test("Load required modules", async () => {
	// Alternative for Blackprint.loadModuleFromURL(...);
	await import(".../dist/nodes-module-name.mjs"); // For Browser/Node.js
	await import(".../dist/nodes-module-name.sf.mjs"); // For Browser UI

	// Wait and avoid Jest's test environment being torn down
	await Blackprint.getContext('ModuleName');
	await new Promise(resolve => setTimeout(resolve, 1000));

	// Check if the nodes has been registered
	expect(Blackprint.nodes['ModuleName']).toBeDefined();
});
```

</div></docs-md-tabs>

## Create Instance
`Blackprint.Sketch` does extends `Blackprint.Engine` class, that's mean the API and functionaily is similar with the Engine instance but with extended feature like having a User Interface for the nodes, cable, ports and also handling user interaction for managing the instance.

```js
var instance = new Blackprint.Sketch();

// Get the container and attach it into the DOM
document.body.appendChild(instance.cloneContainer());
```

If you want to create a minimap, you can just call `instance.cloneContainer(true)` for the same instance and scale it down.

## Import Blackprint nodes
If you have exported Blackprint into JSON, then you can easily import it like below:
```js
// After imported it will automatically appended into the DOM container
var nodes = sketch.importJSON('{...}');
// nodes = [iface, iface, ...]

/**
 * Import nodes structure and connection from JSON
 * @param json JSON data
 * @param options additional options for importing JSON data
 */
importJSON(json: string | object, options?: {
	/** Set this to false if you want to clear current instance before importing */
	appendMode?: Boolean,
	/** Skip importing environment data if exist on the JSON */
	noEnv?: Boolean,
	/** Skip importing module URL (in case if you already imported the nodes from somewhere) */
	noModuleJS?: Boolean,
}): Promise<Array<Interface>>;
```

## Create single Blackprint node
To create new node and put it on the DOM you can call
```js
let iface = sketch.createNode('MyModule/Math/Multiply', {/* optional options */});

/**
 * Create a node from a namespace
 * @param namespace Node namespace
 * @param options additional options
 */
createNode(namespace: string, options?: {
	data?: object, // You can access this data in a class with `imported(data){...}`
	x?: number, // Node X position
	y?: number, // Node Y position
	id?: number, // Node ID
}): Interface;
```

```js
var iface = sketch.createNode('Math/Multiply', {x:20, y:20});
// iface.node == the node handler
```

## Get created node and cable list
**Blackprint Sketch** does expose model and components through sketch.scope('modelName'). Below is reactive list, so if you remove or modify the array it will also modify the sketch container. It's **not recommended** to modify the list directly with `.push, .splice, .pop` or other array manipulation function.
```js
var ifaceList = sketch.scope('nodes').list; // as Array<Interface>
var cableList = sketch.scope('cables').list; // as Array<Cable>
```

## Refresh node and cable position
When some node size was changed usually the cable is not in the right position, in order to fix it you can call:
```js
sketch.recalculatePosition();
```

## Export Blackprint nodes
Currently you can export your diagram only with Blackprint Sketch. The nodes can be exported as JSON, but it's like the node namespace, position, value, and the connections.
```js
var str = sketch.exportJSON();
// {"Math/Multiply":[...], ...}

/**
 * Export current instance's nodes structure and connections to JSON
 * @param options additional options
 */
exportJSON(options?: {
	/** Export selected nodes only */
	selectedOnly?: Boolean,

	/** Exclude node namespace */
	exclude?: string[],

	/** JSON's whitespace/tabsize length */
	space?: Number,

	/** Set this to true if you want to also export Blackprint enviroment variables */
	environment?: Boolean,

	/** Set this to false if you don't want to include .js module URL in the export */
	module?: any,

	/** Set this to false if you don't want to export node's (x,y) position */
	position?: any,

	/** Set this to false if you don't want to export custom function */
	exportFunctions?: any,

	/** Set this to false if you don't want to export custom variable */
	exportVariables?: any,

	/** Set this to true if you don't want to serialize the object to JSON */
	toRawObject?: any,

	/** JSON.stringify's replacer */
	replacer?: any,

	/** Simplify the exported JSON for use in JavaScript */
	toJS?: any,
}): String | object;
```

## Add event listener to the instance
You can also register an event that exist on Engine class for your Sketch instance. Below is some event addition for Sketch instance.

|Event Name|Event Object|Description|
|---|---|---|
|`container.selection`|`{ cables: Array, nodes: Array }`|User is selecting some nodes and cables|
|`json.imported`|`{ appendMode: Boolean, nodes: Array, raw: String }`|JSON was imported into the instance|
|`error`|`{ type: String, data: Object }`|An error happened on the instance|
|`port.default.changed`|`{ port: Port }`|Default port value was changed|
|`cable.create.branch`|`{ event: Event, cable: Cable }`|A cable was splitted and a cable branch was created|
|`cable.created`|`{ port: Port, cable: Cable }`|A cable was created|
|`cable.dropped`|`{ port: Port, cable: Cable, event: Event }`|A cable that was created by user interaction was dropped by user|
|`cable.drag`|`{ cable: Cable }`|A cable is being dragged by user|
|`cable.deleted`|`{ cable: Cable }`|A cable was deleted|
|`node.move`|`{ iface: Interface, event: Event }`|A node is moved by user interaction|
|`node.resize`|`{ items: Array }`|Some nodes get resized|
|`node.delete`|`{ iface: Interface }`|A node is being deleted|
|`node.deleted`|`{ iface: Interface }`|A node was deleted|
|`node.created`|`{ iface: Interface }`|A node was created|
|`node.click`|`{ iface: Interface, event: Event }`|User clicked the node header|
|`node.hover`|`{ iface: Interface, event: Event }`|User is hovering/focus the node header|
|`node.unhover`|`{ iface: Interface, event: Event }`|User is leaving focus the node header|
|`port.hover`|`{ port: Port, event: Event }`|User is hovering/focus the port element|
|`port.unhover`|`{ port: Port, event: Event }`|User is leaving focus the port element|
|`node.function.open`|<x-code2>{<x-t>event: Event,</x-t><x-t>iface: Interface,</x-t><x-t>function: BPFunction</x-t>}</x-code2>|User was double clicked a function node to open it|

Below is an example on how to register event on the instance:
```js
// Optional, but recommended to avoid re-register similar listener
let EventSlot = {slot: "myLibraryName"};
let instance = new Blackprint.Sketch();

instance.on('node.function.open', EventSlot, async function(event){
	let name = ev.iface.namespace.split('/').join('-');
	name += '-'+ev.iface.uniqId;

	// Go to a new page for viewing inside of function node
	await views.goto("/sketch/node-"+name, {
		bpInstance: ev.iface.bpInstance
	});
});
```

Global event
|Event Name|Event Object|Description|
|---|---|---|
|`menu.create.node`|<x-code2>{<x-t>list: Object,</x-t><x-t>menu: Array,</x-t><x-t>sketch: Sketch,</x-t><x-t>event: Event,</x-t><x-t>options: Object,</x-t><x-t>preventDefault: Callback</x-t>}</x-code2>|Internal Blackprint is creating a menu for node suggestion|

Below is an example on how to register event into Blackprint:
```js
Blackprint.on('menu.create.node', EventSlot, function(event){
	let { list, isSuggestion } = event;
	if(!isSuggestion) return;

	delete list['Example']; // Delete "Example/*" nodes namespace list from node suggestion
});
```