// Nodes here registered as 'example' namespace

Blackprint.registerNode('example/math/multiply', function(handle, node){
	node.title = "Multiply";
	// Let's use default node interface

	// Handle all output port here
	handle.outputs = {
		Result:Number,
	};

	// Handle all input port here
	var inputs = handle.inputs = {
		Exec: function(){
			handle.outputs.Result = multiply();
			console.log("Result has been set:", handle.outputs.Result);
		},
		A: Number,
		B: Blackprint.PortValidator(Number, function(val){
			// Executed when inputs.B is being obtained
			// And the output from other node is being assigned
			// as current port value in this node
			console.log(node.title, '- Port B got input:', val);
			return Number(val);
		}),
	};

	// Your own processing mechanism
	function multiply(){
		console.log('Multiplying', inputs.A, 'with', inputs.B);
		return inputs.A * inputs.B;
	}

	// When any output value from other node are updated
	// Let's immediately change current node result
	handle.update = function(cable){
		handle.outputs.Result = multiply();
	}

	// Event listener can only be registered after handle init
	handle.init = function(){
		node.on('cable.connect', function(cable){
			console.log(`Cable connected from ${cable.owner.node.title} (${cable.owner.name}) to ${cable.target.node.title} (${cable.target.name})`);
		});
	}

	// If you want to test it or play around from the browser console
	setTimeout(function(){
		if(node.x === void 0)
			console.log('Node from Interpreter:', node);
		else
			console.log('Node from Sketch:', node);
	}, 10);
});

Blackprint.registerNode('example/math/random', function(handle, node){
	node.title = "Random";
	node.description = "Number (0-100)";

	// Let's use default node interface

	handle.outputs = {
		Out:Number
	};

	var executed = false;
	handle.inputs = {
		'Re-seed':function(){
			executed = true;
			handle.outputs.Out = Math.round(Math.random()*100);
		}
	};

	// When the connected node is requesting for the output value
	handle.request = function(port, node){
		// Only run once this node never been executed
		// Return false if no value was changed
		if(executed === true)
			return false;

		console.warn('Value request for port:', port.name, "from node:", node.title);

		// Let's create the value for him
		handle.inputs['Re-seed']();
	}
});

Blackprint.registerNode('example/display/logger', function(handle, node){
	node.title = "Logger";
	node.description = 'Print anything into text';

	// Let's use ../nodes/logger.js
	node.type = 'logger';

	handle.inputs = {
		Any: Blackprint.PortListener(function(port, val){
			console.log("I connected to", port.name, "port from", port.node.title, "that have new value:", val);

			// Let's take all data from all connected nodes
			// Instead showing new single data-> val
			refreshLogger(handle.inputs.Any);
		})
	};

	function refreshLogger(val){
		if(val === null)
			node.log = 'null';
		else if(val === void 0)
			node.log = 'undefined';
		else if(val.constructor === Function)
			node.log = val.toString();
		else if(val.constructor === String || val.constructor === Number)
			node.log = val;
		else
			node.log = JSON.stringify(val);
	}

	handle.init = function(){
		// Let's show data after new cable was connected or disconnected
		node.on('cable.connect cable.disconnect', function(){
			console.log("A cable was changed on Logger, now refresing the input element");
			refreshLogger(handle.inputs.Any);
		});
	}
});

Blackprint.registerNode('example/button/simple', function(handle, node){
	// node = under ScarletsFrame element control
	node.title = "Button";

	// Let's use ../nodes/button.js
	node.type = 'button';

	// handle = under Blackprint node flow control
	handle.outputs = {
		Clicked:Function
	};

	// Proxy event object from: node.clicked -> handle.clicked -> outputs.Clicked
	handle.clicked = function(ev){
		console.log('button/simple: got', ev, "time to trigger to the other node");
		handle.outputs.Clicked(ev);
	}
});

Blackprint.registerNode('example/input/simple', function(handle, node){
	// node = under ScarletsFrame element control
	node.title = "Input";

	// Let's use ../nodes/input.js
	node.type = 'input';

	// handle = under Blackprint node flow control
	handle.outputs = {
		Changed:Function,
		Value:'', // Default to empty string
	};

	// Bring value from imported node to handle output
	handle.imported = function(){
		if(node.options.value)
			console.warn("Saved options as outputs:", node.options.value);

		handle.outputs.Value = node.options.value;
	}

	// Proxy string value from: node.changed -> handle.changed -> outputs.Value
	// And also call outputs.Changed() if connected to other node
	handle.changed = function(text, ev){
		// This node still being imported
		if(node.importing !== false)
			return;

		console.log('The input box have new value:', text);

		// node.options.value === text;
		handle.outputs.Value = node.options.value;

		// This will call every connected node
		handle.outputs.Changed();
	}
});

// Does nothing :3
Blackprint.registerNode('example/dummy/test', function(handle, node){
	node.title = "Do nothing";

	// PortName must different any port
	handle.inputs = {
		"Input 1":Boolean,
		"Input 2":String
	};

	handle.outputs = {
		"Output 1":Object,
		"Output 2":Number
	};

	handle.properties = {
		"Property 1":Boolean,
		"Property 2":Number
	};
});