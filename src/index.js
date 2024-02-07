import './scripts/data.js';
import './scripts/card.js';
import './styles.css';
import { openModal, closeModal } from './scripts/modal.js';
import { addCard } from './scripts/addCard.js'
let popUpToOpen = '';
let popUpToClose = '';

function clickHandler(evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    popUpToOpen = 'popup_type_edit';
    openModal(popUpToOpen, evt);
  };

  if (evt.target.classList.contains('profile__add-button')) {
    popUpToOpen = 'popup_type_new-card';
    openModal(popUpToOpen, evt);
  }
  
  if (evt.target.classList.contains('card__image')) {
    popUpToOpen = 'popup_type_image';
    openModal(popUpToOpen, evt);
  }

  if (evt.target.classList.contains('popup__close')) {
    closeModal(popUpToClose, evt);
  }

  if (evt.target.id ==='active') {
    setTimeout(() => closeModal(popUpToClose, evt), 50);
  }
}
document.addEventListener('click', clickHandler);
