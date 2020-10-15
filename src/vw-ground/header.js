// https://www.npmjs.com/package/scarletsframe#initializedefine-model
sf.model('header', function(self, root){
	self.message = "Hello";
	self.description = "Developers! ";
	self.showOptions = false;

	self.info = {scale:100};

	var onHomepage;
	self.init = function(){
		sf.url.parse(); // Trigger to reparse current URL

		if(!sf.url.hashes.ground || sf.url.hashes.ground === '/'){
			setTimeout(function(){
				textAnimation("Let's getting started!");

				onHomepage = setInterval(function(){
					self.$el('.right').animateKey('fadeOut');
				}, 2000);
			}, 2000);
		}
		else{
			self.description = "Developers! ";
			textAnimation("Welcome to the example!");

			self.showOptions = true;

			sketch.scope('container').onScale = function(scale){
				self.info.scale = Math.round(scale*100);
			}
		}
	}

	self.toHome = function(){
		ground.goto('/');
	}

	self.toWorkspace = function(){
		clearInterval(onHomepage);

		ground.goto('/page/1', function(){
			self.description = 'Developers! ';
			setTimeout(function(){
				textAnimation("Welcome to the example!");
			}, 1000);
		});
	}

	function textAnimation(text){
		var description = text.split('');

		// Text animation
		var interval = setInterval(function(){
			self.description += description.shift();

			if(description.length === 0)
				clearInterval(interval);
		}, 50);
	}

	self.cloneActive = false;
	self.cloneContainer = function(){
		self.cloneActive = !self.cloneActive;

		if(self.cloneActive){
			if(self.switchVFXActive === false)
				self.switchVFX();

			// Reset current container view
			var container = sketch.scope('container');
			container.pos.x = 0;
			container.pos.y = 0;
			container.scale = 1; // 100% scale

			var mini = sketch.cloneContainer(); // Clone 1

			// Remove the dropdown and SVG animation
			// from mini container
			$('sf-m[name="dropdown"], animate', mini).remove();

			// Clone into new window
			sf.window.create({
				title: "Cloned Sketch Container",
				templateHTML: sketch.cloneContainer() // Clone 2
			}, refreshViewport);

			// Put the mini container into DOM
			$('.mini-blackprint').removeClass('hidden').append(mini); // Clone 1

			// Refresh mini viewport size
			// I put it like this for a reason
			refreshViewport();
			function refreshViewport(){
				setTimeout(function(){
					container.pos.x = -0.1;
					setTimeout(function(){
						container.pos.x = 0;
					}, 500);
				}, 1000);
			}
		}
		else{
			$('.mini-blackprint').addClass('hidden').text('');
			sf.window.destroy();
		}
	}

	self.switchVFXActive = false;
	self.switchVFX = function(){
		self.switchVFXActive = !self.switchVFXActive;

		if(self.switchVFXActive){
			sketch.scope('container').$el.addClass('performance');
			self.visualizeActive = false;
			Blackprint.settings('visualizeFlow', false);
		}
		else sketch.scope('container').$el.removeClass('performance');
	}

	self.visualizeActive = true;
	self.visualizeFlow = function(){
		self.visualizeActive = !self.visualizeActive;
		Blackprint.settings('visualizeFlow', self.visualizeActive);
	}

	self.saveSketch = function(ev){
		sketch.scope('dropdown').show([{
			title:'Copy JSON',
			callback:function(){
				var temp = sketch.exportJSON();
				navigator.clipboard.writeText(temp);

				swal({
					title: "Copied to clipboard!",
					text: temp
				});
			}
		}, {
			title:'To File',
			callback:function(){
				var btn = document.createElement("a");
				var file = new Blob([sketch.exportJSON()], {type: 'application/json'});
				btn.href = URL.createObjectURL(file);
				btn.download = 'blackprint.json';
				btn.click();

				// Auto revoke after 10 sec
				setTimeout(function(){
					URL.revokeObjectURL(btn.href);
				}, 10000);
			}
		}], ev.x, ev.y);
	}

	self.loadSketch = function(ev){
		sketch.scope('dropdown').show([{
			title:'Append from JSON',
			callback:function(){
				swal({
					title:"Append from JSON",
					content: "input",
				}).then(function(val){
					sketch.importJSON(val);
				});
			}
		}, {
			title:'Import JSON',
			callback:function(){
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
			callback:function(){
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