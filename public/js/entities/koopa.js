import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadKoopa() {
	return loadSpriteSheet('koopa')
		.then(createKoopaFactory);
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

function createKoopaFactory(sprite) {
	const walkAnimation =  sprite.animations.get('walk');
	function drawKoopa(context) {
		sprite.draw(walkAnimation(this.lifeTime), context, 0, 0, this.vel.x < 0);
	}

	return function createKoopa() {
		const koopa = new Entity();
		koopa.size.set(16, 16);
		koopa.offset.y = 8;

		koopa.addTrait(new PendulumWalk());
		koopa.addTrait(new Behavior());
		koopa.addTrait(new Killable());

		koopa.draw = drawKoopa;

		return koopa;
	};
}
