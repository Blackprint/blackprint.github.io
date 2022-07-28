var through = require('through2');
var path = require('path');
var fs = require('fs');

function deepAssign(obj, path, value){
	var temp;
	for(var i = 0, n = path.length-1; i < n; i++){
		temp = path[i];

		// Disallow diving into internal JavaScript property
		if(temp === "constructor" || temp === "__proto__" || temp === "prototype")
			return;

		let ref = obj[temp] ??= {branch: {}};
		obj = ref.branch ??= {};
	}

	temp = path[i];
	if(temp === "constructor" || temp === "__proto__" || temp === "prototype")
		return;

	let ref = obj[temp] ??= {};
	ref.content = value;
	return;
}

function pipeCallback(fileName, contentCallback){
	var latestFile;
	var latestMod; // lastest modified
	var jsContents = {};

	function bufferContents(file, enc, cb) {
		// Ignore empty files
		if(file.isNull()) return cb();
		if(file.isStream()) {
			this.emit('error', new Error('Streaming not supported'));
			return cb();
		}

		// set latest file if not already set,
		// or if the current file was modified more recently.
		if(!latestMod || file.stat && file.stat.mtime > latestMod) {
			latestFile = file;
			latestMod = file.stat && file.stat.mtime;
		}

		let filePath = file.relative.slice(0, -3).split('\\').join('/').split('/');
		deepAssign(jsContents, filePath, file.contents.toString('utf8').split('\r').join(''));
		cb();
	}

	function endStream(cb) {
		if(!latestFile || jsContents.length === 0)
			return cb();

		var joinedFile = latestFile.clone({contents: false});
		joinedFile.path = path.join(latestFile.base, fileName);
		joinedFile.contents = Buffer.from(`;(function(){var store=window.bpEditorDocs=window.bpEditorDocs||{};Object.assign(store,${JSON.stringify(jsContents)})})();`, 'utf8');

		contentCallback(jsContents);
		this.push(joinedFile);
		cb();
	}

	return through.obj(bufferContents, endStream);
};

function versioning(target, prefixStart, timestamp){
	var regex = prefixStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	var data = fs.readFileSync(target, 'utf8');
	fs.writeFileSync(target, data.replace(RegExp(regex + '[0-9a-z]+', 'g'), prefixStart+timestamp), 'utf8');
}

module.exports = function(Gulp, isCI){
	if(process.argv.includes('compile')) isCI = true;
	let lastInstance = null;

	if(!isCI){
		// Get the last created instance
		let browserSync = require('browser-sync');
		let browserSyncInit = browserSync.init;
		browserSync.init = function(){
			lastInstance = browserSyncInit.apply(browserSync, arguments);
			return lastInstance;
		}
	}

	Gulp.task('default', (done)=>{done()});
	Gulp.task('build-docs', function(){
		let editorDocs;

		return Gulp.src('./editor/docs/**/*.md')
			.pipe(pipeCallback('editor-docs.js', content => {editorDocs = content}))
			.pipe(Gulp.dest('./editor/assets')).on('end', function(){
				let date = Date.now();
				versioning('./editor/dev.html', 'assets/editor-docs.js?', date);
				versioning('./editor/index.html', 'assets/editor-docs.js?', date);

				if(lastInstance != null){
					lastInstance.sockets.emit('bp-editor-docs', {contents: editorDocs});
					lastInstance.notify("Static HTML have an update");
				}
			});
	});

	let call = Gulp.series('build-docs');
	if(isCI) call(); // compile only
	else{
		call();
		Gulp.watch('./editor/docs/**/*.md', call); // watch for file changes
	}
}