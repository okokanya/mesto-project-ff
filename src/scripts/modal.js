import { handleFormSubmit } from './editProfile.js';
import { addCard } from './addCard.js';

export function openModal(domElement, evt) {
  const popUpToOpen = document.querySelector('.' + domElement);
  popUpToOpen.classList.add('fadeInPopupAnitaion');
  popUpToOpen.id = 'active';
  popUpToOpen.style.display = 'flex';
  document.addEventListener('keydown', closeWithEscape);


  if (domElement === 'popup_type_image') {
    const popUpToOpen = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const imgSourse = evt.target.src;
    const titleSourse = evt.target.alt;
    popupImage.src = imgSourse;
    popupCaption.innerHTML = titleSourse;
    // document.addEventListener('keydown', closeWithEscape);
    setTimeout(() => popUpToOpen.classList.remove('fadeInPopupAnitaion'), 500);
  }
  if (domElement === 'popup_type_edit') {
    handleFormSubmit(evt);
  };
  if (domElement === 'popup_type_new-card') {
    addCard(evt);
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
  if (e.keyCode === 27) {
    console.log('27');
    closeModal();
  }
}

