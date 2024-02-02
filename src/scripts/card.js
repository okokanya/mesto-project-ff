

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export const createCard = (card, removeFunction) => {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cards.querySelector('.card__delete-button');
  const cardImage = cards.querySelector('.card__image');
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cards.querySelector('.card__title').textContent = card.name;
  removeButton.addEventListener('click', removeFunction);
  return cards;
}

// Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.