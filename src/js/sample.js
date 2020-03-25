var sampleImported = false;

// Sample will be imported when the 'ground' router going to '/page/:pageIndex'
function startImportSample(pageData){
	console.log("Current router data:", pageData);

	if(sampleImported)
		return;

	// This could be string instead of object
	sketch.importJSON({
		version:'0.0.1',
		'math/random':[{
			id:0, x:298, y:73, outputs:{
				Out:[{
					id:2, name:'A'
				}]
			}
		}, {
			id:1, x:298, y:239, outputs:{
				Out:[{
					id:2, name:'B'
				}]
			}
		}],
		'math/multiply':[{
			id:2, x:525, y:155, outputs:{
				Result:[{
					id:3, name:'Any'
				}]
			}
		}],
		'display/logger':[{
			id:3, x:754, y:163
		}],
	});

	// sketch.createNode('dummy/test', {x:252, y:103});
	// sketch.createNode('math/random', {x:298, y:73});
	// sketch.createNode('math/random', {x:297, y:239});
	// sketch.createNode('math/multiply', {x:525, y:155});
	sketch.createNode('button/test', {x:580, y:36});
	sketch.createNode('input/test', {x:846, y:43});
}