export const defaultCanvasSettings = {
	MIN_IN_RANGE: 1,
	MAX_IN_RANGE: 9999,
	CANVAS_SIZE: 600,
	CANVAS_BACKGROUND_COLOR: '#FFC107',
	CANVAS_NUMBER_COLOR: '#000',
	LINE_THICKNESS: 6,
	NUMBER_BASE_HEIGHT: 200,
	SIGN_SIZE: 100,
};

export const flipDirections = [
	[1, 1], // no change
	[-1, 1], // horizontal
	[1, -1], // vertical
	[-1, -1], // both
];

export const linesCoords = [
	[[0, 0]],
	[
		[0, 1],
		[-1, 1],
	],
	[
		[0, 0.2],
		[-1, 0.2],
	],
	[
		[0, 1],
		[-1, 0.2],
	],
	[
		[0, 0.2],
		[-1, 1],
	],
	[
		[0, 0.2],
		[-1, 1],
		[0, 1],
	],
	[
		[-1, 0.2],
		[-1, 1],
	],
	[
		[-1, 0.2],
		[-1, 1],
		[0, 1],
	],
	[
		[-1, 1],
		[-1, 0.2],
		[0, 0.2],
	],
	[
		[0, 1],
		[-1, 1],
		[-1, 0.2],
		[0, 0.2],
	],
];
