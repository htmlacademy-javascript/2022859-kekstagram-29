import { openPictureModal } from './modal.js';
import { createElemet } from './utils.js';

const bigPictureImg = document.querySelector('.big-picture__img img');
const likeCount = document.querySelector('.likes-count');
const showCount = document.querySelector('.social__comment-count');
const commentCount = showCount.querySelector('.comments-count');
const commentsDescription = document.querySelector('.social__caption');
const moreButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const COMMENTS_TO_SHOW = 5;
let currentComments = [];


const createComment = (avatar, message, name) => {
  const listItem = createElemet('li', 'social__comment');
  const image = createElemet('img', 'social__picture');
  const text = createElemet('p', 'social__text', message);

  const imageSize = 35;

  image.src = avatar;
  image.alt = name;
  image.style.width = `${imageSize}px`;
  image.style.heigth = `${imageSize}px`;

  listItem.append(image, text);
  return listItem;
};

const renderComments = (commentsData) => {
  const fragment = document.createDocumentFragment();
  commentsData.forEach(({ avatar, message, name }) => {
    const commentElement = createComment(avatar, message, name);
    fragment.append(commentElement);
  });

  return fragment;
};


const initLoadMoreComments = (comments) => {
  const toShowComments = comments.slice(0, COMMENTS_TO_SHOW,);
  const renderFirstComments = renderComments(toShowComments);

  if (toShowComments.length === comments.length) {
    moreButton.classList.add('hidden');
  }

  commentsList.append(renderFirstComments);
  showCount.firstChild.textContent = `${toShowComments.length} из `;
};

const loadMore = () => {
  const moreComments = currentComments.slice(commentsList.children.length, commentsList.children.length + COMMENTS_TO_SHOW);
  const renderMoreComments = renderComments(moreComments);
  commentsList.append(renderMoreComments);

  if (currentComments.length === commentsList.children.length) {
    moreButton.classList.add('hidden');
  }
  showCount.firstChild.textContent = `${commentsList.children.length} из `;
};

const createPictureModal = (postData) => {
  const {url, likes, comments, description} = postData;
  bigPictureImg.src = url;
  likeCount.textContent = likes;
  commentCount.textContent = comments.length;
  commentsDescription.textContent = description;
  commentsList.innerHTML = '';
  currentComments = comments;
  moreButton.addEventListener('click', loadMore);
  initLoadMoreComments(comments);
  openPictureModal(postData);
};

export { createPictureModal };
