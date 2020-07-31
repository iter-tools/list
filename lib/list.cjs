const inst = Symbol('array inst');
const flag = Symbol.for('@iter-tools/list');

class List {
  constructor(values) {
    this[inst] = values == null ? [] : [...values];
  }

  static decorate(array) {
    if (List.isList(array)) return array;
    if (!Array.isArray(array)) {
      throw new Error('Argument to List.decorate must be an array');
    }

    const list = new List();
    list[inst] = array;
    return list;
  }

  static isList(inst) {
    return inst != null && inst[flag];
  }

  get [flag]() {
    return true;
  }

  get size() {
    return this[inst].length;
  }

  set size(size) {
    this[inst].length = size;
  }

  get first() {
    return this[inst][0];
  }

  get last() {
    const _inst = this[inst];
    return _inst[_inst.length - 1];
  }

  clear() {
    this[inst].length = 0;
  }

  has(index) {
    return index >= 0 && index < this[inst].length;
  }

  get(index) {
    return this[inst][index];
  }

  set(index, value) {
    this[inst][index] = value;
  }

  push(value) {
    this[inst].push(value);
  }

  unshift(value) {
    this[inst].unshift(value);
  }

  pop() {
    return this[inst].pop();
  }

  shift() {
    return this[inst].shift();
  }

  forEach(cb, thisArg) {
    if (thisArg != null) {
      cb = cb.bind(thisArg);
    }
    for (const [key, value] of this.entries()) cb(value, key, this);
  }

  *keys() {
    const _inst = this[inst];
    for (let i = 0; i < _inst.length; i++) {
      yield i;
    }
  }

  values() {
    return this[inst][Symbol.iterator]();
  }

  *entries() {
    const _inst = this[inst];
    for (let i = 0; i < _inst.length; i++) {
      yield [i, _inst[i]];
    }
  }

  [Symbol.iterator]() {
    return this[inst][Symbol.iterator]();
  }
}

module.exports = List;
