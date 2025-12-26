let configEnemies = {
    speed: 3,
    numberEnemies: 15,
    numberOfEnemiesInLine: 5,
    width: 130,
    leftWall: 0,
    rightWall: 0,
    arrOfEnemies: [],
    containerEnemies: document.createElement("div"),
    goingRight: true,
    animationEnemies: null,
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
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.top, 10) + configEnemies.width / 2}px`;
                this.enemyElement.style.left = `0px`;
            } else {
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.top, 10)}px`;
                this.enemyElement.style.left = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.left, 10) + configEnemies.width / 4 * 3}px`;
            }
        }
        container.append(this.enemyElement);
    }
}

// this function for the movment of the enemies 
function moveTheEnemies() {
    let detEnemies = configEnemies.containerEnemies.getBoundingClientRect();
    // ici déclencher le end game.
    if (detEnemies.bottom >= document.getElementById("rocket").getBoundingClientRect().top) return;
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

function isTheBulletInside(a, b) {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();

    return (
        ra.left < rb.right &&
        ra.right > rb.left &&
        ra.top < rb.bottom &&
        ra.bottom > rb.top
    );
}

function updateEnemiesContainerSize() {
    const enemies = configEnemies.arrOfEnemies;
    if (enemies.length === 0) return;

    let minLeft = Infinity;
    let maxRight = -Infinity;
    let maxBottom = -Infinity;

    for (let i = 0; i < enemies.length; i++) {
        const rect = enemies[i].enemyElement.getBoundingClientRect();
        const parentRect = configEnemies.containerEnemies.getBoundingClientRect();

        const left = rect.left - parentRect.left;
        const right = rect.right - parentRect.left;
        const bottom = rect.bottom - parentRect.top;

        if (left < minLeft) minLeft = left;
        if (right > maxRight) maxRight = right;
        if (bottom > maxBottom) maxBottom = bottom;
    }

    configEnemies.containerEnemies.style.width = (maxRight - minLeft) + "px";
    configEnemies.containerEnemies.style.height = maxBottom + "px";
}

function enemyDie() {
    const bullets = document.querySelectorAll(".projectile");
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < configEnemies.arrOfEnemies.length; j++) {
            if (isTheBulletInside(bullets[i], configEnemies.arrOfEnemies[j].enemyElement)) {
                configEnemies.arrOfEnemies[j].enemyElement.remove();
                configEnemies.arrOfEnemies.splice(j, 1);
                bullets[i].remove();
                updateEnemiesContainerSize();
                cancelAnimationFrame(configEnemies.animationEnemies);
                configEnemies.animationEnemies = requestAnimationFrame(() => moveTheEnemies());
            }
        }
    }
    requestAnimationFrame(() => enemyDie());
}

// this function is for initialize and create all enemies
export function InitlizeTheEnemies(container) {
    let detContainer = container.getBoundingClientRect();
    configEnemies.leftWall = detContainer.left;
    configEnemies.rightWall = detContainer.right;
    configEnemies.containerEnemies.style.top = "0px";
    configEnemies.containerEnemies.style.left = "0px";
    configEnemies.containerEnemies.style.zIndex = "99999999";
    configEnemies.containerEnemies.style.width = (configEnemies.width / 4 * 3 * (configEnemies.numberOfEnemiesInLine - 1) + configEnemies.width) + "px";
    configEnemies.containerEnemies.style.height = (Math.ceil(configEnemies.numberEnemies / configEnemies.numberOfEnemiesInLine) - 1) * (configEnemies.width / 2) + configEnemies.width + "px";
    configEnemies.containerEnemies.style.position = "absolute";
    configEnemies.containerEnemies.classList.add("containerEnemies");
    for (let i = 0; i < configEnemies.numberEnemies; i++) {
        let en = new enemy();
        en.create(configEnemies.containerEnemies, i);
        configEnemies.arrOfEnemies.push(en);
    }
    container.append(configEnemies.containerEnemies);
    configEnemies.animationEnemies = requestAnimationFrame(() => moveTheEnemies());
    requestAnimationFrame(() => enemyDie());
}