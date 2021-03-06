/*global _*/
(function () {
    'use strict';
    /**
     * takes function and calls it for every item in context object, then cleans up falsy entries and returns return
     * @param {Function} fn
     * @returns {Array}
     */
    function mapCompact(fn) {
        //jshint validthis: true
        return lodash.chain(this).map(fn).compact().value();
    }

    /**
     * updates subset based on results of fn execution
     * @param {Function} fn
     * @returns {Array|$.Init}
     */
    function updateOverFn(fn) {
        //jshint validthis: true
        return this._update(mapCompact.call(this, fn));
    }
    /**
     * check if element is even or odd, based on its location in a dom, related to its parent
     * @param {Number} order 0 or 1 - even or odd
     * @returns {Number} either 0 or something else not falsy
     */
    function evenOdd(order) {
        //jshint validthis: true
        return (lodash.indexOf(this.parentNode.children, this) - (order ? 1 : 0)) % 2;
    }

    /**
     * check if element is even or odd, based on its order
     * @param {Number} order 0 or 1 - even or odd
     * @param {Number} i
     * @returns {Number} either 0 or something else not falsy
     */
    function simpleEvenOdd(order, i) {
        return (i - order) % 2;
    }

    /**
     * detects support for next/previousElementSibling and returns next/previous siblings
     * @param {String} direction next or previous
     * @returns {$.Init}
     */
    var nextPrev = (function nextPrev() {
        if (document.body.previousElementSibling) {
            return function (direction) {
                return updateOverFn.call(this, function (el) {
                    return el[direction + 'ElementSibling'];
                });
            };
        }

        return function (direction) {
            return updateOverFn.call(this, function (el) {
                do { //ie
                    el = el[direction + 'Sibling'];
                } while (el && el.nodeType !== 1);
                return el;
            });
        };
    }());
    /**
     * returns function to find all next/previous siblings
     * @param {String} direction next or previous
     * @returns {$.Init}
     */
    function nextPrevAll(direction) {
        //jshint validthis: true
        return this._update(lodash.chain(this).map(function (el) {
            var results = [],
                result;
            while ((result = lodash.$(el)[direction]()) && (el = result[0])) {
                results.push(result);
            }
            return results;
        }).flatten().value());
    }
    var next = lodash.partial(nextPrev, 'next'),
        prev = lodash.partial(nextPrev, 'previous'),
        nextAll = lodash.partial(nextPrevAll, 'next'),
        prevAll = lodash.partial(nextPrevAll, 'prev');

    /**
     * returns function which will be called as method of given object (lodash.$)
     * @param {Function} fn
     * @returns {Function}
     */
    function callAsSelf(fn) {
        return function () {
            return fn.call(this);
        };
    }

    /**
     * get style value for given property of the given name (found on github)
     * @param {HTMLElement} el
     * @param {String} styleProp
     * @returns {String}
     */
    var getStyle = (function () {
        // W3C standard way:
        if (window.getComputedStyle) {
            return function getStyle(el, styleProp) {
                // sanitize property name to css notation (hyphen separated words eg. font-size)
                styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                return getComputedStyle(el, null).getPropertyValue(styleProp);
            };
        } else { // IE
            return function (el, styleProp) {
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                var value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function (value) {
                        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value || 0;
                        value = el.style['pixelLeft'] + 'px';
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                }
                return value;
            };
        }
    }());

    /**
     * convert css string into object
     * @param {String} cssText
     * @returns {Object}
     */
    function rulesToObj(cssText) {
        if (!trim(cssText)) {
            return {};
        }
        return lodash.chain(cssText.split(';'))
            .map(function (rules) {
                rules = rules.split(':');
                return {
                    prop: trim(rules[0]),
                    value: trim(rules[1])
                };
            })
            .indexBy('prop')
            .mapValues('value')
            .value();
    }

    /**
     * convert object into css string
     * @param {Object} obj
     * @returns {String}
     */
    function rulesFromObj(obj) {
        return lodash.chain(obj)
            .pairs()
            .invoke('join', ':')
            .value()
            .join(';');
    }

    /**
     * cross-browser string trim
     * @param {String} str
     * @returns {String}
     */
    function trim(str) {
        return str.replace(/^\s+|\s+$/, '');
    }

    /*--------------------------------------------------------------------------*/

    /**
     * get elements by selector in a given context
     * @static
     * @memberOf lodash.
     * @param {String} selector
     * @param {HTMLElement} [context]
     * @returns {$.Init}
     */
    function $(selector, context) {
        return new $.prototype.Init(selector, context);
    }
    /**
     * get elements by selector in a given context
     * @constructor
     * @param {String|HTMLElement} selector
     * @param {HTMLElement} [context]
     * @memberOf lodash.$.prototype
     */
    function Init(selector, context) {
        this.length = 0;
        if (typeof selector === 'string') {
            context = context || document;
            lodash.each(context.querySelectorAll(selector), lodash.bind(this._push, this));
        } else {
            this._push(selector);
        }
        return this;
    }

    $.prototype = {
        constructor: $,
        /**
         * @param {*} mixed
         * @protected
         */
        _push: function (mixed) {
            if (mixed) {
                [].push.call(this, mixed);
            }
        },
        _clean: function () {
            [].splice.call(this, 0, this.length);
            if ('0' in this) { //ie8
                for (var i in this) {
                    if (this.hasOwnProperty(i)) {
                        delete this[i];
                    }
                }
            }
        },
        _update: function (updates) {
            this._clean();
            lodash.each(updates, lodash.bind(this._push, this));
            return this;
        },
        Init: Init,
        /**
         * find elements within base element by selector
         * @param {String} selector
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        find: function find(selector) {
            return this._update(lodash.chain(this).map(function (element) {
                return lodash.chain(selector).$(element).toArray().value();
            }).flatten().value());
        },
        /**
         * filter elements by selector or function
         * @param {String|Function} selector
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        filter: function filter(selector) {
            return this._update(lodash.filter(this, function (el, i) {
                if (lodash.isString(selector)) {
                    return lodash.$(el).is(selector);
                }
                return lodash.bind(selector, el)(i);
            }));
        },
        /**
         * get siblings for given elements
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        siblings: function siblings() {
            var results = lodash.chain(this).map(function (el) {
                return lodash.reject(el.parentNode.children, function (child) {
                    return child === el;
                });
            }).flatten().uniq().value();
            return this._update(results);
        },
        /**
         * @type {Function}
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        next: callAsSelf(next),
        /**
         * @type {Function}
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        prev: callAsSelf(prev),
        /**
         * @type {Function}
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        nextAll: callAsSelf(nextAll),
        /**
         * @type {Function}
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        prevAll: callAsSelf(prevAll),
        /**
         * set or get text for elements
         * @param {String} str
         * @returns {$.Init|Array} strings or elements
         */
        text: function text(str) {
            var getText = 'textContent' in this[0] ? 'textContent' : 'innerText';
            return updateOverFn.call(this, function (el) {
                if (str) {
                    el[getText] = str;
                    return el;
                } else {
                    return el[getText];
                }
            });
        },
        /**
         * check if element(s) match the selector
         * @param {String} selector
         * @returns {Boolean}
         */
        is: function is(selector) {
            //jshint -W052
            var f = this[0],
                matches = f.matches || f.matchesSelector || f['msMatchesMatchesSelector'] || f['mozMatchesMatchesSelector'] || f['webkitMatchesSelector'] || f['oMatchesSelector'];

            return lodash.every(this, function (el) {
                if (matches) {
                    return matches.call(el, selector);
                } else {
                    //jshint bitwise: false
                    return ~lodash.chain(selector).$(el.parentNode).indexOf(el).value();
                }
            });
        },
        /**
         * get closest parent with given selector
         * @param {String} selector
         * @memberOf lodash.$.prototype
         * @returns {$.Init}
         */
        closest: function closest(selector) {
            return updateOverFn.call(this, function (el) {
                var parent;
                while ((parent = el.parentNode) && !lodash.$(parent).is(selector)) {
                    el = parent;
                }
                return parent;
            });
        },
        /**
         * set or get css value
         * @param {Object|String} rules
         * @this {$.Init}
         * @returns {$.Init|String}
         */
        css: function css(rules) {
            if (lodash.isString(rules)) {
                return getStyle(this[0], rules);
            }
            lodash.each(this, function (el) {
                el.style.cssText = rulesFromObj(
                    lodash.merge(
                        rulesToObj(el.style.cssText.replace(/;$/, '')),
                        rules
                    )
                );
            });

            return this;
        }
    };
    Init.prototype = $.prototype;
    /**
     * helper function to filter even elements from collection based on elements location within its parent node
     * @memberOf lodash.$
     * @static
     * @type {Function}
     */
    $.even = lodash.partial(evenOdd, 0);
    /**
     * helper function to filter odd elements from collection based on elements location within its parent node
     * @memberOf lodash.$
     * @static
     * @type {Function}
     */
    $.odd = lodash.partial(evenOdd, 1);
    /**
     * helper function to filter even elements from collection based on collection's order
     * @memberOf lodash.$
     * @static
     * @type {Function}
     */
    $.simpleEven = lodash.partial(simpleEvenOdd, 0);
    /**
     * helper function to filter odd elements from collection based on collection's order
     * @memberOf lodash.$
     * @static
     * @type {Function}
     */
    $.simpleOdd = lodash.partial(simpleEvenOdd, 1);

    lodash.mixin({
        $: $
    });
})();