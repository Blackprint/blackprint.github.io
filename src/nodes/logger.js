sketch.registerElement('logger', {
	extend: Blackprint.Function,
	template: 'nodes/logger.html'
}, function(self, root){
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