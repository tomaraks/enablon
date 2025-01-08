# TodoMVC Playwright Automation Tests

This repository contains automated tests for the [TodoMVC React application](https://todomvc.com/examples/react/dist/#/active) using **Playwright** and **TypeScript**. These tests validate the core functionalities of the application, such as adding, editing, completing, and clearing todos, with both positive and negative test scenarios.

## **Project Overview**
The goal of these tests is to ensure the stability and correctness of the TodoMVC application's features by simulating real user interactions. The tests are written in TypeScript for type safety and maintainability, using Playwright's robust testing capabilities.

---

## **What is Being Tested?**

### **Positive Scenarios**
1. **Adding a Todo**
   - Validates that a new todo is added to the list and displayed correctly.

2. **Editing a Todo**
   - Ensures that existing todos can be edited and the changes are reflected properly.

3. **Marking a Todo as Complete**
   - Verifies that a todo can be marked as completed and its appearance updates accordingly.

4. **Clearing Completed Todos**
   - Confirms that completed todos are removed from the list when the "Clear completed" button is clicked.

### **Negative Scenarios**
1. **Adding an Empty Todo**
   - Ensures that submitting an empty todo does not add anything to the list.

2. **Editing a Todo to Empty**
   - Validates that clearing a todo's text either prevents changes or removes the todo.

3. **Rapidly Toggling Completion Status**
   - Tests the application's behavior under rapid toggling of a todo's completion state.

4. **Clearing Todos with None Marked as Completed**
   - Verifies that clicking "Clear completed" with no completed todos does not affect the list.

---

## **Design Patterns and Approach**

### **Page Object Model (POM)**
This adheres to its principles by:
- Using locators for UI elements.
- Keeping the test steps clear and focused on high-level actions.

### **Test Organization**
Tests are grouped by scenarios and follow a structured pattern:
- **Positive Tests**: Focus on ensuring expected functionality works correctly.
- **Negative Tests**: Validate how the application handles edge cases and invalid inputs.

### **Assertions**
Playwright's `expect` library is used for assertions. Each test includes clear and specific assertions to validate the functionality being tested.

---

## **Setup and Running the Tests**

### **Prerequisites**
1. Node.js installed (version 14 or higher).
2. Playwright installed globally or locally in the project.

### **Setup**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### **Running Tests**
Run all tests:
```bash
npx playwright test
```
Run a specific test file:
```bash
npx playwright test todomvc-tests.ts
```
View tests in the Playwright UI:
```bash
npx playwright test --ui
```

---

## **Reporting**
Playwright's built-in test runner generates detailed reports:
1. HTML reports can be enabled by adding the `--reporter html` flag:
   ```bash
   npx playwright test --reporter=html
   ```
   Open the generated `playwright-report/index.html` to view the results.

2. JSON or custom reporters can also be configured in the Playwright configuration file (`playwright.config.ts`).

---

## **Folder Structure**
- `tests/`
  - Contains all the test files.
  - Each test file corresponds to a set of related scenarios.
- `playwright.config.ts`
  - Configuration file for Playwright, specifying settings like timeouts, reporters, url and browser options.

---

## **Key Features**
1. **TypeScript Integration**: Ensures type safety and autocompletion, improving developer productivity.
2. **Reusable Locators**: Locators are defined using Playwright’s robust selector engine.
3. **Cross-Browser Testing**: Easily configurable to run on Chromium, Firefox, and WebKit.
4. **Scalability**: Modular test structure allows for easy addition of new tests.

---

## **Future Improvements**
1. **CI Integration**: Add tests to a CI/CD pipeline (e.g., GitHub Actions or Jenkins).
2. **Enhanced Reporting**: Use advanced reporting tools like Allure for better visualization.

---

For any questions or issues, feel free to contact the maintainer.

