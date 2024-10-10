// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function addLike(evt) {
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

// @todo: Функция создания карточки
export function createCard(dataCard, addLike, deleteCard, onCardClick, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".card__likes");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
 
  dataCard.likes.forEach((likesArray) => {
    if (likesArray._id === userDataId._id) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  cardElement.setAttribute("id", dataCard._id);
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  cardImage.addEventListener("click", function () {
    openPopupCard(dataCard);
  });
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

