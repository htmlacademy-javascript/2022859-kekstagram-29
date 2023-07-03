
import { isEscapeKey } from './utils.js';
import { createPosts } from './data.js';
import { renderThumbnail } from './gallery.js';
import { createComment } from './create-element.js';
renderThumbnail(createPosts);

const posts = document.querySelectorAll('.picture');
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
};

//ESC
const onDocumentKey = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureModal();
  }
};// еще раз посмотреть про эту функцию


//комент
const renderComment = (comment) => {
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
  renderComment(comments);
};

//Перебираем массив с данными
posts.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const currenPostId = evt.currentTarget.id;
    openPictureModal();
    createPictureModal(currenPostId);
  });
});
