import {BaseSignals} from './baseSignals.js'
/** 
 * We use this factory function to create a new SignalAggregator service.      
 * You can use intersection types for the generic type:     
 * @example buildSignalAggregator<CoreEvents & LocalEvents>()
 */
const signals = buildSignalAggregator(BaseSignals)
export const {fire, on} = signals
/** 
 * A factory function used to create a SignalAggregator service.
 * @example 
 * const signals = SignalAggregator(mySignals)
 *
 * @template {Object.<SignalName, Payload>} T
 * @param {SignalContract<T>} contract
 */
export function buildSignalAggregator(contract) {

   /**
    * maps an array of handler for each registered signal name 
    * @type {Map<SignalName, SignalHandler[]>}
    */
   const eventHandlers = new Map()

   /** SignalAggregator */
   const sa = {

      /**
       * on - registers a handler function to be executed when a signal is sent
       * @param { keyof contract} signalName
       * @template {typeof contract[signalName]} P
       * @param { string } id
       * @param { (arg0: P) => void  } handler
       */
      on(signalName, id, handler) {
         // create a keyName that combines the signalName and the target element id (if any)
         const keyName = `${signalName.toString()}-${id}`
         // if this keyName has already been registered
         if (eventHandlers.has(keyName)) {
            const handlers = (eventHandlers.get(keyName))
            if (handlers && handlers.length) {
            // push this new handler to it. 
            handlers.push(handler)
            }
         } else {  // keyName has yet to be registered
            // when first seen - create it with this handler
            eventHandlers.set(keyName, [handler])
         }

      },

      /**
       * Execute all registered handlers for a strongly-typed signal (signalName)
       * @template {keyof contract} K
       * @param {K} signalName
       * @param {string} id
       * @param {typeof contract[signalName]} data
       */
      fire(signalName, id, data) {
         // create a keyName that combines the signalName and the target element id (if any)
         const keyName = `${signalName.toString()}-${id}`
         // check for any registered handlers for this unique keyName
         const handlers = eventHandlers.get(keyName);
         if (handlers && handlers.length) {
            // callback all registered handlers with any data payload
            for (const handler of handlers) {
               // call it!
               handler(data)
            }
         }
      }

   }
   return sa
}

/** 
 * @typedef { boolean | number | number[] | string | string[] | Object } Payload 
 * @typedef { (arg0: Payload) => void } SignalHandler
 * @typedef { string } SignalName
 */
/**
 * @template { Object.<SignalName, Payload> } T
 * @typedef {{[K in keyof T]: T[K]}} SignalContract
 */
