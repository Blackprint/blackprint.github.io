Interface event can be listened after the node was initialized.
To register a callback for an event you need to call `iface.on('event.name', function(...Arguments){ })`

Arguments on the table above with {...} is a single object.
DropDowns is an array, and you can push a callback or nested menu inside it.

```js
iface.on('port.menu', function(data){
    data.menu.push({
        title:"With callback",
        callback:function(){...}
    });

    data.menu.push({
        title:"Callback with arguments",
        args:[1, 2],
        callback:function(one, two){...}
    });

    data.menu.push({
        title:"Callback with context",
        context:data.port,
        callback:function(one, two){
            // this === data.port
        }
    });

    data.menu.push({
        title:"When mouse over the dropdown item",
        hover:function(){...},
        unhover:function(){...},
    });

    data.menu.push({
        title:"Deep level menu",
        deep:[{
            title:"Level 1",
            deep:[{
                title:"Level 2",
                deep:[{...}]
            }]
        }]
    });
})
```

## Interface Registration
We need an interface if you want to provide a function or exposable property for other developer to your node, this allow your application and the node to talk each other.

To register an interface into Blackprint Engine, you need to prepare class that extends `Blackprint.Interface` and register it with `Blackprint.registerInterface(namespace, class)`.

> Every interface must be registered in a namespace started with `BPIC/` and every namespace need to be capitalized. BPIC stands for `Blackprint Interface Component`. Don't use symbol for the namespace except `.`, `_`, `/`. In some programming language, the dot `.` symbol will be converted into underscore `_`.

```js
let CustomNodeIFace; // You can store the class here in case if you want to export or use it on other script

Blackprint.registerInterface("BPIC/My/Custom/Node",
CustomNodeIFace = class extends Blackprint.Interface {
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

### Initializing interface after creation
|init|()|Callback function to be run after current handle and all interface was initialized|

### Handling data import on creation
|importing|A boolean indicating if this node is being imported/created|
|imported|(options)|This is a callback after node was created, imported options should be handled here|

```js
Blackprint.registerInterface('BPIC/LibraryName/FeatureName/Template',
Context.IFace.MyTemplate = class IMyTemplate extends Blackprint.Interface {
	// this == iface

	constructor(node){
		super(node); // 'node' object from .registerNode

		this.myData = 123;
		this._log = '...';

		// If the data was stored on this, they will be exported as JSON
		// (Property name with _ or $ will be ignored)
		this.data = {
			_iface: this,
			get value(){ return this._value },
			set value(val){
				this._value = val;

				// Add support for remote sync: .syncOut(eventName, value);
				// The data will be received in: syncIn(event, value);
				this._iface.node.syncOut('data.value', val);
			},
		};

		// Creating object data with class is more recommended
		// this.data = new MyDataStructure(this);
	}

	// When importing nodes from JSON, this function will be called
	imported(data){
		// Use object assign to avoid replacing the object reference (that makes our getter/setter gone)
		Object.assign(this.data, data);
	}

	init(){
		// When Engine initializing this scope

		// ====== Port Shortcut ======
		const {
			IInput, IOutput, // Port interface
			Input, Output, // Port value
		} = this.ref;

		// Port interface can be used for registering event listener
		// Port value can be used for get/set the port value

		// this.output === IOutput
		// this.input === IInput
		// this.node.output === Output
		// this.node.input === Input

		// this.output.Test => Port Interface
		// this.node.output.Test => Number value

		// For some event listener please see on ./Template.sf
	}

	// Create custom getter and setter
	get log(){ return this._log }
	set log(val){
		this._log = val
	}
});
```

## Add event listener into a interface

|Event Name|Event Object|Description|
|---|---|---|
|`cable.connect`|`{ port: Port, target: Port, cable: Cable }`|d|
|`cable.disconnect`|`{ port: Port, target: Port, cable: Cable }`|d|
|`port.value`|`{ port: Port, target: Port, cable: Cable }`|d|