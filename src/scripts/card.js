// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function addCard(card, userId, removeCard, addLike, handleOpenCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikes = cardElement.querySelector(".card__likes");
  cardElement.setAttribute("id", card._id);
  cardElement.setAttribute("owner_id",card.owner._id)
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikes.textContent = card.likes.length;
  const removeButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  removeButton.addEventListener('click', removeCard);
  if (userId !== card.owner._id) {
      removeButton.remove();
  }
  card.likes.forEach((item) => {
      if (item._id === userId) {
        likeButton.classList.add("card__like-button_is-active");
      }
    });
  cardImage.addEventListener("click",  function () {
      handleOpenCard(card);
    })
  likeButton.addEventListener("click", addLike)
  return cardElement;
};
