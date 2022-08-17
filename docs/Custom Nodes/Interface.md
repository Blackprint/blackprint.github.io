Interface event can be listened after the node was initialized.
To register a callback for an event you need to call `iface.on('event.name', function(...Arguments){ })`

Arguments on the table above with {...} is a single object.
DropDowns is an array, and you can push a callback or nested menu inside it.

```js
iface.on('port.menu', function(data){
    data.menu.push({
        title:"With callback",
        callback:function(){...}
    });

    data.menu.push({
        title:"Callback with arguments",
        args:[1, 2],
        callback:function(one, two){...}
    });

    data.menu.push({
        title:"Callback with context",
        context:data.port,
        callback:function(one, two){
            // this === data.port
        }
    });

    data.menu.push({
        title:"When mouse over the dropdown item",
        hover:function(){...},
        unhover:function(){...},
    });

    data.menu.push({
        title:"Deep level menu",
        deep:[{
            title:"Level 1",
            deep:[{
                title:"Level 2",
                deep:[{...}]
            }]
        }]
    });
})
```