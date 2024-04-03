
import { gameSignals } from '../main.js'
import { fire } from '../deps.js'

const id = 'player1'

export const state = {
   border: false, 
   fill: true,  
   fillColor: "snow", 
   fontColor: "Brown",
   text: "Score:"
}

/** PlayerName ViewModel initialization
 *  Called from DiceGame Controller ctor */
export const init = () => {
   gameSignals.on("UpdatePlayer", "0", (data) => {
      //@ts-ignore
      state.text = data.text
      update()
   })
   
   update()
}

/** fires an update signal with the current state */
export const update = () => {
   fire('UpdateText', id, state)
}