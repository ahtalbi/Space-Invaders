let configEnemies = {
    speed: 2,
    numberEnemies: 15,
    numberOfEnemiesInLine: 5,
    width: 60,
    leftWall: 0,
    rightWall: 0,
    bottomWall: 0,
    arrOfEnemies: [],
    containerEnemies: document.createElement("div"),
    goingRight: true,
}

let configBulletsEnemies = {
    speed: 4,
    width: 7,
    height: 7,
    minEnShot: 1,
    maxEnShot: 2,
    minEnShotTime: 100,
    maxEnShotTime: 1000,
}

// this represent the enemy object, it can create and update the enemy position, also includes live or dead
class enemy {
    // creates the enemy DOM element and sets its base styles
    constructor() {
        this.enemyElement = document.createElement("img");
        this.enemyElement.src = "assets/pictures/enemies/enemy.gif";
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
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.top, 10) + configEnemies.width}px`;
                this.enemyElement.style.left = `0px`;
            } else {
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.top, 10)}px`;
                this.enemyElement.style.left = `${parseInt(configEnemies.arrOfEnemies[num - 1].enemyElement.style.left, 10) + configEnemies.width}px`;
            }
        }
        container.append(this.enemyElement);
    }

    shotTheBullete() {
        let bullet = document.createElement("div");
        bullet.classList.add("enemyProjectile");
        bullet.style.position = "absolute";
        bullet.style.width = `${configBulletsEnemies.width}px`;
        bullet.style.height = `${configBulletsEnemies.height}px`;
        bullet.style.backgroundColor = "red";
        bullet.style.borderRadius = "50%";

        let enemyRect = this.enemyElement.getBoundingClientRect();
        let parentRect = this.enemyElement.offsetParent.offsetParent.getBoundingClientRect();

        bullet.style.left = `${enemyRect.left - parentRect.left + configEnemies.width / 2 - configBulletsEnemies.width / 2}px`;
        bullet.style.top = `${enemyRect.bottom - parentRect.top}px`;
        bullet.style.zIndex = "999999";

        this.enemyElement.offsetParent.offsetParent.append(bullet);

        function moveBullet() {
            let bulletRect = bullet.getBoundingClientRect();
            let currentTop = parseInt(bullet.style.top, 10);
            bullet.style.top = `${currentTop + configBulletsEnemies.speed}px`;

            if (bulletRect.bottom >= configEnemies.bottomWall - 5) {
                bullet.remove();
                return;
            }

            requestAnimationFrame(moveBullet);
        }

        requestAnimationFrame(moveBullet);
    }
}

// this function for the movment of the enemies 
function moveTheEnemies() {
    let detEnemies = configEnemies.containerEnemies.getBoundingClientRect();
    if (detEnemies.bottom >= document.getElementById("rocket").getBoundingClientRect().top) {
        console.log("YOU DIE");
        return;
    };
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
    requestAnimationFrame(moveTheEnemies);
}

// just to check if the element b in our case its the bullet is inside a which is the enemy
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

// this function is to update the enemies position after each print of the frame on the browser if it changes
function updateEnemiesContainerSize() {
    const enemies = configEnemies.arrOfEnemies;
    if (enemies.length === 0) return;

    let minLeft = Infinity;
    let minTop = Infinity;
    let maxRight = -Infinity;
    let maxBottom = -Infinity;

    for (let i = 0; i < enemies.length; i++) {
        const enemyLeft = parseInt(enemies[i].enemyElement.style.left, 10);
        const enemyTop = parseInt(enemies[i].enemyElement.style.top, 10);
        const enemyRight = enemyLeft + configEnemies.width;
        const enemyBottom = enemyTop + configEnemies.width;

        if (enemyLeft < minLeft) minLeft = enemyLeft;
        if (enemyTop < minTop) minTop = enemyTop;
        if (enemyRight > maxRight) maxRight = enemyRight;
        if (enemyBottom > maxBottom) maxBottom = enemyBottom;
    }

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].enemyElement.style.left = (parseInt(enemies[i].enemyElement.style.left, 10) - minLeft) + "px";
        enemies[i].enemyElement.style.top = (parseInt(enemies[i].enemyElement.style.top, 10) - minTop) + "px";
    }

    configEnemies.containerEnemies.style.left = (parseInt(configEnemies.containerEnemies.style.left, 10) + minLeft) + "px";
    configEnemies.containerEnemies.style.top = (parseInt(configEnemies.containerEnemies.style.top, 10) + minTop) + "px";

    configEnemies.containerEnemies.style.width = (maxRight - minLeft) + "px";
    configEnemies.containerEnemies.style.height = (maxBottom - minTop) + "px";
}

// this function is to delet the enemy when he die
function enemyDie() {
    const bullets = document.querySelectorAll(".projectile");
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < configEnemies.arrOfEnemies.length; j++) {
            if (isTheBulletInside(bullets[i], configEnemies.arrOfEnemies[j].enemyElement)) {
                configEnemies.arrOfEnemies[j].enemyElement.remove();
                configEnemies.arrOfEnemies.splice(j, 1);
                if (configEnemies.arrOfEnemies.length === 0) {
                    // next level
                }
                bullets[i].remove();
                updateEnemiesContainerSize();
            }
        }
    }
    requestAnimationFrame(enemyDie);
}

function enemiesShots() {
    let n = configEnemies.arrOfEnemies.length;
    if (n === 0) {
        let delay = Math.random() * (configBulletsEnemies.maxEnShotTime - configBulletsEnemies.minEnShotTime) + configBulletsEnemies.minEnShotTime;
        setTimeout(enemiesShots, delay);
        return;
    }

    for (let i = configBulletsEnemies.minEnShot; i <= configBulletsEnemies.maxEnShot; i++) {
        let ind = Math.floor(Math.random() * n);
        configEnemies.arrOfEnemies[ind].shotTheBullete();
    }

    let delay = Math.random() * (configBulletsEnemies.maxEnShotTime - configBulletsEnemies.minEnShotTime) + configBulletsEnemies.minEnShotTime;
    setTimeout(enemiesShots, delay);
}

// this function is for initialize and create all enemies
export function InitlizeTheEnemies(container) {
    let detContainer = container.getBoundingClientRect();
    configEnemies.leftWall = detContainer.left;
    configEnemies.rightWall = detContainer.right;
    configEnemies.bottomWall = detContainer.bottom;
    configEnemies.containerEnemies.style.top = "30px";
    configEnemies.containerEnemies.style.left = "0px";
    configEnemies.containerEnemies.style.zIndex = "99999999";
    configEnemies.containerEnemies.style.width = (configEnemies.width * (configEnemies.numberOfEnemiesInLine - 1) + configEnemies.width) + "px";
    configEnemies.containerEnemies.style.height = (Math.ceil(configEnemies.numberEnemies / configEnemies.numberOfEnemiesInLine) - 1) * configEnemies.width + configEnemies.width + "px";
    configEnemies.containerEnemies.style.position = "absolute";
    configEnemies.containerEnemies.classList.add("containerEnemies");
    for (let i = 0; i < configEnemies.numberEnemies; i++) {
        let en = new enemy();
        en.create(configEnemies.containerEnemies, i);
        configEnemies.arrOfEnemies.push(en);
    }
    container.append(configEnemies.containerEnemies);
    requestAnimationFrame(moveTheEnemies);
    requestAnimationFrame(enemiesShots);
    requestAnimationFrame(enemyDie);
}