document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    let tasks = [];

    // Function to render tasks based on the filter
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.name}</span>
                <div>
                    <span class="edit" data-index="${index}">✎ Edit</span>
                    <span class="delete" data-index="${index}">✖ Delete</span>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Function to add a new task
    const addTask = () => {
        const taskName = newTaskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            newTaskInput.value = '';
            renderTasks();
        }
    };

    // Function to edit an existing task
    const editTask = (index) => {
        const newTaskName = prompt('Edit task:', tasks[index].name);
        if (newTaskName) {
            tasks[index].name = newTaskName.trim();
            renderTasks();
        }
    };

    // Function to delete a task
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Function to toggle the completion status of a task
    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Event listeners for editing, deleting, and completing tasks
    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.className.includes('edit')) editTask(index);
        if (e.target.className.includes('delete')) deleteTask(index);
        if (e.target.type === 'checkbox') toggleTaskCompletion(index);
    });

    // Event listeners for filtering tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            renderTasks(button.getAttribute('data-filter'));
        });
    });

    // Initial render
    renderTasks();
});
