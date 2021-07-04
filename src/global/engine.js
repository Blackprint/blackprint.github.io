// New engine instance (separated from the editor) that can be accessed from the console
let engine = new Blackprint.Engine();

console.log("-- Do you want to run a sample for engine-js?");
console.log("-- Call engineTest() from this console");

// Wait after ./register-handler.js was executed
window.engineTest = function(){
	// These nodes are the handler that registered from ./register-handler.js
	var registered = Blackprint.nodes;

	console.log("-- The sketch and the console was imported from same JSON example, but they're imported in different engine. Any modification from the sketch page will not change the imported console nodes.");
	sketch.clearNodes();
	sketch.importJSON(sampleList["Default sample"]);

	// We must register the node handler first
	Blackprint.Engine.registerNode('example/math/multiply', registered.example.math.multiply);
	Blackprint.Engine.registerNode('example/math/random', registered.example.math.random);
	Blackprint.Engine.registerNode('example/display/logger', registered.example.display.logger);
	Blackprint.Engine.registerNode('example/button/simple', registered.example.button.simple);
	Blackprint.Engine.registerNode('example/input/simple', registered.example.input.simple);

	engine.importJSON(sampleList['Default sample']);

	setTimeout(function(){
		console.warn('The engine nodes on this console is using default sample\n> sampleList["Default sample"]');
		console.warn('If you want to import your JSON, don\'t forget to run engine.clearNodes() first');
		console.log(`For obtain engine node:%c
var button = engine.getNodes('example/button/simple')[0];
var input = engine.getNodes('example/input/simple')[0];
var logger = engine.getNodes('example/display/logger')[0];
`, "color: gray");
		console.log("To click on invisible button: %cbutton.clicked()", "color: gray");
		console.log("To set the invisible input: %cinput.options.value = 'hello'", "color: gray");
		console.log("Or send the input to the handle output directly: %cinput.const.Output.Value = 'hello'", "color: gray");
		console.log("To get the logger value: %clogger.const.Input.Any", "color: gray");
	}, 2000);
}