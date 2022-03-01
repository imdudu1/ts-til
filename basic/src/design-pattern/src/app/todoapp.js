export const TaskSort = {
  date: (l, r) => l.compareByDate(r),
};

export const Task = class {
  #list;

  constructor() {
    this.#list = [];
  }

  add(taskItem) {
    this.#list.push(new TaskItem(taskItem, Date.now()));
  }

  remove(targetItem) {
    const l = this.#list;

    if (l.includes(targetItem)) {
      l.splice(l.indexOf(targetItem), 1);
    }
  }

  getTask(index) {
    return this.#list[index];
  }

  getResult(sort, state) {
    const result = [...this.#list].sort(TaskSort[sort]);
    return {
      item: this._getResult(sort, state),
      children: result.map((v) => v._getResult(sort, state)),
    };
  }

  _getResult(sort, state) {
    throw new Error("You have must be to declare your #getResult method");
  }
};

export const TaskItem = class extends Task {
  #title;
  #isComplete;
  #date;
  #subTasks;

  constructor(title, createdAt) {
    super();
    this.#title = title;
    this.#date = createdAt;
    this.#isComplete = false;
    this.#subTasks = [];
  }

  _getResult(sort, state) {
    return this;
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

export const TaskList = class extends Task {
  #taskGroupName;

  constructor(taskGroupName) {
    super();
    this.#taskGroupName = taskGroupName;
  }

  byDate(state = false) {
    return this.getResult("date", state);
  }

  _getResult(sort, state) {
    return this.#taskGroupName;
  }
};
