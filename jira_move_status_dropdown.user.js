// ==UserScript==
// @name         Jira - Move Status Dropdown to Sticky Nav
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Move the status dropdown menu from below the Summary field to the sticky nav bar at the top of the jira issue. 
// @author       @saiori
// @updateURL    https://github.com/saiori/userscripts/blob/master/jira_move_status_dropdown.user.js
// @downloadURL  https://github.com/saiori/userscripts/blob/master/jira_move_status_dropdown.user.js
// @match        https://lulusdev.atlassian.net/browse/*
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

function moveStatusDropdown() {
    const statusSelectorDataId = 'ref-spotlight-target-status-and-approval-spotlight';
    let statusSelector = document.querySelector('[data-testid="' + statusSelectorDataId + '"]');

    const headerSelectorDataId = 'issue-view-sticky-header-container.sticky-header';
    let headerSelector = document.querySelector('[data-testid="' + headerSelectorDataId + '"] nav');


    if (typeof statusSelector === 'null' || typeof headerrSelector === 'null') {
        return;
    }

    headerSelector.appendChild(statusSelector);
}


setDeceleratingTimeout(function() {
    reorderQuickFilterButtons()
}, 8000, .7);
