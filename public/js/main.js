import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([mario, backgroundSprites, level])=>{
    const comp = new Compositor()
    const gravity = 30;
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(mario);
    const timer = new Timer(1/60);

    mario.pos.set(64,180);
    mario.vel.set(200,-600);

    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    timer.update = function update(deltaTime){
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
    }
    timer.start();
});
