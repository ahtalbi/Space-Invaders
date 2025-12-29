import { Rocket } from "./fusée.js"
import { InitlizeTheEnemies } from "./enemies.js"

export let rocket = null

export const gameData = {
  score: 0,
  startTime: 120,
  passedTime: 0,
  lives: 3,
  level: 1,
  isRunning: false,
}

export const openPopup = (popupName) => {
  const popup = document.getElementById(popupName)
  popup.style.display = 'flex'
  gameData.isRunning = false
}

export const closePopup = (popupName) => {
  const popup = document.getElementById(popupName)
  popup.style.display = 'none'
  gameData.isRunning = true
}

export const startGame = () => {
  document.body.style.minHeight = '10vh'

  document.body.innerHTML = `
  <div class="pause-popup" id="pause-popup">
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
      <span class="time">Time: 120</span>
      <span class="score">Score: 0</span>
      <span class="lives">
        Lives:
        ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(3)}
      </span>
    </div>

    <div class="container" id="ctn">

 <div class="pause-popup" id="won-popup">
    <div class="pause-content">
      <p class="pause-title">YOU WON!</p>
    </div>
  </div>

      <div class="pause-popup" id="gameover-popup">
    <div class="pause-content">
      <h2 class="pause-title">GAME OVER</h2>
      <div class="pause-buttons">
        <button class="pause-btn restart-btn" id="gameover-restart-btn">
          ↻ Restart
        </button>
        <button class="pause-btn quit-btn" id="gameover-quit-btn">
          X Quit
        </button>
      </div>
    </div>
  </div>
    </div>
`
  const container = document.getElementById("ctn")

  InitlizeTheEnemies(container)

  rocket = new Rocket()
  rocket.create(container)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameData.isRunning) openPopup("pause-popup")
    else if (e.key === 'Escape' && !gameData.isRunning) closePopup("pause-popup")
  })

  gameData.isRunning = true
  updateTime()
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
  const gameover = document.getElementById("gameover-popup")
  gameover.style.display = "flex"

}

const updateScore = (point) => {
  gameData.score += point
  const scoreEl = document.querySelector(".score")
  scoreEl.textContent = "Score: " + gameData.score
}


const updateLevel = (newLevel) => {
  gameData.level = newLevel
  const levelEl = document.querySelector(".level")
  levelEl.textContent = "Level: " + gameData.level
}

const updateTime = () => {
  if (!gameData.isRunning) return
  const timer = document.getElementsByClassName("time")[0]
  console.log(timer)

  const passedTime =   Math.floor( performance.now() /1000)
  console.log(gameData.startTime)
  timer. textContent = "Time: " + (gameData.startTime - passedTime)
  requestAnimationFrame(updateTime)
}


export const removeOneLife = () => {
  const lastHeart = document.querySelector(".heart:last-of-type")
  gameData.lives--
  lastHeart.remove()

  if (gameData.lives === 0) triggerGameOver();
}
