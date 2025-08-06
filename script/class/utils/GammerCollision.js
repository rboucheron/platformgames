export class GammerCollision {
    constructor(elements) {
        this.elements = elements;
    }

    static isColliding(rect1, rect2) {
        return !(
            rect1.left > rect2.right ||
            rect1.right < rect2.left ||
            rect1.top > rect2.bottom ||
            rect1.bottom < rect2.top
        );
    }

    static getBoundingBox(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with ID "${elementId}" not found.`);
            return {left: 0, right: 0, top: 0, bottom: 0};
        }

        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            top: rect.top
        };
    }

    checkCollisions(gammer) {
        const gammerBox = GammerCollision.getBoundingBox(gammer._getId());

        for (const el of this.elements) {
            const elBox = GammerCollision.getBoundingBox(el._getId());

            if (GammerCollision.isColliding(gammerBox, elBox)) {
                el.onCollision();
                if (el._getType() === 'enemy') {
                    gammer.onDamageTaken();
                }

            }
        }
    }

}
