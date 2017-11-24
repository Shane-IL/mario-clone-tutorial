import InputManager from './InputManager.js';

const input = new InputManager();

export function setupKeyboard(mario) {
	input.addMapping('Space', keyState => {
		if (keyState) {
			mario.jump.start();
		} else {
			mario.jump.cancel();
		}
	});

	input.addMapping('KeyA', keyState => {
		mario.turbo(keyState);
	});

	input.addMapping('ArrowRight', keyState => {
		mario.go.dir += keyState ? 1 : -1;
	});

	input.addMapping('ArrowLeft', keyState => {
		mario.go.dir += keyState ? -1 : 1;
	});

	return input;
}
