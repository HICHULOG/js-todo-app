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
  li.classList.add("draggable");

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

  // 버튼들을 담을 div 생성
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("btnDiv");

  // 삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn");
  deleteButton.onclick = function () {
    li.remove();
  };

  // 편집 버튼
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("btn");
  editButton.onclick = function () {
    const newText = prompt("Edit your todo", span.textContent);
    if (newText) {
      span.textContent = newText;
    }
  };

  // 버튼들을 div에 추가
  buttonsDiv.appendChild(deleteButton);
  buttonsDiv.appendChild(editButton);

  // 드래그 앤 드롭 기능 설정을 위한 함수 호출
  setDraggableEvents(li);

  li.appendChild(checkbox);
  li.appendChild(span);
  // 버튼 그룹(div)을 li에 추가
  li.appendChild(buttonsDiv);
  todoList.appendChild(li);
}

let draggedItem = null; // 전역 변수로 선언

function setDraggableEvents(item) {
  item.addEventListener("dragstart", function () {
    draggedItem = item;
    setTimeout(() => (item.style.display = "none"), 0);
  });

  item.addEventListener("dragend", function () {
    setTimeout(() => {
      draggedItem.style.display = "block";
      draggedItem = null;
    }, 0);
  });

  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  item.addEventListener("dragenter", function (e) {
    e.preventDefault();
    this.style.backgroundColor = "rgba(0,0,0,0.2)";
  });

  item.addEventListener("dragleave", function () {
    this.style.backgroundColor = "transparent";
  });

  item.addEventListener("drop", function () {
    this.style.backgroundColor = "transparent";
    if (this !== draggedItem) {
      let allItems = [...document.querySelectorAll(".draggable")];
      let draggedIndex = allItems.indexOf(draggedItem);
      let targetIndex = allItems.indexOf(this);

      if (draggedIndex < targetIndex) {
        this.parentNode.insertBefore(draggedItem, this.nextSibling);
      } else {
        this.parentNode.insertBefore(draggedItem, this);
      }
    }
  });
}
