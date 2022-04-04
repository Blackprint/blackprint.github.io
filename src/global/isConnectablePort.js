function isConnectablePort(source, clazz, target){
	if(target === clazz)
		return true;

	if(source === 'output'){
		if(clazz === Object) return false;

		if(clazz.constructor === Array){
			for (var i = 0; i < clazz.length; i++) {
				if(isConnectablePort(source, clazz[i], target))
					return true;
			}

			return false;
		}

		if(target.any) return true;
		if(target.prototype instanceof clazz)
			return true;
	}

	if(source === 'input'){
		if(target === Object) return false;

		if(target.constructor === Array){
			for (var i = 0; i < target.length; i++) {
				if(isConnectablePort(source, target[i], clazz))
					return true;
			}

			return false;
		}

		if(clazz.any) return true;
		if(clazz.prototype instanceof target)
			return true;
	}

	return false;
}