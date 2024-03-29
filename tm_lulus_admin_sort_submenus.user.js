// ==UserScript==
// @name         Reorder Admin Menus
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Why weren't they sorted alphabetically in the first place.
// @author       Jacob Mack
// @match        https://*.lulus.com/admin/*
// @match        https://*.lulusstaging.com/admin/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lulus.com
// @updateURL    https://github.com/saiori/userscripts/raw/master/tm_lulus_admin_sort_submenus.user.js
// @downloadURL  https://github.com/saiori/userscripts/raw/master/tm_lulus_admin_sort_submenus.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function sortList(ul) {
        if (typeof ul !== 'object') {
            ul = document.getElementById(ul);
        }

        Array.from(ul.getElementsByTagName("LI"))
            .sort((a, b) => {
            let link_a = a.children[0].innerHTML;
            let link_b = b.children[0].innerHTML;
            return link_a.localeCompare(link_b);
        })
        .forEach(li => ul.appendChild(li));
    }

    var submenus = document.querySelectorAll('.nde-menu-system > li > ul');

    submenus.forEach(ul => sortList(ul));

})();
