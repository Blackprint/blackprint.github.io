<center>
Blackprint is designed to be modular and it has relation like below:

![brave_kJ1dlxFYQI](https://user-images.githubusercontent.com/11073373/185061030-a0bd75e0-e665-4462-8bdc-463e1945039b.jpg)
</center>

**Node** is the main component for Blackprint and any function/properties in it's class should be considered as private or internal. **Node** will have an **Interface** that can help you or other developers interact with your **Node**, just think like an **API**. In the browser environment, especially on nodes editor **(Sketch)** you can customize your node's user interface with **Sketch Interface**. Sketch Interface can also have it's own handler for browser only, like listening to mouse click or other browser event. When the module get imported on non-browser environment the **Sketch Interface** script (`.sf.mjs`) will not be loaded for them.

> In the browser environment, **Sketch Interface** script will not get loaded if you didn't load/import `@blackprint/sketch`

## Register Node
This registration is _**required**_.<br>
Every node is registered in a namespace and every namespace need to be capitalized. Don't use symbol for the namespace except `.`, `_`, `/`. In some programming language, the dot `.` symbol will be converted into underscore `_`.

```js
Blackprint.registerNode("My/Custom/Node",
class extends Blackprint.Node {
	constructor(instance){
		super(instance);

		// This call is required, you can also leave this empty to use default interface
		this.setInterface("BPIC/My/Custom/Node");
		this.iface === (/* Object reference from .registerInterface() */);

		// Function below will be available if the instance is Blackprint.Engine or Blackprint.Sketch
		this.node.helloEngine();

		// Function below will be available if the instance is Blackprint.Sketch only
		this.node.helloSketch();
	}

	// This function will be available for both Engine and Sketch node instance
	helloFromNode(){ return 123 }
});
```

## Register Interface
This is an **optional** registration.<br>
Interface registration is necessary if you want to use different user interface for the nodes, or giving an API for developers to interact with your node's functionality with code/scripts. Think of **node** is internal device/circuit and **interface** is something you can interact into.

Every interface is registered in a namespace, every namespace need to be capitalized and starts with `BPIC/...`. BPIC stands for `Blackprint Interface Component`.

```js
let CustomNodeIFace;

Blackprint.registerInterface("BPIC/My/Custom/Node",
CustomNodeIFace = class extends Blackprint.Interface {
	constructor(node){
		super(node);
		this.node === (/* Object reference from .registerNode() */);

		this.node.helloFromNode(); // => 123
	}

	// This function will be available for both Engine and Sketch node instance
	helloEngine(){ }
});
```

## Register Sketch Interface
This is an **optional** registration and **can only be registered for Browser environment**.<br>
You can also just extends from the class you have registered with `Blackprint.registerInterface()`. The namespace also **must be** similar with the interface you have registered: `Blackprint.registerInterface('BPIC/A/B', ...) <-> Blackprint.Sketch.registerInterface('BPIC/A/B', ...)`.

```js
Blackprint.Sketch.registerInterface("BPIC/My/Custom/Node", {
	// You can define your node's HTML on here
	html: `<div>...</div>`

	// If you're using .sf file from Blackprint template
	// You can skip this second parameter and just replace it with class declaration
	// Blackprint.Sketch.registerInterface("BPIC/My/Custom/Node", class extends ...)
},
class extends CustomNodeIFace {
	constructor(node){
		super(node);
		this.node === (/* Object reference from .registerNode() */);

		this.node.helloFromNode(); // => 123
	}

	// This function will be available for Sketch node instance only
	helloSketch(){ }
});
```

For more information, let's navigate to other sub-documentation. To begin with, you can navigate with this order: `Create Module -> Node -> Port -> Interface -> Sketch Interface`.