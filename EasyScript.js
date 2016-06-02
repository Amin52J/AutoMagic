//version 0.4.0


window.EasyScript = function(selector) {

    //selecting the element
    var elems;
    if (typeof selector === 'undefined') {
        elems = [document];
    }
    else if(typeof selector==='object'){
        if(Object.prototype.toString.call( selector ) === '[object Array]' || Object.prototype.toString.call( selector ) === '[object NodeList]'){
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
    
    //animate a css property
    //arguments: propertiesAndValues , duration , easing
    //---------------object-------------number----string------------
    function animate() {  
        var arg=arguments;
        if(typeof arg[0]!=='object' || arg.length < 1){
            window.EasyScript.throwError('SyntaxError: Please specify css values to animate');
        }
        else{
            var vendors = [
                '-webkit-',
                '-o-',
                '-moz-',
                '-ms-',
                ''
            ];
            function getSupportedProp(proparray){
                var root=document.documentElement;
                for (var i=0; i<proparray.length; i++){
                    if (proparray[i] in root.style){
                        return proparray[i];
                    }
                }
            }
            function toCamelCase(str) {
                return str.replace(/(\-[a-z])/g, function($1) {
                    return $1.toUpperCase().replace('-', '');
                });
            }
            
            if(typeof arg[1] === 'number'){
                var propArray=[];
                vendors.forEach(function(vendor){
                    propArray.push(toCamelCase(vendor+'transition-duration'));
                });
                var transitionDuration=getSupportedProp(propArray);
            }
            if(typeof arg[2] === 'string'){
                var propArray=[];
                vendors.forEach(function(vendor){
                    propArray.push(toCamelCase(vendor+'transition-timing-function'));
                });
                var transitionTimingFunction=getSupportedProp(propArray);
            }
            var propArray=[];
            vendors.forEach(function(vendor){
                propArray.push(toCamelCase(vendor+'transition-property'));
            });
            var transitionProperty=getSupportedProp(propArray);
            
            Array.prototype.forEach.call(elems, function (elem, index) {
                elem.style[transitionProperty]='';
                var count=0;
                for(key in arg[0]){
                    if(key.indexOf('background')>-1){
                        key='background';
                    }
                    if(key.indexOf('border')>-1){
                        key='border';
                    }
                    if(key.indexOf('fill')>-1){
                        key='fill';
                    }
                    if(key.indexOf('flex')>-1){
                        key='flex';
                    }
                    if(key.indexOf('font')>-1){
                        key='font';
                    }
                    if(key.indexOf('margin')>-1){
                        key='margin';
                    }
                    if(key.indexOf('motion')>-1){
                        key='motion';
                    }
                    if(key.indexOf('outline')>-1){
                        key='outline';
                    }
                    if(key.indexOf('padding')>-1){
                        key='padding';
                    }
                    if(key.indexOf('stroke')>-1){
                        key='stroke';
                    }
                    if(key.indexOf('text')>-1){
                        key='text';
                    }
                    
                    if(count !==0){
                        elem.style[transitionProperty]+=','+key;
                    }
                    else{
                        elem.style[transitionProperty]+=key;
                    }
                    count++;
                }
                if(typeof arg[1] === 'number'){
                    elem.style[transitionDuration]=arg[1]+'ms';
                }
                if(typeof arg[2] === 'string'){
                    elem.style[transitionTimingFunction]=arg[2];
                }
            });
            
            var propArray=[],
                properties=[];
            
            Array.prototype.forEach.call(elems, function (elem, index) {
                for(key in arg[0]){
                    propArray=[];
                    vendors.forEach(function(vendor){
                        propArray.push(toCamelCase(vendor+key));
                    });
                    properties.push({
                        prop:getSupportedProp(propArray),
                        value:arg[0][key]
                    });
                }
            });
            
            var that=this;
            Array.prototype.forEach.call(elems, function (elem, index) {
                properties.forEach(function(property){
                    var style = window.getComputedStyle(elem);
                    elem.style[property.prop]=style.getPropertyValue(property.prop);
                    setTimeout(function() {
                        elem.style[property.prop]=property.value;
                    }, 10);
                });
            });
            setTimeout(function() {
                if(typeof arg[2] === 'function'){
                    arg[2].call(that.js);
                }
                else if(typeof arg[3] === 'function'){
                    arg[3].call(that.js);
                }
            }, arg[1]);
        }
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
    
    //get the height of an element
    //arguments: value or includeBorder
    //----------number------boolean---------------
    function height(){
        var arg=arguments;
        if(arg.length===0){
            return elems[0].clientHeight;
        }
        else if(typeof arg[0]==='boolean'){
            return elems[0].offsetHeight;
        }
        else if(typeof arg[0]==='number'){
            Array.prototype.forEach.call(elems, function (elem,index) {
                elem.style.height=arg[0]+'px';
            });
            return this;
        }
    }
    
    //hide element
    //arguments: delay
    //----------integer------------
    function hide() {  
        var arg=arguments;
        if(arg.length===0){
            Array.prototype.forEach.call(elems, function (elem, index) {
                elem.style.display='none';
            });
        }
        else{
            setTimeout(function() {
                Array.prototype.forEach.call(elems, function (elem, index) {
                    elem.style.display='none';
                });
            }, arg[0]);
        }
        return this;
    }
    
    //get or set the the html of the element
    //arguments: html
    //----------string---------------
    function html() {  
        var arg=arguments,
            elem=elems[0];
        if(arg.length===0){
            return elem.innerHTML;
        }
        else{
            elem.innerHTML=arg[0];
            return this;
        }
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
    
    //get the offset of an element
    //arguments: relativeToThis
    //-------------selector--------------
    function offset() {  
        var arg=arguments,
            elem=elems[0];
        if(arg.length===0){
            var x = 0;
            var y = 0;
            while( elem && !isNaN( elem.offsetLeft ) && !isNaN( elem.offsetTop ) ) {
                x += elem.offsetLeft - elem.scrollLeft;
                y += elem.offsetTop - elem.scrollTop;
                elem = elem.offsetParent;
            }
            return { top: y, left: x };
        }
        else{
            var relativeTo=E(arg[0]).js[0];
            if(relativeTo.contains(elem) && relativeTo!==elem){
                return{
                    top:E(elem).offset().top-E(relativeTo).offset().top,
                    left:E(elem).offset().left-E(relativeTo).offset().left
                }
            }
            else{
                window.EasyScript.throwError('Illegal Selector: the "relative" element is not an ancestor of the selected element or they are the same.');
                return undefined;
            }
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
    
    //get or animate the scroll position
    //arguments: direction , value , duration
    //------------string-----number---number-----------
    function scroll(){
        var arg=arguments,
            elem=elems[0];
        if(arg.length===0){
            return{
                x:elem.scrollLeft,
                y:elem.scrollTop
            }
        }
        else if(arg.length===1){
            if(typeof arg[0]==='string'){
                if(arg[0].toLowerCase()==='x' || arg[0].toLowerCase()==='left'){
                    return elem.scrollLeft;
                }
                else if(arg[0].toLowerCase()==='y' || arg[0].toLowerCase()==='top'){
                    return elem.scrollTop;
                }
                else{
                    return undefined;
                }
            }
            else{
                window.EasyScript.throwError('SyntaxError: Invalid argument');
            }
        }
        else if(arg.length===2){
            if(typeof arg[0]!=='string' || typeof arg[1]!=='number'){
                window.EasyScript.throwError('SyntaxError: Invalid argument');
            }
            else{
                if(arg[0].toLowerCase()==='x' || arg[0].toLowerCase()==='left'){
                    elem.scrollLeft=arg[1];
                }
                else if(arg[0].toLowerCase()==='y' || arg[0].toLowerCase()==='top'){
                    elem.scrollTop=arg[1];
                }
                else{
                    return undefined;
                }
            }
        }
        else{
            if(typeof arg[0]!=='string' || typeof arg[1]!=='number' || typeof arg[2]!=='number'){
                window.EasyScript.throwError('SyntaxError: Invalid argument');
            }
            else{
                if(arg[0].toLowerCase()==='x' || arg[0].toLowerCase()==='left'){
                    if (arg[2] <= 0){
                        elem.scrollLeft=arg[1];
                    }
                    else{
                        scrollTo(arg[1],arg[2],'scrollLeft');
                    }
                }
                else if(arg[0].toLowerCase()==='y' || arg[0].toLowerCase()==='top'){
                    if (arg[2] <= 0){
                        elem.scrollTop=arg[1];
                    }
                    else{
                        scrollTo(arg[1],arg[2],'scrollTop');
                    }
                }
                else{
                    return undefined;
                }
            }
        }
        function scrollTo(to, duration,direction) {
            if (duration <= 0) return;
            var difference = to - elem[direction];
            var perTick = difference / duration * 10;

            setTimeout(function() {
                elem[direction] = elem[direction] + perTick;
                if (elem[direction] === to) return;
                scrollTo(to, duration - 10, direction);
            }, 10);
        }
        return this;
    }
    
    //show element
    //arguments: delay , display
    //----------integer--string-----------
    function show() {  
        var arg=arguments;
        switch (typeof arg[0]){
            case 'undefined':
            case 'string':
                Array.prototype.forEach.call(elems, function (elem, index) {
                    elem.style.display=arg[0] || 'initial';
                });
                break;
            case 'number':
                setTimeout(function() {
                    Array.prototype.forEach.call(elems, function (elem, index) {
                        elem.style.display=arg[1] || 'initial';
                    });
                }, arg[0]);
                break;
            default:
                window.EasyScript.throwError('syntaxError: invalid argument');
                return undefined;
        }
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
    
    //get or set the the text of the element
    //arguments: text
    //----------string---------------
    function text() {  
        var arg=arguments,
            elem=elems[0];
        if(arg.length===0){
            return elem.innerText;
        }
        else{
            elem.innerText=arg[0];
            return this;
        }
    }
    
    //to trigger an event on the selected element
    //arguments: eventName
    //------------string-----------------
    function trigger() {  
        var arg=arguments,
            event,
            elem=elems[0];
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(arg[0], true, true);
        } else {
            event = document.createEventObject();
            event.eventType = arg[0];
        }

        event.eventName = arg[0];

        if (document.createEvent) {
            elem.dispatchEvent(event);
        } else {
            elem.fireEvent("on" + event.eventType, event);
        }
        return this;
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
    
    //get the width of an element
    //arguments: value or includeBorder
    //----------number------boolean---------------
    function width(){
        var arg=arguments;
        if(arg.length===0){
            return elems[0].clientWidth;
        }
        else if(typeof arg[0]==='boolean'){
            return elems[0].offsetWidth;
        }
        else if(typeof arg[0]==='number'){
            Array.prototype.forEach.call(elems, function (elem,index) {
                elem.style.width=arg[0]+'px';
            });
            return this;
        }
    }

    //return the functions
    return {
        addClass: addClass,
        animate:animate,
        append: append,
        attr:attr,
        closest:closest,
        each:each,
        height:height,
        hide:hide,
        html:html,
        js:elems,
        length:elems.length || this.length,
        next:next,
        nextAll:nextAll,
        offset:offset,
        on: on,
        parent:parent,
        prepend:prepend,
        prev:prev,
        prevAll:prevAll,
        prop: prop,
        removeClass: removeClass,
        replaceClass:replaceClass,
        scroll:scroll,
        scrollHeight:elems[0].scrollHeight,
        scrollWidth:elems[0].scrollWidth,
        show:show,
        siblings:siblings,
        text:text,
        trigger:trigger,
        val:val,
        width:width
    }
};

//ajax call
//arguments: configuration
//--------------object--------------
window.EasyScript.ajax=function () {
    var arg=arguments,
        config={
            async: arg[0].async || true,
            beforeSend: arg[0].beforeSend || function () {  },
            complete: arg[0].complete || function () {  },
            contentType: arg[0].contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
            data:arg[0].data || '',
            dataType: arg[0].dataType || 'text',
            stringify:arg[0].stringify || false,
            error: arg[0].error || function () {  },
            fail: arg[0].fail || function () {  },
            headers: arg[0].headers || {},
            method: arg[0].method || 'POST',
            success: arg[0].success || function () {  },
            timeout: arg[0].timeout || 0,
            url: arg[0].url || '/'
        };
        
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            var response=xmlhttp.responseText;
            if(config.dataType==='json'){
                response=JSON.parse(xmlhttp.responseText);
            }
            config.complete(response);
           if(xmlhttp.status == 200){
               config.success(response);
           }
           else if(xmlhttp.status == 400) {
               config.error(xmlhttp,xmlhttp.status, xmlhttp.responseText);
           }
           else {
               config.fail(xmlhttp,xmlhttp.status, xmlhttp.responseText);
           }
        }
    };
    
    if(config.stringify && config.method==='POST'){
        var data='';
        for(key in config.data){
            data+=String(key)+'='+JSON.stringify(config.data[key])+'&';
        }
        config.data=data;
    }
    else{
        var data='';
        for(key in config.data){
            data+=String(key)+'='+config.data[key]+'&';
        }
        config.data=data;
    }

    if(config.method==='POST'){
        xmlhttp.open(config.method, config.url, config.async);
    }
    else{
        xmlhttp.open(config.method, config.url+'?'+config.data, config.async);
    }
    xmlhttp.responseType='';
    xmlhttp.timeout=config.timeout;
    xmlhttp.setRequestHeader('Content-Type', config.contentType);
    if(config.headers.length!==undefined){
        config.headers.forEach(function(key,value){
            xmlhttp.setRequestHeader(key, value);
        });
    }
    config.beforeSend();
    if(config.method==='POST'){
        xmlhttp.send(config.data);
    }
    else{
        xmlhttp.send();
    }
}

//iterate over array or object
//arguments: currentInstance , callback(value,index)
//-------------array,object----function----------
window.EasyScript.each=function () {  
    var arg=arguments;
    arg[0].forEach(arg[1]);
};

//escape string
//arguments: string
//-----------string------------
window.EasyScript.escapeString=function () {
    var arg=arguments;
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;',
        "\\":'&#x5C;'
    };
    return String(arg[0]).replace(/[&<>"'\/\\]/g, function (s) {
        return entityMap[s];
    });
};

//unescape string
//arguments: string
//-----------string------------
window.EasyScript.unescapeString=function () {
    var arg=arguments;
    var entityMap = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': "/",
        '&#x5C;':"\\"
    };
    return String(arg[0]).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x5C;/gi, function (s) {
        return entityMap[s];
    });
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

//trim string
//arguments: string
//-----------string-------------
window.EasyScript.trim=function () {  
    var arg=arguments,
        regex = new RegExp(/\s/,'g');
    return arg[0].replace(regex,'');
    
}

//definition of EasyScript
window.E = E = EasyScript = window.EasyScript;

//-------------------------------------------------------
//test
E.ready(function () {
    
});