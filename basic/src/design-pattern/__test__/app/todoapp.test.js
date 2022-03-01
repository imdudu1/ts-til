import { TaskItem, TaskList } from "../../src/app/todoapp";

describe("Todo app Tests", function () {
  describe("Task", function () {
    test("Create new task item", function () {
      const task = new TaskItem("test", Date.now());

      expect(task.isComplete()).toBeFalsy();
    });

    test("Toggle task item", function () {
      const task = new TaskItem("test", Date.now());

      task.toggle();

      expect(task.isComplete()).toBeTruthy();
    });

    test("Compare Task item", function () {
      const task1 = new TaskItem("task1", Date.now());
      const task2 = new TaskItem("task1", Date.now() + 2);

      expect(task1.compareByDate(task2)).toBeTruthy();
    });
  });

  describe("TaskList Tests", function () {
    test("Add new task", function () {
      const list = new TaskList("test task list");

      list.add("work1", Date.now());
      list.add("work3", Date.now());
      list.add("work2", Date.now());
    });

    test("Get task", function () {
      const list = new TaskList("test task list");
      list.add("work1", Date.now());

      const task = list.getTask(0);
    });

    test("Get sorted list by date", function () {
      const list = new TaskList("test task list");

      list.add("work3", Date.now());
      list.add("work2", Date.now() + 1);
      list.add("work1", Date.now() + 2);

      const sortedList = list.byDate();
    });
  });
});
