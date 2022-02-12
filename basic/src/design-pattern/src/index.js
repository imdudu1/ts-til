function Human(name, age) {
    const _name = name;
    const _age = age;

    this.sayHi = function () {
        console.log(`${_name} (${_age}) : Hi!`)
    }
}

const obj = new Human('Byeongju, Shin', 28);

const obj2 = new Human('Bitcake0', 28);

obj.sayHi();
obj2.sayHi();

console.log(obj.sayHi === obj2.sayHi); // false
