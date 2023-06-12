// Функция для получения длинны строки

const isLengthString = (string, maxLength) => string.length <= maxLength;

isLengthString('проверяемая строка', 20);
isLengthString('проверяемая строка', 18);
isLengthString('проверяемая строка', 10);


// Функция проверки палидрома

const isPalindrome = (str) => {
  const normalizeString = str.replaceAll(' ', '').toUpperCase();
  let result = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    result += normalizeString.at(i);
  }

  return result === normalizeString;
};

isPalindrome('Лёша на полке клопа нашёл');
isPalindrome('ДовОд');
isPalindrome('Кекс');


// Палидром через массив

// const checkPalindrome = (string) => {
//   const normalizedString = string.toLowerCase().replaceAll(' ', '');
//   const reversedString = normalizedString.split('').reverse().join('');
//   return normalizedString === reversedString;
// };

// checkPalindrome('Лёша на полке клопа нашёл');

//Доп задание

const getString = (str) => {
  str = str.toString();
  let result = '';

  for(const elem of str) {
    const isNumber = !Number.isNaN(Number.parseInt(elem, 10));

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
