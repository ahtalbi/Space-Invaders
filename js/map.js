import { Rocket, moveRocket } from "./fusée.js"
import { configEnemies, gameLoop, InitlizeTheEnemies } from "./enemies.js"

export let rocket = null

export const gameData = {
  score: 0,
  startTime: 120,
  passedTime: 0,
  diffTime: 0,
  lives: 3,
  level: 1,
  isRunning: false,
  isover: false,
}

const startGame = () => {
  document.body.style.minHeight = '10vh'

  document.body.innerHTML = generateGame(gameData)

  const wrapper = document.getElementsByClassName("wrapper")[0]
  const data = wrapper.children[0]
  const container = wrapper.children[1]

  InitlizeTheEnemies(container)

  rocket = new Rocket()
  rocket.create(container)

  gameData.isRunning = true
  updateTime()
  moveRocket()

  document.addEventListener('keydown', (e) => {
    if (gameData.isover) return
    if (e.key === 'Escape' && gameData.isRunning) openPopup("pause-popup")
    else if (e.key === 'Escape' && !gameData.isRunning) resumeGame(container, "pause-popup")
  })
  document.getElementById("resume-btn").addEventListener("click", () => resumeGame(container, "pause-popup"))
  document.getElementById("pause-quit-btn").addEventListener("click", () => location.reload())
  document.getElementById("gameover-quit-btn").addEventListener("click", () => location.reload())
  document.getElementById("pause-restart-btn").addEventListener("click", () => restartGame(container, data, "pause-popup"))
  document.getElementById("gameover-restart-btn").addEventListener("click", () => restartGame(container, data, "gameover-popup"))
}

const resumeGame = (container, popupName) => {
  closePopup(popupName)
  moveRocket()
  gameLoop(container);
  updateTime()
}

const restartGame = (container, data, popupName) => {
  configEnemies.containerEnemies = document.createElement("div");
  configEnemies.arrOfEnemies = [];

  while (container.children.length > 2) {
    container.children[2].remove()
  }

  Object.assign(gameData, {
    startTime: 120,
    passedTime: 0,
    diffTime: 0,
    lives: 3,
    isover: false
  })

  data.children[1].textContent = "Time: 120"
  data.children[2].textContent = "Score: " + gameData.score
  data.children[3].innerHTML = `
  Lives:
  ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(3)}
  `

  rocket = new Rocket()
  rocket.create(container)
  InitlizeTheEnemies(container)
  closePopup(popupName)
  moveRocket()
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
  gameData.isRunning = false
  gameData.isover = true
}

export const triggerWinning = () => {
  openPopup("won-popup")
  gameData.isover = true
  const wrapper = document.getElementsByClassName("wrapper")[0]
  const data = wrapper.children[0]
  const container = wrapper.children[1]

  setTimeout(() => {
    gameData.isover = false
    resumeGame(container, "won-popup")
  }, 3000)

  setNewParameters(container, data)
}

export const updateScore = (point) => {
  const scoreEl = document.querySelector(".score")
  const oldScore = Number(scoreEl.textContent.split(" ")[1])
  scoreEl.textContent = "Score: " + (oldScore + point)
}


const setNewParameters = (container, data) => {
  gameData.level++
  Object.assign(gameData, {
    startTime: 120,
    passedTime: 0,
    diffTime: 0,
    score: Number(data.children[2].textContent.split(" ")[1]),
  })

  configEnemies.containerEnemies = document.createElement("div");
  configEnemies.arrOfEnemies = [];
  configEnemies.speed ++

  while (container.children.length > 2) {
    container.children[2].remove()
  }

  data.children[0].textContent = "Level: " + gameData.level
  data.children[1].textContent = "Time: 120"
  data.children[2].textContent = "Score: " + gameData.score
  data.children[3].innerHTML = `
  Lives:
  ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(gameData.lives)}
  `

  rocket = new Rocket()
  rocket.create(container)
  InitlizeTheEnemies(container)
}

const updateTime = () => {
  if (!gameData.isRunning || gameData.isover) return

  const timer = document.getElementsByClassName("time")[0]

  const now = (performance.now() / 1000)
  const diff = now - gameData.passedTime
  gameData.passedTime = now

  if (diff > 1) gameData.diffTime += diff

  timer.textContent = "time: " + Math.floor(gameData.startTime - now + gameData.diffTime)

  requestAnimationFrame(updateTime)
}

export const removeOneLife = () => {
  const lastHeart = document.querySelector(".heart:last-of-type")
  gameData.lives--
  lastHeart.remove()

  if (gameData.lives === 0) triggerGameOver();
}

const openPopup = (popupName) => {
  const popup = document.getElementById(popupName)
  popup.style.display = 'flex'
  gameData.isRunning = false
}

const closePopup = (popupName) => {
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

    <div class="container">

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