## Create from template
To begin creating nodes module, it's better to start from a template where it already include default settings, file, and compiler's configurations so you can just run the module server and start modify the module template. Blackprint CLI provide a tools for compiling, serving your module, and also can create template for you:

You can install the CLI globally
```sh
$ pnpm i -g @blackprint/cli-tools
$ cd /your/project/folder
$ blackprint create
```

Or install it locally, depends on your preferences
```sh
$ cd /your/project/folder
$ pnpm i @blackprint/cli-tools
$ npx blackprint create
```

### Module server for development
The `build` and `serve` command will watch for `blackprint.config.js` from current working directory and search deeper inside of `nodes` directory. So.. make sure you're not putting `node_modules` inside of `nodes` directory, or it will fill up your computer memory.

To use run the server, you can execute this command on the root of your project.
```sh
$ blackprint serve
```

**Blackprint Editor** also allow you to change it's module server for development purpose. To enable this feature you need to go to the sketch page and open the main menu **(Remote -> Module server)**. All you need to do is wait for the compiler to output your server URL like below and paste the `http://localhost:6790` into module server's input box on Blackprint Editor. After the editor get connected, you can start modifying your code and it will be hot reloaded on the editor.

```sh
[Browsersync] Access URLs:
 ------------------------------------
    Local: http://localhost:6790
 ------------------------------------
```

![brave_k7lJX6nAiA](https://user-images.githubusercontent.com/11073373/185054909-77e2986a-482b-49e7-88e2-244daf0e48aa.jpg)

> Please remember not to connect to untrusted server as it can hot reload the script and may be able to control this editor. This should only be used for development only, and this feature **only available on Development Mode**.

### Build command
If you want to build the module without running a server, you can run this command on the root of your project:
```sh
$ blackprint build
```

To minify the files for production, you can use `production` or `prod` build mode:
```sh
$ blackprint build prod
```

If you installed the CLI locally with `package.json` on your project, you need to use `npx`:
```sh
$ npx blackprint build
```

### Project directory structure
Required directory structure:
- `package.json` : Package/module information
- `src/**/*.js` : Structured with node's namespace to make it easier to find the nodes by it's namespace
- `example/*.json` : Examples that can be loaded from Blackprint Editor