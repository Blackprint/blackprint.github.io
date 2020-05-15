// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
sketch.registerInterface('input', {
	extend: Blackprint.Input,
	template: 'nodes/input.html'
}, function(self){
	// Property of this scope
	/* self == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	self.log = '';

	self.textChanged = function(ev){
		self.handle.changed(ev.target.value);
	}

	// Add event listener to textarea after element initialized
	self.init = function(){
		// Only create if the Blackprint handler need this
		if(self.handle.changed)
			self.$el('textarea').on('input', self.textChanged);
	}
});



// == For Standalone Interpreter ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
interTest.registerInterface('input', function(self, bind){
	var theLog = '...';
	bind({
		set log(val){
			theLog = val;
		},
		get log(){
			return theLog;
		}
	});

	self.textChanged = function(text){
		self.handle.changed(text);
	}
});