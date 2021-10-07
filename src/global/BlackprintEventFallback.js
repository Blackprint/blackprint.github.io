// Please use sketch.on('...', callback) instead
// This is used if no one listened to the event
var BlackprintEventFallback = {
	error(error){
		BlackprintEventFallback.error.types[error.type](error.data || error);
	},
	cable_wrong_pair({ port, cable }){
		SmallNotif.add(`The cable is not suitable (${cable.source}, ${port.source})`, 'yellow');
	},
	cable_wrong_type({ cable, iface, source, target }){
		SmallNotif.add(iface.title+"> Port from '"+source.iface.title + " - " + source.name+"' was not an "+(target.type._name || target.type.name), 'yellow');
	},
	cable_wrong_type_pair({ cable, target }){
		SmallNotif.add(`The cable type is not suitable (${cable.owner.type.name}, ${target.type.name})`, 'yellow');
	},
	cable_duplicate_removed({ cable, target }){
		SmallNotif.add("Duplicated cable removed", 'yellow');
	},
	cable_replaced({ cable, target }){
		SmallNotif.add("Cable was replaced because input doesn't support array", 'yellow');
	}
};

BlackprintEventFallback.error.types = {
	node_port_not_found({ node, portName }){
		SmallNotif.add(`Node port not found for ${node.iface.title} with name: ${portName}`, 'red');
	},
	node_not_found({ namespace }){
		SmallNotif.add(`Node for ${namespace} was not found, maybe .registerNode() haven't being called?`, 'red')
	},
	node_delete_not_found({ iface }){
		SmallNotif.add("Node was not found on the list", 'red');
		console.error("Node was not found on the list", iface);
	},
	node_template_not_found({ tagName, element }){
		SmallNotif.add(`It seems '${tagName}' HTML haven't been registered as component or can't be loaded`, 'red');
		console.error("It seems '"+tagName+"' HTML haven't been registered as component or can't be loaded", element);
	},
};

window.addEventListener('error', function(e){
	SmallNotif.add("Something went wrong..");
});