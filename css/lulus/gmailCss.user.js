// ==UserScript==
// @name         GMail Styling
// @namespace    http://tampermonkey.net/
// @version      2024-07-16
// @description  try to take over the world!
// @author       You
// @updateURL    https://github.com/nheath/userscripts/raw/master/css/lulus/gmailCss.user.js
// @downloadURL  https://github.com/nheath/userscripts/raw/master/css/lulus/gmailCss.user.js
// @match        https://mail.google.com/mail/u/0/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    let styles = `
.bsU {
    background-color: rgba(20,80,80,.75);
    border-radius: 7px;
    padding-right: 5px;
    padding-left: 5px;
    border: 2px #000 solid;
    color: #fff;
}

.wT {
    background-color: rgba(82, 105, 145, 0.8);
    border-radius: 0 13px 13px 0;
}

#gmailQuickLinksContainer {
    background-color: rgba(142, 165, 145, 0.8);
    border-radius: 0 13px 13px 0;
    margin-bottom: 10px;
    margin-right: 10px;
    max-width: 240px;
}

.TK .TO, .n6 .ah9, .CL {
    border-radius: 0;
}

.aim:nth-child(1) .TK .TO:nth-child(1) {
    border-radius: 0 13px 0 0;
}

.TO .nU>.n0, .TO.NQ .nU>.n0, .TO.nZ .nU>.n0, .ah9>.CJ, .n3>.CL>.CK {
    color: black;
    text-shadow: none;
}

`;

    GM_addStyle(styles);


})();
