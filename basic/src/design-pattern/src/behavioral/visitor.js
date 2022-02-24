export class Ghost {
  takeDamage(attacker) {
    if (attacker instanceof Warrior) {
      attacker.accDamage(0.1);
    }
    if (attacker instanceof Magician) {
      attacker.accDamage(2);
    }
  }
}

class Job {
  #power;
  #damageDealt;

  constructor(power) {
    this.#power = power;
    this.#damageDealt = 0;
  }

  attack(target) {
    target.takeDamage(this);
  }

  get power() {
    return this.#power;
  }

  accDamage(t) {
    this.#damageDealt += this.#power * t;
  }

  get damageDealt() {
    return this.#damageDealt;
  }
}

export class Warrior extends Job {
  constructor(power) {
    super(power);
  }
}

export class Magician extends Job {
  constructor(power) {
    super(power);
  }
}
