// =============================================
// BƯỚC 1: LẤY CÁC PHẦN TỬ TỪ HTML VÀO JS
// =============================================

var statTotal        = document.getElementById('stat-total');
var statDone         = document.getElementById('stat-done');
var statPending      = document.getElementById('stat-pending');
var taskList         = document.getElementById('task-list');
var modalOverlay     = document.getElementById('modal-overlay');
var modalTitle       = document.getElementById('modal-title');
var btnOpenModal     = document.getElementById('btn-open-modal');
var btnCloseModal    = document.getElementById('btn-close-modal');
var btnCancelForm    = document.getElementById('btn-cancel-form');
var taskForm         = document.getElementById('task-form');
var formTaskId       = document.getElementById('form-task-id');
var formTitle        = document.getElementById('form-title');
var formDescription  = document.getElementById('form-description');
var formDeadline     = document.getElementById('form-deadline');
var formPriority     = document.getElementById('form-priority');
var btnSubmitForm    = document.getElementById('btn-submit-form');
var groupTitle       = document.getElementById('group-title');


// =============================================
// BƯỚC 2: DỮ LIỆU MẪU để test
// =============================================

var tasks = [
  {
    id: 1,
    title: 'Làm báo cáo tuần',
    description: 'Tổng hợp kết quả công việc trong tuần',
    deadline: '2025-06-10',
    priority: 'high',
    completed: false
  },
  {
    id: 2,
    title: 'Học JavaScript DOM',
    description: 'Xem lại bài giảng và làm bài tập',
    deadline: '2025-06-05',
    priority: 'medium',
    completed: true
  }
];


// =============================================
// BƯỚC 3: HÀM RENDER DANH SÁCH
// =============================================

function renderTasks() {
  var priorityText = { low: 'Thấp', medium: 'Trung bình', high: 'Cao' };

  // Xóa nội dung cũ
  taskList.innerHTML = '';

  // Nếu rỗng thì hiện thông báo
  if (tasks.length === 0) {
    var empty = document.createElement('p');
    empty.id = 'empty-state';
    empty.textContent = 'Chưa có công việc nào. Hãy thêm mới!';
    taskList.appendChild(empty);
    return;
  }

  // Duyệt mảng tạo card
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var deadlineText = task.deadline ? task.deadline : 'Chưa đặt hạn';

    var card = document.createElement('div');
    card.className = 'task-card' + (task.completed ? ' completed' : '');
    card.setAttribute('data-id', task.id);

    card.innerHTML =
      '<input type="checkbox" class="task-checkbox"' + (task.completed ? ' checked' : '') + ' />' +
      '<div class="task-body">' +
        '<div class="task-title">' + task.title + '</div>' +
        '<div class="task-description">' + task.description + '</div>' +
        '<div class="task-meta">' +
          '<span>📅 ' + deadlineText + '</span>' +
          '<span class="badge-priority ' + task.priority + '">' + priorityText[task.priority] + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="task-actions">' +
        '<button class="btn-edit">Sửa</button>' +
        '<button class="btn-delete">Xóa</button>' +
      '</div>';

    taskList.appendChild(card);
  }
}

// Render ngay khi tải trang
renderTasks();


// =============================================
// BƯỚC 4: MỞ / ĐÓNG MODAL
// =============================================

function openModal() {
  modalOverlay.classList.add('active');
  formTitle.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  taskForm.reset();
  groupTitle.classList.remove('has-error');
  formTaskId.value = '';
  modalTitle.textContent = 'Thêm công việc mới';
  btnSubmitForm.textContent = 'Lưu';
}

btnOpenModal.addEventListener('click', function () {
  openModal();
});

btnCloseModal.addEventListener('click', function () {
  closeModal();
});

btnCancelForm.addEventListener('click', function () {
  closeModal();
});

modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});


// =============================================
// BƯỚC 5: SUBMIT FORM — THÊM MỚI CÔNG VIỆC
// =============================================

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validate tiêu đề
  if (formTitle.value.trim() === '') {
    groupTitle.classList.add('has-error');
    return;
  }
  groupTitle.classList.remove('has-error');

  var newTask = {
    id:          Date.now(),
    title:       formTitle.value.trim(),
    description: formDescription.value.trim(),
    deadline:    formDeadline.value,
    priority:    formPriority.value,
    completed:   false
  };

  tasks.push(newTask);
  renderTasks();
  closeModal();

  alert('Thêm công việc thành công!');
});


// =============================================
// BƯỚC 6: SỰ KIỆN TRÊN CARD (delegation)
// =============================================

taskList.addEventListener('click', function (e) {
  var card = e.target.closest('.task-card');
  if (!card) return;

  var id = Number(card.getAttribute('data-id'));

  // Nút Sửa
  if (e.target.classList.contains('btn-edit')) {
    var task = null;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) { task = tasks[i]; break; }
    }
    formTaskId.value      = task.id;
    formTitle.value       = task.title;
    formDescription.value = task.description;
    formDeadline.value    = task.deadline;
    formPriority.value    = task.priority;
    modalTitle.textContent    = 'Cập nhật công việc';
    btnSubmitForm.textContent = 'Cập nhật';
    modalOverlay.classList.add('active');
  }

  // Nút Xóa
  if (e.target.classList.contains('btn-delete')) {
    if (confirm('Bạn có chắc muốn xóa công việc này không?')) {
      tasks = tasks.filter(function (t) { return t.id !== id; });
      renderTasks();
      alert('Đã xóa công việc!');
    }
  }

  // Checkbox đổi trạng thái
  if (e.target.classList.contains('task-checkbox')) {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].completed = !tasks[i].completed;
        break;
      }
    }
    renderTasks();
  }
});