This folder contains new node element to be registered into Blackprint.

This is where the [js file control the template](https://github.com/ScarletsFiction/ScarletsFrame/wiki/Component) and being registered as new Blackprint node. The simple explanation is a place where the JavaScript interact with the HTML and vice versa.<br>
Then we can register a Blackprint handler for it later.

> ScarletsFrame control the DOM element system, and Blackprint control your node flow.
> So you can create your own handler on Blackprint and control for every node element.

HTML template are compiled from gulpfile.js and you can check it on `window.templates`.<br>
To change the root path (`nodes/button.html` to `myProject/nodes/button.html`), you need to change `default` to another `myProject`.

If the template was not found on `window.templates`, try to save your `.html` again because the compiler haven't watch the newly created file.