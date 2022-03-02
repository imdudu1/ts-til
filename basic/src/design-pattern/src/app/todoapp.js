export const Task = class {
  #list;

  constructor() {
    this.#list = [];
  }

  add(taskItem) {
    this.#list.push(taskItem);
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
    const result = [...this.#list].sort(sort);
    return {
      item: this._getResult(sort, state),
      children: result.map((v) => v.getResult(sort, state)),
    };
  }

  _getResult(sort, state) {
    throw new Error("You have must be to declare your '_getResult' method");
  }

  operation(visitor, sort, state) {
    throw new Error("You have must be to declare your 'operation' method");
  }
};

export const TaskItem = class extends Task {
  #title;
  #isComplete;
  #date;
  #subTasks;

  static sortByDate(l, r) {
    return l.compareByDate(r);
  }

  constructor(title, createdAt) {
    super();
    this.#title = title;
    this.#date = createdAt;
    this.#isComplete = false;
    this.#subTasks = [];
  }

  get title() {
    return this.#title;
  }

  get date() {
    return this.#date;
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

  operation(visitor, sort, state) {
    visitor.item(this);
    const sortType = TaskItem.sortByDate;
    this.getResult(sortType, state).children.forEach(({ item }) =>
      item.operation(visitor, sortType, state)
    );
  }
};

export const TaskList = class extends Task {
  #taskGroupName;

  constructor(taskGroupName) {
    super();
    this.#taskGroupName = taskGroupName;
  }

  add(task) {
    super.add(new TaskItem(task, Date.now()));
  }

  remove(task) {
    super.remove(task);
  }

  byDate(state = false) {
    return this.getResult(TaskItem.sortByDate, state);
  }

  _getResult(sort, state) {
    return this.#taskGroupName;
  }

  operation(visitor, sort, state) {
    visitor.item(this);
    const sortType = TaskItem.sortByDate;
    this.getResult(sortType, state).children.forEach(({ item }) =>
      item.operation(visitor, sortType, state)
    );
  }
};

const Visitor = class {
  item(obj) {
    return `[${obj.date}] ${obj.title}`;
  }
};
