## Left side panel
On the left side panel you can find list of Variables, Function, and Node. These list can be drag and dropped into the container to create a new nodes. From this editor you can easily create variable and function node by using `+` button, this editor also allows you to create a custom node by using a code editor. But if you're looking for how import nodes/modules for this editor, please go to **Editor -> Tutorial** instead.

For more information about the panel, please go to the menu:
1. Variables **(Engine -> Internal Nodes -> Variables)**
2. Functions **(Engine -> Internal Nodes -> Functions)**
3. Events **(Engine -> Internal Nodes -> Events)**
4. Nodes **(Custom Nodes)**

## Right side panel
This panel is used for changing or adding an internal node data. You can also add ID or comments for your node and it can be exported as JSON. Registering a custom panel for your nodes is also possible when using Blackprint Sketch:

The component name must be started with `bppc-` and followed by node's namespace in lowercase letters
`Blackprint.registerNode('Decoration/Group/Default', class Blackprint.Node { ... })`

```js
// We will add panel component for 'Decoration/Group/Default' node
Blackprint.space.component('bppc-decoration-group-default', {
	html: `...put the html here...`
},
class extends sf.Model {
	constructor(scope, iface){
		super(scope, iface);

		this.iface = iface;
		this.data = iface.data;
	}

	get title(){ return this.data.title }
	set title(val){ this.data.title = val }

	get color(){ return this.data.color }
	set color(val){ this.data.color = val }
});
```

Below is example HTML that you can use as a template for the panel, the element name must be started with `bppc-`:
```html
<bppc-decoration-group-default>
	<div class="field">
		<span class="name">Title:</span>
		<textarea sf-bind="title" placeholder="Add title here..."></textarea>
	</div>
	<div class="field">
		<span class="name">Color:</span>
		<input sf-bind="color" placeholder="#b8b8ffe1">
	</div>
</bppc-decoration-group-default>
```