import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import { createAnimation } from './animation.js';
import { loadSpriteSheet } from './loaders.js';

export function createMario() {
	return loadSpriteSheet('mario')
		.then(sprite => {
			const mario = new Entity();
			mario.size.set(14, 16);

			mario.addTrait(new Go());
			mario.addTrait(new Jump());

			const runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 10);
			function routeFrame(mario) {
				if(!mario.jump.ready) {
					return 'jump';
				}
				if(mario.go.distance > 0) {
					if(mario.vel.x > 0 && mario.go.dir < 0 || mario.vel.x < 0 && mario.go.dir > 0) {
						return 'break';
					}
					return runAnimation(mario.go.distance);
				}
				return 'idle';
			}

			mario.draw = function drawMario(context) {
				sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
			};
			return mario;
		});
}
