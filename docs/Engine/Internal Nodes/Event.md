## Event Node
Event node can be used for listening your custom event in the instance and emitting event. Everytime the event is emitted, all node that listening to the event will also updating. It's also useful if you want to emit external event into your Blackprint instance, you can also listen event from the instance and listen it externally.

Event node should be used as a main entry point of your program. This node is also required if you want to generate native code from your Blackprint instance for the target language.

### Register instance event node using script
The exported instance (.json) may already include information for creating event internally. But it doesn't include information about the data type of the schema, the data type will be set as `Any` for each keys. If sometime it cause a problem, you can also register it with a program before importing the instance (.json).

```js
// 'instance' is Blackprint.Engine or Blackprint.Sketch
instance.events.createEvent('MyApp/MyEvent', {
	schema: {
		// FieldName: DataType
		MyNumber: Number,
	}
});

// instance.importJSON(...)
```

Registering externally may also be useful if you want to create empty instance but with your own prepared custom event data's schema in the instance itself.

For example the code above will create event with namespace `MyApp/MyEvent`. When you create the node to the sketch, you will see a node that have red header. The `schema` fields that you five into `.createEvent(namespace, { schema })` will become the output port of this node.

![electron_wBpqJbRiDx](https://github.com/Blackprint/Blackprint/assets/11073373/311eadf4-c399-493c-a153-d35828141afb)

![electron_dg6C6XnBrp](https://github.com/Blackprint/Blackprint/assets/11073373/628e9ed1-f567-4413-8ea1-85caca12f506)

### Emit to instance event using script
In Blackprint, you can use `Event Emitter` node to emit the event data to the instance. The event data will be forwarded into every event listener of the instance. But you can also emit the event by using script to the instance like below:

```js
// 'instance' is Blackprint.Engine or Blackprint.Sketch
instance.events.emit('MyApp/MyEvent', {
	// FieldName: Value
	MyNumber: 123,
});
```

### Listen to instance event using script
In Blackprint, you can use `Event Listener` node to listen the event data to the instance. If you change the `Limit` port's input you will also need to call `Reset` port to trigger the node to reset, and use `Off` port to deactivate the node's event listener. But you can also listen the event by using script to the instance like below:

```js
// 'instance' is Blackprint.Engine or Blackprint.Sketch
instance.events.listen('MyApp/MyEvent', function(data) {
	console.log("Got MyNumber:", data.MyNumber)
});
```
