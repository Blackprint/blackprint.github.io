var ground = sf.views('vw-ground', 'ground');
ground.addRoute([
	{
	    path:'/',
	    template:'vw-ground/blackprint',

	    // Nested router for vw-sketch
	    'vw-sketch':[{
	    	path:'/page/:pageIndex',
	    	template:'Blackprint/page', // Import blackprint page
	    	on:{
	    		// Start importing blackprint sample here
	    		showed: startImportSample,

	    		/*
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
]);

// Increase views limit from 3 into 100
ground.maxCache = 100;

ground.on('routeFinish routeCached', function(){
	animatePageTransition(ground);
});

ground.on('routeError', function(e){
	console.warn(e);
});