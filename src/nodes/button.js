// == For Standalone Engine ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.Engine.registerInterface('nodes/button', function(iface){
	iface.clicked = function(ev){
		console.log("Engine: 'Trigger' button clicked, going to run the handler");
		iface.node.clicked && iface.node.clicked(ev);
	}
});