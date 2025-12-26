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

const startGame = () => {
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

export const createGameBoard = () => {
  const fragment = document.createDocumentFragment()

  // document.createElement("div")

  // const startPopup = document.createElement("div")
  // startPopup.className = "start-popup"
  // startPopup.textContent = "popup"
  // fragment.append(startPopup)

  const wrapper = document.createElement("div")
  wrapper.className = "wrapper"

  const hud = document.createElement("div")
  hud.className = "data"

  const container = document.createElement("div")
  container.className = "container"

  wrapper.append(hud, container)
  fragment.append(wrapper)

  const level = document.createElement("span")
  level.className = "level"
  level.textContent = "Level: " + gameData.level
  hud.append(level)

  const time = document.createElement("span")
  time.className = "time"
  time.textContent = "Time: " + gameData.startTime
  hud.append(time)

  const score = document.createElement("span")
  score.className = "score"
  score.textContent = "Score: " + gameData.score
  hud.append(score)

  const lives = document.createElement("span")
  lives.className = "lives"
  lives.textContent = "Lives: "
  hud.append(lives)

  for (let i = 0; i < gameData.lives; i++) {
    const heart = document.createElement("img")
    heart.className = "heart"
    heart.src = "./assets/pictures/heart.png"
    lives.append(heart)
  }

  // InitlizeTheEnemies(container)

  rocket = new Rocket()
  rocket.create(container)

  document.body.append(fragment)
  startGame()
}
