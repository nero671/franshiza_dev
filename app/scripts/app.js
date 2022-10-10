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
    // eslint-disable-next-line no-use-before-define
    closeDrops();
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

  const closeDrops = (button, dropdown) => {
    /* eslint-disable-next-line */
    filterBlockItem.forEach(item => {
      if (item.children[0] !== button && item.children[1] !== dropdown) {
        close(item.children[0], item.children[1]);
      }
    });
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
  const filterBlockSortlist = document.querySelectorAll('.filter-block__sortlist');
  const filterBlockSortWrapper = document.querySelectorAll('.filter-block__sort-wrapper');
  const filterTagClear = document.querySelector('.filter-tag__clear');
  // eslint-disable-next-line no-shadow
  const filterTags = document.querySelector('.filter-tags');
  const filterTag = document.createElement('div');
  filterTag.classList.add('filter-tag');

  const closeDropdowns = () => {
    filterBlockSortlist.forEach((item) => {
      filterBlockSortWrapper.forEach((option) => {
        item.classList.remove('active');
        option.classList.remove('active');
        // eslint-disable-next-line no-param-reassign
        option.style.height = '';
      });
    });
  };

  filterBlockWrapper.addEventListener('click', (e) => {
    if (e.target.closest('.input-radio')) {
      filterTag.textContent = e.target.dataset.orig;
      filterTags.insertAdjacentElement('afterbegin', filterTag);
      closeDropdowns();
      const filterTagItem = document.querySelector('.filter-tag');

      filterTagItem.addEventListener('click', () => {
        filterTag.remove();

        const radioInput = document.querySelectorAll('.filter-block__wrapper input[type="radio"]');

        radioInput.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.checked = 'false';
        });
      });
    } else if (e.target.closest('input[type="checkbox"]')) {
      const filterTagCheck = document.createElement('div');

      filterTagCheck.classList.add('filter-tag');
      filterTagCheck.textContent = e.target.dataset.orig;
      closeDropdowns();

      if (e.target.closest('input[type="checkbox"]').checked === true) {
        filterTagClear.insertAdjacentElement('beforebegin', filterTagCheck);
      } else {
        const filterTagItem = document.querySelectorAll('.filter-tag');
        filterTagItem.forEach((item) => {
          if (item.textContent === e.target.dataset.orig) {
            item.remove();
          }
        });
      }

      const filterTagItem = document.querySelectorAll('.filter-tag');
      const checketInput = document.querySelectorAll('.filter-block__wrapper input[type="checkbox"]');
      filterTagItem.forEach((item) => {
        item.addEventListener('click', () => {
          item.remove();
          checketInput.forEach((check) => {
            if (item.textContent === check.dataset.orig) {
              // eslint-disable-next-line no-param-reassign
              check.checked = false;
            }
          });
        });
      });
    } else if (e.target.closest('.sort-radio')) {
      const filterBlockSortlistTitle = document.querySelector('.filter-block__sortlist-title');
      const sortRadio = document.querySelectorAll('.sort-radio');
      closeDropdowns();

      sortRadio.forEach((item) => {
        item.addEventListener('click', () => {
          filterBlockSortlistTitle.textContent = item.dataset.orig;
        });
      });
    }
  });

  filterTagClear.addEventListener('click', (e) => {
    // eslint-disable-next-line no-shadow
    const filterTag = document.querySelectorAll('.filter-tag');
    const inputFilter = document.querySelectorAll('.filter-block__wrapper input');
    filterTag.forEach((item) => {
      inputFilter.forEach((input) => {
        item.remove();
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      });
    });
  });
};

franAccordion();
initSliders();
filterBlockOpen();
filterTags();
