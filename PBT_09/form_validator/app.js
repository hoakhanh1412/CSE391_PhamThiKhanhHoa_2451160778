const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

const nameStatus = document.getElementById("nameStatus");
const emailError = document.getElementById("emailError");
const confirmError = document.getElementById("confirmError");
const phoneError = document.getElementById("phoneError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

let validName = false;
let validEmail = false;
let validPassword = false;
let validConfirm = false;
let validPhone = false;

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmInput.addEventListener("input", validateConfirm);
phoneInput.addEventListener("input", validatePhone);

function validateName(){

const value = nameInput.value.trim();

if(value.length >= 2 && value.length <= 50){

nameStatus.textContent = "✅";
validName = true;

}else{

nameStatus.textContent = "❌";
validName = false;
}

updateSubmitButton();
}

function validateEmail(){

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(emailRegex.test(emailInput.value)){

emailError.textContent = "";
validEmail = true;

}else{

emailError.textContent =
"Email không đúng định dạng";

validEmail = false;
}

updateSubmitButton();
}

function validatePassword(){

const password =
passwordInput.value;

let strength = 0;

if(password.length >= 8)
strength++;

if(/[A-Za-z]/.test(password)
&& /\d/.test(password))
strength++;

if(
/[A-Z]/.test(password)
&& /[a-z]/.test(password)
&& /\d/.test(password)
&& /[^A-Za-z0-9]/.test(password)
)
strength++;

if(strength === 0){

strengthBar.style.width="20%";
strengthBar.style.background="red";
strengthText.textContent="Yếu";
validPassword=false;
}

else if(strength < 3){

strengthBar.style.width="60%";
strengthBar.style.background="orange";
strengthText.textContent="Trung bình";
validPassword=true;
}

else{

strengthBar.style.width="100%";
strengthBar.style.background="green";
strengthText.textContent="Mạnh";
validPassword=true;
}

validateConfirm();
updateSubmitButton();
}

function validateConfirm(){

if(
confirmInput.value &&
confirmInput.value === passwordInput.value
){

confirmError.textContent="";
validConfirm=true;

}else{

confirmError.textContent=
"Mật khẩu không khớp";

validConfirm=false;
}

updateSubmitButton();
}

function validatePhone(){

let value =
phoneInput.value.replace(/\D/g,"");

if(value.length > 10){

value = value.slice(0,10);
}

if(value.length > 4){

value =
value.slice(0,4)
+
"-"
+
value.slice(4);
}

if(value.length > 8){

value =
value.slice(0,8)
+
"-"
+
value.slice(8);
}

phoneInput.value = value;

const digits =
value.replace(/\D/g,"");

if(digits.length === 10){

phoneError.textContent="";
validPhone=true;

}else{

phoneError.textContent=
"Số điện thoại phải đủ 10 số";

validPhone=false;
}

updateSubmitButton();
}

function updateSubmitButton(){

submitBtn.disabled =
!(
validName &&
validEmail &&
validPassword &&
validConfirm &&
validPhone
);
}

document
.getElementById("registerForm")
.addEventListener("submit",(e)=>{

e.preventDefault();

showModal();

});

function showModal(){

const modal =
document.createElement("div");

modal.className = "modal";

modal.innerHTML = `
<div class="modal-content">

<h2>Đăng ký thành công!</h2>

<p><strong>Tên:</strong>
${nameInput.value}</p>

<p><strong>Email:</strong>
${emailInput.value}</p>

<p><strong>Phone:</strong>
${phoneInput.value}</p>

<br>

<button id="closeModal">
Đóng
</button>

</div>
`;

document.body.appendChild(modal);

document
.getElementById("closeModal")
.addEventListener("click",()=>{

modal.remove();

});
}