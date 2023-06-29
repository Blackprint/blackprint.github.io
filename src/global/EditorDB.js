$(() => {
	// Let's begin the initialization
	window.EditorDB = new SFDatabase('EditorDB', {
		// When you have changed the DBStructure you need to update this version
		idbVersion: 1,
		websql: false, // We will use IndexedDB
	
		// Your database table's structure
		structure: {
			Settings:{
				$name: ['text', 'unique'], // indexed name
				value: 'any',
			},
		},
	}, function(){
		Object.assign(EditorDB, {
			getSettings(name){
				return new Promise(resolve => {
					this.get('Settings', 'value', { name }, resolve);
				});
			},
			setSettings(name, value){
				return new Promise(resolve => {
					this.has('Settings', { name }, exist => {
						if(exist === false)
							this.insert('Settings', { name, value }, resolve);
						else
							this.update('Settings', { value }, { name }, resolve);
					});
				});
			}
		});
	
		dbInit();
		Events.DBReady = true;
	});
	
	async function dbInit(){
		window.EditorWorkingDir = await EditorDB.getSettings("EditorWorkingDir");
		if(EditorWorkingDir != null){
			Object.setPrototypeOf(EditorWorkingDir, CustomDirectory.prototype);
			EditorWorkingDir.reconstruct();
	
			$(window).once('click', async () => {
				await EditorWorkingDir.handle.requestPermission();
				Events.EditorWorkingDirReady = true;
				Events.EditorWorkingDirChange();
			});
		}
	
		$(window).once('beforeunload', function(){
			EditorDB.setSettings('MyStorage', window.MyStorage);
		});
	
		let myStorage = await EditorDB.getSettings('MyStorage');
		if(myStorage != null) _.merge(MyStorage, myStorage);
	}
});