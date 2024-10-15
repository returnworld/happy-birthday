import { Fireworks } from 'fireworks-js'
import {
  fireworksContainer,
  fireworksOptions
} from './config.ts'

declare global {
  interface Window {
    fireworks: Fireworks
  }
}

const fireworks = new Fireworks(fireworksContainer, fireworksOptions)
window.fireworks = fireworks
fireworks.start();
// const resizeObserver = new ResizeObserver((entries) => {
//   console.log(entries)
// })

// resizeObserver.observe(app)

//fireworks.launch(10);

window.addEventListener('click', function(e){
  fireworks.launch(Number(7));
})
// window.addEventListener('mousedown',(e) => { 
//   console.log("click")
//   const mEvDown = new MouseEvent("pointerdown", {
//     bubbles: true,
//     cancelable: true,
//     clientX: e.clientX,
//     clientY: e.clientY
//   })
//   fireworks.canvas.dispatchEvent(mEvDown);
// });
// window.addEventListener('mouseup',(e) => { 
//   const mEvUp = new MouseEvent("pointerup", {
//     bubbles: true,
//     cancelable: true,
//     clientX: e.clientX,
//     clientY: e.clientY
//   });
//   fireworks.canvas.dispatchEvent(mEvUp);
// });

// window.addEventListener('mouseup', function(e) {
//   if(e.button == 2) {
//     fireworks.launch(Number(10));
    
//   }
//   fireworks.pause();
//   fireworks.start();
// });

// window.addEventListener('contextmenu', function(ev) {
//   ev.preventDefault();

//   return false;
// }, false);
//fireworks.launch(Number(count.value))


