$(function(){
	// Fix for Telegram who encode the URL after the hashtag
	if((location.hash.includes('%23'))){
		location.hash = decodeURIComponent(location.hash)
	}

	// Global sf.loader background load's progress bar
	sf.loader.onProgress(function(loaded, total){
		Loading.set(`Loading ${loaded}/${total}`);
		if(loaded === total) Loading.set();
	}, true);

	let importSketch = sf.URI.data.importSketch;
	if(importSketch !== void 0){
		requestAnimationFrame(function(){
			setTimeout(()=> {
				importSketch = pako.inflateRaw(Base64.toUint8Array(importSketch[0]), {to: 'string'});
				SketchImporter.loadJSON(importSketch);
			}, 500);
		});
	}

	let exampleURL = sf.URI.data.openExample;
	if(importSketch == null && exampleURL !== void 0){
		requestAnimationFrame(()=> {
			setTimeout(()=> ModuleExampleList.addExampleFromURL(exampleURL[0]), 500);
		});
	}

	setTimeout(()=> {
		// Disable VFX for mobile device or non-chrome browser
		if(/android|ios/i.test(navigator.userAgent) || !/chrome/i.test(navigator.userAgent)){
			sf.model('header').disableVFX();
		}

		if(views.data.page != null && /\/sketch\/[^0-9]/.test(views.currentPath))
			views.goto("/sketch/1");
	}, 100);

	$(sf.Window).on('resize', ev => {
		let height = ev.target.innerHeight;
		let width = ev.target.innerWidth;

		for (var i = 0; i < SketchList.length; i++) {
			let container = SketchList[i].scope('container');
			if(container.origSize.h < height)
				container.origSize.h = container.size.h = height;

			if(container.origSize.w < width)
				container.origSize.w = container.size.w = width;
		}
	});

	// Auto switch to dev mode when being used on localhost
	$(function(){
		if(/localhost|127\.0\.0\.1|\.repl\.co/.test(location.hostname) && !location.pathname.includes('/dev.html'))
			location.pathname = '/dev.html';
	});

	if(window.___browserSync___ != null){
		window.___browserSync___.socket.on('bp-docs-append', function(data){
			Blackprint.Sketch.registerDocs(data);
		});
	}

	// Always use the newest module
	Blackprint.onModuleConflict = async map =>{
		// ToDo: show popup to select if user is prefer old version or the newest version
		return Object.entries(map).forEach(v => v.useOld = false);
	};

	if(navigator.serviceWorker != null)
		navigator.serviceWorker.register("/service-worker.js");

	Blackprint.on('menu.create.node', function(ev){
		let { list, isSuggestion } = ev;
		if(!isSuggestion) return;

		delete list.Example; // Delete example nodes from suggestion
	});
});