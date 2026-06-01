let tasksContainer = document.querySelector(".tasks-wrapper")

function createTask(taskName){
    let li = document.createElement("li")
    let checkButton = document.createElement("button");
    let task = document.createElement("span");
    task.textContent = taskName;
    let crossButton = document.createElement("button");


    addClass(li, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    li.appendChild(checkButton);
    li.appendChild(task)
    li.appendChild(crossButton);
    return li;
}

function addClass(tag, className){
    tag.classList.add(className);
}

tasksContainer.appendChild(createTask("Test item"));