// ekrana mailleri basma
export function renderMails(messages, data) {
  messages.innerHTML = data
    .map(
      (d) => `
<div class="mail">
  <div class="mail-left">
    <div class="check check_2">
      <input type="checkbox">
    </div>
    <ion-icon name="star-outline" class="hover star"></ion-icon>
    <span>${d.sender}</span>
  </div>
  <div class="mail-right">
    <div class="mail-title">${d.title}</div>
    <div class="mail-content">${d.message}</div>
    <div class="mail-date">${d.date}</div>
  </div>
</div>`
    )
    .join(' ');
}

// ekrana mail oluşturma penceresi açma
export function showCreateMailModal(modal, willOpen) {
  modal.style.display = willOpen ? 'grid' : 'none';
}
