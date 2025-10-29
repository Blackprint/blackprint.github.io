## Contributing to Blackprint Editor
First of all, thanks for taking the time to contribute!<br>
To help you contribute to this project we have created some hint and guidelines for our contributors.

### Table of Content
 - [What Contribution Do We Accept?](#what-contribution-do-we-accept)
 - [Requesting an Feature](#requesting-an-feature)
 - [The Build Script: how it works](#the-build-script-how-it-works)
 - [Views/Routes](#viewsroutes)
   - [Page Routes](#page-routes)
   - [Popup/Modal Routes](#popupmodal-routes)
 - [Add or using global component](#add-or-using-global-component)
   - [Small Notification](#small-notification)
   - [Drop Down menu](#drop-down-menu)
 - [Cloned window or Minimap](#cloned-window-or-minimap)

---

### What Contribution Do We Accept?
Any well-intentioned contribution is welcomed, for the example:
1. Bug fixes
2. New feature (please create issue with the use case to be reviewed first)
3. Improve documentation or guidelines
4. Financial contribution
5. Promote and spread the words about Blackprint
6. Joining the community and help other people

---

### Requesting an Feature
To request an feature, you can create an issue in the repository. Please follow these simple guidelines:

1. Search for other issues already requesting the feature
2. If an issue doesn't exist, create an issue with the template on GitHub Issue
3. Please create separate issues for each feature

---

### The Build Script: how it works
The build tools for this editor is using [ScarletsFrame's compiler](https://github.com/StefansArya/scarletsframe-compiler). You should also clone Blackprint Sketch + Engine from the [main repository](https://github.com/Blackprint/Blackprint) and also follow the guidelines on [there](https://github.com/Blackprint/Blackprint/blob/master/.github/CONTRIBUTING.md#the-build-script-how-it-works).

You may also need to change `<script>` URL on  `/index.html` and `/dev.html` if you want to test the engine or sketch library from the browser.

```xml
<!-- Comment this -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@blackprint/engine@0.10.0"></script> -->

<!-- Uncomment this -->
<script src="/dist/engine.min.js"></script>
```

---

## Views/Routes
The views routes is managed by [ScarletsFrame's compiler](https://github.com/StefansArya/scarletsframe-compiler). It's file based routing that was located on `/src/routes/...`, that's means you can just add `.sf` on the routes directory and it will be automatically added as a new route. Each folder with `+` symbol like `+vw-ground` is the views element.

`+vw-ground` => `<vw-ground>...</vw-ground>`

### Page Routes
| Info | Value |
| --- | --- |
| Views Element | `<vw-ground>` |
| Hash route | `#page` |
| File Root | `/src/routes/+vw-ground` |
| Global variable | `views` |

Example:<br>

```js
views.goto('/sketch/page/1');  //=> http://url.com/#page/sketch/page/1
views.goto('/sketch/page/2');  //=> http://url.com/#page/sketch/page/2

// When executing these code, The <vw-ground> page will be routed to
//> /src/routes/+vw-ground/sketch+vw-page/_page.sf

// Because using underscore, `_page` accept any value as route
// the number 1 will be put on as data = {page: 1}
// Please see _page.sf to see the listener on how to handle it

// When you're using inspect element, you may also found this HTML structure
/*
  <vw-ground>  --> (/src/routes/+vw-ground/...)
    <sf-page-view>
      <sf-m name="sketch-pages">  --> /src/routes/+vw-ground/sketch.sf
        <vw-page>  --> (+vw-page/...)
      </sf-m>
    </sf-page-view>
  </vw-ground>
*/
```

### Popup/Modal Routes
Modal is used for showing popup element.

| Info | Value |
| --- | --- |
| Views Element | `<vw-modal>` |
| Hash route | **Disabled** |
| File Root | `/src/routes/+vw-modal` |
| Global variable | `modal` |

Example:<br>

```js
// Hash route is not enabled for <vw-modal>
modal.goto('/module-url');  //=> /src/+vw-modal/module-url
modal.goto('/environment-variable');  //=> /src/+vw-modal/environment-variable

// When you're using inspect element, you may also found this HTML structure
/*
  <sf-m name="modal">  --> /src/model/modal.sf
    <div>
      <vw-modal>  --> (/src/routes/+vw-modal/...)
        <sf-page-view>
      </vw-modal>
    </div>
  </sf-m>
*/
```

---

### Add or using global component
Global component on Blackprint Editor is used as a shared behaviour that can be called globally.

These component should be saved on: `/src/component/...`<br>
Example:<br>

#### Small Notification
```js
// Add blue "Hello world" notification on the top right corner for 1 second
SmallNotif.add("Hello World", "blue", 1e3);
// color: blue, yellow, red, green
```

#### Drop Down menu
```js
// This will create drop down menu at position x200, y100
DropDown.show([{
  title: "Hello", callback(){ ... }
}, {
  title: "Nested", deep:[{
    title: "World", callback(){ ... }
  }]
}], {
  x: 200, y: 100, // You can also use 'event' or target 'element'
  // 'title', 'className' <- Optional
});
```

---

### Cloned window or Minimap
The cloned window for Blackprint Sketch is handled by ScarletsFrame (`new sf.Window()`). For reference, it was being called from `/src/routes/+vw-ground/sketch+vw-page/_page.sf` on `js-global` at `My.cloneContainer`. The minimap and the cloned window is just a clone of the original sketch container on this Blackprint Editor.

For the Minimap itself, the cloned sketch is being saved on `SketchPages.miniViewer.topRight` slot on `/src/routes/+vw-ground/sketch.sf`.