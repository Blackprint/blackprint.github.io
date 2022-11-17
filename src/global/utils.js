window._BPEditorUtils ??= {};
var utils = window._BPEditorUtils;

utils._nodeGitHub ??= {};
utils.openNodeSource = async function(node){
	// If Blackprint.Interface
	if(node.node != null && !(node instanceof Blackprint.Node))
		node = node.node;

	let namespace = node.iface.namespace;
	let objPath = namespace.split('/');
	let nodes = Blackprint.nodes;

	let toast = SmallNotif.add("Obtaining path", 'yellow', false);
	let result = false;

	try{
		for (var i = 0; i < objPath.length; i++) {
			nodes = nodes[objPath[i]];
			if(nodes == null) throw new Error("Node namespace was not found: "+namespace);
		}

		if(nodes._scopeURL == null)
			throw new Error("Can't view source because the node doesn't seems to be loaded from known URL.");

		if(nodes.isGenerated)
			throw new Error("Can't view source of node that was dynamically generated");

		// For JSDelivr
		if(utils._nodeGitHub[nodes._scopeURL] == null){
			let url = nodes._scopeURL;
			let ghName;
			let packageInfo;

			if(url.includes('@dist/') && url.includes('/gh/'))
				ghName = url.match(/\/\/cdn.jsdelivr.net\/gh\/(.*?)@dist\//)[1];
			else {
				if(!url.includes('/dist/')) throw new Error("'/dist/' was not found on the URL: "+url);

				toast.message = 'Obtaining "package.json"';
				url = url.split('/dist/')[0];
	
				try {
					packageInfo = await $.getJSON(`${url}/package.json`);
				} catch(e){
					throw new Error("Failed to fetch '/package.json'");
				}
	
				if(packageInfo.repository == null)
					throw new Error("'repository' field was not found on package.json file");

				ghName = packageInfo.repository.url
					.replace(/\.git$/m, '')
					.replace(/https?:\/\/.*?\//, '')
					.replace(/@/, '');
			}

			// var commitHash = await $.getJSON(`https://api.github.com/repos/${ghName}/commits?per_page=1`);
			utils._nodeGitHub[nodes._scopeURL] = `https://cdn.jsdelivr.net/gh/${ghName}@latest`;

			let sourceAlias = packageInfo?.blackprint?.source;
			if(sourceAlias != null){
				for(let key in sourceAlias){
					if(nodes._scopeURL.includes('/'+key)){
						utils._nodeGitHub[nodes._scopeURL] += '/'+sourceAlias[key];
						break;
					}
				}
			}
			else utils._nodeGitHub[nodes._scopeURL] += '/src';
		}

		let githubURL = utils._nodeGitHub[nodes._scopeURL];
		namespace = namespace.replace(/^.*?\//m, '');
		// return githubURL + '/' + namespace + '.js';

		try {
			toast.message = `Obtaining "${namespace}.js"`;
			result = await $.get(githubURL + '/' + namespace + '.js');
		} catch(e){
			console.error(`File can't be loaded: "${githubURL + '/' + namespace + '.js'}"`);
			throw new Error("Source was not found, maybe the settings on package.json was incorrect.");
		}
	} catch(e) {
		SmallNotif.add(e.message || "Something went wrong", 'red');
		console.error(e);
	}

	let list = SmallNotif.list;
	let ii = list.indexOf(toast);

	if(ii !== -1) list.splice(ii, 1);

	return { code: result, githubURL, scopeURL: nodes._scopeURL };
}