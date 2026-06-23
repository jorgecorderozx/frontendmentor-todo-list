let tasksContainer = document.querySelector(".tasks-wrapper");
let form = document.querySelector("form");
let taskInput = document.getElementById("new-todo");
let idCounter = 0;

let tasks = [];

function addClass(tag, className){
    tag.classList.add(className);
}

function createTask(taskName){
    let li = document.createElement("li")
    let checkButton = document.createElement("button");
    let task = document.createElement("span");
    task.textContent = taskName;
    saveTask(taskName);
    let crossButton = document.createElement("button");


    addClass(li, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    li.appendChild(checkButton);
    li.appendChild(task)
    li.appendChild(crossButton);
    return li;
}

function saveTask(taskName){
    idCounter++;
    let task = {
        id: idCounter,
        text: taskName,
        completed: false
    }
    tasks.push(task)
}

function renderTask(){
    if(taskInput.value === "") {
        return;
    } 
    else{
        tasksContainer.appendChild(createTask(taskInput.value));
        taskInput.value = "";
    }
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    renderTask();

})