function showInputError (formItem, inputElement, errorMessage, inputErrorClass, errorClass) {
  console.log(inputElement);
  const errorElement = formItem.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError (formItem, inputElement, inputErrorClass, errorClass) {
  console.log('hideInputError');
  const errorElement = formItem.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};


// const isValid = (formElement, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//       // данные атрибута доступны у элемента инпута через ключевое слово dataset.
//       // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
//       // HTML мы писали в kebab-case, это не опечатка)
//   inputElement.setCustomValidity(inputElement.dataset.errorMessage);
// } else {
//   inputElement.setCustomValidity("");
// }

// if (!inputElement.validity.valid) {
//   showInputError(formElement, inputElement, inputElement.validationMessage);
// } else {
//   hideInputError(formElement, inputElement);
// }
// }; 

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

export function setEventListeners ( formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass ) {
  console.log('set');
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button-no-active",
//   inputErrorClass: "popup__input-error",
//   errorClass: "popup__text-error-active",
// };

export function enableValidation ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formArray = Array.from(document.querySelectorAll(formSelector));
  console.log(formArray);
  formArray.forEach((formItem) => {
    setEventListeners(
      formItem, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

export const clearValidation = (form, validationConfig) => {
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
  const button = form.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((input) => {
    hideInputError(form, input, validationConfig.inputErrorClass, validationConfig.errorClass
    );
  });
  button.disabled = true;
  button.classList.add(validationConfig.inactiveButtonClass);
};