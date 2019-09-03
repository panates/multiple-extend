# multiple-extend

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][devdependencies-image]][devdependencies-url]

## About

This is a helper module for Javascript that allows multiple Classes inheritance. 

## Installation

`$ npm install multiple-extend [--save]`

## Usage

```js
const classes = require('multiple-extend');

class Character {
  constructor(name) {
    this.name = name;
    this.distance = 0;
    this.canWalk = true;
  }

  walk(x) {
    return this.distance += x;
  }
}

class Jumper {
  constructor() {
    this.distance = 0;
    this.canJump = true;
  }

  jump(x) {
    return this.distance += x;
  }
}

class Diver {
  constructor() {
    this.deep = 0;
    this.canDive = true;
  }

  dive(x) {
    return this.deep += x;
  }
}

class SuperCharacter extends classes(Character, Jumper, Diver) {
}

const player = new SuperCharacter('player1');
console.log(player.name); // Prints out "player1"

if (player.canWalk) // will walk 5
  player.walk(5);

if (player.canJump) // will jump 1
  player.jump(1);

if (player.dive(1)) // will dive 1
  player.dive(1);
```

You can also define which arguments will be sent to subclass constructors
````js
class SuperCharacter extends classes([Character, null], [Jumper, 1, 2], [Diver, [3, null]]) {
  constructor(distanceMin, distanceMax, ...args) {
    super(distanceMin, distanceMax, ...args);
    this.name = 'player1';
  }
}
````
In the example above Character constructor will be no argument, 
Jumper constructor will be called with arguments at index 1 and 2 (distanceMin, distanceMax),
Diver constructor will be called with arguments at index from 3 to Last.

## Node Compatibility

  - node `>= 6.0`;
  
### License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/multiple-extend.svg
[npm-url]: https://npmjs.org/package/multiple-extend
[travis-image]: https://img.shields.io/travis/panates/multiple-extend/master.svg
[travis-url]: https://travis-ci.org/panates/multiple-extend
[coveralls-image]: https://img.shields.io/coveralls/panates/multiple-extend/master.svg
[coveralls-url]: https://coveralls.io/r/panates/multiple-extend
[downloads-image]: https://img.shields.io/npm/dm/multiple-extend.svg
[downloads-url]: https://npmjs.org/package/multiple-extend
[gitter-image]: https://badges.gitter.im/panates/multiple-extend.svg
[gitter-url]: https://gitter.im/panates/multiple-extend?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[dependencies-image]: https://david-dm.org/panates/multiple-extend/status.svg
[dependencies-url]:https://david-dm.org/panates/multiple-extend
[devdependencies-image]: https://david-dm.org/panates/multiple-extend/dev-status.svg
[devdependencies-url]:https://david-dm.org/panates/multiple-extend?type=dev
[quality-image]: http://npm.packagequality.com/shield/multiple-extend.png
[quality-url]: http://packagequality.com/#?package=multiple-extend
