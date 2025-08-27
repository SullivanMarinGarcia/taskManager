const API_URL = "http://localhost:8080/api/tasks";

async function fetchTasks(){
    try{
        const response = await fetch(API_URL);
        const tasks = await response.json();
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title}: ${task.description}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar tarea";
            deleteButton.addEventListener("click", () => {
                deleteTask(task.id);
            });

            const updateTaskButton = document.createElement("button");
            const currentTaskId = document.getElementById("currentTaskId");
            updateTaskButton.textContent = "Actualizar tarea";
            updateTaskButton.addEventListener("click", () => {
                console.log(`Actualizando la tarea ${task.id}`);
                document.getElementById('editTaskForm').hidden = false;
                currentTaskId.textContent = task.id;

            });

            const confirmEditButton = document.getElementById("confirmEditTaskButton");
            confirmEditButton.addEventListener("click", event => {
                event.preventDefault();
                const editTitle = document.getElementById("editTitle").value;
                const editDescription = document.getElementById("editDescription").value;
                updateTask(task.id, { title: editTitle, description: editDescription });
            });

            const cancelButton = document.getElementById("cancelEdit");
            cancelButton.addEventListener("click", () => {
                document.getElementById('editTaskForm').hidden = true;
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
    try{

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            fetchTasks();
        }

    } catch (error) {
        console.error("Error creating task:", error);
    }

}

async function deleteTask(id){
    try{

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

async function updateTask(id, updatedData){
    try{

        const response = await fetch(`${API_URL}/${id}`, {
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            fetchTasks();
        }

    } catch (error) {
        console.error("Error updating task:", error);
    }
}

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const newTask = { title, description };
    createTask(newTask);
    this.reset();
});




fetchTasks();