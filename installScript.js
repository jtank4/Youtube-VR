//Hopefully a platform independant script for copying the required files out of node_modules and into the root
//so they can be easily included when the addon is zipped up for upload to the firefox addon store.
const fs = require("fs").promises;
function log(stuff){
	console.log(stuff);
	return new Promise((resolve, reject) => {reject('Previous failed')});
}
fs.copyFile("node_modules/video.js/dist/video.min.js", "video.min.js")
	.then(stuff => {fs.copyFile("node_modules/video.js/dist/video-js.min.css", "video-js.min.css")}, log)
	.then(stuff => {fs.copyFile("node_modules/videojs-vr/dist/videojs-vr.min.js", "videojs-vr.min.js")}, log)
	.then(stuff => {fs.copyFile("node_modules/videojs-vr/dist/videojs-vr.css", "videojs-vr.css")}, log)
	.then(stuff => {console.log("Done")}, log)
	.catch(er => {console.log(er)});