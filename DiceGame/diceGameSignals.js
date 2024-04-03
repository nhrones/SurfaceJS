/** 
 * Named Signals    
 * Each signal \<name\> is unique    
 * Each signal registers a payload (type) 
 * This payload is type-checked when coding event-handlers     
 * or when firing signals
 */
export const DiceGameSignals = {
   PopupReset: '',
   FocusPopup: '',
   DieTouched: 0,
   ScoreElementResetTurn: '',
   UpdatePlayer: {
      index: 0,
      color: "brown",
      text: ""
   },
   ScoreButtonTouched: "",
   UpdateDie: { index: 0, value: 0, frozen: false },
   UpdateScoreElement:         {
      index: 0,
      renderAll: false,
      fillColor: '',
      value: 0,
      available: false
   },
   UpdateTooltip: { hovered: false }
};