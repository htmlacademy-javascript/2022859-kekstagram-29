import { onLinkClick } from './modal.js';
import { createElement } from './utils.js';

const modalImage = document.querySelector('.big-picture__img img');
const modalLikesCount = document.querySelector('.likes-count');
const modalCommentsCount = document.querySelector('.comments-count');
const modalDescription = document.querySelector('.social__caption');
const moreButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const moreCommentsButton = document.querySelector('.comment-show');
const countComment = document.querySelector('.comments-count');
const COMMENTS_TO_SHOW = 5;
let currentComments = [];


const createComment = (avatar, message, name) => {
  const listItem = createElement('li', 'social__comment');
  const image = createElement('img', 'social__picture');
  const text = createElement('p', 'social__text', message);

  const IMAGE_SIZE = 35;

  image.src = avatar;
  image.alt = name;
  image.style.width = `${IMAGE_SIZE}px`;
  image.style.heigth = `${IMAGE_SIZE}px`;

  listItem.append(image, text);
  return listItem;
};

const renderComments = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach(({ avatar, message, name }) => {
    const commentElement = createComment(avatar, message, name);
    fragment.append(commentElement);
  });

  return fragment;
};

const initMoreComments = () => {
  const moreComments = currentComments.slice(commentsList.children.length, commentsList.children.length + COMMENTS_TO_SHOW);
  const renderMoreComments = renderComments(moreComments);
  commentsList.append(renderMoreComments);

  if (currentComments.length === commentsList.children.length) {
    moreButton.classList.add('hidden');
  }

  moreCommentsButton.textContent = commentsList.children.length;
  countComment.textContent = currentComments.length;
};

const onMoreButtonClick = () => initMoreComments();

const showPartComments = (comments) => {
  const toShowComments = comments.slice(0, COMMENTS_TO_SHOW);
  const renderFirstComments = renderComments(toShowComments);

  if (toShowComments.length === comments.length) {
    moreButton.classList.add('hidden');
  } else {
    moreButton.classList.remove('hidden');
    moreButton.addEventListener('click', onMoreButtonClick);
  }

  commentsList.append(renderFirstComments);
  moreCommentsButton.textContent = toShowComments.length;
  countComment.textContent = comments.length;
};

const createPictureModal = (data) => {
  const {url, likes, comments, description} = data;
  modalImage.src = url;
  modalLikesCount.textContent = likes;
  modalCommentsCount.textContent = comments.length;
  modalDescription .textContent = description;

  commentsList.innerHTML = '';
  currentComments = comments;
  showPartComments(comments);
  onLinkClick(data);
};

export { createPictureModal, onMoreButtonClick, moreButton};
