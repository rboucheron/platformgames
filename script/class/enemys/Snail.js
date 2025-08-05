import {Enemy} from "../abstract/Enemy.js";

export class Snail extends Enemy {

    constructor(properties) {
        super({
            images: [
                {file: 'snail_walk_a.png', name: 'snail_a'},
                {file: 'snail_walk_b.png', name: 'snail_b'},
            ],
            path: './assets/Enemies/Double/',
            ...properties
        });
    }

    getElement() {
        return this._moveX(this._getImageWithAnimation('snail_a', 'snail_b'));
    }

    onCollision() {
        console.log('Snail onCollision');
        this._damageToPlayer();
    }

}
