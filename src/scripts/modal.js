// Работу модальных окон — в файл modal.js. Оттуда экспортируйте функции openModal 
// и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

import { handleFormSubmit } from './editProfile.js';
import { addCard } from './addCard.js';


export function openModal(domElement, evt) {
  const popUpToOpen = document.querySelector('.' + domElement);
  console.log(popUpToOpen);
  popUpToOpen.classList.add('fadeInPopupAnitaion');
  popUpToOpen.id = 'active';
  popUpToOpen.style.display = 'flex';

  console.log(domElement);
  if (domElement === 'popup_type_image') {
    const popUpToOpen = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const imgSourse = evt.target.src;
    const titleSourse = evt.target.alt;
    popupImage.src = imgSourse;
    popupCaption.innerHTML = titleSourse;
    document.addEventListener('keydown', closeWithEscape);
    setTimeout(() => popUpToOpen.classList.remove('fadeInPopupAnitaion'), 500);
  }
  if (domElement === 'popup_type_edit') {
    handleFormSubmit(evt);
  };
  if (domElement === 'popup_type_new-card') {
    addCard(evt);
    // document.querySelector('.popup__button').addEventListener('click', addCard)
    // document.querySelector('.popup__button').addEventListener('click', console.log('addCard'));


  }
}

export function closeModal() {
  const popUpToClose = document.querySelector('#active');
  popUpToClose.classList.add('fadeOutPopoutAnitaion');
  setTimeout(() => popUpToClose.style.display = 'none', 400);
  popUpToClose.id = '';
  setTimeout(() => popUpToClose.classList.remove('fadeOutPopoutAnitaion'),700);
  document.removeEventListener('keydown', closeWithEscape);
}

export function closeWithEscape(e) {
  // const popUpToClose = document.querySelector('#active');
  if (e.keyCode === 27) {
    closeModal();
    // popUpToClose.classList.add('fadeOutPopoutAnitaion');
    // setTimeout(() => popUpToClose.style.display = 'none', 500);
    // setTimeout(() => popUpToClose.classList.remove('fadeOutPopoutAnitaion'), 700);
    // popUpToClose.id = '';
  }
}

