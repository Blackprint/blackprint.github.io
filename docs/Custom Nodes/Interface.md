## Interface Registration
We need an interface if you want to provide a function or exposable property for other developer to your node, this allow your application and the node to talk each other.

To register an interface into Blackprint Engine, you need to prepare class that extends `Blackprint.Interface` and register it with `Blackprint.registerInterface(namespace, class)`.

> Every interface must be registered in a namespace started with `BPIC/` and every namespace need to be capitalized. Don't use symbol for the namespace except `.`, `_`, `/`. In some programming language, the dot `.` symbol will be converted into underscore `_`.

BPIC stands for `Blackprint Interface Component`, this root namespace will help avoid conflict with internal namespace in the future.

```js
let CustomNodeIFace; // You can store the class here in case if you want to export or use it on other script

Blackprint.registerInterface("BPIC/My/Custom/Node",
CustomNodeIFace = class extends Blackprint.Interface {
    // 'constructor' here is optional, only for Blackprint.Node that was required to have
	constructor(node){
		super(node);
		this.node === (/* Object reference from .registerNode() */);
	}
});
```

There are several ways to obtain interface object after you created a node in the instance:

```js
let instance = new Blackprint.Engine();
await instance.importJSON(...);

// If you want to get list of the created iface
instance.ifaceList // [iface1, iface2, ...]

// If you want to get iface by node id
instance.iface["ifaceId"] instanceof Blackprint.Interface

// If you want to get references object by node id
let { Input, Output, IInput, IOutput } = instance.ref["ifaceId"];
```

### Lifecycle order
1. `constructor()`: called on constructing new node object
2. `imported()`: called after new node was constructed
3. `init()`: called after all nodes have been constructed, all data imported, and cables has been connected
4. `destroy()`: called on node deletion from instance

### Initialize interface after creation
Blackprint will call `init()` function when everything is ready to be used, after all nodes have been constructed, all data imported, and cables has been connected. This can be overriden when you also registered interface for sketch instance.

```js
class extends Blackprint.Interface {
	init(){
		// It's time to add event listener or some other initialization after node creations
		// Blackprint will call this function after `node.init()`

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
When you're creating a node either using `instance.importJSON({...})` or `instance.createNode(namespace, options)` sometime the JSON may contain saved data from `iface.data` or optionally specift data on `options` for `.createNode()`, Blackprint will call `node.imported(data)` to let you process the data after node construction before initialization.

```js
// This is optional but recommended if you want to store data on your interface
class MyDataStructure {
    constructor(iface){
        this._iface = iface;
    }

	get value(){ return this._value },
	set value(val){
		this._value = val;

		// Add support for remote sync: node.syncOut(eventName, value);
		// The data will be received in: node.syncIn(event, value);
		this._iface.node.syncOut('data.value', val);
	},
}

class extends Blackprint.Interface {
    constructor(node){
        // Create a data storage, this data can be exported with `sketchInstance.exportJSON()`
        this.data = new MyDataStructure(this);
    }

	imported(data){
		// A boolean indicating if this node is being imported/created
		// This will reset to false after this imported() has been called
		this.importing === true;

		// This will only exist if 
		data instanceof Object;

		// Assign saved data into our iface.data
		// You shouldn't use "this.data = data" or it will replace the object
		Object.assign(this.data, data);
	}
}
```

### Handle removed interface
Blackprint will call `destroy()` when the node is being removed. This can be overriden when you also registered interface for sketch instance.

```js
class extends Blackprint.Interface {
	destroy(){
        // You can remove event listener from here and do some clean up
	}
}
```

## Add event listener into a interface
|Event Name|Event Object|Description|
|---|---|---|
|`cable.connect`|`{ port: Port, target: Port, cable: Cable }`|Two ports were connected with a cable|
|`cable.disconnect`|`{ port: Port, target: Port, cable: Cable }`|Two ports get disconnected each other|
|`port.value`|`{ port: Port, target: Port, cable: Cable }`|There's new value update coming from output port|

Below is an example on how to register event on an interface:
```js
// Optional, but recommended to avoid re-register similar listener
let EventSlot = {slot: "myLibraryName"};

class extends Blackprint.Interface {
	init(){
        this.on('cable.connect', EventSlot, function(event){
            event.port // => Port interface reference from this node
            event.target // => Port interface reference from other node
            event.cable // => Cable reference that connect two ports
        });
	}
}
```