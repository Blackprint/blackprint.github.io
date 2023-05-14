$(()=>{
	setTimeout(async ()=> {
		await sf.loader.task;

		if(Blackprint.nodes.Data != null)
			return;

		SmallNotif.add("Loading required nodes", 'yellow', 500);

		// Load nodes for data manipulation
		// Only load if not connected to remote Blackprint instance
		if(CurrentSketch?._remote != null){
			Blackprint.loadModuleFromURL('https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.7/dist/nodes-data.mjs', {
				loadBrowserInterface: true
			});
		}
	}, 3000);
});

function SuggestNodeTypeCaster(ev){
	if(Blackprint.nodes.Data == null)
		return;

	let { cable, port, target, handler } = ev;

	if(target.iface.namespace === "BP/Fn/Input") return;
	if(target.iface.namespace === "BP/Fn/Output") return;

	let input, output;
	if(cable.owner.source === 'input'){
		input = port;
		output = target;
	}
	else {
		input = target;
		output = port;
	}

	// Skip untyped port
	if(input.type.any || output.type.any) return;

	if(output.type === Number && input.type === String){
		handler(() => {
			let iface = SuggestNodeTypeCaster.createNode('Data/Number/To/String', ev, input);

			if(cable.owner === output){
				iface.input.In.connectCable(cable);
				iface.output.Out.connectPort(input);
			}
			else {
				iface.input.In.connectPort(output);
				iface.output.Out.connectCable(cable);
			}
		});
	}
	else if(output.type !== Function && input.type === Function){
		handler(() => {
			let iface = SuggestNodeTypeCaster.createNode('Data/Any/To/Trigger', ev, input);

			if(cable.owner === output){
				iface.input.Value.connectCable(cable);
				iface.output.Call.connectPort(input);
			}
			else {
				iface.input.Value.connectPort(output);
				iface.output.Call.connectCable(cable);
			}
		});
	}
	else if(output.type === String && input.type === Number){
		handler(() => {
			let iface = SuggestNodeTypeCaster.createNode('Data/String/To/Number', ev, input);

			if(cable.owner === output){
				iface.input.In.connectCable(cable);
				iface.output.Out.connectPort(input);
			}
			else {
				iface.input.In.connectPort(output);
				iface.output.Out.connectCable(cable);
			}
		});
	}
}

SuggestNodeTypeCaster.primitive = new Set([String, Number, Boolean, BigInt]);
SuggestNodeTypeCaster.createNode = function(namespace, ev, input){
	let instance =  ev.instance;
	let rect = input.iface.input._portList.getElement(input).getBoundingClientRect();
	let container = instance.scope('container');

	let Ofst = container.offset;
	let y = (rect.y - container.pos.y - Ofst.y) / container.scale
	let x = (rect.x - container.pos.x - Ofst.x) / container.scale
	let iface = instance.createNode(namespace, {x, y});

	setTimeout(()=> {
		if(iface.w == null) return;
		iface.moveNode({
			stopPropagation(){}, preventDefault(){},
			target: iface.$el[0],
			movementX: -(iface.w + 20) * container.scale,
			movementY: -2
		});
	}, 300);

	return iface;
}