// app.js — Giai đoạn 1: chỉ demo toggle modal
// Logic đầy đủ sẽ bổ sung từ Giai đoạn 2 trở đi

const overlay    = document.getElementById('modal-overlay');
const btnOpen    = document.getElementById('btn-open-modal');
const btnClose   = document.getElementById('btn-close-modal');
const btnCancel  = document.getElementById('btn-cancel-form');

function openModal()  { overlay.classList.add('active'); }
function closeModal() { overlay.classList.remove('active'); }

btnOpen.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

overlay.addEventListener('click', function(e) {
  if (e.target === overlay) closeModal();
});