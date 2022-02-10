export class Pizza {
  constructor() {
    if (typeof Pizza.instance === "object") {
      return Pizza.instance;
    }
    Pizza.instance = this;
    return this;
  }
}
