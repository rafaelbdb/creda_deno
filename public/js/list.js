// Get elements
const taskList = document.querySelector('.task-list ul');
const addTaskForm = document.querySelector('#add-task-form');
const addTaskInput = document.querySelector('#task-input');
const commentList = document.querySelector('.comments ul');
const addCommentForm = document.querySelector('#add-comment-form');
const addCommentInput = document.querySelector('#comment-input');

// Event listeners
addTaskForm.addEventListener('submit', addTask);
addCommentForm.addEventListener('submit', addComment);

// Functions
// Function to add a new task to the list
function addTask(event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();

    if (taskTitle.length === 0) {
        alert('Task title cannot be empty!');
        return;
    }

    const boardId = document.getElementById('boardId').value;
    const listId = document.getElementById('listId').value;

    const formData = new FormData();
    formData.append('title', taskTitle);

    fetch(`/boards/${boardId}/lists/${listId}/tasks`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            const task = data.task;
            const taskElement = createTaskElement(task);
            const tasksContainer = document.getElementById('tasksContainer');
            tasksContainer.appendChild(taskElement);

            taskInput.value = '';
        })
        .catch((error) => {
            console.error('Error adding task:', error);
            alert('Error adding task, please try again.');
        });
}

// Function to create a new task element
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.taskId = task.id;

    const taskTitleElement = document.createElement('h3');
    taskTitleElement.classList.add('task-title');
    taskTitleElement.textContent = task.title;
    taskElement.appendChild(taskTitleElement);

    const taskDescriptionElement = document.createElement('p');
    taskDescriptionElement.classList.add('task-description');
    taskDescriptionElement.textContent = task.description;
    taskElement.appendChild(taskDescriptionElement);

    const taskDueDateElement = document.createElement('p');
    taskDueDateElement.classList.add('task-due-date');
    taskDueDateElement.textContent = new Date(task.due_date).toDateString();
    taskElement.appendChild(taskDueDateElement);

    return taskElement;
}

// Function to load tasks of the list from the API
function loadTasks() {
    const boardId = document.getElementById('boardId').value;
    const listId = document.getElementById('listId').value;

    fetch(`/boards/${boardId}/lists/${listId}/tasks`)
        .then((response) => response.json())
        .then((data) => {
            const tasks = data.tasks;
            const tasksContainer = document.getElementById('tasksContainer');

            tasks.forEach((task) => {
                const taskElement = createTaskElement(task);
                tasksContainer.appendChild(taskElement);
            });
        })
        .catch((error) => {
            console.error('Error loading tasks:', error);
            alert('Error loading tasks, please refresh the page.');
        });
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
