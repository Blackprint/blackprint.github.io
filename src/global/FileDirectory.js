class CustomDirectory extends Blackprint.Engine.CustomEvent {
	constructor(handle, _dirName){
		super();

		this.name = handle.name;
		if(handle.parentHandle == null)
			handle._path = this.path = '.';

		else this.path = handle._path;
		this.kind = 'directory';

		this.handle = handle;
		this.parentHandle = handle.parentHandle;
		delete handle.parentHandle;

		// EditorWorkingDir.handle.queryPermission().then(status => {
		// 	if(status === 'granted') this.emit('ready');
		// });
	}

	reconstruct(){
		this.handle.parentHandle = this.parentHandle;
		this.handle._path = this.path;
	}

	async move(toPath){
		let dirHandle = new CustomDirectory(this.handle.rootDirHandle);

		if(this.kind === 'directory')
			await dirHandle.getDirectory(toPath, true);
		else {
			let target = await dirHandle.createFile(toPath);
			await target.writeData(await this.readBuffer());
		}

		await this.delete();
	}

	async resolveHandle(path, _handle, _create = false){
		_handle ??= this.handle;
		if(!path) return _handle;

		if(path.constructor !== Array){
			if(path === '.' || path === './') return _handle;
			if(path.includes('\\')) path = path.split('\\').join('/');
			path = path.split('/');
		}

		let check = path[0];
		if(check === '.' || check === '') path.shift();
		if(path.length === 0) return _handle;

		let first = path.shift();

		try {
			var handle = await _handle.getDirectoryHandle(first, {create: _create});
		} catch(e) {
			var handle = await _handle.getFileHandle(first);
		}

		if(handle == null) return null;
		handle.rootDirHandle = _handle.rootDirHandle || _handle;
		handle.parentHandle = _handle;
		handle._path = _handle._path +'/'+ first;
		return await this.resolveHandle(path, handle, _create);
	}

	async resolveCustomHandle(path, _handle, _create = false){
		let handle = await this.resolveHandle(path, _handle, _create);

		if(handle.kind === 'directory') return new CustomDirectory(handle);
		else return new CustomFile(handle, handle.parentHandle);
	}

	async getDirectory(path, create=false){
		return new CustomDirectory(await this.resolveHandle(path, null, create));
	}

	async ls(path){
		let lastHandle = await this.resolveHandle(path);
		let arr = [];

		for await(let val of lastHandle.values()){
			if(val.kind === 'file'){
				val = new CustomFile(val, lastHandle);
			}
			else {
				val.parentHandle = lastHandle;
				val._path = lastHandle._path +'/'+ val.name;
				val = new CustomDirectory(val);
			}

			arr.push(val);
		}

		return arr;
	}

	async mkdir(path){
		return new CustomDirectory(await this.resolveHandle(path, null, true));
	}

	async createFile(path){
		path = path.split('/');
		let fileName = path.pop();
		let lastHandle = await this.resolveHandle(path, null, true);
		let handle = await lastHandle.getFileHandle(fileName).catch(()=>{});
		if(handle != null) throw new Error("File already exist");

		handle = await lastHandle.getFileHandle(fileName, {create: true});
		if(handle == null) return null;
		return new CustomFile(handle, lastHandle);
	}

	async getFile(path){
		path = path.split('/');
		let fileName = path.pop();
		let lastHandle = await this.resolveHandle(path);
		let handle = await lastHandle.getFileHandle(fileName).catch(()=>{});
		if(handle == null) return null;

		return new CustomFile(handle, lastHandle);
	}

	async recursiveReadFiles(path){
		let data = {};
		this.recursiveGetFileHandles(path, data, true);
		return data;
	}

	async recursiveGetFileHandles(path, _data={}, readText=false){
		let list = await this.ls(path);

		for (let i=0; i < list.length; i++) {
			let item = list[i];
			if(item.kind === 'file'){
				if(readText) _data[item.name] = await item.readText();
				else _data[item.name] = item;
			}
			else _data[item.name] = await item.recursiveGetFileHandles('.', {}, readText);
		}

		return _data;
	}

	async getBlob(path){ return await (await this.getFile(path)).getBlob() }
	async readText(path){ return await (await this.getBlob(path)).text() }
	async readBuffer(path){ return await (await this.getBlob(path)).arrayBuffer() }
	async getStream(path){ return await (await this.getBlob(path)).stream() }

	async writeData(path, text){
		await (await this.getFile(path)).writeData();
	}

	async writeDataAt(path, pos, text){
		await (await this.getFile(path)).writeDataAt(pos, text);
	}

	async appendData(path, text){
		await (await this.getFile(path)).appendData(text);
	}

	async prependData(path, text){
		await (await this.getFile(path)).prependData(text);
	}

	async delete(){
		let list = await this.ls();
		for (let i=0; i < list.length; i++)
			await list[i].delete();

		await this.parentHandle.removeEntry(this.name);
	}
}

class CustomFile {
	constructor(handle, dirHandle){
		this.path = dirHandle._path+'/'+handle.name;
		this.name = handle.name;
		this.handle = handle;
		this.dirHandle = dirHandle;
		this.rootDirHandle = dirHandle.rootDirHandle;
		this.kind = 'file';
	}

	async getBlob(){ return await (await this.handle.getFile()) }
	async readText(){ return await (await this.getBlob()).text() }
	async readBuffer(){ return await (await this.getBlob()).arrayBuffer() }
	async getStream(){ return await (await this.getBlob()).stream() }

	async writeData(data){
		let writer = await this.handle.createWritable({keepExistingData: false});
		await writer.write(data);
		await writer.close();
	}

	async writeDataAt(pos, data){
		let writer = await this.handle.createWritable({keepExistingData: true});
		await writer.seek(pos);
		await writer.write(data);
		await writer.close();
	}

	async appendData(data){
		let writer = await this.handle.createWritable({keepExistingData: true});
		await writer.write(data);
		await writer.close();
	}

	async prependData(data){
		let writer = await this.handle.createWritable({keepExistingData: true});
		await writer.seek(0);
		await writer.write(data);
		await writer.close();
	}

	async lastModified(){
		return (await this.handle.getFile()).lastModified;
	}

	async size(){
		return (await this.handle.getFile()).size;
	}

	async type(){
		return (await this.handle.getFile()).type;
	}

	async delete(){
		await this.dirHandle.removeEntry(this.name);
	}
}

CustomFile.prototype.move = CustomDirectory.prototype.move;