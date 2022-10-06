const app = {
  pathToLibsFiles: './assets/libs',
};
window.app = app;

// polyfills
// before polyfills
(function (arr) {
  arr.forEach((item) => {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        // eslint-disable-next-line prefer-rest-params
        const argArr = Array.prototype.slice.call(arguments);
        const docFrag = document.createDocumentFragment();
        argArr.forEach((argItem) => {
          const isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.parentNode.insertBefore(docFrag, this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    // eslint-disable-next-line no-param-reassign
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const initSliders = () => {
  const verticalSlider = new Swiper('.vertical-slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 5000,
    direction: 'vertical',
    loop: true,
    mousewheel: true,
    autoplay: true,
    allowTouchMove: false,
  });
};

const franAccordion = () => {
  const franListsAccordion = document.querySelector('.fran-lists__accordion');

  const open = (button, dropdown) => {
    /* eslint-disable-next-line */
    dropdown.style.height = "".concat(dropdown.scrollHeight + 1, "px");
    button.classList.add('active');
    dropdown.classList.add('active');
  };

  const close = (button, dropdown) => {
    button.classList.remove('active');
    /* eslint-disable-next-line */
    dropdown.classList.remove('active');
    // eslint-disable-next-line no-param-reassign
    dropdown.style.height = '';
  };

  if (franListsAccordion) {
    franListsAccordion.addEventListener('click', (e) => {
      /* eslint-disable-next-line */
      const target = e.target;
      if (target.closest('.fran-lists__title')) {
        const parent = target.closest('.fran-lists__item');
        const button = target.closest('.fran-lists__title');
        const dropdown = parent.querySelector('.fran-lists__content');
        /* eslint-disable-next-line */
        dropdown.classList.contains('active') ? close(button, dropdown) : open(button, dropdown);
      }
    });
  }
};

const filterBlockOpen = () => {
  const filterBlockWrapper = document.querySelector('.filter-block__wrapper');
  const filterBlockItem = document.querySelectorAll('.filter-block__item');

  const open = (button, dropdown) => {
    /* eslint-disable-next-line */
    dropdown.style.height = "".concat(dropdown.scrollHeight + 20, "px");
    button.classList.add('active');
    dropdown.classList.add('active');
  };

  const close = (button, dropdown) => {
    button.classList.remove('active');
    /* eslint-disable-next-line */
    dropdown.classList.remove('active');
    // eslint-disable-next-line no-param-reassign
    dropdown.style.height = '';
  };

  if (filterBlockWrapper) {
    filterBlockWrapper.addEventListener('click', (e) => {
      /* eslint-disable-next-line */
      const target = e.target;
      if (target.closest('.filter-block__sortlist')) {
        const parent = target.closest('.filter-block__item');
        const button = target.closest('.filter-block__sortlist');
        const dropdown = parent.querySelector('.filter-block__sort-wrapper');
        /* eslint-disable-next-line */
        dropdown.classList.contains('active') ? close(button, dropdown) : open(button, dropdown);
      }
    });
  }
};

const filterTags = () => {
  const filterBlockWrapper = document.querySelector('.filter-block__wrapper');
  // eslint-disable-next-line no-shadow
  const filterTags = document.querySelector('.filter-tags');
  const filterTag = document.createElement('div');
  filterTag.classList.add('filter-tag');

  filterBlockWrapper.addEventListener('click', (e) => {
    if (e.target.closest('input[type="radio"]:checked')) {
      filterTag.textContent = e.target.dataset.orig;
      filterTags.append(filterTag);
    } else if (e.target.closest('input[type="checkbox"]')) {
      const filterTagCheck = document.createElement('div');
      filterTagCheck.classList.add('filter-tag');
      filterTagCheck.textContent = e.target.dataset.orig;
      filterTags.append(filterTagCheck);
    }
  });
};

franAccordion();
initSliders();
filterBlockOpen();
filterTags();
