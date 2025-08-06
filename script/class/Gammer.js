import {Element} from "./abstract/Element.js";


export class Gammer extends Element {
    #action = 'idle';
    #collision;

    constructor(properties) {
        super({
            path: './assets/Characters/Double/',
            images: [
                {file: `character_${properties.color}_climb_a.png`, name: 'climb_a'},
                {file: `character_${properties.color}_climb_b.png`, name: 'climb_b'},
                {file: `character_${properties.color}_duck.png`, name: 'duck'},
                {file: `character_${properties.color}_front.png`, name: 'front'},
                {file: `character_${properties.color}_hit.png`, name: 'hit'},
                {file: `character_${properties.color}_idle.png`, name: 'idle'},
                {file: `character_${properties.color}_jump.png`, name: 'jump'},
                {file: `character_${properties.color}_walk_a.png`, name: 'walk_a'},
                {file: `character_${properties.color}_walk_b.png`, name: 'walk_b'},
            ],
            position: {
                y: 27,
                x: 4,
            }
        });
        this.#collision = properties.collision
    }

    getElement() {
        return `
            <div id="${this._getId()}" style="position: absolute; bottom: ${this._getPosition().y}px; left: ${this._getPosition().x}px; z-index: 10;">
                <img src="${super._getImage(this.#action)}" style="width: 75px;" alt="gammer" /> 
            </div>
        `;
    }

    render() {
        const element = document.getElementById(this._getId());
        if (element) {
            element.style.bottom = `${this._getPosition().y}px`;
            element.style.left = `${this._getPosition().x}px`;
            const img = element.querySelector('img');
            if (img) {
                img.src = super._getImage(this.#action);
            }
            this.#collision.checkCollisions(this)
        }
    }

    setPosition(position) {
        this._setPosition(position);
    }

    setAction(action) {
        if (this._getImage(action)) {
            this.#action = action;
        }
    }

    getAction() {
        return this.#action;
    }

    getPosition() {
        return this._getPosition();
    }

    onDamageTaken() {
        const element = document.getElementById(this._getId());
        if (!element) return;

        const img = element.querySelector('img');
        if (img) {
            img.src = super._getImage('hit');
        }


        if (!document.getElementById('blink-animation-style')) {
            const style = document.createElement('style');
            style.id = 'blink-animation-style';
            style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
            document.head.appendChild(style);
        }


        element.style.animation = 'blink 0.1s linear 5';
        this._setPosition({
            x: this._getPosition().x - 20,
            y: this._getPosition().y
        });

        element.style.bottom = `${this._getPosition().y}px`;
        element.style.left = `${this._getPosition().x}px`;

        setTimeout(() => {
            element.style.animation = 'none';
            this.setAction('idle');
            if (img) {
                img.src = super._getImage(this.#action);
            }
        }, 500);
    }


}