import {Element} from "./Element.js";

export class AnimateElement extends Element {
    #endPosition = {x: 0, y: 0};
    #speed = 0;
    #currentFrame = 0;
    #intervalId = null;

    constructor(properties) {
        const {images, path, position} = properties;
        super({images, path, position});

        this.#endPosition = properties.endPosition || this.#endPosition;
        this.#speed = properties.speed || this.#speed;
    }


    _moveX(imgHtml) {
        const duration = 100 / this.#speed;

        const keyframes = `
            @keyframes move-${this._getId()} {
                0%   { left: ${this._getPosition().x}px;  }
                50%  { left: ${this.#endPosition.x}px;  }
                100% { left: ${this._getPosition().x}px;  }
            }
        `;


        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        return `
            <div id="${this._getId()}" style="
                position: absolute;
                bottom: ${this._getPosition().y}px;
                left: ${this._getPosition().x}px;
                width: 50px;
                height: 50px;
                animation: move-${this._getId()} ${duration}s linear infinite alternate;
            ">
                ${imgHtml}
            </div>
        `;
    }

    _moveY(imgHtml) {
        const duration = 100 / this.#speed;

        const keyframes = `
            @keyframes move-${this._getId()} {
                0%   {  bottom: ${this._getPosition().y}px; }
                50%  {  bottom: ${this.#endPosition.y}px; }
                100% {  bottom: ${this._getPosition().y}px; }
            }
        `;


        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        return `
            <div id="${this._getId()}" style="
                position: absolute;
                bottom: ${this._getPosition().y}px;
                left: ${this._getPosition().x}px;
                width: 50px;
                height: 50px;
                animation: move-${this._getId()} ${duration}s linear infinite alternate;
            ">
                ${imgHtml}
            </div>
        `;
    }

    async _makeHidden() {
        const element = document.getElementById(this._getId());
        if (element) {
            element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            element.style.transform = 'translateY(-20px)';
            element.style.opacity = '0';

            setTimeout(() => {
                element.style.display = 'none';
            }, 100);
        }
    }


    _getImageWithAnimation(nameA, nameB) {
        const imgId = `img-${this._getId()}`;
        const initialSrc = this._getImage(nameA);

        const imgHtml = `<img id="${imgId}" src="${initialSrc}" alt="animated" style="width: 100%; height: 100%;">`;

        setTimeout(() => {
            const img = document.getElementById(imgId);
            if (!img) return;

            this.#intervalId = setInterval(() => {
                this.#currentFrame = (this.#currentFrame + 1) % 2;
                const next = this.#currentFrame === 0 ? nameA : nameB;
                img.src = this._getImage(next);
            }, 300);
        }, 0);

        return imgHtml;
    }
}
