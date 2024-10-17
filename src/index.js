import './styles.css';
import { addCard } from "./scripts/card.js";
import { openModal, closeModal } from './scripts/modal.js';
import { initEditFormSubmitListener } from './scripts/editProfile.js';
import { postCard, getCards, getUserProfile, deleteCard, apiAddLike, apiDeleteLike, apiUpdateAvatar  } from './scripts/api.js'

const popupCard = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const formNewPlace = document.forms["newPlace"];
const formAddCard = document.forms.newPlace;
const buttonSubmitNewPlace = formAddCard.querySelector(".popup__button");
const profileImage = document.querySelector(".profile__image");
const userName = document.querySelector(".profile__title");
const placesList = document.querySelector('.places__list');

const userDescription = document.querySelector(".profile__description");
const nameNewPlace = formNewPlace.elements["placeName"];
const linkNewPlace = formNewPlace.elements["imageSrc"];

const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formUpdateAvatar = document.forms["change-avatar"];
const buttonSubmitUpdateAvatar = formUpdateAvatar.querySelector(".popup__button");
import { enableValidation, clearValidation } from "./scripts/validation.js";

let userId = "";
let userAvatar = "";

// // @todo: Вывести карточки на страницу

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

const formEditProfile = document.forms["editProfile"];
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const popupProfile = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener("click", function () {
  nameInput.value = userName.textContent; 
  jobInput.value = userDescription.textContent;
  // clearValidation(formEditProfile, validationConfig);
  openModal(popupProfile);
});



//avatar

profileImage.addEventListener("click", () => {
  // evt.preventDefault();
  // console.log('00');
  formUpdateAvatar.reset();
  clearValidation(formUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
  formUpdateAvatar.addEventListener("submit", updateAvatar);
});


function updateAvatar(evt) {
  evt.preventDefault();
  // buttonSubmitUpdateAvatar.textContent = "Сохранение...";
  apiUpdateAvatar(formUpdateAvatar.avatar.value)
    .then((res) => {
      profileImage.removeAttribute("style");
      profileImage.setAttribute("style", `background-image:url(${res.avatar})`);
      closeModal(popupUpdateAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // buttonSubmitUpdateAvatar.textContent = "Сохранить";
    });
}



function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  buttonSubmitEditProfile.textContent = "Сохранение...";
  updateProfile(nameInput.value, jobInput.value)
    .then((res) => {
      userName.textContent = nameInput.value;
      userDescription.textContent = jobInput.value;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitEditProfile.textContent = "Сохранить";
    });
}

export function handleOpenCard(card){
  openModal(popupCard);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

initEditFormSubmitListener();
// iniAddFormSubmitListener()


function onCardClick(evt) {
  openModal(document.querySelector('.popup_type_image')); 
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

function addLike(evt) {
  const card = evt.target.closest(".card");
  const likebox = card.querySelector(".card__likes");
  if (evt.target.closest(".card__like-button_is-active")) {
    console.log("id:", card._id);
    apiDeleteLike(card.id)
      .then((res) => {
        console.log("LIKE", res);
        likebox.textContent = res.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  } else {
    apiAddLike(card.id)
      .then((res) => {
        console.log("LIKE", res);
        likebox.textContent = res.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


function addNewCard(evt) {
  evt.preventDefault();
  buttonSubmitNewPlace.textContent = "Сохранение...";
  const dataCard = {
    name: nameNewPlace.value,
    link: linkNewPlace.value,
    likes: [],
  };
  dataCard.owner = { "_id": userId };

  postCard(dataCard)
    .then((res) => {
      placesList.prepend(addCard(res, userId, removeCard, addLike, handleOpenCard));
      formNewPlace.reset();
      closeModal(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitNewPlace.textContent = "Сохранить";
    });
}
formAddCard.addEventListener("submit", addNewCard);


function removeCard(evt) {
  evt.preventDefault();
  deleteCard(evt.target.closest(".card").id)
    .then(() => {
      evt.target.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}




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
//загрузим с сервера карточки
loadInitialData();
