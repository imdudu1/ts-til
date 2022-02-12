const obj = {
    name: 'Byeongju, Shin',
    age: 28,
    sayHi() {
        console.log(`${this.name} (${this.age}) : Hi!`)
    }
};

const obj2 = {
    name: 'Bitcake0',
    age: 28,
    sayHi() {
        console.log(`${this.name} (${this.age}) : Hi!`)
    }
};

obj.sayHi();
obj2.sayHi();

console.log(obj.sayHi === obj2.sayHi); // false
