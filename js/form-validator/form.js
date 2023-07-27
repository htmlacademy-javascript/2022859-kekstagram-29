import { openModalForm } from '../upload.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const VALIDATOR_PARAMS = {
  hashtagSymbols: {
    isValid: (value) => normalizeString(value).every((tag) => VALID_SYMBOLS.test(tag)),
    errorText: 'The hashtag should start with the sign #'
  },
  hashtagUnique: {
    isValid: (value) => {
      const uniqHashtags = normalizeString(value).map((tag) => tag.toLowerCase());
      return uniqHashtags.length === new Set(uniqHashtags).size;
    },
    errorText: 'Hashtags should not be repeated'
  },
  hashtagLength: {
    isValid:  (value) => normalizeString(value).length <= MAX_COUNT_HASHTAGS,
    errorText: `Maximum number of hashtags ${MAX_COUNT_HASHTAGS}`
  },
  descriptionLength: {
    isValid: (value) => value.length <= 140,
    errorText: 'The maximum comment length is 140 characters'
  }
};
const SubmitButtonText = {
  DEFAULT: 'Отправить',
  LOADING: 'Отправляю...'
};
const submitButton = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');

function normalizeString (str) {
  return str.trim().split(' ').filter((tag) => Boolean(tag.length));
}

const onClickButtonForm = () => openModalForm();

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(
  description,
  VALIDATOR_PARAMS.descriptionLength.isValid,
  VALIDATOR_PARAMS.descriptionLength.errorText
);

pristine.addValidator(
  hashtag,
  VALIDATOR_PARAMS.hashtagUnique.isValid,
  VALIDATOR_PARAMS.hashtagUnique.errorText,
  1,
  true
);

pristine.addValidator(
  hashtag,
  VALIDATOR_PARAMS.hashtagSymbols.isValid,
  VALIDATOR_PARAMS.hashtagSymbols.errorText,
  2,
  true
);

pristine.addValidator(
  hashtag,
  VALIDATOR_PARAMS.hashtagLength.isValid,
  VALIDATOR_PARAMS.hashtagLength.errorText,
  3,
  true
);

const pristineReset = () => pristine.reset();

form.addEventListener('input', () => {
  submitButton.disabled = !pristine.validate();
});

const isElementFocused = () => document.activeElement === hashtag || document.activeElement === description;

const toggleSubmit = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.LOADING : SubmitButtonText.DEFAULT;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmit(true);
      await onSuccess(new FormData(form));
      toggleSubmit();
    }
  });

  input.addEventListener('change',() => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
      effects.forEach((item) => (item.style.backgroundImage = `url(${preview.src})`));
    }
    onClickButtonForm();
  });
};

export { setFormSubmit, pristineReset, isElementFocused };

