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

inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addButton.click();
  }
});

function addTodoItem(text) {
  const li = document.createElement("li");
  // 할 일 텍스트를 표시하는 span 요소
  const span = document.createElement("span");
  span.textContent = text;

  // 체크박스 생성
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    // 체크박스의 상태에 따라 li 태그에 'completed' 클래스를 추가하거나 제거
    if (checkbox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
  });

  /*   // 할 일 항목을 클릭했을 때 완료 상태 토글
  span.addEventListener("click", function () {
    span.classList.toggle("completed");
  }); */

  // 삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    li.remove();
  };

  // 편집 버튼
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    const newText = prompt("Edit your todo", span.textContent);
    if (newText) {
      span.textContent = newText;
    }
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  todoList.appendChild(li);
}
