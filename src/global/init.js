$(function(){
	let importSketch = sf.URI.data.importSketch;
	if(importSketch !== void 0){
		Modal.hide();

		setTimeout(()=> {
			importSketch = pako.inflateRaw(Base64.toUint8Array(importSketch[0]), {to: 'string'});
			SketchImporter.loadJSON(importSketch);
		}, 1000);
	}
});