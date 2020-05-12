sketch.registerNode('math/multiply', function(handle, node){
	window.handle = handle; // debug test

	node.title = "Multiply";
	var inputs = handle.inputs = {
		A:Number,
		B:function(val){
			console.log('node B got input:', val);
			return Number(val);
		},
		Finishz:Function
	};

	var outputs = handle.outputs = {
		Result:Number,
		Finish:Function,
		Finishz:Function,
		Result:Number,
	};

	handle.init = function(){
		node.on('cable.connect', function(){
			console.log('ahoy');
		});
	}

	// When node being executed
	handle.run = function(){
		console.log('processing', inputs.A, inputs.B);
		outputs.Result = inputs.A * inputs.B;
	}
});

sketch.registerNode('math/random', function(handle, node){
	node.title = "Random";
	node.description = "Number (0-100)";
	node.dynamic = true; // Reexecute when doing loop somewhere

	var outputs = handle.outputs = {
		Out:Number
	};

	// When node being executed
	handle.run = function(){
		console.log('processing', inputs.A, inputs.B);
		outputs.Result = inputs.A * inputs.B;
	}
});

sketch.registerNode('display/logger', function(handle, node){
	node.title = "Logger";
	node.type = 'logger';
	node.description = 'Print anything into text';
	node.trigger = false;
	handle.log = '';

	var inputs = handle.inputs = {
		Any:null
	};

	// When node being executed
	handle.run = function(){
		var value = inputs.Any;

		if(value === null)
			handle.log = 'null';
		else if(value === void 0)
			handle.log = 'undefined';
		else if(value.constructor === Function)
			handle.log = value.toString();
		else if(value.constructor === String || value.constructor === Number)
			handle.log = value;
		else
			handle.log = JSON.stringify(value);
	}
});

sketch.registerNode('button/test', function(handle, node){
	node.title = "Button";
	node.type = 'button';

	var outputs = handle.outputs = {
		Clicked:Object
	};
console.log(handle, node);
	handle.run = function(){
		console.log('hey', arguments);
	}
});

sketch.registerNode('input/test', function(handle, node){
	node.title = "Input";
	node.type = 'input';

	var outputs = handle.outputs = {
		Value:Object
	};

	handle.run = function(){
		console.log('hey', arguments);
	}
});

sketch.registerNode('dummy/test', function(handle, node){
	node.title = "Test 1";

	// PortName must different any port
	var inputs = handle.inputs = {
		"Input 1":Boolean,
		"Input 2":String
	};

	var outputs = handle.outputs = {
		"Output 1":Object,
		"Output 2":Number
	};

	var properties = handle.properties = {
		"Property 1":Boolean,
		"Property 2":Number
	};
});