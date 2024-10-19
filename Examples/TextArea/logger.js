
import { Signals } from "./main.js"

let logTxt = ""

/**
 *  log msg to 'logger' static text element
 * @param {string} thisMsg
 * @param {string} [from]
 */
export const logThis = ( thisMsg, from, clear = false ) => {

   if (clear) {
      logTxt = ""
   }

   let newTxt = (from)
      ? from + " -- " + thisMsg
      : thisMsg

   logTxt = newTxt + `
${logTxt}`
   let maxChars = 600
   if (logTxt.length > maxChars) logTxt = logTxt.substring(0, maxChars)
      //@ts-ignore
      Signals.fire("UpdateText", "logger",
      {
         border: true,
         fill: true,
         fillColor: 'white',
         fontColor: "black",
         text: logTxt
      })
}
