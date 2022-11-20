import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const MIN_IN_RANGE = 1;
const MAX_IN_RANGE = 9999;
const CANVAS_SIZE = 600;
const CANVAS_BACKGROUND_COLOR = '#FFC107';
const CANVAS_NUMBER_COLOR = '#000';

const LINE_THICKNESS = 6;
const NUMBER_BASE_HEIGHT = 200;

const SIGN_SIZE = NUMBER_BASE_HEIGHT / 3;

const TOP_Y_NUMBER_BASE = (CANVAS_SIZE - NUMBER_BASE_HEIGHT) / 2;
const BOTTOM_Y_NUMBER_BASE = CANVAS_SIZE - TOP_Y_NUMBER_BASE - LINE_THICKNESS;

const RIGHT_X_NUMBER_BASE = CANVAS_SIZE / 2 - LINE_THICKNESS / 2;
const LEFT_X_NUMBER_BASE = CANVAS_SIZE / 2 - SIGN_SIZE;

console.log({ TOP_Y_NUMBER_BASE, BOTTOM_Y_NUMBER_BASE });

// in order: 1-9, 10-99, 100-999, 1000-9999
type SignPosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
type SignPosition2 = 'top' | 'bottom' | 'right' | 'left';

const numberToLineCoordinates = (num: number) => {
	const middleCanvas = CANVAS_SIZE / 2;
	const map: {
		[key: number]: () => {
			// @TODO refactor
			rectSize?: [number, number];
			lineShape?: any;
			start: {
				[key in SignPosition]: {
					startX: number;
					startY: number;
				};
			};
		};
	} = {
		1: () => {
			return {
				rectSize: [SIGN_SIZE, LINE_THICKNESS],
				start: {
					topRight: {
						startX: RIGHT_X_NUMBER_BASE,
						startY: TOP_Y_NUMBER_BASE,
					},
					topLeft: {
						startX: LEFT_X_NUMBER_BASE,
						startY: TOP_Y_NUMBER_BASE,
					},
					bottomRight: {
						startX: RIGHT_X_NUMBER_BASE,
						startY: BOTTOM_Y_NUMBER_BASE,
					},
					bottomLeft: {
						startX: LEFT_X_NUMBER_BASE,
						startY: BOTTOM_Y_NUMBER_BASE,
					},
				},
			};
		},
	};

	console.log('return s', { s: map[num] });

	return map[num];
};

const positions: { [key: string]: SignPosition } = {
	0: 'topRight',
	1: 'topLeft',
	2: 'bottomRight',
	3: 'bottomLeft',
};

const App = (): JSX.Element => {
	const [numberToDraw, setNumberToDraw] = useState<number | null>(null);
	const [hint, setHint] = useState<string>('');
	const [downloadHref, setDownloadHref] = useState<string>('');

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvas = canvasRef.current;

	const validateNumberIsInRange = (): boolean => {
		if (!numberToDraw) {
			return false;
		} else {
			return numberToDraw >= MIN_IN_RANGE && numberToDraw <= MAX_IN_RANGE;
		}
	};

	const renderHint = (): JSX.Element | null =>
		hint.length > 0 ? <p className='input-hint'>{hint}</p> : null;

	const renderDownloadButton = (): JSX.Element | null => {
		return validateNumberIsInRange() ? (
			<a
				className='download'
				download={`${numberToDraw}.jpg`}
				href={downloadHref}
			>
				Download as {`${numberToDraw}`}.jpg
			</a>
		) : null;
	};

	const clearHint = (): void => setHint('');

	const drawLine = (position: SignPosition, num: number): void => {
		console.log({ position, num });

		if (num === 1) {
			if (canvas) {
				const context = canvas.getContext('2d');

				if (context) {
					context.fillStyle = CANVAS_NUMBER_COLOR;

					const coordinates = numberToLineCoordinates(num)();
					console.log({ v: numberToLineCoordinates(num) });

					const { rectSize, lineShape, start } = coordinates;

					const { startX, startY } = start[position];

					if (rectSize) {
						context.fillRect(startX, startY, ...rectSize);
					}
				}
			}
		}
	};

	const drawNumber = (): void => {
		if (numberToDraw) {
			const splitted = numberToDraw.toString().split('');
			const reversed = splitted.reverse().map(numAsString => parseInt(numAsString, 10));

			reversed.forEach((num, index) => {
				if (num === 0) {
					return;
				} else {
					const position: SignPosition = positions[index];
					drawLine(position, num);
				}
			});
		}
	};

	const drawBackground = (): void => {
		if (canvas) {
			const context = canvas.getContext('2d');

			if (context) {
				context.fillStyle = CANVAS_BACKGROUND_COLOR;
				context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
			}
		}
	};

	const drawNumberBase = (): void => {
		if (canvas) {
			const context = canvas.getContext('2d');

			if (context) {
				const startX = CANVAS_SIZE / 2 - LINE_THICKNESS / 2;
				const startY = CANVAS_SIZE / 2 - NUMBER_BASE_HEIGHT / 2;

				context.fillStyle = CANVAS_NUMBER_COLOR;
				context.fillRect(startX, startY, LINE_THICKNESS, NUMBER_BASE_HEIGHT);
			}
		}
	};

	const clearCanvas = (): void => {
		if (canvas) {
			const context = canvas.getContext('2d');

			if (context) {
				context.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const initialDraw = (): void => {
		clearCanvas();
		drawBackground();
	};

	const handleDownloadHref = (): void => {
		if (canvas) {
			setDownloadHref(canvas.toDataURL('image/jpg'));
		}
	};

	// initial draw
	useEffect((): void => initialDraw(), []);

	useEffect((): void => {
		if (numberToDraw && validateNumberIsInRange()) {
			handleDownloadHref();

			clearCanvas();
			drawBackground();
			drawNumberBase();
			drawNumber();
		}
	}, [numberToDraw]);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		const value = evt.currentTarget.valueAsNumber;

		// bailout/validate early and advise
		if (!value || value < MIN_IN_RANGE || value > MAX_IN_RANGE) {
			initialDraw();
			setHint('Please input number in given range');
			setNumberToDraw(null);
		} else {
			clearHint();
			setNumberToDraw(evt.currentTarget.valueAsNumber);
		}
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
		evt.preventDefault();
	};

	return (
		<div className='app-container'>
			<main>
				<form
					className='form-wrapper'
					onSubmit={handleSubmit}
				>
					<label
						htmlFor='input-number'
						className='input-label'
					>
						Input number in range between 1 and 9999
					</label>

					<div className='input-wrapper'>
						<input
							id='input-number'
							className='input-number'
							onChange={handleInputChange}
							type='number'
							min={MIN_IN_RANGE}
							max={MAX_IN_RANGE}
						/>
						{renderHint()}
					</div>
				</form>

				<canvas
					className='canvas'
					ref={canvasRef}
					width={CANVAS_SIZE}
					height={CANVAS_SIZE}
				></canvas>

				{renderDownloadButton()}
			</main>

			<footer>
				<p>
					<a
						href='https://en.wikipedia.org/wiki/Cistercian_numerals'
						target='_blank'
						rel='noopener noreferrer'
					>
						Read more about cisterian numerals on wiki page
					</a>
				</p>
			</footer>
		</div>
	);
};

export default App;
