import { Rocket } from "./fusée.js"
import { InitlizeTheEnemies } from "./enemies.js"

export let rocket = null
let ID = undefined

export let gameData = {
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

const generateGame = (gameData) => {
  return `
  <div class="pause-popup" id="pause-popup">
    <div class="pause-content">
      <h2 class="pause-title">PAUSE</h2>
      <div class="pause-buttons">
        <button class="pause-btn resume-btn" id="resume-btn">
          ▶ Resume
        </button>
        <button class="pause-btn restart-btn" id="pause-restart-btn">
          ↻ Restart
        </button>
        <button class="pause-btn quit-btn" id="pause-quit-btn">
          X Quit
        </button>
      </div>
    </div>
  </div>

  <div class="wrapper">
    <div class="data">
      <span class="level">Level: ${gameData.level} </span>
      <span class="time">Time: ${gameData.startGame} </span>
      <span class="score">Score: ${gameData.score}</span>
      <span class="lives">
        Lives:
        ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(gameData.lives)}
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
}

export const startGame = () => {
  document.body.style.minHeight = '10vh'

  document.body.innerHTML = generateGame(gameData)
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

  document.getElementById("resume-btn").addEventListener("click", () => closePopup("pause-popup"))
  document.getElementById("pause-quit-btn").addEventListener("click", () => location.reload())
  document.getElementById("gameover-quit-btn").addEventListener("click", () => location.reload())
  document.getElementById("pause-restart-btn").addEventListener("click" , () => {
    document.body.wrapper.container.innerHTML = ''
  })
  document.getElementById("gameover-restart-btn")
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

  const timeleft = gameData.startTime - Math.floor(performance.now() / 1000)

  if (timeleft === 0) {
    triggerGameOver()
    cancelAnimationFrame(ID)
    return
  }

  timer.textContent = "Time: " + timeleft

  ID = requestAnimationFrame(updateTime)
}


export const removeOneLife = () => {
  const lastHeart = document.querySelector(".heart:last-of-type")
  gameData.lives--
  lastHeart.remove()

  if (gameData.lives === 0) triggerGameOver();
}