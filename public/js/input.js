import InputManager from './InputManager.js';

const input = new InputManager();

export function setupKeyboard(entity) {
    input.addMapping('Space', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        entity.go.dir = keyState;
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.go.dir = -keyState;
    });

    return input;
}
