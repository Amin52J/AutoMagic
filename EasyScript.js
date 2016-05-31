//version 0.1.0


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

    //add class
    //arguments: className
    //------------string------------
    function addClass() {
        var arg = arguments;
        Array.prototype.forEach.call(elems, function (elem, index) {
            var classArray = arg[0].split(' ');
            classArray.forEach(function (currentClass, index) {
                if (elem.className.indexOf(currentClass) < 0) {
                    elem.className += ' ' + currentClass;
                }
            });
        });
        return this;
    }

    //append
    //arguments: tobeAppended
    //-----------string , DOM--------------------
    function append() {
        var arg = arguments;
        Array.prototype.forEach.call(elems, function (elem, index) {
            if (typeof arg[0] === 'string') {
                elem.innerHTML += arg[0];
            }
            else {
                elem.appendChild(arg[0]);
            }
        });
        return this;
    }
    
    //closest
    //arguments: selector
    //----------- string -------------
    function closest() {
        var arg = arguments;
        elem=elems[0];
        var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem && elem.tagName.toLowerCase()!=='html') {
            if (matchesSelector.call(elem, arg[0])) {
                break;
            }
            elem = elem.parentNode;
        }
        return (elem.tagName.toLowerCase()=='html') ? null : window.EasyScript(elem);
    };
    
    //add event listener
    //arguments: event , targetSelector, callback(event)
    //----------string-------string--------function---------
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

    //prepend
    //arguments: tobePrepended
    //-----------string , DOM--------------------
    function prepend() {
        var arg = arguments;
        Array.prototype.forEach.call(elems, function (elem, index) {
            if (typeof arg[0] === 'string') {
                elem.innerHTML = arg[0] + elem.innerHTML;
            }
            else if (elem.childNodes.length>0) {
                elem.insertBefore(arg[0], elem.firstChild);
            }
            else {
                elem.appendChild(arg[0]);
            }
        });
        return this;
    }

    //prop
    //arguments: property , value
    //------------string-----any------
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

    //remove class
    //arguments: className
    //------------string--------------
    function removeClass() {
        var arg = arguments;
        Array.prototype.forEach.call(elems, function (elem, index) {
            var classArray = arg[0].split(' ');
            classArray.forEach(function (currentClass, index) {
                if (elem.className.indexOf(currentClass) > -1) {
                    elem.className=elem.className.replace(currentClass, '');
                }
            });
        });
        return this;
    }

    //replace class
    //arguments: tobeReplacedClassName, replacementClassName
    //------------------string----------------string-----------------
    function replaceClass() {
        var arg = arguments;
        Array.prototype.forEach.call(elems, function (elem, index) {
            var regex = new RegExp(arg[0],'g');
            elem.className = elem.className.replace(regex,arg[1]);
        });
        return this;
    }

    //return the functions
    return {
        addClass: addClass,
        append:append,
        closest:closest,
        jsObject:elems,
        on: on,
        prepend:prepend,
        prop: prop,
        removeClass: removeClass,
        replaceClass:replaceClass
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
E.ready(function () {
    E('.amin').addClass('amin brave creative creative amin');
    //console.log(E('.amin').closest('.bahar'));
});