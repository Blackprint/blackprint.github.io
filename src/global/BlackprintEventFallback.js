// Please use sketch.on('...', callback) instead
// This is used if no one listened to the event
var BlackprintEventFallback = {
	error(error){
		BlackprintEventFallback.error.types[error.type](error.data || error);
	},
	'cable.rule.disallowed'({ port, cable, target }){
		SmallNotif.add(`Cable connection is disallowed for (${port.iface.namespace} <-> ${target.iface.namespace})`, 'red');
	},
	'cable.wrong_pair'({ port, cable }){
		SmallNotif.add(`The cable is not suitable (${cable.source}, ${port.source})`, 'red');
	},
	'cable.wrong_type'({ cable, iface, port, target }){
		SmallNotif.add(iface.title+"> Port from '"+port.iface.title + " - " + port.name+"' was not an "+(target.type._name || target.type.name), 'red');
	},
	'cable.wrong_type_pair'({ port, target }){
		SmallNotif.add(`The cable type is not suitable (${target.type.name} != ${port.type.name})`, 'red');
	},
	'cable.virtual_type_mismatch'({ port, target }){
		let A = port.virtualType?.map(v => v.name).join("|") ?? port.type.name;
		let B = target.virtualType?.map(v => v.name).join("|") ?? target.type.name;
		SmallNotif.add(`No virtual type that matched each other (${A} != ${B})`, 'yellow');
	},
	'cable.duplicate_removed'({ cable, port }){
		SmallNotif.add("Duplicated cable removed", 'yellow');
	},
	'cable.replaced'({ cable, port }){
		SmallNotif.add("Cable was replaced because input doesn't support array", 'yellow');
	},
	'cable.unsupported_dynamic_port'({ cable, port }){
		SmallNotif.add("Connecting cable between dynamically generated port is not supported", 'red');
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

Blackprint.on('error', {slot: 'bp-editor'}, function(ev){
	SmallNotif.add(ev.message, 'red');
});

window.addEventListener('error', function(e){
	let message = e.message || "Something went wrong..";
	if(message.includes('ResizeObserver')) return (e);
	message = message.replace('Uncaught ', '');

	SmallNotif.add(message, 'red');
});

window.addEventListener('onunhandledrejection', function(e){
	let message = e.message || "Something went wrong..";
	if(message.includes('ResizeObserver')) return (e);
	message = message.replace('Uncaught ', '');

	SmallNotif.add(message, 'red');
});