import { rocket } from "./map.js";

let vars = {
  pressleft: false,
  pressrigth: false,
  timerMove: Date.now()
}

// this represent the rocket object, it can create and update the rocket position, also includes the shoots methods
export class Rocket {
  constructor() {
    this.container = null
    this.maxleft = -340
    this.maxrigth = 365
    this.rocket = null
    this.xpos = 0
    this.tireNow = Date.now()
  }

  // create the rocket container
  create(container) {
    this.rocket = document.createElement("div");
    this.rocket.id = "rocket";
    container.append(this.rocket);
    this.container = container
  }
  // move left
  moveLeft(speed) {
    if (this.xpos > this.maxleft) {
      this.xpos -= speed;
      this.rocket.style.transform = `translate3d(${this.xpos}px,0,0)`;
    }
  }
  // move rigth
  moveRight(speed) {
    if (this.xpos < this.maxrigth) {
      this.xpos += speed;
      this.rocket.style.transform = `translate3d(${this.xpos}px,0,0)`;
    }
  }
  // start shooting
  startTireProjectile() {
    if (this.tireNow && Date.now() - this.tireNow < 150) return
    this.tireNow = Date.now()
    let projectile = document.createElement('div')
    projectile.className = 'projectile'
    this.container.append(projectile)

    let r = this.rocket.getBoundingClientRect();
    projectile.style.left = `${r.left + 15}px`;
    projectile.style.top = `${r.top}px`;
    let m = r.top

    let shoot = () => {
      projectile.style.top = `${m}px`
      m -= 5
      if (m > 160) {
        requestAnimationFrame(shoot)
      } else {
        projectile.remove()
      }
    }
    requestAnimationFrame(shoot)
  }
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      vars.pressleft = true;
      break;
    case "ArrowRight":
      vars.pressrigth = true;
      break;
    case " ":
      rocket.startTireProjectile()
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      vars.pressleft = false;
      break;
    case "ArrowRight":
      vars.pressrigth = false;
      break;
  }
});

// try to move the rocket based on the input then schedule next update for smooth animation
export function moveRocket() {
  let now = Date.now();
  if (now - vars.timerMove >= 16) {
    if (vars.pressleft) rocket.moveLeft(10);
    if (vars.pressrigth) rocket.moveRight(10);
    vars.timerMove = now;
  }
  requestAnimationFrame(moveRocket);
}
