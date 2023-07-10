const form = document.querySelector('.img-upload__form');

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

export { pristine, form };
