import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadGoomba() {
	return loadSpriteSheet('goomba')
		.then(createGoombaFactory);
}

class Behavior extends Trait {
	constructor() {
		super('behavior');
	}

	collides(us, them) {
		if (us.killable.dead) {
			return;
		}

		if (them.stomper) {
			if (them.vel.y > us.vel.y) {
				us.killable.kill();
				them.stomper.bounce();
				us.pendulumWalk.speed = 0;
			} else {
				them.killable.kill();
			}
			
		}
	}
}

function createGoombaFactory(sprite) {
	const walkAnimation =  sprite.animations.get('walk');

	function routeAnimation(goomba) {
		if(goomba.killable.dead) {
			return 'flat';
		}

		return walkAnimation(goomba.lifeTime);
	}

	function drawGoomba(context) {
		sprite.draw(routeAnimation(this), context, 0, 0);
	}

	return function createGoomba() {
		const goomba = new Entity();
		goomba.size.set(16, 16);

		goomba.addTrait(new PendulumWalk());
		goomba.addTrait(new Behavior());
		goomba.addTrait(new Killable());

		goomba.draw = drawGoomba;

		return goomba;
	};
}
