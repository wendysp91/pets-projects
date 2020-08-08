const textarea = document.getElementById('todoText');
const list = document.getElementById('lista-todo');
document.addEventListener('DOMContentLoaded', showLocalStorage);
document.getElementById('submit').addEventListener('click', addTodoDom);
list.addEventListener('click', delTodoDom);

function addTodoDom() {
    const btnborrar = document.createElement('a');
    btnborrar.classList = 'del-todo';
    btnborrar.innerText = 'X';

    let li = document.createElement("li");
    let todoText = textarea.value;
    li.innerText = todoText;
    li.appendChild(btnborrar);
    list.appendChild(li);

    addTodoLocalStorage(todoText);
}

function addTodoLocalStorage(todo) {
    let todos;
    todos = getTodoLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodoLocalStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));

    }
    return todos;
}

function delTodoDom(e) {
    if (e.target.className === 'del-todo') {
        e.target.parentElement.remove();
        delTodoLocalStorage(e.target.parentElement.innerText);
    }
}

function delTodoLocalStorage(todoX) {
    let todo = todoX.substring(0, todoX.length - 1);
    let todos = getTodoLocalStorage();

    todos.forEach((elemento, index) => {
        if (elemento === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showLocalStorage() {
    let todos = getTodoLocalStorage();

    todos.forEach(todo => {
        const btnborrar = document.createElement('a');
        btnborrar.classList = 'del-todo';
        btnborrar.innerText = 'X';

        let li = document.createElement("li");
        li.innerText = todo;
        li.appendChild(btnborrar);
        list.appendChild(li);

    });
}