const createElemet = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);

  if (text) {
    element.textContent = text;
  }

  return element;
};


//Комментарий

const renderComment = (avatar, message, name) => {
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


export { renderComment };
