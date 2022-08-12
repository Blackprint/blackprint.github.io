Blackprint is using ScarletsFrame to help control the element templating system and two-way data binding.

## Import Blackprint nodes
If you have exported Blackprint into JSON, then you can easily import it like below:
```js
// After imported it will automatically appended into the DOM container
var nodes = sketch.importJSON('{...}');
// nodes = [iface, iface, ...]
```

## Create single Blackprint node
To create new node and put it on the DOM you can call
```js
sketch.createNode(namespace, options);
```

Namespace is the registered node handler from sketch.registerNode.
 Options is a value for the registered node element from sketch.registerInterface.

```js
// Create the node to the view
var iface = sketch.createNode('Math/Multiply', {x:20, y:20});
// iface.node == the node handler
```

## Get created node list
Blackprint does expose model and components through sketch.scope('modelName').
```js
var nodeList = sketch.scope('nodes').list;
var connectionList = sketch.scope('cables').list;
```

## Blackprint options
Currently the available options still limited

```js
sketch.settings(name, value);
```

## Export Blackprint nodes
The nodes can be exported as JSON, but it's like the node namespace, position, value, and the connections.
```js
var str = sketch.exportJSON();
// {"math/multiply":[...], ...}
```