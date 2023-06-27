Blackprint.registerNode('BP_Editor/LeftPanel/Preview',
class extends Blackprint.Node {
	static input = { Element };
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
		let { page } = this.instance;

		let el = this.input.Element;

		// Remove first from preview if the input is null
		if(el == null)
			page.panels.left.setPreview(el);

		this._returnOldEl();

		let left = this.instance.page.panels.left;
		if(el != null){
			left._oldEl = el;
			left._oldParentEl = el.parentNode;
			left._oldNextEl = el.nextSibling;
		}
		else left._oldEl = left._oldParentEl = left._oldNextEl = null;
		page.panels.left.setPreview(el);
	}

	_returnOldEl(){
		let left = this.instance.page.panels.left;

		if(left._oldEl != null && left._oldParentEl != null)
			left._oldParentEl.insertBefore(left._oldEl, left._oldNextEl);
	}

	destroy(){
		if(this.input.Element != null){
			this.instance.page.panels.left.setPreview(null);
			this._returnOldEl();
		}
	}
});

Blackprint.registerNode('BP_Editor/Workspace/Assets/File',
class extends Blackprint.Node {
	static output = { Handle: FileSystemFileHandle };
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Workspace File"
		iface.data = {};

		this.workspace = sf.model("project-panel-workspace")._utils;
	}

	imported(data){
		let iface = this.iface;
		iface.data.path = data.path;

		let name = data.path;
		iface.description = name.slice(name.indexOf('/assets')).slice(-25);

		this.workspace.on('file.change', this._fileChange = async ev => {
			this.output.File = this.workspace.resolvePath(data.path)?.handle || null;
		});

		this._fileChange(data);
	}

	destroy(){
		this.workspace.off('file.change', this._fileChange);
	}
});

Blackprint.registerNode('BP_Editor/Workspace/Assets/Directory',
class extends Blackprint.Node {
	static output = { Handle: FileSystemDirectoryHandle };
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Workspace Dir"
		iface.data = {};

		this.workspace = sf.model("project-panel-workspace")._utils;
	}

	imported(data){
		let iface = this.iface;
		iface.data.path = data.path;

		let name = data.path;
		iface.description = name.slice(name.indexOf('/assets')).slice(-25);

		this.workspace.on('file.change', this._fileChange = async ev => {
			this.output.Directory = this.workspace.resolvePath(data.path)?.handle || null;
		});

		this._fileChange(data);
	}

	destroy(){
		this.workspace.off('file.change', this._fileChange);
	}
});

setTimeout(() => {
	Blackprint.nodes.BP_Editor.hidden = true;
}, 1000);