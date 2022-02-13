export class Product {
  constructor(price) {
    this.price = price;
    return Object.seal(this);
  }
}

export class ChristmasDiscounter {
  #discounter;

  constructor(discounter) {
    this.#discounter = discounter;
    return Object.freeze(this);
  }

  calc(product) {
    return this.#discounter.exec(product);
  }
}

class Discount {
  #next;

  constructor() {
    this.#next = null;
    return Object.seal(this);
  }

  setNext(next) {
    this.#next = next;
  }

  hasNext() {
    return this.#next !== null;
  }

  next(product) {
    if (!this.hasNext()) {
      return 0;
    }
    return this.#next.exec(product);
  }

  exec(product) {
    throw new Error("You have to build your own exec method");
  }
}

export class AmountDiscount extends Discount {
  #amount;

  constructor(amount) {
    super();
    this.#amount = amount;
    return Object.freeze(this);
  }

  exec(product) {
    product.price -= this.#amount;
    if (this.hasNext()) {
      this.next(product);
    }
    return product;
  }
}

export class PercentDiscount extends Discount {
  #percent;

  constructor(percent) {
    super();
    this.#percent = percent;
    return Object.freeze(this);
  }

  exec(product) {
    product.price *= this.#percent;
    if (this.hasNext()) {
      this.next(product);
    }
    return product;
  }
}
