var expect = chai.expect;

describe('AutoMagic Selector', function () {
    it('selects an element', function () {
        var element = document.createElement('div');
        expect(am(element).length).to.equal(1);
    });
});

describe('addClass', function () {
    it('Adds a class to the selected elements.', function () {
        var element = document.createElement('div');
        am(element).addClass('test');
        expect(am(element).js[0].classList.contains('test')).to.equal(true);
    });
});

describe('after', function () {
    it('Inserts the given html code right after the selected element.', function () {
        am('div').after('<p></p>');
        expect(am('p').length).to.equal(1);
    });
});

describe('animate', function () {
    it('Animates the selected elements\' given properties.', function () {
        var body=am('body').animate({color:'red'},200,'linear').js[0]
        expect(body).to.equal(am('body').js[0]);
    });
});

describe('append', function () {
    it('Appends the given html to the selected elements.', function () {
        am('body').append('<a class="append"></a>');
        expect(am('a.append').length).to.equal(1);
    });
});

describe('attr', function () {
    it('Gets or sets the value of the given attribute of the selected element/s.', function () {
        am('body').attr('title','test');
        var attr=am('body').attr('title');
        expect(attr).to.equal('test');
    });
});

describe('before', function () {
    it('Inserts the given html code right before the selected element.', function () {
        am('div').before('<p class="before"></p>');
        expect(am('p.before').length).to.equal(1);
    });
});

describe('closest', function () {
    it('Selects the closest ancestor of the selected element matched with the given selector.', function () {
        am('body').append('<div class="closest"><div></div></div>');
        var element=am('.closest div').closest('.closest');
        expect(element.length).to.equal(1);
    });
});

describe('css', function () {
    it('Gets or sets the value of the given properties for the selected elements.', function () {
        am('p').css('color','red');
        var color=am('p').css('color');
        expect(color).to.equal('rgb(0, 0, 0)');
    });
});

describe('data', function () {
    it('Gets or sets the data attribute for the selected element/s.', function () {
        am('body').data('test','test');
        var test=am('body').data('test');
        expect(test).to.equal('test');
    });
});

describe('each', function () {
    it('Iterates over the selected elements.', function () {
        var count=0;
        am('p').each(function () {
            count++;
        });
        expect(count).to.equal(am('p').length);
    });
});

describe('eq', function () {
    it('Selects the given index of the selected elements.', function () {
        var element=am('p').eq(0).js[0];
        expect(element).to.equal(am('p').js[0]);
    });
});

describe('find', function () {
    it('Finds and selects a set of descendants of the selected element matched with the given selector.', function () {
        var element=am('body').find('p').js[0];
        expect(element).to.equal(am('p').js[0]);
    });
});

describe('has', function () {
    it('Checks if the selected element is an ancestor of the given selector.', function () {
        expect(am('body').has('p')).to.equal(true);
    });
});

describe('hasClass', function () {
    it('Checks if the selected element has the given class name.', function () {
        expect(am('.before').hasClass('before')).to.equal(true);
    });
});

describe('height', function () {
    it('Gets or sets the height of the selected element.', function () {
        am('.before').height(100);
        expect(am('.before').height()).to.equal(100);
    });
});

describe('hide', function () {
    it('Hides the selected elements.', function () {
        am('.before').hide();
        expect(am('.before').css('display')).to.equal('none');
    });
});

describe('html', function () {
    it('Gets or sets the inner html of the selected element.', function () {
        am('.before').html('test');
        expect(am('.before').html()).to.equal('test');
    });
});

describe('index', function () {
    it('Gets the index of the selected element.', function () {
        expect(am('.before').index()).to.equal(0);
    });
});

describe('insertAtCaret', function () {
    it('Inserts the given text at the caret position of the selected element (only works on inputs and textareas).', function () {
        am('input').insertAtCaret('test');
        expect(am('input').js[0].value).to.equal('test');
    });
});

describe('is', function () {
    it('Checks if the selected element is :checked, :disabled, :selected, :empty or is the same as the selector or DOM.', function () {
        expect(am('.before').is('.before')).to.equal(true);
    });
});

describe('load', function (done) {
    it('Loads the given file into the selected element and/or calls the callback function after the selected element is loaded.', function () {
        this.timeout=500;
        am(window).load(function () {
            done();
        });
    });
});

describe('next', function () {
    it('Selects the selected element\'s next element matched with the given selector.', function () {
        expect(am('#mocha').next('input').js[0]).to.equal(am('input').js[0]);
    });
});

describe('nextAll', function () {
    it('Selects all the elements matched with the given selector which are placed after the selected element.', function () {
        expect(am('#mocha').nextAll('input').js[0]).to.equal(am('input').js[0]);
    });
});

describe('not', function () {
    it('Excludes the given selector from the selected elements.', function () {
        expect(am('p').not('.before').has('.before')).to.equal(false);
    });
});

describe('off', function () {
    it('Removes the listener for the given event from the selected elements.', function () {
        am('input').on('click',function () {});
        expect(am('input').off('click').js[0]).to.equal(am('input').js[0]);
    });
});

describe('offset', function () {
    it('Gets the top and left offset of the selected element. If relativeToSelector is present the offset will be relative to the selected ancestor, else it would be relative to the body.', function () {
        expect(am('#mocha').offset().top).to.equal(60);
    });
});

describe('on', function () {
    it('Sets a listener for the given event on the selected elements. If targetSelector is present the listener will be attached to the elements matched with targetSelector that are descendants of the selected elements.', function (done) {
        this.timeout=500;
        am('input').on('test',function () {
            done();
        });
        am('input').trigger('test');
    });
});

