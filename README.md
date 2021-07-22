# @iter-tools/list

[![Build Status](https://travis-ci.org/iter-tools/list.svg?branch=trunk)](https://travis-ci.org/iter-tools/list)
[![codecov](https://codecov.io/gh/iter-tools/list/branch/trunk/graph/badge.svg)](https://codecov.io/gh/iter-tools/list)

A simple `List` implementation. When the authors of the es6 created `Map` and `Set`, they omitted the logical third type: `List`.

Here it is.

Package includes typescript libdefs. Suitable for node or browser environments. Supports native es imports in `node > 13.2`.

## Usage

```js
const List = require('@iter-tools/list'); // OR
import List from '@iter-tools/list';

const fruits = new List();
fruits.push('pineapple');
fruits.push('orange');
fruits.pop(); // 'orange';

// List.decorate() makes a list out of an array without copying.
// Note that this means that changes to `list` also alter `array`.
const array = [1, 2, 3];
const list = List.decorate(array);
```

Until Typescript supports [package exports](https://github.com/microsoft/TypeScript/issues/33079) you must enable `esModuleInterop` to use this module.

## API

```ts
declare class List<T> {
  /**
   * Returns true if `inst` is a `List`.
   * This does not necessarily imply instanceof, but the check
   * is safe across frame boundaries, as it is done by looking for
   * `inst[Symbol.for('@iter-tools/list')]`
   */
  static isList(inst: any): boolean;

  /**
   * Returns a List which shares its state with `array`.
   */
  static decorate<T>(array: Array<T>): List<T>;

  /**
   * An optional iterable of `values` to be pushed into the queue
   * in sequence. If `null` or `undefined` are passed the queue will
   * have no initial values.
   */
  constructor(values?: Iterable<T> | null);

  /**
   * The number of values in the list
   */
  size: number;

  /**
   * The first value in the list
   */
  readonly first: T;

  /**
   * The first value in the list
   */
  readonly last: T;

  /**
   * Empties the list of all values.
   */
  clear();

  /**
   * Returns the value at `index`.
   */
  get(index: number): boolean;

  /**
   * Returns the value at `index`. If index is negative it is
   * refers to an offset from the end, where `-1` is the last value
   */
  at(index: number): boolean;

  /**
   * Returns `true` if there is a value at `index`.
   */
  has(index: number): boolean;

  /**
   * Appends `value` to the end of the list.
   */
  push(value: T);

  /**
   * Prepends `value` to the start of the list.
   * This is not an efficient operation.
   */
  unshift(value: T);

  /**
   * Removes `value` from the end of the list and returns it.
   */
  pop(): T;

  /**
   * Removes `value` from the start of the list and returns it.
   * This is not an efficient operation.
   */
  shift(): T;

  /**
   * Calls `cb(value, index, list)` for each value in the queue.
   */
  forEach(cb: (value: T, index: T, set: Set) => any);

  /**
   * Yields the indexes of values stored in the list in sequence.
   */
  keys(): IterableIterator<T>;

  /**
   * Yields the values stored in the list in sequence.
   */
  values(): IterableIterator<T>;

  /**
   * Yields an `[index, value]` tuple for each value in the list.
   */
  entries(): IterableIterator<[T, T]>;

  /**
   * The default iterator. Equivalent to `values()`.
   */
  [Symbol.iterator](): IterableIterator<T>;
}
```
