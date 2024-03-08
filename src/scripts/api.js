
import { createCard } from './card';
const placesList = document.querySelector('.places__list');
const formElementEditProfile = document.forms["editProfile"];
const submitEditProfileButton = formElementEditProfile.querySelector(".button");


const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: 'db2f39af-180e-4eb9-8615-3688481eaf22',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
    return fetch(config.baseUrl + `/cards`, {
      headers: {
        authorization: config.headers.authorization
      }
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error(err); // выводим ошибку в консоль
    }); 
  };



// Токен: db2f39af-180e-4eb9-8615-3688481eaf22
// Идентификатор группы: cohort-magistr-2
// GET https://nomoreparties.co/v1/cohortId/users/me 

export const getUserData = () => {
  return fetch(config.baseUrl + `/users/me`, {
    headers: {
      authorization: config.headers.authorization
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
const inputTypeName = document.querySelector(".popup__input_type_name");
const inputTypeDescriprion = document.querySelector('.popup__input_type_description');

function setProfileAndCards() {
  Promise.all([getUserData(), getInitialCards()])
    .then(([userData, cardsData]) => {
      const userDataId = userData._id;
      const userDataName = userData.name;
      const userDataAbout = userData.about;
      const userDataAvatar = userData.avatar;
      profileTitle.textContent = userDataName;
      inputTypeName.value = profileTitle.textContent;
      profileDescription.textContent = userDataAbout;
      inputTypeDescriprion.value = profileDescription.textContent;

      profileImage.setAttribute("style", `background-image:url(${userDataAvatar})`);
      // console.log(cardsData);
      cardsData.forEach((card) => {
        // console.log(card);
        placesList.append(createCard(card, userDataId));
      });
    })
    .catch((err) => {
      console.warn(err);
    })
    .finally(() => {});
}

setProfileAndCards();


export const postNewCard = (dataCard) => {
  console.log('dataCard');
  return fetch(config.baseUrl + `/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: dataCard.name,
      link: dataCard.link,
    }),
  })
  .then((res) => {
    return res;
  })
};


export const updateUserInfo = (profileName, profileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  })
    .then((res) => {
      return res.json();
    })
};

function submitEditProfile(evt) {
  evt.preventDefault();
  submitEditProfileButton.textContent = "Сохранение...";
  updateUserInfo(
    formElementEditProfile.name.value,
    formElementEditProfile.description.value
  )
    .then(() => {
      console.log('ok')
      profileTitle.textContent = formElementEditProfile.name.value;
      profileDescription.textContent = formElementEditProfile.description.value;
      // closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitEditProfileButton.textContent = "Сохранить";
    });
}

formElementEditProfile.addEventListener("submit", submitEditProfile);