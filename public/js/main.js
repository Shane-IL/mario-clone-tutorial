import Compositor from './Compositor.js';
import Timer from './Timer.js';
import InputManager from './InputManager.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(([mario, level])=>{
    const gravity = 2000;
    const timer = new Timer(1/60);
    const input = new InputManager();
    const Keys = {SPACE: 32};

    level.entities.add(mario);

    mario.pos.set(64, 64);

    input.addMapping(Keys.SPACE, keyState => {
        if(keyState){
            mario.jump.start();
        }
        else{
            mario.jump.cancel();
        }
    });
    input.listenTo(window);

    timer.update = function update(deltaTime){
        level.update(deltaTime);
        level.comp.draw(context);
        mario.vel.y += gravity*deltaTime;
    }
    timer.start();
});
