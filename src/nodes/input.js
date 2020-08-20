// == Blackprint Visual Interpreter ==
// You're allowed tp control related DOM element here
Blackprint.registerInterface('nodes/input', function(self){
	// Property of this scope
	/* self == {
		x: 0,
		y: 0,
		inputs: [],
		outputs: [],
		properties: [],
	} */

	// Must be placed on 'options' if we want to export the properties as JSON
	self.options = {
		// Two way binding-> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Input-Binding
		value:'',

		// Listener for two way binding when value from HTML input element is being received by the framework
		// I'm using this for auto scale the width/height of the textarea
		on$value:function(old, now){
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
	};

	self.textChanged = function(ev){
		self.handle.changed(ev.target.value);
	}

	// Add event listener to textarea after element initialized
	self.init = self.hotReloaded = function(){
		// Only create if the Blackprint handler need this
		if(self.handle.changed)
			self.$el('textarea').on('input', self.textChanged);
	}
});


// == For Standalone Interpreter ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.Interpreter.registerInterface('nodes/input', function(self, bind){
	var theValue = '...';
	bind({
		options:{
			set value(val){
				theValue = val;

				if(self.handle.changed !== void 0)
					self.handle.changed(val);
			},
			get value(){
				return theValue;
			}
		}
	});
});