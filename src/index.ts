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

// const resizeObserver = new ResizeObserver((entries) => {
//   console.log(entries)
// })

// resizeObserver.observe(app)


window.addEventListener('click',() => { 
  fireworks.launch(Number(5));
});

//fireworks.launch(Number(count.value))


