const List = require('../list.cjs');

function* wrap(array) {
  yield* array;
}

describe('List', () => {
  it('is iterable', () => {
    expect([...new List()]).toEqual([]);
  });

  it('can be constructed with initial values', () => {
    expect([...new List(wrap([1, 2, 3]))]).toEqual([1, 2, 3]);
  });

  it('does not share state with its initial values', () => {
    const a = [1, 2, 3];
    const l = new List(a);
    a.push(4);
    expect([...l]).toEqual([1, 2, 3]);
  });

  it('has a decorate static which allows it to share state with a specified array', () => {
    const a = [1, 2, 3];
    const l = List.decorate(a);
    a.push(4);
    expect([...l]).toEqual([1, 2, 3, 4]);

    const ll = List.decorate(l);
    a.push(5);
    expect([...ll]).toEqual([1, 2, 3, 4, 5]);

    expect(() => List.decorate(0)).toThrowErrorMatchingSnapshot();
  });

  it('has a size property', () => {
    const l = new List([1, 2, 3]);
    expect(l.size).toBe(3);

    l.size = 0;

    expect([...l]).toEqual([]);
  });

  it('has a first property', () => {
    expect(new List([1, 2, 3]).first).toBe(1);
  });

  it('has a last property', () => {
    expect(new List([1, 2, 3]).last).toBe(3);
  });

  it('can clear values', () => {
    const l = new List([1, 2, 3]);
    l.clear();
    expect([...l]).toEqual([]);
  });

  it('can haz values', () => {
    const l = new List(['foo']);
    expect(l.has(0)).toBe(true);
    expect(l.has(1)).toBe(false);
  });

  it('can get values', () => {
    const l = new List(['foo']);
    expect(l.get(0)).toBe('foo');
    expect(l.get(1)).toBe(undefined);
  });

  it('can set values', () => {
    const l = new List();
    l.set(3, 33);
    expect(l.has(3)).toBe(true);
    expect(l.has(2)).toBe(true);
  });

  it('can push values', () => {
    const l = new List(['foo']);
    l.push('bar');
    expect([...l]).toEqual(['foo', 'bar']);
  });

  it('can unshift values', () => {
    const l = new List(['foo']);
    l.unshift('bar');
    expect([...l]).toEqual(['bar', 'foo']);
  });

  it('can pop values', () => {
    const l = new List(['foo', 'bar']);
    l.pop();
    expect([...l]).toEqual(['foo']);
  });

  it('can shift values', () => {
    const l = new List(['foo', 'bar']);
    l.shift();
    expect([...l]).toEqual(['bar']);
  });

  it('has a forEach method', () => {
    const cb = jest.fn();

    const s = new List([1, 2, 3]);

    s.forEach(cb);

    expect(cb.mock.calls).toEqual([
      [1, 0, s],
      [2, 1, s],
      [3, 2, s],
    ]);
  });

  it('forEach may receive a thisArg for cb', () => {
    const thisArg = {};
    const makeCb = (thisArg) =>
      function cb() {
        expect(this).toBe(thisArg);
      };

    new List([null]).forEach(makeCb(thisArg), thisArg);
    new List([null]).forEach(makeCb(window), null);
    new List([null]).forEach(makeCb(window), undefined);

    expect.assertions(3);
  });

  it("flags Lists using Symbol.for('@iter-tools/list')", () => {
    expect(new List()[Symbol.for('@iter-tools/list')]).toBe(true);
  });

  it('can detect Lists with isList', () => {
    expect(List.isList(new List())).toBe(true);
  });

  it('has a keys iterator', () => {
    expect([...new List([]).keys()]).toEqual([]);
    expect([...new List([1, 2, 3]).keys()]).toEqual([0, 1, 2]);
  });

  it('has a values iterator', () => {
    expect([...new List([]).values()]).toEqual([]);
    expect([...new List([1, 2, 3]).values()]).toEqual([1, 2, 3]);
  });

  it('has an entries iterator', () => {
    expect([...new List([]).entries()]).toEqual([]);
    expect([...new List([1, 2, 3]).entries()]).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
  });
});
