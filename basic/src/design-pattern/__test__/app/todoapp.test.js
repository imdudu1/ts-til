import { TaskItem, TaskState } from "../../src/app/utils";

describe("Todo app Tests", function () {
  describe("TaskState Tests", function () {
    test("태스크의 하위 상태 추가 및 생성", function () {
      TaskState.addState(
        "test",
        class extends TaskState {
          isComplete() {
            return true;
          }
          get order() {
            return 1;
          }
        }
      );

      const testSubState = TaskState.getState("test");

      expect(testSubState.isComplete()).toBeTruthy();
      expect(testSubState.order).toBe(1);
    });

    test("저장된 태스트의 상태 목록", function () {
      TaskState.addState("test1", class extends TaskState {});
      TaskState.addState("test2", class extends TaskState {});

      expect(new TaskState().stateKeys()).toStrictEqual(["test1", "test2"]);
    });

    test("상태의 키값을 얻는다", function () {
      TaskState.addState("test2", class extends TaskState {});

      const instance = TaskState.getState("test2");

      expect(`${instance}`).toBe("test2");
    });
  });

  describe("TestItem Tests", function () {
    test("할 일 생성", function () {
      const now = Date.now();
      const item = new TaskItem("test", now);

      expect(item.title).toBe("test");
      expect(item.date).toEqual(now);
      expect(`${item.state}`).toEqual("waiting");
      expect(item.isComplete()).toBeFalsy();
    });
  });
});
