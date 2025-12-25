import { Rocket } from "./fusée.js";
import { InitlizeTheEnemies } from "./enemies.js";
export let rocket = null

export const createContainer = async () => {
  const container = document.createElement("div");
  container.className = "container";
  document.body.append(container);
  
  InitlizeTheEnemies(container);
  
  rocket = new Rocket()
  rocket.create(container)
}
