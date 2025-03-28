// Функция для открытия модального окна
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  modal.addEventListener('mousedown', handleOverlayClick);
}

// Функция для закрытия модального окна
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  modal.removeEventListener('mousedown', handleOverlayClick);
}

// Функция для закрытия модального окна по нажатию на Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);

  }
}

// Функция для закрытия модального окна по клику на оверлей
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal };



