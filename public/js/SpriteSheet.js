//class
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles =  new Map();
    }

    define(name, x, y, sheetWidth, sheetHeight) {
        const buffer = document.createElement('canvas');
        buffer.width = sheetWidth;
        buffer.height = sheetHeight;
        buffer
            .getContext('2d')
            .drawImage(
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
        this.tiles.set(name, buffer);
    }

    defineTile(name, x, y) {
        this.define(name, x *this.width, y*this.height, this.width, this.height);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y)
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
