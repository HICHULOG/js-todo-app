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
  // 할 일 항목에 고유한 ID 할당
  li.id = `todo-${Date.now()}`;
  // 항목을 드래그 가능하게 설정
  li.setAttribute("draggable", true);
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

  // 드래그 시작 이벤트 리스너
  li.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  });

  // 드래그 중인 항목이 드롭 가능한 영역 위에 있을 때
  li.addEventListener("dragover", function (e) {
    e.preventDefault(); // 기본 동작을 방지하여 드롭을 허용
  });

  // 항목을 드롭했을 때의 처리
  li.addEventListener("drop", function (e) {
    e.preventDefault(); // 기본 동작 방지
    const id = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);
    const dropZone = e.target;
    if (draggedElement && dropZone && draggedElement !== dropZone) {
      // 드래그된 요소를 새 위치에 삽입
      const temp = document.createElement("div");
      dropZone.before(temp);
      draggedElement.before(dropZone);
      temp.replaceWith(draggedElement);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  todoList.appendChild(li);
}
