// ==UserScript==
// @name         disable_youtube_subtitles
// @version      1.0
// @description  This script turns off Youtube's subtitle feature after the page loads
// @match        *.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptName = GM_info.script.name;
    let subtitlesToggle;

    function uncheck(toggle) {
        if (toggle && toggle.getAttribute('aria-pressed') === 'true') {
            toggle.click();
            console.log(scriptName, ": unchecked", toggle);
        }
    }

    function disableAfterLoad() {
        if(!subtitlesToggle) {
            subtitlesToggle = document.querySelector(".ytp-subtitles-button");
        }

        if(subtitlesToggle) {
            uncheck(subtitlesToggle);
        }

        setTimeout(disableAfterLoad, 5000);
    }

    setTimeout(disableAfterLoad, 5000);
})();
