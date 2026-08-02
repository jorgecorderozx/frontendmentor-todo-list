let body = document.querySelector("body");
let tasksContainer = document.querySelector(".tasks-wrapper");
let form = document.querySelector("form");
let taskInput = document.getElementById("new-todo");
let clearButton = document.querySelector(".clear");
let idCounter = 0;
let categoriesContainer = document.querySelector(".categories-wrapper");
let allFilterBtn = document.getElementById("all-btn");
let completedFilterBtn = document.getElementById("completed-btn");
let activeFilterBtn = document.getElementById("active-btn");
let filterStatus = "all";
let themeButton = document.querySelector(".theme-toggle");
let darkMode = false;
let tasks = [];

function loadApp() {
    loadTasks();
    loadThemePreference();
    setIdCounter();
    updateList();
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function setIdCounter() {
    let greatestId = 0;
    for (const task of tasks) {
        if (task.id > greatestId) {
            greatestId = task.id;
        }
    }
    idCounter = greatestId;
}

function createTask(taskDescription) {
    idCounter++
    let task = {
        id: idCounter,
        description: taskDescription,
        completed: false
    }
    tasks.push(task);
    saveTasks();
    return task;
}

function completeTask(taskItem) {
    const completedTask = tasks.find(task => task.id === Number(taskItem.dataset.id));
    completedTask.completed = !completedTask.completed;
    saveTasks();
}

function deleteTask(taskItem) {
    tasks = tasks.filter(task => task.id !== Number(taskItem.dataset.id));
    saveTasks();
}


function itemsLeftCounter() {
    const itemsLeft = tasks.filter(task => task.completed !== true);
    itemsLeftUI(itemsLeft);
}

function itemsLeftUI(itemsLeft) {
    const itemsLeftElement = document.querySelector(".remaining-items");
    itemsLeft.length === 1 ? itemsLeftElement.textContent = "1 item left" : itemsLeftElement.textContent = `${itemsLeft.length} items left`;
}

function clearAllTasks() {
    tasksContainer.replaceChildren();
}

function changeTheme() {
    darkMode = !darkMode;
    body.classList.toggle("dark-mode");
    saveThemePreference();
}

function saveThemePreference() {
    localStorage.setItem("theme", JSON.stringify(darkMode));
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    if (JSON.parse(savedTheme)) {
        body.classList.add("dark-mode");
        darkMode = true;
    }
}


function clearCompleted() {
    tasks = tasks.filter(task => task.completed !== true);
    saveTasks();
}

function filterTask() {
    if (filterStatus === "all") {
        return tasks;
    }
    if (filterStatus === "active") {
        return tasks.filter(task => task.completed === false);
    }
    else if (filterStatus === "completed") {
        return tasks.filter(task => task.completed === true);
    }
}

function selectedFilterUI(){
    const filterButtons = document.querySelectorAll(".categories-wrapper > button");
    filterButtons.forEach((filter)=>{
        filter.classList.remove("selected");
    });
    const selectedFilterBtn = document.getElementById(`${filterStatus}-btn`);
    selectedFilterBtn.classList.add("selected");

}

function updateList() {

    clearAllTasks();
    filterTask().forEach(renderTask)
    itemsLeftCounter()

}

function renderTask(newTask) {
    const taskItem = document.createElement("li");
    const checkButton = document.createElement("button");
    const taskText = document.createElement("span");
    const crossButton = document.createElement("button");

    taskItem.dataset.id = newTask.id;
    taskText.textContent = newTask.description;
    if (newTask.completed === true) {
        taskItem.classList.add("completed")
    }

    taskItem.classList.add("flex");
    checkButton.classList.add("check");
    crossButton.classList.add("cross");

    taskItem.appendChild(checkButton);
    taskItem.appendChild(taskText);
    taskItem.appendChild(crossButton);

    tasksContainer.appendChild(taskItem)
    return taskItem;

}

themeButton.addEventListener("click", () => {
    changeTheme();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (taskInput.value.trim() === "") return
    else {
        const newTask = createTask(taskInput.value);
        taskInput.value = "";
        updateList();
    }
})

tasksContainer.addEventListener("click", (e) => {
    const taskItem = e.target.closest("li");
    if (e.target.classList.contains("check")) {
        completeTask(taskItem);
        updateList();
    }
    else if (e.target.classList.contains("cross")) {
        deleteTask(taskItem);
        updateList();
    }
}
)

categoriesContainer.addEventListener("click", (e)=>{
    const selectedButton = e.target.closest("button");
    if(selectedButton){
        updateList();
        selectedFilterUI();
    }
})

activeFilterBtn.addEventListener("click", () => {
    filterStatus = "active";
})

completedFilterBtn.addEventListener("click", () => {
    filterStatus = "completed";
})

allFilterBtn.addEventListener("click", () => {
    filterStatus = "all";
})

clearButton.addEventListener("click", () => {
    clearCompleted();
    updateList();
})

loadApp();