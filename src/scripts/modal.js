export function openModal(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEscape);
}

export function closeModal(element) {
  element.classList.add('popup_closed');
  setTimeout(() => element.classList.remove('popup_opened'),300);
  setTimeout(() => element.classList.remove('popup_closed'),300); 
  document.removeEventListener('keydown', closeWithEscape);
}

export function closeWithEscape(e) {
  const element = document.querySelector('.popup_opened');
  if (e.key === 'Escape') {
    closeModal(element);
  }
}
