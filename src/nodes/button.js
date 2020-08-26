// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
Blackprint.registerInterface('nodes/button', function(iface){
	// Property of this scope
	/* iface == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	// To get the button element
	// iface.$el('.button')

	// iface.$el only available after component was initialized
	// iface.init = function(){ ... }

	// Element event binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Element-Event
	iface.clicked = function(ev){
		console.log("Element: 'Trigger' button clicked, going to run the handler");
		iface.node.clicked && iface.node.clicked(ev);
	}
});



// == For Standalone Interpreter ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.Interpreter.registerInterface('nodes/button', function(iface){
	iface.clicked = function(ev){
		console.log("Interpreter: 'Trigger' button clicked, going to run the handler");
		iface.node.clicked && iface.node.clicked(ev);
	}
});