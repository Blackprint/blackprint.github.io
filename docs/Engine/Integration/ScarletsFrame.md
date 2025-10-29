## Frontend Integration
With ScarletsFrame you can easily bind the ports with your views/template.


## Example
<center>

Image below is the visualization for the JSON on Blackprint Sketch.
![Y3Lf93U14X](https://user-images.githubusercontent.com/11073373/184805845-ba6b13b4-fbc0-474c-b894-b6bcb40671e9.png)

</center>

<iframe height="300" style="width: 100%;" scrolling="no" title="Blackprint Engine + ScarletsFrame" src="https://codepen.io/stefansarya/embed/YzaRGEJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/stefansarya/pen/YzaRGEJ">
  Blackprint Engine + ScarletsFrame</a> by StefansArya (<a href="https://codepen.io/stefansarya">@stefansarya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Below is the JavaScript for the example above
```js
// Only allow module from cdn.jsdelivr.net
Blackprint.allowModuleOrigin('cdn.jsdelivr.net');

// You can copy paste this to Blackprint Editor
let json_text = `{"instance":{"Console/Log":[{"i":0,"x":556,"y":109,"z":0,"id":"logger"}],"Input/UI/SliderBox":[{"i":1,"x":86,"y":154,"z":1,"id":"slider1","data":{"0":{"value":2,"min":-100,"max":100,"step":0.1}},"output":{"0":[{"i":2,"name":"A"}]}},{"i":4,"x":86,"y":193,"z":2,"id":"slider2","data":{"0":{"value":2,"min":-100,"max":100,"step":0.1}},"output":{"0":[{"i":2,"name":"B"}]}}],"Example/Math/Multiply":[{"i":2,"x":326,"y":90,"z":3,"id":"multiply","output":{"Result":[{"i":0,"name":"Any"}]}}],"Example/Button/Simple":[{"i":3,"x":49,"y":55,"z":4,"output":{"Clicked":[{"i":2,"name":"Exec"}]}}]},"moduleJS":["https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.9/dist/nodes-console.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.9/dist/nodes-input.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.9/dist/nodes-example.mjs"]}`;

// Create new engine instance
var instance = new Blackprint.Engine();

// ===== Load from JSON =====
// Import nodes from URL and wait until imported
instance.importJSON(json_text).then(function(){
  // We need to import the JSON first before obtaining the node's ports
  sf.component('my-component', function(My){
    // Bring the nodes references to component scope
    My.nodes = instance.ref;

    // Calling port => Multiply.Exec for activation
    My.nodes['multiply'].Input.Exec();
  });
});
```

In the HTML template, you can obtain the port's value with `NodeID.Output.PortName`. Because the slider is using number as its port name, we can obtain it using `NodeID.Output[0]`. You can also call or obtain from `Input` port, but you can't change it's value directly. In that case, you may need to create a `Public Variable` or using `new Blackprint.OutputPort()`.
```html
<my-component>
	The first slider => Port "0":<br>
	<input sf-bind="nodes['slider1'].Output[0]" type="number">

	The second slider => Port "0":<br>
	<input sf-bind="nodes['slider2'].Output[0]" type="number">

	Node "Multiply" => Port "Result":<br>
	<span id="hello">
		{{ nodes['multiply'].Output.Result }}
	</span>
</my-component>
```