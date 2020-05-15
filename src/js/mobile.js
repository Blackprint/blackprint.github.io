var hasTouchScreen = false;
if (navigator.maxTouchPoints !== void 0)
    hasTouchScreen = navigator.maxTouchPoints > 0;
else if (navigator.msMaxTouchPoints !== void 0)
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)")
        hasTouchScreen = !!mQ.matches;
    else {
        // Fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

if(hasTouchScreen)
	$(document.body).addClass('disable-effect');