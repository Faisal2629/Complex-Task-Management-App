// Task array to hold all tasks
let tasks = [];

// DOM elements
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskStatus = document.getElementById('taskStatus');
const taskList = document.getElementById('taskList');

// Filter buttons
const filterAllBtn = document.getElementById('filterAll');
const filterPendingBtn = document.getElementById('filterPending');
const filterCompletedBtn = document.getElementById('filterCompleted');

// Add Task Button
const addTaskBtn = document.getElementById('addTask');

// Function to render tasks based on a given array of tasks
function renderTasks(taskArray) {
    taskList.innerHTML = ''; // Clear the task list

    taskArray.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.status === 'completed') taskDiv.classList.add('completed');

        taskDiv.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <div class="actions">
                <button onclick="toggleComplete(${index})">${task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

// Function to add a new task
function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const status = taskStatus.value;

    if (title === '' || description === '') {
        alert('Please fill out both the title and description.');
        return;
    }

    tasks.push({
        title,
        description,
        status,
    });

    taskTitle.value = '';
    taskDescription.value = '';
    taskStatus.value = 'pending';

    renderTasks(tasks);
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks(tasks);
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
    renderTasks(tasks);
}

// Function to edit a task
function editTask(index) {
    const task = tasks[index];
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskStatus.value = task.status;

    // Remove the task temporarily from the list to avoid duplicates
    deleteTask(index);

    // After editing, clicking "Add Task" will add the edited task back to the list
}

// Filter functions
function filterAll() {
    renderTasks(tasks);
}

function filterPending() {
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    renderTasks(pendingTasks);
}

function filterCompleted() {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    renderTasks(completedTasks);
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
filterAllBtn.addEventListener('click', filterAll);
filterPendingBtn.addEventListener('click', filterPending);
filterCompletedBtn.addEventListener('click', filterCompleted);
