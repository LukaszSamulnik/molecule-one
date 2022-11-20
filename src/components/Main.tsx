import React, { useEffect, useRef, useState } from 'react';
import { defaultCanvasSettings } from '../settings';
import { validateNumberIsInRange } from '../utils';
import CanvasForm from './CanvasForm';
import DownloadButton from './DownloadButton';
import NumberToCanvas from './NumberToCanvas';

const { MIN_IN_RANGE, MAX_IN_RANGE } = defaultCanvasSettings;

const Main = (): JSX.Element => {
	const [numberToDraw, setNumberToDraw] = useState<number | null>(null);
	const [hint, setHint] = useState<string>('');
	const [downloadHref, setDownloadHref] = useState<string>('');

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvas = canvasRef.current;

	const clearHint = (): void => setHint('');

	const handleDownloadHref = (): void => {
		if (canvas) {
			setDownloadHref(canvas.toDataURL('image/jpg'));
		}
	};

	const validateNumberToDraw = () =>
		validateNumberIsInRange(numberToDraw, MIN_IN_RANGE, MAX_IN_RANGE);

	useEffect((): void => {
		if (numberToDraw && validateNumberToDraw()) {
			handleDownloadHref();
		}
	}, [numberToDraw]);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		const value = evt.currentTarget.valueAsNumber;

		if (!value || value < MIN_IN_RANGE || value > MAX_IN_RANGE) {
			setHint('Please input number in given range');
			setNumberToDraw(null);
		} else {
			clearHint();
			setNumberToDraw(evt.currentTarget.valueAsNumber);
		}
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => evt.preventDefault();

	return (
		<>
			<CanvasForm
				handleSubmit={handleSubmit}
				handleInputChange={handleInputChange}
				hint={hint}
				min={MIN_IN_RANGE}
				max={MAX_IN_RANGE}
			/>

			<NumberToCanvas
				numberToDraw={numberToDraw}
				classname={'canvas'}
				innerRef={canvasRef}
			/>

			{validateNumberToDraw() ? (
				<DownloadButton
					fileName={`${numberToDraw}.jpg`}
					href={downloadHref}
				/>
			) : null}
		</>
	);
};

export default Main;
