## Frontend Integration
React didn't seems to have two-way data binding feature that compatible with Blackprint Engine. You will need to manually change the port value and listen for it's event, and also refresh React's state.

## Example
<center>

Image below is the visualization for the JSON on Blackprint Sketch.
![Y3Lf93U14X](https://user-images.githubusercontent.com/11073373/184805845-ba6b13b4-fbc0-474c-b894-b6bcb40671e9.png)

</center>

<iframe height="300" style="width: 100%;" scrolling="no" title="Blackprint Engine + React" src="https://codepen.io/stefansarya/embed/abYQZeJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/stefansarya/pen/abYQZeJ">
  Untitled</a> by StefansArya (<a href="https://codepen.io/stefansarya">@stefansarya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Below is the JavaScript for the example above
```jsx
// Only allow module from cdn.jsdelivr.net (Change this into array if needed)
Blackprint.allowModuleOrigin('cdn.jsdelivr.net');

// You can copy paste this to Blackprint Editor
let json_text = `{"instance":{"Console/Log":[{"i":0,"x":556,"y":109,"z":0,"id":"logger"}],"Input/UI/SliderBox":[{"i":1,"x":86,"y":154,"z":1,"id":"slider1","data":{"0":{"value":2,"min":-100,"max":100,"step":0.1}},"output":{"0":[{"i":2,"name":"A"}]}},{"i":4,"x":86,"y":193,"z":2,"id":"slider2","data":{"0":{"value":2,"min":-100,"max":100,"step":0.1}},"output":{"0":[{"i":2,"name":"B"}]}}],"Example/Math/Multiply":[{"i":2,"x":326,"y":90,"z":3,"id":"multiply","output":{"Result":[{"i":0,"name":"Any"}]}}],"Example/Button/Simple":[{"i":3,"x":49,"y":55,"z":4,"output":{"Clicked":[{"i":2,"name":"Exec"}]}}]},"moduleJS":["https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-console.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-input.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-example.mjs"]}`;

// Initialize our component first
class MyReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    // Bring the nodes reference to our component scope
    let nodes = this.nodes = props.instance.ref;

    // Calling port => Multiply.Exec for activation
    nodes['multiply'].Input.Exec();

	// Listen to React's input element's change event
    this.onSlider1 = (ev) => nodes['slider1'].Output[0] = +ev.target.value;
    this.onSlider2 = (ev) => nodes['slider2'].Output[0] = +ev.target.value;
    
    let onResultChange = ()=> this.setState({});
    
    // Refresh React's state everytime port value
    // from Multiply.Result port was updated
    nodes['multiply'].IOutput.Result.on('value', onResultChange);
  }

  render() {
    return (
      <div>
        The first slider => Port "0":<br/>
        <input value={this.nodes['slider1'].Output[0]} onChange={this.onSlider1} type="number"/>

        The second slider => Port "0":<br/>
        <input value={this.nodes['slider2'].Output[0]} onChange={this.onSlider2} type="number"/>

        Node "Multiply" => Port "Result":<br/>
        <span>{this.nodes['multiply'].Output.Result}</span>
      </div>
    );
  }
}

// Create new engine instance
var instance = new Blackprint.Engine();

// ===== Load from JSON =====
// Import nodes from URL and wait until imported
instance.importJSON(json_text).then(function(){
  // Put the React element into container after the JSON was imported
  let container = document.getElementById('container');
  let root = ReactDOM.createRoot(container);

  root.render(<MyReact instance={instance}/>);
});
```