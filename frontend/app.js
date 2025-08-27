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
            updateTaskButton.textContent = "Actualizar tarea";
            updateTaskButton.addEventListener("click", () => {
                document.getElementById('editTaskForm').hidden = false;

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

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const newTask = { title, description };
    createTask(newTask);
    this.reset();
});




fetchTasks();