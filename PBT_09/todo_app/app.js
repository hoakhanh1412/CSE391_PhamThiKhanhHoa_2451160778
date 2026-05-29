/**
 * Todo App — Vanilla JavaScript
 * Patterns used:
 *  - Event Delegation (all list events bound to #todoList)
 *  - createElement for every DOM node (no innerHTML for todo items)
 *  - LocalStorage persistence
 *  - Filter state management
 */

// ─── State ────────────────────────────────────────────────────────────────────

/** @type {{ id: string, text: string, completed: boolean }[]} */
let todos = [];

/** @type {'all' | 'active' | 'completed'} */
let currentFilter = 'all';

// ─── DOM References ───────────────────────────────────────────────────────────

const todoForm        = document.getElementById('todoForm');
const todoInput       = document.getElementById('todoInput');
const todoList        = document.getElementById('todoList');
const emptyState      = document.getElementById('emptyState');
const itemCount       = document.getElementById('itemCount');
const clearCompleted  = document.getElementById('clearCompleted');
const filterTabs      = document.getElementById('filterTabs');

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────

function saveTodos() {
  localStorage.setItem('todos_app_v1', JSON.stringify(todos));
}

function loadTodos() {
  try {
    const raw = localStorage.getItem('todos_app_v1');
    todos = raw ? JSON.parse(raw) : [];
  } catch {
    todos = [];
  }
}

// ─── ID Generator ─────────────────────────────────────────────────────────────

function generateId() {
  return `todo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Core CRUD ────────────────────────────────────────────────────────────────

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const todo = {
    id: generateId(),
    text: trimmed,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

function updateTodoText(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) {
    deleteTodo(id);
    return;
  }
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = trimmed;
    saveTodos();
    render();
  }
}

function clearCompletedTodos() {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
}

// ─── Filter ───────────────────────────────────────────────────────────────────

function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':    return todos.filter(t => !t.completed);
    case 'completed': return todos.filter(t =>  t.completed);
    default:          return todos;
  }
}

// ─── DOM Builder — createElement only, NO innerHTML for items ─────────────────

/**
 * Build a single <li> for a todo item.
 * All data is stored as data-id on the <li> for Event Delegation.
 */
function createTodoElement(todo) {
  // <li class="todo-item [completed]" data-id="...">
  const li = document.createElement('li');
  li.className = 'todo-item' + (todo.completed ? ' completed' : '');
  li.setAttribute('data-id', todo.id);
  li.setAttribute('role', 'listitem');

  // Checkbox circle (toggle button)
  const checkbox = document.createElement('button');
  checkbox.className = 'todo-checkbox';
  checkbox.setAttribute('aria-label', todo.completed ? 'Mark incomplete' : 'Mark complete');
  checkbox.setAttribute('data-action', 'toggle');
  checkbox.setAttribute('type', 'button');

  // Text span (double-click to edit)
  const textSpan = document.createElement('span');
  textSpan.className = 'todo-text';
  textSpan.textContent = todo.text;
  textSpan.setAttribute('data-action', 'edit-start');
  textSpan.setAttribute('title', 'Double-click to edit');

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-delete';
  deleteBtn.setAttribute('aria-label', 'Delete todo');
  deleteBtn.setAttribute('data-action', 'delete');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.textContent = '✕';

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  return li;
}

/**
 * Replace a todo's text span with an edit <input>.
 * This is called on double-click; the input is committed on Enter / blur.
 */
function activateEditMode(li) {
  const id       = li.getAttribute('data-id');
  const todo     = todos.find(t => t.id === id);
  if (!todo) return;

  const textSpan = li.querySelector('.todo-text');
  if (!textSpan) return; // already in edit mode

  const input = document.createElement('input');
  input.className   = 'todo-edit-input';
  input.type        = 'text';
  input.value       = todo.text;
  input.maxLength   = 120;
  input.setAttribute('data-action', 'edit-input');

  // Replace textSpan with input (keep position between checkbox and deleteBtn)
  li.replaceChild(input, textSpan);
  input.focus();
  input.select();

  function commitEdit() {
    updateTodoText(id, input.value);
    // render() is called inside updateTodoText, which replaces the DOM
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitEdit();
    }
    if (e.key === 'Escape') {
      render(); // discard changes
    }
  });

  input.addEventListener('blur', commitEdit, { once: true });
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  // 1. Clear current list
  todoList.innerHTML = '';

  const filtered = getFilteredTodos();

  // 2. Build and append each item (createElement only)
  const fragment = document.createDocumentFragment();
  filtered.forEach(todo => {
    fragment.appendChild(createTodoElement(todo));
  });
  todoList.appendChild(fragment);

  // 3. Empty state
  const hasItems = filtered.length > 0;
  emptyState.classList.toggle('hidden', hasItems);
  emptyState.setAttribute('aria-hidden', String(hasItems));

  // 4. Count (only non-completed, regardless of filter)
  const activeCount = todos.filter(t => !t.completed).length;
  itemCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

  // 5. Show/hide clear button
  const hasCompleted = todos.some(t => t.completed);
  clearCompleted.style.visibility = hasCompleted ? 'visible' : 'hidden';
}

// ─── Event Delegation on #todoList ───────────────────────────────────────────
// All click / dblclick events for list items are handled here — NOT on individual <li>

todoList.addEventListener('click', (e) => {
  const action = e.target.getAttribute('data-action');
  const li     = e.target.closest('[data-id]');
  if (!li) return;
  const id = li.getAttribute('data-id');

  if (action === 'toggle') {
    toggleTodo(id);
  } else if (action === 'delete') {
    deleteTodo(id);
  }
});

todoList.addEventListener('dblclick', (e) => {
  const action = e.target.getAttribute('data-action');
  if (action === 'edit-start') {
    const li = e.target.closest('[data-id]');
    if (li) activateEditMode(li);
  }
});

// ─── Form Submit ──────────────────────────────────────────────────────────────

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

// ─── Filter Buttons ───────────────────────────────────────────────────────────

filterTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  const filter = btn.getAttribute('data-filter');
  if (!filter || filter === currentFilter) return;

  currentFilter = filter;

  // Update active class and aria
  filterTabs.querySelectorAll('.filter-btn').forEach(b => {
    const isActive = b === btn;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', String(isActive));
  });

  render();
});

// ─── Clear Completed ──────────────────────────────────────────────────────────

clearCompleted.addEventListener('click', () => {
  clearCompletedTodos();
});

// ─── Init ─────────────────────────────────────────────────────────────────────

loadTodos();
render();