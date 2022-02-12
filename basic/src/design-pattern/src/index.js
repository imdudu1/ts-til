function Human(name, age) {
    this.name = name;
    this.age = age;
}

Human.prototype.sayHi = function () {
    console.log(`${this.name} (${this.age}) : Hi!`)
}

const obj = new Human('Byeongju, Shin', 28);

const obj2 = new Human('Bitcake0', 28);

obj.sayHi();
obj2.sayHi();

console.log(obj.sayHi === obj2.sayHi); // true
