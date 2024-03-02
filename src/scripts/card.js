// import { setProfileAndCards } from './api';
// const placesList = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(dataCard, userId) {
  console.log(dataCard);
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".card__likes");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  console.log(userId);
  console.log(dataCard.owner._id);
  if (userId !== dataCard.owner._id) {
    deleteButton.remove();
  }
  dataCard.likes.forEach((arrayLike) => {
    if (arrayLike._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  cardElement.setAttribute("id", dataCard._id);
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  cardLikes.textContent = dataCard.likes.length;

  // deleteButton.addEventListener("click", deleteCard);
  // likeButton.addEventListener("click", addLike);
  // cardImage.addEventListener("click", function () {
  //   openPopupCard(dataCard);
  // });
  console.log(cardElement);
  return cardElement;
}


// const arr = createCard(dataCard);
// arr.forEach(function (element) {
//   placesList.append(createCard(element, removeCard, toggleLike, onCardClick));
// })

// @todo: Вывести карточки на страницу
// const placesList = document.querySelector('.places__list');


// export const createCard = (card, removeFunction, likeHandler, onCardClick) => {
//   const cards = cardTemplate.querySelector('.card').cloneNode(true);
//   const removeButton = cards.querySelector('.card__delete-button');
//   const cardImage = cards.querySelector('.card__image');
//   cardImage.addEventListener('click', onCardClick);

//   const likeButton = cards.querySelector('.card__like-button');
//   likeButton.addEventListener('click', likeHandler);
//   cardImage.alt = card.name;
//   cardImage.src = card.link;
//   cards.querySelector('.card__title').textContent = card.name;
//   removeButton.addEventListener('click', removeFunction);
//   return cards;
// }

// @todo: Функция удаления карточки
export const removeCard = evt => {
  const parentNodeToRemove = (evt.target).parentNode;
  parentNodeToRemove.remove();
}

export function toggleLike(){
  this.classList.toggle('card__like-button_is-active');
};
