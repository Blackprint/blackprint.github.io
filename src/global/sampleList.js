var sampleList = {
	"Empty Sketch": {"_":{"moduleJS":["https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.6.x/dist/nodes-decoration.mjs"]},"Decoration/Text/Notes":[{"i":0,"x":93,"y":89,"data":{"value":"Hiya!\n\nI'm a placeholder for this sketch container.\n\nYou can delete me by right clicking my header, and create new nodes by right clicking the container."}}]},

	"Random Multiply": {"_":{"moduleJS":["https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.6.x/dist/nodes-example.mjs"]},"Example/Math/Random":[{"i":0,"x":298,"y":73,"output":{"Out":[{"i":2,"name":"A"}]}},{"i":1,"x":298,"y":239,"output":{"Out":[{"i":2,"name":"B"}]}}],"Example/Math/Multiply":[{"i":2,"x":525,"y":155,"output":{"Result":[{"i":3,"name":"Any"}]}}],"Example/Display/Logger":[{"i":3,"id":"myLogger","x":763,"y":169}],"Example/Button/Simple":[{"i":4,"id":"myButton","x":41,"y":59,"output":{"Clicked":[{"i":2,"name":"Exec"}]}}],"Example/Input/Simple":[{"i":5,"id":"myInput","x":38,"y":281,"data":{"value":"saved input"},"output":{"Changed":[{"i":1,"name":"Re-seed"}],"Value":[{"i":3,"name":"Any"}]}}]},

	"Audio and Video": {"_":{"moduleJS":["https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.6.x/dist/nodes-input.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes-multimedia@0.3.x/dist/nodes-multimedia.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes-pixi.js@0.4.x/dist/nodes-pixijs.mjs","https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.6.x/dist/nodes-decoration.mjs"]},"Input/UI/File":[{"i":0,"x":119,"y":120,"z":12,"comment":"Drag and drop your video file here","output":{"URL":[{"i":7,"name":"URL"}]}},{"i":1,"x":180,"y":1096,"z":2,"comment":"Drag and drop your .gif file here"}],"Multimedia/Audio/Input/Microphone":[{"i":2,"x":455,"y":352,"z":11,"comment":"Use this if you want to sing :)"}],"Multimedia/Audio/Output/Destination":[{"i":3,"x":1138,"y":131,"z":8}],"Multimedia/Audio/Effect/PingPongDelay":[{"i":4,"x":808,"y":127,"z":7,"comment":"An audio effect for you to try","data":{"mix":0.5,"time":0.3,"feedback":0.5},"input_d":{"Mix":0,"Time":0,"Feedback":0},"output":{"Out":[{"i":3,"name":"In"}]}}],"Input/UI/Button":[{"i":5,"x":91,"y":198,"z":4,"output":{"Clicked":[{"i":7,"name":"Play"}]}},{"i":6,"x":93,"y":287,"z":5,"output":{"Clicked":[{"i":7,"name":"Pause"}]}}],"Multimedia/Player":[{"i":7,"x":399,"y":126,"z":13,"comment":"Don't forget to connect AudioNode to Destination, or you willn't hear any sound","input_d":{"Seek":0},"output":{"AudioNode":[{"i":4,"name":"In"}],"Element":[{"i":10,"name":"Source","parentId":0},{"i":17,"name":"Element","parentId":1}],"MediaStreamVideo":[{"i":9,"name":"VideoTrack","parentId":0}]},"output_sw":{"MediaStream":1},"_cable":{"Element":[{"x":763,"y":192,"branch":[{"x":775,"y":596,"branch":[{"id":0},{"id":1}]}]}],"MediaStreamVideo":[{"x":820,"y":261,"branch":[{"x":1023,"y":259,"branch":[{"id":0}]}]}]}}],"Input/UI/SliderBox":[{"i":8,"x":592,"y":663,"z":10,"data":{"0":{"value":0,"min":-100,"max":100,"step":0.1,"hideUnusedPort":false},"1":{"value":0,"min":-100,"max":100,"step":0.1},"2":{"value":1,"min":-100,"max":100,"step":0.1,"hideUnusedPort":false},"3":{"value":1,"min":-100,"max":100,"step":0.1,"hideUnusedPort":false},"4":{"value":0,"min":-100,"max":100,"step":0.1}},"output":{"0":[{"i":10,"name":"x"}],"1":[{"i":10,"name":"y"}],"2":[{"i":10,"name":"ScaleX"}],"3":[{"i":10,"name":"ScaleY"}],"4":[{"i":10,"name":"Rotate"}]}}],"Multimedia/Display/Video":[{"i":9,"x":1065,"y":298,"z":9}],"Pixi.js/Sprite":[{"i":10,"x":824,"y":612,"z":14,"output":{"Sprite":[{"i":12,"name":"Sprite"}]}},{"i":11,"x":695,"y":1084,"z":16,"input_d":{"x":0,"y":0,"ScaleX":1,"ScaleY":1,"Rotate":0}}],"Pixi.js/Display/Canvas":[{"i":12,"x":1062,"y":554,"z":6},{"i":13,"x":1019,"y":1058,"z":17,"comment":"I can render multiple sprite into one canvas. Let's give it a try by connect to GIF and a video sprice"}],"Pixi.js/Converter/GIF":[{"i":14,"x":405,"y":1096,"z":3,"input_d":{"URL":""}}],"Decoration/Group/Default":[{"i":15,"x":137,"y":925,"z":1,"data":{"width":1218,"height":414,"title":"GIF Player","color":""}},{"i":16,"x":58,"y":25,"z":0,"data":{"width":1360,"height":851,"title":"Video Player","color":""}}],"BP_Editor/LeftPanel/Preview":[{"i":17,"x":827,"y":508,"z":15}]},
};

if(localStorage.offlineSampleModule === '1'){
	for(let key in sampleList){
		let meta = sampleList[key]._;

		if(meta !== void 0)
			delete meta.moduleJS;
	}
}