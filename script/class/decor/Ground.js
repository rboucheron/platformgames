import { Element } from '../abstract/Element.js';

export class Ground extends Element {
    #numberOfBlocks = 1;

    constructor(proprieties) {
        super(
            {
                type: 'ground',
                images: [
                    {file: `terrain_${proprieties.groundType}_block_top.png`, name: 'ground'},
                    {file: `terrain_${proprieties.groundType}_block_top_left.png`, name: 'ground_top_left'},
                    {file: `terrain_${proprieties.groundType}_block_top_right.png`, name: 'ground_top_right'},
                ],
                path: './assets/Tiles/Double/',
                ...proprieties
            }
        );
        this.#numberOfBlocks = proprieties.numberOfBlocks || 1;
    }

    getElement() {
        let blocks = '';
        blocks += `<img src="${this._getImage('ground_top_left')}" style="width: 35px;" alt="ground" />`
        for (let i = 0; i < this.#numberOfBlocks; i++) {
            blocks += `<img src="${this._getImage('ground')}" style="width: 35px;" alt="ground" />`;
        }
        blocks += `<img src="${this._getImage('ground_top_right')}" style="width: 35px;" alt="ground" />`

        return `
            <div id="${this._getId()}" style="position: absolute; bottom: ${this._getPosition().y}px; left: ${this._getPosition().x}px; z-index: 1;">
                ${blocks}
            </div>
        `;
    }
}