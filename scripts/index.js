const placesList = document.querySelector('.places__list');
function cardCreate (cardItems) {
  cardItems.forEach((cardItem) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardItem.name;
    cardElement.querySelector('.card__image').src = cardItem.link;
    cardElement.querySelector('.card__image').alt = cardItem.name;
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function (event) {
      const parent = (event.target).parentNode;
      cardRemove(parent)
    })
    placesList.append(cardElement);
    console.log(cardItem);
  })
}

function cardRemove(cardItem) {
  cardItem.style = "display: none";
}

cardCreate(initialCards);