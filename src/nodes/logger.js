// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
sketch.registerInterface('logger', {
	extend: Blackprint.Function,
	template: 'nodes/logger.html'
}, function(self){
	// Property of this scope
	/* self == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	// Input binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Input-Binding
	self.log = '...';
});



// == For Standalone Interpreter ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
interTest.registerInterface('logger', function(self, bind){
	bind({
		set log(val){
			console.log("Logger:", val);
		}
	});
});