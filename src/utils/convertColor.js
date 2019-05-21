import hexRgb from 'hex-rgb';

export const convertColor = (hex, alpha) => {
	try {
		const rgba = hexRgb(hex, {format: 'array'});
		rgba[3] = alpha;
		
		return `rgba(${rgba.join(',')})`;
	} catch (err) {
		return `rgba(255,0,0,${alpha})`;
	}
};
