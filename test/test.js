var expect = chai.expect;

describe('AutoMagic Selector', function () {
    it('selects an element', function () {
        var element = document.createElement('div');
        expect(am(element).length).to.equal(1);
    });
});

describe('addClass', function () {
    it('adds class to an element', function () {
        var element = document.createElement('div');
        am(element).addClass('test');
        expect(am(element).js[0].classList.contains('test')).to.equal(true);
    });
});

describe('after', function () {
    it('adds an element after the selected element', function () {
        am('div').after('<p></p>');
        expect(am('p').length).to.equal(1);
    });
});

describe('animate', function () {
    it('animates a style attribute of the selected element', function () {
        var body=am('body').animate({color:'red'},200,'linear').js[0]
        expect(body).to.equal(am('body').js[0]);
    });
});

describe('append', function () {
    it('appends an element at the end of the selected element', function () {
        am('body').append('<a class="append"></a>');
        expect(am('a.append').length).to.equal(1);
    });
});

describe('attr', function () {
    it('sets and gets an attribute of the selected element', function () {
        am('body').attr('title','test');
        var attr=am('body').attr('title');
        expect(attr).to.equal('test');
    });
});

describe('before', function () {
    it('adds an element before the selected element', function () {
        am('div').before('<p class="before"></p>');
        expect(am('p.before').length).to.equal(1);
    });
});

describe('closest', function () {
    it('selects the closest ancestor of the selected element matched with the selector', function () {
        am('body').append('<div class="closest"><div></div></div>');
        var element=am('.closest div').closest('.closest');
        expect(element.length).to.equal(1);
    });
});

describe('css', function () {
    it('sets and gets a css attribute of the selected element', function () {
        am('p').css('color','red');
        var color=am('p').css('color');
        expect(color).to.equal('rgb(0, 0, 0)');
    });
});

describe('data', function () {
    it('sets and gets a data attribute of the selected element', function () {
        am('body').data('test','test');
        var test=am('body').data('test');
        expect(test).to.equal('test');
    });
});

describe('each', function () {
    it('iterates through the selected set of elements with a callback', function () {
        var count=0;
        am('p').each(function () {
            count++;
        });
        expect(count).to.equal(am('p').length);
    });
});

describe('eq', function () {
    it('selects the given index of the matched set of elements', function () {
        var element=am('p').eq(0).js[0];
        expect(element).to.equal(am('p').js[0]);
    });
});

describe('find', function () {
    it('finds the matched set of elements, descendant to the selected element', function () {
        var element=am('body').find('p').js[0];
        expect(element).to.equal(am('p').js[0]);
    });
});

describe('has', function () {
    it('check if the selected element has the given element (if the selected element is an ancestor of the given element)', function () {
        expect(am('body').has('p')).to.equal(true);
    });
});

describe('hasClass', function () {
    it('check if the selected element has the given class', function () {
        expect(am('.before').hasClass('before')).to.equal(true);
    });
});

describe('height', function () {
    it('sets or gets the height of the selected element', function () {
        am('.before').height(100);
        expect(am('.before').height()).to.equal(100);
    });
});

describe('hide', function () {
    it('hides the selected element', function () {
        am('.before').hide();
        expect(am('.before').css('display')).to.equal('none');
    });
});

describe('html', function () {
    it('sets or gets the inner html of the selected element', function () {
        am('.before').html('test');
        expect(am('.before').html()).to.equal('test');
    });
});

describe('index', function () {
    it('get the index of the selected element relative its parent element', function () {
        expect(am('.before').index()).to.equal(0);
    });
});

describe('insertAtCaret', function () {
    it('inserts a text at the current caret position of the selected input/textarea element', function () {
        am('input').insertAtCaret('test');
        expect(am('input').js[0].value).to.equal('test');
    });
});