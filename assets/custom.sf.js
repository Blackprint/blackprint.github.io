{async function imports(e){return"undefined"!=typeof sf&&void 0!==sf.loader?await sf.loader.mjs(e):Promise.all(e.map((e=>import(e))))}imports.task=function(){return"undefined"!=typeof sf&&void 0!==sf.loader?sf.loader.task:null},window.templates||(window.templates={});var _$_=sf.dom||sf.$,__tmplt=window.templates,_sf_internal=window._sf_internal=window._sf_internal||{body_map:{},_replace(e,t){let i=_$_(t);return this.body_map[e]&&this.body_map[e].remove(),this.reinitViews&&this.reinitViews(i),this.body_map[e]=i},append(e,t){_$_(document.body).append(this._replace.apply(this,arguments))},prepend(e,t){_$_(document.body).prepend(this._replace.apply(this,arguments))}};__tmplt["component/dropdown.sf"]='<drop-down class="dropdown-menu {{hidden}}" style="display: {{visible ? \'block\' : \'none\'}};\n    transform: translate({{x | 0}}px, {{y | 0}}px);"><div class="first" style="display: {{!title && \'none\'}}">{{title || \'\'}}</div><ul><li sf-each="x in options" :class="{{x.divider ? \'divider\' : \'\'}} {{x.disabled ? \'disabled\' : \'\'}}" title="{{x.info || \'\'}}">{{@if x.title !== undefined: {[<a>]} if(x.icon !== void 0){ if(x.icon.includes(\'//\')) {[<img class="dropdown-icon" :src="{{x.icon}}">]}; else {[<i class="dropdown-icon {{x.icon}}"></i>]}; } {[<div>{{ x.title }}</div>]} if(x.deep !== void 0) {[<i class="{{ root.icon.more }} has-deep"></i>]}; {[</a>]} }}</li></ul></drop-down>';var DropDown=sf.model("dropdown",(function(e){e.menus=[],e.onCancel=void 0,e.className="",e.pendingDeepOpen=!1,e.pendingDeepOpen_=0,e.icon={more:"fa fa-chevron-right"},e.show=function(o,{x:n,y:a,event:l,element:d,title:c,className:r}){if(0!==e.menus.length?e.menus.splice(0):function(){if(t)return;s.insertBefore(sf.Window.source(e.$el)),setTimeout((function(){s.addClass("show"),$(sf.Window).on("pointerdown",i),$(sf.Window).once("contextmenu",(e=>e.preventDefault())),t=!0}),10)}(),o.title=c,void 0!==d){let e=d.getBoundingClientRect();o.x=e.x+5,o.y=e.y+e.height}else void 0!==n?(o.x=n,o.y=a):(o.x=l.x,o.y=l.y,o.event=l);for(var p=o.length-1;p>=0;p--)o[p].hide&&o.splice(p,1);return e.className=r||"",e.menus.push(o),e},e.hide=function(){for(var t=0;t<e.menus.length;t++)e.menus.getElement(t).model.deepRemove();e.pendingDeepOpen=!1,e.pendingDeepOpen_=0,e.menus.splice(0),o(),e.className=""};var t=!1;function i(t){$(t.target).parent("sf-m")[0]!==sf.Window.source(e.$el)&&(o(),e.hide(),e.onCancel&&e.onCancel())}var s=$('<div class="ground-backdrop"></div>');function o(){t=!1,s.removeClass("show"),setTimeout((()=>{s.remove()}),200),$(sf.Window).off("pointerdown",i)}}));sf.component("drop-down",{template:"component/dropdown.sf"},(function(e,t,i){e.visible=!1,e.hidden="hidden",e.options=i,e._parent=i._parent,e.x=i.x,e.y=i.y,e.root=t("dropdown"),e.width=0,e.height=0,e.disabled=!0===i.disabled;for(var s=i.length-1;s>=0;s--)i[s].hide&&i.splice(s,1);var o,n;e.title=i.title,e.init=function(){if(void 0!==i.event){var t=sf.Window.source(e.$el,i.event);if(null===t)return;n=$(t)}else n=e.$el;e.visible=!0;var s=sf.Window.source(e.$el,i.event).querySelector("ul");$.afterRepaint().then((function(){let t=0,i=0,o=e._parent,n=void 0!==o?o.width:0;for(;void 0!==o;)t+=o.x,i+=o.y,o=o._parent;e.width=s.offsetWidth,e.height=s.offsetHeight,t+e.x+e.width>sf.Window.focus.innerWidth&&(e.x-=e.width+n),i+e.y+e.height>sf.Window.focus.innerHeight&&(e.y-=e.height),e.hidden=""}));for(var a=e.options,l=0;l<a.length;l++){let t=a[l];const i=$(a.getElements(l));if(void 0===t.deep)i.on("mouseover",(function(i){e.root.pendingDeepOpen=i.target,clearTimeout(e.root.pendingDeepOpen_),e.root.pendingDeepOpen_=setTimeout((()=>{void 0!==o&&(e.deepRemove(),o=void 0),t.hover&&t.hover.apply(t.context,t.args)}),200)})),t.callback&&i.on("click",(function(i){void 0!==t.unhover&&t.unhover.apply(t.context,t.args),t.callback.apply(t.context,t.args),e.root.hide()})),t.unhover&&i.on("mouseout",(function(e){t.unhover.apply(t.context,t.args)}));else{function d(i){void 0!==o&&e.deepRemove(),void 0!==t.hover&&t.hover.apply(t.context,t.args);var a=t.deep;if(a.event=i,a._parent=e,void 0!==a.el)return o=a.el,a.el.model.y=a.yi-(a.ul?.scrollTop||0),void n.append(a.el);a.ul=e.$el.children("ul")[0],a.x=s.offsetWidth,a.yi=i.target.offsetTop-7,a.y=a.yi-(a.ul?.scrollTop||0),a.el=o=new $DropDown(a,e.$space),o.sf$noGC=!0,n.append(o)}i.on("mouseover",(function(t){e.root.pendingDeepOpen=t.target,clearTimeout(e.root.pendingDeepOpen_),e.root.pendingDeepOpen_=setTimeout((()=>{e.root.pendingDeepOpen===t.target&&d(t)}),200)})),i.on("click",d)}}},e.deepRemove=function(){void 0!==o&&(o.remove(),o.model.deepRemove())}})),__tmplt["component/SmallNotif.sf"]='<sf-m name="small.notif"><div class="notify-container right-top"><div sf-each="x in list" class="notify-base notify-{{x.color}}"><span>{{x.message}}</span> <button @click="close(x)" class="close">×</button></div></div></sf-m>';var SmallNotif=sf.model("small.notif",(function(e){const t=sf.$;e.list=[],e.on$list={create(e){t(e).animateKey("fadeInUp")},remove:(e,i)=>(t(e).animateKey("fadeOutUp",i),setTimeout(i,500),!0)},t((function(){0===t('sf-m[name="small.notif"]').length&&t("body").append(t(window.templates["component/SmallNotif.sf"]))})),e.add=function(t,i,s){var o={message:t,color:i||"yellow"};return e.list.push(o),!1!==s&&(o.timer=setTimeout((()=>{e.list.splice(e.list.indexOf(o),1)}),s||1e3+100*t.length)),o},e.close=function(t){e.list.splice(e.list.indexOf(t),1)}}));_sf_internal.append("model/Loading.sf",'<sf-m name="loading" class="{{showed && \'show\'}}"><span class="icon"><i class="fa fa-fan fa-spin"></i></span> <span class="desc">{{desc}}</span></sf-m>');var Loading=sf.model("loading",(function(e){e.showed=!1,e.desc="",e.set=function(t){t&&!1===e.showed?e.showed=!0:e.showed=!1,e.desc=t}}));_sf_internal.append("model/modal.sf",'<sf-m name="modal" class="modal {{showed && \'show\'}}"><div class="modal-dialog"><vw-modal></vw-modal></div></sf-m>');var Modal=sf.model("modal",(function(e){e.showed=!1,e.init=e.hotReloaded=function(){e.views=sf.Views.listSelector["vw-modal"]},e.hide=function(){e.showed=!1,e.$el(".modal-dialog").off("pointerup",e.hide,{outside:!0})},e.goto=function(t){e.views.goto(t),e.showed=!0,setTimeout((()=>{e.$el(".modal-dialog").on("pointerup",e.hide,{outside:!0})}),400)}}));_sf_internal.append("routes/body.sf",'<div class="background"><div class="img" style="background-image: url(\'/assets/img/background/black3.jpg\')"></div><div class="tile"></div></div>\x3c!-- Model on ./blackprint/header.js --\x3e<sf-m name="header" class="header {{showOptions ? \'sketch-mode\' : \'\'}}"><div class="header-left" @click="mainMenu"><img src="/assets/img/icon/blackprint.png"><div>Blackprint</div><i class="fa fa-caret-down menu-button-hint"></i></div><div class="header-center"><div>A node to node general purpose visual programming</div></div><div class="header-menu"><div class="item-list"><div class="item inactive" @click="SmallNotif.add(\'Please be patient, still work in progress 😅\');" style="color: #2b2b2b" title="Guide/Docs still work in progress"><i class="fa fa-journal-whills"></i></div><div class="item" @click="Modal.goto(\'/module-example-list\')" title="Module examples"><i class="fa fa-map-signs"></i><div class="module-counter">{{_moduleExampleList.length}}</div></div><div class="item" @click="Modal.goto(\'/module-url\')" title="Loaded module"><i class="fa fa-boxes"></i><div class="module-counter">{{_loadedModuleURL.length}}</div></div><div class="item {{cloneActive ? \'active\' : \'\'}}" @click="cloneContainer" title="Show the minimap and open new window"><i class="fa fa-window-restore"></i></div><div class="item {{switchVFXActive ? \'active\' : \'\'}}" @click="switchVFX" title="Improve performance by disable VFX"><i class="fas fa-rocket"></i></div><div class="item {{visualizeActive ? \'active\' : \'\'}}" @click="visualizeFlow" title="Visualize data flow"><i class="fas fa-bezier-curve"></i></div></div><div class="header-zoom"><div style="display: {{info.scale === 100 ? \'none\' : \'block\'}}"><i class="fas fa-search"></i> {{info.scale}}%</div></div></div></sf-m>\x3c!-- Ground viewport --\x3e\x3c!-- ./src/vw-ground/router.js --\x3e<vw-ground style="display: none"></vw-ground><input type="text" id="hidden_text" style="position: fixed; top: 100vh;"><sf-m name="dropdown" class="{{className}}"><drop-down sf-each="val in menus"></drop-down></sf-m>'),sf.model("welcome-text",(function(e){e.toWorkspace=function(){0!==SketchList.length?views.goto("/sketch/1"):e.openExamples()},e.openExamples=function(){Modal.goto("/example-list")}})),sf.model("sketch-pages",(function(e){e.miniViewer={topRight:null,topRightHidden:!0,on$topRight(t){if(null===t)return e.miniViewer.topRightHidden=!0;e.miniViewer.topRightHidden=!1}}})),sf.model("custom-node-editor",(function(My){My.content="// After execute this, you can test it by connecting\n// Input -> Slider and Logger to this node\n\nlet EventSlot = {slot: 'my-unique'}; // To avoid duplicate listener\n\nBlackprint.registerNode('Test/Hello',\nclass extends Blackprint.Node {\n\tstatic input = { // Port\n\t\t'Give Input': Number\n\t}\n\t\n\tstatic output = { // Port\n\t\tOut: Number\n\t}\n\n\tconstructor(instance){\n\t\tsuper(instance);\n\n\t\t// You can remove this if you want to use default node interface/HTML\n\t\tlet iface = this.setInterface('BPIC/Test/Hello');\n\n\t\tiface.title = 'Add +5';\n\t\tiface.description = 'Add 5 to any number';\n\t}\n});\n\n// You can remove this if you're using default node interface/HTML\nBlackprint.Sketch.registerInterface('BPIC/Test/Hello', {\n\thtml: `\n<div class=\"node {{ type || 'general' }}\" style=\"transform: translate({{ x }}px, {{ y }}px)\">\n  <sf-template path=\"Blackprint/nodes/template/header.sf\"></sf-template>\n\n  <div class=\"content\">\n\t<div class=\"left-port\">\n\t  <sf-template path=\"Blackprint/nodes/template/input-port.sf\"></sf-template>\n\t</div>\n\t\n\t<div style=\"display: inline-block; color: yellow\">\n\t\t{{ log }}\n\t</div>\n    \n\t<div class=\"right-port\">\n\t  <sf-template path=\"Blackprint/nodes/template/output-port.sf\"></sf-template>\n\t</div>\n  </div>\n</div>`\n}, class extends Blackprint.Interface {\n\tconstructor(node){\n\t\tsuper(node);\n\n\t\tthis.log = 0;\n\t}\n\n\t// HTML/Interface Init\n\tinit(el){\n\t\tlet iface = this;\n\t\t\n\t\tconst {\n\t\t\tIInput, IOutput, // Port interface (event, utils, etc)\n\t\t\tInput, Output, // Node Port (get/set value)\n\t\t} = iface.ref;\n\n\t\tIInput['Give Input'].on('value', EventSlot, function({ cable }){\n\t\t\tlet val = cable.value;\n\n\t\t\tiface.log = val + 5; // Give Input -> {{ log }}\n\t\t\tOutput.Out = val + 5; // Give Input -> Out\n\t\t});\n\t}\n\n\t// Run init again to hot reload this node\n\thotReloaded(){\n\t\tthis.init();\n\t}\n\n\t// When this node UI was cloned somewhere\n\t// You can reinit some HTML element if needed\n\tinitClone(el){}\n});",My.init=async function(){void 0===window.monaco&&(await sf.loader.js(["https://cdn.jsdelivr.net/npm/@monaco-editor/loader@1.1.1/lib/umd/monaco-loader.min.js"]),await monaco_loader.init()),My.container=My.$el(".editor"),My.recreate()},My.recreate=function(){void 0!==window.monaco&&(My.editor||(My.editor&&My.editor.dispose(),setTimeout((()=>{let e=My.container.find(".bp-loading-status");My.editor=monaco.editor.create(My.container[0],{value:My.content,language:"javascript",theme:"vs-dark",minimap:{enabled:!1}}),e.css("display","none")}),1e3)))},My.run=function(){eval(My.editor.getValue())},My.close=function(){Modal.hide(),My.editor.dispose(),My.editor=null,modal.goto("/"),My.container.find(".bp-loading-status").css("display","")}})),sf.model("modal-dev-mode",(function(e){e.url=localStorage.BPModuleServer??="",e.placeholder=location.origin,"localhost"!==location.hostname||"/dev.html"===location.pathname?(e.connectDefault=function(){localStorage.BPModuleServer=e.url="",e.changeServer()},e.changeServer=async function(){let t=e.url;t||(t=location.origin);let i=t;if("/"===t.slice(-1)&&(t=t.slice(0,-1)),t+="/browser-sync",void 0===window.___browserSync___)try{await sf.loader.js([t+"/browser-sync-client.js?v=2"])}catch(e){return void SmallNotif.add("Failed to load client","red")}___browserSync___.socketUrl=t;let s=___browserSync___.socket;function o(){console.log("Connected to Blackprint module server:",t),SmallNotif.add("Connected to Blackprint module server","green"),localStorage.BPModuleServer=e.url}s.disconnect(),setTimeout((()=>{s.connected||(console.log("Failed to connect to Blackprint module server:",t),SmallNotif.add("Failed to connect to Blackprint module server","red"),s.disconnect(),s.off("connect",o))}),8e3),s.once("connect",o),s.nsp="/browser-sync",s.io.uri=t,s.connect();let n=!1;try{let e=Object.values(await $.getJSON(i+"/api/module-list"));for(var a=0;a<e.length;a++)e[a]=i+e[a];0!==e.length&&(SmallNotif.add(`Loading ${e.length} new modules`,"yellow"),await Blackprint.loadModuleFromURL(e,{loadBrowserInterface:!0}),SmallNotif.add("New modules have been loaded","green")),n=!0}catch(e){throw SmallNotif.add("Failed to load new modules","red"),e}setTimeout((()=>{n||(SmallNotif.add("Loading modules was taking longer than 10s","red"),0!==sf.loader.pendingResources.size&&console.log("Pending resources:",sf.loader.pendingResources))}),1e4),Modal.showed&&Modal.hide()},""!==e.url&&void 0!==sf.hotReload&&$((function(){setTimeout((()=>e.changeServer()),200)}))):location.pathname="/dev.html"})),sf.model("environment-variables",(function(e){function t(){$("input",e.list.getElement(e.list.length-1))[0].focus()}e.list=Blackprint.Environment.list,e.newValue="",e.newKey="",e.v2m$newKey=function(i){return 0!==(i=e.validateKey(i)).length&&(Blackprint.Environment.set(i,e.newValue),e.newKey=e.newValue="",t()),""},e.itemChanged=function(s){if(clearTimeout(i),i=setTimeout((function(){let{map:e,list:t}=Blackprint.Environment,i=new Set;for(var s=0;s<t.length;s++){let o=t[s];e[o.key]=o.value,i.add(o.key)}for(let t in e)i.has(t)||Blackprint.Environment.delete(t,!0)}),1e3),0===s.key.length&&(Number.isNaN(s.value)||!s.value))return e.list.splice(e.list.indexOf(s),1),void t()};let i=0;e.validateKey=function(e){return e.replace(/[ \-]+/gm,"_").replace(/\W+/gm,"").replace(/^[0-9]+/gm,"").toUpperCase()},e.close=function(){Modal.hide(),modal.goto("/")}})),sf.model("example-list",(function(e){e.list=[],e.open=function(e){let t=sampleList[e];for(var i=0;i<SketchList.length;i++)SketchList[i].clearNodes();Modal.hide(),(SketchList[0]??=new Blackprint.Sketch).__importing=!0,SketchImporter.pendingLoad=t,SketchImporter.importNow()}})),sf.model("module-example-list-deep",(function(e){e.packageName="",e.baseUrl="",e.list=[],e.openModal=function(t){e.packageName=t.packageName;let i=t.examples;for(var s=0;s<i.length;s++){let e=i[s];e.name||(e.name=e.url.replace("example/","").replace(/^\//,"").replace(".json","").replace(/\-/g," "))}e.list=i,e.baseUrl=t.packageURL},e.openExample=async function(t){SmallNotif.add("Loading information..");let i=t.url;"/"!==i.slice(0,1)&&(i=`/${i}`);let s=await $.getJSON(e.baseUrl+i);SketchImporter.loadJSON(s)},e.back=function(){Modal.goto("/module-example-list")}}));var ModuleExampleList=sf.model("module-example-list",(function(e){e.list=EditorHeader._moduleExampleList,function(){let t=localStorage.bpModuleExampleList;if(!t)return;e.list.push(...JSON.parse(t))}(),e.open=function(e){sf.model("module-example-list-deep").openModal(e),Modal.goto("/module-example-list-deep")},e.add=function(t,i,s){let o=e.list;for(var n=0;n<o.length&&o[n].packageName!==t;n++);if(n===o.length){o.push({packageName:t,packageURL:s,examples:i}),e.list=o=o.sort(((e,t)=>e.packageName.localeCompare(t.packageName)));try{o.refresh()}catch(e){}SmallNotif.add(`"${t}" example has been added`,"green")}else o[n].examples=i;localStorage.bpModuleExampleList=JSON.stringify(e.list)}}));let _editorModuleURL=sf.model("module-url",(function(e){e.list=Blackprint._modulesURL,e.firstInit=!!localStorage.bpModuleURLList,e.newURL="";let t=localStorage.bpModuleURLList;async function i(t,i){let s=e.newURL;e.newURL="";let o=SmallNotif.add("Loading","yellow",!1);sf.loader.DOMWasLoaded=!1,sf.loader.onProgress((function(e,t){o.message=`Loading ${e}/${t}`}));try{await Blackprint.loadModuleFromURL(t,i),await sf.loader.task,SmallNotif.add("Module sucessfully loaded","green")}catch(t){SmallNotif.add("Failed to load module","red"),console.error(t),e.newURL=s}finally{sf.loader.DOMWasLoaded=!0}let n=SmallNotif.list;n.splice(n.indexOf(o),1),e.sortURL()}e.init=async function(){},e.sortURL=function(){e.list.sort(((e,t)=>e._url.localeCompare(t._url))),e.list.refresh(),0!==e.list.length&&(localStorage.bpModuleURLList=JSON.stringify(e.list.map((e=>e._url))))},e.shortenLink=function(e,t){if(e=new URL(e),"search"===t)return e.search;if("host"===t)return e.host||location.host;let i=e.pathname;return i.includes("@dist")?i.replace(/(cjs|mjs)\/|\.(min|mjs|js)/g,"").split("/").slice(-2).join("/"):i.replace(/(cjs|mjs|dist)\/|\.(min|mjs|js)/g,"").split("/").slice(-2).join("/")},e.addURL=function(){let t=e.list;for(var s=0;s<t.length;s++){let o=t[s];if(e.newURL===o._url)return;if(e.newURL.replace(/\?.*?$/m,"")===o._url.replace(/\?.*?$/m,""))return o._url=e.newURL.replace(/\?.*?$/m,""),void i(o._url,{loadBrowserInterface:!0})}i(e.newURL.replace(/\?.*?$/m,"")+"?"+(Date.now()/1e3|0),{loadBrowserInterface:!0})},e.reloadURL=function(e){/\?[0-9]/.test(e._url)?e._url=e._url.replace(/\?([0-9]+)/,((e,t)=>"?"+(1+Number(t)))):e._url.includes("?")?e._url=e._url.replace(/\?.*?$/m,"")+"?1":e._url+="?1",Blackprint.loadModuleFromURL(e._url)};let{diveModuleURL:s}=Blackprint.utils;e.hideFromURL=function(e){let t=e._url.replace(/\?.*?$/m,""),i=e._hidden=!e._hidden;s(Blackprint.modulesURL[t],(function(e,t,s,o){e[t].hidden=i;for(var n=o.length-1;n>=0;n--){let e=o[n];if(!(--e.val._visibleNode<=0))break;if(0===n){Blackprint.nodes[s[0]].hidden=i;break}o[n-1].val[e.key].hidden=i}}))},e.deleteFromURL=function(t){if(-1===e.list.indexOf(t))return;let i=t._url.replace(/[?#].*?$/m,"");Blackprint.deleteModuleFromURL(i)},Blackprint.on("moduleDelete",{slot:"bp-editor"},(function({url:t}){let i=document.styleSheets,s=t.replace(/[?#].*?$/m,"").replace(/\.(sf|js|css|min|mjs)\b/g,"");for(var o=0;o<i.length;o++){let e=i[o];if(null!=e.href&&e.href.replace(/[?#].*?$/m,"").replace(/\.(sf|js|css|min|mjs)\b/g,"")===s){e.ownerNode.remove();break}}let n=e.list;for(o=0;o<n.length;o++)if(n[o]._url.includes(s)){n.splice(o,1);break}})),e.npmList=function(){modal.goto("/npm-packages")},e.loadCachedList=function(){let s=t;s&&(s=JSON.parse(s),0!==s.length&&(e.firstInit=!1,i(s,{loadBrowserInterface:!0})))},e.close=function(){Modal.hide(),modal.goto("/")}}));sf.model("npm-package-info",(function(e){e.list=[],e.title="",e.description="",e.version="",e.author="",e.date="",e.repository="",e.packageURL="",e.package=0,e.open=function(t,i,s){e.list=i,e.exampleList=s,e.package=t,e.title=t.name,e.description=t.description||"",e.version=t.version,e.date=t.date.split("T")[0],e.author=t.publisher.username||"",e.repository=t.links.repository||"",e.packageURL=`https://cdn.jsdelivr.net/npm/${t.name}@${t.version}`;let o=Blackprint.modulesURL,n=e.list;for(let e in o)for(var a=0;a<n.length;a++){let t=n[a];e.includes(t.url)&&(t.active="active")}Modal.goto("/npm-package-info")};let t,i=!1,s=0;function o(e){if(e){if(--s>0)return;if(s=0,!t)return;let e=SmallNotif.list;return e.splice(e.indexOf(t),1),t=!1,void(i=!1)}i||(i=!0,t=SmallNotif.add("Loading","yellow",!1),sf.loader.onProgress((function(e,i){t&&(t.message=`Loading ${e}/${i}`)})))}e.load=async function(t){sf.loader.DOMWasLoaded=!1,setTimeout((()=>{0!==s&&o()}),500),s++,t.active="loading";try{await Blackprint.loadModuleFromURL([e.packageURL+t.url],{loadBrowserInterface:!0})}finally{sf.loader.DOMWasLoaded=!0,i=!1}0!==e.exampleList.length&&ModuleExampleList.add(e.title,e.exampleList,e.packageURL),t.active="active",e.package._active=!0,o(!0)},e.back=function(){Modal.goto("/npm-packages")}})),sf.model("npm-packages",(function(e){e.list=[],e.search="",e.loading=!1,e.init=function(){e.refreshList()},e.refreshList=async function(){let t="https://registry.npmjs.org/-/v1/search?text=blackprint%20nodes";""!==e.search&&(t+="%20"+e.search),e.loading=!0;let i=(await $.getJSON(t)).objects;e.loading=!1;let s=Blackprint.modulesURL;for(let e in s)for(var o=0;o<i.length;o++){let t=i[o].package;e.includes(t.name)&&(t._active=!0,t._update=Blackprint.utils.packageIsNewer(e,t.name+"@"+t.version))}e.list=i},e.open=async function(t){e.loading=!0;let i=await $.getJSON(`https://data.jsdelivr.com/v1/package/npm/${t.name}@${t.version}`);i=i.files;let s=[],o=[];for(var n=0;n<i.length;n++){let e=i[n];if("directory"===e.type)if("dist"===e.name){let t=e.files;for(var a=0;a<t.length;a++){let e=t[a];if("file"!==e.type)continue;let i=e.name;/\.(map|sf\.mjs|sf\.js|css)$/.test(i)||s.push({url:`/dist/${i}`})}}else if("example"===e.name){let t=e.files;for(a=0;a<t.length;a++){let e=t[a];"file"===e.type&&o.push({url:`/example/${e.name}`})}}}e.loading=!1,sf.model("npm-package-info").open(t,s,o)}}));var SketchImporter=sf.model("sketch-importer",(function(e){e.modules=[],e.nodes=[],e.pendingLoad=void 0,e.savedKeys={localStorage:[],sessionStorage:[],environmentVariables:[],sketchPages:[]};let t=!1,i=!0;e.loadJSON=async function(t){Modal.goto("/sketch-importer"),t.constructor===String&&(t=JSON.parse(t)),e.pendingLoad=t;let i=t._;e.modules=i&&i.moduleJS||[],e.nodes=[];for(let i in t)"_"!==i&&e.nodes.push({name:i,count:t[i].length});e.checkSavedData()},e.importNow=function(){if(void 0===e.pendingLoad){let e="Please call 'SketchImport.loadJSON' first";return console.error(e),SmallNotif.add(e,"yellow"),!1}Modal.hide();let s=SketchList[0]??=new Blackprint.Sketch;async function o(){sf.loader.DOMWasLoaded=!1,i&&sf.loader.onProgress((function(e,s){t.message=`Loading ${e}/${s}`,i=!0}));try{await s.importJSON(e.pendingLoad)}catch(e){throw SmallNotif.add("Failed to import data","red"),e}finally{sf.loader.DOMWasLoaded=!0,delete s.__importing,e.pendingLoad=void 0}let o=SmallNotif.list;o.splice(o.indexOf(t),1)}if(s.__importing=!0,"/sketch/1"===views.currentPath)return t=SmallNotif.add("Loading","yellow",!1),setTimeout(o,400);views.goto("/sketch/1"),t=SmallNotif.add("Loading","yellow",!1),setTimeout(o,1e3)},e.checkSavedData=function(){e.savedKeys.localStorage=Object.keys(localStorage),e.savedKeys.sessionStorage=Object.keys(sessionStorage),e.savedKeys.environmentVariables=Object.keys(Blackprint.Environment.map),e.savedKeys.sketchPages=SketchList},e.clear={localStorage(){let t=Object.keys(localStorage);for(let e=0;e<t.length;e++)delete localStorage[t[e]];e.savedKeys.localStorage=Object.keys(localStorage)},sessionStorage(){let t=Object.keys(sessionStorage);for(let e=0;e<t.length;e++)delete sessionStorage[t[e]];e.savedKeys.sessionStorage=Object.keys(sessionStorage)},environmentVariables(){let t=Blackprint.Environment,i=Object.keys(t.map);for(let e=0;e<i.length;e++)t.delete(i[e]);e.savedKeys.environmentVariables=Object.keys(Blackprint.Environment.map)},sketchPages(){for(var e=0;e<SketchList.length;e++)SketchList[e].destroy();SketchList.splice(1),views.goto("/sketch/1")}}}));sf.model("sketch-settings",(function(e){e.theme="default",e.on$theme=function(t){$("body").removeClass("node-ui-"+e.theme).addClass("node-ui-"+t)}}));var SketchList=[];sf.component("sketch-page",(function(e){let t=e.sketch=SketchList[views.data.page-1]??=new Blackprint.Sketch;t.page=e,t._event.$_fallback=BlackprintEventFallback,Blackprint.settings("visualizeFlow",!0),e.space??=t.cloneContainer();let i=sf.model("sketch-pages"),s=t.scope("container"),o=sf.model("header");s.onScale=function(e){o.info.scale=Math.round(100*e)},e.init=async function(){let t=$(e.space.firstElementChild);t.eq(0).hasClass("bg-tile")||t.prepend('<div class="bg-tile"></div>')},e.importJSON=e=>t.importJSON(e),e.clearNodes=()=>t.clearNodes(),e.cloneActive=!1,e.cloneContainer=function(){if(e.cloneActive=!e.cloneActive,e.cloneActive){!1===e.switchVFXActive&&e.switchVFX();var s,o=t.scope("container");function n(){setTimeout((function(){o.pos.x=-.1,setTimeout((function(){o.pos.x=0}),500)}),1e3)}o.pos.x=0,o.pos.y=0,o.scale=1,o.minimap?s=o.minimap:(s=t.cloneContainer(!0),$('sf-m[name="dropdown"]',s).remove()),new sf.Window({title:"Cloned Sketch Container",templateHTML:t.cloneContainer()},n),i.miniViewer.topRight=s,n()}else i.miniViewer.topRight=null,sf.Window.destroy()},t.on("node.menu",(function({iface:e,menu:t}){t.unshift({title:e.id?"Modify ID":"Add ID",async callback(){let t=await Swal.fire({title:"Write the new ID here",text:e.id?"Current ID: "+e.id:void 0,input:"text"});if(!1===t.isConfirmed)return;let i=SketchList[0],s=t.value;if(""===s)return delete i.iface[e.id],void(e.id=s);if(void 0!==i.iface[s])throw new Error("ID already exist");e.id=s,i.iface[s]=e}})}))})),sf.Views._$edit("vw-ground",[{path:"/getting-started",html:"Preparing this file for the future example"},{path:"/",html:'\x3c!-- Filling the default page if haven\'t being routed --\x3e<sf-m name="welcome-text" class="welcome-text"><h1>Welcome to Blackprint Editor!</h1><div class="description">This editor haven\'t being designed for mobile screen.</div><div class="content"><div class="item" @click="toWorkspace"><i class="fas fa-torii-gate"></i> Go to sketch page</div><div class="item" @click="openExamples"><i class="fa fa-map-signs"></i> <span>Open examples</span></div><div class="item" style="cursor: default"><i class="fa fa-book-open"></i> <span style="text-decoration: line-through">Learn from editor</span></div></div><div class="available-engine"><div class="title">Blackprint Engine also available for:</div><div class="list">\x3c!-- python, csharp, java/kotlin, cplusplus, go, rust, docker --\x3e\x3c!-- css3, html5 --\x3e <a class="item" href="https://github.com/Blackprint/engine-js" target="_blank"><img src="/assets/img/icon/denojs.svg"><div class="name">Deno</div></a><a class="item" href="https://github.com/Blackprint/engine-js" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/icons/nodejs/nodejs-plain.svg"><div class="name">Node.js</div></a><a class="item" href="https://github.com/Blackprint/engine-php" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/icons/php/php-plain.svg"><div class="name">PHP</div></a><a class="item" href="https://github.com/Blackprint/engine-go" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@2.14.0/icons/go/go-original-wordmark.svg"><div class="name">Golang</div></a></div></div></sf-m><div class="welcome-left"><a target="_blank" href="https://ko-fi.com/stefansarya"><i class="fas fa-mug-hot"></i> Ko-fi </a><a target="_blank" href="https://github.com/Blackprint/Blackprint"><i class="fab fa-github"></i> GitHub </a><a target="_blank" href="https://stefansarya.gitbook.io/blackprint"><i class="fa fa-book-open"></i> Documentation </a><a target="_blank" href="https://github.com/Blackprint/Blackprint/discussions"><i class="fa fa-comments"></i> Discussions</a></div><div class="welcome-right"><a target="_blank" style="cursor: pointer;" onclick="Modal.goto(\'/npm-packages\')">Package List <i class="fas fa-boxes"></i> </a><a target="_blank" href="https://www.npmjs.com/search?q=keywords:blackprint">npm.js <i class="fas fa-box"></i></a></div>'},{path:"/sketch",html:'<sf-m name="sketch-pages">\x3c!-- /src/routes/+vw-ground/sketch.sf --\x3e<vw-page></vw-page><div class="mini-blackprint disable-effect {{miniViewer.topRightHidden && \'hidden\'}}"><sf-slot for="miniViewer.topRight"></sf-slot></div></sf-m>',on:{showed(){sf.model("header").showOptions=!0},hidden(){sf.model("header").showOptions=!1}}},{path:"/sketch",html:'<sf-m name="sketch-pages">\x3c!-- /src/routes/+vw-ground/sketch.sf --\x3e<vw-page></vw-page><div class="mini-blackprint disable-effect {{miniViewer.topRightHidden && \'hidden\'}}"><sf-slot for="miniViewer.topRight"></sf-slot></div></sf-m>',on:{showed(){sf.model("header").showOptions=!0},hidden(){sf.model("header").showOptions=!1}},"vw-page":[{path:"/:page",html:'<sketch-page><div class="bottom-message">This editor still in development (≧▽≦)／<br>I want to make it better and easier to use.<br>Please use right click to open drop down menu for the cable, node, container, or port.</div>\x3c!-- This element will be replaced with \'My.space\' --\x3e<sf-slot for="space"></sf-slot></sketch-page>',on:{coming(e){console.log("Sketch page data:",e);let t=SketchList[e.page-1];sf.model("header").cloneActive=t.page.cloneActive},showed(){setTimeout((()=>{if(1===SketchList.length&&0===SketchList[0].ifaceList.length){if(SketchList[0].__importing)return;if("/sketch-importer"===modal.currentPath)return;Modal.goto("/example-list")}}),100),$("body > .background .tile").css("display","none")},leaving(){console.log("Leaving from sketch page data:",arguments),$("body > .background .tile").css("display","")}}}]}]),sf.Views._$edit("vw-modal",[{path:"/",html:"'index.sf' was not found"},{path:"/custom-node-editor",html:'<sf-m name="custom-node-editor"><div class="editor" @keydown.ctrl.enter.prevent="run"><div class="bp-loading-status" style="color: white; padding: 20px">Loading Monaco Editor...</div></div><div class="menu"><div class="item" @click="run" title="Execute (Ctrl + Enter)"><i class="fa fa-play"></i></div><div class="item" @click="Modal.hide()" title="Minimize"><i class="fa fa-window-minimize"></i></div><div class="item" @click="close" title="Close"><i class="fa fa-times"></i></div></div></sf-m>',on:{showed(){sf.model("custom-node-editor").recreate()}}},{path:"/dev-mode",html:'<sf-m name="modal-dev-mode"><div class="description">Please set the Blackprint module server URL</div><div class="note" style="display: {{url === \'\' || url === placeholder ? \'none\':\'\'}}" @click="connectDefault">(Click here to connect to default server)</div><div class="text-input"><input placeholder="{{placeholder}}" type="text" sf-bind="url" @keyup.enter="changeServer"></div><div class="button-import" @click="changeServer">Connect</div></sf-m>',on:{coming(){setTimeout((()=>{sf.model("modal-dev-mode").$el("input").focus()}),500)},showed(){setTimeout((()=>{sf.model("modal-dev-mode").$el("input").focus()}),100)}}},{path:"/environment-variables",html:'<sf-m name="environment-variables"><div class="title">Environment Variables</div><div class="head"><div class="row">Key</div><div class="row">Value</div></div><div class="content"><div><div class="row" sf-each="x in list" @keyup="itemChanged(x)"><input class="column key" type="text" @input="(this.value = x.key = validateKey(this.value))" sf-bind="x.key" placeholder="..."> <input class="column" type="text" sf-bind="x.value" placeholder="..."></div></div><div class="row"><input class="column key" type="text" @input="this.value = newKey = validateKey(this.value)" sf-bind="newKey" placeholder="Add new key..."> <input class="column" type="text" sf-bind="newValue" placeholder="..."></div></div><div class="menu"><div class="item" @click="close" title="Close"><i class="fa fa-times"></i></div></div></sf-m>'},{path:"/example-list",html:'<sf-m name="example-list"><div class="description">Please select one of these example (<a href="https://github.com/Blackprint/blackprint.github.io/blob/develop/src/global/sampleList.js">source</a>)</div><div class="list"><div class="item" sf-each="x in list" @click="open(x)">{{x}}</div></div></sf-m>',on:{coming(){sf.model("example-list").list=Object.keys(sampleList)}}},{path:"/module-example-list-deep",html:'<sf-m name="module-example-list-deep"><div class="description">Examples for: <b>{{packageName}}</b></div><div class="list"><div class="item" sf-each="x in list" @click="openExample(x)">{{x.name}}</div></div><div class="menu"><div class="item" @click="back" title="Back"><i class="fa fa-reply"></i></div></div></sf-m>'},{path:"/module-example-list",html:'<sf-m name="module-example-list"><div class="description">Please select one of the module to load the example list</div><div class="list"><div class="item" sf-each="x in list" @click="open(x)">{{x.packageName}}</div></div></sf-m>',on:{coming(){}}},{path:"/module-url",html:'<sf-m name="module-url"><div class="head"><div class="row url">Shortened Module URL</div><div class="row nodes">Nodes</div><div class="row actions">Actions</div></div><div class="content"><div><div class="row" sf-each="x in list"><div class="column url"><div><b>{{shortenLink(x._url, \'host\')}}</b> {{shortenLink(x._url, \'path\')}} <b>{{shortenLink(x._url, \'search\')}}</b> <a title="Right click to copy link address, click to open on new tab" target="_blank" href="{{x._url}}"><i class="fa fa-link"></i></a></div></div><div class="column nodes">{{x._nodeLength}}</div><div class="column actions"><button title="Show this module on dropdown/module list" @click="hideFromURL(x)"><i class="fa fa-list"></i> <i class="fa fa-slash" style="position: absolute;\n\t\t\t\t\t\t    margin-left: -15px;\n\t\t\t\t\t\t    display: {{x._hidden ? \'inline-block\' : \'none\'}}"></i></button> <button title="Reload this module again from URL" @click="reloadURL(x)"><i class="fa fa-sync"></i></button> <button title="Remove any related nodes and also remove this module" @click="deleteFromURL(x)"><i class="fa fa-trash"></i></button></div></div></div><div class="row"><input class="column url-input" type="text" @keyup.enter="addURL()" sf-bind="newURL" placeholder="Add module from URL here... (Then press enter)"></div></div><div class="menu"><div class="item" @click="close" title="Close"><i class="fa fa-times"></i></div><div class="item" @click="npmList" title="Search from NPM"><i class="fa fa-book-open"></i></div><div class="item" @click="loadCachedList" style="{{firstInit ? \'\' : \'display: none\'}}" title="Load cached list"><i class="fa fa-boxes"></i></div></div></sf-m>',on:{coming(){_editorModuleURL.sortURL()}}},{path:"/npm-package-info",html:'<sf-m name="npm-package-info"><div class="title">{{title}} (v{{version}})</div><div class="info"><span>{{author}}</span> <a style="display: {{repository ? \'\' : \'none\'}}" href="{{repository}}" target="_blank">(Repository)</a></div><div class="description">{{description}}</div><div class="list-info">Please select module to import:</div><div class="list"><div class="item {{x.active || \'\'}}" sf-each="x in list" @click="load(x)">{{x.url}} <i class="{{x.active === \'loading\' ? \'fa fa-spinner fa-spin\' : \'\'}}"></i></div></div><div class="menu"><div class="item" @click="back" title="Back"><i class="fa fa-reply"></i></div></div></sf-m>'},{path:"/npm-packages",html:'<sf-m name="npm-packages"><div class="description">Search package on NPM repository <i class="{{loading ? \'fa fa-spinner fa-spin\' : \'\'}}"></i></div><div class="mini-description" title="especially if you\'re not a developer, always becareful if someone ask you to do something with Blackprint, like inputting password or private key">Always becareful and verify the module\'s source code before going to production</div><div class="search"><input type="text" sf-bind="search" @keyup.enter="refreshList" placeholder="Search..."></div><div class="list"><div class="item {{x.package._active && \'active\'}} {{x.package._update && \'update\'}}" sf-each="x in list" @click="open(x.package)"><div><div class="title">{{x.package.name}} <span>(v{{x.package.version}})</span></div><div class="author">{{x.package.publisher.username}}</div></div><div><div class="description">{{x.package.description}}</div><div class="date">{{x.package.date.split(\'T\')[0]}}</div></div></div></div></sf-m>'},{path:"/sketch-importer",html:'<sf-m name="sketch-importer"><div class="description" title="To avoid any risks if you have stored sensitive data on this editor, make sure you have verify the author of the nodes and the JSON to be imported.">Please verify the author before importing</div><div class="info-modules"><div class="title">These modules will be imported:</div><ul class="list"><li class="item" sf-each="x in modules">{{x}}</li></ul></div><div class="info-nodes"><div class="title">These nodes will be used:</div><ul class="list"><li class="item" sf-each="x in nodes">{{x.name}} ({{x.count}})</li></ul></div><div class="info-clear"><div class="title">Please be careful if you saved any sensitive data<br>Click to clear the saved data:</div>\x3c!-- Hi! can you contribute for clearing browser data like WebSQL or IndexedDB? --\x3e<div class="button-clear"><div @click="clear.localStorage">Local Storage ({{savedKeys.localStorage.length}})</div><div @click="clear.sessionStorage">Session Storage ({{savedKeys.sessionStorage.length}})</div><br><div @click="clear.environmentVariables">Environment Variables ({{savedKeys.environmentVariables.length}})</div><div @click="clear.sketchPages">Sketch Pages ({{savedKeys.sketchPages.length}})</div></div></div><div class="button-import" @click="importNow">Import Sketch</div></sf-m>'},{path:"/sketch-settings",html:'<sf-m name="sketch-settings"><div class="description">Settings</div><div class="list"><div class="item"><div class="title">Theme:</div><select sf-bind="theme"><option value="default">Default</option><option value="darker">Darker</option></select></div></div></sf-m>'}])}
//# sourceMappingURL=custom.sf.js.map