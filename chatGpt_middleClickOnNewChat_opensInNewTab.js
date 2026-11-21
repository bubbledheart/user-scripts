// ==UserScript==
// @name         chatGpt_middleClickOnNewChat_opensInNewTab
// @namespace    chatgpt-middle-click
// @version      1.0
// @icon https://chatgpt.com/cdn/assets/favicon-48x48.7d42b2e65f.png
// @description  Middle-click New Chat to open a new tab
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    document.addEventListener('mousedown', (event) => {
        if (event.button !== 1) return;

        const button = event.target.closest('button');

        if (!button) return;

        const label = button.querySelector('.text-fade-truncate');

        if (label?.textContent.trim() !== 'New chat') return;

        event.preventDefault();
        event.stopPropagation();

        window.open('https://chatgpt.com/', '_blank');
    }, true);
})();
