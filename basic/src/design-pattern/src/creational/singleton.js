export class Pizza {
  constructor() {
    if (typeof Pizza.instance === "object") {
      return Pizza.instance;
    }
    const that = Object.freeze(this);
    Pizza.instance = that;
    return that;
  }
}
