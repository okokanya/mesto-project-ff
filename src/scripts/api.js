
import { createCard } from './card';
const placesList = document.querySelector('.places__list');
const formElementEditProfile = document.forms["editProfile"];
const submitEditProfileButton = formElementEditProfile.querySelector(".button");

// Токен: db2f39af-180e-4eb9-8615-3688481eaf22
// Идентификатор группы: cohort-magistr-2
// GET https://nomoreparties.co/v1/cohortId/users/me 

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: 'db2f39af-180e-4eb9-8615-3688481eaf22',
    'Content-Type': 'application/json'
  }
}
const onResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res)=>onResponce(res));
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  }).then((res)=>onResponce(res));
};


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

export const apiAddLike = (cardId) => {
  return fetch(`${baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: authToken,
        "Content-Type": "application/json",
    },
  })
  .then((res)=>onResponce(res))
};


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