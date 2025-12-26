import { createGameBoard } from "./map.js";
import { moveRocket } from "./fusée.js";

createGameBoard();
requestAnimationFrame(moveRocket);