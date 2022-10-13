// ==UserScript==
// @name        Unread Email Links
// @author      Jacob Mack
// @namespace   http://mail.google.com
// @description Add permanent links to unread email messages in GMail
// @match       https://mail.google.com/*
// @version     1.0
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js
// ==/UserScript==

/* eslint-env jquery */

(function() {
    'use strict';

    const unreadlinkClass = 'unread-links';

    const emailLinks = [
        {
            'name': 'Unread Jiras',
            'querystring': '#search/label%3Ajira+is%3Aunread'
        },
        {
            'name': 'All Unread',
            'querystring': '#search/is%3Aunread'
        }];

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

    setDeceleratingTimeout(function() {

        let $homeLink = $('.aBO .aic').first();

        if ($homeLink.length == 0) {
            return;
        }

        let $unreadLinksContainer = $homeLink.parent().find('.' + unreadlinkClass);

        if ($unreadLinksContainer.length > 0) {
            return;
        }

        let $newContainer = $(`<div class="${unreadlinkClass}"></div>`).insertAfter($homeLink);
        let $newList = $('<ul></ul>').appendTo($newContainer);

        for (const link of emailLinks){
            $newList.append(`<li><a href="${link.querystring}">${link.name}</a></li>`);
        }

    }, 500, .7);

})();
