import { createPosts } from './data.js';
//Находим узел шаблона
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
//Находим узел где будут находиться фото
const postList = document.querySelector('.pictures');
//Записываем функию с объектами
const similarPosts = createPosts();
//записываем фрагмент('Черная коробка')
const postListFragment = document.createDocumentFragment();
//Перебираем массив и добавляем элементы и данные для них
similarPosts.forEach(({ url, description, likes, comments }) => {
  const postItem = postTemplate.cloneNode(true);
  postItem.querySelector('.picture__img').src = url;//Добавляем ссылку на фото
  postItem.querySelector('.picture__img').alt = description;//Описание фото
  postItem.querySelector('.picture__likes').textContent = likes;//Число лайков
  postItem.querySelector('.picture__comments').textContent = comments.length;//Число комментариев
  postListFragment.append(postItem);//Добавляем все в элемент
});
//Выгружаем в фрагмент
postList.append(postListFragment);
