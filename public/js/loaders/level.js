import Level from '../Level.js';
import { createBackgroundLayer, createSpriteLayer } from '../layers.js';
import { loadJSON, loadSpriteSheet } from '../loaders.js';

export function loadLevel(name) {
	return loadJSON(`/levels/${name}.json`)
		.then(levelSpec => Promise.all([
			levelSpec,
			loadSpriteSheet(levelSpec.spriteSheet)
		]))
		.then(([levelSpec, backgroundSprites]) => {
			const level = new Level();

			createTiles(level, levelSpec.tiles, levelSpec.patterns);

			const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
			const spriteLayer = createSpriteLayer(level.entities);

			level.comp.layers.push(backgroundLayer);
			level.comp.layers.push(spriteLayer);

			return level;
		});
}

function* expandSpan(xStart, xLength, yStart, yLength) {
	const xEnd = xStart + xLength;
	const yEnd = yStart + yLength;
	for (let x = xStart; x < xEnd; ++x) {
		for (let y = yStart; y < yEnd; ++y) {
			yield {x, y};
		} 
	}
}

function expandRange(range) {
	if (range.length === 4) {
		const [xStart, xLength, yStart, yLength] = range;
		return expandSpan(xStart, xLength, yStart, yLength);
	} else if (range.length === 3) {
		const [xStart, xLength, yStart] = range;
		return expandSpan(xStart, xLength, yStart, 1);
	} else if (range.length === 2) {
		const [xStart, yStart] = range;
		return expandSpan(xStart, 1, yStart, 1);
	}
}

function* expandRanges(ranges) {
	for(const range of ranges) {
		for(const item of expandRange(range)) {
			yield item;
		}
	}
}

function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0) {
	for(const tile of tiles) {
		for (const {x, y} of expandRanges(tile.ranges)){
			const derivedX = x + offsetX;
			const derivedY = y + offsetY;

			if (tile.pattern) {
				const tiles = patterns[tile.pattern].tiles;
				createTiles(level, tiles, patterns, derivedX, derivedY);
			} else {
				level.tiles.set(derivedX, derivedY, {
					name: tile.name,
					type: tile.type
				});
			}
		}
	}
}
