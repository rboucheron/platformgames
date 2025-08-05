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

    getElement() {
        const hearts = [];
        const emptyHearts = [];

        for (let i = 0; i < this.#life; i++) {
            hearts.push(`
                <div style="width: 40px;">
                    <img src="${super._getImage('heart')}" alt="Life" style="width: 100%; height: 100%;">
                </div>
            `);
        }

        for (let i = this.#life; i < this.#maxLife; i++) {
            emptyHearts.push(`
                <div style="width: 40px;">
                    <img src="${super._getImage('heart_empty')}" alt="Empty Life" style="width: 100%; height: 100%;">
                </div>
            `);
        }

        return `
            <div style="position: absolute; top: 10px; right: 10px; display: flex; " id="${this._getId()}">
                ${hearts.join('')}
                ${emptyHearts.join('')}
            </div>
        `;
    }

    render() {
        const element = document.getElementById(this._getId());
        if (element) {
            element.innerHTML = this.getElement();
        }
    }
}