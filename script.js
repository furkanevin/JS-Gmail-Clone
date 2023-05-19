// importlar
// import { data } from './constants.js';
import { renderMails } from './ui.js';
import { showCreateMailModal } from './ui.js';

// localstoregedan veri alma
const localData = localStorage.getItem('localData');
const data = JSON.parse(localData) || [];

// htmlden gelenler
const messages = document.querySelector('.messages_area');
const modal = document.querySelector('.modal-wrapper');
const createMailBtn = document.querySelector('#create-mail-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const sendMailBtn = document.querySelector('#send-mail-btn');
const receiverInput = document.querySelector('#form-receiver');
const titleInput = document.querySelector('#form-title');
const descInput = document.querySelector('#form-desc');

// olay izleyicileri
document.addEventListener('DOMContentLoaded', () => renderMails(messages, data));
createMailBtn.addEventListener('click', () => showCreateMailModal(modal, true));
closeModalBtn.addEventListener('click', () => showCreateMailModal(modal, false));
sendMailBtn.addEventListener('click', () => sendMail());
messages.addEventListener('click', deleteMail);

// form işlemleri
function sendMail() {
  const recieverValue = receiverInput.value;
  const titleValue = titleInput.value;
  const descValue = descInput.value;

  if (!recieverValue || !titleValue || !descValue) {
    // bildirim
    Toastify({
      text: 'Lütfen Formu Doldurun',
      duration: 3000,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'rgb(193, 193, 0)',
        borderRadius: '4px',
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    return;
  }

  // eğerki inputlar doluysa

  const newMail = {
    id: data ? data.length + 1 : 1,
    sender: 'Furkan',
    reciever: recieverValue,
    title: titleValue,
    message: descValue,
    date: '10 May',
  };

  console.log(data);
  data.unshift(newMail);

  // veriyi güncelle
  const strData = JSON.stringify(data);
  localStorage.setItem('localData', strData);

  // ekranı güncelle

  renderMails(messages, data);

  showCreateMailModal(modal, false);
}

// mail silme
function deleteMail(e) {
  if (e.target.id !== 'buttons-del') return;

  // önce diziden silicez
  const deletingId = e.target.dataset.id;
  const filtred = data.filter((mail) => mail.id != deletingId);
  const strFiltred = JSON.stringify(filtred);
  localStorage.setItem('localData', strFiltred);

  // sonra ekrandan silicez
  const deletingMail = e.target.parentElement.parentElement.parentElement;
  deletingMail.remove();
}
