import { createRandomIdFromRangeGenerator, getRandomArrayElement, getRandomInteger } from './utils.js';


// Number of object

const POST_COUNT = 25;

// Name

const NAMES = [
  'Аарон',
  'Кристиан',
  'Виктор',
  'Мия',
  'Дарья',
  'Андрей',
];

//Description

const DESCRIPTION = [
  'Поймала дзен.',
  'Yes or No?',
  'Live without regrets',
  'Я люблю свою работу. Особенно тогда, когда наступает отпуск',
];

// Comments

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getCommentText = () => Array.from({length: getRandomInteger(1, 3)}, () => getRandomArrayElement(COMMENTS_MESSAGE)).join(' ');//Позаимствовал в дс


// Comments

// const createComment = () => ({
//   id: generateCommentsId(),
//   avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
//   message: `${getCommentText()}`,
//   name: `${getRandomArrayElement(NAMES)}`,
// });
const generateCommentsId = createRandomIdFromRangeGenerator(1, 1000);
const createComment = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: `${getCommentText()}`,
  name: `${getRandomArrayElement(NAMES)}`
});

// Post

let photoId = 1;
const generatePostsId = createRandomIdFromRangeGenerator(1, 25);
const createPost = () => ({
  id: generatePostsId(),
  url: `photos/${photoId++}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTION)}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
});

const createPosts = Array.from({ length: POST_COUNT }, createPost);

export { createPosts };
