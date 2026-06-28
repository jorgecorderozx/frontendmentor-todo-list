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
    let crossButton = document.createElement("button");
    li.dataset.id = saveTask(taskName);
    addClass(li, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    li.appendChild(checkButton);
    li.appendChild(task)
    li.appendChild(crossButton);

    checkButton.addEventListener("click", ()=>{
        li.classList.toggle("completed")
        const id = Number(li.dataset.id);
        const taskObject = tasks.find(t => t.id === id);
        if(taskObject){
            taskObject.completed = li.classList.contains("completed");
        }
        updateItemsLeft()
    })

    crossButton.addEventListener("click", () =>{
        const id = Number(li.dataset.id);
        tasks = tasks.filter(t => t.id !== id);
        li.remove()
        updateItemsLeft()
    })

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
    return task.id;
}

function renderTask(){
    if(taskInput.value === "") {
        return;
    } 
    else{
        tasksContainer.appendChild(createTask(taskInput.value));
        taskInput.value = "";
        updateItemsLeft();
    }
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    renderTask();

})

function updateItemsLeft(){
    const remainingItems = document.querySelector(".remaining-items");
    const remainingCount = tasks.filter(t => t.completed !== true).length
    remainingItems.textContent = remainingCount;
}