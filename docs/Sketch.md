> Blackprint Sketch is using ScarletsFrame for the HTML templating system.

Currently sketch only available on modern Browser, but it can also being run on Node.js for unit testing. Chromium based browser is more recommended, and there will be no support for IE11 or old Safari browser.

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

In case if you want to import Blackprint Sketch for unit testing in Node.js, you also need to set the Blackprint to use `windowless` mode. I also recommend for using Jest.
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
`Blackprint.Sketch` does extends `Blackprint.Engine` class, that's mean it's similar with the Engine instance but with extended functionality like having a User Interface for the nodes, cable, ports and also handling user interaction for managing the instance.

```js
var instance = new Blackprint.Sketch();

// Get the container and attach it into the DOM
document.body.appendChild(instance.cloneContainer());
```

If you want to create a minimap, you can just call `instance.cloneContainer()` again for the same instance and scale it down.

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
Blackprint does expose model and components through sketch.scope('modelName'). Below is reactive list, so if you remove or modify the array it will also modify the sketch container. It's **not recommended** to modify the list directly with `.push, .splice, .pop` or other array manipulation function.
```js
var ifaceList = sketch.scope('nodes').list;
var cableList = sketch.scope('cables').list;
```

## Refresh node and cable position
When some node size was changed usually the cable is not in the right position, in order to fix it you can call:
```js
sketch.recalculatePosition();
```

## Export Blackprint nodes
The nodes can be exported as JSON, but it's like the node namespace, position, value, and the connections.
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
|`node.function.open`|`{ event: Event, iface: Interface, function: BPFunction }`|d|
|`port.default.changed`|`{ port: Port }`|d|
|`node.move`|`{ iface: Interface, event: Event }`|d|
|`node.delete`|`{ iface: Interface, event: Event }`|d|
|`node.deleted`|`{ iface: Interface, event: Event }`|d|
|`node.created`|`{ iface: Interface, event: Event }`|d|
|`error`|`{ iface: Interface, event: Event }`|d|
|`json.imported`|`{ iface: Interface, event: Event }`|d|
|`cable.create.branch`|`{ iface: Interface, event: Event }`|d|
|`cable.dropped`|`{ iface: Interface, event: Event }`|d|
|`cable.created`|`{ iface: Interface, event: Event }`|d|
|`cable.drag`|`{ iface: Interface, event: Event }`|d|
|`cable.deleted`|`{ iface: Interface, event: Event }`|d|
|`node.click`|`{ iface: Interface, event: Event }`|d|
|`node.hover`|`{ iface: Interface, event: Event }`|d|
|`node.unhover`|`{ iface: Interface, event: Event }`|d|
|`port.hover`|`{ iface: Interface, event: Event }`|d|
|`port.unhover`|`{ iface: Interface, event: Event }`|d|
|`container.selection`|`{ iface: Interface, event: Event }`|d|
|`node.resize`|`{ iface: Interface, event: Event }`|d|

Global event
|Event Name|Event Object|Description|
|---|---|---|
|`menu.create.node`|`{ iface: Interface, event: Event }`|d|