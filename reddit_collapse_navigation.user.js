// ==UserScript==
// @name         reddit_collapse_navigation
// @version      1.0
// @description  hides the navigation bar on the left
// @match        https://www.reddit.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const scriptName = GM_info.script.name;

    function hideNavBar() {

        if(isNavBarHidden()) {
            return;
        }
        let toggleButton = document.querySelector("#flex-nav-collapse-button");
        if (toggleButton) {
            toggleButton.click();
            console.log(scriptName, ": hide nav bar");
        }
    }

    function isNavBarHidden() {
        return document.querySelector("#flex-left-nav-contents").hidden;
    }

    setTimeout(hideNavBar, 500);

})();
