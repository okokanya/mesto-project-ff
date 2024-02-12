import { createCard, removeCard, toggleLike } from './card';
import { closeModal } from './modal';

function getNewData () { 
  const newPlace = document.forms.newPlace; 
  const newPlaceName = newPlace.placeName.value; 
  const newPlaceSrc = newPlace.imageSrc.value;
  const newData = {
     name: newPlaceName,
     link: newPlaceSrc
   };
  return newData;
}

function createNewCard(e) {
  e.preventDefault();
  const newCard = createCard(getNewData(), removeCard, toggleLike);
  newPlace.reset();
  const placesList = document.querySelector('.places__list');
  placesList.prepend(newCard);
  closeModal(document.querySelector('.popup_opened'));
}

export function addCard() {
  document.forms.newPlace.addEventListener('submit', createNewCard);
}
