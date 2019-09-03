/* eslint-disable */
const assert = require('assert');
const classes = require('../');
const Implements = classes.Implements;

describe('multiple-extend', function() {

  it('should inherit all functions', function() {
    class A {
      getA() {
        return 'a';
      }
    }

    class B {
      getB() {
        return 'b';
      }
    }

    class Mixed extends classes(A, B) {
    }

    const mixed = new Mixed();
    assert.strictEqual(typeof mixed.getA, 'function');
    assert.strictEqual(typeof mixed.getB, 'function');
    assert.strictEqual(mixed.getA(), 'a');
    assert.strictEqual(mixed.getB(), 'b');
  });

  it('should call super constructors', function() {
    class A {
      constructor() {
        this.a = 'a';
      }
    }

    class B {
      constructor() {
        this.b = 'b';
      }
    }

    class Mixed extends classes(A, B) {
    }

    const mixed = new Mixed();
    assert.strictEqual(mixed.a, 'a');
    assert.strictEqual(mixed.b, 'b');
  });

  it('should call super constructors with chosen arguments', function() {
    class A {
      constructor(prm1) {
        this.a = prm1;
      }
    }

    class B {
      constructor(prm1) {
        this.b = prm1;
      }
    }

    class Mixed extends classes([A, 0], [B, 1]) {
      constructor(prm1) {
        super('a', 'b');
        this.c = prm1;
      };
    }

    const mixed = new Mixed('c');
    assert.strictEqual(mixed.a, 'a');
    assert.strictEqual(mixed.b, 'b');
    assert.strictEqual(mixed.c, 'c');
  });

  it('should call super constructors with chosen argument ranges', function() {
    class A {
      constructor(prm1, prm2) {
        this.a1 = prm1;
        this.a2 = prm2;
      }
    }

    class B {
      constructor(prm1, prm2) {
        this.b1 = prm1;
        this.b2 = prm2;
      }
    }

    class Mixed extends classes([A, [0, 1]], [B, [2, null]]) {
      constructor(prm1, prm2) {
        super('a', 1, 'b', 2);
        this.c1 = prm1;
        this.c2 = prm2;
      };
    }

    const mixed = new Mixed('c', 3);
    assert.strictEqual(mixed.a1, 'a');
    assert.strictEqual(mixed.a2, 1);
    assert.strictEqual(mixed.b1, 'b');
    assert.strictEqual(mixed.b2, 2);
    assert.strictEqual(mixed.c1, 'c');
    assert.strictEqual(mixed.c2, 3);
  });

  it('should call super constructors with no argument', function() {
    class A {
      constructor(prm1, prm2) {
        this.a1 = prm1;
        this.a2 = prm2;
      }
    }

    class B {
      constructor(prm1, prm2) {
        this.b1 = prm1;
        this.b2 = prm2;
      }
    }

    class Mixed extends classes([A, null], [B, [2, null]]) {
      constructor(prm1, prm2) {
        super('a', 1, 'b', 2);
        this.c1 = prm1;
        this.c2 = prm2;
      };
    }

    const mixed = new Mixed('c', 3);
    assert.strictEqual(mixed.a1, undefined);
    assert.strictEqual(mixed.a2, undefined);
    assert.strictEqual(mixed.b1, 'b');
    assert.strictEqual(mixed.b2, 2);
    assert.strictEqual(mixed.c1, 'c');
    assert.strictEqual(mixed.c2, 3);
  });

  it('should call super constructors with chosen argument ranges', function() {
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
    assert.strictEqual(typeof player.walk, 'function');
    assert.strictEqual(typeof player.jump, 'function');
    assert.strictEqual(typeof player.dive, 'function');
    assert.strictEqual(player.name, 'player1');
    assert.strictEqual(player.canWalk, true);
    assert.strictEqual(player.canJump, true);
    assert.strictEqual(player.canDive, true);
    assert.strictEqual(player.walk(5), 5);
    assert.strictEqual(player.jump(5), 10);
    assert.strictEqual(player.dive(3), 3);
  });

  it('should check if a class is implemented', function() {
    class A {
      getA() {
        return 'a';
      }
    }

    class B {
      getB() {
        return 'b';
      }
    }

    class Mixed extends classes(A, B) {
    }

    const mixed = new Mixed();
    assert(mixed[Implements](A));
    assert(mixed[Implements](B));
    assert(mixed[Implements]('A'));
    assert(mixed[Implements]('B'));
  });

});
