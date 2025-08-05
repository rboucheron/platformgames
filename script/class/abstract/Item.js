import {AnimateElement} from "./AnimateElement.js";

export class Item extends AnimateElement {

    constructor(properties) {
        const {images, path, position, endPosition, speed} = properties;
        super({images, path, position, endPosition, speed});
    }


}