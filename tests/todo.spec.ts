import { test } from "@playwright/test";
import { TodoPage } from "../pages/todoPage";

test.describe("TodoMVC Automation Tests", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.navigate();
  });

  // Positive Test Scenarios

  test("Add a Todo", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.verifyTodoExists("Buy groceries");
  });

  test("Edit a Todo", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.editTodo("Buy groceries", "Buy milk");
    await todoPage.verifyTodoExists("Buy milk");
  });

  test("Mark a Todo as Complete", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.markTodoAsComplete("Buy groceries");
    await todoPage.verifyTodoCompleted("Buy groceries");
  });

  test("Clear Completed Todos", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.markTodoAsComplete("Buy groceries");
    await todoPage.clearCompletedTodos();
    await todoPage.verifyNoTodosExist();
  });

  // Negative Test Scenarios

  test("Add Empty Todo", async () => {
    await todoPage.addEmptyTodo();
    await todoPage.verifyNoTodosExist();
  });

  test("Edit Todo to Empty", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.editTodoToEmpty("Buy groceries");
    await todoPage.verifyTodoDoesNotExist("Buy groceries");
  });

  test("Rapidly Toggle Completion Status", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.rapidToggleCompletion("Buy groceries", 5);
    await todoPage.verifyTodoCompleted("Buy groceries");
  });

  test("Clear Todos with None Marked as Completed", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.clearCompletedTodos();
    await todoPage.verifyTodoExists("Buy groceries");
  });
});