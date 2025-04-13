document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <span contenteditable="false">${task.text}</span>
          <div class="buttons">
            
           
            <button class="action delete">🗑</button>
          </div>
        `;
  
        // // DONE button
        // li.querySelector(".done").addEventListener("click", () => {
        //   tasks[index].completed = !tasks[index].completed;
        //   saveTasks();
        //   renderTasks();
        // });
  
        // DELETE button
        li.querySelector(".delete").addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
  
        // EDIT button
        // const span = li.querySelector("span");
        // li.querySelector(".edit").addEventListener("click", () => {
        //   const isEditable = span.isContentEditable;
        //   if (!isEditable) {
        //     span.contentEditable = true;
        //     span.focus();
        //   } else {
        //     span.contentEditable = false;
        //     tasks[index].text = span.textContent.trim();
        //     saveTasks();
        //   }
        // });
  
        taskList.appendChild(li);
      });
    }
  
    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text !== "") {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
      } else {
        alert("Please enter a task.");
      }
    });
  
    renderTasks();
  });
  