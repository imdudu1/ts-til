import {
  Chicken,
  KimbapHeaven,
  kimbapMaster,
  Pizza,
  RequestBuilder,
} from "../src/creational";

describe("Creational Test", () => {
  test("Singleton Test", function () {
    const instance1 = new Pizza();
    const instance2 = new Pizza();

    expect(instance1 === instance2).toBeTruthy();
  });

  test("Prototype Test", function () {
    const chicken = new Chicken(36900, "fake menu name");
    const cloneChicken = chicken.clone();

    expect(chicken.price).toBe(cloneChicken.price);
    expect(chicken.menuName).toBe(cloneChicken.menuName);
    expect(chicken === cloneChicken).toBeFalsy();
  });

  test("Factory Test", function () {
    const type = "cheese";
    const cheeseKimbap = KimbapHeaven.cook(type);

    expect(cheeseKimbap.kcal).toBe(100_000_000);
  });

  test("Builder Test", function () {
    const method = "POST";
    const url = "google.com";
    const body = "hungrybird";

    const request = new RequestBuilder()
      .method(method)
      .url(url)
      .body(body)
      .build();

    expect(request.method).toBe(method);
    expect(request.url).toBe(url);
    expect(request.body).toBe(body);
  });

  test.each([
    ["kimchi", 100_000],
    ["normal", 10_000],
  ])("Abstract-factory Test", function (type, expectKcal) {
    const factory = kimbapMaster(type);

    const kimbap = factory();

    expect(kimbap.kcal).toBe(expectKcal);
  });
});
