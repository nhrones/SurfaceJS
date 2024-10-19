//import { Events, logThis } from "./deps.ts"
import { Signals } from './main.js'
//todo move/make CheckBox component
// used to recognize events from a (decoupled) view
let thisID;
let checked = false
let txt = " ❌"

/**  
 * call from main viewmodel init 
 */
export const init = (id) => {
   thisID = id

   // listens for a touch event from this buttom 
   Signals.when('ButtonTouched', thisID, () => {
      const A = false
      //if (A) logThis("touched!", thisID + ' ButtonTouched!');
      Signals.send('UpdateButton', thisID,
         { text: txt, color: "white", enabled: true }
      )
   })

}