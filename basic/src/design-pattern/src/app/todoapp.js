export const Task = class {
  #title;
  #isComplete;
  #date;

  constructor(title, createdAt) {
    this.#title = title;
    this.#date = createdAt;
    this.#isComplete = false;
  }

  isComplete() {
    return this.#isComplete;
  }

  toggle() {
    this.#isComplete = !this.#isComplete;
  }

  compareByDate(other) {
    return this.#date < other.#date;
  }
};

export const TaskSort = {
  date: (l, r) => l.compareByDate(r),
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

  byDate(state = false) {
    return this.#getList("date", state);
  }

  #getList(sort, state) {
    return [...this.#tasks].sort(TaskSort[sort]);
  }
};
