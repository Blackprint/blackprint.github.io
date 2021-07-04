// Node here will use 'default' node interface
// and only being used as an example, this may get removed

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
		if(iface.x === undefined)
			console.log('Node from Engine:', iface);
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