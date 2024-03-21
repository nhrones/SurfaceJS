
//=================================================
//    Component Deps
//=================================================
//export * from '../Components/mod.ts'

//======================================
//      render 
//======================================

/* uiContainer.ts */
export { 
   addElement,
   containerInit, 
   hydrateUI, 
   render
} from './src/render/uiContainer.js'

/* activeNodes.ts */
export { 
   activeNodes, 
   addNode, 
   renderNodes 
} from './src/render/activeNodes.js'

/* renderContext.ts */
export { 
   canvas,
   ctx,
   elementDescriptors, 
   fontColor,
   getFactories, 
   hasVisiblePopup,
   incrementTickCount,
   initCFG, 
   refreshCanvasContext,
   setHasVisiblePopup,
   setupRenderContext,
   tickCount,
   windowCFG 
} from './src/render/renderContext.js'

//======================================
//      coms 
//======================================

export { signals, buildSignalAggregator } from './src/events/signals.js'
export { initHostEvents } from './src/events/systemEvents.js'
//TODO export type { CoreEvents } from './src/events/coreEventTypes.js'
//TODO export * from './src/types.js'
  