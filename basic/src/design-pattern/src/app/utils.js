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
};
