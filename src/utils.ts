export const validateNumberIsInRange = (num: number | null, min: number, max: number): boolean => {
	if (!num) {
		return false;
	} else {
		return num >= min && num <= max;
	}
};
