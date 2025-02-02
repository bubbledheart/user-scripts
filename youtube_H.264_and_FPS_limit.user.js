// ==UserScript==
// @name         youtube_H.264_and_FPS_limit
// @version      1.1
// @description  youtube videos optional to h264 with optional limit up to 30 FPS.
// @match        *://*.youtube.com/*
// @match        *://*.youtube-nocookie.com/*
// @match        *://*.youtubekids.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-start
// @grant        none
// ==/UserScript==

const BLOCK_VIDEO_TYPES = true;
const BLOCK_HIGH_FPS = true;
const DISALLOWED_TYPES_REGEX = /webm|vp8|vp9|av01/i;
const FRAME_RATE_REGEX = /framerate=(\d+)/;
const scriptName = GM_info.script.name;

(function () {
    const mediaSource = window.MediaSource;
    if (!mediaSource) {
        return;
    }
    const originalIsTypeSupported = mediaSource.isTypeSupported.bind(mediaSource);

    mediaSource.isTypeSupported = (type) => {
        if (typeof type !== 'string') {
            console.log(scriptName, ": reject non-string", type);
            return false;
        }

        if (BLOCK_VIDEO_TYPES && DISALLOWED_TYPES_REGEX.test(type)) {
            console.log(scriptName, ": reject type", type);
            return false;
        }

        const frameRateMatch = FRAME_RATE_REGEX.exec(type);
        if (BLOCK_HIGH_FPS && frameRateMatch && frameRateMatch[1] > 30) {
            console.log(scriptName, ": reject fps", type);
            return false;
        }

        return originalIsTypeSupported(type);
    };

})();
