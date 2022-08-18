## Node Registration
To register a node into Blackprint Engine, you need to prepare class that extends `Blackprint.Node` and register it with `Blackprint.registerNode(namespace, class)`.

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
	}
});
```

`@blackprint node` is required if you want the compiler to extract the documentation. Single line comment with `// ...` will not be extracted, please use `/** ... */` instead. For information about how to define port for your node, please go to **Custom Nodes -> Port** documentation.

### Initializing node after creation
|init|()|Callback function to be run after current handle and all node was initialized|

### Handling data import on creation
|importing|A boolean indicating if this node is being imported/created|
|imported|(options)|This is a callback after node was created, imported options should be handled here|

### Handling data update from input port
|update|(Cable)|Callback when current input value are updated from the other node's output port|

### Handling data request from output port
|request|(targetPort, sourceNode)|Callback when other node's input port are requesting current node's output value|

```js
// Node will be initialized first by Blackprint Engine
// This should be used for initialize port structure and set the target interface
Blackprint.registerNode('LibraryName/FeatureName/Template',
class MyTemplate extends Blackprint.Node {
	// this == node

	// You can use type data like Number/String or "Blackprint.Port"
	// use "Blackprint.Port.Trigger" if it's callable port
	static input = {
		PortName1: Blackprint.Port.Default(Number, 123)
	};

	// Output only accept 1 type data
	// use "Function" if it's callable port
	static output = {
		PortName2: Number
	};

	constructor(instance){
		super(instance);

		// Interface path
		// Let it empty if you want to use default built-in interface
		// You don't need to '.registerInterface()' if using default interface
		let iface = this.setInterface('BPIC/LibraryName/FeatureName/Template');
		iface.title = 'My Title';
		iface.description = 'My Description';
	}

	// Put logic as minimum as you can in .registerNode
	// You can also put these function on .registerInterface instead
	init(){
		// Called before iface.init()
	}

	// This is more recomended than using event listener "port.value" or "value"
	// If you want to trigger this manually, you may also need to trigger route out `this.routes.routeOut();`
	update(cable){
		// Triggered when any output value from other node are updated
		// And this node's input connected to that output
	}

	imported(data){
		// When this node was successfully imported
		// iface can also has this function feature, please use one only
	}

	request(cable){
		// Triggered when other connected node is requesting
		// output from this node that have empty output
	}

	// Add support for remote sync (this will receive data from .syncOut)
	syncIn(eventName, value){
		if(eventName === 'data.value')
			this.iface.data.value = value;
	}
});
```