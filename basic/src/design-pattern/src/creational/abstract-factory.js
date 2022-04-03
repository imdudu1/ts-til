export const kimbapMaster = function (type) {
  if (type === "kimchi") {
    return KimchiKimbapFactory;
  }
  return NormalKimbapFactory;
};

function NormalKimbapFactory() {
  return new NormalKimbap();
}

class NormalKimbap {
  #kcal;

  constructor() {
    this.#kcal = 10_000;
    return Object.freeze(this);
  }

  get kcal() {
    return this.#kcal;
  }
}

function KimchiKimbapFactory() {
  return new KimchiKimbap();
}

class KimchiKimbap {
  #kcal;

  constructor() {
    this.#kcal = 100_000;
    return Object.freeze(this);
  }

  get kcal() {
    return this.#kcal;
  }
}

