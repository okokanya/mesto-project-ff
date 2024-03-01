import './scripts/data.js';
import './scripts/card.js';
import './styles.css';
import { openModal, closeModal } from './scripts/modal.js';
import { iniAddFormSubmitListener } from './scripts/addCard.js';
import { createCard, removeCard, toggleLike } from './scripts/card.js';
import { initialCards } from './scripts/data.js';
import { initEditFormSubmitListener } from './scripts/editProfile.js';
import { enableValidation } from './scripts/validation.js';

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach(function (element) {
  placesList.append(createCard(element, removeCard, toggleLike, onCardClick));
})

initEditFormSubmitListener();
iniAddFormSubmitListener()

function onCardClick(evt) {
  openModal(document.querySelector('.popup_type_image')); 
  const popupImage = document.querySelector('.popup__image'); 
  const popupCaption = document.querySelector('.popup__caption'); 
  const imgSourse = evt.target.src; 
  const titleSourse = evt.target.alt; 
  popupImage.src = imgSourse; 
  popupCaption.textContent = titleSourse;
}

function clickHandler(evt) {
  // редактируем профиль
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(document.querySelector('.popup_type_edit'));
  };

  // добавим карточку
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(document.querySelector('.popup_type_new-card'));
  }

  //клик по кнопке закрытия
  if (evt.target.classList.contains('popup__close')) {
    const popUpToClose = document.querySelector('.popup_opened');
    closeModal(popUpToClose);
  }

  //клик по оверлею
  if (evt.target.classList.contains('popup_opened')) {
    closeModal(evt.target);
  }
}

document.addEventListener('click', clickHandler);


// объект для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-no-active",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__text-error-active",
};

// запустим валидацию
enableValidation(validationConfig); 