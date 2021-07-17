// == For Standalone Engine ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.Engine.registerInterface('nodes/input', function(iface, bind){
	var theValue = '...';
	bind({
		data:{
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