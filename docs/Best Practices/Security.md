## Security
For your information, **Blackprint Engine** and **Sketch** didn't use any `eval` or `Function('eval')` for executing the nodes as Blackprint only handle the data flow between nodes and help you visualize it and manage it. But on this **Blackprint Editor**, `eval` is being used for: 
- This documentation's `<script>` content (triggered when you open this documentation)
  - This documentation is made and open sourced on GitHub [repository](https://github.com/Blackprint/blackprint.github.io/tree/master/docs)
- Creating a custom node with Monaco code editor (triggered when you click the execute button)
  - It's a facilities from <a onclick="Modal.goto('/custom-node-editor')">this editor</a>
- ScarletsFrame's framework does use `Function(...)` when compiling HTML templates.

### Creating HTML Template
When you want to create a user interface template for Blackprint Sketch, it will use ScarletsFrame to help rendering your template into HTML elements. ScarletsFrame will automatically escape contents that being outputted from the mustache template, for the example:

```html
<div> {{ contentFromUser }} <div>

<div attrs=" {{ contentFromUser }} "><div>
```

If the user or untrusted content is being passed into `contentFromUser` like:
```js
'<script>alert("hello")</script>'
```

It would be escaped and will looks like this in raw HTML:
```html
<div> &lt;script&gt;alert("hello")&lt;/script&gt; </div>

<div attrs="\x3Cscript>alert(&quot;hello&quot;)\x3C/script>"><div>
```

Below is an evaluated example inside this editor, try inspect it with DevTools and ScarletsFrame's inspector:
<div>
	<docs-security-test-vuln>
		<div attrs=" {{ contentFromUser }} "> {{ contentFromUser }} </div>
	</docs-security-test-vuln>
</div>

Users will see it just like the original text, and it helps to prevent a script injection to your project from your template. But there are also some implementation that you **must avoid** like:

Using template inside event listener's attribute:
```html
<a onclick="{{ dynamicFunctionCall }}"></a>

<!-- Or also -->
<a @click="{{ dynamicFunctionCall }}"></a>
```

Not only for `click` event, but any event must avoid using a mustache template inside of it. Even mustache template also escape HTML on attributes, it doesn't strip out the text that may be a valid script content.

---

### Using dynamic HTML template
The framework also have dynamic template feature that can evaluate your template script with `{{@if ... }}` and `{{@exec ... }}`. If you use these feature, you must know how to escape and implement the template properly as it will be dangerous if it's generated a `<script>` tag from your users.

When dealing with dynamic template and you want to output a HTML element from inside of it, you need to escape it with enclosed template `{[ ... ]}`. It's safe to use mustache template inside of it `{[ <a> {{ userContent }} </a> ]}`, just don't ever forget to avoid using mustache inside of event attributes.

```js
<div title="some-menu">
	{{@exec
		// You can freely write your JavaScript inside this dynamic template
		if(user.loggedIn){
			{[ <a> {{ user.name }} </a> ]};
		}
		else {
			{[ <a> Click here to login </a> ]};
		}

		// If you returning a text here it will be not escaped, so becareful!
		// return "";

		// If you returning a element here you also need to be careful and escape the content! (if have any)
		// return document.createElement('div');
	}}
</div>
```

With the above template, if the `user.loggedIn` is `true` and `user.name` is `Alex <script>alert("hello")</script>` it will return:
```html
<div title="some-menu">
	<a> Alex &lt;script&gt;alert("hello")&lt;/script&gt; </a>
</div>
```

If the `user.loggedIn` is `false` then it will return:
```html
<div title="some-menu">
	<a> Click here to login </a>
</div>
```

Below is an evaluated example inside this editor, try inspect it with DevTools and ScarletsFrame's inspector:<br>
You can also change the Boolean manually from SF inspector.
<div>
	<docs-security-test-vuln>
		<div>
		{{@exec
			if(user.loggedIn){
				{[ <a> {{ user.name }} </a> ]};
			}
			else {
				{[ <a> Click here to login </a> ]};
			}
		}}
		</div>
	</docs-security-test-vuln>
</div>

### Creating element from string
When creating element dynamically from a string you must avoid using dynamic content from user or data received from backend that haven't been sanitized from the frontend side. For the example:

```js
$(document.body).append("<div>" + dynamicContent + "</div>");
```

If user of your backend server send a data that contain this string `<script>alert("hello")<script>` in the `dynamicContent`, it will generate an element like this and being appended on `document.body`.

```html
<body>
	<div><script>alert("hello")<script></div>
<body>
```

The example above may lead to script injection vulnerability for your application, so don't forget to sanitize any user input/content or backend data when creating element from a string. For the example when you're using sQuery from ScarletsFrame:

```js
$(document.body).append("<div>" + $.escapeText(dynamicContent) + "</div>");
```

After using `$.escapeText`, you will get output like below in raw HTML.

```html
<body>
	<div>&lt;script&gt;alert("hello")&lt;script&gt;</div>
<body>
```

Below is an evaluated example inside this editor, try inspect it with DevTools and ScarletsFrame's inspector:
<div>
	<docs-security-escape-text></docs-security-escape-text>
	<script>
		setTimeout(function(){
			$('docs-security-escape-text').append("<div>" + $.escapeText('<script>alert("hello")<script>') + "</div>");
		}, 1000);
	</script>
</div>

## Secure your application with Content Security Policy
It's recommended to have CSP enable for your site. Even you're 100% sure about your library or backend security, if you didn't enable this security then your client network or browser can still be vulnerable to script injection. You should only allow (whitelist) any network request into your trusted domain only and resource from unknown domain will be restricted by default. CSP can also help you mitigate any `eval` or `Function` usage in your application. It's very **not recommended** to use `eval` if the **string content is dynamic** and can coming from other source like user input, you should find alternative way instead and remove `eval`.

If you're disabling eval, **Blackprint Engine** must be used on production as **Blackprint Sketch** is using **ScarletsFrame** to help compiling HTML templates on the fly. Compiling HTML templates dynamically may use `Function(...)`.

As long the templates can't be manipulated or created dynamically by user input, doesn't execute user input, and the output is sanitized, it still safe.

### CSP Example
For example and information please visit https://content-security-policy.com/<br>
Ultimately just make default to none and just enable/allow source that you recognize.

```html
<head>
	<meta http-equiv="Content-Security-Policy" content="default-src none;">
</head>
```