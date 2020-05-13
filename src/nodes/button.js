sketch.registerElement('button', {
	extend: Blackprint.Trigger,
	template: 'nodes/button.html'
}, function(self, root){
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