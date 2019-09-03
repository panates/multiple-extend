/* multiple-extend
 ------------------------
 (c) 2017-present Panates
 Freely distributed under the MIT license.
 For details and documentation:
 https://panates.github.io/multiple-extend/
 */
'use strict';
const merge = require('putil-merge');

function classes(...clazz) {
  const constructors = [];

  class Class {
    constructor(...args) {
      for (const o of constructors) {
        merge(this, new o.fn(...o.extractArguments(args)), {descriptor: true});
      }
    }
  }

  for (const x of clazz) {
    const clz = Array.isArray(x) ? x[0] : x;
    const props = Object.getOwnPropertyNames(clz.prototype);
    for (const prop of props) {
      if (prop === 'constructor') {
        const o = {
          fn: clz.prototype.constructor,
          extractArguments: (args) => {
            if (!Array.isArray(x))
              return args;
            const a = [];
            for (let i = 1; i < x.length; i++) {
              if (Array.isArray(x[i])) {
                const start = x[i][0];
                if (start != null) {
                  const end = x[i][1] || Number.MAX_SAFE_INTEGER;
                  a.push(...args.slice(start, end + 1));
                }
              } else
                a.push(args[x[i]]);
            }
            return a;
          }
        };

        constructors.push(o);
      }
    }
    merge(Class, clz, {
      descriptor: true,
      filter: (_, n) => {
        return !['constructor', 'prototype', 'name', 'length'].includes(n);
      }
    });
    merge(Class.prototype, clz.prototype, {
      descriptor: true,
      filter: (_, n) => !['constructor', 'prototype', 'name',
        'length'].includes(n)
    });
  }

  return Class;
}

/**
 * Expose `classes`.
 */

module.exports = classes;
