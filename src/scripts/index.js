import './card.js';
import './modal.js';

import { createCard } from './card.js';
import { initialCards } from './data.js';

// @todo: Темплейт карточки
// const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// // @todo: Функция создания карточки
// const createCard = (card, removeFunction) => {
//   const cards = cardTemplate.querySelector('.card').cloneNode(true);
//   const removeButton = cards.querySelector('.card__delete-button');
//   const cardImage = cards.querySelector('.card__image');
//   cardImage.alt = card.name;
//   cardImage.src = card.link;
//   cards.querySelector('.card__title').textContent = card.name;
//   removeButton.addEventListener('click', removeFunction);
//   return cards;
// }

// @todo: Функция удаления карточки
const removeCard = evt => {
  const parentNodeToRemove = (evt.target).parentNode;
  parentNodeToRemove.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element, removeCard));
})