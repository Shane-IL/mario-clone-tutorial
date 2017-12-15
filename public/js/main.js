import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders/level.js';
import { createMario } from './entities.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
	createMario(),
	loadLevel('1-1')
])
	.then(([mario, level]) => {
		const camera = new Camera();
		window.camera = camera;

		const timer = new Timer(1 / 60);

		level.entities.add(mario);

		mario.pos.set(64, 64);

		const input = setupKeyboard(mario);

		input.listenTo(window);
	
		timer.update = function update(deltaTime) {
			level.update(deltaTime);

			if(mario.pos.x > 100) {
				camera.pos.x = mario.pos.x - 100; 
			}

			level.comp.draw(context, camera);
		}
		timer.start();
	});
