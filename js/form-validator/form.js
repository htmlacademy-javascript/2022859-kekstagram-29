import { isEscapeKey } from '../utils.js';
import { resetScaleValue } from './scale.js';
import { hidenSlider, addEffect, removeEffects } from './slider.js';

const submitButton = document.querySelector('.img-upload__submit');
const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const formElement = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const ErrorText = {
  UNIQUE: 'Hashtags should not be repeated',
  LENGTH: `Maximum number of hashtags ${MAX_COUNT_HASHTAGS}`,
  SYMBOL: 'The hashtag should start with the sign #'
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const normalizeString = (str) => str.trim().split(' ').filter((tag) => Boolean(tag.length));
const isValidHashtag = (value) => normalizeString(value).every((tag) => VALID_SYMBOLS.test(tag));
const isValidCountHashtags = (value) => normalizeString(value).length <= MAX_COUNT_HASHTAGS;
const isValidDescription = (value) => value.length <= 140;
const isValidUniqueHashtag = (value) => {
  const uniqHashtags = normalizeString(value).map((tag) => tag.toLowerCase());
  return uniqHashtags.length === new Set(uniqHashtags).size;
};

pristine.addValidator(
  description,
  isValidDescription,
  'The maximum comment length is 140 characters'
);


pristine.addValidator(
  hashtag,
  isValidUniqueHashtag,
  ErrorText.UNIQUE,
  1,
  true
);

pristine.addValidator(
  hashtag,
  isValidHashtag,
  ErrorText.SYMBOL,
  2,
  true
);

pristine.addValidator(
  hashtag,
  isValidCountHashtags,
  ErrorText.LENGTH,
  3,
  true
);


form.addEventListener('input', () => {
  submitButton.disabled = !pristine.validate();
});

const onCloseButtonClick = () => {
  form.reset();
  pristine.reset();
  removeEffects();
  resetScaleValue();
  formElement.classList.add('hidden');

  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKey);
};

const onFormClick = () => {
  hidenSlider();
  formElement.classList.remove('hidden');

  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKey);
  closeForm.addEventListener('click', onCloseButtonClick);
};

const cancellationOfSending = () => {
  hashtag.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  description.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
};


function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
    cancellationOfSending();
  }
}

const onCloseModalPreview = (evt) => {
  evt.preventDefault();
  pristine.validate();
  onCloseButtonClick();
};

const initImage = () => {
  form.addEventListener('submit', onCloseModalPreview);
  input.addEventListener('change', onFormClick);
  addEffect();
};

export { initImage };

