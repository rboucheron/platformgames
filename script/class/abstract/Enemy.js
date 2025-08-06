import {AnimateElement} from "./AnimateElement.js";

export class Enemy extends AnimateElement {

    #damageToGammer = 1;
    #gammerLife;

    constructor(properties) {
        const {images, path, position, endPosition, speed} = properties;
        super({images, path, position, endPosition, speed})._setType('enemy');
        this.#damageToGammer = properties.damageToGammer || this.#damageToGammer;
        this.#gammerLife = properties.gammerLife;
    }

    _damageToPlayer() {
        this.#gammerLife.setLife(this.#gammerLife.getLife() - this.#damageToGammer)
        this.#gammerLife.render()
    }

    _takeDamage(amount = 1) {

    }
}
