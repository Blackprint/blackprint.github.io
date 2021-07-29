// https://www.npmjs.com/package/scarletsframe#initializedefine-model
sf.model('header', function(My, include){
	My.message = "Hello";
	My.showOptions = false;
	My.info = {scale:100};

	My.init = function(){
		sf.URI.parse(); // Trigger to reparse current URL
	}

	My.mainMenu = function(){

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

	My.saveSketch = function(ev){
		sketch.scope('dropdown').show([{
			title:'Copy JSON',
			callback(){
				var temp = sketch.exportJSON();
				navigator.clipboard.writeText(temp);

				swal({
					title: "Copied to clipboard!",
					text: temp
				});
			}
		}, {
			title:'To File',
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
		}], ev.x, ev.y);
	}

	My.loadSketch = function(ev){
		sketch.scope('dropdown').show([{
			title:'Append from JSON',
			callback(){
				swal({
					title:"Append from JSON",
					content: "input",
				}).then(function(val){
					sketch.importJSON(val);
				});
			}
		}, {
			title:'Import JSON',
			callback(){
				swal({
					title:"Import JSON",
					content: "input",
				}).then(function(val){
					if(!val)
						return;

					sketch.clearNodes();
					sketch.importJSON(val);
				});
			}
		}, {
			title:'From File',
			callback(){
				var el = document.createElement("input");
				el.setAttribute('type', 'file');
				el.onchange = function(){
					console.log(345, this);
				}
				el.click();
			}
		}], ev.x, ev.y);
	}
});