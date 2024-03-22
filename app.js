document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-todo-btn");
  const inputField = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  addButton.addEventListener("click", () => {
    const todoText = inputField.value.trim();
    if (todoText) {
      addTodoItem(todoText);
      inputField.value = ""; // Clear input field after adding
    }
  });

  function addTodoItem(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      li.remove();
    };

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      const newText = prompt("Edit your todo", span.textContent);
      if (newText) {
        span.textContent = newText;
      }
    };

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    todoList.appendChild(li);
  }
});
