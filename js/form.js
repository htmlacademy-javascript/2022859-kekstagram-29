import { isEscapeKey } from './utils.js';
import { form } from './form-validator.js';

const input = form.querySelector('.img-upload__input');
const formElement = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');
const bodyElement = document.querySelector('body');

const onCloseButtonClick = () => {
  formElement.classList.add('hidden');
  form.reset();

  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKey);
};

const onFormClick = () => {
  formElement.classList.remove('hidden');

  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKey);
  closeForm.addEventListener('click', onCloseButtonClick);
};

function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}

input.addEventListener('change', () => {
  onFormClick();
});


