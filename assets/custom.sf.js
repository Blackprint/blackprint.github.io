;{async function imports(urls){if(typeof sf !== 'undefined' && sf.loader !== void 0)return await sf.loader.mjs(urls);return Promise.all(urls.map(v => import(v)));};imports.task = function(){return typeof sf !== 'undefined' && sf.loader !== void 0 ? sf.loader.task : null};;globalThis._sf1cmplr ??= {};let p_sf1cmplr = _sf1cmplr["custom.sf"] ??= {};if(!window.templates) window.templates={};var _$_ = sf.dom || sf.$;var __tmplt = window.templates;var _sf_internal = window._sf_internal = window._sf_internal || {body_map:{},_replace(path,html){let h = _$_(html);if(this.body_map[path]) this.body_map[path].remove();this.reinitViews && this.reinitViews(h);return this.body_map[path] = h;},append(path,html){_$_(document.body).append(this._replace.apply(this, arguments));},prepend(path,html){_$_(document.body).prepend(this._replace.apply(this, arguments));},};__tmplt["component/dropdown.sf"]="<drop-down class=\"dropdown-menu {{hidden}}\" style=\"\n    display: {{visible ? 'block' : 'none'}};\n    transform: translate({{ x }}px, {{ y }}px);\n  \">\n  <div class=\"first\" style=\"display: {{ !title && 'none' }}\">{{ title || '' }}</div>\n  <ul>\n    <li sf-each=\"x in options\" :class=\"{{ x.divider ? 'divider' : '' }} {{ x.disabled ? 'disabled' : '' }}\" title=\"{{ x.info || '' }}\">\n      {{@if x.title !== undefined:\n      \t{[ <a> ]} // Begin\n\n      \t// Icon on the left\n      \tif(x.icon !== void 0){\n      \t\tif(x.icon.includes('//'))\n      \t\t\t{[ <img class=\"dropdown-icon\" :src=\"{{x.icon}}\"> ]};\n      \t\telse\n      \t\t\t{[ <i class=\"dropdown-icon {{x.icon}}\"></i> ]};\n      \t}\n\n      \t// Always use { [ enclosed template ]} to avoid vulnerability\n      \t// like the text being parsed as HTML\n      \t{[ <div>{{ x.title }}</div> ]} // Content\n\n      \t// Add icon if the has deep menu\n      \tif(x.deep !== void 0)\n      \t\t{[ <i class=\"{{ root.icon.more }} has-deep\"></i> ]};\n\n      \t{[ </a> ]} // End\n      }}\n    </li>\n  </ul>\n</drop-down>";
// =====================================================================
// ============== Model <sf-m name="dropdown"></sf-m> ==================
// =====================================================================
var DropDown = sf.model('dropdown', function(My){
	My.menus = [];
	My.onCancel = void 0;
	My.className = '';
	My.pendingDeepOpen = false;
	My.pendingDeepOpen_ = 0;

	My.icon = {
		more: 'fa fa-chevron-right'
	};

	// menus: [{title, callback}, {title, deep:[{...}]}, ...]
	My.show = function(menus, { x, y, event, element, title, className }){
		// Remove last dropdown if haven't been closed
		if(My.menus.length !== 0)
			My.menus.splice(0);
		else
			addBackdrop();

		menus.title = title;

		if(element !== void 0){
			let rect = element.getBoundingClientRect();
			menus.x = rect.x + 5;
			menus.y = rect.y + rect.height;
		}
		else if(x !== void 0){
			menus.x = x;
			menus.y = y;
		}
		else{
			menus.x = event.x;
			menus.y = event.y;
			menus.event = event;
		}

		for (var i = menus.length - 1; i >= 0; i--) {
			if(menus[i].hide)
				menus.splice(i, 1);
		}

		My.className = className || '';
		My.menus.push(menus);
		return My;
	}

	My.hide = function(){
		for (var i = 0; i < My.menus.length; i++)
			My.menus.getElement(i).model.deepRemove();

		My.pendingDeepOpen = false;
		My.pendingDeepOpen_ = 0;
		My.menus.splice(0);
		removeBackdrop();

		My.className = '';
	}

	var backdropCreated = false;
	function backdropListener(ev){
		if($(ev.target).parent('sf-m')[0] === sf.Window.source(My.$el))
			return;

		removeBackdrop();

		My.hide();
		My.onCancel && My.onCancel();
	}

	var backdrop = $('<div class="ground-backdrop"></div>');
	function addBackdrop(){
		if(backdropCreated) return;

		backdrop.insertBefore(sf.Window.source(My.$el));
		setTimeout(function(){
			backdrop.addClass('show');
			$(sf.Window).on('pointerdown', backdropListener);
			$(sf.Window).once('contextmenu', ev => ev.preventDefault());
			backdropCreated = true;
		}, 10);
	}

	function removeBackdrop(){
		backdropCreated = false;
		backdrop.removeClass('show');

		setTimeout(()=> {
			backdrop.remove();
		}, 200);

		$(sf.Window).off('pointerdown', backdropListener);
	}
});

// =====================================================================
// ============== Component <drop-down></drop-down> ====================
// =====================================================================
sf.component('drop-down', {template: "component/dropdown.sf"}, function(My, include, $item){
	My.visible = false;
	My.hidden = 'hidden'; // We also need to hide it before repaint

	My.options = $item;
	My._parent = $item._parent;
	My.x = $item.x;
	My.y = $item.y;
	My.root = include('dropdown');
	My.width = 0;
	My.height = 0;
	My.disabled = $item.disabled === true;

	for (var i = $item.length - 1; i >= 0; i--) {
		if($item[i].hide)
			$item.splice(i, 1);
	}

	// First dropdown title
	My.title = $item.title;

	var currentDeepLevel, $el;
	My.init = function(){
		if($item.event !== void 0){
			var el = sf.Window.source(My.$el, $item.event);
			if(el === null) return;
			$el = $(el);
		}
		else $el = My.$el;

		My.visible = true;

		// Check position when the element rendered
		var ulElem = sf.Window.source(My.$el, $item.event).querySelector('ul');
		$.afterRepaint().then(function(){
			let x = 0, y = 0;
			let parent = My._parent;
			let w = parent !== void 0 ? parent.width : 0;

			while(parent !== void 0){
				x += parent.x;
				y += parent.y;
				parent = parent._parent;
			}

			My.width = ulElem.offsetWidth;
			My.height = ulElem.offsetHeight;

			if(x + My.x + My.width > sf.Window.focus.innerWidth)
				My.x -= My.width + w;

			if(y + My.y + My.height > sf.Window.focus.innerHeight)
				My.y -= My.height;

			My.hidden = '';
		});

		// Find nested options and add event listener on mouse hover
		var options = My.options;
		for (var i = 0; i < options.length; i++) {
			let opt = options[i];
			const elem = $(options.getElements(i));

			if(opt.deep !== void 0){
				function openDeep(ev){
					if(currentDeepLevel !== void 0)
						My.deepRemove();

					if(opt.hover !== void 0)
						opt.hover.apply(opt.context, opt.args);

					var deep = opt.deep;
					deep.event = ev;
					deep._parent = My;

					// Use the cache instead
					if(deep.el !== void 0){
						currentDeepLevel = deep.el;
						deep.el.model.y = deep.yi - (deep.ul?.scrollTop || 0);
						$el.append(deep.el);
						return;
					}

					deep.ul = My.$el.children('ul')[0];

					// Initialize position once
					deep.x = ulElem.offsetWidth;
					deep.yi = ev.target.offsetTop - 7;
					deep.y = deep.yi - (deep.ul?.scrollTop || 0);

					// Create dropdown in current sf-space
					deep.el = currentDeepLevel = new $DropDown(deep, My.$space);
					currentDeepLevel.sf$noGC = true; // Avoid framework's GC
					$el.append(currentDeepLevel);
				}

				elem.on('mouseover', function(ev){
					My.root.pendingDeepOpen = ev.target;
					clearTimeout(My.root.pendingDeepOpen_);

					My.root.pendingDeepOpen_ = setTimeout(()=> {
						if(My.root.pendingDeepOpen === ev.target)
							openDeep(ev);
					}, 200);
				});

				elem.on('click', openDeep);
				continue;
			}

			elem.on('mouseover', function(ev){
				My.root.pendingDeepOpen = ev.target;
				clearTimeout(My.root.pendingDeepOpen_);

				My.root.pendingDeepOpen_ = setTimeout(()=> {
					if(currentDeepLevel !== void 0){
						My.deepRemove();
						currentDeepLevel = void 0;
					}

					opt.hover && opt.hover.apply(opt.context, opt.args);
				}, 200);
			});

			if(opt.callback){
				elem.on('click', function(ev){
					if(opt.unhover !== void 0)
						opt.unhover.apply(opt.context, opt.args);

					opt.callback.apply(opt.context, opt.args);
					My.root.hide();
				});
			}

			if(opt.unhover){
				elem.on('mouseout', function(ev){
					opt.unhover.apply(opt.context, opt.args);
				});
			}
		}
	}

	My.deepRemove = function(){
		if(currentDeepLevel === void 0)
			return;

		currentDeepLevel.remove();
		currentDeepLevel.model.deepRemove();
	}
});
__tmplt["component/SmallNotif.sf"]="<sf-m name=\"small.notif\">\n  <div class=\"notify-container right-top\">\n    <div sf-each=\"x in list\" class=\"notify-base notify-{{ x.color }}\">\n      <span>{{ x.message }}</span>\n      <button @click=\"close(x)\" class=\"close\">×</button>\n    </div>\n  </div>\n</sf-m>";
var SmallNotif = sf.model('small.notif', function(My){
  const $ = sf.$;

  My.list = [];
  My.on$list = {
    create(el){
      $(el).animateKey('fadeInUp');
    },
    remove(el, remove){
      $(el).animateKey('fadeOutUp', remove);
      setTimeout(remove, 500); // To make sure it's removed
      return true;
    }
  };

  My.initialized = false;
  My.lazyInit = function(){
    if(My.initialized) return;
    My.initialized = true;

    if($('sf-m[name="small.notif"]').length !== 0) return;
    $('body').append($(window.templates["component/SmallNotif.sf"]));
  }

  My.add = function(message, color, delay){
    My.lazyInit();

    var item = {message, color:color || 'yellow'};
    My.list.push(item);

    if(delay !== false){
      item.timer = setTimeout(()=> {
        My.list.splice(My.list.indexOf(item), 1);
      }, delay || (1000 + 100 * message.length));
    }

    return item;
  }

  My.close = function(item){
    My.list.splice(My.list.indexOf(item), 1);
  }
});
_sf_internal.append("routes/body.sf", "<div class=\"background\">\n\t<div class=\"img\" style=\"background-image: url('/assets/img/background/black3.jpg')\"></div>\n\t<div class=\"tile\"></div>\n</div>\n\n<!-- Model on ./blackprint/header.js -->\n<sf-m name=\"header\" class=\"header {{ showOptions ? 'sketch-mode' : '' }}\">\n\t<div class=\"header-left\" @click=\"mainMenu\">\n\t\t<img src=\"/assets/img/icon/blackprint.png\">\n\t\t<div>Blackprint</div>\n\t\t<i class=\"fa fa-caret-down menu-button-hint\"></i>\n\t</div>\n\t<div class=\"header-center\">\n\t\t<div>A node to node general purpose visual programming</div>\n\t</div>\n\t<div class=\"header-menu\">\n\t\t<div class=\"item-list\">\n\t\t\t<div class=\"item\" @click=\"Modal.goto('/module-url')\" title=\"Loaded module\"><i class='fa fa-boxes'></i></div>\n\t\t\t<div class=\"item {{ cloneActive ? 'active' : '' }}\" @click=\"cloneContainer\" title=\"Clone the container for the small version\"><i class='fa fa-window-restore'></i></div>\n\t\t\t<div class=\"item {{ switchVFXActive ? 'active' : '' }}\" @click=\"switchVFX\" title=\"Improve performance by disable VFX?\"><i class=\"fas fa-rocket\"></i></div>\n\t\t\t<div class=\"item {{ visualizeActive ? 'active' : '' }}\" @click=\"visualizeFlow\" title=\"Visualize flow\"><i class=\"fas fa-bezier-curve\"></i></div>\n\t\t</div>\n\t\t<div class=\"header-zoom\">\n\t\t\t<div style=\"display: {{ info.scale === 100 ? 'none' : 'block' }}\">\n\t\t\t\t<i class=\"fas fa-search\"></i> {{ info.scale }}%\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</sf-m>\n\n<!-- Ground viewport -->\n<!-- ./src/vw-ground/router.js -->\n<vw-ground style=\"display: none\"></vw-ground>\n\n<input type=\"text\" id=\"hidden_text\" style=\"position: fixed; top: 100vh;\">\n\n<sf-m name=\"dropdown\" class=\"{{className}}\">\n  <drop-down sf-each=\"val in menus\"></drop-down>\n</sf-m>")
_sf_internal.append("model/Loading.sf", "<sf-m name=\"loading\" class=\"{{ showed && 'show' }}\">\n\t<span class=\"icon\"><i class=\"fa fa-fan fa-spin\"></i></span>\n\t<span class=\"desc\">{{ desc }}</span>\n</sf-m>")
var Loading = sf.model('loading', function(My){
	My.showed = false;
	My.desc = '';

	My.set = function(text){
		if(text && My.showed === false)
			My.showed = true;
		else My.showed = false;

		My.desc = text;
	}
});
_sf_internal.append("model/modal.sf", "<sf-m name=\"modal\" class=\"modal {{ showed && 'show' }}\">\n  <div class=\"modal-dialog\">\n    <vw-modal></vw-modal>\n  </div>\n</sf-m>")
var Modal = sf.model('modal', function(My){
	My.showed = false;

	My.init = My.hotReloaded = function(){
		My.views = sf.Views.listSelector['vw-modal'];
	}

	My.hide = function(){
		My.showed = false;
		My.$el('.modal-dialog').off('pointerup', My.hide, {outside: true});
	}

	My.goto = function(path){
		My.views.goto(path);
		My.showed = true;

		setTimeout(()=> {
			My.$el('.modal-dialog').on('pointerup', My.hide, {outside: true});
		}, 400);
	}
});
sf.model('welcome-text', function(My){
	My.toWorkspace = function(){
		if(SketchList.length === 0){
			My.openExamples();
			return;
		}

		views.goto('/sketch/1');
	}

	My.openExamples = function(){
		Modal.goto('/example-list');
	}
});
sf.model('sketch-pages', function(My){
	My.miniViewer = {
		topRight: null,
		topRightHidden: true,
		on$topRight(now){
			if(now === null)
				return My.miniViewer.topRightHidden = true;

			My.miniViewer.topRightHidden = false;
			// now => <sf-space>
			// $(now)
		}
	};
});
sf.model('custom-node-editor', function(My){
	My.content = '// After execute this, you can test it by connecting\n// Input -> Slider and Logger to this node\n\nBlackprint.registerNode(\'Test/Hello\',\nclass extends Blackprint.Node {\n\tinput = { // Port\n\t\t\'Give Input\': Number\n\t}\n\t\n\toutput = { // Port\n\t\tOut: Number\n\t}\n\n\tconstructor(instance){\n\t\tsuper(instance);\n\n\t\t// You can remove this if you want to use default node interface/HTML\n\t\tlet iface = this.setInterface(\'BPIC/Test/Hello\');\n\n\t\tiface.title = \'Add +5\';\n\t\tiface.description = \'Add 5 to any number\';\n\t}\n});\n\n// You can remove this if you\'re using default node interface/HTML\nBlackprint.Sketch.registerInterface(\'BPIC/Test/Hello\', {\n\thtml: `\n<div class="node" style="transform: translate({{ x }}px, {{ y }}px)">\n  <sf-template path="Blackprint/nodes/template/header.sf"></sf-template>\n\n  <div class="content">\n\t<div class="left-port">\n\t  <sf-template path="Blackprint/nodes/template/input-port.sf"></sf-template>\n\t</div>\n\t\n\t<div style="display: inline-block; color: yellow">\n\t\t{{ log }}\n\t</div>\n    \n\t<div class="right-port">\n\t  <sf-template path="Blackprint/nodes/template/output-port.sf"></sf-template>\n\t</div>\n  </div>\n</div>`\n}, class extends Blackprint.Interface {\n\tconstructor(node){\n\t\tsuper(node);\n\n\t\t// When using cloned container, this constructor could be called 2 times\n\t\tthis.log ??= 0;\n\t}\n\n\t// HTML/Interface Init\n\tinit(el){\n\t\tlet iface = this;\n\t\t\n\t\tconst {\n\t\t\tIInput, IOutput, IProperty, // Port interface (event, utils, etc)\n\t\t\tInput, Output, Property, // Node Port (get/set value)\n\t\t} = iface.const;\n\n\t\tIInput[\'Give Input\'].off(\'value\').on(\'value\', function(target){\n\t\t\tiface.log = target.value + 5; // Give Input -> {{ log }}\n\t\t\tOutput.Out = target.value + 5; // Give Input -> Out\n\t\t});\n\t}\n\n\t// Run init again to hot reload this node\n\thotReloaded(){\n\t\tthis.init();\n\t}\n\n\t// When this node UI was cloned somewhere\n\t// You can reinit some HTML element if needed\n\tinitClone(el){}\n});';

	My.init = async function(){
		if(window.monaco === void 0){
			await sf.loader.js(['https://cdn.jsdelivr.net/npm/@monaco-editor/loader@1.1.1/lib/umd/monaco-loader.min.js']);
			await monaco_loader.init();
		}

		My.container = My.$el('.editor');
		My.recreate();
	}

	My.recreate = function(){
		if(window.monaco === void 0) return;
		if(My.editor) return;

		My.editor && My.editor.dispose();

		setTimeout(()=> {
			let statusEl = My.container.find('.bp-loading-status');

			My.editor = monaco.editor.create(My.container[0], {
				value: My.content,
				language: 'javascript',
				theme: 'vs-dark',
				minimap: { enabled: false }
			});

			statusEl.css('display', 'none');
		}, 1000);
	}

	My.run = function(){
		eval(My.editor.getValue());
	}

	My.close = function(){
		Modal.hide();

		My.editor.dispose();
		My.editor = null;
		modal.goto('/');

		My.container.find('.bp-loading-status').css('display', '');
	}
});
sf.model('modal-dev-mode', function(My){
	My.url = localStorage.BPModuleServer ??= "";
	My.placeholder = location.origin;

	// Automatically move to development mode
	if(location.hostname === 'localhost' && location.pathname !== "/dev.html"){
		location.pathname = "/dev.html";
		return;
	}

	My.connectDefault = function(){
		localStorage.BPModuleServer = My.url = "";
		My.changeServer();
	}

	My.changeServer = async function(){
		let url = My.url;
		if(!url) url = location.origin;
		// url = 'http://localhost:6791';

		let _url = url;

		if(url.slice(-1) === '/')
			url = url.slice(0, -1);
		url += '/browser-sync';

		if(window.___browserSync___ === void 0){
			try{
				await sf.loader.js([url+'/browser-sync-client.js?v=2']);
			} catch(e) {
				SmallNotif.add("Failed to load client", "red");
				return;
			}
		}

		___browserSync___.socketUrl = url;

		let socket = ___browserSync___.socket;
		socket.disconnect();

		setTimeout(()=> {
			if(socket.connected) return;
			console.log("Failed to connect to Blackprint module server:", url);
			SmallNotif.add("Failed to connect to Blackprint module server", "red");
			socket.disconnect();
			socket.off('connect', onConnected);
		}, 8000);

		function onConnected(){
			console.log("Connected to Blackprint module server:", url);
			SmallNotif.add("Connected to Blackprint module server", "green");
			localStorage.BPModuleServer = My.url;
		}

		socket.once('connect', onConnected);

		socket.nsp = '/browser-sync';
		socket.io.uri = url;
		socket.connect();

		let newModuleLoaded = false;
		try{
			let moduleList = Object.values(await $.getJSON(_url+'/api/module-list'));
			for (var i = 0; i < moduleList.length; i++)
				moduleList[i] = _url+moduleList[i];

			if(moduleList.length !== 0){
				SmallNotif.add(`Loading ${moduleList.length} new modules`, "yellow");

				await Blackprint.loadModuleFromURL(moduleList, {
					loadBrowserInterface: true
				});

				SmallNotif.add(`New modules have been loaded`, "green");
			}

			newModuleLoaded = true;
		} catch(e) {
			SmallNotif.add(`Failed to load new modules`, "red");
			throw e;
		}

		setTimeout(()=> {
			if(newModuleLoaded) return;
			SmallNotif.add(`Loading modules was taking longer than 10s`, "red");

			if(sf.loader.pendingResources.size !== 0)
				console.log("Pending resources:", sf.loader.pendingResources);
		}, 10000);

		if(Modal.showed)
			Modal.hide();
	}

	if(My.url !== '' && sf.hotReload !== void 0){
		$(function(){
			setTimeout(()=> My.changeServer(), 200);
		});
	}
});
sf.model('environment-variables', function(My){
	My.list = Blackprint.Environment.list;
	My.newValue = '';
	My.newKey = '';

	// Blackprint.Environment.import([{key: 'TEST', value:'123'}]);

	My.v2m$newKey = function(now){
		now = My.validateKey(now);

		if(now.length !== 0){
			Blackprint.Environment.set(now, My.newValue);
			My.newKey = My.newValue = '';
			caretFocusOnLastItem();
		}

		return '';
	}

	function caretFocusOnLastItem(){
		$('input', My.list.getElement(My.list.length-1))[0].focus();
	}

	My.itemChanged = function(item){
		refreshEnvironment();

		if(item.key.length === 0 && (Number.isNaN(item.value) || !item.value)){
			My.list.splice(My.list.indexOf(item), 1);
			caretFocusOnLastItem();
			return;
		}
	}

	let _refreshEnvironment = 0;
	function refreshEnvironment(){
		clearTimeout(_refreshEnvironment);
		_refreshEnvironment = setTimeout(function(){
			let { map, list } =  Blackprint.Environment;
			let uniq = new Set();

			// Assign the value of each list on the map
			for (var i = 0; i < list.length; i++) {
				let item = list[i];
				map[item.key] = item.value;
				uniq.add(item.key);
			}

			// Remove key that not exist on the list
			for(let key in map){
				if(!uniq.has(key))
					Blackprint.Environment.delete(key, true);
			}
		}, 1000);
	}

	My.validateKey = function(value){
		return value.replace(/[ \-]+/gm, '_').replace(/\W+/gm, '').replace(/^[0-9]+/gm, '').toUpperCase();
	}

	My.close = function(){
		Modal.hide();
		modal.goto('/');
	}
});
sf.model('example-list', function(My){
	My.list = [];

	My.open = function(key){
		let obj = sampleList[key];
		for (var i = 0; i < SketchList.length; i++)
			SketchList[i].clearNodes();

		Modal.hide();

		let sketch = SketchList[0] ??= new Blackprint.Sketch();
		sketch.__importing = true;

		SketchImporter.pendingLoad = obj;
		SketchImporter.importNow();
	}
});
sf.model('module-url', function(My){
	My.list = Blackprint._modulesURL;
	My.newURL = '';

	My.init = async function(){
		// First initialization cycle
	}

	My.shortenLink = function(url, which){
		url = new URL(url);

		if(which === 'search')
			return url.search;

		if(which === 'host')
			return url.host || location.host;

		return url.pathname.replace(/(cjs|mjs|dist)\/|\.(min|mjs|js)/g, '').split('/').slice(-2).join('/');
	}

	My.addURL = function(){
		let list = My.list;

		for (var i = 0; i < list.length; i++) {
			let temp = list[i];
			if(My.newURL === temp._url)
				return;

			if(My.newURL.replace(/\?.*?$/m, '') === temp._url.replace(/\?.*?$/m, '')){
				temp._url = My.newURL.replace(/\?.*?$/m, '');
				Blackprint.loadModuleFromURL(temp._url);
				My.newURL = '';
				return;
			}
		}

		let url = My.newURL.replace(/\?.*?$/m, '') + '?'+ (Date.now()/1000|0);
		My.newURL = '';

		Blackprint.loadModuleFromURL(url, {
			loadBrowserInterface: true // Also load the related .sf.js and .sf.css if exist
		});
	}

	My.reloadURL = function(item){
		if(/\?[0-9]/.test(item._url))
			item._url = item._url.replace(/\?([0-9]+)/, (full, num) => '?'+(1+Number(num)));
		else if(item._url.includes('?'))
			item._url = item._url.replace(/\?.*?$/m, '')+'?1';
		else item._url += '?1';

		Blackprint.loadModuleFromURL(item._url);
	}

	My.hideFromURL = function(item){
		let url = item._url.replace(/\?.*?$/m, '');
		let temp = Blackprint.modulesURL[url];

		let hidden = item._hidden = !item._hidden;

		diveModuleURL(temp, function(deepObject, deepProp, keys, bubble){
			deepObject[deepProp].hidden = hidden;

			// Bubbling check if the parent has no child anymore
			for (var i = bubble.length-1; i >= 0; i--) {
				let ref = bubble[i];

				if(--ref.val._visibleNode <= 0){
					if(i === 0){
						Blackprint.nodes[keys[0]].hidden = hidden;
						break;
					}

					let parent = bubble[i-1];
					parent.val[ref.key].hidden = hidden;
				}
				else break;
			}
		});
	}

	My.deleteFromURL = function(item){
		let list = My.list;
		var index = list.indexOf(item);

		if(index === -1) return;
		let url = item._url.replace(/[?#].*?$/m, '');

		diveModuleURL(Blackprint.modulesURL[url], function(deepObject, deepProp, keys, bubble){
			delete deepObject[deepProp];

			// Bubbling check if the parent has no child anymore
			for (var i = bubble.length-1; i >= 0; i--) {
				let ref = bubble[i];

				if(--ref.val._length <= 0){
					if(i === 0){
						delete Blackprint.nodes[keys[0]];
						break;
					}

					let parent = bubble[i-1];
					delete parent.val[ref.key];
				}
				else break;
			}
		});

		let styles = document.styleSheets;
		let simplifiedURL = url.replace(/\.(sf|js|css|min|mjs)/g, '');

		for (var i = 0; i < styles.length; i++) {
			let style = styles[i];
			if(style.href == null) continue;

			let temp = style.href.replace(/[?#].*?$/m, '').replace(/\.(sf|js|css|min|mjs)/g, '');
			if(temp === simplifiedURL){
				style.ownerNode.remove();
				break;
			}
		}

		delete Blackprint.modulesURL[url];
		list.splice(index, 1);
	}

	function diveModuleURL(moduleInfo, onBubbling){
		that:for(let key in moduleInfo){
			if(key.slice(0, 1) === '_')
				continue;

			key = key.split('/');
			let prop = key.pop();

			// Dive
			let obj = Blackprint.nodes;
			let bubble = new Array(key.length);
			for (var i = 0; i < key.length; i++){
				let k = key[i];
				obj = obj[k];
				bubble[i] = {key:k, val:obj};
				if(obj == null) continue that;
			}

			onBubbling(obj, prop, key, bubble);
		}
	}

	My.npmList = function(){
		modal.goto('/npm-packages');
	}

	My.close = function(){
		Modal.hide();
		modal.goto('/');
	}
});
var SketchImporter = sf.model('sketch-importer', function(My){
	My.modules = [];
	My.nodes = [];
	My.pendingLoad = void 0;
	My.savedKeys = {
		localStorage:[],
		sessionStorage:[],
		environmentVariables:[],
		sketchPages:[],
	};

	let progressToast = false;
	let progressTriggered = true;

	My.loadJSON = async function(json){
		Modal.goto('/sketch-importer');
		My.pendingLoad = json = JSON.parse(json);

		let metadata = json._;
		My.modules = metadata.moduleJS || [];

		My.nodes = [];
		for(let key in json){
			if(key === '_') continue;

			My.nodes.push({name: key, count: json[key].length});
		}

		My.checkSavedData();
	}

	My.importNow = function(){
		if(My.pendingLoad === void 0){
			let msg = "Please call 'SketchImport.loadJSON' first";
			console.error(msg);

			SmallNotif.add(msg, 'yellow');
			return false;
		}

		Modal.hide();

		let sketch = SketchList[0] ??= new Blackprint.Sketch();
		sketch.__importing = true;

		async function pageShowed(){
			sf.loader.DOMWasLoaded = false; // flag because we may load new module

			// Add listener only once until finish
			if(progressTriggered){
				sf.loader.onProgress(function(loaded, total){
					progressToast.message = `Loading ${loaded}/${total}`;
					progressTriggered = true;
				});
			}

			// Import from JSON, and also load required modules if exist
			try{
				await sketch.importJSON(My.pendingLoad);
			} catch(e) {
				SmallNotif.add("Failed to import data", 'red');
				throw e;
			} finally {
				sf.loader.DOMWasLoaded = true;
				delete sketch.__importing;
				My.pendingLoad = void 0;
			}

			// Clear toast
			let list = SmallNotif.list;
			list.splice(list.indexOf(progressToast), 1);
		}

		if(views.currentPath === '/sketch/1'){
			progressToast = SmallNotif.add("Loading", 'yellow', false);
			return setTimeout(pageShowed, 400);
		}

		views.goto('/sketch/1');
		progressToast = SmallNotif.add("Loading", 'yellow', false);
		setTimeout(pageShowed, 1000); // Wait page animation
	}

	My.checkSavedData = function(){
		My.savedKeys.localStorage = Object.keys(localStorage);
		My.savedKeys.sessionStorage = Object.keys(sessionStorage);
		My.savedKeys.environmentVariables = Object.keys(Blackprint.Environment.map);
		My.savedKeys.sketchPages = SketchList;
	}

	My.clear = {
		localStorage(){
			let keys = Object.keys(localStorage);

			for(let i=0; i < keys.length; i++)
				delete localStorage[keys[i]];

			My.savedKeys.localStorage = Object.keys(localStorage);
		},
		sessionStorage(){
			let keys = Object.keys(sessionStorage);

			for(let i=0; i < keys.length; i++)
				delete sessionStorage[keys[i]];

			My.savedKeys.sessionStorage = Object.keys(sessionStorage);
		},
		environmentVariables(){
			let ref = Blackprint.Environment;
			let keys = Object.keys(ref.map);

			for(let i=0; i < keys.length; i++)
				ref.delete(keys[i]);

			My.savedKeys.environmentVariables = Object.keys(Blackprint.Environment.map);
		},
		sketchPages(){
			for (var i = 0; i < SketchList.length; i++)
				SketchList[i].destroy();

			SketchList.splice(1);
			views.goto('/sketch/1');
		}
	};
});
// Blackprint.space = Space (https://github.com/ScarletsFiction/ScarletsFrame/wiki)
// sketch.scope = shortcut to obtain your model scope/context
var SketchList = [];
sf.component('sketch-page', function(My){
	// URL: #page/sketch/{data.page}
	let sketch = My.sketch = SketchList[views.data.page - 1] ??= new Blackprint.Sketch();
	sketch.page = My;

	// Please use sketch.on('...', callback) instead
	// This is used if no one listened to the event
	sketch._event.$_fallback = BlackprintEventFallback;

	sketch.settings('visualizeFlow', true);
	My.space ??= sketch.cloneContainer();

	let SketchPages = sf.model('sketch-pages');
	let container = sketch.scope('container');
	let header = sf.model('header');

	container.onScale = function(scale){
		header.info.scale = Math.round(scale * 100);
	}

	// Will run when <sketch-page> inserted on DOM
	My.init = async function(){
		let sfm = $(My.space.firstElementChild);
		if(!sfm.eq(0).hasClass('bg-tile')){
			sfm.prepend('<div class="bg-tile"></div>');
		}
	}

	My.importJSON = json => sketch.importJSON(json);
	My.clearNodes = ()=> sketch.clearNodes();

	My.cloneActive = false;
	My.cloneContainer = function(){
		My.cloneActive = !My.cloneActive;

		if(My.cloneActive){
			if(My.switchVFXActive === false)
				My.switchVFX();

			// Reset current container view
			var container = sketch.scope('container');
			container.pos.x = 0;
			container.pos.y = 0;
			container.scale = 1; // 100% scale

			var mini;
			if(container.minimap)
				mini = container.minimap;
			else{
				mini = sketch.cloneContainer(true); // Clone and get the MiniMap

				// Remove the dropdown from minimap
				$('sf-m[name="dropdown"]', mini).remove();
			}

			// Clone into new window
			new sf.Window({
				title: "Cloned Sketch Container",
				templateHTML: sketch.cloneContainer() // Clone 2
			}, refreshViewport);

			// Put the mini container into DOM
			SketchPages.miniViewer.topRight = mini;

			// Refresh mini viewport size
			// I put it like this for a reason
			refreshViewport();
			function refreshViewport(){
				setTimeout(function(){
					container.pos.x = -0.1;
					setTimeout(function(){
						container.pos.x = 0;
					}, 500);
				}, 1000);
			}
		}
		else{
			SketchPages.miniViewer.topRight = null;
			sf.Window.destroy();
		}
	}

	sketch.on('node.menu', function({ iface, menu }){
		menu.unshift({
			title: !iface.id ? "Add ID" : "Modify ID",
			async callback(){
				let val = await Swal.fire({
					title: "Write the new ID here",
					text: (iface.id ? "Current ID: "+iface.id : void 0),
					input: "text",
				});

				if(val.isConfirmed === false) return;
				iface.id = val.value;
			}
		});
	});
});
sf.model('npm-packages', function(My){
	let query = 'https://registry.npmjs.org/-/v1/search?text=blackprint%20nodes';
	My.list = [];
	My.search = '';

	My.init = function(){
		My.refreshList();
	}

	My.refreshList = async function(){
		let _query = query;
		if(My.search !== '')
			_query += '%20'+My.search;

		let list = (await $.getJSON(_query)).objects;

		// ToDo: check if version was different with current loaded module
		let temp = Blackprint.modulesURL;
		for(let key in temp){
			for (var i = 0; i < list.length; i++) {
				let item = list[i].package.name;
				if(key.includes(item.url))
					item.package.active = true;
			}
		}

		My.list = list;
	}

	My.open = async function(package){
		try{
			// ToDo: do we need to sanitize URL? '-'
			var data = await $.get(`https://cdn.jsdelivr.net/npm/${package.name}@${package.version}/README.md`);
		} catch(e) {}

		if(!data) throw new Error("Can't find package's README.md");

		let list = [];
		data.replace(/(\/dist\/.*?)['"`\\ %]/g, function(full, match){
			list.push({url: match});
		});

		sf.model('npm-package-info').open(package, list);
	}
});
sf.model('npm-package-info', function(My){
	My.list = [];
	My.title = '';
	My.description = '';
	My.version = '';
	My.author = '';
	My.date = '';
	My.repository = '';
	My.packageURL = '';
	My.package = 0;

	My.open = function(package, moduleList){
		My.list = moduleList;
		My.package = package;
		My.title = package.name;
		My.description = package.description || '';
		My.version = package.version;
		My.date = package.date.split('T')[0];
		My.author = package.publisher.username || '';
		My.repository = package.links.repository || '';

		My.packageURL = `https://cdn.jsdelivr.net/npm/${package.name}@${package.version}`;

		let temp = Blackprint.modulesURL;
		let list = My.list;
		for(let key in temp){
			for (var i = 0; i < list.length; i++) {
				let item = list[i];
				if(key.includes(item.url))
					item.active = true;
			}
		}

		Modal.goto('/npm-package-info');
	}

	let progressToast, loading = false;
	function theProgress(finished){
		if(finished){
			if(!progressToast) return;

			let list = SmallNotif.list;
			list.splice(list.indexOf(progressToast), 1);

			progressToast = false;
			return;
		}

		progressToast = SmallNotif.add("Loading", 'yellow', false);
		sf.loader.onProgress(function(loaded, total){
			if(!progressToast) return;
			progressToast.message = `Loading ${loaded}/${total}`;
		});
	}

	My.load = async function(item){
		sf.loader.DOMWasLoaded = false; // flag because we may load new module
		loading = true;

		setTimeout(function(){
			if(loading) theProgress();
		}, 500);

		try{
			await Blackprint.loadModuleFromURL([My.packageURL + item.url], {
				loadBrowserInterface: true // set to "false" for Node.js/Deno
			});
		} finally {
			sf.loader.DOMWasLoaded = true;
			loading = false;
		}

		item.active = true;
		My.package._active = true;

		// Clear toast
		theProgress(true);
	}

	My.back = function(){
		Modal.goto('/npm-packages');
	}
});
sf.Views._$edit("vw-ground", [{path:"/sketch",html: "<sf-m name=\"sketch-pages\">\n\t<!-- /src/routes/+vw-ground/sketch.sf -->\n\t<vw-page></vw-page>\n\n\t<div class=\"mini-blackprint disable-effect {{ miniViewer.topRightHidden && 'hidden' }}\">\n\t\t<sf-slot for=\"miniViewer.topRight\"></sf-slot>\n\t</div>\n</sf-m>",
	on:{
		showed(){
			// Show sketch options
			sf.model('header').showOptions = true;
		},
		hidden(){
			sf.model('header').showOptions = false;
		}

		/*
		showed: Sketch container have been loaded,
		coming: The cable would have wrong position because the DOM still hidden,
		leaving: Maybe we can uninitialize something,
		hidden: Animate something maybe
		*/
	}
,"vw-page":[{path:"/:page",html: "<sketch-page>\n\t<div class=\"bottom-message\">This editor still in development (≧▽≦)／<br>\nI want to make it better and easier to use.<br>\nPlease use right click to open drop down menu for the cable, node, container, or port.</div>\n\n\t<!-- This element will be replaced with 'My.space' -->\n\t<sf-slot for=\"space\"></sf-slot>\n</sketch-page>",
	on:{
		coming(data){ // data === views.data
			console.log("Sketch page data:", data);
			let sketch = SketchList[data.page - 1];

			sf.model('header').cloneActive = sketch.page.cloneActive;
		},
		showed(){
			setTimeout(()=> {
				if(SketchList.length === 1 && SketchList[0].ifaceList.length === 0){
					if(SketchList[0].__importing) return;
					Modal.goto('/example-list');
				}
			}, 100);

			$('body > .background .tile').css('display', 'none');
		},
		leaving(){
			console.log("Leaving from sketch page data:", arguments);
			$('body > .background .tile').css('display', '');
		}
	}
}]},{path: "/getting-started", html: "Preparing this file for the future example"},{path: "/", html: "<!-- Filling the default page if haven't being routed -->\n<sf-m name=\"welcome-text\" class=\"welcome-text\">\n\t<h1>Welcome to Blackprint Editor!</h1>\n\t<div class=\"description\">This editor haven't being designed for mobile screen.</div>\n\t<div class=\"content\">\n\t\t<div class=\"item\" @click=\"toWorkspace\">\n\t\t\t<i class=\"fas fa-torii-gate\"></i> Go to sketch page\n\t\t</div>\n\t\t<div class=\"item\" @click=\"openExamples\">\n\t\t\t<i class='fa fa-map-signs'></i> <span>Open examples</span>\n\t\t</div>\n\t\t<div class=\"item\" style=\"cursor: default\">\n\t\t\t<i class='fa fa-book-open'></i> <span style=\"text-decoration: line-through\">Learn from editor</span>\n\t\t</div>\n\t</div>\n\n\t<div class=\"available-engine\">\n\t\t<div class=\"title\">Blackprint Engine also available for:</div>\n\t\t<div class=\"list\">\n\t\t\t<!-- python, csharp, java/kotlin, cplusplus, go, rust, docker -->\n\t\t\t<!-- css3, html5 -->\n\t\t\t<a class=\"item\" href=\"https://github.com/Blackprint/engine-js\" target=\"_blank\">\n\t\t\t\t<img src=\"/assets/img/icon/denojs.svg\">\n\t\t\t\t<div class=\"name\">Deno</div>\n\t\t\t</a>\n\t\t\t<a class=\"item\" href=\"https://github.com/Blackprint/engine-js\" target=\"_blank\">\n\t\t\t\t<img src=\"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/icons/nodejs/nodejs-plain.svg\">\n\t\t\t\t<div class=\"name\">Node.js</div>\n\t\t\t</a>\n\t\t\t<a class=\"item\" href=\"https://github.com/Blackprint/engine-php\" target=\"_blank\">\n\t\t\t\t<img src=\"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/icons/php/php-plain.svg\">\n\t\t\t\t<div class=\"name\">PHP</div>\n\t\t\t</a>\n\t\t\t<a class=\"item\" href=\"https://github.com/Blackprint/engine-go\" target=\"_blank\">\n\t\t\t\t<img src=\"https://cdn.jsdelivr.net/gh/devicons/devicon@2.14.0/icons/go/go-original-wordmark.svg\">\n\t\t\t\t<div class=\"name\">Golang</div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n</sf-m>\n\n<div class=\"welcome-left\">\n\t<a target=\"_blank\" href=\"https://ko-fi.com/stefansarya\">\n\t\t<i class=\"fas fa-mug-hot\"></i> Ko-fi\n\t</a>\n\t<a target=\"_blank\" href=\"https://github.com/Blackprint/Blackprint\">\n\t\t<i class=\"fab fa-github\"></i> GitHub\n\t</a>\n\t<a target=\"_blank\" href=\"https://stefansarya.gitbook.io/blackprint\">\n\t\t<i class=\"fa fa-book-open\"></i> Documentation\n\t</a>\n\t<a target=\"_blank\" href=\"https://github.com/Blackprint/Blackprint/discussions\">\n\t\t<i class=\"fa fa-comments\"></i> Discussions\n\t</a>\n</div>\n\n<div class=\"welcome-right\">\n\t<a target=\"_blank\" style=\"cursor: pointer;\" onclick=\"Modal.goto('/npm-packages')\">\n\t\tPackage List <i class=\"fas fa-boxes\"></i>\n\t</a>\n\t<a target=\"_blank\" href=\"https://www.npmjs.com/search?q=keywords:blackprint\">\n\t\tnpm.js <i class=\"fas fa-box\"></i>\n\t</a>\n</div>"}]);sf.Views._$edit("vw-modal", [{path:"/", html:"'index.sf' was not found"},{path:"/custom-node-editor",html: "<sf-m name=\"custom-node-editor\">\n\t<div class=\"editor\" @keydown.ctrl.Enter.prevent=\"run\">\n\t\t<div class=\"bp-loading-status\" style=\"color: white; padding: 20px\">Loading Monaco Editor...</div>\n\t</div>\n\t<div class=\"menu\">\n\t\t<div class=\"item\" @click=\"run\" title=\"Execute (Ctrl + Enter)\"><i class=\"fa fa-play\"></i></div>\n\t\t<div class=\"item\" @click=\"Modal.hide()\" title=\"Minimize\"><i class=\"fa fa-window-minimize\"></i></div>\n\t\t<div class=\"item\" @click=\"close\" title=\"Close\"><i class=\"fa fa-times\"></i></div>\n\t</div>\n</sf-m>",
	on:{
		showed(){
			let model = sf.model('custom-node-editor');
			model.recreate();
		}
	}
},{path:"/dev-mode",html: "<sf-m name=\"modal-dev-mode\">\n\t<div class=\"description\">Please set the Blackprint module server URL</div>\n\t<div class=\"note\" style=\"display: {{ url === '' || url === placeholder ? 'none':'' }}\" @click=\"connectDefault\">(Click here to connect to default server)</div>\n\t<div class=\"text-input\">\n\t\t<input placeholder=\"{{ placeholder }}\" type=\"text\" sf-bind=\"url\" @keyup.Enter=\"changeServer\">\n\t</div>\n\t<div class=\"button-import\" @click=\"changeServer\">Connect</div>\n</sf-m>",
	on:{
		coming(){
			setTimeout(()=> {
				sf.model('modal-dev-mode').$el('input').focus();
			}, 500);
		},
		showed(){
			setTimeout(()=> {
				sf.model('modal-dev-mode').$el('input').focus();
			}, 100);
		},
	}
},{path: "/environment-variables", html: "<sf-m name=\"environment-variables\">\n\t<div class=\"title\">Environment Variables</div>\n\t<div class=\"head\">\n\t\t<div class=\"row\">Key</div>\n\t\t<div class=\"row\">Value</div>\n\t</div>\n\t<div class=\"content\">\n\t\t<div>\n\t\t\t<div class=\"row\" sf-each=\"x in list\" @keyup=\"itemChanged(x)\">\n\t\t\t\t<input class=\"column key\" type=\"text\" @input=\"(this.value = x.key = validateKey(this.value))\" sf-bind=\"x.key\" placeholder=\"...\">\n\t\t\t\t<input class=\"column\" type=\"text\" sf-bind=\"x.value\" placeholder=\"...\">\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<input class=\"column key\" type=\"text\" @input=\"this.value = newKey = validateKey(this.value)\" sf-bind=\"newKey\" placeholder=\"Add new key...\">\n\t\t\t<input class=\"column\" type=\"text\" sf-bind=\"newValue\" placeholder=\"...\">\n\t\t</div>\n\t</div>\n\t<div class=\"menu\">\n\t\t<div class=\"item\" @click=\"close\" title=\"Close\"><i class=\"fa fa-times\"></i></div>\n\t</div>\n</sf-m>"},{path:"/example-list",html: "<sf-m name=\"example-list\">\n\t<div class=\"description\">Please select one of these example (<a href=\"https://github.com/Blackprint/blackprint.github.io/blob/develop/src/global/sampleList.js\">source</a>)</div>\n\t<div class=\"list\">\n\t\t<div class=\"item\" sf-each=\"x in list\" @click=\"open(x)\">\n\t\t\t{{ x }}\n\t\t</div>\n\t</div>\n</sf-m>",
	on:{
		coming(){
			sf.model('example-list').list = Object.keys(sampleList);
		}
	}
},{path: "/module-url", html: "<sf-m name=\"module-url\">\n\t<div class=\"head\">\n\t\t<div class=\"row url\">Shortened Module URL</div>\n\t\t<div class=\"row nodes\">Nodes</div>\n\t\t<div class=\"row actions\">Actions</div>\n\t</div>\n\t<div class=\"content\">\n\t\t<div>\n\t\t\t<div class=\"row\" sf-each=\"x in list\">\n\t\t\t\t<div class=\"column url\"><div>\n\t\t\t\t\t<b>{{ shortenLink(x._url, 'host') }}</b>\n\t\t\t\t\t{{ shortenLink(x._url, 'path') }}\n\t\t\t\t\t<b>{{ shortenLink(x._url, 'search') }}</b>\n\t\t\t\t\t<a title=\"Right click to copy link address, click to open on new tab\" target=\"_blank\" href=\"{{x._url}}\"><i class=\"fa fa-link\"></i></a>\n\t\t\t\t</div></div>\n\t\t\t\t<div class=\"column nodes\">\n\t\t\t\t\t{{ x._nodeLength }}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"column actions\">\n\t\t\t\t\t<button title=\"Show this module on dropdown/module list\" @click=\"hideFromURL(x)\">\n\t\t\t\t\t\t <i class=\"fa fa-list\"></i>\n\t\t\t\t\t\t <i class=\"fa fa-slash\" style=\"\n\t\t\t\t\t\t    position: absolute;\n\t\t\t\t\t\t    margin-left: -15px;\n\t\t\t\t\t\t    display: {{ x._hidden ? 'inline-block' : 'none' }}\n\t\t\t\t\t\t\"></i>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button title=\"Reload this module again from URL\" @click=\"reloadURL(x)\">\n\t\t\t\t\t\t<i class=\"fa fa-sync\"></i>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button title=\"Remove any related nodes and also remove this module\" @click=\"deleteFromURL(x)\">\n\t\t\t\t\t\t<i class=\"fa fa-trash\"></i>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<input class=\"column url-input\" type=\"text\" @keyup.Enter=\"addURL()\" sf-bind=\"newURL\" placeholder=\"Add module from URL here... (Then press enter)\">\n\t\t</div>\n\t</div>\n\t<div class=\"menu\">\n\t\t<div class=\"item\" @click=\"close\" title=\"Close\"><i class=\"fa fa-times\"></i></div>\n\t\t<div class=\"item\" @click=\"npmList\" title=\"Search from NPM\"><i class=\"fa fa-book-open\"></i></div>\n\t</div>\n</sf-m>"},{path: "/sketch-importer", html: "<sf-m name=\"sketch-importer\">\n\t<div class=\"description\" title=\"To avoid any risks if you have stored sensitive data on this editor, make sure you have verify the author of the nodes and the JSON to be imported.\">Please verify the author before importing</div>\n\t<div class=\"info-modules\">\n\t\t<div class=\"title\">These modules will be imported:</div>\n\t\t<ul class=\"list\">\n\t\t\t<li class=\"item\" sf-each=\"x in modules\">\n\t\t\t\t{{ x }}\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div class=\"info-nodes\">\n\t\t<div class=\"title\">These nodes will be used:</div>\n\t\t<ul class=\"list\">\n\t\t\t<li class=\"item\" sf-each=\"x in nodes\">\n\t\t\t\t{{ x.name }} ({{ x.count }})\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div class=\"info-clear\">\n\t\t<div class=\"title\">Please be careful if you saved any sensitive data<br>Click to clear the saved data:</div>\n\t\t<!-- Hi! can you contribute for clearing browser data like WebSQL or IndexedDB? -->\n\t\t<div class=\"button-clear\">\n\t\t\t<div @click=\"clear.localStorage\">\n\t\t\t\tLocal Storage ({{ savedKeys.localStorage.length }})\n\t\t\t</div>\n\t\t\t<div @click=\"clear.sessionStorage\">\n\t\t\t\tSession Storage ({{ savedKeys.sessionStorage.length }})\n\t\t\t</div><br>\n\t\t\t<div @click=\"clear.environmentVariables\">\n\t\t\t\tEnvironment Variables ({{ savedKeys.environmentVariables.length }})\n\t\t\t</div>\n\t\t\t<div @click=\"clear.sketchPages\">\n\t\t\t\tSketch Pages ({{ savedKeys.sketchPages.length }})\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"button-import\" @click=\"importNow\">\n\t\tImport Sketch\n\t</div>\n</sf-m>"},{path:"/npm-packages",html: "<sf-m name=\"npm-packages\">\n\t<div class=\"description\">Search package on NPM repository</div>\n\t<div class=\"mini-description\" title=\"especially if you're not a developer, always becareful if someone ask you to do something with Blackprint, like inputting password or private key\">Always becareful and verify the module's source code before going to production</div>\n\t<div class=\"search\">\n\t\t<input type=\"text\" sf-bind=\"search\" @keyup.Enter=\"refreshList\" placeholder=\"Search...\">\n\t</div>\n\t<div class=\"list\">\n\t\t<div class=\"item {{ x.package._active && 'active' }}\" sf-each=\"x in list\" @click=\"open(x.package)\">\n\t\t\t<div>\n\t\t\t\t<div class=\"title\">{{ x.package.name }} (v{{ x.package.version }})</div>\n\t\t\t\t<div class=\"author\">{{ x.package.publisher.username }}</div></div>\n\t\t\t<div>\n\t\t\t\t<div class=\"description\">{{ x.package.description }}</div>\n\t\t\t\t<div class=\"date\">{{ x.package.date.split('T')[0] }}</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</sf-m>",
	on:{
		coming(){
			// sf.model('npm-packages').list = Object.keys(sampleList);
		}
	}
},{path: "/npm-package-info", html: "<sf-m name=\"npm-package-info\">\n\t<div class=\"title\">{{ title }} (v{{ version }})</div>\n\t<div class=\"info\"><span>{{ author }}</span> <a style=\"display: {{ repository ? '' : 'none' }}\" href=\"{{ repository }}\" target=\"_blank\">(Repository)</a></div>\n\t<div class=\"description\">{{ description }}</div>\n\n\t<div class=\"list-info\">Please select module to import:</div>\n\t<div class=\"list\">\n\t\t<div class=\"item {{ x.active ? 'active' : '' }}\" sf-each=\"x in list\" @click=\"load(x)\">\n\t\t\t{{ x.url }}\n\t\t</div>\n\t</div>\n\t<div class=\"menu\">\n\t\t<div class=\"item\" @click=\"back\" title=\"Back\"><i class=\"fa fa-reply\"></i></div>\n\t</div>\n</sf-m>"}]);;Object.assign(p_sf1cmplr,{DropDown,SmallNotif,Loading,Modal,SketchImporter,SketchList});};
//# sourceMappingURL=custom.sf.js.map