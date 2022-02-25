import { Task, TaskList } from "../../src/app/todoapp";

describe("Todo app Tests", function () {
  describe("Task", function () {
    test("Create new task", function () {
      const task = new Task("test", Date.now());

      expect(task.isComplete()).toBeFalsy();
    });

    test("Toggle task", function () {
      const task = new Task("test", Date.now());

      task.toggle();

      expect(task.isComplete()).toBeTruthy();
    });
  });
});
