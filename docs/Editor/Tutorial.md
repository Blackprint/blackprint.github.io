## Welcome to Tutorial List
Here you can find some tutorial made for this Blackprint Editor. Some tutorial like using external nodes made by other developer or outside of this editor may not be covered here. You can click tutorial from the list below to begin:

<sf-m name="docs-editor-tutorial">
	<ul>
		<li sf-each="key, val in list" @click="val()">{{ key }}</li>
	</ul>
</sf-m>

<script>
sf.model('docs-editor-tutorial', My => {
	My.list = {};

	let list = {
		async "Import module from NPM repository"(){
			await My.resetTutorial();
			Tutorial.loadTutorial([{
				message:"Let's go to sketch page by clicking this button",
				element: '.welcome-text .content .item:nth-child(1)', onClick: 'next'
			}, {
				message:"Open module list by clicking this",
				element: '.header-menu [title="Loaded module"]', onClick: 'next', delayShow: 700
			}, {
				message:"Click this to search module from NPM registry",
				element: 'sf-m[name="module-url"] [title="Search from NPM"]', onClick: 'next', delayShow: 700
			}, {
				message:"You can type the library/module name here then press enter",
				element: 'sf-m[name="npm-packages"] .search input', delayShow: 700, onClick(){
					if(sf.model('npm-packages').list.length === 0)
						Tutorial._domChanged($('sf-m[name="npm-packages"] .list')[0], ()=> Tutorial.next());
					else Tutorial.next();
				}
			}, {
				message:"You can also click one of the module\nThey are was contributed by community, but always becareful if you see something suspicious",
				element: 'sf-m[name="npm-packages"] .list', delayShow: 700, onClick(){
					Tutorial._domChanged($('vw-modal')[0], ()=> Tutorial.next());
				}
			}, {
				message:"Usually one library may have separated module, click one that you need and it will be loaded and ready to be used. Greyed list means it already loaded to the editor.",
				element: 'sf-m[name="npm-package-info"] .list', delayShow: 700, onClick: 'next'
			}, {
				message:"Alright let's open the module list again",
				element: '.header-menu i.fa-boxes', delayShow: 700, onClick: 'next'
			}, {
				message:"From this list you can see what modules you have loaded on this editor, click on empty space to continue tutorial",
				element: 'sf-m[name="module-url"] .content > div:nth-child(1)', delayShow: 700, onClick: 'next'
			}, {
				message:"After the new module was loaded, the new nodes may appear on this list. You can drag and drop it to the sketch container to create nodes. Have fun!",
				element: 'sketch-panel-left .node-list .tree-view', delayShow: 700, onClick(){
					Tutorial.next();
					SmallNotif.add("You've completed the tutorial 🎉", 'green');
				}
			}]);
			Tutorial.next();
		},
		async "Import external Telegram module examples"(){
			await Swal.fire({
				title: 'Preparation',
				icon: 'info',
				html:'First.. Right click and copy <a style="color: lightblue" href="https://github.com/Blackprint/nodes-telegram" target="_blank">this</a> repository URL',
				showCloseButton: false,
				showCancelButton: false,
			});
			
			await My.resetTutorial();
			Tutorial.loadTutorial([{
				message:"Let's go to sketch page by clicking this button",
				element: '.welcome-text .content .item:nth-child(1)', onClick: 'next'
			}, {
				message:"Open module example list by clicking this",
				element: '.header-menu [title="Module examples"]', onClick: 'next', delayShow: 700
			}, {
				message:"Paste the repository URL here and press enter",
				element: 'sf-m[name="module-example-list"] input', onClick(){
					Tutorial._domChanged($('vw-modal')[0], ()=> Tutorial.next());
				}, delayShow: 700
			}, {
				message:"Here you may find the example list for the module, click it to begin importing",
				element: 'sf-m[name="module-example-list-deep"] .list', onClick(){
					Tutorial._domChanged($('vw-modal')[0], ()=> Tutorial.next());
				}, delayShow: 700
			}, {
				message:"For security and debugging purpose, this window will appear before begin importing required modules and the nodes. If you're confident with it, let's press the Import Sketch button.",
				element: 'sf-m[name="sketch-importer"]', onClick(){
					Tutorial._domChanged($('sf-space[blackprint] sf-m[name="cables"]')[0], ()=> Tutorial.next());
				}, delayShow: 700
			}, {
				message:"After the example was loaded, find and read the notes. The example may have a tutorial to begin with.",
				element: 'bpic-decoration-text-notes > div', onClick: 'next', delayShow: 1000
			}, {
				message:"To edit your environment variables for your editor, you can click here:",
				element: 'sketch-panel-left .variable-list > .tree-item:nth-child(2) > .button', onClick: 'next', delayShow: 700
			}, {
				message:"Some example may require you to fill this variables, just follow the notes if it exist. Have fun!",
				element: 'sf-m[name="environment-variables"] .content', delayShow: 700, onClick(){
					Tutorial.next();
					SmallNotif.add("You've completed the tutorial 🎉", 'green');
				}
			}]);
			Tutorial.next();
		}
	};

	My.init = My.hotReloaded = function(){ My.list = list }
	My.resetTutorial = async function(){
		Modal.hide();
		await views.goto('/');
		Tutorial.clearTutorial();
		await new Promise(resolve => setTimeout(resolve, 300));
	}
});
</script>

> More tutorial will be added in the future 😉