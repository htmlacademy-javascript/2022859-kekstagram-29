const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
let currentFilter = Filters.DEFAULT;
const SHOW_PICTURE = 10;
const filters = document.querySelector('.img-filters');

let pictures = [];

const sortRandom = () => Math.random() - 1;
const sortComments = (picturesA, picturesB) => picturesB.comments.length - picturesA.comments.length;

const getFilter = () => {
  switch(currentFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, SHOW_PICTURE);
    case Filters.DISCUSSED:
      return [...pictures].sort(sortComments);
    case Filters.DEFAULT:
      return [...pictures];
  }
};

const filterClick = (callback) => {
  filters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const target = evt.target;
    if (target.id === currentFilter) {
      return;
    }
    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    currentFilter = target.id;
    callback(getFilter());
  });
};

const initFilters = (loader, callback) => {
  filters.classList.remove('img-filters--inactive');
  pictures = [...loader];
  filterClick(callback);
};

export { initFilters };
