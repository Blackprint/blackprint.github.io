## Variable Node
Variable node can be used for storing output value from a node. Everytime this node set new value, every node that stands as a getter node will update their value. Sometime you may also don't want one of the getter node is triggering some nodes connected to it, to fix it you need to create a output route cable that doesn't not connected to any node for the getter node.

### Register variable node externally
The exported instance (.json) may already include information for creating variable internally. But it doesn't include information about the data type, so the data will be set after it's initialized. If sometime it cause a problem, you can also register it with a program before importing the instance (.json).

```js
// 'instance' is Blackprint.Engine or Blackprint.Sketch
let myVar = instance.createVariable('MyApp/MyNumber');
myVar.type = Number;
myVar.value = 12345;

// instance.importJSON(...)
```

Registering externally may also be useful if you want to create empty instance but with your own prepared custom variable in the instance itself.