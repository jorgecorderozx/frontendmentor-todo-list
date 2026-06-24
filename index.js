let tasksContainer = document.querySelector(".tasks-wrapper");
let form = document.querySelector("form");
let taskInput = document.getElementById("new-todo");
let idCounter = 0;

let tasks = [];

function addClass(tag, className){
    tag.classList.add(className);
}

// guarda la tarea y devuelve su id
function saveTask(taskName){
    idCounter++;
    let task = {
        id: idCounter,
        text: taskName,
        completed: false
    }
    tasks.push(task);
    return task.id; // devolvemos el id para asociarlo al DOM
}

function createTask(taskName){
    // primero guardamos y conseguimos el id
    const taskId = saveTask(taskName);

    let li = document.createElement("li")
    let checkButton = document.createElement("button");
    let task = document.createElement("span");
    task.textContent = taskName;
    let crossButton = document.createElement("button");


    addClass(li, "flex");
    addClass(checkButton, "check");
    addClass(crossButton, "cross");

    // asociamos el id al DOM para relacionar después
    li.dataset.id = taskId;

    li.appendChild(checkButton);
    li.appendChild(task)
    li.appendChild(crossButton);

    // Listener para togglear completed
    checkButton.addEventListener("click", () => {
        // toggle en el DOM
        li.classList.toggle("completed");

        // actualizamos el objeto correspondiente en el array tasks
        const id = Number(li.dataset.id);
        const taskObj = tasks.find(t => t.id === id);
        if (taskObj) {
            taskObj.completed = li.classList.contains("completed");
        }

        // actualizamos contador
        updateRemainingCount();
    });

    // Listener para borrar la tarea cuando pulsan cross
    crossButton.addEventListener("click", () => {
        const id = Number(li.dataset.id);
        // quitar del array
        tasks = tasks.filter(t => t.id !== id);
        // quitar del DOM
        li.remove();
        updateRemainingCount();
    });

    return li;
}

function renderTask(){
    if(taskInput.value.trim() === "") {
        return;
    } 
    else{
        tasksContainer.appendChild(createTask(taskInput.value.trim()));
        taskInput.value = "";
        updateRemainingCount();
    }
}

// actualiza el contador de items restantes
function updateRemainingCount(){
    const remainingEl = document.querySelector(".remaining-items");
    const remaining = tasks.filter(t => !t.completed).length;
    if (remainingEl) remainingEl.textContent = remaining;
}

// evento submit del form
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    renderTask();
});

// inicializar contador
updateRemainingCount();
