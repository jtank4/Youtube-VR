function insertWebVRify(wind){
	console.log("WebVR-ifying");
	let webVr = wind.document.createElement("script");
	webVr.src = browser.runtime.getURL("/webVRify.js");
	webVr.async = false;
	wind.document.body.appendChild(webVr);
}
function insertVidJsVr(wind){
	console.log("Inserting videojs-vr");
	let vidJsVr = wind.document.createElement("script");
	vidJsVr.onload = ()=>insertWebVRify(wind);
	vidJsVr.src = browser.runtime.getURL("/videojs-vr.min.js");
	vidJsVr.async = false;
	wind.document.body.appendChild(vidJsVr);
}
function insertVidJsVrCss(wind){
	console.log("Inserting videojs-vr css");
	let vidJsVrCss = wind.document.createElement("link");
	vidJsVrCss.rel = "stylesheet";
	vidJsVrCss.onload = ()=>insertVidJsVr(wind);
	vidJsVrCss.href = browser.runtime.getURL("/videojs-vr.css");
	vidJsVrCss.async = false;
	wind.document.body.appendChild(vidJsVrCss);
}
function insertVidJs(wind){
	console.log("Inserting video.js");
	let vidJs = wind.document.createElement("script");
	vidJs.onload = ()=>insertVidJsVrCss(wind);
	vidJs.src = browser.runtime.getURL("/video.min.js");
	vidJs.async = false;
	wind.document.body.appendChild(vidJs);
}
function insertVidJsCss(wind){
	console.log("Inserting video.js css");
	let vidJsCss = wind.document.createElement("link");
	vidJsCss.rel = "stylesheet";
	vidJsCss.onload = ()=>insertVidJs(wind);
	vidJsCss.href = browser.runtime.getURL("/video-js.min.css");
	vidJsCss.async = false;
	wind.document.body.appendChild(vidJsCss);
}
//Define videoJs video
let iframe = document.createElement("iframe");
iframe.src = "/error?src=404"; //Link is relative to youtube domain (see comment paragraph below)
let butt = document.createElement("input");
butt.type = "button";
butt.value = "Update video";
butt.id = "updateButton";
let canvas = document.createElement("video");
canvas.id = "videojs-vr-player";
let src = document.createElement("source");
src.type = "video/mp4";
src.src = browser.runtime.getURL("/smallest.mp4"); //Vr needs video in source to initialize right
canvas.appendChild(src);
canvas.className = "video-js vjs-default-skin";
canvas.style.width="100%"
canvas.setAttribute("crossorigin", "anonymous");
canvas.setAttribute("controls", "controls");
document.getElementById("columns").appendChild(iframe);
iframe.contentWindow.document.body.onload = (ev)=>{
	iframe.contentWindow.document.getElementById("error-page").remove();
	iframe.contentWindow.document.body.style.width = "auto";
	iframe.contentWindow.document.body.appendChild(canvas);
	iframe.contentWindow.document.body.appendChild(butt);
	let vidWidth = canvas.getBoundingClientRect().width;
	if(isNaN(vidWidth) || vidWidth == 0){
		vidWidth = 300;
	}
	canvas.height = vidWidth / (16/9);
	window.addEventListener("message", (ev) => {if(ev.data == "Attach stream" && !canvas.srcObject){canvas.srcObject = document.querySelectorAll("VIDEO.html5-main-video")[0].mozCaptureStream();}});
	butt.addEventListener("click", (ev) => {canvas.srcObject = document.querySelectorAll("VIDEO.html5-main-video")[0].mozCaptureStream();});
	insertVidJsCss(iframe.contentWindow);
}
canvas.load(); //Actually required

/*volumechange is the only event that has worked so far, it appears the
video must be at time 0 to properly become a vr video. canplaythrough has worked once, unclear if reliable.
both of these options work on another simpler website just by giving some element a id of columns. However on youtube
they both only partially work, allowing the video to be played with the 360 button, but once the vr button is pressed
vr is briefly attempted to be entered and then quickly thrown back out into the oculus home loading zone.
Putting the video inside an iframe inside of youtube allows it work completely, but the captureStream cannot be passed
to the iframe, at least not through postMessage, whether as data or the transferable, it gets a
"DataCloneError: The object could not be cloned." error. The iframe may seem to be on the same origin as youtube given
permission for vr is requested for youtube.com, but attempting to reach into or out of the iframe directly results in
this error as expected "Uncaught DOMException: Permission denied to access property "document" on cross-origin object".
The trick that actually works is using an iframe that links to a simple page of youtube, the one that worked for me was
a 404 page. With this, the vr player can both activate, and because it is on the same origin, js is allowed to reach
into or out of the page to retrieve the MediaStream.
*/