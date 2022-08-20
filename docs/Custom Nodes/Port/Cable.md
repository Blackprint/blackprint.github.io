Cable is a linker that can help passing data between linked ports. Usually the data flow will always from output into an input port. Even the cable is a lightweight component, **you shouldn't passing too many data or your application** performance will decreased. If possible you should create an object that can be modified from other node rather than re-passing the data one by one. That method will help decrease data passing between port and may improve your application performance.

The performance difference is not very large, and if you think your node is more suitable for having a port that passing many data to other port it's also okay. What I mean with "many data" is not like passing a very large array at once, but it's more like updating the port value more often than usual:

```js
let { Output } = node.ref;

// I don't mean like this, this one still okay and good practice
Output.Data = [x1, x2, x3, ....., x10000];

// But updating data like this may affect the performance as more event will be triggered internally
let temp = [x1, x2, x3, ....., x10000];
for(let i = 0; i < temp.length; i++){
	Output.Data = temp[i];
}
```

Why the performance is slower? when you updated the port value it will also trigger ports event for the port itself, and the node. It may also need to trigger remote event if you're using remote engine. It may not noticeable if the application didn't register any event listener and the application is not large or too complex.

## Connect cable with port
It's more recommended to connect port with a port instead of creating a cable first. But if you have a Cable object obtained from somewhere that haven't been connected, you can also call `port.connectCable(cable)`.

```js
let targetIface = instance.ref['targetIface']; // targetIface is the node ID
let { IInput, IOutput } = targetIface;

IInput['PortName'].connectCable(cableFromSomewhere);
```

Cable that was created from input port must be connected into output port and vice-versa, or it will immediately get deleted/disconnected.

## Disconnect cable
To disconnect a cable, you can call `cable.disconnect()` function. Below is the example if you want to immediately disconnect a cable after being connected into a port:

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