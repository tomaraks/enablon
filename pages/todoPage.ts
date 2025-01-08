import { expect } from "@playwright/test";

export class TodoPage {
  private readonly page;

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("");
  }

  async addTodo(todoText: string) {
    await this.page.locator(".new-todo").fill(todoText);
    await this.page.locator(".new-todo").press("Enter");
  }

  async verifyTodoExists(todoText: string) {
    const todoItem = this.page.locator(".todo-list li", { hasText: todoText });
    await expect(todoItem).toHaveText(todoText);
  }

  async editTodo(oldText: string, newText: string) {
    const todoItem = this.page.locator(".todo-list li", { hasText: oldText });
    await todoItem.dblclick();
    const editInput = this.page.locator(".view #todo-input");
    await editInput.fill(newText);
    await editInput.press("Enter");
  }

  async markTodoAsComplete(todoText: string) {
    const todoItem = this.page.locator(".todo-list li", { hasText: todoText });
    await todoItem.locator(".toggle").click();
  }

  async verifyTodoCompleted(todoText: string) {
    const completedFilter = this.page.getByRole("link", { name: "Completed" });
    await completedFilter.click();
    const completedTodo = this.page.locator(".todo-list li.completed", {
      hasText: todoText,
    });
    await expect(completedTodo).toHaveText(todoText);
  }

  async clearCompletedTodos() {
    await this.page.locator(".clear-completed").click({ force: true });
  }

  async verifyNoTodosExist() {
    const todoItems = this.page.locator(".todo-list li");
    await expect(todoItems).toHaveCount(0);
  }

  async addEmptyTodo() {
    await this.page.locator(".new-todo").press("Enter");
  }

  async editTodoToEmpty(todoText: string) {
    const todoItem = this.page.locator(".todo-list li", { hasText: todoText });
    await todoItem.dblclick();
    const editInput = this.page.locator(".view #todo-input");
    await editInput.fill("");
    await editInput.press("Enter");
  }

  async verifyTodoDoesNotExist(todoText: string) {
    const todoItem = this.page.locator(".todo-list li", { hasText: todoText });
    await expect(todoItem).toHaveCount(0);
  }

  async rapidToggleCompletion(todoText: string, times: number) {
    const completedFilter = this.page.getByRole("link", { name: "All" });
    await completedFilter.click();
    const toggleCheckbox = this.page
      .locator(".todo-list li", { hasText: todoText })
      .locator(".toggle");
    for (let i = 0; i < times; i++) {
      await toggleCheckbox.click();
    }
  }
}
