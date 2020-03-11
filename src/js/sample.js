$(function(){
	var sketch = window.sketch = new Blackprint();

	sketch.registerHandler('math/multiply', function(handle, node){
		window.handle = handle; // debug test

		node.title = "Multiply";
		var inputs = handle.inputs = {
			A:Number,
			B:function(val){
				console.log('node B got input:', val);
				return Number(val);
			}
		};

		var outputs = handle.outputs = {
			Result:Number
		};

		// When node being executed
		node.run = function(){
			console.log('processing', inputs.A, inputs.B);
			outputs.Result = inputs.A * inputs.B;
		}
	});

	sketch.registerHandler('math/random', function(handle, node){
		node.title = "Random";
		node.description = "Number (0-100)";
		node.dynamic = true; // Reexecute when doing loop somewhere

		var outputs = handle.outputs = {
			Out:Number
		};

		// When node being executed
		node.run = function(){
			console.log('processing', inputs.A, inputs.B);
			outputs.Result = inputs.A * inputs.B;
		}
	});

	sketch.registerHandler('display/logger', function(handle, node){
		node.title = "Logger";
		node.type = 'logger';
		node.description = 'Print anything into text';
		handle.log = '';

		var inputs = handle.inputs = {
			Any:null
		};

		// When node being executed
		node.run = function(){
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

	sketch.registerHandler('button/test', function(handle, node){
		node.title = "Button";
		node.type = 'button';

		var outputs = handle.outputs = {
			Clicked:Object
		};

		self.run = function(){
			console.log('hey', arguments);
		}
	});

	sketch.registerHandler('input/test', function(handle, node){
		node.title = "Input";
		node.type = 'input';

		var outputs = handle.outputs = {
			Value:Object
		};

		self.run = function(){
			console.log('hey', arguments);
		}
	});

	sketch.registerHandler('dummy/test', function(handle, node){
		node.title = "Test 1";

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

	$(function(){
		setTimeout(function(){
			sketch.importJSON({
				version:'0.0.1',
				'math/random':[{
					id:0, x:298, y:73, outputs:{
						Out:[{
							id:2, name:'A'
						}]
					}
				}, {
					id:1, x:298, y:239, outputs:{
						Out:[{
							id:2, name:'B'
						}]
					}
				}],
				'math/multiply':[{
					id:2, x:525, y:155, outputs:{
						Result:[{
							id:3, name:'Any'
						}]
					}
				}],
				'display/logger':[{
					id:3, x:754, y:163
				}],
			});

			// sketch.createNode('dummy/test', {x:252, y:103});
			// sketch.createNode('math/random', {x:298, y:73});
			// sketch.createNode('math/random', {x:297, y:239});
			// sketch.createNode('math/multiply', {x:525, y:155});
			sketch.createNode('button/test', {x:580, y:36});
			sketch.createNode('input/test', {x:846, y:43});
		}, 500);
	});
});