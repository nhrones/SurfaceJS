Web Components - custom elements with sandboxed styles and some JavaScript logic to them.

DOM elements have attributes and properties. This is so that they can be represented as HTML. Attributes accept only strings while properties being a JS interface can handle any value. Native DOM elements have many rules around specific attributes/properties like how some are boolean (existence means they apply) while others are psuedo-boolean (needs an explicit "true"/"false"). Some properties reflect to attributes and others do not.

A goal of templating languages is to solve this in a uniform way. We can make special rules around known elements and attributes. But with custom elements we don't know. So this is why some templating libraries have interesting prefixes to indicate how things should be set. Even Solid's JSX we have attr:, prop: and bool: prefixes for this reason. Now every runtime location and compiler hook needs to be aware of this.

DOM elements can be cloned. But Custom Elements have different behavior which means they should be imported instead. They have DOM-based lifecycles that can trigger synchronously or asynchronously depending on when they upgrade. This wreaks havoc on things like Reactivity tracking and Context APIs. However, these details are important to interface with native DOM behaviors and events. These are also all things that a JavaScript Component doesn't worry about.

There are other idiosyncrasies like the way event targeting works in the Shadow DOM. Some events don't "compose" ie don't bubble beyond Shadow DOM boundaries. Some events don't bubble consistently because they don't recognize a different target, like in "focusin", because the Shadow Host is always made the target no matter which child element gains focus. We could talk about these for days but I don't want to divert to much attention here. Some things are today's shortcomings and some are by design. But the commonality here is they all require specific consideration that otherwise wouldn't be necessary.

Early standardization would have been catastrophic. But it also has the potential to stifle future innovation along certain paths because it assumes too much. Improvements to hydration, things like Resumability, Partial or Selective Hydration depend on event delegation to work. But if Shadow DOM messes with that then how could Web Components fit that model? SSR some might say was an oversight because we didn't think about that much in 2013, but this gap only continues to grow over time.

If anything with compilers and advancements in build tools, we are moving more in the direction away from components being anything more than a Developer Experience consideration. Something you have at authoring time that vanish from the final output. For optimal user experience we optimize away the components.

Frontend is a much more restrictive space. The cost of each kilobyte of JS is not insignificant. It isn't only maintenance why you wouldn't want to mix and match but to reduce payload. And this is where the wheels start coming off.

Realistically you will update your libraries in lockstep which is also the same with any library. And in those cases if you only have a single library on your page Web Components aren't doing anything for you but adding more overhead. Possibly getting in the way of features that the library provides now and in the future. You might as well use the library without the Web Components.