## Defining port for a node
Port can be defined statically when registering a node with `Blackprint.registerNode()`. Input or output port is optional, you can also skip defining port if you want to create a node that doesn't need any data. Below is the example on how to define port:

![brave_cLYl8ls0tx](https://user-images.githubusercontent.com/11073373/185162709-29a96350-5a83-42b3-9245-604c15ff8f9b.jpg)

```js
/**
 * Write your node's documentation here
 * @blackprint node
 * @summary write small description below the node's title here
 */
Blackprint.registerNode("My/Node",
class extends Blackprint.Node {
	// Define Input Port
	static input = {
		/** Write your port's documentation here */
		MyInputPort: Number, // This port will only accept Number data type
	};

	// Define Output Port
	static output = {
		/** Write your port's documentation here */
		MyOutputPort: String, // This port will only have String data type
	};

	constructor(instance){
		super(instance);
		this.setInterface();
	}
});
```

## Port types
In JavaScript you can easily use the class constructor for the port's data type. Blackprint Engine will validate every cable connection and also output data before the data reaching the input port. But in some scenario where you create a library and didn't expose the class constructor, the other library will can't use the similar constructor and Blackprint will consider it's a different data type even it has a similar name `MyType` <-> `MyType`.

While you can define the port with class constructor `String, Number, Object, RegExp`, you may find JavaScript didn't have a `Any` class constructor who accept anything. So if you want your port to accept any data type, you can use `Blackprint.Types.Any` as the data type.

```js
static input = {
	MyPort: Blackprint.Types.Any
}
```

## Port features
When defining port type with class constructor, it may only accept a single data type. In some scenario you may need port with extended feature like `Union` that can accept multiple data type or a port that can be called like a function with `Trigger`. Blackprint provides you this power and allow you to define port with `Blackprint.Port.{Feature}`.

> Available only for input port, except `Port.Route` and `Port.StructOf`

### ArrayOf
This port feature can contain multiple cable as input and the value will be array of `<type>`. It's only accept one type, not union. For union port please split it to different port to handle it.

![brave_NUHB0jqZzj](https://user-images.githubusercontent.com/11073373/185188717-5edf8d10-c45e-4f91-92b9-c1a8a766b0f8.jpg)

```js
static input = {
	MyPort: Blackprint.Port.ArrayOf(Number)
}
```

### Default
This port feature can contain default value for your defined data type.

![brave_mM8w8bUuLq](https://user-images.githubusercontent.com/11073373/185188895-d35d24c0-0aa5-4297-a665-a3b5bf6bb6ca.jpg)

```js
static input = {
	MyPort: Blackprint.Port.Default(String, "hello")
}
```

### Trigger
This port feature behaves like a function, other output port can call it like a function. You can also call this function manually from `node.ref.Input.MyPort()`.

```js
static input = {
	MyPort: Blackprint.Port.Trigger(function(port){
		console.log('MyPort was called');
		port.iface.node.doSomething();
	}),
}
```

On the other node for the output port, you can define your port type as Function. If `MyPort` is connected with `MyOutput` port and you want to call `MyPort` from the output port with a script, you can do it with `node.ref.Output.MyOutput()`.

```js
static output = {
	MyOutput: Function,
}
```

### Union
This port feature accept a single cable that compatible with multiple data type.

```js
static input = {
	MyPort: Blackprint.Port.Union([String, Number, Boolean])
}
```

### Route
While usually a node only allow you to use a single route cable output, this port feature can help you to create your own route port that can be connected to other route port. You can easily call it like a function `node.ref.Output.MyPort()`.

> This port only available for output port
```js
static output = {
	MyPort: Blackprint.Port.Route
}
```

### StructOf
When you create a complex node usually you will encounter with many ports definition and often find port name that can conflict with each other. With this port feature you can define a port that can be splitted in a structural form. To split this port you can do it from the Sketch by right clicking the port and choose Split.

> This port only available for output port
```js
static output = {
	// Port.StructOf(OriginalType, Structure)
	Speed: Blackprint.Port.StructOf(Object, {
		X: { type: Number, field: 'x' },
		Y: { type: Number, handle(data){ return data.y } },
	}),
	Velocity: Blackprint.Port.StructOf(Object, {
		X: { type: Number, field: 'x' },
		Y: { type: Number, handle(data){ return data.y } },
	}),
}
```

On unsplitted form, both of them will looks like below:

![brave_eMQMnaxmy6](https://user-images.githubusercontent.com/11073373/185187691-93ee6d06-eab1-4ebd-a79b-9a6923d8031b.jpg)

On splitted form, both of them will looks like below:

![brave_hr2FissKMU](https://user-images.githubusercontent.com/11073373/185187898-3e9aa909-b02b-4895-8d93-7fac70b0912d.jpg)

The `Structure` is formatted like below:
```js
Blackprint.Port.StructOf(TypeData, {
	PortName: { type: TypeData, [field || handle] },
})
```

`field` and `handle` is optional, but one of them is required. It's used for extracting data from the original data, let's use the example from the previous image and assume the `Input.Speed` port is receiving data like below:

```js
Input.Speed = {
	x: 10,
	y: 20,
}
```

On splitted form of StructOf, you may find 2 port that being handled with `field` and `handle`. Both is do the same thing, extracting `x` and `y` but in different way. The 2 port then will be appended into the output port, and you will have:

```js
node.ref.Output.SpeedX === 10
node.ref.Output.SpeedY === 20
node.ref.Output.Velocity === { ... } // Assume this haven't been splitted
```

---

## Dynamically add port into node

```js
class MyNode extends Blackprint.Node {
	static input = { PortName: Number };
	constructor(){...}

	// Triggered when importing data on node creation
	imported(data){
		let portA = this.createPort('input', 'PortA', String);
		let portB = this.createPort('input', 'PortB', Blackprint.Port.Arrayof(Number));
	}
}
```

## Adding component on port element
ToDo: this feature may get changed and will not be documented for now, but in a plan to be documented.

## Obtain connected cable list from a port
Cable list from a port can be obtained by using the port's interface `portInterface.cables`. Below is the example if you want to obtain cable list when:

```js
class MyNode extends Blackprint.Node {
	// Usually this will just have one cable, only ArrayOf type that can have multiple cable
	static input = { PortName: Number };

	constructor(){...}

	// Triggered when the input port have a new value
	update(){
		let { PortName } = this.ref.IInput;
		PortName.cables instanceof Array; // [Cable, ...]
	}
}
```

## Disconnect all cable from a port

```js
let { iface1 } = instance.ref; // iface1 is the node ID

// Disconnect all cables
iface1.IInput['MyInputPort'].disconnectAll();
```

## Connect ports
To connect ports, you need to obtain their port's interface first. One port from both `ref.IInput` and `ref.IOutput` is needed as input port can only be connected with output port. You can't connect input port with input port, and also you can't connect port that where the type data isn't compatible each other.

```js
let { iface1, iface1 } = instance.ref; // iface1, iface1 is the node ID

// Connect input with output port
iface1.IInput['MyInputPort'].connectPort(iface2.IOutput['MyOutputPort']);
```

## Add event listener into a port

|Event Name|Event Object|Description|
|---|---|---|
|`value`|Input Port: `{ port: Port, target: Port, cable: Cable }`<br>Output Port: `{ port: Port }`|d|
|`call`|`null`|d|
|`disconnect`|`{ port: Port, target?: Port, cable: Cable }`|d|
|`connect`|`{ port: Port, target: Port, cable: Cable }`|d|
|`connecting`|`{ target: Port, activate: Callback }`|d|