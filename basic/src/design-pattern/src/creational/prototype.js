export class Chicken {
  constructor(price, menuName) {
    this.price = price;
    this.menuName = menuName;
  }

  clone() {
    return new Chicken(this.price, this.menuName);
  }
}
