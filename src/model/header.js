// https://www.npmjs.com/package/scarletsframe#initializedefine-model
sf.model('header', function(My, include){
	My.message = "Hello";
	My.showOptions = false;
	My.info = {scale:100};

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
				title: (function(){
					if(sf.hotReload === void 0)
						return "Development Mode";

					if(window.___browserSync___ === void 0)
						return "Connect to module server";

					let socket = ___browserSync___.socket;
					let isConnected = socket.connected;
					let isDefault = socket.io.uri.indexOf(location.origin) === 0;

					return (!isConnected || isDefault ? "Connect to" : "Disconnect from")+' module server';
				})(),
				icon: 'fa fa-plug',
				callback(){
					if(sf.hotReload === void 0)
						return location.pathname = '/dev.html';

					if(window.___browserSync___){
						let socket = ___browserSync___.socket;
						let isConnected = socket.connected;
						let isDefault = socket.io.uri.indexOf(location.origin) === 0;

						if(isConnected && !isDefault)
							socket.disconnect();
					}

					Modal.goto('/dev-mode');
				}
			}, {
				title: 'Loaded from URL',
				icon: 'fa fa-truck-loading',
				callback(){
					Modal.goto('/module-url');
				}
			}]
		}, {
			title: 'Environment',
			icon: 'fa fa-key',
			callback(){
				Modal.goto('/environment-variables');
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

	My.switchVFXActive = false;
	My.switchVFX = function(){
		My.switchVFXActive = !My.switchVFXActive;

		if(My.switchVFXActive){
			$('body').addClass('blackprint-no-vfx');
			My.visualizeActive = false;
			Blackprint.settings('visualizeFlow', false);
		}
		else $('body').removeClass('blackprint-no-vfx');
	}

	My.visualizeActive = true;
	My.visualizeFlow = function(){
		My.visualizeActive = !My.visualizeActive;
		Blackprint.settings('visualizeFlow', My.visualizeActive);
	}
});