## Blackprint settings
You can modify the settings like below:
```js
Blackprint.settings(name, value);
```

|Name|Data Type|Availability|Description|
|---|---|---|---|
|`visualizeFlow`|Boolean|Sketch|Turn this off if you don't want to see glowing cables that visualize the data flow|
|`windowless`|Boolean|Sketch|In case you run Blackprint Sketch not in a browser, you must set this to true. Otherwise Blackprint may throw error on some environment like Node.js or Deno|