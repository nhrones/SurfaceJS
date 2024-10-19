import { fire } from '../deps.js'

export const serverURL = document.location.origin

export let highScore = 0

/** Post a message */
export function setHighScore(value) {
   highScore = value
   localStorage.setItem("highscore", value + "")
   fire('UpdateText', 'highScoreValue',
      {
         border: false,
         fill: true,
         fillColor: 'snow',
         fontColor: 'black',
         text: highScore + ""
      }
   )
};

/** Post a message */
export function getHighScore() {
   if (highScore === 0) {
      highScore = parseInt(localStorage.getItem('highscore') ?? "0")
   }
};

export function setupHighScore() {
   if (highScore === 0) getHighScore()
   setHighScore(highScore)
   fire('UpdateText', 'highScoreValue',
      {
         border: false,
         fill: true,
         fillColor: 'snow',
         fontColor: 'black',
         text: highScore + ""
      }
   )
}