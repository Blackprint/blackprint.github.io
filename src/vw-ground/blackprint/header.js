// https://www.npmjs.com/package/scarletsframe#initializedefine-model
sf.model.for('header', function(self, root){
	self.message = "Hello";
	self.description = "Developers! ";

	var onHomepage;
	self.init = function(){
		setTimeout(function(){
			sf.url.parse(); // Trigger to reparse current URL

			if(!sf.url.hashes.ground || sf.url.hashes.ground === '/'){
				textAnimation("Let's getting started!");

				onHomepage = setInterval(function(){
					self.$el('.right').animateKey('fadeOut');
				}, 2000);
			}
			else{
				self.description = '';
				textAnimation("Welcome to the example!");
			}
		}, 2000);
	}

	self.toWorkspace = function(){
		ground.goto('/page/1');

		clearInterval(onHomepage);

		self.description = '';
		textAnimation("Welcome to the example!");
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