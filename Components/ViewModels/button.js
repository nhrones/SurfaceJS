
import { fire, on } from '../deps.js'

// used to recognize signals from a (decoupled) view
let thisID;

/**  
 * To be called by a main viewmodel
 * @param {string} id - a unique identifier name
 */
export const initButton = (id) => {
   thisID = id
   // listens for a touch event from a Button view with the same id 
   on('ButtonTouched', thisID, () => {
      // fire an event to show a popup
      fire('ShowPopup', '', { title: "", msg: [""] })
   })
}