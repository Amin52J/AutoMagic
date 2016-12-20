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