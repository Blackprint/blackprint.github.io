## Create from template
To begin creating nodes module, it's better to start from a template where it already include default settings, file, and compiler so you can just run the module server and start modify the module template. Blackprint CLI provide a tools for compiling, serving your module, and also can create template for you:

You can install this globally
```sh
$ pnpm i -g @blackprint/cli-tools
$ cd /your/project/folder
$ blackprint create
```

Or install it locally just for your project
```sh
$ cd /your/project/folder
$ pnpm i @blackprint/cli-tools
$ npx blackprint create
```

### Module server for development
The `build` and `serve` command will watch for `blackprint.config.js` from current working directory and search deeper inside of `nodes` directory. So.. make sure you're not putting `node_modules` inside of `nodes` directory, or it will fill up your computer memory.

To use it, you can execute this command on the root of your project.
```sh
$ blackprint serve
```

Blackprint Editor does allow you to change it's module server for development purpose. To enable this feature so you can hot reload your module, you need to go to the sketch page and open the main menu **(Remote -> Module server)**. All you need to do is wait for the compiler to output your server URL like below and paste the `http://localhost:6790` into module server's input box on Blackprint Editor.

```sh
[Browsersync] Access URLs:
 ------------------------------------
    Local: http://localhost:6790
 ------------------------------------
```

![brave_k7lJX6nAiA](https://user-images.githubusercontent.com/11073373/185054909-77e2986a-482b-49e7-88e2-244daf0e48aa.jpg)

> Please remember not to connect to untrusted server as it can hot reload the script and may be able to control your browser. This should only be used for development only, and this feature **only available on Development Mode**.

### Build command
To build the module, you need execute this command on the root of your project.
```sh
$ blackprint build
```

To minify the files for production, you can use `production` or `prod`.
```sh
$ blackprint build prod
```

If you installed this locally with `package.json` on your project, you can use `npx`.
```sh
$ npx blackprint build
```