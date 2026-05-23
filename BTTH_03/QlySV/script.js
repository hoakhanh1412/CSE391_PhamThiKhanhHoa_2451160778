const pageTitle = document.getElementById("pageTitle");

const openModalBtn = document.getElementById("openModalBtn");

const studentModal = document.getElementById("studentModal");

const closeModalBtn = document.getElementById("closeModalBtn");

const message = document.getElementById("message");

pageTitle.textContent = "Quản lý sinh viên bằng DOM";

message.textContent = "Chào mừng bạn đến hệ thống";

openModalBtn.textContent = "Thêm sinh viên mới";



openModalBtn.addEventListener("click", function(){

    studentModal.style.display = "block";

});

closeModalBtn.addEventListener("click", function(){

    studentModal.style.display = "none";

});



closeModalBtn.addEventListener("click", function(){

    studentModal.style.display = "none";

});

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function(event){

    event.preventDefault();

    alert("Form đã được submit");

});

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