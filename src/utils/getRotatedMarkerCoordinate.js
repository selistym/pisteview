export const getRotatedMarkerCoordinate  = (alpha, x0, dx) => {
	const tan = Math.tan;
	const l1 = ((1 - 2*x0/100)*tan(alpha) - tan(dx))/(2*tan(alpha)*(1 + (1 - 2*x0/100)*tan(alpha)*tan(dx)));
	return 50 - l1 * 100;
};
