// importlar
import { data } from './constants.js';
import { renderMails } from './ui.js';
import { showCreateMailModal } from './ui.js';

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
    id: data.length + 1,
    sender: 'Furkan',
    reciever: recieverValue,
    title: titleValue,
    message: descValue,
    date: '10 May',
  };

  data.unshift(newMail);

  renderMails(messages, data);

  showCreateMailModal(modal, false);
}
