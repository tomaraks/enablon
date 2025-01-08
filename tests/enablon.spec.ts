// Import Playwright library
import { test, expect } from "@playwright/test";

test.describe("TodoMVC Automation Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the TodoMVC website
    await page.goto("https://todomvc.com/examples/react/dist/#/active");
  });

  // Positive Test Scenarios

  test("Add a Todo", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    // Verify the todo is added
    const todoItem = page.locator(".todo-list li");
    await expect(todoItem).toHaveText("Buy groceries");
  });

  test("Edit a Todo", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    // Edit the todo
    const todoItem = page.locator(".todo-list li");
    await todoItem.dblclick();
    const editInput = page.locator(".view #todo-input");
    await editInput.fill("Buy milk");
    await editInput.press("Enter");

    // Verify the todo is updated
    await expect(todoItem).toHaveText("Buy milk");
  });

  test("Mark a Todo as Complete", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    // Mark the todo as complete
    const toggleCheckbox = page.locator(".todo-list li .toggle");
    await toggleCheckbox.click();

    // Verify the todo is marked complete
    const completedFilter = page.getByRole("link", { name: "Completed" });
    await completedFilter.click();
    const completedTodo = page.locator(".todo-list li.completed");
    await expect(completedTodo).toHaveText("Buy groceries");
  });

  test("Clear Completed Todos", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo and mark as complete
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");
    const toggleCheckbox = page.locator(".todo-list li .toggle");
    await toggleCheckbox.click();

    // Clear completed todos
    await page.locator(".clear-completed").click();

    // Verify the list is empty
    const todoItems = page.locator(".todo-list li");
    await expect(todoItems).toHaveCount(0);
  });

  // Negative Test Scenarios

  test("Add Empty Todo", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Try to add an empty todo
    await todoInput.press("Enter");

    // Verify no todo is added
    const todoItems = page.locator(".todo-list li");
    await expect(todoItems).toHaveCount(0);
  });

  test("Edit Todo to Empty", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    // Edit the todo to empty
    const todoItem = page.locator(".todo-list li");
    await todoItem.dblclick();
    const editInput = page.locator(".view #todo-input");
    await editInput.fill("");
    await editInput.press("Enter");

    // Verify the todo remains unchanged or is removed
    const todoItems = page.locator(".todo-list li");
    await expect(todoItems).toHaveCount(1);

    // Verify the todo is updated
    await expect(todoItem).toHaveText("Edit Todo Input");
  });

  test.only("Rapidly Toggle Completion Status", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    const completedFilter = page.getByRole("link", { name: "All" });
    await completedFilter.click();

    // Rapidly toggle completion status
    const toggleCheckbox = page.locator(".todo-list li .toggle");
    for (let i = 0; i < 5; i++) {
      await toggleCheckbox.click();
    }

    // Verify the final state is consistent
    const completedTodo = page.locator(".todo-list li.completed");
    await expect(completedTodo).toHaveCount(1);
  });

  test("Clear Todos with None Marked as Completed", async ({ page }) => {
    const todoInput = page.locator(".new-todo");

    // Add a todo
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    // Attempt to clear completed todos
    await page.locator(".clear-completed").click({ force: true });

    // Verify the todo list remains unchanged
    const todoItems = page.locator(".todo-list li");
    await expect(todoItems).toHaveCount(1);
  });
});
