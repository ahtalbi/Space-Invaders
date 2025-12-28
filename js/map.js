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

export const openPausePopup = () => {
  const pausePopup = document.querySelector('.pause-popup')
  pausePopup.style.display = 'flex'
  gameData.isRunning = false
}

export const closePausePopup = () => {
  const pausePopup = document.querySelector('.pause-popup')
  pausePopup.style.display = 'none'
  gameData.isRunning = true
}

export const startGame = () => {
  document.body.style.minHeight = '10vh'

  document.body.innerHTML = `
  <div class="popup"></div>

  <div class="start-popup"></div>
  
  <div class="pause-popup">
    <div class="pause-content">
      <h2 class="pause-title">PAUSE</h2>
      <div class="pause-buttons">
        <button class="pause-btn resume-btn" id="resume-btn">
          ▶ Resume
        </button>
        <button class="pause-btn restart-btn" id="restart-btn">
          ↻ Restart
        </button>
        <button class="pause-btn quit-btn" id="quit-btn">
          X Quit
        </button>
      </div>
    </div>
  </div>

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

  InitlizeTheEnemies(container)

  rocket = new Rocket()
  rocket.create(container)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameData.isRunning) openPausePopup()
    else if (e.key === 'Escape' && !gameData.isRunning) closePausePopup()
  })

  gameData.isRunning = true
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

export const triggerGameOver = () => {
  alert("You die");
  
}

const updateScore = (point) => {
  gameData.score += point
  const scoreEl = document.querySelector(".score")
  scoreEl.textContent = "Score: " + gameData.score
}


const updateLevel = (newLevel) => {
  console.log(gameData.level)
  gameData.level = newLevel
  const levelEl = document.querySelector(".level")
  levelEl.textContent = "Level: " + gameData.level
}


export const removeOneLife = () => {
  const lastHeart = document.querySelector(".heart:last-of-type")
  gameData.lives --
  lastHeart.remove()

  if (gameData.lives === 0) triggerGameOver();
}
