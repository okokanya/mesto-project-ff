// Работу модальных окон — в файл modal.js. Оттуда экспортируйте функции openModal 
// и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

const placesList = document.querySelector('.places__list');
placesList.addEventListener('click', openModal);


function openModal(evt) {
  console.log(evt.target)
}


