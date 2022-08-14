Blackprint Sketch is using ScarletsFrame for the HTML templating system.

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

## Get created node and cable list
Blackprint does expose model and components through sketch.scope('modelName'). Below is reactive list, so if you remove or modify the array it will also modify the sketch container. It's **not recommended** to modify the list directly.
```js
var ifaceList = sketch.scope('nodes').list;
var cableList = sketch.scope('cables').list;
```

## Export Blackprint nodes
The nodes can be exported as JSON, but it's like the node namespace, position, value, and the connections.
```js
var str = sketch.exportJSON();
// {"math/multiply":[...], ...}
```