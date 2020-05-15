// Wrap all .js scripts until _z_end.js
// This will run after all script was loaded
$(function(){

// Blackprint.space = Namespace (https://github.com/ScarletsFiction/ScarletsFrame/wiki/Namespace)
// sketch.scope = shortcut to obtain your model scope/context

var sketch = window.sketch = new Blackprint.Sketch();
sketch.settings('visualizeFlow', true);