var sampleImported = false;
sf.component('sketch-page', function(self){

	// Will run when <sketch-page> inserted on DOM
	self.init = function(){
		if(sampleImported)
			return;

		sampleImported = true;

		// This could be string instead of object
		// sketch.clearNodes();
		// sketch.importJSON(sampleList["Default sample"]);

		setTimeout(function(){
			sketch.importJSON(
{"Input/file":[{"id":0,"x":74,"y":26,"outputs":{"URL":[{"id":7,"name":"URL"}]}},{"id":1,"x":47,"y":557}],"WebAudio/input/microphone":[{"id":2,"x":21,"y":321}],"WebAudio/output/destination":[{"id":3,"x":597,"y":273}],"WebAudio/effect/PingPongDelay":[{"id":4,"x":322,"y":222,"options":{"mix":0.5,"time":0.3,"feedback":0.5},"outputs":{"Out":[{"id":3,"name":"In"}]}}],"example/button/simple":[{"id":5,"x":35,"y":139,"outputs":{"Clicked":[{"id":7,"name":"Play"}]}},{"id":6,"x":39,"y":225,"outputs":{"Clicked":[{"id":7,"name":"Pause"}]}}],"WebAudio/player":[{"id":7,"x":325,"y":34,"outputs":{"AudioNode":[],"Element":[],"VideoTrack":[{"id":9,"name":"VideoTrack"}],"AudioTrack":[]}}],"Input/slider-box":[{"id":8,"x":141,"y":417,"options":{"0":{"value":0,"min":-100,"max":100,"step":0.1},"1":{"value":0,"min":-100,"max":100,"step":0.1},"2":{"value":1,"min":-100,"max":100,"step":0.1},"3":{"value":1,"min":-100,"max":100,"step":0.1},"4":{"value":0,"min":-100,"max":100,"step":0.1}},"outputs":{"0":[{"id":10,"name":"x"}],"1":[{"id":10,"name":"y"}],"2":[{"id":10,"name":"ScaleX"}],"3":[{"id":10,"name":"ScaleY"}],"4":[{"id":10,"name":"Rotate"}]}}],"WebAudio/visualize/video":[{"id":9,"x":593,"y":25}],"Graphics/sprite":[{"id":10,"x":364,"y":374},{"id":11,"x":510,"y":544}],"Graphics/visualize/canvas":[{"id":12,"x":756,"y":269},{"id":13,"x":749,"y":490}],"Graphics/converter/gif":[{"id":14,"x":246,"y":643}],"decoration/text/notes":[{"id":15,"x":931,"y":27,"options":{"value":"Sorry it's messy here ｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡\n\nFirst you need to open video file.\nTrigger the play, or connect AudioNode to PingPongDelay first.\n\nThe AudioNode can be connected directly to WebAudio Destination.\n\nMedia Player's Element can be connected to Sprite Source."}},{"id":16,"x":58,"y":737,"options":{"value":"To begin with GIF animation, open your GIF file.\n\nThen connect to GIF Player.\nConnect the Canvas to Sprite's Source\nthen connect the Sprite to Canvas Visualization."}}]}
		);}, 1000);
	}
});