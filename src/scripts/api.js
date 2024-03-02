
import { createCard } from './card';
const placesList = document.querySelector('.places__list');

// Токен: db2f39af-180e-4eb9-8615-3688481eaf22
// Идентификатор группы: cohort-magistr-2
// GET https://nomoreparties.co/v1/cohortId/users/me 

// карточки
export const getCardsData = () => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
    headers: {
      authorization: 'db2f39af-180e-4eb9-8615-3688481eaf22'
    }
  })
    .then(res => res.json())
    .then((result) => {
      return(result);
    }); 
};

export const getUserData = () => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
    headers: {
      authorization: 'db2f39af-180e-4eb9-8615-3688481eaf22'
    }
  })
    .then(res => res.json())
    .then((result) => {
      return result;
    }); 
};

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

function setProfileAndCards() {
  Promise.all([getUserData(), getCardsData()])
    .then(([userData, cardsData]) => {
      const userDataId = userData._id;
      const userDataName = userData.name;
      const userDataAbout = userData.about;
      const userDataAvatar = userData.avatar;
      profileTitle.textContent = userDataName;
      profileDescription.textContent = userDataAbout;
      profileImage.setAttribute("style", `background-image:url(${userDataAvatar})`);
      console.log(cardsData);
      cardsData.forEach((card) => {
        console.log(card);
        placesList.append(createCard(card, userDataId));
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}

setProfileAndCards();