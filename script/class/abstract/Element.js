export class Element {
    #images = [];
    #path = '';
    #position = {
        y: 0,
        x: 0,
    };
    #type = 'element';
    #id = `element-${Math.random().toString(36).substring(2, 9)}`;

    constructor(properties) {
        this.#images = properties.images || [];
        this.#path = properties.path || '';
        this.#position = properties.position || this.#position;
    }

    _getImage(name) {
        return `${this.#path}${this.#images.find(img => img.name === name)?.file || this.#images[0]?.file || ''}`;
    }

    _getId() {
        return this.#id;
    }

    _getPosition() {
        return this.#position;
    }

    _getElementPosition() {
        return {
            x: document.getElementById(this._getId())?.offsetLeft || this._getPosition().x,
            y: document.getElementById(this._getId())?.offsetTop || this._getPosition().y,
        }
    }

    _setPosition(position) {
        this.#position = position;
    }

    _setType(type) {
        this.#type = type;
    }

    _getType() {
        return this.#type;
    }

    _getElement() {
        return ''
    }

    onCollision() {

    }
}
