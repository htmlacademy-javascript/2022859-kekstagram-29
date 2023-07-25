import { isEscapeKey } from './utils.js';
import { resetScaleValue } from './form-validator/scale.js';
import { initEffect } from './form-validator/effect.js';
import { pristineReset, isElementFocused } from './form-validator/form.js';

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const formElement = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');
const effectList = form.querySelector('.effects__list');
const currentEffect = effectList.querySelector('input:checked').value;

const closeModalForm = () => {
  form.reset();
  resetScaleValue();
  pristineReset();
  formElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKey);
  closeForm.removeEventListener('click', closeModalForm);
  initEffect(currentEffect);
};

const onClickButtonClose = () => closeModalForm();
const onEffectClick = (evt) => initEffect(evt.target.value);

const openModalForm = () => {
  initEffect(currentEffect);
  formElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKey);
  closeForm.addEventListener('click', onClickButtonClose);
  effectList.addEventListener('change', onEffectClick);
};


function onDocumentKey (evt) {
  const error = document.querySelector('.error');
  if (isEscapeKey(evt) && !isElementFocused() && !error) {
    evt.preventDefault();
    closeModalForm();
  }
}


export { openModalForm, closeModalForm };
