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

	// One way binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Input-Binding
	self.log = '...';

	// Listener when log value is being send to HTML input element by the framework
	// I'm using this for auto scale the width/height of the textarea
	self.m2v$log = function(old, now){
		// Scale the input box depend on character length
		var el = self.$el('textarea');

		// Skip if textarea was larger than our auto control
		// I mean, if user have change the size manually
		if(el[0].offsetWidth > 150 || el[0].offsetHeight > 60)
			return;

		if(now.length < 8)
			el.attr('style', '');
		else if(now.length >= 8 && now.length < 14)
			el.attr('style', 'width:'+(10*now.length)+'px');
		else if(now.length >= 14)
			el.attr('style', 'width:140px;height:50px');
	}
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