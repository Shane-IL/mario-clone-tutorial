//class
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y, sheetWidth, sheetHeight) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            buffer.width = sheetWidth;
            buffer.height = sheetHeight;

            const context = buffer.getContext('2d');

            if (flip) {
                context.scale(-1, 1);
                context.translate(-sheetWidth, 0);
            }

            context.drawImage(
                    this.image,
                    x,
                    y,
                    sheetWidth,
                    sheetHeight,
                    0,
                    0,
                    sheetWidth,
                    sheetHeight
                );
            return buffer;
        });
        this.tiles.set(name, buffers);
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y, flip = false) {
        const buffer = this.tiles.get(name)[flip ? 1 : 0];
        context.drawImage(buffer, x, y)
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
