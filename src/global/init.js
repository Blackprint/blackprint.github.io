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
});