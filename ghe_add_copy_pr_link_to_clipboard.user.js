// ==UserScript==
// @name        Github - Add Copy PR Link to Clipboard
// @author      Jacob Mack
// @namespace   http://github.com/
// @description Add "Copy to clipboard" link to the PR title on the Github page
// @include     https://github.com/*
// @include     https://git.osky.io/*
// @include     https://mail.google.com/*
// @version     1.4.1
// @updateURL   https://github.com/saiori/userscripts/raw/master/ghe_add_copy_pr_link_to_clipboard.user.js
// @downloadURL https://github.com/saiori/userscripts/raw/master/ghe_add_copy_pr_link_to_clipboard.user.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


// SVG Built from the icon used on GHE.
var clipboardIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var clipboardIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');

clipboardIconSvg.setAttribute("aria-hidden","true");
clipboardIconSvg.setAttribute('viewbox', '0 0 16 16');
clipboardIconSvg.setAttribute('width', '16px');
clipboardIconSvg.setAttribute('height', '16px');
clipboardIconSvg.setAttribute('version', '1.1');
clipboardIconSvg.style.cursor = 'pointer';
clipboardIconSvg.style.margin = '4px 4px';

clipboardIconPath.setAttribute('d', 'M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z');
clipboardIconPath.setAttribute('fill-rule', 'evenodd');

clipboardIconSvg.appendChild(clipboardIconPath);


var interval = setInterval(function() {
    let prNumber = document.querySelectorAll('.gh-header-number')[0];
    if (typeof prNumber === 'undefined' || prNumber.classList.contains('clipboardAdded')) {
        //console.log('No pr number found.');
        return;
    }

    // The link has already been added.
    if (typeof prNumber.onclick === 'function') {
        //console.log('Link found, no need to do it again.');
        return;
    }

    let clipBoardIcon = document.querySelectorAll('svg.octicon-clippy')[0];
    let prLink = document.querySelectorAll('.tabnav-tabs a:last-child')[0];
    if (typeof prLink === 'undefined') {
        ///console.log('No link found').
        return;
    }

    let linkUrl = new URL(prLink.href);
    let link = linkUrl.origin + linkUrl.pathname;

    prNumber.style.cursor = 'pointer';

    if (typeof navigator.clipboard.writeText !== 'function') {
        console.log('navigator.clipboard.writeText is not available');
        return;
    }

    prNumber.classList.add('clipboardAdded');

    prNumber.parentNode.insertBefore(clipboardIconSvg, prNumber.nextSibling);

    prNumber.onclick = function () {
        navigator.clipboard.writeText(link);
    };

    clipboardIconSvg.onclick = function () {
        navigator.clipboard.writeText(link);
    };
}, 1500);
