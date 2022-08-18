Cable is a linker that can help passing data between linked ports. Usually the data flow will always from output into an input port. Even it's lightweight, **you shouldn't passing too many data or your application** performance will decreased. If possible you should create an object that can be modified from other node rather than re-passing the data one by one. You can also listen to `cable.connect` on a port and just register an event listener with the object/instance that you received from the input port. These method will help decrease data passing between port and may improve your application performance.

The performance difference is not very large, if you think your node should have a port that passing many data to other port it's also okay. What I mean with "many data" is not like passing a very large array once, but it's just like updating the port value more often than usual:

```js
let { Output } = node.ref;

// I don't mean like this, this one still okay
Output.Data = [x1, x2, x3, ....., x10000];

// But it's more like this
let temp = [x1, x2, x3, ....., x10000];
for(let i = 0; i < temp.length; i++){
	Output.Data = temp[i];
}
```

Why the performance is slower? it's because when you updated the port value it will also trigger ports event for the port itself, and the node. It may also need to trigger remote event if you're using remote engine. It may not noticeable if the application didn't register any event listener except just using `update(){...}` function.

## Connect cable with port
It's more recommended to connect port with a port instead of creating a cable first. But if you have a Cable object obtained from somewhere that haven't been connected, you can also call `port.connectCable(cable)`.

```js
let targetIface = instance.ref['targetIface']; // targetIface is the node ID
let { IInput, IOutput } = targetIface;

IInput['PortName'].connectCable(cableFromSomewhere);
```

Cable that was created from input port must be connected into output port and vice-versa, or it will immediately get deleted/disconnected.

## Disconnect cable
To disconnect a cable, you can call `cable.disconnect();` function. Below is the example if you want to immediately disconnect a cable after beign connected into a port:

```js
// This will help to keep the registration unique and avoid multiple similar listener unexpectedly been registered
let EventSlot = {slot: "library-name"};

class MyNode extends Blackprint.Node {
	static input = { PortName: Number }
	constructor(){
		...
	
		// Triggered when a cable is connected
		let { PortName } = this.ref.IInput;
		PortName.on('connect', EventSlot, function({ cable }){
			cable.disconnect();
		});
	}
}
```