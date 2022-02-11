export class KimbapHeaven {
  static cook(menu) {
    if (menu === "cheese") {
      return new CheeseKimbap();
    }
  }
}

class CheeseKimbap {
  constructor() {
    this.kcal = 100_000_000;
    return Object.freeze(this);
  }
}
