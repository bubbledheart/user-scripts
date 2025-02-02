// ==UserScript==
// @name         reject_youtube_cookies
// @version      1.1
// @description  This script rejects all Youtube cookies
// @match        *.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

const maxRetries = 5;

(function () {
    'use strict';

    const scriptName = GM_info.script.name;
    let rejectButton;
    let counter = 0;

    function rejectCookies() {
        if (!rejectButton) {
            const span = Array.from(document.querySelectorAll('span'))
                .find(el => el.textContent.trim() === 'Reject all' || el.textContent.trim() === 'Alle ablehnen');

            rejectButton = span?.closest('button');
            if (rejectButton) {
                console.log(scriptName, ": rejectButton found", rejectButton);
            }
        }

        if (rejectButton) {
            rejectButton.click();
            console.log(scriptName, ": rejected cookies");
        }

        if (counter < maxRetries) {
            setTimeout(rejectCookies, 1000);
            counter++;
        }
    }

    setTimeout(rejectCookies, 1000);

})();
