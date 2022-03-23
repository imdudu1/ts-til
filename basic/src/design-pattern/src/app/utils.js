export const TaskState = class {
  static #subClasses;

  static addState(k, cls) {
    const instance = new cls();
    if (!(instance instanceof TaskState)) throw "invalid sub task state";

    if ((this.#subClasses || (this.#subClasses = new Map())).has(k))
      throw "already exist key";

    this.#subClasses.set(k, cls);
  }

  static getState(k) {
    return new (this.#subClasses.get(k))();
  }

  isComplete() {
    throw "you must have your own 'isComplete' method";
  }

  get order() {
    throw "you must have your own 'order' getter";
  }

  stateKeys() {
    return Array.from(TaskState.#subClasses.keys());
  }

  [Symbol.toPrimitive](hint) {
    for (const [k, cls] of TaskState.#subClasses) {
      if (this instanceof cls) return k;
    }
  }
};

TaskState.addState(
  "waiting",
  class extends TaskState {
    isComplete() {
      return false;
    }

    get order() {
      return 1;
    }
  }
);

export const TaskItem = class {
  #title;
  #date;
  #state;

  constructor(title, createdAt) {
    this.#title = title;
    this.#date = createdAt;
    this.#state = TaskState.getState("waiting");
  }

  get title() {
    return this.#title;
  }

  get date() {
    return this.#date;
  }

  get state() {
    return this.#state;
  }

  isComplete() {
    return this.#state.isComplete();
  }
};

export const TaskList = class {
  #title;

  constructor(title) {
    this.#title = title;
    this._title = title;
  }

  get title() {
    return this._title;
  }
};
