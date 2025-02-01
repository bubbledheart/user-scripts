// ==UserScript==
// @name         disable_youtube_autoplay
// @version      1.0
// @description  This script turns off Youtube's annotations and ambient mode features
// @match        *.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptName = GM_info.script.name;
    let autoplayToggle;

    function uncheck(toggle) {
        if (toggle && toggle.getAttribute('aria-checked') === 'true') {
            toggle.click();
            console.log(scriptName, ": unchecked", toggle);
        }
    }

    function disableAfterLoad() {
        if(!autoplayToggle) {
            autoplayToggle = document.querySelector(".ytp-autonav-toggle-button");
        }

        if(autoplayToggle) {
            uncheck(autoplayToggle);
        }

        setTimeout(disableAfterLoad, 5000);
    }

    setTimeout(disableAfterLoad, 5000);
})();
