/**
 * Worldoweb TODO List V1.0
 * Author:  Tracy Ridge
 * URL: https://www.worldoweb.co.uk/
 * Page URL: https://www.worldoweb.co.uk/2021/yet-another-javascript-todo-list
 */

/**
 * Monitors for keyup event
 * @param   {object}  e  The event object
 */
const keyup = (e) => {
  let keyPressed = e.keyCode || e.which;
  if (keyPressed === 13) {
    addTodo(input.value)
  }
};
document.addEventListener('keyup', keyup)

/**
 * Attaches an event listener to the button
 */
document.getElementById("add-btn").addEventListener("click", () => {
  addTodo(input.value);
});

/**
 * Deletes the todo and saves into local storage
 * @param   {int}  id  the id of the todo
 */
const deleteTodo = (id) => {
  todos.splice(id, 1);
  saveStorage(todos);
};


/**
 * Adds the todo to local storage
 * @param   {string}  todo_text  The text from the input box
 */
const addTodo = (todo_text) => {
  if (todo_text === '') {
    window.alert("Please enter some text")
  } else {
    let arr = [],
      todo = {
        value: todo_text,
        completed: false,
      };

    if (todos === null) {
      arr.push(todo);
    } else {
      arr = Object.values(todos);
      arr.push(todo);
    }
    saveStorage(arr);
  }

};


/**
 * Communicates with the browsers localStorage
 * @param   {array}  todos  list of todos
 */
const saveStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
  location.reload();
};



/**
 * Start of main code
 */

let input = document.getElementById("todoInput");

/**
 * Grab the todo list out of storage 
 */
let todos =
  localStorage.getItem("todos") !== null ?
  JSON.parse(localStorage.getItem("todos")) :
  null;

/**
 * Display the todos
 */
if (todos !== null) {
  for (let i = 0; i < todos.length; i++) {
    const del_icon =
      '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';

    let list = document.getElementById("list"),
      li = document.createElement("li"),
      classes = ["todo-item", "level"];
    li.classList.add(...classes);
    li.id = i;
    let comp = document.getElementsByClassName("item-value");
    li.innerHTML =
      '<div class="level-left"><div class="level-item item-value">' +
      todos[i].value +
      '</div></div><div class="level-right"><div class="level-item"><span class="icon del">' +
      del_icon +
      "</span></div></div>";
    list.appendChild(li);
    todos[i].completed === true ? comp[i].classList.toggle("completed") : comp[i].classList.toggle("completed", false);
  }
}

/**
 * Attaches an event listener to the individual todo items
 */
let todoElements = document.getElementsByClassName("todo-item");

for (let i = 0; i < todoElements.length; i++) {
  todoElements[i].addEventListener("click", (e) => {
    let id = todoElements[i].id,
      level_right = todoElements[i].children[1].childNodes[0].firstChild,
      level_left = todoElements[i].children[0];

    if (e.target === level_right.lastChild) {
      deleteTodo(id);
    } else if (e.target === level_left.firstChild) {
      todos[id].completed === true ? todos[id].completed = false : todos[id].completed = true
      saveStorage(todos);
    }
  });
}