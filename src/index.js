import './scripts/data.js';
import './scripts/card.js';
import './styles.css';
import { addCard } from "./scripts/card.js";
import { openModal, closeModal } from './scripts/modal.js';
import { iniAddFormSubmitListener } from './scripts/addCard.js';
import { createCard, removeCard, addLike } from './scripts/card.js';
import { initEditFormSubmitListener } from './scripts/editProfile.js';
import { enableValidation } from './scripts/validation.js';
import { postNewCard, getCards, getUserProfile, getInitialCards } from './scripts/api.js'
const formAddCard = document.forms.newPlace;

const profileImage = document.querySelector(".profile__image");

const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");
let userId = "";
let userAvatar = "";


const buttonSubmitAddCard = formAddCard.querySelector(".popup__button");

// // @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');

function loadInitialData() {
  Promise.all([getUserProfile(), getCards()])
    .then((res) => {
      console.log(res);
      userName.textContent = res[0].name;
      userDescription.textContent = res[0].about;
      userId = res[0]._id;
      userAvatar = res[0].avatar;
      profileImage.setAttribute("style", `background-image:url(${userAvatar})`);
      const initialCards = res[1];
      initialCards.forEach(function (item) {
        const card = {
          name: item.name,
          link: item.link,
          likes: item.likes,
          _id: item._id,
          owner: { _id: item.owner._id },
        };
        placesList.append(addCard(card, userId, removeCard, addLike, handleOpenCard));
      });
    })
    .catch((err) => {
      console.log("Ошибка: " + err);
    });
}
loadInitialData();
export function handleOpenCard(card){
  openModal(popupCard);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}


// initialCards.forEach(function (element) {
//   placesList.append(createCard(element, removeCard, toggleLike, onCardClick));
// })
// const getUserInfoBasic () {
// }
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


function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  buttonSubmitAddCard.textContent = 'Сохранение...';
  const placeName = formAddCard.elements.placeName;
  // console.log(placeName.value);
  const dataCard = {
    name: formAddCard["placeName"].value,
    link: formAddCard["imageSrc"].value,
    likes: [],
    // owner: { _id: userId}
  };

  // dataCard.owner = { _id: userId };
  // console.log('dataCard - ' + dataCard);
  // dataCard.owner = { _id: userId };

  postNewCard(dataCard)
    .then((res) => {
      placesList.prepend(
        createCard(res, handelAddLike, deleteCard, onCardClick, userId)
      );
      closePopup(popupAddNewCard);
      formAddCard.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonSubmitAddCard.textContent = "Сохранить";
    });
}

formAddCard.addEventListener("submit", handleFormSubmitAddCard);


console.log(getInitialCards());
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

