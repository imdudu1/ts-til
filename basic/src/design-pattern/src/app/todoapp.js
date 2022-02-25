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

export const TaskList = class {
  #tasks;
  #taskGroupName;

  constructor(taskGroupName) {
    this.#tasks = [];
    this.#taskGroupName = taskGroupName;
  }

  add(task, createdAt) {
    this.#tasks.push(new Task(task, createdAt));
  }

  getTask(index) {
    return this.#tasks[index];
  }
};
