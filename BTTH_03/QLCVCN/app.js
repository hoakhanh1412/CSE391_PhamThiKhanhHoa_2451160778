// =============================================
// BƯỚC 1: LẤY CÁC PHẦN TỬ TỪ HTML VÀO JS
// =============================================

var statTotal = document.getElementById('stat-total');
var statDone = document.getElementById('stat-done');
var statPending = document.getElementById('stat-pending');
var taskList = document.getElementById('task-list');
var modalOverlay = document.getElementById('modal-overlay');
var modalTitle = document.getElementById('modal-title');
var btnOpenModal = document.getElementById('btn-open-modal');
var btnCloseModal = document.getElementById('btn-close-modal');
var btnCancelForm = document.getElementById('btn-cancel-form');
var taskForm = document.getElementById('task-form');
var formTaskId = document.getElementById('form-task-id');
var formTitle = document.getElementById('form-title');
var formDescription = document.getElementById('form-description');
var formDeadline = document.getElementById('form-deadline');
var formPriority = document.getElementById('form-priority');
var btnSubmitForm = document.getElementById('btn-submit-form');
var groupTitle = document.getElementById('group-title');


// =============================================
// BƯỚC 2: DỮ LIỆU MẪU để test
// =============================================

var tasks = [];

// Lưu mảng tasks vào localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Đọc dữ liệu từ localStorage khi tải trang
function loadTasks() {
    var data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
}

// Gọi loadTasks trước khi render
loadTasks();

function showMessage(text, type) {
    var notificationArea = document.getElementById('notification-area');
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = text;
    notificationArea.appendChild(toast);

    // Tự xóa sau 3 giây
    setTimeout(function () {
        notificationArea.removeChild(toast);
    }, 3000);
}

function updateStats() {
    var total   = tasks.length;
    var done    = tasks.filter(function(t) { return t.completed; }).length;
    var pending = total - done;

    statTotal.textContent   = total;
    statDone.textContent    = done;
    statPending.textContent = pending;
}

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
    updateStats(); 
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
        formTaskId.value = task.id;
        formTitle.value = task.title;
        formDescription.value = task.description;
        formDeadline.value = task.deadline;
        formPriority.value = task.priority;
        modalTitle.textContent = 'Cập nhật công việc';
        btnSubmitForm.textContent = 'Cập nhật';
        modalOverlay.classList.add('active');
    }

    // Nút Xóa
    if (e.target.classList.contains('btn-delete')) {
        if (confirm('Bạn có chắc muốn xóa công việc này không?')) {
            tasks = tasks.filter(function (t) { return t.id !== id; });
            saveTasks(); 
            renderTasks();
            showMessage('Đã xóa công việc!', 'success');
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
        saveTasks();
        renderTasks();
    }
});

// Hàm addTask — chỉ làm 1 việc: thêm vào mảng
function addTask(data) {
    var newTask = {
        id:          Date.now(),
        title:       data.title,
        description: data.description,
        deadline:    data.deadline,
        priority:    data.priority,
        completed:   false
    };
    tasks.push(newTask);
    saveTasks();
}

// Hàm editTask — chỉ làm 1 việc: cập nhật theo id
function editTask(id, data) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].title       = data.title;
            tasks[i].description = data.description;
            tasks[i].deadline    = data.deadline;
            tasks[i].priority    = data.priority;
            break;
        }
    }
    saveTasks();
}

// Submit form — phân biệt thêm/sửa rồi gọi đúng hàm
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (formTitle.value.trim() === '') {
        groupTitle.classList.add('has-error');
        return;
    }
    groupTitle.classList.remove('has-error');

    var data = {
        title:       formTitle.value.trim(),
        description: formDescription.value.trim(),
        deadline:    formDeadline.value,
        priority:    formPriority.value
    };

    if (formTaskId.value !== '') {
        editTask(Number(formTaskId.value), data); // đang sửa
        showMessage('Cập nhật công việc thành công!', 'success');
    } else {
        addTask(data);
        showMessage('Thêm công việc thành công!', 'success');             // đang thêm mới
    }

    renderTasks();
    closeModal();
});


