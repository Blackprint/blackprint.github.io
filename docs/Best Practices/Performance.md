## Performance
Blackprint is awesome for quickly prototyping your application. But if everything is done in Blackprint and your application is using so many nodes and cable, things will get complicated and performance slow down may occurs. Especially if you connect with nodes that have a large loop, lot of operation, complex math, or lots of output update you will need them to be simplified as a single custom node (with native code) if possible.

Below is few hint to help avoid performance impact for your application:
- Less node is better than many nodes
- Less data flow through cable is better
  - Having so many output update may impact the performance
  - Try to simplify multiple node into a single node if possible
- Routed nodes is better as it can reduce data race on every output update
- Reuse the output data instead of cloning