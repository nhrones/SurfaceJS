# Surface Framework JS
Version v0.0.2

## An HTMLCanvas based GUI framework
  - only one DOM element (a single canvas)
  - MVVM-EA architecture - complete decoupling via signals
  - very fine grained reactivity using a _SignalAggregator_
  - pure js -- zero dependencies -- no build steps
  - extremely efficient -- renders only dirty components    

  Expresses the best of _immediate_ and _retained_ mode graphics   

**_A Desktop GUI_**    
I have another version of _Surface_ that runs an OpenGL Window rendered on Skia-Canvas


## Example GUI Dice Game
Yes it's my same old poker-dice game you've all seen on many platforms.    
Now, its back on my newly updated Surface framework!

## Usage:
```
Click the 'Roll Button' to start.    
After each roll of the dice, you can 'click' a die to 'freeze' its value.    
Click again to toggle the frozen state. When frozen, value will be held!
After three rolls, you must select a score item.  
The blue highlighted numbers indicate possible scores that are available to select.
Have fun!
```
## NOTE: Try it now --
https://nhrones.github.io/SurfaceJS/

Copyright 2022-2024, Nick D. Hrones, All rights are reserved.
