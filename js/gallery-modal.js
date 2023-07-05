import { openPictureModal } from './modal.js';
import { createComment } from './create-element.js';

const bigPictureImg = document.querySelector('.big-picture__img img');
const likeCount = document.querySelector('.likes-count');
const commentCount = document.querySelector('.comments-count');
const commentsDescription = document.querySelector('.social__caption');
const loadButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const blockCount = document.querySelector('.social__comment-count');
const COMMENTS_TO_SHOW = 5;
let currentComments = [];
const renderComments = (commentsData) => {
  commentsList.innerHTML = '';

  commentsData.forEach(({ avatar, message, name }) => {
    const commentElement = createComment(avatar, message, name);
    commentsList.append(commentElement);
  });
  currentComments = commentsData.slice(0, COMMENTS_TO_SHOW);
  blockCount.textContent = `${currentComments.length} из ${commentsData.length} комментариев`;
};

const renderLoad = (items) => {
  if (items.length > COMMENTS_TO_SHOW) {
    loadButton.classList.remove('hidden');
  } else {
    loadButton.classList.add('hidden');
  }
};


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

export { createPictureModal, renderComments };
