import Hint from './Hint';

type Props = {
	handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
	hint: string;
	min: number;
	max: number;
};

const CanvasForm = ({ handleSubmit, handleInputChange, hint, min, max }: Props): JSX.Element => (
	<form
		className='form-wrapper'
		onSubmit={handleSubmit}
	>
		<label
			htmlFor='input-number'
			className='input-label'
		>
			Input number in range between {min} and {max}
		</label>

		<div className='input-wrapper'>
			<input
				id='input-number'
				className='input-number'
				onChange={handleInputChange}
				type='number'
				min={min}
				max={max}
			/>
			<Hint
				hint={hint}
				classname={'input-hint'}
			/>
		</div>
	</form>
);

export default CanvasForm;
