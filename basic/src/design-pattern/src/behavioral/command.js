export class Robot {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  moveRight() {
    this.#x++;
  }

  moveLeft() {
    this.#x--;
  }

  moveUp() {
    this.#y++;
  }

  moveDown() {
    this.#y--;
  }
}

export class MoveRight {
  execute(robot) {
    robot.moveRight();
  }
}

export class MoveLeft {
  execute(robot) {
    robot.moveLeft();
  }
}

export class MoveUp {
  execute(robot) {
    robot.moveUp();
  }
}

export class MoveDown {
  execute(robot) {
    robot.moveDown();
  }
}
