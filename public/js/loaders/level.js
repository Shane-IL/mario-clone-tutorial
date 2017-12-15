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

export function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0) {
	function applyRange(tile, xStart, xLength, yStart, yLength) {
		const xEnd = xStart + xLength;
		const yEnd = yStart + yLength;
		for (let x = xStart; x < xEnd; ++x) {
			for (let y = yStart; y < yEnd; ++y) {
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

	tiles.forEach(tile => {
		tile.ranges.forEach(range => {
			if (range.length === 4) {
				const [xStart, xLength, yStart, yLength] = range;
				applyRange(tile, xStart, xLength, yStart, yLength);
			} else if (range.length === 3) {
				const [xStart, xLength, yStart] = range;
				applyRange(tile, xStart, xLength, yStart, 1);
			} else if (range.length === 2) {
				const [xStart, yStart] = range;
				applyRange(tile, xStart, 1, yStart, 1);
			}
		});
	});
}
