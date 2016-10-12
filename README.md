# [AutoMagic](http://a-jafari.com/Projects/AutoMagic)

AutoMagic is a magically fast, lightweight and customizable Javascript library.

### Why AutoMagic?

Well, basically because its complete package is less than a quarter in size comparing to popular libraries like jQuery, up to 12 times faster and is easily customizable so you don't have to download a huge library in order to use just a few functionalities. Also forget about the css prefixes, 'cause they're automagically handled!

### Does AutoMagic have everything jQuery has?

YES, plus a few more functionalities which is growing everyday!

### Browser support?

AutoMagic supports all modern browsers plus IE9+

### How to start?

You can [download the complete package](http://a-jafari.com/Files/AutoMagic.zip) or customize your own library [here](http://a-jafari.com/Projects/AutoMagic).

## Documentation

### How to use?

For the ease of use for the developers who've already used other libraries, all syntaxes are like jQuery, so you probably already know how to use them, just instead of *$* use *am*.

* **addClass** - Adds a class to the selected elements.
* **after** - Inserts the given html code right after the selected element.
* **animate** - Animates the selected elements' given properties.
* **append** - Appends the given html to the selected elements.
* **attr** - Gets or sets the value of the given attribute of the selected element/s.
* **before** - Inserts the given html code right before the selected element.
* **closest** - Selects the closest ancestor of the selected element matched with the given selector. 
* **css** - Gets or sets the value of the given properties for the selected elements.
* **data** - Gets or sets the data attribute for the selected element/s.
* **each** - Iterates over the selected elements.
* **eq** - Selects the given index of the selected elements.
* **find** - Finds and selects a set of descendants of the selected element matched with the given selector.
* **has** - Checks if the selected element is an ancestor of the given selector.
* **hasClass** - Checks if the selected element has the given class name.
* **height** - Gets or sets the height of the selected element.
* **hide** - Hides the selected elements.
* **html** - Gets or sets the inner html of the selected element.
* **index** - Gets the index of the selected element.
* **insertAtCaret** - Inserts the given text at the caret position of the selected element (only works on inputs and textareas).
* **is** - Checks if the selected element is :checked, :disabled, :selected, :empty or is the same as the selector or DOM.
* **load** - Loads the given file into the selected element and/or calls the callback function after the selected element is loaded.
* **next** - Selects the selected element's next element matched with the given selector.
* **nextAll** - Selects all the elements matched with the given selector which are placed after the selected element.
* **not** - Excludes the given selector from the selected elements.
* **off** - Removes the listener for the given event from the selected elements.
* **offset** - Gets the top and left offset of the selected element. If relativeToSelector is present the offset will be relative to the selected ancestor, else it would be relative to the body.
* **on** - Sets a listener for the given event on the selected elements. If targetSelector is present the listener will be attached to the elements matched with targetSelector that are descendants of the selected elements.
* **parent** - Selects the parent element of the selected element.
* **prepend** - Prepends the given html code/DOM to the selected elements.
* **prev** - Selects the selected element's previous element matched with the given selector.
* **prevAll** - Selects all the elements matched with the given selector which are placed before the selected element.
* **prop** - Gets or sets the value of the given property of the selected element/s.
* **remove** - Removes the selected elements.
* **removeClass** - Removes the given class from the selected elements.
* **replaceClass** - Replaces the given class with the target class on the selected elements.
* **scroll** - Scrolls the element to the target point or gets the scrolls positions and lengths. It can animate the scroll if duration is present.
* **show** - Sets the display of the selected element as initial or the given value.
* **siblings** - Selects the siblings of the selected element matched with the given selector.
* **text** - Gets or sets the text of the selected element.
* **toggleClass** - Add or remove the class depending on the existance of the class name on the selected elements.
* **trigger** - Fires the given event on the selected element.
* **val** - Gets or sets the value of the selected element.
* **width** - Gets or sets the width of the selected element.
* **ajax** - Sends an XMLHttpRequest.
* **cookie** - Gets, sets or removes a cookie. In order to remove the cookie give the data as an empty string and daysToExpire as -1.
* **each** - Iterates over objects and arrays.
* **escapeString** - Escapes all the special charachters in the given text.
* **ready** - Calls the callback when the document is loaded.
* **replaceAll** - Replaces all the occurences of the given value in the string with the replacement string.
* **state** - Watches an element, pushes and updates its value on location change. Set the selector to body if you want the whole page to change on route change.
* **storage** - Gets, sets or removes the given local storage. Use empty string as value to remove.
* **trim** - Removes all the spaces in the given string.
* **unescapeString** - Unescapes all the special charachters in the given text.

**For more details on the functions and how to use them please visit the [AutoMagic Page](http://a-jafari.com/Projects/AutoMagic)**

## License

This project is licensed under the [MIT License](https://raw.githubusercontent.com/Amin52J/AutoMagic/master/LICENSE).