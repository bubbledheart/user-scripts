// ==UserScript==
// @name         youtube_reload_with_timestamp
// @version      1.1
// @description  adds a button to youtube watch pages that reloads the page with the current timestamp added as a url parameter
// @match        *.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const scriptName = GM_info.script.name;

    function isWatchPage() {
        return window.location.pathname.endsWith('/watch');
    }

    function createClockButton() {
        let button = document.createElement("button");
        button.id = "reload-timestamp-button";
        button.title = "Reload with Timestamp";
        button.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-left: 10px;
            padding: 0;
        `;

        button.appendChild(createSvg());

        button.onclick = function () {
            let video = document.querySelector("video");
            if (!video) return;

            let currentTime = Math.floor(video.currentTime);
            let url = new URL(window.location.href);
            url.searchParams.set("t", currentTime);

            window.location.href = url.href;
        };

        return button;
    }

    function createSvg() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");

        let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M12 7V12L15 14");
        path1.setAttribute("stroke", "gray");
        path1.setAttribute("stroke-width", "2");
        path1.setAttribute("stroke-linecap", "round");
        path1.setAttribute("stroke-linejoin", "round");

        let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute(
            "d",
            "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        );
        path2.setAttribute("stroke", "gray");
        path2.setAttribute("stroke-width", "2");

        svg.appendChild(path1);
        svg.appendChild(path2);

        return svg;
    }

    function addReloadButton() {
        if (!isWatchPage()) {
            console.log(scriptName, ": not on a watch page");
            return;
        }

        if (document.getElementById("reload-timestamp-button")) {
            console.log(scriptName, ": button already exists");
            return;
        }

        let titleContainer = document.querySelector("#title h1");
        if (titleContainer) {
            let button = createClockButton();
            titleContainer.style.display = "flex";
            titleContainer.style.alignItems = "center";
            titleContainer.appendChild(button);
            console.log(scriptName, ": added button next to title");
        } else {
            setTimeout(addReloadButton, 2000);
        }
    }

    const timeout = setTimeout(addReloadButton, 2000);

    window.addEventListener('yt-navigate-finish', () => {
        clearTimeout(timeout);
        addReloadButton();
    });

})();
