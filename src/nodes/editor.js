Blackprint.registerNode('BP_Editor/LeftPanel/Preview',
class extends Blackprint.Node {
	static input = { Element: HTMLElement };
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Editor Preview"
		iface.description = "Put element on the left panel";

		// Manually call 'update' when any cable from input port was disconnected
		this.iface.on('cable.disconnect', {slot: 'bp-editor'}, ({ port })=> {
			if(port.source === 'input') this.update();
		});
	}

	update(){
		let { page } = this._instance;
		page.panels.left.setPreview(this.input.Element);
	}
});

setTimeout(() => {
	Blackprint.nodes.BP_Editor.hidden = true;
}, 1000);