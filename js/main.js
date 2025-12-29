import { renderStart, gameData } from "./map.js";
import { moveRocket } from "./fusée.js";

renderStart()
gameData.isRunning = true
requestAnimationFrame(moveRocket);