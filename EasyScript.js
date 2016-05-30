//version 0.0.0


window.EasyScript = function(selector) {

    //selecting the element
    var elems;
    if (typeof selector === 'undefined') {
        elems = [document];
    }
    else if(typeof selector==='object'){
        elems=[selector];
    } else if (typeof selector === 'string') {
        elems = document.querySelectorAll(selector);
    } else {
        window.EasyScript.throwError('Selector must be a string');
        return false;
    }
    
    //closest
    function closest(selector) {
        elem=elems[0];
        var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem && elem.tagName.toLowerCase()!=='html') {
            if (matchesSelector.call(elem, selector)) {
                break;
            }
            elem = elem.parentNode;
        }
        return (elem.tagName.toLowerCase()=='html') ? null : window.EasyScript(elem);
    };
    
    //add event listener
    function on() {
        var arg=arguments;
        if(arg.length<2){
            return false;
        }
        else if(arg.length===2){
            Array.prototype.forEach.call(elems, function (elem, index) {
                elem.addEventListener(arg[0], arg[1]);
            });
        }
        else{
            Array.prototype.forEach.call(elems, function (elem, index) {
                elem.addEventListener(arg[0], function(event) {
                    var target=window.EasyScript(event.target).closest(arg[1]);
                    if(target===null) return false;
                    arg[2].call(document.querySelector(arg[1]),event);
                });
            });
        }
        return this;
    };
    
    //prop
    function prop() {
        var arg=arguments;  
        if(arg.length>1){
            Array.prototype.forEach.call(elems, function (elem, index) {
                elem[arg[0]]=arg[1];
            });
        }
        else if(arg.length===1){
            return elems[0][arg[0]];
        }
        else{
            window.EasyScript.throwError('Syntax error: please specify a property as an argument');
            return undefined;
        }
        return this;
    }

    //return the functions
    return {
        closest:closest,
        jsObject:elems,
        on:on,
        prop:prop
    }
};

//throw error
window.EasyScript.throwError = function(text) {
    console.error(text);
};

//document ready
window.EasyScript.ready = function(callback) {
    document.addEventListener("DOMContentLoaded", function(event) {
        callback();
    });
}

//local storage
window.EasyScript.storage = function() {
    if (arguments.length > 1 && arguments[1] !== '') {
        window.localStorage.setItem(arguments[0], JSON.stringify(arguments[1]));
    } else if (arguments.length > 1 && arguments[1] === '') {
        window.localStorage.removeItem(arguments[0]);
    } else {
        if (window.localStorage.getItem(arguments[0]) !== null) {
            return JSON.parse(window.localStorage.getItem(arguments[0]));
        } else {
            return null;
        }
    }
}

//definition of EasyScript
window.E = E = EasyScript = window.EasyScript;

//-------------------------------------------------------
//test
E.ready(function() {
    console.log(E('button').prop('disabled'));
});