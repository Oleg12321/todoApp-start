// find elements
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(task => renderTask(task));
}

checkEmptyList()

form.addEventListener('submit', addTask)
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)

// function

function addTask(event) {
    //  cancel the shipment form
    event.preventDefault()

    // get the text from input
    const taskText = taskInput.value

    // describe the task
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    // add tasks in array
    tasks.push(newTask)

    // save list tasks in LocalStorage
    saveToLocalStorage()

    renderTask(newTask)

    // clear input
    taskInput.value = ''
    taskInput.focus()

    checkEmptyList()
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return

    const parenNode = event.target.closest('.list-group-item')

    const id = +(parenNode.id)

    // delete tasks from array
    tasks = tasks.filter( task => task.id !== id)

    // save list tasks in LocalStorage
    saveToLocalStorage()

    parenNode.remove()

    checkEmptyList()
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return

    // if click done
    const parenNode = event.target.closest('.list-group-item')

    const id = +(parenNode.id)
    const task =tasks.find(task => task.id === id)
    task.done = !task.done

    // save list tasks in LocalStorage
    saveToLocalStorage()

    const taskTitle = parenNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
    
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
                <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>
        `
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    // formation css class
    const cssClass = task.done ? "task-title task-title--done" : "task-title"

    // markup for a new task
    const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
    `
   
    // add it to the screen
    taskList.insertAdjacentHTML('beforeend', taskHTML)
}