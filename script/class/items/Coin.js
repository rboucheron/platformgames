import {Item} from "../abstract/Item.js";

export class Coin extends Item {
    #gammerCoin;
    #numberOfCoin = 1;

    constructor(properties) {
        super({
            images: [
                {file: 'coin_gold.png', name: 'coin_gold'},
                {file: 'coin_gold_side.png', name: 'coin_gold_side'},
            ],
            path: './assets/Tiles/Double/',
            ...properties
        });
        this.#gammerCoin = properties.gammerCoin;
    }

    getElement() {
        return `<div style="width: 50px; height: 50px; position:absolute; bottom: ${this._getPosition().y}px; left: ${this._getPosition().x}px" id="${this._getId()}">${this._getImageWithAnimation('coin_gold', 'coin_gold_side')}</div>`;
    }

    onCollision() {
        this._makeHidden();
        this.#gammerCoin.setCoin(this.#gammerCoin.getCoin() + this.#numberOfCoin);
        this.#numberOfCoin = 0;
        this.#gammerCoin.render();
    }


}