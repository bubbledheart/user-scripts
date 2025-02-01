// ==UserScript==
// @name         youtube_videos_tab_redirect
// @version      1.0
// @description  Redirects automatically to the videos tab if a channel home page is requested
// @match        *.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptName = GM_info.script.name;

    function notEmptyFilter(item){
        return item.length;
    }

    document.addEventListener('yt-navigate-start', function(event){
        redirectIfNeeded(event.detail.url);
        return false;
    });

    function redirectIfNeeded(url){
        const currentPath = window.location.pathname;
        let parts = url.split('/').filter(notEmptyFilter);
        if(!parts || parts.length === 0) {
            return;
        }
        let channelName = parts[0].match(/^@[^/]+/);

        if (channelName && parts.length === 1 || currentPath.endsWith('/featured')) {
            const newUrl = `https://www.youtube.com/${channelName}/videos`;
            window.location.href = newUrl
            window.location.replace(newUrl);
            console.log(scriptName, ": redirected to /videos");
        }
    }

    redirectIfNeeded(location.pathname);
})();
