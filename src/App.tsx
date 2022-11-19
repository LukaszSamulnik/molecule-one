import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = (): JSX.Element => {
	const [numberToRender, setNumberToRender] = useState<number>();
	const [hint, setHint] = useState<string>('');

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const MIN_IN_RANGE = 1;
	const MAX_IN_RANGE = 9999;

	const renderHint = (): JSX.Element | null =>
		hint.length > 0 ? <p className='input-hint'>{hint}</p> : null;

	const clearHint = (): void => setHint('');

	useEffect(() => {
		const canvas = canvasRef.current;

		if (canvas) {
			const context = canvas.getContext('2d');

			if (context) {
				context.fillStyle = '#ffc107';
				context.fillRect(0, 0, context.canvas.width, context.canvas.height);

				console.log({ canvas, context });
			}
		}
	}, []);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		clearHint();

		if (evt.currentTarget.value) {
			setNumberToRender(evt.currentTarget.valueAsNumber);
		}
	};

	const handleSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
		// bailout/validate early and advise
		if (!numberToRender || numberToRender < MIN_IN_RANGE || numberToRender > MAX_IN_RANGE) {
			setHint('Please input number in given range');
		}

		evt.preventDefault();
	};

	return (
		<div className='app-container'>
			<main>
				<form
					className='form'
					onSubmit={handleSubmitForm}
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

						<button
							className='input-render'
							type='submit'
						>
							Render!
						</button>
					</div>
					{renderHint()}
				</form>

				<canvas
					className='canvas'
					ref={canvasRef}
					width='500'
					height='500'
				></canvas>
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
