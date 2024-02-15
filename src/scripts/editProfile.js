import { closeModal } from "./modal";

const formElement = document.forms.editProfile;
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
formElement.name.value = nameInput.textContent;
formElement.description.value = jobInput.textContent;

export function editProfile(){
  nameInput.textContent = formElement.name.value;
  jobInput.textContent = formElement.description.value;
  closeModal(document.querySelector('.popup_opened'));
}

export function handleSubmit(e) {
  e.preventDefault();
  editProfile();
}

export function initEditFormSubmitListener() {
  formElement.addEventListener('submit', handleSubmit);
}
