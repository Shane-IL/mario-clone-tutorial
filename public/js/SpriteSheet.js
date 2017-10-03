//class
export default class SpriteSheet {
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles =  new Map();
    }

    define(name, x, y){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x*this.width,
                y*this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height
            );
        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y){
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y)
    }

    drawTile(name, context, x, y){
        this.draw(name, context, x * this.width, y * this.height);
    }
}

//factory
const SpriteSheetFactory = (image, width, height) => {
    // const image = image;
    // const width = width;
    // const height = height;
    const tiles = new Map();

    return {
        define: (name, x, y) => {
            const buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            buffer
                .getContext('2d')
                .drawImage(
                    image,
                    x*width,
                    y*height,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );
            tiles.set(name, buffer);
        },
        draw: (name, context, x, y) => {
            const buffer = tiles.get(name);
            context.drawImage(buffer, x, y)
        },
        drawTile: (name, context, x, y) => this.draw(name, context, x*width, y*height)
    }
};
