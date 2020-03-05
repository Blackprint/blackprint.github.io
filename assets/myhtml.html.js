undefined

if(window.templates === void 0)window.templates = Object.create(null)
window.templates['vw-ground/blackprint.html'] = '<img class="background" src="/assets/img/background/blackprint.jpg?1" onload="this.style.display=\'\'" style="display:none">\n\n<!-- Model on ./blackprint/header.js -->\n<sf-m name="header" class="header">\n	<div class="left">{{ message }}</div>\n	<div class="right" @click="toWorkspace">{{ description }}</div>\n</sf-m>\n\n<!-- Router handler on ./route.js -->\n<!-- We will import Blackprint/page template here -->\n<vw-sketch>\n	<!-- Default page for eye candy XD -->\n	<img src="/assets/img/candy.png" onload="this.style.display=\'\'" style="display:none;position:absolute;right:0;bottom:0">\n</vw-sketch>'
window.templates['vw-ground/getting-started.html'] = 'hy'