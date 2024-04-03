// deno-lint-ignore-file no-explicit-any
import baseManifest from "../base_manifest.js"
import { fire } from '../events/signals.js'

/** 
 * Give access to the current window configuration 
 */
export let windowCFG = {
   containerColor: "snow",
   textColor: "black",
};

/**
 * Expose the element descriptor collection
 * @type {any}
 */
export let elementDescriptors;

/** 
 * our application base-Manifest 
 */
let appManifest


/**
 * Initialize our configuration 
 *
 * @param {HTMLCanvasElement} theCanvas
 * @param {{ winCFG: { containerColor: string; textColor: string; }; nodes: any; }} cfg
 * @param {*} applicationManifest
 */
export const initCFG = (
   theCanvas,
   cfg, 
   applicationManifest
   ) => {
   canvas = theCanvas
   windowCFG = cfg.winCFG
   elementDescriptors = cfg.nodes
   appManifest = applicationManifest
}

export const fontColor = 'white'

/** 
 * Build a set of View factories from both 
 * the `baseManifest` and the `appManifest.
 * `
 * This will add each View_constructor function to 
 * a Map to be used later to construct View instances.
 */
export const getFactories = () => {

   // Get the base_Manifest' base URL.
   const baseUrl = new URL("./", appManifest.baseUrl).href;
   const factories = new Map()

   //add base frameWork component constructors first
   for (const [self, module] of Object.entries(baseManifest.Views)) {
      const url = new URL(self, baseUrl).href;
      const path = url.substring(baseUrl.length).substring("Views".length);
      const baseRoute = path.substring(3, path.length - 3);
      const name = sanitizeName(baseRoute);
      const id = name.toLowerCase();
      const newView = { id, name, url, component: module.default }
      factories.set(id, newView)
   }

   // add any custom components from the application
   if (appManifest.Views) {
      for (const [self, module] of Object.entries(appManifest.Views)) {
         const url = new URL(self, baseUrl).href;
         const path = url.substring(baseUrl.length).substring("Views".length);
         const baseRoute = path.substring(1, path.length - 3);
         const name = sanitizeName(baseRoute);
         const id = name.toLowerCase();
         const newView = { id, name, url, component: module.default }
         factories.set(id, newView)
      }
   }
   // return the View_constructors collection (Map) 
   return factories
}

/** 
 * Popup is being shown flag 
 */
export let hasVisiblePopup = false
export const setHasVisiblePopup = (/** @type {boolean} */ val) => hasVisiblePopup = val

/** 
 * A counter used to blink the caret (cursor) 
 */
export let tickCount = 0
export let solid = true
/**  
 *  we use this tickcounter (0-60) to drive a blinking caret 
 */
export const incrementTickCount = () => {
   tickCount++;
   if (tickCount > 60) {
      tickCount = 0 
      solid = !solid
      // fire 'blink' event
      fire('Blink', "", solid)
   }
}

/**
 * Expose our canvas
 * @type {HTMLCanvasElement}
 */
export let canvas

/**
 * Expose our context2D from canvas
 * @type {CanvasRenderingContext2D}
 */
export let ctx

export const setupRenderContext = (/** @type {HTMLCanvasElement} */ canvas) => {
   ctx = /** @type {CanvasRenderingContext2D}*/(canvas.getContext("2d"))
   refreshCanvasContext()
}


export const refreshCanvasContext = () => {
   ctx.lineWidth = 1
   ctx.strokeStyle = windowCFG.containerColor
   ctx.fillStyle = windowCFG.containerColor
   ctx.font = "28px Tahoma, Verdana, sans-serif";
   ctx.textAlign = 'center'
}

/**
 *  Converts a string to pascal casing
 */
function toPascalCase(text) {
   return text.replace(
      /(^\w|-\w)/g,
      (substring) => substring.replace(/-/, "").toUpperCase(),
   );
}

/**
 *  sanitize a file-name string
 */
function sanitizeName(name) {
   const fileName = name.replace("/", "");
   return toPascalCase(fileName);
}
