## Views routing directory
> Views:
> <vw-ground>
>   <vw-page>  <-- Target
> </vw-ground>

Any files with `.sf` will be converted into routes that can be accessed with `views.goto('/sketch/...')`.

### Example
```js
views.goto('/sketch/1') // Target: src/routes/+vw-ground/sketch+vw-page/_page.sf
views.goto('/sketch/2') // Target: src/routes/+vw-ground/sketch+vw-page/_page.sf
```