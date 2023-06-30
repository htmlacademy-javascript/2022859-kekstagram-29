import './render-post.js';
import { isEscapeKey } from './util.js';
import { createPosts } from './data.js';
// import { renderComment } from './create-element.js';// вроде понадобится

const getPosts = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const closeBigPhoto = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likeCount = document.querySelector('.likes-count');
const commentCount = document.querySelector('.comments-count');
const blockCount = document.querySelector('.social__comment-count');// Пока что нужно(временное скрытие)
const loadBtn = document.querySelector('.comments-loader');/// Пока что нужно(временное скрытие)
const commentsDescription = document.querySelector('.social__caption');

//Закрытие модального окна
const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

//ESC
const onDocumentKey = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureModal();
  }
};// еще раз посмотреть про эту функцию

//Открытие модального окна
const openPictureModal = () => {
  document.body.classList.add('modal-open');// добавляем класс body
  bigPicture.classList.remove('hidden');//Удаляем модальному окно класс
  document.addEventListener('keydown', onDocumentKey);//ESC
  blockCount.classList.add('hidden');//Временное скрытие
  loadBtn.classList.add('hidden');//Временное скрытие
  closeBigPhoto.addEventListener('click', closePictureModal);//Добавляем закрытие по нажатию на крестик
};

closeBigPhoto.addEventListener('keydown', () => {
  if (isEscapeKey()) {
    closePictureModal();
  }
});// закрытие на ESC

//Создаем модальное окно (наполняем)
const createPictureModal = (postId) => {
  const currentPost = createPosts.find((photo) => photo.id === Number(postId));// Выдергиваем элемент из массива с данными
  const {url, likes, comments, description} = currentPost;//Записываем данные
  bigPictureImg.src = url;//Передаем
  likeCount.textContent = likes;//Передаем
  commentCount.textContent = comments.length;//Передаем
  commentsDescription.textContent = description;//Передаем
};

//Перебираем массив с данными
getPosts.forEach((item) => {
  //Добавляем события
  item.addEventListener('click', (evt) => {
    const itemId = evt.currentTarget.id;// ищем id элемента по которому кликнул
    openPictureModal();//открываем модалку
    createPictureModal(itemId);//Передаем id в функцию создания окна
  });
});


