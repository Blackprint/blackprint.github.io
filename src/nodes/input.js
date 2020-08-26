// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
Blackprint.registerInterface('nodes/input', function(iface){
	// Property of this scope
	/* iface == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	// Must be placed on 'options' if we want to export the properties as JSON
	iface.options = {
		// Two way binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Input-Binding
		value:'',

		// Listener for two way binding when value from HTML input element is being received by the framework
		// I'm using this for auto scale the width/height of the textarea
		on$value:function(now){
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
	};

	iface.textChanged = function(ev){
		iface.node.changed(ev.target.value);
	}

	// Add event listener to textarea after element initialized
	iface.init = iface.hotReloaded = function(){
		// Only create if the Blackprint handler need this
		if(iface.node.changed)
			iface.$el('textarea').on('input', iface.textChanged);
	}
});


// == For Standalone Interpreter ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.Interpreter.registerInterface('nodes/input', function(iface, bind){
	var theValue = '...';
	bind({
		options:{
			set value(val){
				theValue = val;

				if(iface.node.changed !== void 0)
					iface.node.changed(val);
			},
			get value(){
				return theValue;
			}
		}
	});
});