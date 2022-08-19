## Welcome to Tutorial List
Here you can find some tutorial made for this Blackprint Editor. Some tutorial like using external nodes made by other developer or outside of this editor may not be covered here.

> More tutorial will be added in the future 😉

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
				element: '.header-menu i.fa-boxes', onClick: 'next', delayShow: 700
			}, {
				message:"Click this to search module from NPM registry",
				element: 'sf-m[name="module-url"] i.fa-book-open', onClick: 'next', delayShow: 700
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
				message:"After the new module was loaded, the new nodes may appear on this list. You can drag and drop it to create nodes. Have fun!",
				element: 'sketch-panel-left .node-list .tree-view', delayShow: 700, onClick(){
					Tutorial.next();
					SmallNotif.add("You've completed the tutorial 🎉", 'green');
				}
			}]);
			Tutorial.next();
		},
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