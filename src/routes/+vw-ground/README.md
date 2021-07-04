## Views routing directory
> Views: <vw-ground>

Any files with `.sf` will be converted into routes that can be accessed with `views.goto('/...')`.

### Example
```js
views.goto('/') // Target: src/routes/+vw-ground/index.sf
views.goto('/sketch') // Target: src/routes/+vw-ground/sketch.sf
views.goto('/sketch/1') // Target: src/routes/+vw-ground/sketch+vw-page/_page.sf
views.goto('/sketch/2') // Target: src/routes/+vw-ground/sketch+vw-page/_page.sf
```