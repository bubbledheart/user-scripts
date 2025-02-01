// ==UserScript==
// @name         hckr_news_top_10_filter
// @version      1.0
// @description  switches to top 10 entries on hckr news
// @match        https://hckrnews.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hckrnews.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptName = GM_info.script.name;

    function disableAfterLoad() {
        let filterButton = document.querySelector(".filtertop.by10");
        if(filterButton) {
            filterButton.click();
            console.log(scriptName, ": checked top10");
        }
    }

    setTimeout(disableAfterLoad, 500);
})();
