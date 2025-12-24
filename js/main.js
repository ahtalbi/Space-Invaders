import { createContainer } from "./map.js";
import { moveRocket } from "./fusée.js";

createContainer();
requestAnimationFrame(moveRocket);