describe('parent', function () {
    it('Selects the parent element of the selected element.', function () {
        expect(am('#mocha').parent().js[0]).to.equal(am('body').js[0]);
    });
});

describe('prepend', function () {
    it('Prepends the given html code/DOM to the selected elements.', function () {
        am('.before').prepend('<div class="prepend"></div>');
        expect(am('.prepend').length).to.equal(1);
    });
});

describe('prev', function () {
    it('Selects the selected element\'s previous element matched with the given selector.', function () {
        expect(am('#mocha-report').prev().js[0]).to.equal(am('#mocha-stats').js[0]);
    });
});

describe('prevAll', function () {
    it('Selects all the elements matched with the given selector which are placed before the selected element.', function () {
        expect(am('li.suite:last-child').prevAll('.suite').length).to.equal(31);
    });
});

describe('prop', function () {
    it('Gets or sets the value of the given property of the selected element/s.', function () {
        expect(am('#mocha').prop('id')).to.equal('mocha');
    });
});

describe('remove', function () {
    it('Removes the selected elements.', function () {
        am('a.append').remove();
        expect(am('.append').length).to.equal(0);
    });
});

describe('removeClass', function () {
    it('Removes the given class from the selected elements.', function () {
        am('.closest').removeClass('closest');
        expect(am('.closest').length).to.equal(0);
    });
});

describe('replaceClass', function () {
    it('Replaces the given class with the target class on the selected elements.', function () {
        am('.before').replaceClass('before','replaced');
        expect(am('.replaced').length).to.equal(1);
    });
});

describe('scroll', function () {
    it('Scrolls the element to the target point or gets the scrolls positions and lengths. It can animate the scroll if duration is present.', function () {
        am('body').scroll('top',100);
        expect(am('body').scroll('top').position).to.equal(100);
    });
});

describe('show', function () {
    it('Sets the display of the selected element as initial or the given value.', function () {
        am('input').show('block');
        expect(am('input').css('display')).to.equal('block');
    });
});

describe('siblings', function () {
    it('Selects the siblings of the selected element matched with the given selector.', function () {
        expect(am('input').siblings('p').length).to.equal(2);
    });
});

describe('text', function () {
    it('Gets or sets the text of the selected element.', function () {
        am('.prepend').text('test');
        expect(am('.prepend').text()).to.equal('test');
    });
});

describe('toggleClass', function () {
    it('Adds or removes the class depending on the existence of the class name on the selected elements.', function () {
        am('.replaced').toggleClass('before');
        expect(am('.replaced').hasClass('before')).to.equal(true);
    });
});

describe('trigger', function () {
    it('Fires the given event on the selected element.', function (done) {
        this.timeout=500;
        am('#mocha').on('test',function () {
            done();
        });
        am('#mocha').trigger('test');
    });
});

describe('val', function () {
    it('Gets or sets the value of the selected element.', function () {
        am('input').val('test');
        expect(am('input').val()).to.equal('test');
    });
});

describe('width', function () {
    it('Gets or sets the width of the selected element.', function () {
        am('input').width(100);
        expect(am('input').width(true)).to.equal(100);
    });
});

describe('ajax', function () {
    it('Sends an XMLHttpRequest.', function (done) {
        am.ajax({
            url:'../',
            method:'GET',
            success:function () {
                done();
            }
        });
    });
});

describe('cookie', function () {
    it('Gets, sets or removes a cookie. In order to remove the cookie give the data as an empty string and daysToExpire as -1.', function () {
        am.cookie('test','test');
        expect(am.cookie('test')).to.equal('test');
    });
});

describe('each', function () {
    it('Iterates over objects and arrays.', function () {
        var sum=0,
            arr=[1,2,3];
        am.each(arr,function (val) {
            sum+=val;
        });
        expect(sum).to.equal(6);
    });
});

describe('escapeString', function () {
    it('Escapes all the special characters in the given text.', function () {
        expect(am.escapeString('&<>"\'/\\')).to.equal('&amp;&lt;&gt;&quot;&#39;&#x2F;&#x5C;');
    });
});

describe('ready', function () {
    it('Calls the callback when the document is loaded.', function (done) {
        am.ready(function () {
            done();
        });
    });
});

describe('ready', function () {
    it('Calls the callback when the document is loaded.', function (done) {
        am.ready(function () {
            done();
        });
    });
});

describe('replaceAll', function () {
    it('Replaces all the occurrences of the given value in the string with the replacement string.', function () {
        expect(am.replaceAll('test','t','b')).to.equal('besb');
    });
});

describe('state', function () {
    it('Watches an element, pushes and updates its value on location change. Set the selector to body if you want the whole page to change on route change.', function () {
        am.state.watch('#mocha');
        am.state.push();
        expect(window.history.state.content).to.equal(am('#mocha').html());
    });
});

describe('storage', function () {
    it('Gets, sets or removes the given local storage. Use empty string as value to remove.', function () {
        am.storage('test','test');
        expect(am.storage('test')).to.equal('test');
    });
});

describe('trim', function () {
    it('Removes all the spaces in the given string.', function () {
        expect(am.trim(' t e s t ')).to.equal('test');
    });
});

describe('unescapeString', function () {
    it('Unescapes all the special characters in the given text.', function () {
        expect(am.unescapeString('&amp;&lt;&gt;&quot;&#39;&#x2F;&#x5C;')).to.equal('&<>"\'/\\');
    });
});