export class Chicken {
  constructor(price, menuName) {
    this.price = price;
    this.menuName = menuName;
    return Object.freeze(this);
  }

  clone() {
    return new Chicken(this.price, this.menuName);
  }
}
