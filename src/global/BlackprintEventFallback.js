// Please use sketch.on('...', callback) instead
// This is used if no one listened to the event
var BlackprintEventFallback = {
	error(error){
		BlackprintEventFallback.error.types[error.type](error.data || error);
	},
	'cable.wrong_pair'({ port, cable }){
		SmallNotif.add(`The cable is not suitable (${cable.source}, ${port.source})`, 'yellow');
	},
	'cable.wrong_type'({ cable, iface, port, target }){
		SmallNotif.add(iface.title+"> Port from '"+port.iface.title + " - " + port.name+"' was not an "+(target.type._name || target.type.name), 'yellow');
	},
	'cable.wrong_type_pair'({ cable, port, target }){
		SmallNotif.add(`The cable type is not suitable (${target.type.name}, ${port.type.name})`, 'yellow');
	},
	'cable.duplicate_removed'({ cable, port }){
		SmallNotif.add("Duplicated cable removed", 'yellow');
	},
	'cable.replaced'({ cable, port }){
		SmallNotif.add("Cable was replaced because input doesn't support array", 'yellow');
	}
};

BlackprintEventFallback.error.types = {
	node_port_not_found({ iface, portName }){
		SmallNotif.add(`Node port not found for ${iface.title} with name: ${portName}`, 'red');
	},
	node_not_found({ namespace }){
		SmallNotif.add(`Node for ${namespace} was not found, maybe .registerNode() haven't being called?`, 'red')
	},
	node_delete_not_found({ iface }){
		SmallNotif.add("Node was not found on the list", 'red');
		console.error("Node was not found on the list", iface);
	},
	node_template_not_found({ tagName, element }){
		SmallNotif.add(`It seems '${tagName}' HTML haven't been registered as component or can't be loaded.`, 'red');
		console.error("It seems '"+tagName+"' HTML haven't been registered as component or can't be loaded. Please double check the interface file path or name, the interface path name and the file name is case sensitive.", element);
	},
};

window.addEventListener('error', function(e){
	let message = e.message || "Something went wrong..";
	message = message.replace('Uncaught ', '');

	SmallNotif.add(message, 'red');
	console.error(e);
});

window.addEventListener('onunhandledrejection', function(e){
	let message = e.message || "Something went wrong..";
	message = message.replace('Uncaught ', '');

	SmallNotif.add(message, 'red');
	console.error(e);
});