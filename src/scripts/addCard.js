import { createCard, removeCard } from './card';
import { closeModal } from './modal';

const newdata = {name: '', link: ''};

function getNewData () {
  const newPlace = document.forms.newPlace;
  const newPlaceName = newPlace.placeName.value;
  const newPlaceSrc = newPlace.imageSrc.value;
  newdata.name = newPlaceName;
  newdata.link = newPlaceSrc;
  return newdata;
}

export function addCard(evt) {
  const activePopUp = document.querySelector('#active');
  activePopUp.querySelector('.popup__button').addEventListener('click', createNewCard);
}

function createNewCard(evt) {
  evt.preventDefault();
  getNewData();
  const newCard = createCard(newdata, removeCard);
  newPlace.reset();
  const placesList = document.querySelector('.places__list');
  placesList.insertBefore(newCard, document.querySelector('.places__item'));
  closeModal();
}
