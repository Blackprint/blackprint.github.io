// Use sf.model so we can use the hot reload feature
sf.model('keyboard-shortcut', My => {
	My.workspacePanel = sf.model("project-panel-workspace"); // panel on the left
	My.projectList = sf.model("project-list"); // project tabs on top

	setTimeout(init, 1);
	function init(){
		if(My.initialized) return;
		My.initialized = true;

		$(window).on('keydown', My.workspaceShortcuts);
	}

	My.workspaceShortcuts = function(ev){
		if(ev.ctrlKey && ev.key === 's')
			My.saveInstanceTab(ev);
		else if(ev.ctrlKey && ev.key === 'o')
			My.loadInstanceTab(ev);
		else if(ev.altKey && /^[0-9]$/m.test(ev.key))
			My.switchInstanceTab(+ev.key);
		else return;

		ev.preventDefault();
	}

	My.saveInstanceTab = function(ev){
		My.projectList.saveTab(true);
	}

	My.loadInstanceTab = function(ev){
		console.log('load');
	}

	My.switchInstanceTab = function(index){
		let { projectList } = My;

		if(index === 0) index = 10;
		index--;

		let tab = projectList.list[index];

		if(tab == null) projectList.createTab();
		else projectList.switchTab(tab);
	}
});