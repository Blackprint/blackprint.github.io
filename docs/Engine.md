## Load the engine and modules
<docs-md-tabs>
<div class="tabs"><div sf-each="x in tabs">{{ x }}</div></div>

<div tab="Browser">

In the browser you can easily import the from CDN, and you will have `Blackprint` object on the `window` context.

```html
<!-- Put this in <head> -->
<script src="https://cdn.jsdelivr.net/npm/@blackprint/engine@0.9" crossorigin="anonymous"></script>

<!-- [Optional] Load required modules -->
<!-- If you didn't do this, Blackprint Engine may load from module list that specified on the exported JSON -->
<script src="https://cdn.jsdelivr.net/npm/...[the required module URL]..." crossorigin="anonymous"></script>
```

</div><div tab="Node.js">

#### Installing the engine
You can use `npm`, `pnpm`, or `yarn` when installing packages. But it's recommended to use `pnpm` to save disk space.

```sh
$ pnpm i @blackprint/engine
```

#### Load required module
In this example we will name the file as `init.js`

```js
// Initialize the engine first
let Blackprint = require("@blackprint/engine");

// [Optional] Blackprint can also load from module list specified on the exported JSON
require("...[the required module URL]...");
```

#### Run your application
If you don't load any modules by URL and prefer to manually `require` the modules, you can use this command:

```sh
$ node init.js
```

---

If you want to load modules by URL, you need to use a https loader:
> You must use `.mjs` as the entry point's file extension

```sh
$ node --no-warnings --loader ./node_modules/@blackprint/engine/es6-https-loader.mjs ./init.mjs
```

</div><div tab="Deno">

#### Load the engine from CDN
In this example we will name the file as `init.mjs`

```js
// Initialize the engine first
import Blackprint from 'https://cdn.skypack.dev/@blackprint/engine@0.9';
```

#### Run your application
Blackprint for Deno will load modules from URL, you just need to make sure the exported JSON does contain the required module list.

```sh
$ deno run --allow-net ./init.mjs
```

</div><div tab="PHP">

#### Installing the engine package
```sh
$ composer install blackprint/engine
```

After that you can just import with autoload, you also need to install another required nodes module manually.

```php
require_once('vendor/autoload.php');
```

</div><div tab="Golang">

#### Installing the engine package
```sh
$ go get https://github.com/Blackprint/engine-go
```

#### Write your entry point file

```go
package main

import (
	Blackprint "github.com/blackprint/engine-go/blackprint"
	"github.com/blackprint/engine-go/engine"
	"github.com/blackprint/engine-go/types"
)

func main() {
	// ...
}
```

</div></docs-md-tabs>

## Create Engine Instance
```js
// If you load from CDN, "Blackprint" is registered in window object
import Blackprint from '@blackprint/engine';

// Only allow import module from cdn.jsdelivr.net, the first parameter can also be an array
Blackprint.allowModuleOrigin('cdn.jsdelivr.net');

// If you're running on Node.js and don't want to load modules from URL
// you need to manually imports the modules before calling 'createNode' or 'importJSON'

// Create Blackprint Engine instance
var instance = new Blackprint.Engine();
```

### Create node in an instance
```js
var iface = instance.createNode('MyModule/Math/Multiply', {/* optional options */});

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

### Import nodes from JSON
If you have exported Blackprint into JSON, then you can easily import it like below:
```js
instance.importJSON(/* JSON || Object */);

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

### Delete node from an instance
```js
// Delete a single node
instance.deleteNode(myIfaceObject);
// instance.deleteNode(iface: Interface): void;

// To delete all nodes at once
instance.clearNodes();
```

## Add event listener to the instance
These event can also be used for **Sketch Instance**.

