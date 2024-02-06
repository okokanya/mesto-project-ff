
const formElement = document.forms.editProfile;
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
import { closeModal } from './modal.js';

formElement.name.value = nameInput.textContent;
formElement.description.value = jobInput.textContent;

export function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.innerHTML = formElement.name.value;
  jobInput.innerHTML = formElement.description.value;
  document.querySelector('.popup__button').addEventListener('click', closeModal);
}

formElement.addEventListener('submit', handleFormSubmit);
