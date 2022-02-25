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

  describe("TaskList Tests", function () {
    test("Add new task", function () {
      const list = new TaskList("test task list");

      list.add("work1", Date.now());
      list.add("work3", Date.now());
      list.add("work2", Date.now());
    });

  });
});
