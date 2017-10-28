import Compositor from './Compositor.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createMario } from './entities.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Promise.all([
        createMario(),
        loadLevel('1-1')
    ])
    .then(([mario, level]) => {
        const timer = new Timer(1 / 60);

        level.entities.add(mario);

        level.comp.layers.push(createCollisionLayer(level));

        mario.pos.set(64, 64);

        const input = setupKeyboard(mario);

        input.listenTo(window);

        timer.update = function update(deltaTime) {
            level.update(deltaTime);
            level.comp.draw(context);
        }
        timer.start();
    });
