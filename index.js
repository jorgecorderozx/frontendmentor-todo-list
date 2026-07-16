let tasksContainer = document.querySelector(".tasks-wrapper");
let form = document.querySelector("form");
let taskInput = document.getElementById("new-todo");
let clearButton = document.querySelector(".clear");
let idCounter = 0;
let allFilterBtn = document.getElementById("all-btn");
let completedFilterBtn = document.getElementById("completed-btn");
let activeFilterBtn = document.getElementById("active-btn");
let filterStatus = "all";

let tasks = [];

function addClass(tag, className){
    tag.classList.add(className);
}

function createTask(taskDescription){
    idCounter++
    let task = {
        id: idCounter,
        description: taskDescription,
        completed: false
    }
    tasks.push(task)
    return task;
}

function completeTask(taskItem){
        const completedTask = tasks.find(task => task.id === Number(taskItem.dataset.id));
        completedTask.completed = !completedTask.completed;
        updateList();
}

function deleteTask(taskItem){
    tasks = tasks.filter(task => task.id !== Number(taskItem.dataset.id));
    updateList();
}


function itemsLeftCounter(){
    const itemsLeft = tasks.filter(task => task.completed !== true);
    itemsLeftUI(itemsLeft);
}

function itemsLeftUI(itemsLeft){
    const itemsLeftElement = document.querySelector(".remaining-items");
    itemsLeft.length === 1 ? itemsLeftElement.textContent = "1 item left" : itemsLeftElement.textContent = `${itemsLeft.length} items left`;
}

function clearAllTasks(){
    tasksContainer.replaceChildren();
}

function callFunctionPerElements(array, functionality){
    array.forEach(arrayElement =>{
        functionality(arrayElement);
    })
}

function filterTask(value){
    filterStatus = value;
}

function updateList(){
    let tasksToRender = []
    if(filterStatus === "all"){
        tasksToRender = tasks;
    }
    else if(filterStatus === "active"){
        const activeTasks = tasks.filter(task => task.completed === false);
        tasksToRender = activeTasks;
    }
    else if(filterStatus === "completed"){
        const completedTasks = tasks.filter(task => task.completed === true);
        tasksToRender = completedTasks;
    }
    clearAllTasks();
    callFunctionPerElements(tasksToRender, renderTask);
    itemsLeftCounter()

}

function renderTask(newTask){
    const taskItem = document.createElement("li");
    const checkButton = document.createElement("button");
    const taskText = document.createElement("span");
    const crossButton = document.createElement("button");

    taskItem.dataset.id = newTask.id;
    taskText.textContent = newTask.description;
    if(newTask.completed === true) {
        taskItem.classList.add("completed")
    }

    addClass(taskItem, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    taskItem.appendChild(checkButton);
    taskItem.appendChild(taskText);
    taskItem.appendChild(crossButton);

    checkButton.addEventListener("click", ()=>{
        completeTask(taskItem);
        updateList();
    })

    crossButton.addEventListener("click", ()=>{
        deleteTask(taskItem);
        updateList();
    })

    tasksContainer.appendChild(taskItem)
    return taskItem;

}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(taskInput.value.trim() === "") return
    else{
        const newTask = createTask(taskInput.value);
        taskInput.value = "";
        updateList();
    }
})

activeFilterBtn.addEventListener("click", ()=>{
    filterTask("active");
    updateList()
})

completedFilterBtn.addEventListener("click",()=>{
    filterTask("completed");
    updateList()
})

allFilterBtn.addEventListener("click",()=>{
    filterTask("all");
    updateList();
})