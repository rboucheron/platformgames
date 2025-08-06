import {Element} from "../abstract/Element.js";

export class GammerLife extends Element {
    #life = 3;
    #maxLife = 5;

    constructor() {
        super({
            path: './assets/Tiles/Double/',
            images: [
                {file: `hud_heart.png`, name: 'heart'},
                {file: `hud_heart_empty.png`, name: 'heart_empty'},
            ]
        });
    }

    setLife(life) {
        if (typeof life === 'number' && life >= 0 && life <= this.#maxLife) {
            this.#life = life;
        }
    }

    getLife() {
        return this.#life;
    }

    _getAllHearts() {
        const hearts = [];
        for (let i = 0; i < this.#maxLife; i++) {
            const src = i < this.#life ? this._getImage('heart') : this._getImage('heart_empty');
            const alt = i < this.#life ? 'Heart' : 'Empty Heart';
            hearts.push(`<img src="${src}" alt="${alt}" style="width: 35px; height: 35px; margin-right: 5px;">`);
        }
        return hearts.join('');
    }

    getElement() {
        return `
            <div style="position: absolute; top: 10px; right: 10px; display: flex;" id="${this._getId()}">
                ${this._getAllHearts()}
            </div>
        `;
    }

    render() {
        let existing = document.getElementById(this._getId());
        existing.innerHTML = this._getAllHearts();
    }

}
