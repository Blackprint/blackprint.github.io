var sampleImported = false;
sf.component('sketch-page', function(self){

	// Will run when <sketch-page> inserted on DOM
	self.init = function(){
		if(sampleImported)
			return;

		sampleImported = true;

		// This could be string instead of object
		sketch.importJSON(sampleList["Default sample"]);
// 	sketch.importJSON(
// {"input/slider-box":[{"id":0,"x":193,"y":45,"options":{"0":{"value":1.9,"min":0,"max":10,"step":0.1},"1":{"value":8.8,"min":0,"max":10,"step":0.1}},"outputs":{"0":[{"id":2,"name":"Any"}],"1":[{"id":2,"name":"Any"}]}}],"example/button/simple":[{"id":1,"x":27,"y":193}],"example/display/logger":[{"id":2,"x":409,"y":81}]}
// 	);
	}
});