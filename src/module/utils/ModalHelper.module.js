let ModalHelper = (function(bodyClass) {
  let scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop  ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      document.body.classList.add(bodyClass);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyClass);
      document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
    }
  };
})('modal-open');

export { ModalHelper }
