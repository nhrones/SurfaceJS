
import { Text, windowCFG, ctx } from '../deps.js'
import { gameSignals } from '../main.js'
import { SCORE_CFG, PossibleColor } from '../cfg.js'
import { buildRightScore, buildLeftScore } from '../ViewModels/pathFactory.js'

/** A virtual ScoreButton view class */
export default class ScoreButton {

   id = 0 // assigned by activeViews.add()   
   zOrder = 0
   tabOrder = 0
   name
   index
   activeView = true
   enabled = true
   hovered = false
   focused = false
   path = new Path2D()
   size
   location
   text
   color = 'black'
   isLeftHanded
   scoreText = ''
   available = false
   tooltip = ""

   upperText = ""
   lowerText = ""
   /** @type {Text.default} */
   upperName;
   /** @type {Text.default} */
   lowerName
   /** @type {Text.default} */
   scoreBox

   /** Creates an instance of a virtual ScoreButton. */
   constructor(el) {

      this.index = el.idx
      this.tabOrder = el.tabOrder || 0
      this.name = el.id
      this.text = el.text || ''
      this.tooltip = `${this.name} available`
      this.enabled = true
      this.hovered = false
      this.focused = false
      this.size = SCORE_CFG.size
      this.location = el.location
      this.upperText = this.text.split(' ')[0]
      this.lowerText = this.text.split(' ')[1] || ''
      this.isLeftHanded = (el.idx % 2 === 1) // isLeft = index is odd/even 
      this.buildPath()

      //================================================
      //                bind signals
      //================================================

      gameSignals.on('UpdateScoreElement', this.index.toString(), (data) => {
         const {available, renderAll, fillColor, value } = /** @type {any} */(data)
         if (renderAll) {
            this.color = fillColor
            this.render()
         }
         this.available = available
         this.scoreText = value
         this.renderScore(value, available)

      })
   }




   /** build the correct (left/right) path and Txt locations */
   buildPath() {
      //const s = this
      const { left, top } = this.location

      // rightside scores
      if (this.isLeftHanded) { // twos fours sixs
         this.path = buildRightScore(this.location, this.size)    
         this.upperName = new Text.default({
            kind: 'text', idx: -1, tabOrder: 0, id: this.name + '-upperText', text: this.upperText,
            location: { left: left + 40, top: top + 10 },
            size: { width: 55, height: 30 }, color: this.color, bind: false
         })
         this.lowerName = new Text.default({
            kind: 'text', idx: -1, tabOrder: 0, id: this.name + '-lowerText', text: this.lowerText,
            location: { left: left + 40, top: top + 40 },
            size: { width: 55, height: 30 }, color: this.color, bind: false
         })
         this.scoreBox = new Text.default({
            kind: 'text', idx: -1, tabOrder: 0, id: this.name + '-score', text: '',
            location: { left: left + 5, top: top + 50 },
            size: { width: 24, height: 24 }, color: this.color, padding: 10, bind: false
         })

      }
      // left side scores
      else { // ones threes fives
         this.path = buildLeftScore(this.location, this.size)
         this.upperName = new Text.default({
            kind: 'text', idx: -1, tabOrder: 0, id: this.name + '-upperText', text: this.upperText,
            location: { left: left + 10, top: top + 10 },
            size: { width: 55, height: 30 }, color: this.color, bind: false
         })
         this.lowerName = new Text.default({
            kind: 'text', idx: -1, tabOrder: 0, id: this.name + '-lowerText', text: this.lowerText,
            location: { left: left + 10, top: top + 40 },
            size: { width: 55, height: 30 }, color: this.color, bind: false
         })
         this.scoreBox = new Text.default({
            kind: 'text', idx: -1, tabOrder: 0, id: this.name + '-score', text: '',
            location: { left: left + 70, top: top + 3 },
            size: { width: 24, height: 24 }, color: this.color, padding: 10, bind: false
         })
      }
   }

   /** called from Surface/canvasEvents when this element has been touched */
   touched() {
      gameSignals.fire('ScoreButtonTouched', this.index.toString(), this.index)
   }

   /** 
    * updates and renders the virtual ScoreButton view 
    * Caution: called 60fps - keep it clean
   */
   update() {
      this.render()
      this.renderScore(this.scoreText, this.available)
   }

   /** render this vitual ScoreButtons shape (path) onto the canvas */
   render() {
      ctx.save()
      ctx.lineWidth = 5
      ctx.strokeStyle = (this.hovered === true) ? 'orange' : this.color
      ctx.stroke(this.path)
      ctx.restore()
      ctx.fillStyle = this.color
      ctx.fill(this.path)
      if (this.upperName) {
         this.upperName.fillColor = this.color
         this.upperName.fontColor = windowCFG.containerColor
         this.upperName.text = this.upperText
         this.upperName.update()
      }
      if (this.lowerName) {
         this.lowerName.fillColor = this.color
         this.lowerName.fontColor = windowCFG.containerColor
         this.lowerName.text = this.lowerText
         this.lowerName.update()
      }
   }

   /** renders the score value inside the vitual ScoreButton view */
   renderScore(scoretext, available) {
      let scoreColor = (available) ? PossibleColor : windowCFG.containerColor
      if (scoretext === '') {
         scoreColor = this.color
      }
      if (this.scoreBox !== null) {
         this.scoreBox.fontColor = scoreColor
         this.scoreBox.fillColor = this.color
         this.scoreBox.text = scoretext
         this.scoreBox.update()
      }
   }
}
