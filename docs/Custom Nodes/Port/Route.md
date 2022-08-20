## Routing nodes
By using route port you can prioritize or disable data flow from the connected cable. From the picture below, the data flow will only go through **Log** node on the top, while the bottom **Log** node will not get any data flow update.
![0HKtI1Ekkp](https://user-images.githubusercontent.com/11073373/185189185-8296db5e-3b51-44d2-ae5b-7a29c1eba601.png)

It may not work if the data is updated not from inside of `update(){...}` function, for the example the **Input** node is actually listening the `<input>` box (HTML element) and directly assign value to **Value** port, because of that it will need to manually trigger `node.routes.routeOut()`. Below is an video example where the **Input** node is properly called the `routeOut` after modifying the **Value** port:

<video src="https://user-images.githubusercontent.com/11073373/185191401-808e6df2-971f-40dd-b510-000ed859ee02.mp4" controls></video>

> A node can only have one `route out` on the right edge port (orange), and it can have multiple `route in` on the left

The route cable (orange dashed line) is used for controlling the data flow. By default any connected port will get updated every time the output port have a new value. But if the route cable was created (even not connected) and if some node already being connected with the output port but there are no route cable connected then the node will be inactive and turned into grey node. The grey node will not trigger it's `update()` function when there are any data update coming from the other output port as the data flow that trigger `update()` function will only be called depends on the connected route cable.

There are some condition that may make the unrouted node can still get updated:
- The input node is using event listener that listening new value update from other output port
- The node is self-update like using `setInterval` to obtain value from input node