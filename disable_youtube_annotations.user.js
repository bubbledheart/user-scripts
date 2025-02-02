// ==UserScript==
// @name         disable_youtube_annotations
// @version      1.3
// @description  This script turns off Youtube's annotations
// @match        *.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptName = GM_info.script.name;
    let settingsInitialized;
    let annotationsToggle;

    function init() {
        settingsInitialized = false;
        annotationsToggle = false;
    }

    function isWatchPage() {
        const currentPath = window.location.pathname;
        if(currentPath.endsWith('/watch')) {
            return true;
        }
        return false;
    }

    function uncheck(toggle) {
        if (toggle && toggle.getAttribute('aria-checked') === 'true') {
            toggle.click();
            console.log(scriptName, ": unchecked", toggle);
        }
    }

    function disableAfterLoad() {
        if(!isWatchPage()) {
            console.log(scriptName, ": not on a watch page");
            return;
        }

        if(!settingsInitialized) {
            let settings_button = document.querySelector(".ytp-settings-button");
            if(settings_button) {
                settings_button.click();
                settings_button.click();

                let all_labels = document.querySelectorAll(".ytp-menuitem-label");
                if(all_labels.length > 0) {
                    settingsInitialized = true;
                    console.log(scriptName, ": settings initialized");
                }

                for (let i = 0; i < all_labels.length; i++) {
                    if (all_labels[i].innerHTML == "Annotations") {
                        annotationsToggle = all_labels[i].parentNode;
                        console.log(scriptName, ": annotationsToggle found", annotationsToggle);
                    }
                }
            }
            if(!annotationsToggle) {
                console.log(scriptName, ": no annotationsToggle found");
                return;
            }
        }

        if(annotationsToggle) {
            uncheck(annotationsToggle);
        }

        setTimeout(disableAfterLoad, 5000);
    }

    const timeout = setTimeout(disableAfterLoad, 5000);

    // rerun script on youtube spf.js redirect
    window.addEventListener('yt-navigate-finish', () => {
        clearTimeout(timeout);
        init();
        setTimeout(disableAfterLoad, 5000);
    });
})();
