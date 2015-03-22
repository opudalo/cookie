## cookie-es6
  ES6 cookie module

### Installation

    $ bower install --save opudalo/cookie-es6

### Examples

```js

// set
cookie('eat', 'salad')
cookie('drink', 'tea', { path: '/' })

// get
cookie()
// { eat: "salad", drink: "tea" }
cookie('eat')
// "salad"

// remove
cookie('eat', null)

```
