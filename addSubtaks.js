let subtasks = [];

// Add a new subtask
function addSubtask() {
  let input = document.querySelector('.subtask-input');
  let title = input.value.trim();
  if (!title) return;

  let subtaskId = `sub${Date.now()}`;
  subtasks.push({ id: subtaskId, title, done: false });

  renderSubtaskList();
  input.value = "";
}

// Render all subtasks
function renderSubtaskList() {
  const list = document.getElementById('subtask-list');
  list.innerHTML = '';
  subtasks.forEach(subtask => {
    let row = document.createElement('div');
    row.className = 'subtask-item';
    row.id = `subtask-${subtask.id}`;

    // Bullet + Text
    let text = document.createElement('span');
    text.className = 'subtask-title';
    text.textContent = `• ${subtask.title}`;
    row.appendChild(text);

    // Edit/Delete Actions
    let actions = document.createElement('span');
    actions.className = 'subtask-actions';

    // Edit icon
    let editBtn = document.createElement('img');
    editBtn.src = 'assets/Property 1=edit.png';
    editBtn.className = 'subtask-icon edit-icon';
    editBtn.title = 'Edit subtask';
    editBtn.alt = 'Edit';
    editBtn.onclick = function() {
      startEditSubtask(subtask.id);
    };
    actions.appendChild(editBtn);

    // Delete icon
    let deleteBtn = document.createElement('img');
    deleteBtn.src = 'assets/Property 1=delete.png';
    deleteBtn.className = 'subtask-icon delete-icon';
    deleteBtn.title = 'Delete subtask';
    deleteBtn.alt = 'Delete';
    deleteBtn.onclick = function() {
      deleteSubtask(subtask.id);
    };
    actions.appendChild(deleteBtn);

    row.appendChild(actions);

    // Hover effect for actions
    row.onmouseenter = () => row.classList.add('hover');
    row.onmouseleave = () => row.classList.remove('hover');

    list.appendChild(row);
  });
}

// Delete a subtask
function deleteSubtask(subtaskId) {
  subtasks = subtasks.filter(s => s.id !== subtaskId);
  renderSubtaskList();
}

// Start editing a subtask
function startEditSubtask(subtaskId) {
  const subtask = subtasks.find(s => s.id === subtaskId);
  const row = document.getElementById(`subtask-${subtaskId}`);
  if (!row) return;
  row.innerHTML = '';

  const input = document.createElement('input');
  input.type = 'text';
  input.value = subtask.title;
  input.className = 'edit-subtask-input';

  // Icons for confirm/cancel
  const icons = document.createElement('span');
  icons.className = 'edit-subtask-icons';

  const confirmBtn = document.createElement('img');
  confirmBtn.src = 'assets/Property 1=edit.png';
  confirmBtn.className = 'subtask-icon edit-icon';
  confirmBtn.title = 'Save';
  confirmBtn.alt = 'Save';
  confirmBtn.onclick = function() {
    confirmEditSubtask(subtaskId, input.value);
  };

  const cancelBtn = document.createElement('img');
  cancelBtn.src = 'assets/Property 1=delete.png';
  cancelBtn.className = 'subtask-icon delete-icon';
  cancelBtn.title = 'Cancel';
  cancelBtn.alt = 'Cancel';
  cancelBtn.onclick = function() {
    renderSubtaskList();
  };

  icons.appendChild(confirmBtn);
  icons.appendChild(cancelBtn);

  row.appendChild(input);
  row.appendChild(icons);

  input.focus();
  input.onkeydown = function(e) {
    if (e.key === 'Enter') confirmEditSubtask(subtaskId, input.value);
    if (e.key === 'Escape') renderSubtaskList();
  };
}

// Confirm edit of a subtask
function confirmEditSubtask(subtaskId, newTitle) {
  newTitle = newTitle.trim();
  if (!newTitle) return;
  const subtask = subtasks.find(s => s.id === subtaskId);
  if (subtask) subtask.title = newTitle;
  renderSubtaskList();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.add-subtask-button').addEventListener('click', addSubtask);
  document.querySelector('.subtask-input').addEventListener('keydown', function(e) {
    if(e.key === 'Enter') addSubtask();
  });
});