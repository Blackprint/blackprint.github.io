// https://www.npmjs.com/package/scarletsframe#initializedefine-model
sf.model.for('header', function(self, root){
	self.message = "Hello";
	self.description = "Developers! ";

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
		else textAnimation("Welcome to the example!");
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
});