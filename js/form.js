import { isEscapeKey } from './utils.js';

const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const formElement = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');
const bodyElement = document.querySelector('body');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const isValidHashtag = (value) => {
  const hashtagValid = /^#[a-zа-я0-9]{1,19}$/i;
  return hashtagValid.test(value);
};

const isValidDescription = (value) => value.length <= 140;

pristine.addValidator(
  form.querySelector('.text__description'),
  isValidDescription,
  'The maximum comment length is 140 characters'
);


pristine.addValidator(
  form.querySelector('.text__hashtags'),
  isValidHashtag,
  'The hashtag should start with the sign #'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

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


