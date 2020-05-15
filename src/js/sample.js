var sampleImported = false;

// Sample will be imported when the 'ground' router going to '/page/:pageIndex'
function startImportSample(pageData){
	// console.log("Current router data:", pageData);

	if(sampleImported)
		return;

	sampleImported = true;

	// This could be string instead of object
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
	sketch.createNode('button/simple', {x:580, y:36});
	sketch.createNode('input/simple', {x:846, y:43});
}

// Autoload for Blackprint Interpreter
var interTest = window.interpreter = new Blackprint.Interpreter();

// Wait after ./register-handler.js was executed
setTimeout(function(){
	// These nodes are the handler that registered from ./register-handler.js
	var registered = Blackprint.nodes;

	// We must register the node handler first to the interpreter instance
	interTest.registerNode('math/multiply', registered.math.multiply);
	interTest.registerNode('math/random', registered.math.random);
	interTest.registerNode('display/logger', registered.display.logger);
	interTest.registerNode('button/simple', registered.button.simple);
	interTest.registerNode('input/simple', registered.input.simple);

	interTest.importJSON('{"math/random":[{"id":0,"x":298,"y":73,"outputs":{"Out":[{"id":2,"name":"A"}]}},{"id":1,"x":298,"y":239,"outputs":{"Out":[{"id":2,"name":"B"}]}}],"math/multiply":[{"id":2,"x":525,"y":155,"outputs":{"Result":[{"id":3,"name":"Any"}]}}],"display/logger":[{"id":3,"x":763,"y":169}],"button/simple":[{"id":4,"x":41,"y":59,"outputs":{"Clicked":[{"id":2,"name":"Exec"}]}}],"input/simple":[{"id":5,"x":38,"y":281,"options":{"value":"saved input"},"outputs":{"Changed":[{"id":1,"name":"Re-seed"}],"Value":[{"id":3,"name":"Any"}]}}]}');

	setTimeout(function(){
		console.warn('The interpreter on this console was different from current sketch');
		console.log(`For obtain interpreter node:%c
var node = interpreter.getNodes('button/simple')[0];
var input = interpreter.getNodes('input/simple')[0];
var logger = interpreter.getNodes('display/logger')[0];
`, "color: gray");
		console.log("To click the invisible button: %cnode.clicked()", "color: gray");
		console.log("To set the invisible input: %cinput.options.value = 'hello'", "color: gray");
		console.log("Or send the input to the handle output directly: %cinput.handle.outputs.Value = 'hello'", "color: gray");
		console.log("To get the logger value: %clogger.handle.inputs.Any", "color: gray");
	}, 2000);
}, 10);