import Compositor from './Compositor.js';
import Timer from './Timer.js';
import InputManager from './InputManager.js';
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
    const gravity = 2000;
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(mario);
    const timer = new Timer(1/60);
    const input = new InputManager();

    const Keys = {SPACE: 32};

    mario.pos.set(64,180);

    input.addMapping(Keys.SPACE, keyState => {
        if(keyState){
            mario.jump.start();
        }
        else{
            mario.jump.cancel();
        }
    });
    input.listenTo(window);

    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    timer.update = function update(deltaTime){
        mario.update(deltaTime);
        comp.draw(context);
        mario.vel.y += gravity*deltaTime;
    }
    timer.start();
});
