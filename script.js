
let tasks;

if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
}else {
    tasks = [];
}


const inputField = document.getElementById('todo-input');  // <----------
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

const addTask = () => {
    const input = document.getElementById('todo-input');
    const newTask = input.value.trim();
    input.value = '';

    if (newTask === '')
        return;

    const duplicate = tasks.find(task => task.name === newTask);
    if (duplicate) {
        alert('Task already exists!');
        return;
    }
    
    tasks.push({
        name: newTask,
        done: false
    });
    
    refreshTasks();
}

const removeTask = (index) => {
    tasks.splice(index, 1);
    refreshTasks();
}

const toggleDone = (index) => {
    tasks[index].done = !tasks[index].done;
    refreshTasks();
}

const refreshTasks = () => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    localStorage.setItem('tasks', JSON.stringify(tasks));

    tasks.forEach((task, i) => {
        const li = document.createElement('li');
        
        if (task.done) {
            li.style.textDecoration = 'line-through';
        }
        
        li.innerHTML = `${task.name} 
            <button class="done-btn" onclick="toggleDone(${i})">Mark Done</button>
            <button class="remove-btn" onclick="removeTask(${i})">Remove</button>`;
            
        todoList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    refreshTasks();
});