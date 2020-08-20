// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
Blackprint.registerInterface('nodes/button', function(self){
	// Property of this scope
	/* self == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	// To get the button element
	// self.$el('.button')

	// self.$el only available after component was initialized
	// self.init = function(){ ... }

	// Element event binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Element-Event
	self.clicked = function(ev){
		console.log("Element: 'Trigger' button clicked, going to run the handler");
		self.handle.clicked && self.handle.clicked(ev);
	}
});



// == For Standalone Interpreter ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.Interpreter.registerInterface('nodes/button', function(self){
	self.clicked = function(ev){
		console.log("Interpreter: 'Trigger' button clicked, going to run the handler");
		self.handle.clicked && self.handle.clicked(ev);
	}
});