|Event Name|Event Object|Description|
|---|---|---|
|`node.id.changed`|`{ iface: Interface, old: String, now: String }`|Node ID was added/changed/removed|
|`cable.disconnect`|`{ port: Port, target?: Port, cable: Cable }`|A cable was disconnected or deleted|
|`cable.connect`|`{ port: Port, target: Port, cable: Cable }`|A cable was connected between two port|
|`json.imported`|`{ appendMode: Boolean, nodes: Array, raw: String }`|JSON was imported into the instance|
|`cable.created`|`{ port: Port, cable: Cable }`|A cable was created|
|`cable.deleted`|`{ cable: Cable }`|A cable was deleted|
|`node.delete`|`{ iface: Interface }`|A node is being deleted|
|`node.deleted`|`{ iface: Interface }`|A node was deleted|
|`node.created`|`{ iface: Interface }`|A node was created|
|`error`|`{ type: String, data: Object }`|An error happened on the instance|
|`event.field.created`|`{ name: String, namespace: String }`|New event data field was created|
|`event.field.renamed`|`{ old: String, now: String, namespace: String }`|An event data field was renamed|
|`event.field.deleted`|`{ name: String, namespace: String }`|An event data field was deleted|
|`variable.new`|<x-code2>{<x-t>scope: VarScope,</x-t><x-t>id: String,</x-t><x-t>reference?: BPVariable,</x-t><x-t>bpFunction?: BPFunction,</x-t>}</x-code2>|New variable was created|
|`variable.renamed`|<x-code2>{<x-t>old: String, now: String,</x-t><x-t>scope: VarScope,</x-t><x-t>reference?: BPVariable,</x-t><x-t>bpFunction?: BPFunction,</x-t>}</x-code2>|A variable was renamed|
|`variable.deleted`|<x-code2>{<x-t>id: String,</x-t><x-t>scope: VarScope,</x-t><x-t>reference?: BPVariable,</x-t><x-t>bpFunction?: BPFunction,</x-t>}</x-code2>|A variable was deleted|
|`function.new`|`{ reference: BPFunction }`|A function template was created|
|`function.renamed`|`{ old: String, now: String, reference: BPFunction }`|A function template was renamed|
|`function.deleted`|`{ reference: BPFunction, id: String }`|A function template was deleted|
|`event.new`|`{ reference: InstanceEvent }`|An event namespace was created|
|`event.renamed`|`{ old: String, now: String, reference: InstanceEvent }`|An event namespace was renamed|
|`event.deleted`|`{ reference: InstanceEvent }`|An event namespace was deleted|
|`execution.paused`|<x-code2>{<x-t>afterNode?: Node<NodeStaticProps>,</x-t><x-t>beforeNode?: Node<NodeStaticProps>,</x-t><x-t>cable?: Cable,</x-t><x-t>cables?: Cable[],</x-t><x-t>triggerSource: Number,</x-t>}</x-code2>|The instance have been paused|
|`execution.terminated`|`{ reason: String, iface: Interface }`|The instance data flow got terminated|
|`function.port.renamed`|<x-code2>{<x-t>which: PortWhich,</x-t><x-t>old: String,</x-t><x-t>now: String,</x-t><x-t>reference: BPFunction,</x-t>}</x-code2>|A function node's port get renamed|
|`function.port.deleted`|<x-code2>{<x-t>which: PortWhich,</x-t><x-t>name: String,</x-t><x-t>reference: BPFunction,</x-t>}</x-code2>|A function node's port get deleted|
|`execution.terminated`|`{ reason: String, iface: Interface }`|The instance data flow got terminated|

Below is an example on how to register event on the instance:
```js
let EventSlot = {slot: "myLibraryName"}; // Optional, but recommended to avoid re-register similar listener
let instance = new Blackprint.Engine();

instance.on('node.id.changed', EventSlot, function(event){
	console.log(`Node ID from "${event.iface.title}" was changed from "${event.from}" into "${event.to}"`);
});
```

### Global event
|Event Name|Event Object|Description|
|---|---|---|
|`module.added`|`{ url: String }`|New module registration|
|`module.update`|`null`|A registered module was updated|
|`module.delete`|`{ url: String }`|Module registration was deleted|
|`environment.imported`|`null`|Imported new environment variables|
|`environment.added`|`{ key: String, value: String }`|New environment variable was added|
|`environment.changed`|`{ key: String, value: String }`|Environment variable data was changed|
|`environment.renamed`|`{ old: String, now: String }`|Environment variable data was renamed|
|`environment.deleted`|`{ key: String }`|Environment variable data was deleted|

Below is an example on how to register event into Blackprint:
```js
Blackprint.on('environment.renamed', EventSlot, function(event){
	console.log(`An environment key was changed from "${event.old}" into "${event.now}"`);
});
```