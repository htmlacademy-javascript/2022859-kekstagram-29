
import { isEscapeKey } from './utils.js';
import { createPosts } from './data.js';
import { createComment } from './create-element.js';

const posts = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeModal = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likeCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.comments-count');
const blockCount = bigPicture.querySelector('.social__comment-count');// Пока что нужно(временное скрытие)
const loadButton = bigPicture.querySelector('.comments-loader');// Пока что нужно(временное скрытие)
const commentsDescription = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');

//Закрытие модального окна
const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  closeModal.removeEventListener('click', closePictureModal);
};

//ESC
const onDocumentKey = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureModal();
  }
};// еще раз посмотреть про эту функцию
const COUNT_LOAD = 5;
const renderLoad = (items) => {
  if (items.length > COUNT_LOAD) {
    loadButton.classList.remove('hidden');
    // loadButton.addEventListener('click', cb);
  } else {
    loadButton.classList.add('hidden');
    // loadButton.removeEventListener('click', cb);
  }
};

// const renderListCount = (items) => {
//   items.slice(0, COUNT_LOAD);
// };

//комент
const renderComments = (comment) => {
  commentsList.innerHTML = '';

  comment.forEach(({ avatar, message, name }) => {
    const commentElement = createComment(avatar, message, name);
    commentsList.append(commentElement);
  });
};

//Открытие модального окна
const openPictureModal = () => {
  document.body.classList.add('modal-open');// добавляем класс body
  bigPicture.classList.remove('hidden');//Удаляем модальному окно класс
  document.addEventListener('keydown', onDocumentKey);//ESC
  blockCount.classList.add('hidden');//Временное скрытие
  closeModal.addEventListener('click', closePictureModal);//Добавляем закрытие по нажатию на крестик
};

//Создаем модальное окно (наполняем)
const createPictureModal = (postData) => {
  const {url, likes, comments, description} = postData;
  bigPictureImg.src = url;
  likeCount.textContent = likes;
  commentCount.textContent = comments.length;
  commentsDescription.textContent = description;
  renderComments(comments);
  renderLoad(comments);

  openPictureModal(postData);
};
posts.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  let postId;

  if (target !== null) {
    postId = Number(target.dataset.id);
    const postData = createPosts.find((post) => post.id === postId);

    createPictureModal(postData);
  }
});
