import { Rocket, moveRocket } from "./fusée.js"
import { configEnemies, gameLoop, InitlizeTheEnemies } from "./enemies.js"

export let rocket = null

export const gameData = {
  score: 0,
  startTime: 90,
  passedTime: 0,
  diffTime: 0,
  lives: 3,
  level: 1,
  isRunning: false,
  isover: false,
}

const updateDisplay = (data) => {
  data.children[0].textContent = "Level: " + gameData.level
  data.children[1].textContent = "Time: 90"
  data.children[2].textContent = "Score: " + gameData.score
  data.children[3].innerHTML = `Lives: ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(gameData.lives)}`
}

const resetGameState = (resetLives = false) => {
  Object.assign(gameData, {
    startTime: 90,
    passedTime: 0,
    diffTime: 0,
    isover: false,
    ...(resetLives ? { lives: 3 } : {})
  })
}

const initializeLevel = (container, data) => {
  configEnemies.containerEnemies = document.createElement("div")
  configEnemies.arrOfEnemies = []
  configEnemies.translateX = 0
  configEnemies.translateY = 0
  while (container.children.length > 2) {
    container.children[2].remove()
  }

  updateDisplay(data)
  rocket = new Rocket()
  rocket.create(container)
  InitlizeTheEnemies(container)
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

  play(container)

  document.addEventListener('keydown', (e) => {
    if (gameData.isover) return
    if (e.key === 'Escape') {
      gameData.isRunning ? openPopup("pause-popup") : resumeGame(container, "pause-popup")
    }
  })

  const addClickListener = (id, callback) => document.getElementById(id).addEventListener("click", callback)

  addClickListener("resume-btn", () => resumeGame(container, "pause-popup"))
  addClickListener("pause-quit-btn", () => location.reload())
  addClickListener("gameover-quit-btn", () => location.reload())
  addClickListener("pause-restart-btn", () => restartGame(container, data, "pause-popup"))
  addClickListener("gameover-restart-btn", () => restartGame(container, data, "gameover-popup"))
}

const resumeGame = (container, popupName) => {
  closePopup(popupName)
  play(container)
}

const restartGame = (container, data, popupName) => {
  resetGameState(true)
  initializeLevel(container, data)
  closePopup(popupName)
  play(container)
}

const handleStart = (e) => {
  if (e.type === "click" || e.key === "Enter") startGame()
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
  document.getElementById("gameover-popup").style.display = "flex"
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
  }, 1500)

  setNewParameters(container, data)
}

export const updateScore = (point) => {
  const scoreEl = document.querySelector(".score")
  const oldScore = Number(scoreEl.textContent.split(" ")[1])
  scoreEl.textContent = "Score: " + (oldScore + point)
}

const setNewParameters = (container, data) => {
  gameData.level++
  gameData.score = Number(data.children[2].textContent.split(" ")[1])
  resetGameState(false)
  configEnemies.speed++
  initializeLevel(container, data)
}

const updateTime = () => {
  if (!gameData.isRunning || gameData.isover) return

  const timer = document.getElementsByClassName("time")[0]
  const now = performance.now() / 1000
  const diff = now - gameData.passedTime
  gameData.passedTime = now

  if (diff > 1) gameData.diffTime += diff

  const remainingTime = Math.floor(gameData.startTime - now + gameData.diffTime)

  timer.textContent = "time: " + remainingTime

  if (remainingTime === 0) triggerGameOver()
  else requestAnimationFrame(updateTime)
}

export const removeOneLife = () => {
  document.querySelector(".heart:last-of-type").remove()
  if (--gameData.lives === 0) triggerGameOver()
}

const throttle = (cb, delay) => {
  let timer = null

  return (...args) => {
    if (timer) return

    cb(...args)

    timer = setTimeout(() => {
      timer = null
    }, delay)
  }

}

const openPopup = throttle((popupName) => {
  document.getElementById(popupName).style.display = 'flex'
  gameData.isRunning = false
}, 500)

const closePopup = (popupName) => {
  document.getElementById(popupName).style.display = 'none'
  gameData.isRunning = true
}

const generateGame = (gameData) => {
  const createPopup = (id, title, buttons = '') => `
  <div class="pause-popup" id="${id}">
    <div class="pause-content">
      ${title.includes('WON') ? `<p class="pause-title">${title}</p>` : `<h2 class="pause-title">${title}</h2>`}
      ${buttons ? `<div class="pause-buttons">${buttons}</div>` : ''}
    </div>
  </div>`

  const pauseButtons = `
    <button class="pause-btn resume-btn" id="resume-btn">▶ Resume</button>
    <button class="pause-btn restart-btn" id="pause-restart-btn">↻ Restart</button>
    <button class="pause-btn quit-btn" id="pause-quit-btn">X Quit</button>`

  const gameoverButtons = `
    <button class="pause-btn restart-btn" id="gameover-restart-btn">↻ Restart</button>
    <button class="pause-btn quit-btn" id="gameover-quit-btn">X Quit</button>`

  return `
  ${createPopup('pause-popup', 'PAUSE', pauseButtons)}
  <div class="wrapper">
    <div class="data">
      <span class="level">Level: ${gameData.level} </span>
      <span class="time">Time: ${gameData.startGame} </span>
      <span class="score">Score: ${gameData.score}</span>
      <span class="lives">Lives: ${'<img class="heart" src="./assets/pictures/heart.png">'.repeat(gameData.lives)}</span>
    </div>
    <div class="container">
      ${createPopup('won-popup', 'YOU WON!')}
      ${createPopup('gameover-popup', 'GAME OVER', gameoverButtons)}
    </div>
  </div>`
}


const play = (container) => {
  if (!gameData.isRunning || gameData.isover) return

  updateTime()
  moveRocket()
  gameLoop(container)

  requestAnimationFrame(() => play(container))
}