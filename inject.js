//browser.tabs.getCurrent().then(log); //This code only started working once this was added in, but it continues working without it
console.log("Injecting videojs, videojs-vr, and script to put videojs-vr player on youtube.");
var loadBox = document.getElementById("loadingBox");
var error=false;
function finish(){
	if(!error){
		loadBox.innerText = "Added VR!";
	}
}
function reportExecuteScriptError(error) {
	error=true;
	console.log(error);
	loadBox.innerText = `Failed to inject scripts: ${error.message}`;
}
//When the popup loads, inject addDependencies.js into the active tab

browser.tabs.executeScript({file: "/addDependencies.js"})
	.then(finish, reportExecuteScriptError)