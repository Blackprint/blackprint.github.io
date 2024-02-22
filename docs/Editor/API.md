## Editor API
Blackprint Editor does expose API from `window.BPEditor`, it's supposed to be used within nodes module. In the future if you're creating your own Editor you can just customize `window.BPEditor` with your custom functionality.

### Usage
Below is usage example on how to use the API.

#### Creating dialog
This Editor is using [SweetAlert](https://sweetalert2.github.io/#usage) for creating a dialog.

```js
// BPEditor.Dialog(...) == Swal.fire(...)
BPEditor.Dialog({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
});
```

If you want to try the code above, you can open your browser's devtools and enter it into the console. You will see an "error dialog" on this editor as `BPEditor` is exposed globally. If you're using TypeScript, you can also use `window.BPEditor` to fix the typecheck.

## Polyfill
If you're implementing your own editor from Blackprint Sketch, you will need to copy and paste code below to `<head></head>` before loading any nodes modules. You can also customize it if needed.

```html
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
	window.BPEditor = {
		Dialog: Swal.fire.bind(Swal),
	};
</script>
```