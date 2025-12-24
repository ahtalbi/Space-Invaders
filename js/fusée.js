// initialize vars for the rocket move
export let vars = {
  rocket: null,
  pressleft: false,
  pressrigth: false,
};

// this represent the rocket object, it can create and update the rocket position
export class Rocket {
  constructor() {
    this.rocket = null;
    this.xpos = 0;
  }

  create(container) {
    this.rocket = document.createElement("div");
    this.rocket.className = "rocket";
    container.append(this.rocket);
  }

  moveLeft(speed) {
    if (this.xpos < -340) return;
    this.xpos -= speed;
    this.rocket.style.transform = `translateX(${this.xpos}px)`;
  }

  moveRight(speed) {
    if (this.xpos > 365) return;
    this.xpos += speed;
    this.rocket.style.transform = `translateX(${this.xpos}px)`;
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
  if (vars.pressleft) vars.rocket.moveLeft(5);
  if (vars.pressrigth) vars.rocket.moveRight(5);
  requestAnimationFrame(moveRocket);
}
