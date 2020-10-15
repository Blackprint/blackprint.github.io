// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
Blackprint.registerInterface('nodes/logger', function(iface){
	// Property of this scope
	/* iface == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	// One way binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Input-Binding
	iface.log = '...';

	// Listener when log value is being send to HTML input element by the framework
	// I'm using this for auto scale the width/height of the textarea
	iface.m2v$log = function(now){
		// Scale the input box depend on character length
		var el = iface.$el('textarea');

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
Blackprint.Interpreter.registerInterface('nodes/logger', function(iface, bind){
	var log = '...';
	bind({
		get log(){
			return log;
		},
		set log(val){
			log = val;
			console.log("Logger:", val);
		}
	});
});