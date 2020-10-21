# Youtube-VR
Adds in browser, PC VR support to Youtube 360 videos.

Installable on https://addons.mozilla.org/en-US/firefox/addon/youtube-vr/ (note only version 0.3.0 and onward will be syncronized with this repository)

To use this extension:
1. Navigate to any 360 video on Youtube.
2. Click the extension icon (a VR headset) in the top right of the browser (VR headset: a black rectangle with two white squares inside and a notch on the bottom).
3. You may need to allow VR on the page if a pop up appears in the top left corner (note you can check on that popup to always allow VR).
4. Click on the 360 button in the small video player that appears on the right side of the screen, below the normal video.
5. Click on the VR headset button on that video's controls, to the right of the time scrub bar.
6. Enjoy your video in your PC VR headset. Supported headsets listed here: https://github.com/videojs/videojs-vr#oculus-rift-and-htc-vive-support
7. To exit VR, click on the same VR headset button in the small video's controls.
8. If you navigate to a new video in a page that already has the small video player, you should start watching the new video in VR by clicking the "Update video" button, rather than clicking the addon's icon again. You will need to have exited VR as described in step 7 to have it update.

Troubleshooting:
If you see a video that looks jumbled into squares, you probably need to switch to 360 (Equirectangular) format by clicking the "EAC (default)" dropdown (below the small video player) and selecting the "360, Sphere, or equirectangular" option. Likewise, if you see a video where it gets scrunched up towards the top and bottom, switch back to EAC format with the same button. If you see a video that has some features appearing multiple times or if the title says 3D in it, you can try any of the 3d options, which is any option that has _LR or _TB at the end of its name.

Cloning Repo and Developing:
After cloning, run "npm install" in the root folder of the addon (requires Node version > 10 and NPM (I used Node 14.14.0 and NPM 6.14.8 but older versions should work)). This will fetch the dependencies (video.js and videojs-vr) and the install script will copy video.min.js, video-js.min.css, videojs-vr.min.js, and videojs-vr.css out of node_modules and into the root. The install script works on Windows and should work on other OS's, but if you can't get it to work, you can of course just copy those files out yourself (see installScript.js for the locations).

Releasing a Version to the Firefox Addon Store:
Select all files and the icons folder (everything except .git, node_modules, and the zip file if you have one already) and add/send it to a zip file (youtubeVR.zip). Upload the zip to the Firefox Addon Store.