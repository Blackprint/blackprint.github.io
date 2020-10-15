var sampleList = window.sampleList = {
	"Default sample": {"example/math/random":[{"id":0,"x":298,"y":73,"outputs":{"Out":[{"id":2,"name":"A"}]}},{"id":1,"x":298,"y":239,"outputs":{"Out":[{"id":2,"name":"B"}]}}],"example/math/multiply":[{"id":2,"x":525,"y":155,"outputs":{"Result":[{"id":3,"name":"Any"}]}}],"example/display/logger":[{"id":3,"x":763,"y":169}],"example/button/simple":[{"id":4,"x":41,"y":59,"outputs":{"Clicked":[{"id":2,"name":"Exec"}]}}],"example/input/simple":[{"id":5,"x":38,"y":281,"options":{"value":"saved input"},"outputs":{"Changed":[{"id":1,"name":"Re-seed"}],"Value":[{"id":3,"name":"Any"}]}}]},
};

// Autoload for Blackprint Interpreter
var interTest = window.interpreter = new Blackprint.Interpreter();

console.log("-- Do you want to run a sample for interpreter-js?");
console.log("-- Call interpreterTest() from this console");

// Wait after ./register-handler.js was executed
window.interpreterTest = function(){
	// These nodes are the handler that registered from ./register-handler.js
	var registered = Blackprint.nodes;

	console.log("-- The sketch and the console was imported from same JSON example, but they're imported in different interpreter. Any modification from the sketch page will not change the imported console nodes.");
	sketch.clearNodes();
	sketch.importJSON(sampleList["Default sample"]);

	// We must register the node handler first
	Blackprint.Interpreter.registerNode('example/math/multiply', registered.example.math.multiply);
	Blackprint.Interpreter.registerNode('example/math/random', registered.example.math.random);
	Blackprint.Interpreter.registerNode('example/display/logger', registered.example.display.logger);
	Blackprint.Interpreter.registerNode('example/button/simple', registered.example.button.simple);
	Blackprint.Interpreter.registerNode('example/input/simple', registered.example.input.simple);

	interTest.importJSON(sampleList['Default sample']);

	setTimeout(function(){
		console.warn('The interpreter nodes on this console is using default sample\n> sampleList["Default sample"]');
		console.warn('If you want to import your JSON, don\'t forget to run interpreter.clearNodes() first');
		console.log(`For obtain interpreter node:%c
var button = interpreter.getNodes('example/button/simple')[0];
var input = interpreter.getNodes('example/input/simple')[0];
var logger = interpreter.getNodes('example/display/logger')[0];
`, "color: gray");
		console.log("To click on invisible button: %cbutton.clicked()", "color: gray");
		console.log("To set the invisible input: %cinput.options.value = 'hello'", "color: gray");
		console.log("Or send the input to the handle output directly: %cinput.const.Output.Value = 'hello'", "color: gray");
		console.log("To get the logger value: %clogger.const.Input.Any", "color: gray");
	}, 2000);
}