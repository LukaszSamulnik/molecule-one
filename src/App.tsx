import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import DownloadButton from './DownloadButton';
import Footer from './Footer';
import Hint from './Hint';
import NumberToCanvas from './NumberToCanvas';
import { defaultCanvasSettings } from './settings';
import { validateNumberIsInRange } from './utils';

const { MIN_IN_RANGE, MAX_IN_RANGE } = defaultCanvasSettings;

const App = (): JSX.Element => {
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
	// redraw on number change
	useEffect((): void => {
		if (numberToDraw && validateNumberToDraw()) {
			handleDownloadHref();
		}
	}, [numberToDraw]);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		const value = evt.currentTarget.valueAsNumber;

		// bailout/validate early and advise
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
						<Hint
							hint={hint}
							classname={'input-hint'}
						/>
					</div>
				</form>

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
			</main>

			<Footer />
		</div>
	);
};

export default App;
