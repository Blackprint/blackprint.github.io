function isConnectablePort(clazz, target){
	if(target === clazz)
		return true;

	if(clazz === Object || target === Object) return false;

	if(clazz.constructor === Array || target.constructor === Array){
		if(target.constructor === Array){
			let temp = target;
			target = clazz;
			clazz = temp;
		}

		for (var i = 0; i < clazz.length; i++) {
			if(isConnectablePort(clazz[i], target))
				return true;
		}

		return false;
	}

	if(target.any || clazz.any) return true;
	if(target.constructor === Object || clazz.constructor === Object) return false;
	if(target.prototype instanceof clazz || clazz.prototype instanceof target)
		return true;

	return false;
}