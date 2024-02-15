const placesList = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export const createCard = (card, removeFunction, likeHandler, onCardClick) => {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cards.querySelector('.card__delete-button');
  const cardImage = cards.querySelector('.card__image');
  cardImage.addEventListener('click', onCardClick);

  const likeButton = cards.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeHandler);
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cards.querySelector('.card__title').textContent = card.name;
  removeButton.addEventListener('click', removeFunction);
  return cards;
}

// @todo: Функция удаления карточки
export const removeCard = evt => {
  const parentNodeToRemove = (evt.target).parentNode;
  parentNodeToRemove.remove();
}

export function toggleLike(){
  this.classList.toggle('card__like-button_is-active');
};
