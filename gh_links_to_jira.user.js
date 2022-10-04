// ==UserScript==
// @name        JIRA Links
// @namespace   http://github.com/
// @description Link JIRA issues by patterns. Change variables below to match your issue pattern and JIRA URL
// @include     https://github.com/*
// @version     1.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

localStorage['issue-patterns'] = "(ADM|API|BUS|CI|CLOUD|DA|DW|DB|DEV|DOC|GO|MS|APP|QA|SUP)(\\s|-)\\d+";
localStorage['jira-url'] = "https://lulusdev.atlassian.net/";

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


function replaceInElement(element, find, replace) {
    for (var i= element.childNodes.length; i-->0;) {
        var child= element.childNodes[i];
        if (child.nodeType==1) {
            var tag= child.nodeName.toLowerCase();
            if (tag!='style' && tag!='script')
                replaceInElement(child, find, replace);
        } else if (child.nodeType==3) { // TEXT_NODE
            replaceInText(child, find, replace);
        }
    }
}

function replaceInText(text, find, replace) {
    var match;
    var matches = [];
    while (match = find.exec(text.data))
        matches.push(match);
    for (var i = matches.length; i-->0;) {
        match = matches[i];
        text.splitText(match.index);
        text.nextSibling.splitText(match[0].length);
        text.parentNode.replaceChild(replace(match), text.nextSibling);
    }
}

setDeceleratingTimeout(function() {
    var find = new RegExp('\\b\(' + localStorage['issue-patterns'] + '\)\\b', 'gi');

    replaceInElement(document.body, find, function(match) {
        var link= document.createElement('a');
        link.href= localStorage['jira-url'] + 'browse/' + match[0].replace(/([A-Z]+)(\d+)/,'\$1-\$2').replace(/ /, '-');
        link.target= "_blank";
        link.appendChild(document.createTextNode(match[0]));
        return link;
    });
}, 500, .7);
