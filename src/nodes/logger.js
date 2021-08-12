// == For Standalone Engine ==
// You must design this to support non-browser JavaScript
// As you can just copy/import this into Node.js or Deno script
Blackprint.registerInterface('nodes/logger', function(iface, bind){
	var log = '...';
	bind({
		get log(){
			return log;
		},
		set log(val){
			log = val;
			console.log("Logger:", val);
		}
	});
});