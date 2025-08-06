import {Element} from "../abstract/Element.js";

export class GammerCoin extends Element {
    #coin = 0;

    constructor() {
        super(
            {
                images: [{file: 'coin_gold.png', name: 'coin'},
                    {file: 'coin_silver.png', name: 'coin_silver'},
                ],
                path: './assets/Tiles/Double/',
            }
        )
    }

    getElement() {
        const coinImage = this.#coin === 0
            ? this._getImage('coin_silver')
            : this._getImage('coin');

        return `
            <div style="position: absolute; top: 60px; right: 10px; display: flex; align-items: center;  padding-left: 5px; padding-right: 5px; background-color: rgba(0,0,0,0.56); border-radius: 50px" id="${this._getId()}">
                <div style="width: 40px; height: 40px;">
                    <img src="${coinImage}" alt="Coin" style="width: 100%; height: 100%;">
                </div>
                <span style="font-size: 20px; color: gold; margin-left: 5px;">
                    ${this.#coin}
                </span>
            </div>
        `;
    }

    setCoin(coin) {
        if (typeof coin === 'number' && coin >= 0) {
            this.#coin = coin;
        }
    }
    getCoin() {
        return this.#coin;
    }

    render() {
        const element = document.getElementById(this._getId());
        if (element) {
            const img = element.querySelector('img');
            if (img) {
                img.src = this._getImage(this.#coin === 0 ? 'coin_silver' : 'coin');
            }
            const span = element.querySelector('span');
            if (span) {
                span.textContent = this.#coin;
            }
        }
    }


}