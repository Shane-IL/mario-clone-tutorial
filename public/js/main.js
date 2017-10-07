import Compositor from './Compositor.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([marioSprite, backgroundSprites, level])=>{
    const comp = new Compositor()
    const pos = {x: 0, y: 0};
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(marioSprite, pos);

    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    //marioSprite.draw('idle', context, pos.x, pos.y);

    function updatePos(){
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(updatePos);
    }

    updatePos();
});
