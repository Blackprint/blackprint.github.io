sketch.registerElement('input', {
	extend: Blackprint.Input,
	template: 'nodes/input.html'
}, function(self, root){
	// Property of this scope
	/* self == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	self.log = '';
});