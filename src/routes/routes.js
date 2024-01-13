// This project is using file-system directory structure routes
// You can just easily add .sf file inside the views-route

// ====== Main content routes ======
var views = (new sf.Views('vw-ground', 'page')) // page = http://url.com/#page/...
.on('finish', function(current, target, data){
	// Skip page animation when switching between sketch page
	if(current.startsWith('/sketch/') && target.startsWith('/sketch/')){
		if(views.lastSibling) $(views.lastSibling).addClass('disable-anim');
		if(views.showedSibling) $(views.showedSibling).removeClass('disable-anim');
		else $(views.currentDOM).removeClass('disable-anim');
		return;
	}

	// Add animation
	animatePageTransition(views);
});

// Increase views limit from 3 into 100
views.maxCache = 100;


// ====== Modal content routes ======
var modal = (new sf.Views('vw-modal', false)); // false = We don't need to use hashtag route


// ====== Handle any cross domain URL ======
// Will throw error if this was not being set
sf.Views.onCrossing = function(url, target){
	window.open(url, '_blank');
}


// === Function for transitioning page ===

var transitioning = 0;
function animatePageTransition(views){
	if(views.lastSibling)
		$(views.lastSibling).animateKey('scaleDown', 0.6, function(){
			$(this).addClass('disable-anim');
		});

	if(views.showedSibling)
		$(views.showedSibling).removeClass('disable-anim').animateKey('scaleUpDown', {
			duration:0.6,
			delay:0.3,
			visible:false
		});

	// Make sure showed element is not hidden after animation
	clearTimeout(transitioning);
	transitioning = setTimeout(function(){
		transitioning = false;
		$(views.relatedDOM).removeClass('disable-anim');
	}, 1000);
}