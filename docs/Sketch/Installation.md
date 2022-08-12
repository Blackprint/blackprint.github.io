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