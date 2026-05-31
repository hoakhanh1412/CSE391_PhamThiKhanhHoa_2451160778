const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(!input.ariaValueMax.trim()) return;

    const li = document.createElement("li")
    li.textContent = input.value;

    li.addEventListener("click", ()=>{
        li.classList.toggle("completed");
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="X";
    deleteBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        li.remove();
    })
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = "";
    input.focus();
})