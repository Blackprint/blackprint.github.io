## Register Node
This registration is **necessary**.
Every node is registered in a namespace and every namespace need to be capitalized.

## Register Interface
This is an **optional** registration.<br>
Interface registration is necessary if you want to use different user interface for the nodes, or giving an API for developers to interact with your node's functionality with code/scripts. Think of **node** is internal device/circuit and **interface** is something you can interact into.

Every interface is registered in a namespace, every namespace need to be capitalized and starts with `BPIC/...`. BPIC stands for `Blackprint Interface Component`.

## Register Sketch Interface
This is an **optional** registration and **can only be registered for Browser environment**.<br>
You can also just extends from the class you have registered with `Blackprint.registerInterface()`.