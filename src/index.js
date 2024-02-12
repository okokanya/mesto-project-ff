import './scripts/data.js';
import './scripts/card.js';
import './styles.css';
import { openModal, closeModal } from './scripts/modal.js';
import { addCard } from './scripts/addCard.js';
import { createCard, removeCard, toggleLike } from './scripts/card.js';
import { initialCards } from './scripts/data.js';
import { initEditFormSubmitListener } from './scripts/editProfile.js';

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach(function (element) {
  placesList.append(createCard(element, removeCard, toggleLike));
})


function clickHandler(evt) {
  // редактируем профиль
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(document.querySelector('.popup_type_edit'));
    initEditFormSubmitListener();
  };

  // добавим карточку
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(document.querySelector('.popup_type_new-card'));
    addCard();
  }
  //откроем картинку
  if (evt.target.classList.contains('card__image')) {
    openModal(document.querySelector('.popup_type_image'));
    const popUpToOpen = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const imgSourse = evt.target.src;
    const titleSourse = evt.target.alt;
    popupImage.src = imgSourse;
    popupCaption.innerHTML = titleSourse;
  }

  //клик по кнопке закрытия
  if (evt.target.classList.contains('popup__close')) {
    const popUpToClose = document.querySelector('.popup_opened');
    closeModal(popUpToClose);
  }

  //клик по оверлею
  if (evt.target.classList.contains('popup_opened')) {
    const popUpToClose = document.querySelector('.popup_opened');
    closeModal(popUpToClose);
  }
}

document.addEventListener('click', clickHandler);
