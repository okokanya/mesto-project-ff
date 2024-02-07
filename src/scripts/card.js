import { initialCards } from './data.js';

const placesList = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export const createCard = (card, removeFunction, likeHandler) => {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cards.querySelector('.card__delete-button');
  const cardImage = cards.querySelector('.card__image');
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
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element, removeCard, toggleLike));
})
