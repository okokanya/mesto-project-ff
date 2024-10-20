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
    headers: config.headers,
  }).then((res)=>onResponce(res));
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res)=>onResponce(res));
};

export const updateProfile = (profileName, profileAbout) => {
  return fetch(`${baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  })
    .then((res)=>onResponce(res))
};

export const apiAddLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res)=>onResponce(res))
};

export const apiDeleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res)=>onResponce(res))
};

export const postCard = (dataCard)=>{
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: dataCard.name,
      link: dataCard.link,
    }),
  })
    .then((res)=>onResponce(res))
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  })
  .then((res)=>onResponce(res))
};

export const updateUserInfo = (profileName, profileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  })
    .then((res) => {
      return res.json();
    })
};

export const apiUpdateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
  .then((res)=>onResponce(res))
};
