var sampleImported = false;
var sampleList = {
	"Default sample": {"example/math/random":[{"id":0,"x":298,"y":73,"outputs":{"Out":[{"id":2,"name":"A"}]}},{"id":1,"x":298,"y":239,"outputs":{"Out":[{"id":2,"name":"B"}]}}],"example/math/multiply":[{"id":2,"x":525,"y":155,"outputs":{"Result":[{"id":3,"name":"Any"}]}}],"example/display/logger":[{"id":3,"x":763,"y":169}],"example/button/simple":[{"id":4,"x":41,"y":59,"outputs":{"Clicked":[{"id":2,"name":"Exec"}]}}],"example/input/simple":[{"id":5,"x":38,"y":281,"options":{"value":"saved input"},"outputs":{"Changed":[{"id":1,"name":"Re-seed"}],"Value":[{"id":3,"name":"Any"}]}}]},

};

// Sample will be imported when the 'ground' router going to '/page/:pageIndex'
function startImportSample(pageData){
	// console.log("Current router data:", pageData);

	if(sampleImported)
		return;

	sampleImported = true;

	// This could be string instead of object
	sketch.importJSON(sampleList['Default sample']);
}

// Autoload for Blackprint Interpreter
var interTest = window.interpreter = new Blackprint.Interpreter();

// Wait after ./register-handler.js was executed
setTimeout(function(){
	// Uncomment if we don't need sample
	// return;

	// These nodes are the handler that registered from ./register-handler.js
	var registered = Blackprint.nodes;

	// We must register the node handler first
	Blackprint.Interpreter.registerNode('example/math/multiply', registered.example.math.multiply);
	Blackprint.Interpreter.registerNode('example/math/random', registered.example.math.random);
	Blackprint.Interpreter.registerNode('example/display/logger', registered.example.display.logger);
	Blackprint.Interpreter.registerNode('example/button/simple', registered.example.button.simple);
	Blackprint.Interpreter.registerNode('example/input/simple', registered.example.input.simple);

	interTest.importJSON(sampleList['Default sample']);

	setTimeout(function(){
		console.warn('The interpreter nodes on this console using default sample');
		console.warn('If you want to import your JSON, don\'t forget to .clearNodes() first');
		console.log(`For obtain interpreter node:%c
var node = interpreter.getNodes('example/button/simple')[0];
var input = interpreter.getNodes('example/input/simple')[0];
var logger = interpreter.getNodes('example/display/logger')[0];
`, "color: gray");
		console.log("To click the invisible button: %cnode.clicked()", "color: gray");
		console.log("To set the invisible input: %cinput.options.value = 'hello'", "color: gray");
		console.log("Or send the input to the handle output directly: %cinput.handle.outputs.Value = 'hello'", "color: gray");
		console.log("To get the logger value: %clogger.handle.inputs.Any", "color: gray");
	}, 2000);
}, 10);