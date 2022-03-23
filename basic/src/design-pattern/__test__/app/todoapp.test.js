import { TaskState } from "../../src/app/utils";

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
  });
});
