## Reserved handler property
node here is the Blackprint flow handler from the example above.

|Property|Description|
|---|---|
|inputs|An array of input port registration|
|outputs|An array of output port registration|
|properties|An array of node property registration Still draft feature|
|importing|A boolean indicating if this node is being imported/created|

## Below are reserved property that filled with function/callback
|Property|Arguments|Description|
|---|---|---|
|init|()|Callback function to be run after current handle and all node was initialized|
|request|(targetPort, sourceNode)|Callback when other node's input port are requesting current node's output value|
|update|(Cable)|Callback when current input value are updated from the other node's output port|
|imported|(options)|This is a callback after node was created, imported options should be handled here|