// https://www.npmjs.com/package/scarletsframe#initializedefine-model
var EditorHeader = sf.model('header', function(My, include){
	My.message = "Hello";
	My.showOptions = false;
	My.info = {scale:100};
	My._loadedModuleURL = Blackprint._modulesURL;
	My._moduleExampleList = []; // will be referenced by: /src/routes/+vw-modal/module-example-list.sf

	My.init = function(){
		sf.URI.parse(); // Trigger to reparse current URL
	}

	async function importJSON(sketch, json){
		Loading.set("Importing nodes");
		sf.loader.onProgress(function(loaded, total){
			if(loaded === total)
				Loading.set("Importing nodes");
			else Loading.set(`Downloading ${loaded}/${total}`);
		});

		await sketch.importJSON(json);
		Loading.set('');
	}

	My.mainMenu = function(ev){
		if(My.showOptions === false) return;
		let sketch = SketchList[views.data.page - 1];

		include('dropdown').show([{
			title: 'Sketch',
			icon: 'fa fa-pencil-ruler',
			deep:[{
				title: 'Open',
				icon: 'fa fa-folder-open',
				deep:[{
					title: "From Clipboard",
					async callback(){
						let val = await Swal.fire({
							title: "Paste the JSON here",
							input: "text",
						});

						val = val.value;
						if(!val) return;

						SketchImporter.loadJSON(val, sketch);
					}
				}, {
					title: "From File",
					callback(){
						var el = document.createElement("input");
						el.setAttribute('type', 'file');
						el.onchange = async function(){
							if(this.files.length === 0) return;
							if(this.files.length !== 1){
								console.log(this.files);
								console.log("Currently only support 1 file");
								SmallNotif.add('Currently only support 1 file', 'error');
								return;
							}

							let text = JSON.parse(await this.files[0].text());
							if(text){
								text = text.trim();
								if(text.slice(0, 1) !== '{')
									SmallNotif.add('Data in the file is not a JSON', 'error');
							}

							SketchImporter.loadJSON(text, sketch);
						}
						el.click();
					}
				}]
			}, {
				title:'Export',
				icon: 'fa fa-save',
				deep:[{
					title: 'To Clipboard',
					async callback(){
						let confirm = await Swal.fire({
							title: "Choose one of the export mode",
							cancelButtonText: 'Minified JSON',
							confirmButtonText: 'Prettified JS',
							denyButtonText: 'Minimal JSON',
							denyButtonColor: 'gray',
							showCancelButton: true,
							showDenyButton: true,
							showCloseButton: true
						});

						if(confirm.isDismissed && confirm.dismiss === 'backdrop')
							return;

						let option = {};
						if(confirm.isConfirmed){
							option.toJS = true;
							option.space = '\t';
						}
						else if(confirm.isDenied)
							option.position = false;

						var temp = sketch.exportJSON(option);
						navigator.clipboard.writeText(temp);

						Swal.fire({
							title: "Copied to clipboard!",
							text: temp
						});
					}
				}, {
					title: 'To File',
					callback(){
						var btn = document.createElement("a");
						var file = new Blob([sketch.exportJSON()], {type: 'application/json'});
						btn.href = URL.createObjectURL(file);
						btn.download = 'blackprint.json';
						btn.click();

						// Auto revoke after 120 sec
						setTimeout(function(){
							URL.revokeObjectURL(btn.href);
						}, 120e3);
					}
				}, {
					title: 'To URL',
					callback(){
						var compress = pako.deflateRaw(sketch.exportJSON());
						var temp = Base64.fromUint8Array(compress, true);

						sf.URI.data.importSketch = [temp];
						sf.URI.replace();

						let loc = location.href;
						navigator.clipboard.writeText(loc);

						Swal.fire({
							title: "Copied to clipboard!",
							text: loc
						});
					}
				}]
			}, {
				title: 'Examples',
				icon: 'fa fa-layer-group',
				callback(){
					Modal.goto('/example-list');
				}
			}, {
				title: 'Reload',
				icon: 'fa fa-sync',
				async callback(){
					let val = await Swal.fire({
						title: "This action will export and reimport current sketch",
						showCancelButton: true,
						showCloseButton: true
					});

					if(confirm.isDismissed && confirm.dismiss === 'backdrop')
						return;

					let sketch = SketchList[0];
					let temp = sketch.exportJSON();
					sketch.clearNodes();

					await sketch.importJSON(temp);
				}
			}]
		}, {
			title: 'Modules',
			icon: 'fa fa-layer-group',
			deep:[{
				title: 'Create Custom',
				icon: 'fa fa-plus',
				hide: sf.hotReload === void 0,
				callback(){
					Modal.goto('/custom-node-editor');
				}
			}, {
				title: 'Loaded module',
				icon: 'fa fa-boxes',
				callback(){
					Modal.goto('/module-url');
				}
			}]
		}, {
			title: 'Remote',
			icon: 'fa fa-plug',
			hide: sf.hotReload === void 0,
			deep:[{
				title: 'Sketch',
				icon: 'fa fa-plug',
				disabled: true,
				async callback(){
					if(location.hostname !== 'localhost')
						return SmallNotif.add("Still work in progress");

					if(0){
						window.win = window.open('http://localhost:6789/dev.html#page/sketch/1', 'ay', 'popup');

						win.onclick = function(){
							win.onclick = null;
							win.ins = new win.Blackprint.RemoteSketch(win.SketchList[0]);
							win.onmessage = function(msg){ win.ins.onSyncIn(msg.data) };
							win.console.log = console.log;
							win.console.error = console.error;
							win.onunhandledrejection = (v)=>console.error(v.reason);
							win.onerror = console.error;
							win.ins.onSyncOut = v => win.opener.postMessage(v);
							win.ins.on('disabled', ()=> win.SmallNotif.add("Remote sync was disabled", 'red'));

							// Allow import/module sync
							win.ins.onImport = v=> true;
							win.ins.onModule = v=> true;


							let ins = new Blackprint.RemoteSketch(SketchList[0]);
							window.onmessage = function(msg){ ins.onSyncIn(msg.data) };
							window.onbeforeunload = ()=> win.close();
							ins.onSyncOut = v => win.postMessage(v);
							ins.on('disabled', ()=> window.SmallNotif.add("Remote sync was disabled", 'red'));

							// Allow import/module sync
							ins.onImport = v=> true;
							ins.onModule = v=> true;
						}
					}
					else {
						if(window.io == null)
							await sf.loader.js(['https://cdn.socket.io/4.4.1/socket.io.min.js']);

						let client = new Blackprint.RemoteSketch(SketchList[0]);

						let socket = io("ws://localhost:2345");
						socket.on('connect', ()=> SmallNotif.add("Connected to relay server"));
						socket.on('disconnect', ()=> SmallNotif.add("Disconnected from relay server"));

						socket.on('relay', client.onSyncIn);
						client.onSyncOut = v => socket.emit('relay', v);
					}
				}
			}, {
				title: 'Engine',
				icon: 'fa fa-plug',
				disabled: true,
				async callback(){
					if(location.hostname !== 'localhost')
						return SmallNotif.add("Still work in progress");

					let instance = window.SketchList[0];
					let client = new Blackprint.RemoteControl(instance);

					if(0){
						let server = new Blackprint.RemoteEngine(window.engine);

						// Allow import/module sync
						server.onImport = v=> true;
						server.onModule = v=> true;

						client.onSyncOut = v => server.onSyncIn(v);
						server.onSyncOut = v => client.onSyncIn(v);
					}
					else {
						if(window.io == null)
							await sf.loader.js(['https://cdn.socket.io/4.4.1/socket.io.min.js']);

						let socket = io("ws://localhost:2345");
						socket.on('connect', ()=> SmallNotif.add("Connected to remote engine"));
						socket.on('disconnect', ()=> SmallNotif.add("Disconnected from remote engine"));

						// instance.syncDataOut = false;
						instance.disablePorts = true;

						socket.on('relay', v => client.onSyncIn(v));
						client.onSyncOut = v => socket.emit('relay', v);
					}
				}
			}, {
				title: (function(){
					if(window.___browserSync___ === void 0)
						return "Module server";

					let socket = ___browserSync___.socket;
					let isConnected = socket.connected;
					let isDefault = socket.io.uri.indexOf(location.origin) === 0;

					return 'Module server '+(!isConnected || isDefault ? "" : "✔️");
				})(),
				icon: 'fa fa-plug',
				callback(){
					if(window.___browserSync___){
						let socket = ___browserSync___.socket;
						let isConnected = socket.connected;
						let isDefault = socket.io.uri.indexOf(location.origin) === 0;

						if(isConnected && !isDefault)
							socket.disconnect();
					}

					Modal.goto('/dev-mode');
				}
			}]
		}, {
			title: 'Development Mode',
			icon: 'fa fa-tools',
			hide: sf.hotReload !== void 0,
			callback(){
				location.pathname = '/dev.html';
			}
		}, {
			title: 'Environment',
			icon: 'fa fa-key',
			callback(){
				Modal.goto('/environment-variables');
			}
		}, {
			title: 'Settings',
			icon: 'fa fa-tools',
			callback(){
				Modal.goto('/sketch-settings');
			}
		}, {
			title: 'Home',
			icon: 'fa fa-home',
			callback(){
				views.goto('/');
			}
		}], {
			element: My.$el('.header-left')[0],
			className: 'header-left-menu'
		});
	}

	My.cloneActive = false;
	My.cloneContainer = function(){
		let sketch = SketchList[views.data.page - 1];
		sketch.page.cloneContainer();
		My.cloneActive = sketch.page.cloneActive;
	}

	My.disableVFXActive = false;
	My.disableVFX = function(){
		My.disableVFXActive = !My.disableVFXActive;

		if(My.disableVFXActive)
			$('body').addClass('blackprint-no-vfx');
		else $('body').removeClass('blackprint-no-vfx');

		localStorage.disableVFXActive = My.disableVFXActive ? '1' : '0';
	}

	if(localStorage.disableVFXActive === '1' && My.disableVFXActive === false)
		My.disableVFX();

	My.visualizeActive = true;
	My.visualizeFlow = function(){
		My.visualizeActive = !My.visualizeActive;
		Blackprint.settings('visualizeFlow', My.visualizeActive);
	}
});