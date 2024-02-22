## Left side panel
On the left side panel you can find list of Variables, Function, and Node. These list can be drag and dropped into the container to create a new nodes. From this editor you can easily create variable and function node by using `+` button, this editor also allows you to create a custom node by using a code editor. But if you're looking for how import nodes/modules for this editor, please go to **Editor -> Tutorial** instead.

For more information about the panel, please go to the menu:
1. Variables **(Engine -> Internal Nodes -> Variables)**
2. Functions **(Engine -> Internal Nodes -> Functions)**
3. Events **(Engine -> Internal Nodes -> Events)**
4. Groups **(See below -> Groups)**
5. Nodes **(Custom Nodes)**

## Groups
This section will be updated everytime you add/modify a group node in the instance. The group node can be manually created by adding `Decoration/Group/Default` node in the instance, or drag + right click to open the region menu for creating a group node like below:

![electron_HQCQ6SUHmu](https://github.com/Blackprint/Blackprint/assets/11073373/3a30591a-d443-40a1-93e5-db3efc86a003)

After that you will see the updated panel like below:

![electron_DL4qXpvV9X](https://github.com/Blackprint/Blackprint/assets/11073373/c458f5b3-d5bb-4194-96f3-71584c28fd13)

The list item will become yellow if it's currently visible in your current viewport, and it will become normal when it was not visible anymore. If you want to immediately move to that group, you can just easily click the list.

![electron_4QNoPD4o0v](https://github.com/Blackprint/Blackprint/assets/11073373/9d2badd5-983e-44d5-a55e-ca74c9b54fb5)

This group list will be automatically sorted, you can use numbered title when naming your groups to sort them up.

## Right side panel
This panel is used for changing or adding an internal node data. You can also add ID or comments for your node and it can be exported as JSON. Registering a custom panel for your nodes is also possible when using Blackprint Sketch:

The component name **MUST** be started with `bppc-` and followed by node's namespace in lowercase letters
`Blackprint.registerNode('Decoration/Group/Default', class Blackprint.Node { ... })`

```js
// We will add panel component for 'Decoration/Group/Default' node
Blackprint.space.component('bppc-decoration-group-default', {
	html: `...put the html here...`
},
class extends sf.Model {
	constructor(scope, iface){
		super(scope, iface);

		// Copy the iface, in case you need to access the node
		this.iface = iface;

		// Copy the data by reference to current component context
		// to allow ScarletsFrame to bind to this data and create reactivity
		this.data = iface.data;
	}
});
```

Below is example HTML that you can use as a template for the panel, the element name must be started with `bppc-`:
```html
<bppc-decoration-group-default>
	<div class="field title">
		<span class="name">Title:</span>
		<span class="help"><i class="fas fa-question-circle"></i></span>
		<textarea sf-bind="data.title" placeholder="Add title here..."></textarea>
	</div>
	<div class="field text-content">
		<span class="name">Text Content:</span>
		<textarea sf-bind="data.textContent" placeholder="Add text content here..."></textarea>
	</div>
	<div class="field color-pick-1">
		<span class="name">Background Color:</span>
		<input sf-bind="data.color" placeholder="#b8b8ff">
	</div>
	<div class="field color-pick-2">
		<span class="name">Font Color:</span>
		<input sf-bind="data.fontColor" placeholder="black">
	</div>
</bppc-decoration-group-default>
```

After that, you can click the node and see the injected panel on the right side menu like:

![Mo6pxVrMYS](https://github.com/Blackprint/Blackprint/assets/11073373/db2e6f43-120c-4510-af02-e9b17199e3da)

You can also see the implementation of [default group node](https://github.com/Blackprint/nodes/tree/master/nodes/Decoration/Group) to make this right side panel.