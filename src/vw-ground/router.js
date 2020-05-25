var ground = new sf.views('vw-ground', 'ground');

// Increase views limit from 3 into 100
ground.maxCache = 100;

// https://github.com/ScarletsFiction/ScarletsFrame/wiki/Router-or-Views
ground.addRoute([
	{
	    path:'/',
	    template:'vw-ground/blackprint',

	    // Nested router for vw-sketch
	    'vw-sketch':[{
	    	path:'/page/:pageIndex',
	    	template:'Blackprint/page', // Import blackprint page
	    	on:{
	    		showed: function(){
	    			// Show sketch options
					sf.model('header').showOptions = true;

		    		// Start importing blackprint sample here
	    			startImportSample();
	    		},
	    		leaving: function(){
					sf.model('header').showOptions = false;
	    		}

	    		/*
	    		showed: Sketch container have been loaded,
	    		coming: The cable would have wrong position because the DOM still hidden,
	    		leaving: Maybe we can uninitialize something,
	    		hidden: Animate something maybe
	    		*/
	    	}
	    }]
	}, {
	    path:'/getting-started',
	    template:'vw-ground/getting-started'
	},
]).on('finish', function(){
	animatePageTransition(ground);
}).on('error', console.error);

sf.views.onCrossing = function(url, target){
	window.open(url, target).focus();
}