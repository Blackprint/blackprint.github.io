// Nodes here registered as 'example' namespace

Blackprint.registerNode('example/math/multiply', function(node, iface){
	iface.title = "Multiply";
	// Let's use default node interface

	// Handle all output port here
	node.outputs = {
		Result: Number,
	};

	// Kind of shortcut
	const Output = node.outputs;

	// Handle all input port here
	const Input = node.inputs = {
		Exec: Blackprint.PortTrigger(function(){
			Output.Result = multiply();
			console.log("Result has been set:", Output.Result);
		}),
		A: Number,
		B: Blackprint.PortValidator(Number, function(val){
			// Executed when inputs.B is being obtained
			// And the output from other node is being assigned
			// as current port value in this node
			console.log(iface.title, '- Port B got input:', val);
			return Number(val);
		}),
	};

	// Your own processing mechanism
	function multiply(){
		console.log('Multiplying', Input.A, 'with', Input.B);
		return Input.A * Input.B;
	}

	// When any output value from other node are updated
	// Let's immediately change current node result
	node.update = function(cable){
		Output.Result = multiply();
	}

	// Event listener can only be registered after handle init
	node.init = function(){
		iface.on('cable.connect', function(port1, port2){
			console.log(`Cable connected from ${port1.iface.title} (${port1.name}) to ${port2.iface.title} (${port2.name})`);
		});
	}

	// If you want to test it or play around from the browser console
	setTimeout(function(){
		if(iface.x === void 0)
			console.log('Node from Interpreter:', iface);
		else
			console.log('Node from Sketch:', iface);
	}, 10);
});

Blackprint.registerNode('example/math/random', function(node, iface){
	iface.title = "Random";
	iface.description = "Number (0-100)";

	// Let's use default node interface

	const Output = node.outputs = {
		Out: Number
	};

	var executed = false;
	node.inputs = {
		'Re-seed': Blackprint.PortTrigger(function(){
			executed = true;
			Output.Out = Math.round(Math.random()*100);
		})
	};

	// When the connected node is requesting for the output value
	node.request = function(port, iface2){
		// Only run once this node never been executed
		// Return false if no value was changed
		if(executed === true)
			return false;

		console.warn('Value request for port:', port.name, "from node:", iface2.title);

		// Let's create the value for him
		node.inputs['Re-seed']();
	}
});

Blackprint.registerNode('example/display/logger', function(node, iface){
	iface.title = "Logger";
	iface.description = 'Print anything into text';

	// Let's use ../nodes/logger.js
	iface.interface = 'nodes/logger';

	const Input = node.inputs = {
		Any: Blackprint.PortArrayOf(null) // Any data type, and can be used for many cable
	};

	function refreshLogger(val){
		if(val === null)
			iface.log = 'null';
		else if(val === void 0)
			iface.log = 'undefined';
		else if(val.constructor === Function)
			iface.log = val.toString();
		else if(val.constructor === String || val.constructor === Number)
			iface.log = val;
		else
			iface.log = JSON.stringify(val);
	}

	node.init = function(){
		// Let's show data after new cable was connected or disconnected
		iface.on('cable.connect cable.disconnect', function(){
			console.log("A cable was changed on Logger, now refresing the input element");
			refreshLogger(Input.Any);
		});

		iface.inputs.Any.on('value', function(port){
			console.log("I connected to", port.name, "port from", port.iface.title, "that have new value:", port.value);

			// Let's take all data from all connected nodes
			// Instead showing new single data-> val
			refreshLogger(Input.Any);
		});
	}
});

Blackprint.registerNode('example/button/simple', function(node, iface){
	// node = under ScarletsFrame element control
	iface.title = "Button";

	// Let's use ../nodes/button.js
	iface.interface = 'nodes/button';

	// handle = under Blackprint node flow control
	const Output = node.outputs = {
		Clicked: Function
	};

	// Proxy event object from: node.clicked -> node.clicked -> outputs.Clicked
	node.clicked = function(ev){
		console.log('button/simple: got', ev, "time to trigger to the other node");
		Output.Clicked(ev);
	}
});

Blackprint.registerNode('example/input/simple', function(node, iface){
	// iface = under ScarletsFrame element control
	iface.title = "Input";

	// Let's use ../nodes/input.js
	iface.interface = 'nodes/input';

	// handle = under Blackprint node flow control
	const Output = node.outputs = {
		Changed: Function,
		Value: String, // Default to empty string
	};

	iface.options = {
		value:'...'
	};

	// Bring value from imported node to handle output
	node.imported = function(options){
		console.warn("Old options:", JSON.stringify(iface.options));
		console.warn("Imported options:", JSON.stringify(options));

		iface.options = options;
		Output.Value = options.value;
	}

	// Proxy string value from: node.changed -> node.changed -> outputs.Value
	// And also call outputs.Changed() if connected to other node
	node.changed = function(text, ev){
		// This node still being imported
		if(iface.importing !== false)
			return;

		console.log('The input box have new value:', text);

		// node.options.value === text;
		Output.Value = iface.options.value;

		// This will call every connected node
		Output.Changed();
	}
});

// Does nothing :3
Blackprint.registerNode('example/dummy/test', function(node, iface){
	iface.title = "Do nothing";

	// PortName must different any port
	node.inputs = {
		"Input 1": Boolean,
		"Input 2": String
	};

	node.outputs = {
		"Output 1": Object,
		"Output 2": Number
	};

	node.properties = {
		"Property 1": Boolean,
		"Property 2": Number
	};
});