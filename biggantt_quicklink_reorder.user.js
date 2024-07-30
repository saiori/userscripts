// ==UserScript==
// @name         Re-Arrange Quick Filter Links on the Gantt
// @namespace    http://tampermonkey.net/
// @version      2024-02-13
// @description  try to take over the world!
// @author       @saiori
// @updateURL    https://github.com/saiori/userscripts/blob/master/biggantt_quicklink_reorder.user.js
// @downloadURL  https://github.com/saiori/userscripts/blob/master/biggantt_quicklink_reorder.user.js
// @match        https://cloud.softwareplant.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        GM_addStyle
// ==/UserScript==

function setDeceleratingTimeout(callback, milliseconds, factor, maximum)
{
    if (factor == undefined)
    {
        factor = milliseconds;
    }

    if (maximum == undefined)
    {
        maximum = milliseconds * 100
    }

    var internalCallback = function(tick, counter) {
        return function() {
            if (--tick >= 0) {
                // default to linear growth, if a number greater than 1 given
                let interval = ++counter * factor + milliseconds;
                if (factor > 0 && factor <= 1) {
                    interval = milliseconds * Math.pow(2 - factor, ++counter);
                }

                interval = Math.min(interval, maximum || interval);
                // console.log(`Checking... next check in ${interval}ms`);
                window.setTimeout(internalCallback, interval);
                callback();
            }
        }
    }(milliseconds, 0);

    window.setTimeout(internalCallback, factor);
};

function reorderQuickFilterButtons() {

    let style = `
    .sp-quick-filters__favourite-container {
        flex-direction: row;
        color: red;
    }

    .sp-quick-filters__favourite-container .sp-quick-filters__favourite-container-btn,
    .sp-quick-filters__favourite-container .sp-quick-filters__favourite-container-btn button {
        max-width: 30px;
    }

    .sp-quick-filters__favourite-container .sp-quick-filters__favourite-container-btn button {
        overflow: hidden;
        white-space: nowrap;
        margin: 0px;
        padding: 0px;
        justify-content: left;
    }
    `;

    GM_addStyle(style)
    /*

    console.log('attempting to re-order quickfilters');
    console.log('Location: ' + window.location);

    //let $iframe = document.querySelector('iframe');

    let $container = document.querySelector('.sp-quick-filters__favourite-container');

    if ($container === null) {
        console.log('Container not found');
        return;
    }

    if ($container.classList.contains('sorted')) {
        return;
    }

    console.log('not previously sorted');

    [...$container.children]
        .sort(function(a, b) {
            let button1Text = $(a).find(button).text;
            let button2Text = $(b).find(button).text;

            if (button1Text > button2Text) {
                return 1;
            }
            if (button1Text < button2text) {
                return -1;
            }
            return 0;
        })
    .forEach(node => $container.appendChild(node));

    $container.classList.add('sorted');
    */
}

setDeceleratingTimeout(function() {
    reorderQuickFilterButtons()
}, 8000, .7);
