import { vars, Rocket } from "./fusée.js";
import {  enemy } from "./enemies.js";

export const createContainer = async () => {
  const container = document.createElement("div");
  container.className = "container";

  document.body.append(container);
  vars.rocket = new Rocket();
  vars.rocket.create(container);
  let en = new enemy()
  en.create(container);
}
