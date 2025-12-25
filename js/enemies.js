let configEnemies = {
    speed: 40,
    numberEnemies: 15,
    width: 150,
    leftWall: 0,
    rightWall: 0,
    arrOfEnemies: [],
}

// this represent the enemy object, it can create and update the enemy position, also includes live or dead
export class enemy {
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
            console.log(configEnemies.arrOfEnemies[num - 1].style.top, configEnemies.arrOfEnemies[num - 1].style.left);
            if (num % 5 === 0) {
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].style.top, 10) + configEnemies.width/4*2}px`;
                this.enemyElement.style.left = `0px`;
            } else {
                this.enemyElement.style.top = `${parseInt(configEnemies.arrOfEnemies[num - 1].style.top, 10)}px`;
                this.enemyElement.style.left = `${parseInt(configEnemies.arrOfEnemies[num - 1].style.left, 10) + configEnemies.width/4*3}px`;
            }
        }
        container.append(this.enemyElement);
    }
}

// this function is for initialize and create all enemies
export function InitlizeTheEnemies(container) {
    for (let i = 0; i < configEnemies.numberEnemies; i++) {
        let en = new enemy();
        en.create(container, i);
        configEnemies.arrOfEnemies.push(en.enemyElement);
    }

}