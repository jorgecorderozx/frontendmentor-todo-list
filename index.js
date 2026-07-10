let tasksContainer = document.querySelector(".tasks-wrapper");
let form = document.querySelector("form");
let taskInput = document.getElementById("new-todo");
let idCounter = 0;

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
}



form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(taskInput.value.trim() === "") return
    else{
        createTask(taskInput.value);
    }
})

function renderTask(taskDescription){
    const taskItem = document.createElement("li");
    const checkButton = document.createElement("button");
    const taskText = document.createElement("span");
    const crossButton = document.createElement("button");

    addClass(taskItem, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    taskItem.appendChild(checkButton);
    taskItem.appendChild(taskText);
    taskItem.appendChild(crossButton);

    taskText.textContent = taskDescription;

    tasksContainer.appendChild(taskItem)

}