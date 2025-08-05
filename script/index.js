import {GameRender} from "./class/utils/GameRender.js";
import {Scene} from "./class/Scene.js";
import {Gammer} from "./class/Gammer.js";
import {GammerCoin} from "./class/utils/GammerCoin.js";
import {GammerLife} from "./class/utils/GammerLife.js";
import {Snail} from "./class/enemys/Snail.js";
import {Fly} from "./class/enemys/Fly.js";
import {Coin} from "./class/items/Coin.js";
import {GammerCollision} from "./class/utils/GammerCollision.js";

const scene = new Scene();
const gameRender = new GameRender();
const gammerCoin = new GammerCoin();
const gammerLife = new GammerLife();


const snail = new Snail({
    position: {y: 27, x: 300},
    endPosition: {y: 27, x: 100},
    speed: 9,
    damageToGammer: 2,
    gammerLife: gammerLife
});

const fly = new Fly({
    position: {x: 300, y: 400},
    endPosition: {x: 300, y: 200},
    speed: 10,
    damageToGammer: 1,
    gammerLife: gammerLife
});

const coins = Array.from({ length: 10 }, (_, i) => {
    return new Coin({
        position: {
            y: 29,
            x: 400 + i * 20
        },
    });
});
const gammerCollision = new GammerCollision([fly, snail])
const gammer = new Gammer({color:'green', collision: gammerCollision});

const startGame = () => {
    scene.setBackground('desert');
    gameRender.setScene(scene);
    gameRender.setElements([gammer, gammerCoin, gammerLife, snail, fly, ...coins]);
    gameRender.render();
};

document.addEventListener('keydown', (event) => {
    if (!gammer) return;

    switch (event.key) {
        case 'ArrowRight':
            gammer.setAction('walk_a');
            gammer.render();
            setTimeout(() => {
                gammer.setPosition({
                    y: gammer.getPosition().y,
                    x: gammer.getPosition().x + 10
                });
                gammer.setAction('idle');
                gammer.render();
            }, 100);
            break;

        case 'ArrowLeft':
            gammer.setAction('walk_b');
            gammer.render();
            setTimeout(() => {
                gammer.setPosition({
                    y: gammer.getPosition().y,
                    x: gammer.getPosition().x - 10
                });
                gammer.setAction('idle');
                gammer.render();
            }, 100);
            break;
        case ' ':
        case 'ArrowUp':

            if (gammer.getPosition().y < 160) {
                gammer.setAction('jump');
                gammer.render();
                setTimeout(() => {
                    gammer.setPosition({
                        y: gammer.getPosition().y + 30,
                        x: gammer.getPosition().x
                    });

                    gammer.render();
                }, 100);
                setTimeout(() => {

                    gammer.setPosition({
                        y: gammer.getPosition().y - 30,
                        x: gammer.getPosition().x
                    });
                    gammer.setAction('idle');
                    gammer.render();
                }, 500);
            }




            break;

        default:
            gammer.setAction('idle');
    }

    gammer.render();
});


startGame();