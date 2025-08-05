import {Enemy} from "../abstract/Enemy.js";

export class Fly extends Enemy {

    constructor(properties) {
        super({
            images: [
                {file: 'fly_a.png', name: 'fly_a'},
                {file: 'fly_b.png', name: 'fly_b'},
            ],
            path: './assets/Enemies/Double/',
            ...properties
        });
    }

    getElement() {
        return this._moveY(this._getImageWithAnimation('fly_a', 'fly_b'));
    }

    onCollision() {
        this._damageToPlayer();
    }

}