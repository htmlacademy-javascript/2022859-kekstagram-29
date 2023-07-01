
import { isEscapeKey } from './utils.js';
import { createPosts } from './data.js';
import { renderThumbnail } from './gallery.js';
// import { createComment } from './create-element.js';// вроде понадобится
renderThumbnail(createPosts);

const posts = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const closeModal = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likeCount = document.querySelector('.likes-count');
const commentCount = document.querySelector('.comments-count');
const blockCount = document.querySelector('.social__comment-count');// Пока что нужно(временное скрытие)
const loadButton = document.querySelector('.comments-loader');/// Пока что нужно(временное скрытие)
const commentsDescription = document.querySelector('.social__caption');
// const commentsList = document.querySelector('.social__list');

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


//комент

// const renderComment = () => {
//   commentsList.innerHTML = '';
// };

//Открытие модального окна
const openPictureModal = () => {
  document.body.classList.add('modal-open');// добавляем класс body
  bigPicture.classList.remove('hidden');//Удаляем модальному окно класс
  document.addEventListener('keydown', onDocumentKey);//ESC
  blockCount.classList.add('hidden');//Временное скрытие
  loadButton.classList.add('hidden');//Временное скрытие
  closeModal.addEventListener('click', closePictureModal);//Добавляем закрытие по нажатию на крестик
};

closeModal.addEventListener('keydown', () => {
  if (isEscapeKey()) {
    closePictureModal();
  }
});// закрытие на ESC

//Создаем модальное окно (наполняем)
const createPictureModal = (postId) => {
  const currentPost = createPosts.find((photo) => photo.id === Number(postId));// Выдергиваем элемент из массива с данными
  const {url, likes, comments, description} = currentPost;
  bigPictureImg.src = url;
  likeCount.textContent = likes;
  commentCount.textContent = comments.length;
  commentsDescription.textContent = description;
};

//Перебираем массив с данными
posts.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const currenPostId = evt.currentTarget.id;
    openPictureModal();
    createPictureModal(currenPostId);
  });
});
