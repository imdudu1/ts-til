function Human(name, age, address) {
  // Private variables
  const _address = address;

  // Public variables
  this.name = name;
  this.age = age;

  // Public methods
  this.profile = function () {
    // Accessing private member variables
    return `${nameAndAge()}, ${_address}`;
  }

  // Private methods
  const nameAndAge = () => {
    return `${this.name} (${this.age})`;
  }

  this.work = function () {
    throw new Error('you have to build your own \'work\' method');
  }
}

// Public methods
Human.prototype.sayHi = function () {
  console.log(`${this.name} (${this.age}) : Hi!`)
}

// Static methods
Human.of = function (name, age, address) {
  return new Human(name, age, address);
}

function Programmer(name, age, address, lang) {
  Human.apply(this, arguments);
  this.lang = lang;

  let coffeeCount = 0;
  this.drinkCoffee = function () {
    console.log(++coffeeCount);
  }

  this.work = function () {
    console.log(`${this.name} is coding a ${this.lang} program!`)
  }

  return Object.seal(this);
}
Programmer.prototype = Object.create(Human.prototype);
Programmer.prototype.constructor = Programmer;

const programmer = new Programmer('Byeongju, Shin', 28, 'Github', 'javascript');
console.log(programmer.profile());
programmer.drinkCoffee();
programmer.drinkCoffee();
programmer.drinkCoffee();
programmer.work();
