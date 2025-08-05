import {Element} from './abstract/Element.js';

export class Scene extends Element {

    #background = 'default'

    constructor() {
        super(
            {
                images: [
                    {file: 'background_clouds.png', name: 'default'},
                    {file: 'background_color_desert.png', name: 'desert'},
                    {file: 'background_color_hills.png', name: 'hills'},
                    {file: 'background_color_mushrooms.png', name: 'mushrooms'},
                    {file: 'background_color_trees.png', name: 'trees'},
                ],
                path: '../../assets/Backgrounds/Double/',
            }
        );
    }

    setBackground(background) {
        if (typeof background === 'string' && this._getImage(background)) {
            this.#background = background;
        }
    }

    getBackground(){
        return super._getImage(this.#background);
    }


}