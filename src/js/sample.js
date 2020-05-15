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

	interTest.importJSON('{"math/random":[{"id":0,"x":298,"y":73,"outputs":{"Out":[{"id":2,"name":"A"}]}},{"id":1,"x":298,"y":239,"outputs":{"Out":[{"id":2,"name":"B"}]}}],"math/multiply":[{"id":2,"x":525,"y":155,"outputs":{"Result":[{"id":3,"name":"Any"}]}}],"display/logger":[{"id":3,"x":754,"y":163}],"button/simple":[{"id":4,"x":27,"y":41,"outputs":{"Clicked":[{"id":2,"name":"Exec"}]}}],"input/simple":[{"id":5,"x":36,"y":331,"outputs":{"Changed":[{"id":1,"name":"Re-seed"}],"Value":[{"id":3,"name":"Any"}]}}]}');
}, 10);