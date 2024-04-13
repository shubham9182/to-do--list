document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    loadTasks();
  
    // Event listener for form submission
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Function to add a new task
    function addTask(taskText) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(li);
    }
  
    // Event delegation for delete button
    taskList.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        removeTask(e.target.previousElementSibling.textContent);
      }
    });
  
    // Function to save task to local storage
    function saveTask(taskText) {
      let tasks = [];
      if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to remove task from local storage
    function removeTask(taskText) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks = tasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to load tasks from local storage
    function loadTasks() {
      if (localStorage.getItem('tasks')) {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => addTask(task));
      }
    }
  });
  