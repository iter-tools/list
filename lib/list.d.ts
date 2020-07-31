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

  constructor(values?: Iterable<T>);

  size: number;

  readonly first: T;
  readonly last: T;

  clear(): void;

  has(index: number): boolean;

  get(index: number): T;

  set(index: number, value: T): void;

  push(value: T): void;

  unshift(value: T): void;

  pop(): T;

  shift(): T;

  forEach(cb: (value: T, index: T, set: Set) => any): void;

  keys(): IterableIterator<T>;

  values(): IterableIterator<T>;

  entries(): IterableIterator<[T, T]>;

  [Symbol.iterator](): IterableIterator<T>;
}

export = List;
