// import { setProfileAndCards } from './api';
// const placesList = document.querySelector('.places__list');
// import { forEach } from "core-js/core/array";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(dataCard, addLike, deleteCard, onCardClick, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".card__likes");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  console.warn(dataCard);
  // console.warn( dataCard._id);
  // if (userDataId !== userDataId._id) {
  //   deleteButton.remove();
  // }
  dataCard.likes.forEach((likesArray) => {
    if (likesArray._id === userDataId._id) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  cardElement.setAttribute("id", dataCard._id);
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  // cardLikes.textContent = dataCard.likes.length;

  // !!!deleteButton.addEventListener("click", deleteCard);
  // !!!likeButton.addEventListener("click", addLike);
  cardImage.addEventListener("click", function () {
    openPopupCard(dataCard);
  });
  // console.log(cardElement);
  return cardElement;
}


// @todo: Функция удаления карточки
export const removeCard = evt => {
  const parentNodeToRemove = (evt.target).parentNode;
  parentNodeToRemove.remove();
}

export function toggleLike(){
  this.classList.toggle('card__like-button_is-active');
};
