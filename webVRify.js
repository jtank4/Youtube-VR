function addSwitch(player){
	let inp = document.createElement("select");
	let opts = [
		{value:"EAC",text:"EAC (default)"},
		{value:"EAC",text:"EAC_LR"},
		{value:"180",text:"180"},
		{value:"360",text:"360, Sphere, or equirectangular"},
		{value:"Cube",text:"Cube or 360_CUBE"},
		{value:"NONE",text:"None"},
		{value:"360_LR",text:"360_LR"},
		{value:"360_TB",text:"360_TB"}
	];
	for (let opt of opts){
		let thisOpt = document.createElement("option");
		thisOpt.value = opt.value;
		if(opt.text){
			thisOpt.text = opt.text;
		}
		inp.appendChild(thisOpt);
	}
	inp.addEventListener("input", (ev)=>{player.vr().changeProjection_(ev.target.value)});
	document.body.insertBefore(inp, document.getElementById("updateButton"));
}

function makeVr(ev){
	if(!ev.target.classList.contains("vjs-tech")){
		console.log("making vid into video js vid");
		ev.target.removeEventListener("loadedmetadata", makeVr);
		var player = window.player = videojs('videojs-vr-player');
        player.mediainfo = player.mediainfo || {};
        player.mediainfo.projection = 'EAC';
		console.log("About to make vr");
        var vr = window.vr = player.vr();//{debug: true, forceCardboard: false}
		console.log("Made vr");
		window.parent.postMessage("Attach stream", "*");
		addSwitch(player);
	}
	else{
		console.log("VR player was already initialized");
		ev.target.removeEventListener("loadedmetadata", makeVr);
	}
}

let vidJsVid = document.getElementById("videojs-vr-player");
vidJsVid.addEventListener("loadedmetadata", makeVr);
if(vidJsVid.readyState >= 2){
	makeVr({target:vidJsVid});
}