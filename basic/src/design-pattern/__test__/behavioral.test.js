import {
  AmountDiscount,
  ChristmasDiscounter,
  PercentDiscount,
  Product,
} from "../src/behavioral/chain-of-responsibility";
import {
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  Robot,
} from "../src/behavioral/command";
import { Ghost, Magician, Warrior } from "../src/behavioral/visitor";

describe("Behavioral Tests", function () {
  test("Chain of responsibility", function () {
    const amountDiscounter = new AmountDiscount(1000);
    const percentDiscounter = new PercentDiscount(0.1);
    amountDiscounter.setNext(percentDiscounter);

    const event = new ChristmasDiscounter(amountDiscounter);
    const samsungTV = new Product(10_000);

    expect(event.calc(samsungTV).price).toBe(900);
  });

  test("Command Tests", function () {
    const robot = new Robot(0, 0);
    const commands = [
      new MoveRight(),
      new MoveLeft(),
      new MoveLeft(),
      new MoveUp(),
      new MoveDown(),
    ];

    commands.map((command) => command.execute(robot));

    expect(robot.x).toBe(-1);
    expect(robot.y).toBe(0);
  });

  test("Visitor Tests", function () {
    const warrior = new Warrior(10);
    const magician = new Magician(15);
    const ghost = new Ghost();

    warrior.attack(ghost);
    magician.attack(ghost);

    expect(warrior.damageDealt).toBe(1);
    expect(magician.damageDealt).toBe(30);
  });
});
