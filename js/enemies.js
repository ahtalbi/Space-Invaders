let configEnemies = {
    speed: 40,
    numberEnemies: 15,
    conteurCreation: 1,
    leftWall: 0,
    rightWall: 0,
    bottomWall: 0,
}

export class enemy {
    constructor() {
        this.enemyElement = document.createElement("img");
        this.enemyElement.src = "assets/pictures/enemies/pixil-frame-0.png";
        this.enemyElement.style.position = "absolute";
        this.enemyElement.style.width = "200px";
        this.enemyElement.style.imageRendering = "pixelated";
    }
    create(container) {
        if (configEnemies.conteurCreation > configEnemies.numberEnemies) return null;
        container.append(this.enemyElement);
        return true;
    }
}

