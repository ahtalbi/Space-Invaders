import { Rocket } from "./fusée.js"
import { InitlizeTheEnemies } from "./enemies.js"

export let rocket = null

export const gameData = {
  score: 0,
  startTime: 0,
  passedTime: 0,
  lives: 3,
  level: 1,
  isRunning: false,
}

// const popup = document.getElementById("popup")
// const resumeBtn = document.getElementById("resume")

// function openPopup() {
//   popup.style.display = "flex"
// }

// function closePopup() {
//   popup.style.display = "none"
// }

// resumeBtn.addEventListener("click", closePopup)
// document.addEventListener("keydown", e => {
//   console.log(e.key)
//   if (e.key === "Escape") openPopup()
// })

export const startGame = () => {
  document.body.style.minHeight = '10vh'

  document.body.innerHTML = `
  <div class="popup"></div>

  <div class="start-popup"></div>
  <div class="pause-popup"></div>

  <div class="wrapper">
    <div class="data">
      <span class="level">Level: 1</span>
      <span class="time">Time: 0</span>
      <span class="score">Score: 0</span>
      <span class="lives">
        Lives:
        ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(3)}
      </span>
    </div>

    <div class="container" id="ctn"></div>
  </div>
`
  const container = document.getElementById("ctn")
  // InitlizeTheEnemies(container)
  rocket = new Rocket()
  rocket.create(container)
}

const handleStart = (e) => {
  if (e.type === "click" || e.key === "Enter") {
    startGame()
  }
}

export const renderStart = () => {
  document.body.innerHTML = `
    <div class="home-container">
    <h1 class="title">SPACE INVADERS</h1>
    <p class="subtitle">Protect your planet</p>
    <div id="btn-start"><button class="btn">▶ Play</button></div>
  </div>
  `
  const startBtn = document.getElementById("btn-start")

  startBtn.addEventListener("click", handleStart, { once: true })
  document.addEventListener("keydown", handleStart, { once: true })

}
