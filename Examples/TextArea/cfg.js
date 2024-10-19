//TODO import type {ElementDescriptor} from '../Framework/types.ts'

/** This is the configuration object  */
export const cfg = {
   winCFG: {
      title: "DWM-GUI TextArea Example",
      size: { width: 380, height: 525 },
      location: { x: 500, y: 100 },
      radius: 30,
      containerColor: "snow",
      textColor: "black",
      resizable: false,
      removeDecorations: false,
      transparent: false
   },
   nodes: [
      {
         kind: "TextArea",
         id: "TextArea1",
         idx: 0,
         tabOrder: 1,
         location: { left: 35, top: 20 },
         size: { width: 320, height: 350 },
         text: "testing123",
         color: "snow",
         multiLine: true
      },      
      {
         kind: "Button",
         id: "closebutton",
         idx: 0,
         tabOrder: 2,
         location: { left: 140, top: 380 },
         size: { width: 100, height: 50 },
         text: "Close",
         color: "brown"
      },
      {
         kind: "Text",
         id: "logger",
         bind: true,
         idx: 0,
         tabOrder: 5,
         location: { left: 35, top: 440 },
         size: { width: 320, height: 100 },
         text: "",
         fill: true,
         color: "white",
         fontColor: "black",
         hasBoarder: true,
         fontSize: 24,
         textAlign: "left",
         textBaseline: "top",
         TextLocation: 'top',
      }
   ]
}