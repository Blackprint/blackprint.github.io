// This only available on development mode editor (as this have eval, it can be dangerous)
if(sf.hotReload != null && location.pathname === '/dev.html' && false){ // Disable this feature for now
	sf.loader.js(['https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.js']);
	sf.parser = {
		parseTemplate(text){
			text = text.split(/^## (?<![0-9a-zA-Z\-_])/gm);
			text.shift(); // Remove comment section

			let list = [];
			for (let i=0; i < text.length; i++) {
				let temp = text[i].trim().split('\n');
				let section = temp.shift().trim().split('.');
				let attribute = section.slice(1);
				section = section[0];

				list.push({
					section,
					content: temp.join('\n'),
					attribute,
				});
			}

			return list;
		},

		cssGlobal: document.header,
		loadedCSS: {},
		async load(path, template){
			let css = this.loadedCSS[path] = '';

			if(this.cssGlobal == null){
				this.cssGlobal = $('<style type="text/css"></style>');
				$(document.head).append(this.cssGlobal);
			}

			for (let i=0; i < template.length; i++) {
				let temp = template[i];

				if(temp.section === 'html'){
					window.templates[path] = temp.content;
					window.templates = window.templates; // Trigger hot reload
				}
				else if(temp.section === 'js-global'){
					temp.content = temp.content.replace(/\#this\.path/g, JSON.stringify(path));
					eval(temp.content);
				}
				else if(temp.section === 'css-global'){
					css += '\n'+temp.content;
				}
				else if(temp.section === 'scss-global'){
					await new Promise(resolve => Sass.compile(temp.content, function(result) {
						css += '\n'+result.text;
						resolve();
					}));
				}
			}

			this.loadedCSS[path] = css;
			this.cssGlobal.text(Object.values(this.loadedCSS).join('\n'));
		},
	};
}