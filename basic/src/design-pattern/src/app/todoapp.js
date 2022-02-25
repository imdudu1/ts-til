export const Task = class {
  #title;
  #isComplete;
  #data;

  constructor(title, createdAt) {
    this.#title = title;
    this.#data = createdAt;
    this.#isComplete = false;
  }

  isComplete() {
    return this.#isComplete;
  }

  toggle() {
    this.#isComplete = !this.#isComplete;
  }
};
