let tasksContainer = document.querySelector(".tasks-wrapper");
let form = document.querySelector("form");
let taskInput = document.getElementById("new-todo");
let clearButton = document.querySelector(".clear");
let idCounter = 0;
let allFilterBtn = document.getElementById("all-btn");
let completedFilterBtn = document.getElementById("completed-btn");
let activeFilterBtn = document.getElementById("active-btn");

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
        itemsLeftCounter();
        completeTaskUI(taskItem);
}

function completeTaskUI(taskItem){
    taskItem.classList.toggle("completed");

}

function deleteTask(taskItem){
    tasks = tasks.filter(task => task.id !== Number(taskItem.dataset.id));
    deleteTaskUI(taskItem);
    itemsLeftCounter();

}

function deleteTaskUI(taskItem){
    taskItem.remove();
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

function filterAll(){
    clearAllTasks();
   tasks.forEach(task => {
    const renderedTask = renderTask(task);
    if(task.completed === true){
        renderedTask.classList.add("completed");
    }
   });
}

function filterActive(){
    const activeTasks = tasks.filter(task => task.completed === false);
    clearAllTasks();
    activeTasks.forEach(task => {
        renderTask(task)
    })

}

function filterCompleted(){
    const completedTasks = tasks.filter(task => task.completed === true);
    clearAllTasks()
    completedTasks.forEach(task =>{
        const completedTask = renderTask(task);
        completedTask.classList.add("completed");
    })
}

function renderTask(newTask){
    const taskItem = document.createElement("li");
    const checkButton = document.createElement("button");
    const taskText = document.createElement("span");
    const crossButton = document.createElement("button");

    taskItem.dataset.id = newTask.id;
    taskText.textContent = newTask.description;

    addClass(taskItem, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    taskItem.appendChild(checkButton);
    taskItem.appendChild(taskText);
    taskItem.appendChild(crossButton);

    checkButton.addEventListener("click", ()=>{
        completeTask(taskItem)
    })

    crossButton.addEventListener("click", ()=>{
        deleteTask(taskItem);
    })

    tasksContainer.appendChild(taskItem)
    return taskItem;

}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(taskInput.value.trim() === "") return
    else{
        const newTask = createTask(taskInput.value);
        renderTask(newTask);
        taskInput.value = "";
        itemsLeftCounter()
    }
})

activeFilterBtn.addEventListener("click", ()=>{
    filterActive();
})

completedFilterBtn.addEventListener("click",()=>{
    filterCompleted();
})

allFilterBtn.addEventListener("click",()=>{
    filterAll();
})