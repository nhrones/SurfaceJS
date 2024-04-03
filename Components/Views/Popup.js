
import {
   ctx, setHasVisiblePopup,
   fire, on, windowCFG
} from '../deps.js'

import Text from './Text.js'

let left = 1
let top = 1

/** A virtual Popup view class */
export default class Popup {

   id = 0 // assigned by activeViews.add() 
   index = -1
   activeView = true
   zOrder = 0
   tabOrder = 0
   name = ""
   enabled = true
   hovered = false
   focused = false
   path
   shownPath
   hiddenPath
   location
   size
   color = "black"
   title = ""
   /** @type {CanvasTextAlign} */
   textAlign = "center"
   visible = true
   /** @type {ImageData} */
   buffer
   fontSize = 28
   fontColor = "black"

   /**
    * ctor that instantiates a new vitual Popup view
    * @param {{ tabOrder: number; location: any; size: 
    * { width: number; height: number; }; 
    * radius: any; 
    * fontSize: number; 
    * text: any; }
    * } el
    */
   constructor(el) {
      this.tabOrder = el.tabOrder || 0
      this.enabled = true
      this.color = 'white'
      this.location = el.location
      this.hiddenPath = new Path2D()
      this.hiddenPath.rect(1, 1, 1, 1)
      this.size = el.size || { width: 300, height: 300 }
      this.shownPath = this.buildPath(el.radius || 30)
      this.path = this.hiddenPath
      this.fontSize = el.fontSize || 24
      this.fontColor = "black"
      /** @type {string[]} */
      this.text = []
      this.textNode = new Text(
         {
            kind: 'Text',
            idx: -1,
            tabOrder: 0,
            id: this.name + 'Label',
            text: el.text || "",
            location: this.location,
            size: this.size,
            bind: true
         }
      )

      //================================================
      //                bind signals
      //================================================

      // Our game controller broadcasts this ShowPopup event at the end of a game
      on('ShowPopup', "", ( /** @type {{title: String, msg: string[]}} */ data) => {
         this.show(data)
      })

      on('HidePopup', "", () => this.hide())
   }
   /**
    * build a Path2D
    * @param {number} radius
    */
   buildPath(radius) {
      const path = new Path2D
      path.roundRect(this.location.left, this.location.top, this.size.width, this.size.height, radius)
      return path
   }

   /**
    * show the virtual Popup view
    * @param {{ title: string; msg: string[]; }} data
    */
   show(data) {
      fire('FocusPopup', " ", null)
      this.title = data.title
      this.text = data.msg
      left = this.location.left
      top = this.location.top
      this.path = this.shownPath
      this.visible = true
      this.saveScreenToBuffer()
      setHasVisiblePopup(true)
      this.render()
   }

   /** takes a snapshot of our current canvas bitmap */
   saveScreenToBuffer() {
      const { left, top } = this.location
      const { width, height } = this.size
      console.log(`Buffer = left:${left}, top:${top}, width:${width}, height:${height}`)

      this.buffer = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
   }

   /** paint the canvas with our current snapshot */
   restoreScreenFromBuffer() {
      if (this.buffer) {
         return ctx.putImageData(this.buffer, 0, 0)
      }
   }

   /** hide the virtual Popup view */
   hide() {
      if (this.visible) {
         left = 1
         top = 1
         this.path = this.hiddenPath
         this.restoreScreenFromBuffer()
         this.visible = false
         setHasVisiblePopup(false)
      }
   }

   /** called from Surface/canvasEvents when this element has been touched */
   touched() {
      this.hide()
      fire('PopupReset', '', null)
   }

   /** update this virtual Popups view (render it) */
   update() {
      if (this.visible) this.render()
   }

   /** render this virtual Popup view */
   render() {
      ctx.save()
      ctx.shadowColor = '#404040'
      ctx.shadowBlur = 45
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 5
      ctx.fillStyle = windowCFG.containerColor
      ctx.fill(this.path)
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.lineWidth = 1
      ctx.strokeStyle = windowCFG.textColor
      ctx.stroke(this.path)
      ctx.font = `${this.fontSize}px Tahoma, Verdana, sans-serif`;
      ctx.textAlign = /** @type {CanvasTextAlign} */ this.textAlign
      ctx.strokeText(this.title + ' ', left + 175, top + 100)
      let txtTop = top + 100
      // stroke each string in the array
      this.text.forEach((/** @type {string} */ str) => {
         ctx.strokeText(str + ' ', left + 175, txtTop += 50)
      });
      ctx.restore()
      this.visible = true
   }

}
