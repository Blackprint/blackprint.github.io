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

	My.mainMenu = function(ev){
		if(My.showOptions === false) return;
		let sketch = window.CurrentSketch;
		let sketchSocket = sf.model('modal-remote-sketch-connect').socket;
		let engineSocket = sf.model('modal-remote-engine-connect').socket;

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
						if(confirm.isConfirmed){ // Prettified
							option.toJS = true;
							option.space = '\t';
						}
						else if(confirm.isDenied){ // Minimal JSON export (no position/comment)
							option.position = false;
							option.comment = false;
						}

						option.environment = false;

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
						var opt = {environment: false};
						var file = new Blob([sketch.exportJSON(opt)], {type: 'application/json'});
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
						var opt = {environment: false};
						var compress = pako.deflateRaw(sketch.exportJSON(opt), {level: 9});
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
				title: 'Code Generation',
				icon: 'fa fa-save',
				callback(){
					Modal.goto('/code-generator');
				}
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

					if(val.isDismissed)
						return;

					let sketch = SketchList[0];
					let opt = {environment: false};
					let temp = sketch.exportJSON(opt);
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
				title: 'Sketch' + (sketchSocket?.connected ? ' ✔️' : ''),
				icon: 'fa fa-plug',
				deep: sketchSocket?.connected ? [{
					title: 'Control Panel',
					icon: 'fa fa-grip-horizontal',
					callback(){ Modal.goto('/remote-sync') },
				}, {
					title: 'Disconnect',
					icon: 'fa fa-power-off',
					callback(){ sketchSocket.disconnect() },
				}] : undefined,
				callback: !sketchSocket?.connected && (() => {
					Modal.goto('/remote-sketch-connect');
				})
			}, {
				title: 'Engine' + (engineSocket?.connected ? ' ✔️' : ''),
				icon: 'fa fa-plug',
				deep: engineSocket?.connected ? [{
					title: 'Control Panel',
					icon: 'fa fa-grip-horizontal',
					callback(){ Modal.goto('/remote-sync') },
				}, {
					title: 'Disconnect',
					icon: 'fa fa-power-off',
					callback(){ engineSocket.disconnect() },
				}] : undefined,
				callback: !engineSocket?.connected && (() => {
					Modal.goto('/remote-engine-connect');
				})
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

	My.openDocumentation = function(){
		Modal.goto('/documentation')
	}

	My.cloneContainer = function(){
		window.CurrentSketch.page.cloneContainer();
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