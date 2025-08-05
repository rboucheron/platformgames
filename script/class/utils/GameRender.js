export class GameRender {
    #elements = [];
    #scene = {};
    #container = document.getElementById('root');


    render() {
        this.#container.style.backgroundImage = `url(${this.#scene.getBackground()})`;
        this.#container.innerHTML = this.#elements.map(el => el.getElement()).join('');
    }

    setScene(scene) {
        this.#scene = scene;
    }

    setElements(elements = []) {
        this.#elements = elements;
    }

}