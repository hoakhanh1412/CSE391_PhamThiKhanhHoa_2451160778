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