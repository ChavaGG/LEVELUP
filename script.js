let tasks = [];

function showAddTaskModal() {
    document.getElementById("task-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("task-modal").style.display = "none";
}

function showAddSubtaskModal(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        document.getElementById("subtask-modal").style.display = "block";
        document.getElementById("subtask-title").dataset.taskId = taskId;
    }
}

function closeSubtaskModal() {
    document.getElementById("subtask-modal").style.display = "none";
}

function addTask() {
    const taskTitle = document.getElementById("task-title").value;
    if (!taskTitle) return;

    const newTask = {
        id: Date.now(),
        title: taskTitle,
        subtasks: [],
        completedSubtasks: 0
    };

    tasks.push(newTask);
    document.getElementById("task-title").value = '';
    closeModal();
    renderTasks();
}

function addSubtask() {
    const subtaskTitle = document.getElementById("subtask-title").value;
    if (!subtaskTitle) return;

    const taskId = document.getElementById("subtask-title").dataset.taskId;
    const task = tasks.find(task => task.id == taskId);

    if (task) {
        const newSubtask = {
            id: Date.now(),
            title: subtaskTitle,
            completed: false
        };

        task.subtasks.push(newSubtask);
        document.getElementById("subtask-title").value = '';
        closeSubtaskModal();
        renderTasks();
    }
}

function toggleSubtaskCompletion(taskId, subtaskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const subtask = task.subtasks.find(subtask => subtask.id === subtaskId);
        if (subtask) {
            subtask.completed = !subtask.completed;
            task.completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
            renderTasks();
        }
    }
}

function renderTasks() {
    const tasksList = document.getElementById("tasks-list");
    tasksList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.title;
        taskElement.appendChild(taskTitle);

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        const progress = document.createElement("div");
        const progressPercentage = (task.completedSubtasks / task.subtasks.length) * 100;
        progress.style.width = progressPercentage + "%";
        progressBar.appendChild(progress);
        taskElement.appendChild(progressBar);

        task.subtasks.forEach(subtask => {
            const subtaskElement = document.createElement("div");
            subtaskElement.classList.add("subtask");
            subtaskElement.textContent = subtask.title;

            const subtaskCheckbox = document.createElement("input");
            subtaskCheckbox.type = "checkbox";
            subtaskCheckbox.checked = subtask.completed;
            subtaskCheckbox.onclick = () => toggleSubtaskCompletion(task.id, subtask.id);

            subtaskElement.appendChild(subtaskCheckbox);
            taskElement.appendChild(subtaskElement);
        });

        const addSubtaskButton = document.createElement("button");
        addSubtaskButton.textContent = "Añadir subtarea";
        addSubtaskButton.onclick = () => showAddSubtaskModal(task.id);
        taskElement.appendChild(addSubtaskButton);

        tasksList.appendChild(taskElement);
    });
}

renderTasks();
