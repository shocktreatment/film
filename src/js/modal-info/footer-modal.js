const openModalBtn = document.querySelector('[data-modal-open]');
const backdropFooter = document.querySelector('.backdrop__footer');
const closeModalBtn = document.querySelector('[data-modal-close-footer]');
const modal = document.querySelector('[data-modal-footer]');
window.addEventListener('keydown', closeFooterModalEsc);
const bodyFooter = document.querySelector('body');

openModalBtn.addEventListener('click', onFooterModal);
closeModalBtn.addEventListener('click', closeFooterModal);

 function onFooterModal(e) {
  backdropFooter.classList.remove('is-hidden');
  bodyFooter.style.overflow = 'hidden';
}

function closeFooterModal(e) {
  backdropFooter.classList.add('is-hidden');
  bodyFooter.style.overflow = 'visible';
}

function closeFooterModalEsc(e) {
  if (e.code === 'Escape') {
    closeFooterModal();
  }
}
