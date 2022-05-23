$(function(){
	// Fix for Telegram who encode the URL after the hashtag
	if((location.hash.includes('%23'))){
		location.hash = decodeURIComponent(location.hash)
	}

	let importSketch = sf.URI.data.importSketch;
	if(importSketch !== void 0){
		Modal.hide();

		setTimeout(()=> {
			importSketch = pako.inflateRaw(Base64.toUint8Array(importSketch[0]), {to: 'string'});
			SketchImporter.loadJSON(importSketch);
		}, 500);
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

	// Always use the newest module
	Blackprint.onModuleConflict = async map =>{
		// ToDo: show popup to select if user is prefer old version or the newest version
		return Object.entries(map).forEach(v => v.useOld = false);
	};

	// this.variables = {}; // { name => { value, type, title, category } }
	// this.functions = {}; // { name => { variables, input, output, used: [], node, title, category, description } }
});