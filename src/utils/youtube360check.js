export const doesBrowserSupport360 = () => {
	// YouTube supports 360 videos in a limited set of browsers,
	// see https://support.google.com/youtube/answer/6178631
	
	var ua = navigator.userAgent;
	
	// No mobile browser is supported at the moment
	if (/Mobile/.test(ua) || /Tablet/.test(ua)) return false;
	
	// Chrome >= 40
	if (/Chrome\/[^123][0-9]/.test(ua) && !/Edge\//.test(ua) && !/OPR\//.test(ua)) return true;
	
	// Firefox >= 40
	if (/Firefox\/[^123][0-9]/.test(ua)) return true;
	
	// Microsoft Edge
	if (/Edge\//.test(ua)) return true;
	
	// Opera >= 30
	if (/OPR\/[^12][0-9]/.test(ua)) return true;
	
	return false;
};
