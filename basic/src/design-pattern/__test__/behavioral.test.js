import {
  AmountDiscount,
  CristmasDiscountor,
  PercentDiscount,
  Product,
} from "../src/behavioral/chain-of-responsibility";

describe("Behavioral Tests", function () {
  test("Chain of responsibility", function () {
    const amountDiscountor = new AmountDiscount(1000);
    const percentDiscountor = new PercentDiscount(0.1);
    amountDiscountor.setNext(percentDiscountor);

    const event = new CristmasDiscountor(amountDiscountor);
    const samsungTV = new Product(10_000);

    expect(event.calc(samsungTV).price).toBe(900);
  });
});
