## Frequency Asked Question

### Can I use Blackprint for commercial software?
Yes, you're free to use **Blackprint Engine** and **Sketch** for your commercial software. But for the **Blackprint Editor** I didn't recommend you to use it as a base for your final product as it has rapid changes, and the code base will changes randomly except the exposed API.

### Why is this project is free?
Originally the author of Blackprint is a game developer and a freelancer, I already realize that I may not be able to full time working on all of projects that I have. I will always check and give support for people who have an issue when using my libraries or project that I have made. Blackprint will stay using MIT License, free to use for your company or commercial project and hoping you would contribute back (module/nodes/bug fixes/support) for Blackprint.

### When version 1.0 will be released?
Currently Blackprint can be considered still in beta version, I already done most of the planned engine feature. But I still looking for some bug fixes + improvement and trying to create larger project using Blackprint. If the engine doesn't have any breaking changes for more than one year, then it may be ready to be released as `v1.0` and will follow semantic versioning.

In this beta version breaking changes may happen on incremental of `v0.x.0`, new features and bug fixes may happen on `v0.0.x`. If the API is already being used and documented, the breaking changes will also be documented on `CHANGELOG.md`.

### This is looks similar with UE Blueprint, did you copy their code?
No! Blackprint is inspired with UE's Blueprint but the initial development of Blackprint Engine and Sketch is made with JavaScript, and there's no code that has been copy and pasted or adapted from their code. The author of Blackprint also have never used UE Blueprint when developing Blackprint in 2020. It visually may looks similar with UE's Blueprint because of the node's theme (user interface design), you can also customize the theme with HTML and CSS if you prefer other design/theme.

### Do you have any plan to make the code base more modular using ES Modules?
Yes I have a plan. But feel free to make it modular or use TypeScript, I will happily to merge your Pull Request if it's working. Currently some template like `.sf` extension couldn't be compiled with Vite or Webpack, we need to make a custom plugin to make it possible and currently I only have a custom compiler for it.

### Can you develop Blackprint Sketch with Vue/React as the code base instead?
I would like to, but I think it will a bit more complex and also I don't have time for working on it. Even I already made it, I may not be able to maintain everything by myself because I also have to work on something else.

But I already provide an integration example for the Blackprint Engine, and you can easily integrate the engine with Vue (with reactivity) / React (with listener) to rewrite the Blackprint Sketch that was written using ScarletsFrame (with reactivity).

---

We expect some constructive feedback and healty discussion to help Blackprint grow more better.