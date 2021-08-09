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

		include('dropdown').show([{
			title: 'Sketch',
			icon: 'fa fa-pencil-ruler',
			deep:[{
				title: 'Import',
				icon: 'fa fa-folder-open',
				deep:[{
					title:'Append JSON',
					async callback(){
						sketch.importJSON(await swal({
							title:"Import from JSON and append to sketch",
							content: "input",
						}));
					}
				}, {
					title: 'Load JSON',
					async callback(){
						let val = await swal({
							title:"Clean sketch and import from JSON",
							content: "input",
						});

						if(!val) return;

						sketch.clearNodes();
						sketch.importJSON(val);
					}
				}, {
					title: 'Load File',
					callback(){
						var el = document.createElement("input");
						el.setAttribute('type', 'file');
						el.onchange = function(){
							console.log(345, this);
						}
						el.click();
					}
				}]
			}, {
				title:'Export',
				icon: 'fa fa-save',
				deep:[{
					title: 'Copy JSON',
					callback(){
						var temp = sketch.exportJSON();
						navigator.clipboard.writeText(temp);

						swal({
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
				callback(){}
			}, {
				title: 'Load from URL',
				icon: 'fa fa-truck-loading',
				callback(){}
			}]
		}, {
			title: 'Environment',
			icon: 'fa fa-key',
			callback(){}
		}, {
			title: 'Home',
			icon: 'fa fa-home',
			callback(){
				views.goto('/')
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