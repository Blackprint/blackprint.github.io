// New engine instance (separated from the editor) that can be accessed from the console
let engine = new Blackprint.Engine();

console.log("-- Do you want to run a sample for engine-js?");
console.log("-- Call engineTest() from this console");

// Wait after ./register-handler.js was executed
window.engineTest = async function(){
	await sf.loader.task; // Wait until every script has been loaded

	if(!window.confirm("This action will clear current workspace, are you sure to continue?"))
		return;

	// These nodes are the handler that registered from ./register-handler.js
	var registered = Blackprint.nodes;

	console.log("-- The sketch and the console was imported from same JSON example, but they're imported in different engine. Any modification from the sketch page will not change the imported console nodes.");

	await views.goto('/sketch/1');

	// Clear and import JSON
	SketchList.forEach(sketch => sketch.clearNodes());
	SketchList[0].importJSON(sampleList["Default sample"]);

	await engine.importJSON(sampleList['Default sample']);

	console.warn('The engine nodes on this console is using default sample\n> sampleList["Default sample"]');
	console.warn('If you want to import your JSON, don\'t forget to run engine.clearNodes() first');
	console.log(`For obtain engine node:%c
var button = engine.getNodes('Example/Button/Simple')[0];
var input = engine.getNodes('Example/Input/Simple')[0];
var logger = engine.getNodes('Example/Display/Logger')[0];
`, "color: gray");
	console.log("To click on invisible button: %cbutton.clicked()", "color: gray");
	console.log("To set the invisible input: %cinput.data.value = 'hello'", "color: gray");
	console.log("Or send the input to the handle output directly: %cinput.const.Output.Value = 'hello'", "color: gray");
	console.log("To get the logger value: %clogger.const.Input.Any", "color: gray");
}