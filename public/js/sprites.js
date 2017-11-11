import SpriteSheet from './SpriteSheet.js'
import { loadImage } from './loaders.js'

export function loadBackgroundSprites() {
    return loadImage('/img/tileset.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 16, 16);
            sprites.defineTile('ground', 0, 0);
            sprites.defineTile('sky', 3, 23);
            return sprites
        });
}

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
        .then(image => {
            const sprite = new SpriteSheet(image, 16, 16);
            sprite.define('idle', 276, 44, 16, 16);
            return sprite
        });
}
