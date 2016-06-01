//version 0.3.0


window.EasyScript = function(selector) {

    //selecting the element
    var elems;
    if (typeof selector === 'undefined') {
        elems = [document];
    }
    else if(typeof selector==='object'){
        if(Object.prototype.toString.call( selector ) === '[object Array]'){
            elems = selector;
        }
        else{
            elems=[selector];
        }
    } else if (typeof selector === 'string') {
        elems = document.querySelectorAll(selector);
    } else {
        window.EasyScript.throwError('Selector must be a string');
        return false;
    }

    //add class to element
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

    //append to element
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

    //get or set attribute
    //arguments: attributeName , value
    //--------------string-------string-----------
    function attr() {
        var arg = arguments;
        if (arg.length > 1) {
            Array.prototype.forEach.call(elems, function (elem, index) {
                elem[arg[0]] = arg[1];
            });
        }
        else {
            var elem = elems[0];
            return elem.attributes[arg[0]].nodeValue;
        }
    }
    
    //get the closest ancestor with the given query
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
    
    //iterate over elements
    //arguments: callback(element,value)
    //-----------------function------------------
    function each() {  
        var arg=arguments;
        Array.prototype.forEach.call(elems, function (elem,index) {
            arg[0].apply(elem,[elem,index]);
        });
    }
    
    //get the next element
    //arguments: selector
    //------------string----------
    function next() {
        var arg=arguments,
            elem=elems[0],
            currentElement=elem.nextElementSibling;
        if(arg.length>0){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            while(!matchesSelector.call(currentElement, arg[0]) && currentElement!==null){
                currentElement=currentElement.nextElementSibling;
            }
        }
        if(currentElement===null){
            window.EasyScript.throwError('element not found');
            return null;
        }
        else{
            return window.EasyScript(currentElement);
        }
    }
    
    //get all the elements after
    //arguments: selector
    //------------string----------
    function nextAll() {
        var arg=arguments,
            elem=elems[0],
            currentElement=elem.nextElementSibling,
            output=[];
        if(arg.length>0){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            while(currentElement!==null){
                if(matchesSelector.call(currentElement, arg[0])){
                    output.push(currentElement);
                }
                currentElement=currentElement.nextElementSibling;
            }
        }
        else{
            while(currentElement!==null){
                output.push(currentElement);
                currentElement=currentElement.nextElementSibling;
            }
        }
        if(output.length < 1){
            window.EasyScript.throwError('element not found');
            return null;
        }
        else{
            return window.EasyScript(output);
        }
    }
    
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
    
    //get the parent of the element
    //arguments: selector
    //------------string---------------
    function parent() {  
        var arg=arguments,
            elem = elems[0];
        if(arg.length>0){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            if(matchesSelector.call(elem,arg[0])){
                return window.EasyScript(elem.parentNode);
            }
            else{
                return false;
            }
        }
        else {
            return window.EasyScript(elem.parentNode);
        }
    }

    //prepend to element
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
    
    //get the previous element
    //arguments: selector
    //------------string----------
    function prev() {
        var arg=arguments,
            elem=elems[0],
            currentElement=elem.previousElementSibling;
        if(arg.length>0){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            while(!matchesSelector.call(currentElement, arg[0]) && currentElement!==null){
                currentElement=currentElement.previousElementSibling;
            }
        }
        if(currentElement===null){
            window.EasyScript.throwError('element not found');
            return null;
        }
        else{
            return window.EasyScript(currentElement);
        }
    }
    
    //get all the elements before
    //arguments: selector
    //------------string----------
    function prevAll() {
        var arg=arguments,
            elem=elems[0],
            currentElement=elem.previousElementSibling,
            output=[];
        if(arg.length>0){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            while(currentElement!==null){
                if(matchesSelector.call(currentElement, arg[0])){
                    output.push(currentElement);
                }
                currentElement=currentElement.previousElementSibling;
            }
        }
        else{
            while(currentElement!==null){
                output.push(currentElement);
                currentElement=currentElement.previousElementSibling;
            }
        }
        if(output.length < 1){
            window.EasyScript.throwError('element not found');
            return null;
        }
        else{
            return window.EasyScript(output);
        }
    }

    //get or set property value
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

    //remove class from the element
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

    //replace class of the element
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
    
    //get the siblings that match the selector
    //arguments: selector
    //------------string--------------
    function siblings() {  
        var arg=arguments,
            elem=elems[0],
            output=[];
        if(arg.length>0){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            elem.parentNode.childNodes.forEach(function (v,i) {  
                if(v!==elem && v.nodeType===1 && matchesSelector.call(v, arg[0])){
                    output.push(v);
                }
            });
        }
        else{
            elem.parentNode.childNodes.forEach(function (v,i) {  
                if(v!==elem && v.nodeType===1){
                    output.push(v);
                }
            });
        }
        return window.EasyScript(output);
    }
    
    //get or set the value of the selected element
    //arguments: value
    //-----------string--------------------
    function val() {
        var arg=arguments,
            elem=elems[0];
        if(arg.length>0){
            elem.value=arg[0];
            return this;
        }
        else{
            return elem.value;
        }
    }

    //return the functions
    return {
        addClass: addClass,
        append: append,
        attr:attr,
        closest:closest,
        each:each,
        jsObject:elems,
        next:next,
        nextAll:nextAll,
        on: on,
        parent:parent,
        prepend:prepend,
        prev:prev,
        prevAll:prevAll,
        prop: prop,
        removeClass: removeClass,
        replaceClass:replaceClass,
        siblings:siblings,
        val:val
    }
};

//iterate over array or object
//arguments: currentInstance , callback(value,index)
//-------------array,object----function----------
window.EasyScript.each=function () {  
    var arg=arguments;
    arg[0].forEach(arg[1]);
};

//document ready
//arguments: callback
//-----------function-------------
window.EasyScript.ready = function() {
    var arg=arguments;
    document.addEventListener("DOMContentLoaded", function(event) {
        arg[0]();
    });
}

//get, set or remove localStorage
//arguments: name , value //empty string to remove
//----------string---any------------
window.EasyScript.storage = function() {
    var arg=arguments;
    if (arg.length > 1 && arg[1] !== '') {
        window.localStorage.setItem(arg[0], JSON.stringify(arg[1]));
    } else if (arg.length > 1 && arg[1] === '') {
        window.localStorage.removeItem(arg[0]);
    } else {
        if (window.localStorage.getItem(arg[0]) !== null) {
            return JSON.parse(window.localStorage.getItem(arg[0]));
        } else {
            return null;
        }
    }
}

//throw error
//arguments: text
//-----------string------------
window.EasyScript.throwError = function() {
    var arg=arguments;
    console.error(arg[0]);
};

//definition of EasyScript
window.E = E = EasyScript = window.EasyScript;

//-------------------------------------------------------
//test
E.ready(function () {
    console.log(E('div'));
});