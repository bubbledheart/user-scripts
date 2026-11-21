// ==UserScript==
// @name         youtube_middleClickOnSearch_opensInNewTab
// @namespace    https://youtube.com/
// @version      1.2
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @description  Middle-click YouTube search button to search in a new tab
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
    'use strict';

    document.addEventListener('mousedown', (event) => {
        if (event.button !== 1) return;

        const button = event.target.closest(
            'button.ytSearchboxComponentSearchButton'
        );

        if (!button) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        const wrapper = button.closest(
            '.ytSearchboxComponentInputWrapper'
        );

        const query = wrapper
        ?.querySelector('input[name="search_query"]')
        ?.value.trim();

        if (!query) return;

        window.open(
            `/results?search_query=${encodeURIComponent(query)}`,
                    '_blank'
        );
    }, true);
})();
