## Load the engine and modules
<docs-md-tabs>
<div class="tabs"><div sf-each="x in tabs">{{ x }}</div></div>

<div tab="Browser">

In the browser you can easily import from CDN, and just begin writing your code in `<script>` tag

```html
<!-- Put this in <head> -->
<script src="https://cdn.jsdelivr.net/npm/@blackprint/engine@0.7" crossorigin="anonymous"></script>

<!-- [Optional] Load required modules -->
<!-- If you didn't do this, Blackprint Engine may load from module list that specified on the exported JSON -->
<script src="https://cdn.jsdelivr.net/npm/...[the required module URL]..." crossorigin="anonymous"></script>
```

</div><div tab="Node.js">

#### Installing the engine

```sh
# You can use PNPM or NPM when installing packages
$ pnpm i @blackprint/engine
```

#### Load required module
In this example we will name the file as `init.js`

```js
// Initialize the engine first
let Blackprint = require("@blackprint/engine");

// [Optional] Blackprint can also load from module list specified on the exported JSON
require("...[the required module URL]...");
```

#### Run your application
If you don't load any modules by URL you can use this command:

```sh
$ node init.js
```

---

If you want to load modules by URL, you need to use a https loader:
> You must use `.mjs` as the entry point's file extension

```sh
$ node --no-warnings --loader ./node_modules/@blackprint/engine/es6-https-loader.mjs ./init.mjs
```

</div><div tab="Deno">

#### Load the engine from CDN
In this example we will name the file as `init.js`

```js
// Initialize the engine first
import Blackprint from 'https://cdn.skypack.dev/@blackprint/engine@0.7';
```

#### Run your application
Blackprint for Deno will load modules from URL, you just need to make sure the exported JSON does contain the required module list.

```sh
$ deno run --allow-net ./init.mjs
```

</div><div tab="PHP">

#### Installing the engine package
```sh
$ composer install blackprint/engine
```

After that you can just import with autoload, or maybe also install another required nodes module.

```php
require_once('vendor/autoload.php');
```

</div><div tab="Golang">

#### Installing the engine package
```sh
$ go get https://github.com/Blackprint/engine-go
```

#### Write your entry point file

```go
package main

import (
	Blackprint "github.com/blackprint/engine-go/blackprint"
	"github.com/blackprint/engine-go/engine"
	"github.com/blackprint/engine-go/types"
)

func main() {
	// ...
}
```

</div></docs-md-tabs>

## Create Engine Instance

```js
// If you load from CDN, "Blackprint" is registered in window object
import Blackprint from '@blackprint/engine';

// If you're running on Node.js and don't want to load modules from URL
// you need to manually imports the modules before calling 'createNode' or 'importJSON'

// Create Blackprint Engine instance
var instance = new Blackprint.Engine();
```

### Create node in instance
```js
var iface = instance.createNode('MyModule/Math/Multiply', {/* optional options */});
```

### Import nodes from JSON
```js
instance.importJSON(/* JSON || Object */);
```

### Clear all nodes in instance
```js
instance.clearNodes();
```

## Add event listener to the instance

|Event Name|Event Object|Description|
|---|---|---|
|`node.id.changed`|`{ iface: Interface, from: String, to: String }`|d|
|`cable.disconnect`|`{ port: Port, target?: Port, cable: Cable }`|d|
|`cable.connect`|`{ port: Port, target: Port, cable: Cable }`|d|

### Global event
|Event Name|Event Object|Description|
|---|---|---|
|`module.added`|`{ url: String }`|d|
|`module.update`|`null`|d|
|`module.delete`|`{ url: String }`|d|
|`environment.imported`|`null`|d|
|`environment.changed`|`{ key: String, value: String }`|d|
|`environment.added`|`{ key: String, value: String }`|d|
|`environment.renamed`|`{ old: String, now: String }`|d|
|`environment.deleted`|`{ key: String }`|d|