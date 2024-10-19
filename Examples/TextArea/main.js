
//import {
   //logThis,
   //mainloop, 
   //containerInit, 
   //hydrateUI,
   //initCloseButton,
   //initCheckbox,
   //render,
   //TextEditor,
   //Events
//} from "./deps.js";

import { logThis } from "./logger.js"

import { 
   buildSignalAggregator,
   initCloseButton, 
   containerInit, 
   hydrateUI, 
   render,
   TextEditor, 
} from "./deps.js";

export const Signals = buildSignalAggregator({})

// Unpack Configuration Files
import { cfg } from "./cfg.js";
import manifest from './view_manifest.js'
/** Our only DOM element -- a single canvas */
const surfaceCanvas = document.getElementById('surface')

// Initialize the Host Container 
containerInit( // REQUIRED - must be first call
   //'DWM-GUI TextArea Example', // sets window title
   surfaceCanvas,   
   cfg,
   manifest,
)

/** initialize the close button */
initCloseButton('closebutton')

const textEditor = new TextEditor( 'TextArea1', `First line.
Second line.` )

// Build and Display the Apps GUI
hydrateUI() // REQUIRED - after the App is initialized

// kickstart our editor session
//@ts-ignore
Signals.fire('Focused', "TextArea1", false)
// clear the log
logThis("Started!", "", true) 

// Main Render Loop
render // MUST be the LAST call in main.ts
