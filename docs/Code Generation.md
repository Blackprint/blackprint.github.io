## Code Generation
Code generation can be used to convert your Blackprint instance into native code and can be run without Blackprint Engine. But please take a note that **the module/nodes need to have their code registered to the Blackprint code generation module**.

> This feature still experimental and currently supported for JavaScript only. Because this project is targetting multiple language, please expect the generated code will be more longer/larger than a manually written code.

## How to use
Code generation module is separated from the sketch or engine module. To use it you must import the codegen module first.

```html
<script src="https://cdn.jsdelivr.net/npm/@blackprint/code-generation@0.1.1/dist/codegen.min.js" crossorigin="anonymous"></script>
```

### Register code
The code generation need to be registered with `registerCode(namespace, class)`. Some function name of the target language like `js, php, csharp` is reserved.

Below is a simple example of the code registration for `Data/Boolean/Compare/And` node.

```js
Blackprint.registerCode('Data/Boolean/Compare/And',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.MustHave;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			code: `Output.Value = Input["0"] && Input["1"];`,
		};
	}

	csharp(routes){ return this.php(routes); }
	php(routes){
		return {
			code: `Output["Value"] = Input["0"] && Input["1"];`,
		};
	}

	python3(routes){
		return {
			code: `Output["Value"] = Input["0"] and Input["1"]`,
		};
	}

	golang(routes){
		return {
			code: `Output.Set("Value", Input.Get("0").(bool) && Input.Get("1").(bool))`,
		};
	}

	rust(routes){
		return {
			code: `output.set("Value", input.get::<bool>("0").unwrap() && input.get::<bool>("1").unwrap());`,
		};
	}
});
```

### Generate codes
Currently this editor doesn't provide a button to generate code from the instance, but you can call the generator function with code below

```js
// 'CurrentSketch' is either Blackprint.Sketch or Blackprint.Engine
// 'js' is target language
// 'MyProgram' is variable name for storing the generated codes's exports
Blackprint.Code.generateFrom(CurrentSketch, 'js', 'MyProgram');
```