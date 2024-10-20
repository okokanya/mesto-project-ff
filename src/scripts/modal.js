export function openModal(element) {
  element.classList.add('popup_opened');
//1)
//очистим инпуты после успешного добавления карточки
  const openedPopUp = document.querySelector('.popup_opened');
  const allInputs = [...openedPopUp.querySelectorAll('input')];
  for (let i = 0; i < allInputs.length; i++) {
    console.log(allInputs[i].value)
    allInputs[i].value = '';
  }
  document.addEventListener('keydown', closeWithEscape);
}
export function closeModal(element) {
  element.classList.add('popup_closed');
  setTimeout(() => element.classList.remove('popup_opened'),300);
  setTimeout(() => element.classList.remove('popup_closed'),300); 
  document.removeEventListener('keydown', closeWithEscape);
}

export function closeWithEscape(e) {
  if (e.key === 'Escape') {

    // открытый попап нужно находить только после нажатия на Escape внутри if-конструкции
    const element = document.querySelector('.popup_opened');
    closeModal(element);
  }
}
