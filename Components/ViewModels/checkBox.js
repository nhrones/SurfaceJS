import { fire, on } from '../deps.js'

// used to recognize signals from a (decoupled) view
let thisID;

// an exported checkbox state flag
let checked = false

let txt = "  "
const checkmark = " ✅" //" ✔"
const empty =  "  "

/**  
 * To be called by a main viewmodel
 * @param {string} id - a unique identifier name
 */
export const initCheckbox = (id) => {
   thisID = id

   // listens for a touch event from this checkbox 
   on('CheckBoxTouched', thisID, () => {
      checked = !checked
      txt = (checked) ? checkmark : empty
      fire('UpdateButton', thisID,
         { text: txt, color: "green", enabled: true }
      )
   })
}