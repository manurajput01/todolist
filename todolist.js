// ALL CRUD OPERATIONS

const searchTodo = (element) => {
  const searchTerm = element.value.toLowerCase();
  const todos=getTodohandler();

  const resulatantTodos = todos.filter((item) => {
    return item.text.toLowerCase().includes(searchTerm);
  });

  updateUIHandler(resulatantTodos);
};

const getTodohandler = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  return todos || [];
};

const setTodohandler = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateUIHandler(getTodohandler());
};

const updateUIHandler = (todos) => {
  const ul = document.querySelector("ul");

  //for handling fallback text incase of no todos
  if (todos.length === 0) {
    ul.innerHTML = "<h3 style='text-align:center'>NO TODO AVAILABLE</h3>";
    return;
  }

  //clear the ul
  ul.innerHTML = "";

  for (let todo of todos) {
    //for adding todo inside ul (METHOD 1)
    //   let html = `
    //   <li>
    //     <span>WRITE HTML</span>
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="#000000"
    //       viewBox="0 0 256 256"
    //        onclick="deleteTodohandler(this)"
    //       >
    //       <path
    //         d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
    //       ></path>
    //     </svg>
    //   </li> `;
    //   ul.innerHTML += html;

    //for adding todo inside ul (METHOD 2)
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const deleteIcon = `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        viewBox="0 0 256 256"
        onclick="deleteTodohandler('${todo.id}')"
        >
        <path
          d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
        ></path>
      </svg>`;

    const editIcon = `<svg onclick="enableEditTodoModeHandler(this, '${todo.id}')" xmlns="http://www.w3.org/2000/svg"fill="#000000" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
    </svg>`;

    div.innerHTML += editIcon;
    div.innerHTML += deleteIcon;
    span.innerText = todo.text;
    li.append(span); //Append => for adding in last
    li.append(div);
    ul.prepend(li); //prepend => for adding from start
  }
};

const generaterandomId = () => {
  const randomnumber = Math.floor(Math.random() * 1000);
  let randomId = "TODO" + randomnumber;

  return randomId;
};

const submitTodohandler = (e) => {
  e.preventDefault();
  const todo = e.target.add.value;

  //for handling empty values
  if (!todo) {
    return;
  }

  //Adding data to local storage
  const existingTodos = JSON.parse(localStorage.getItem("todos"));
  const todoList = existingTodos || [];
  todoList.push({ text: todo, id: generaterandomId() });
  setTodohandler(todoList);

  //for resetting the form
  e.target.reset();
};

const deleteTodohandler = (todoId) => {
  const todos = getTodohandler();
  const filteredtodos = todos.filter((item) => item.id !== todoId);
  setTodohandler(filteredtodos);
};

const updateTodohandler = (element, todoId) => {
  const updatedTodo = element.parentElement.previousElementSibling.value;
  const todos = getTodohandler();

  //MAP=> Used to update array
  const updatedTodos = todos.map((item) => {
    if (item.id === todoId) {
      return { ...item, text: updatedTodo };
    }
    return item;
  });
  setTodohandler(updatedTodos);
};

const enableEditTodoModeHandler = (element, todoId) => {
  const li = element.closest("li");
  const spantext = li.children[0].innerText;
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("value", spantext);
  input.classList.add("todo-input");
  li.children[0].remove();
  li.prepend(input);

  const submitIcon = `<svg xmlns="http://www.w3.org/2000/svg" onclick="updateTodohandler(this, '${todoId}')" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>`;

  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" onclick= "updateUIHandler()" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`;

  li.children[1].innerHTML = submitIcon;
  li.children[1].innerHTML += closeIcon;
};

window.onload = () => {
  updateUIHandler(getTodohandler());
};


