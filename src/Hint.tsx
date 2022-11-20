type Props = {
	hint: string;
	classname: string;
};

const Hint = ({ hint, classname }: Props): JSX.Element | null => {
	return hint.length > 0 ? <p className={classname}>{hint}</p> : null;
};

export default Hint;
