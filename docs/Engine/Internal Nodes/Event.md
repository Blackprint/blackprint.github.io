## Event Node
Event node can be used for listening your custom event in the instance and emitting event. Everytime the event is emitted, all node that listening to the event will also updating. It's also useful if you want to emit external event into your Blackprint instance, you can also listen event from the instance and listen it externally.

Event node should be used as a main entry point of your program. This node is also required if you want to generate native code from your Blackprint instance for the target language.

### Register event node externally
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
