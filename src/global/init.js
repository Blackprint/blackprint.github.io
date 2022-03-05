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
		}, 1000);
	}

	setTimeout(()=> {
		// Disable VFX for mobile device or non-chrome browser
		if(/android|ios/i.test(navigator.userAgent) || !/chrome/i.test(navigator.userAgent)){
			sf.model('header').disableVFX();
		}
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
		if(location.hostname === 'localhost' && !location.pathname.includes('/dev.html'))
			location.pathname = '/dev.html';
	});
});