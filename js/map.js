import { Rocket } from "./fusée.js";
import {  enemy } from "./enemies.js";
export let rocket = null

export const createContainer = async () => {
  const container = document.createElement("div");
  container.className = "container";

  document.body.append(container);
  rocket = new Rocket()
  rocket.create(container)
  let en = new enemy()
  en.create(container);
}
