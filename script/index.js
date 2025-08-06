import {GameRender} from "./class/utils/GameRender.js";
import {Scene} from "./class/Scene.js";
import {Gammer} from "./class/Gammer.js";
import {GammerCoin} from "./class/utils/GammerCoin.js";
import {GammerLife} from "./class/utils/GammerLife.js";
import {Snail} from "./class/enemys/Snail.js";
import {Fly} from "./class/enemys/Fly.js";
import {Coin} from "./class/items/Coin.js";
import {GammerCollision} from "./class/utils/GammerCollision.js";
import {Ground} from "./class/decor/Ground.js";

const scene = new Scene();
const gameRender = new GameRender();
const gammerCoin = new GammerCoin();
const gammerLife = new GammerLife();

const snail = new Snail({
    position: {y: 27, x: 300},
    endPosition: {y: 27, x: 100},
    speed: 9,
    damageToGammer: 1,
    gammerLife: gammerLife
});

const fly = new Fly({
    position: {x: 300, y: 400},
    endPosition: {x: 300, y: 100},
    speed: 10,
    damageToGammer: 1,
    gammerLife: gammerLife
});

const coins = Array.from({length: 5}, (_, i) => {
    return new Coin({
        position: {
            y: 29,
            x: 400 + i * 40
        },
        gammerCoin: gammerCoin
    });
});

const ground = new Ground({
    position: {x: 3, y: -5},
    groundType: 'dirt',
    numberOfBlocks: 10

})

const gammerCollision = new GammerCollision([fly, snail, ...coins, ground]);
const gammer = new Gammer({color: 'green', collision: gammerCollision});

const keysPressed = {};
let jumping = false;

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

const moveSpeed = 5;
const jumpHeight = 60;
const groundY = 160;

function gameLoop() {
    if (!gammer) return;

    const pos = gammer.getPosition();
    let moved = false;


    if (keysPressed['ArrowRight']) {
        gammer.setPosition({x: pos.x + moveSpeed, y: pos.y});
        gammer.setAction('walk_a');
        moved = true;
    }


    if (keysPressed['ArrowLeft']) {
        gammer.setPosition({x: pos.x - moveSpeed, y: pos.y});
        gammer.setAction('walk_b');
        moved = true;
    }

    if ((keysPressed[' '] || keysPressed['ArrowUp']) && !jumping && pos.y < groundY) {
        jumping = true;
        gammer.setAction('jump');
        gammer.setPosition({x: pos.x, y: pos.y + jumpHeight});
        gammer.render();

        setTimeout(() => {
            const current = gammer.getPosition();
            gammer.setPosition({x: current.x, y: current.y - jumpHeight});
            jumping = false;
        }, 400);
        moved = true;
    }

    if (!moved && !jumping) {
        gammer.setAction('idle');
    }

    gammer.render();
    requestAnimationFrame(gameLoop);
}

const startGame = () => {
    scene.setBackground('desert');
    gameRender.setScene(scene);
    gameRender.setElements([gammer, gammerCoin, gammerLife, snail, fly, ...coins, ground]);
    gameRender.render();
    gameLoop();
};

startGame();
