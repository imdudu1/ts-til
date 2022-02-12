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
}

// Public methods
Human.prototype.sayHi = function () {
    console.log(`${this.name} (${this.age}) : Hi!`)
}

// Static methods
Human.of = function (name, age, address) {
    return new Human(name, age, address);
}

const obj = new Human('Byeongju, Shin', 28, 'Github');

const obj2 = Human.of('Bitcake0', 28, 'Github aid95');

obj.sayHi();
obj2.sayHi();

console.log(obj.sayHi === obj2.sayHi); // true

console.log(obj.profile());
