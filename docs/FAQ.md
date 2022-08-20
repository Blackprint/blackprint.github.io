## Frequency Asked Question

### Can I use Blackprint for commercial software?
Yes, you're free to use **Blackprint Engine** and **Sketch** for your commercial software. But for the **Blackprint Editor** I didn't recommend you to use it as a base for your final product as it's fast moving project and the code base will changes randomly.

### Why is this project is free?
Originally the author of Blackprint is a game developer and a freelancer, I already realize that I may not be able to full time working on all of projects that I have. I will always check and give support for people who have an issue when using my libraries or project that I have made. I didn't intend to make any profit, and Blackprint is free to use for your company or commercial project and hoping you would contribute back (module/nodes/bug fixes/support) for Blackprint. With this mindset for being open source, I also hope I can use your contribution for my project and Blackprint ecosystem could grown more larger that ever.

### When version 1.0 will be released?
Currently Blackprint can be considered still in beta version, I approximate around 2023 will be the final release for this beta version. Blackprint `v1.0` will be released once all planned features are done and tested.

In this beta version breaking changes may happen on incremental of `v0.x.0`, new features and bug fixes may happen on `v0.0.x`. If the API is already being used and documented, the breaking changes will also be documented on `CHANGELOG.md`. We expect some constructive feedback and healty discussion to help Blackprint grow more better.

### This is looks similar with UE Blueprint, did you copy their code?
No! Initial development of Blackprint Engine and Sketch is made with JavaScript, there's no code that has been copy and pasted or adapted from their code. The author of Blackprint also have never used UE Blueprint when developing Blackprint in 2020. The things that looks similar is the node's theme (user interface design), and it can be customized with HTML and CSS if you prefer other design/theme.

### Do you have any plan to make the code base more modular using ES Modules?
Yes, actually you're free to make it modular and I will happily to merge your Pull Request if it's working. But currently some template like `.sf` extension couldn't be compiled with Vite or Webpack, we need to make a custom plugin to make it possible and currently I only have a custom compiler for it.

### Can you develop Blackprint Sketch with Vue/React as the code base instead?
I would like to, but I think it will a bit more complex and also I don't have time for working on it. Even I already made it, I may not touch it for a while because I also work on something else.