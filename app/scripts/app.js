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

franAccordion();
