## Performance
Blackprint is awesome for quickly prototyping your application. But if everything is done in Blackprint and your application is using so many nodes and cable, things will looks complicated and performance slow down may occurs. Especially if you connect with nodes that have a large loop, lot of operation, complex math, or lots of output update you will need them to be simplified as a single custom node with native code.

Blackprint shouldn't be used for **visual scripting** (except if you have code generator module), but instead should be used as **visual programming** utility (where each node is like a plug and play module).

But the choice is still yours depends on your application's cases, Blackprint will always try to improve performance internally as a visual programming tools.

---

### Hint
Below is few hint to help reduce performance impact for your application:
1. Less node is better than many nodes
    - Try to simplify multiple node into a single node with native code if possible
    - Convert some of your function node to native code if possible
2. Less data flow through cable is better
    - Having so many output update may impact the performance (like for loop)
3. Routed nodes is better as it can reduce data race on every output update
4. Reuse the output data instead of cloning
    - You can create/use reroute cable (double click cable) to help organizing your nodes flow
5. Use **Blackprint Engine** only instead of **Blackprint Sketch** in production if you don't need an editor for your users
    - Using **Blackprint Sketch** will bind some node's object properties to update HTML UI element, it's an additional unnecessary work for your application
6. Reduce event listener registered on instance, node, or port
    - And also avoid listening to any event with `*` except for debugging
    - Usually port's `value` event will more often for being called
7. When you're creating a module, try to compare your code with some alternative code and benchmark it and use the fastest one if possible
    - For JavaScript you can use JSBench for benchmarking
    - Example: `.forEach(...)` is slower than `for(let i=0; ...)`
8. Lock the engine instance with `instance.lock()` on production
    - This will disabling instance modification like createNode, deleteNode, dynamic cable connection, or port creation/deletion
    - The engine will do some optimization, and the instance can't be unlocked after being locked