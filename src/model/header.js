// https://www.npmjs.com/package/scarletsframe#initializedefine-model
sf.model('header', function(My, include){
	My.message = "Hello";
	My.showOptions = false;
	My.info = {scale:100};

	My.init = function(){
		sf.URI.parse(); // Trigger to reparse current URL
	}

	My.mainMenu = function(ev){
		if(My.showOptions === false) return;
		let sketch = SketchList[views.data.page - 1];

		include('dropdown').show([{
			title: 'Sketch',
			icon: 'fa fa-pencil-ruler',
			deep:[{
				title: 'Import',
				icon: 'fa fa-folder-open',
				deep:[{
					title:'Append JSON',
					async callback(){
						let val = await Swal.fire({
							title:"Import from JSON and append to sketch",
							input: "text",
						})

						val = val.value;
						if(val) sketch.importJSON(val);
					}
				}, {
					title: 'Load JSON',
					async callback(){
						let val = await Swal.fire({
							title:"Clean sketch and import from JSON",
							input: "text",
						});

						val = val.value;
						if(!val) return;

						sketch.clearNodes();
						sketch.importJSON(val);
					}
				}, {
					title: 'Load File',
					callback(){
						var el = document.createElement("input");
						el.setAttribute('type', 'file');
						el.onchange = async function(){
							if(this.files.length === 0) return;
							if(this.files.length !== 1){
								console.log(this.files);
								console.log("Currently only support 1 file");
								return;
							}

							let text = JSON.parse(await this.files[0].text());
							sketch.clearNodes();
							sketch.importJSON(text);
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

						if(confirm.isDismissed)
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
				}]
			}]
		}, {
			title: 'Modules',
			icon: 'fa fa-layer-group',
			deep:[{
				title: 'Create Custom',
				icon: 'fa fa-plus',
				callback(){
					Modal.goto('/custom-node-editor');
				}
			}, {
				title: 'Load from URL',
				icon: 'fa fa-truck-loading',
				disabled: true,
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