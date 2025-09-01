const API_URL = "http://localhost:8080/api/tasks";

// Referencias a los formularios y sus elementos
const createTaskForm = document.getElementById('taskForm');
const editTaskForm = document.getElementById('editTaskForm');
const editTitleInput = document.getElementById('editTitle');
const editDescriptionInput = document.getElementById('editDescription');
const currentTaskIdSpan = document.getElementById('currentTaskId');
const cancelButton = document.getElementById('cancelEdit');

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title}: ${task.description}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "delete task";
            deleteButton.addEventListener("click", () => {
                deleteTask(task.id);
            });

            const updateTaskButton = document.createElement("button");
            updateTaskButton.textContent = "update task";
            updateTaskButton.addEventListener("click", () => {
                // Rellenar el formulario de edición y mostrarlo
                editTaskForm.hidden = false;
                createTaskForm.hidden = true; // Ocultar el formulario de creación
                currentTaskIdSpan.textContent = task.id;
                editTitleInput.value = task.title;
                editDescriptionInput.value = task.description;
            });

            li.appendChild(deleteButton);
            li.appendChild(updateTaskButton);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

async function createTask(task) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        });
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

async function updateTask(id, updatedData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
        if (response.ok) {
            // Ocultar el formulario de edición y mostrar el de creación
            editTaskForm.hidden = true;
            createTaskForm.hidden = false;
            fetchTasks();
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

// Event Listeners fuera de cualquier bucle
createTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const newTask = { title, description };
    createTask(newTask);
    this.reset();
});

editTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskId = currentTaskIdSpan.textContent;
    const updatedData = {
        title: editTitleInput.value,
        description: editDescriptionInput.value
    };
    updateTask(taskId, updatedData);
});

cancelButton.addEventListener('click', () => {
    editTaskForm.hidden = true;
    createTaskForm.hidden = false;
});

fetchTasks();