// Функция для получения длинны строки

const getLengthString = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
};

getLengthString('проверяемая строка', 20);
getLengthString('проверяемая строка', 18);
getLengthString('проверяемая строка', 10);


// Функция проверки палидрома

const getPalindrome = function (str) {
  let result = '';
  const normalizeString = str.toLowerCase().replaceAll(' ', '');

  for (let i = str.length - 1; i >= 0; i--) {
    result += normalizeString[i];
  }

  return normalizeString === result;
};

getPalindrome('Лёша на полке клопа нашёл ');
getPalindrome('ДовОд');
getPalindrome('Кекс');


//Доп задание

const getString = (str) => {
  str = str.toString();
  let result = '';

  for(const elem of str) {
    const isNumber = !Number.isNaN(Number.parseInt(elem, str));

    if (isNumber) {
      result += elem;
    }
  }

  return Number(result) || NaN;
};

getString('ECMAScript 2022');
getString('2023');
getString('а я томат');
getString(-1);
