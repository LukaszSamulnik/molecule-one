import { RefObject, useEffect } from 'react';
import { defaultCanvasSettings, flipDirections, linesCoords } from '../settings';
import { validateNumberIsInRange } from '../utils';

const {
	MIN_IN_RANGE,
	MAX_IN_RANGE,
	CANVAS_SIZE,
	CANVAS_BACKGROUND_COLOR,
	CANVAS_NUMBER_COLOR,
	LINE_THICKNESS,
	NUMBER_BASE_HEIGHT,
	SIGN_SIZE,
} = defaultCanvasSettings;

type Props = {
	numberToDraw: number | null;
	classname: string;
	innerRef: RefObject<HTMLCanvasElement>;
};

const NumberToCanvas = ({ numberToDraw, classname, innerRef }: Props): JSX.Element => {
	const canvasRef = innerRef; // useRef<HTMLCanvasElement>(null);
	const canvas = canvasRef.current;
	const context = canvas?.getContext('2d');

	const beginPath = (): void => {
		if (context) {
			context.translate(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.5);
			context.strokeStyle = CANVAS_NUMBER_COLOR;
			context.lineWidth = LINE_THICKNESS;
			context.beginPath();
		}
	};

	const drawBackground = (): void => {
		if (context) {
			context.fillStyle = CANVAS_BACKGROUND_COLOR;
			context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		}
	};

	const drawNumberBase = (): void => {
		if (context) {
			const startX = CANVAS_SIZE / 2 - LINE_THICKNESS / 2;
			const startY = CANVAS_SIZE / 2 - NUMBER_BASE_HEIGHT / 2;

			context.fillStyle = CANVAS_NUMBER_COLOR;
			context.fillRect(startX, startY, LINE_THICKNESS, NUMBER_BASE_HEIGHT);
		}
	};

	const drawLines = (numberArr: number[], width: number, height: number): void => {
		if (context) {
			numberArr.forEach((num: number, ind: number) => {
				const lines = linesCoords[num];
				const [xFlip, yFlip] = flipDirections[ind];
				const xScale = xFlip * width;
				const yScale = yFlip * height;

				context.moveTo(xScale * lines[0][0], yScale * lines[0][1]);

				for (let i = 1; i < lines.length; i++) {
					context.lineTo(xScale * lines[i][0], yScale * lines[i][1]);
				}
			});
		}
	};

	const drawNumber = (): void => {
		if (numberToDraw) {
			const splittedPaddedNumber = numberToDraw
				.toString()
				.padStart(4, '0')
				.split('')
				.map(numAsString => parseInt(numAsString, 10));

			if (canvas) {
				const context = canvas.getContext('2d');

				if (context) {
					context.save();

					drawBackground();
					drawNumberBase();
					beginPath();

					const width = SIGN_SIZE;
					const height = SIGN_SIZE;

					drawLines(splittedPaddedNumber, width, height);

					context.stroke();

					context.restore();
				}
			}
		}
	};

	const clearCanvas = (): void => {
		if (context) {
			context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		}
	};

	const initialDraw = (): void => {
		clearCanvas();
		drawBackground();
	};

	// initial draw
	useEffect((): void => initialDraw(), []);

	// redraw on number change
	useEffect((): void => {
		if (numberToDraw && validateNumberIsInRange(numberToDraw, MIN_IN_RANGE, MAX_IN_RANGE)) {
			drawNumber();
		} else {
			clearCanvas();
		}
	}, [numberToDraw]);

	return (
		<canvas
			className={classname}
			ref={innerRef}
			width={CANVAS_SIZE}
			height={CANVAS_SIZE}
		></canvas>
	);
};

export default NumberToCanvas;
