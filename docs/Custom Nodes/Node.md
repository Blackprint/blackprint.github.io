## Node Registration
Node registration is required as this is the main part that will process the received data flow from Blackprint Engine. To register a node into Blackprint Engine, you need to prepare class that extends `Blackprint.Node` and register it with `Blackprint.registerNode(namespace, class)`.

> Every node must be registered in a namespace and every namespace need to be capitalized. Don't use symbol for the namespace except `.`, `_`, `/`. In some programming language, the dot `.` symbol will be converted into underscore `_`.

```js
/**
 * Write your node's documentation here
 * @blackprint node
 * @summary write small description below the node's title here
 */
Blackprint.registerNode("My/Custom/Node",
class extends Blackprint.Node {
	constructor(instance){
		super(instance);

		// This call is required, you can also leave this empty to use default interface
		this.setInterface("BPIC/My/Custom/Node");

		// After calling above function, `this.iface` will have an reference to it's interface
		this.iface === (/* Object reference from .registerInterface() */);

		// You can also change the title from here
		iface.title = 'My Title';
	}
});
```

`@blackprint node` is required if you want the compiler to extract the documentation. Single line comment with `// ...` will not be extracted, please use `/** ... */` instead. For information about how to define port for your node, please go to **Custom Nodes -> Port** documentation. If you searching for how to create node for an instance, please go to **Engine** or **Sketch** documentation.

### Lifecycle order
1. `constructor()`: **Required**, called on constructing new node object
2. `imported()`: called after new node was constructed
3. `init()`: called after all nodes have been constructed, all data imported, and cables has been connected
4. Data cycle
	- `update()`: called when current node receiving an data on input port
	- `request()`: called when other node is requesting data from current node's output port
	- `syncIn()`: called when the synchronizing with `node.syncOut()` for remote engine
5. `destroy()`: called on node deletion from instance

> Example code for every section below is a simplified version of implementation, you also need to add `constructor` function like example above for registering node. They are also optional, you can skip them if you don't need it.

### Initialize node after creation
Blackprint will call `init()` function when everything is ready to be used, after all nodes have been constructed, all data imported, and cables has been connected.

```js
class extends Blackprint.Node {
	init(){
		// It's time to add event listener or some other initialization after node creations

		// ====== Port Shortcut ======
		const {
			IInput, IOutput, // Port interface
			Input, Output, // Port value
		} = this.ref;

		// Port interface: can be used for registering event listener
		// Port value: can be used for get/set the port value
	}
}
```

### Handle data import on creation
When you're creating a node either using `instance.importJSON({...})` or `instance.createNode(namespace, options)` sometime the JSON may contain saved data from optionally specify `data` field on `options` for `.createNode()`, Blackprint will call `node.imported(data)` to let you process the data after node construction before initialization.

```js
// Please see Custom Nodes -> Interface instead to see detailed example
class extends Blackprint.Node {
	imported(data){
		// A boolean indicating if this node is being imported/created
		// This will reset to false after this imported() has been called
		this.iface.importing === true;

		// This will only exist if we're importing JSON or using options that have `data` field
		data instanceof Object;
	}
}
```

### Handle data update from input port
Callback when current input port's value was updated from the other node's output port. Adding `update()` function is more recomended than using event listener `port.value` or `value`. If you trigger `node.update()` manually somewhere on your code, you must trigger route out `node.routes.routeOut()` too.

```js
class extends Blackprint.Node {
	update(cable){
		// Triggered when any output value from other node are updated
		// And this node's input connected to that output
	}
}
```

### Handle data request from output port
Callback when other node's input port are requesting current node's output value. This function will be useful if the data flow is started from the right side, where input port is asking output data from node on the left side.

```js
class extends Blackprint.Node {
	request(cable){
		// Triggered when other connected node is requesting
		// output from this node that have empty output
	}
}
```

### Sync with remote node
Callback when the node received data sync from remote node

```js
class extends Blackprint.Node {
	// Add support for remote sync (this will receive data from .syncOut)
	syncIn(eventName, value){
		if(eventName === 'data.value')
			this.iface.data.value = value;
	}
}
```