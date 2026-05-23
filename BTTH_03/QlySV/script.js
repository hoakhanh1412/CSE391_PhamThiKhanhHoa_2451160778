const pageTitle = document.getElementById("pageTitle");

const openModalBtn = document.getElementById("openModalBtn");

const studentModal = document.getElementById("studentModal");

const closeModalBtn = document.getElementById("closeModalBtn");

const message = document.getElementById("message");

pageTitle.textContent = "Quản lý sinh viên bằng DOM";

message.textContent = "Chào mừng bạn đến hệ thống";

openModalBtn.textContent = "Thêm sinh viên mới";



openModalBtn.addEventListener("click", function () {

    studentModal.style.display = "block";

});

closeModalBtn.addEventListener("click", function () {

    studentModal.style.display = "none";

});



const studentForm = document.getElementById("studentForm");


// const editBtn = document.querySelector(".editBtn");

// editBtn.addEventListener("click", function(){

//     alert("Bạn vừa bấm sửa");

// });

// const deleteBtn = document.querySelector(".deleteBtn");


// deleteBtn.addEventListener("click", function(){

//     const confirmDelete = confirm(
//         "Bạn có chắc muốn xóa không?"
//     );

// });

let students = [];


const studentTableBody = document.getElementById("studentTableBody");

const studentIdInput = document.getElementById("studentId");

const studentNameInput = document.getElementById("studentName");

const studentScoreInput = document.getElementById("studentScore");

const studentBirthInput = document.getElementById("studentBirth");

const studentClassInput = document.getElementById("studentClass");

const studentEmailInput = document.getElementById("studentEmail");

function renderStudents() {

    studentTableBody.innerHTML = "";

    students.forEach(function (student, index) {

        studentTableBody.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.birth}</td>

            <td>${student.className}</td>

            <td>${student.score}</td>

            <td>${student.email}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${index})"
                >

                    Sửa

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})"
                >

                    Xóa

                </button>

            </td>

        </tr>

        `;

    });

}

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const student = {

        id: studentIdInput.value,

        name: studentNameInput.value,

        score: studentScoreInput.value,

        birth: studentBirthInput.value,

        className: studentClassInput.value,

        email: studentEmailInput.value

    };

    if (editIndex === -1) {

        students.push(student);

    }
    else {

        students[editIndex] = student;

        editIndex = -1;

    }

    renderStudents();

    studentForm.reset();

    studentModal.style.display = "none";

});
let editIndex = -1;
function editStudent(index) {

    const student = students[index];

    studentIdInput.value = student.id;

    studentNameInput.value = student.name;

    studentScoreInput.value = student.score;

    studentBirthInput.value = student.birth;

    studentClassInput.value = student.className;

    studentEmailInput.value = student.email;

    editIndex = index;
    studentModal.style.display = "block";

}

function deleteStudent(index) {

    const confirmDelete = confirm(
        "Bạn có chắc muốn xóa không?"
    );

    if (confirmDelete) {

        students.splice(index, 1);

        renderStudents();

    }

}

