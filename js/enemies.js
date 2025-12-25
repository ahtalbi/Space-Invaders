let configEnemies = {
    speed: 4,
    numberEnemies: 15,
    numberOfEnemiesInLine: 5,
    width: 130,
    leftWall: 0,
    rightWall: 0,
    arrOfEnemies: [],
    containerEnemies: document.createElement("div"),
    goingRight: true,
}

// this represent the enemy object, it can create and update the enemy position, also includes live or dead
class enemy {
    // creates the enemy DOM element and sets its base styles
    constructor() {
        this.enemyElement = document.createElement("img");
        this.enemyElement.src = "assets/pictures/enemies/pixil-frame-0.png";
        this.enemyElement.style.position = "absolute";
        this.enemyElement.style.width = `${configEnemies.width}px`;
        this.enemyElement.style.height = `auto`;
        this.enemyElement.style.top = "0px";
        this.enemyElement.style.left = "0px";
        this.enemyElement.style.imageRendering = "pixelated";
    }

    // creates the enemy and places it relative to the previous one
    create(container, num) {
        if (num !== 0) {
            if (num % configEnemies.numberOfEnemiesInLine === 0) {
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.top, 10) + configEnemies.width / 4 * 2}px`;
                this.enemyElement.style.left = `0px`;
            } else {
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.top, 10)}px`;
                this.enemyElement.style.left = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.left, 10) + configEnemies.width / 4 * 3}px`;
            }
        }
        container.append(this.enemyElement);
    }
}

function moveTheEnemies() {
    let detEnemies = configEnemies.containerEnemies.getBoundingClientRect();
    if (configEnemies.goingRight) {
        if (detEnemies.right >= configEnemies.rightWall) {
            configEnemies.containerEnemies.style.top = parseInt(configEnemies.containerEnemies.style.top, 10) + configEnemies.speed * 3 + `px`;
            configEnemies.goingRight = false;
        } else {
            configEnemies.containerEnemies.style.left = parseInt(configEnemies.containerEnemies.style.left, 10) + configEnemies.speed + `px`;
        }
    } else {
        if (detEnemies.left <= configEnemies.leftWall) {
            configEnemies.containerEnemies.style.top = parseInt(configEnemies.containerEnemies.style.top, 10) + configEnemies.speed * 3 + `px`;
            configEnemies.goingRight = true;
        } else {
            configEnemies.containerEnemies.style.left = parseInt(configEnemies.containerEnemies.style.left, 10) - configEnemies.speed + `px`;
        }
    }
    requestAnimationFrame(() => moveTheEnemies());
}

// this function is for initialize and create all enemies
export function InitlizeTheEnemies(container) {
    let detContainer = container.getBoundingClientRect();
    configEnemies.leftWall = detContainer.left;
    configEnemies.rightWall = detContainer.right;
    configEnemies.containerEnemies.style.top = "0px";
    configEnemies.containerEnemies.style.left = "0px";
    configEnemies.containerEnemies.style.width = (configEnemies.width / 4 * 3 * (configEnemies.numberOfEnemiesInLine - 1) + configEnemies.width) + "px";
    configEnemies.containerEnemies.style.position = "absolute";
    configEnemies.containerEnemies.classList.add("containerEnemies");
    for (let i = 0; i < configEnemies.numberEnemies; i++) {
        let en = new enemy();
        en.create(configEnemies.containerEnemies, i);
        configEnemies.arrOfEnemies.push(en);
    }
    container.append(configEnemies.containerEnemies);
    requestAnimationFrame(() => moveTheEnemies());
}