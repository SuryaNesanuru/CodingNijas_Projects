let currentColumn = 'todo';
let editId = null;

const modal = document.getElementById('task-modal');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const prioritySelect = document.getElementById('task-priority');

function openTaskModal(column, task = null) {
  currentColumn = column;
  editId = task?.id || null;
  titleInput.value = task?.title || '';
  descInput.value = task?.desc || '';
  prioritySelect.value = task?.priority || 'medium';
  modal.classList.remove('hidden');
}

function closeTaskModal() {
  modal.classList.add('hidden');
  titleInput.value = '';
  descInput.value = '';
  editId = null;
}

function saveTask() {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const priority = prioritySelect.value;
  if (!title) return alert("Title is required");

  const task = {
    id: editId || Date.now(),
    title,
    desc,
    priority,
  };

  const list = getTasks(currentColumn);
  if (editId) {
    const index = list.findIndex(t => t.id === editId);
    list[index] = task;
  } else {
    list.push(task);
  }

  localStorage.setItem(currentColumn, JSON.stringify(list));
  renderTasks();
  closeTaskModal();
}

function getTasks(column) {
  return JSON.parse(localStorage.getItem(column) || '[]');
}

function renderTasks() {
  ['todo', 'inprogress', 'done'].forEach(column => {
    const container = document.getElementById(column);
    container.innerHTML = '';
    const list = getTasks(column);
    list.forEach(task => {
      const div = document.createElement('div');
      div.className = 'task';
      div.draggable = true;
      div.dataset.id = task.id;
      div.innerHTML = `
        <strong>${task.title}</strong>
        <p>${task.desc}</p>
        <span class="priority ${task.priority}">${task.priority}</span>
        <div class="actions">
          <button onclick="openTaskModal('${column}', ${JSON.stringify(task).replace(/"/g, '&quot;')})">✏️</button>
          <button onclick="deleteTask('${column}', ${task.id})">🗑️</button>
        </div>
      `;
      addDragEvents(div);
      container.appendChild(div);
    });
  });
}

function deleteTask(column, id) {
  const tasks = getTasks(column).filter(t => t.id !== id);
  localStorage.setItem(column, JSON.stringify(tasks));
  renderTasks();
}

function addDragEvents(task) {
  task.addEventListener('dragstart', () => task.classList.add('dragging'));
  task.addEventListener('dragend', () => task.classList.remove('dragging'));
}

document.querySelectorAll('.task-list').forEach(list => {
  list.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    list.appendChild(dragging);
  });

  list.addEventListener('drop', () => {
    const task = document.querySelector('.dragging');
    const id = parseInt(task.dataset.id);
    const oldColumn = ['todo', 'inprogress', 'done'].find(col => getTasks(col).some(t => t.id === id));
    const newColumn = list.id;

    if (oldColumn && newColumn && oldColumn !== newColumn) {
      const taskData = getTasks(oldColumn).find(t => t.id === id);
      deleteTask(oldColumn, id);
      const newList = getTasks(newColumn);
      newList.push(taskData);
      localStorage.setItem(newColumn, JSON.stringify(newList));
      renderTasks();
    }
  });
});

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

renderTasks();
