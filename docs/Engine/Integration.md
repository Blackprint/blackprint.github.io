## Blackprint Engine Integration
When you want to export and integrate Blackprint into your project (without sketch container or user interface), you only need to import Blackprint Engine and the required modules to your project.

## Integrate with frontend framework
The engine perform nicely with some framework like Vue, and ScarletsFrame. You can easily use two-way data binding for the node's ports with them. But if your project doesn't use these framework, you can still use listen to port's event and change the value manually from the port itself.

## Integrate with the event listener
Before you want to integrate, you need to create new Engine instance and import your JSON into that instance. If you haven't loaded any modules to your project or want to import module from URL, you need to allow import from origin as it default to disabled.

```js
// Only allow import module from cdn.jsdelivr.net, you can also change this into array
Blackprint.allowModuleOrigin('cdn.jsdelivr.net');

// Create new engine instance
var instance = new Blackprint.Engine();
await instance.importJSON(YOUR_JSON_TEXT);
```

Make sure you have add ID to your nodes, to make it easier to obtain its object reference. In the Blackprint Editor you can right click the node's header and add ID. For the example, the node below does have `hello` ID and have a label icon on the header.

![CScawXMWdJ](https://user-images.githubusercontent.com/11073373/184813410-0b5dab4c-ad09-48e2-a3ec-cb5a35efa880.png)

From the instance, you can obtain the node by using code below:
```js
let { hello } = instance.ref;
```

You can also obtain the port `Result`'s value with `hello.Output.Result`. You can also call or obtain from `Input` port, but you can't change it's value directly. In that case, you may need to create a `Public Variable` or using `new Blackprint.OutputPort()`.

For example, to call the `Exec` port you can do it like below:
```js
let { hello } = instance.ref;
hello.Input.Exec();
```

If you want to modify the input port's value, you must connect it to other output port:
```js
let { hello } = instance.ref;

// Create output port virtually
let MyOutput = new Blackprint.OutputPort(Number); // Type Data: Number
MyOutput.value = 123; // Assign value for this port

// Connect our virtual port to the node (`A` port)
// `IInput` is input port's interface
MyOutput.connectPort(hello.IInput.A); 
```

You can also listen to value changes for the `Result`'s port, but these listener must be registered before any event occurs. This method can also be used for Input and Output port.
```js
let { hello } = instance.ref;
hello.Input.Exec();
```

For further information please go to **Custom Nodes** section, the engine is designed to be similar for each programming language. It wont be difficult if you already familiar with the documentation for JavaScript.

Below is an example that you can try to help you getting familiar with the API:
<iframe height="300" style="width: 100%;" scrolling="no" title="Blackprint Engine + Event Listener" src="https://codepen.io/stefansarya/embed/dymQpdq?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/stefansarya/pen/dymQpdq">
  Blackprint Engine + Event Listener</a> by StefansArya (<a href="https://codepen.io/stefansarya">@stefansarya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>